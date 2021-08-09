import './Map.css'
import React, { Component, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import * as L from "leaflet";
import { Point } from "leaflet";
import 'leaflet-routing-machine';
import * as Nominatim from "nominatim-browser";
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import Search from "react-leaflet-search"
import 'leaflet/dist/leaflet.css';
import "leaflet/dist/leaflet.js";
import { Button, Toast } from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import { getLocations, storeLocation, getPackage } from "@/api/vendor";
import {
    getLocationsVendor,
    getUser,
    locationStoreVendor,
    userStore,
    storePackageForm,
    getPackageForm,
} from "@/reducers/reducers";
import { apiUser } from "@/api/vendor/dashboard";
import { useHistory } from "react-router-dom";

import Pusher from "pusher-js"
import Echo from 'laravel-echo';
import { options } from 'less';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "Map Marker_8.png",
    iconUrl: "Map Marker_8.png",
    iconSize: new Point(35, 35),
    shadowUrl: ''
});

const iconRider = L.icon({
    iconRetinaUrl: "Truck_6 (1).png",
    iconUrl: "Truck_6 (1).png",
    iconSize: new Point(35, 35),
    shadowUrl: ''
});

const iconAccurate = L.icon({
    iconRetinaUrl: "accurate.svg",
    iconUrl: "accurate.svg",
    iconSize: new Point(40, 40),
    shadowUrl: ''
})

const iconVendor = L.icon({
    iconRetinaUrl: "Map Marker_6.png",
    iconUrl: "Map Marker_6.png",
    iconSize: new Point(35, 35),
    shadowUrl: ''
});

const iconLive = L.divIcon({
    iconRetinaUrl: "car.png",
    iconUrl: "car.png",
    html: `<div class="rider-icon" ><img src="/car.png" width="45"></>`
});


// scooter.png
const MapComp = (props) => {

    const leafletMap = useRef()
    const [search, setSearch] = useState()
    const history = useHistory()

    const urlSearchParams = new URLSearchParams(history.location.search);
    const params = urlSearchParams?.get('from');

    const [loading, setLoading] = useState(true);

    const paramsRider = urlSearchParams?.get('rider');

    const [location, setLocation] = useState()

    const allLocations = useSelector(getLocationsVendor)
    const dispatch = useDispatch()

    const packageFormSelector = useSelector(getPackageForm)

    const userSelector = useSelector(getUser)

    let geoWatch
    let markerLayer
    let lat = ''
    let long = ''

    const options = {
        broadcaster: process.env.REACT_APP_BROADCAST,
        key: process.env.REACT_APP_PUSHER_KEY,
        cluster: 'ap2',
        wsHost: 'socket.sathichha.com',
        wsPort: 443,
        forceTLS: true,
        disableStats: true,
        enabledTransports: ["ws", "wss"],
    };

    const center = [27.7081859, 85.322004]


    // listen for real time tracking
    const listenForRider = (map) => {
        if (paramsRider !== null) {

            window.echo = new Echo(options);
            window.echo.connector.pusher.config.authEndpoint = `https://api.sathichha.com/broadcasting/auth`;

            window.echo.channel(`vendorPackage.` + paramsRider)
                .listen('.location', (data) => {
                    setTimeout(() => {
                        if (data?.package_id == paramsRider) {
                            const { current = {} } = leafletMap;
                            const { leafletElement: map } = current;

                            if (!window.rider) {
                                map?.setView([data.lat, data.long])
                                window.rider = L.marker([data.lat, data.long], {
                                    draggable: false,
                                    icon: iconLive,
                                    zoom: 14
                                }).addTo(map)

                                document.querySelector('.rider-icon img').style.transform = `rotate(${data.heading || 0}deg)`

                            } else {

                                map?.setView([data.lat, data.long])
                                window.rider
                                    ?.setLatLng([data.lat, data.long])

                            }
                        }
                    }, 400)
                });

        }
    }

    useEffect(() => {

        const deactive = history.listen(() => {
            if (typeof window.echo !== "undefined") {
                window.echo.leave(`vendorPackage.` + paramsRider)
                delete window.echo
                delete window.rider
            }
        })

        return () => { deactive() }

    }, [history, paramsRider])

    // get if rider tracking 
    useEffect(() => {

        const { current = {} } = leafletMap;
        const { leafletElement: map } = current;

        if (paramsRider === null) {
            setLoading(false)
        } else {
            getPackage(paramsRider)
                .then(res => {
                    res = res.data

                    if (res?.location?.lat != res?.vendor?.location?.lat || res?.location?.long != res?.vendor?.location?.long) {
                        L.Routing.control({
                            waypoints: [
                                L.latLng(res?.location?.lat, res?.location?.long),
                                L.latLng(res?.vendor?.location?.lat, res?.vendor?.location?.long)
                            ],
                            useZoomParameter: true,
                            pointMarkerStyle: { display: 'none' },
                            draggableWaypoints: false,
                            summaryTemplate: (info) => {
                                let summary = {
                                    distance: info?.distance,
                                    time: info?.time
                                }
                            }
                        }).addTo(map);

                        listenForRider(map)
                    }

                    setLoading(false)
                })

            let echo = new Echo(options);
            return () => { echo.leave(`vendorPackage.` + paramsRider) }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // location watch
    useEffect(() => {
        let isMounted = true

        if (props.refresh > 0 && isMounted)
            watchMyLocateMe()

        return () => { isMounted = false }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.refresh])

    useEffect(() => {
        let isMounted = true

        if (props.clearGeoWatch > 0 && isMounted) {
            navigator.geolocation.clearWatch(geoWatch);
        }

        return () => { isMounted = false }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.clearGeoWatch])

    const watchMyLocateMe = (withMarker = false) => {
        const { current = {} } = leafletMap;
        const { leafletElement: map } = current;
        if (typeof map !== "undefined") {
            markerLayer = new L.LayerGroup().addTo(map);
            geoWatch = navigator.geolocation.watchPosition((res) => {
                lat = res.coords.latitude
                long = res.coords.longitude
                if (map) {
                    map.setView([lat, long + .0005])
                    markerLayer.clearLayers()


                    if (!window.current) {
                        window.current = L.marker([lat, long + .0005], {
                            icon: iconAccurate,
                            draggable: false
                        }).addTo(map)
                    } else {
                        window.current.setLatLng([lat, long])
                    }

                    if (!window.marker) {
                        window.marker = L.marker([lat, long], {
                            draggable: true,
                            zoom: 14
                        }).addTo(map)
                            .bindPopup('Drag for location change.')
                            .openPopup()

                        Nominatim.reverseGeocode({
                            lat: lat,
                            lon: long,
                            addressdetails: true,
                            "accept-language": "np",
                            zoom: 18
                        })
                            .then((result) => {
                                let location = {
                                    'city': result.address.suburb || result.address.town || result.address.city,
                                    'state': result.address.region || result.address.county,
                                    'country': result.address.country,
                                    'long': result.lon,
                                    'lat': result.lat,
                                    'whole_address': result.display_name
                                }

                                document.querySelector('.search-input').value = result.display_name
                                setLocation(location)
                                markerSet()
                                document.querySelector('.search-input').value = result.display_name
                            })

                        markerSet()

                    } else {
                        window.marker
                            .setLatLng([lat, long])
                            .bindPopup('Drag for location change.')
                    }

                }

            })
        }

    }

    const searchEvent = (info) => {
        const { current = {} } = leafletMap;
        const { leafletElement: map } = current;
        const markerLayer = new L.LayerGroup().addTo(map);

        markerLayer.clearLayers()

        Nominatim.reverseGeocode({
            lat: info.latLng['lat'],
            lon: info.latLng['lng'],
            addressdetails: true,
            "accept-language": "np",
            zoom: 18
        })
            .then((result) => {
                markerLayer.clearLayers();
                window.marker.setLatLng(info.latLng)

                let location = {
                    'city': result.address.suburb || result.address.town || result.address.city,
                    'state': result.address.region || result.address.county,
                    'country': result.address.country,
                    'long': result.lon,
                    'lat': result.lat,
                    'whole_address': result.display_name
                }

                document.querySelector('.search-input').value = result.display_name
                setLocation(location)
                markerSet()
            })

    }


    useEffect(() => {
        let isMounted = true

        if (allLocations.length === 0 && isMounted) {
            getLocations()
                .then(res => {
                    dispatch(locationStoreVendor(res.data))
                })
        }

        return () => { isMounted = false }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        let isMounted = true

        if (userSelector.length === 0 && isMounted && paramsRider === null) {
            apiUser().then(res => {
                if (res.status === 200) {
                    if (res.data.location !== null) {
                        dispatch(userStore(res.data))
                        document.querySelector('.search-input').value = res.data?.location?.whole_address
                    }
                    else {
                        watchMyLocateMe(true)
                        return
                    }

                }

            })
        }

        if (typeof userSelector !== "undefined" && userSelector.location !== null && userSelector.length !== 0 && isMounted) {

            if (typeof userSelector?.location?.lat !== "undefined") {
                const { current = {} } = leafletMap;
                const { leafletElement: map } = current;
                const markerLayer = new L.LayerGroup().addTo(map);

                markerLayer.clearLayers();

                if(paramsRider === null) {
                    window.marker = L.marker([userSelector?.location?.lat, userSelector?.location?.long], {
                        draggable: true,
                    }).addTo(map)
                        .bindPopup('Drag to change location')
                        .openPopup()
                }else{
                    window.marker = L.marker([userSelector?.location?.lat, userSelector?.location?.long], {
                        draggable: true,
                    }).addTo(map)
                }

                map.setView([userSelector?.location?.lat, userSelector?.location?.long])
                markerSet()
            }
        }

        return () => { isMounted = false }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSelector])

    const markerSet = () => {
        window.marker.on('dragend', function (e) {
            Nominatim.reverseGeocode({
                lat: e?.target?._latlng['lat'],
                lon: e?.target?._latlng['lng'],
                addressdetails: true,
                "accept-language": "np",
                zoom: 18
            })
                .then((result) => {
                    window.marker.setLatLng(e?.target?._latlng)

                    let location = {
                        'city': result.address.suburb || result.address.town || result.address.city,
                        'state': result.address.region || result.address.county,
                        'country': result.address.country,
                        'long': result.lon,
                        'lat': result.lat,
                        'whole_address': result.display_name
                    }
                    setSearch(result.display_name)
                    document.querySelector('.search-input').value = result.display_name
                    setLocation(location)
                })
        });
    }

    const saveLocation = () => {
        if (typeof location === "undefined") {
            Toast.fail('Location is not selected', 2)
            return;
        }
        if (params) {
            dispatch(storePackageForm({ ...packageFormSelector, value: { ...packageFormSelector.value, ["receiver_address"]: location } }))
            history.push('/package-form');
        } else {
            storeLocation(location)
                .then(res => {
                    navigator.geolocation.clearWatch(geoWatch);
                    Toast.success('Location updated !!!', 2);
                    dispatch(userStore(res.data.data))
                    history.push('/dashboard');
                }).catch(err => {
                    Toast.fail('Someting went wrong', 2);
                })
        }
    }

    // if(loading) return ''

    return (
        <div className="map-container">
            <Map
                center={center}
                minZoom="6"
                maxZoom="18"
                zoom="15"
                keyboard={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                ref={leafletMap}
                id="map"
            >
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
                    attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {/* all vendor locations  */}
                {
                    allLocations?.map((res, key) => (
                        <Marker key={key} position={[res.location['lat'], res.location['long']]} icon={iconRider} >
                            <Tooltip sticky offset={[0, -15.2]} direction={"top"} opacity={1}>
                                <p className={"font-weight-bold"}>Sathixa Vendor</p>
                                <p>{res.first_name + ' ' + res.last_name}</p>
                            </Tooltip>
                        </Marker>
                    ))
                }

                {paramsRider === null ?
                    <Search
                        onChange={searchEvent}
                        position="topleft"
                        inputPlaceholder="Search"
                        showMarker={false}
                        zoom={14}
                        closeResultsOnClick={true}
                        openSearchOnLoad={true}
                        providerOptions={{
                            // searchBounds: [
                            //     new LatLng(33.100745405144245, 46.48315429687501),
                            //     new LatLng(44.55916341529184, 24.510498046875)
                            // ],
                            region: "np"
                        }}
                    >
                    </Search>
                    : null}
            </Map>

            { paramsRider === null ?
                <Button type={"primary"}
                    onClick={saveLocation}
                    className={"px-4 text-white position-absolute text-uppercase"}
                    style={{
                        zIndex: "9999999", right: "14px", left: "14px", bottom: "20px", fontWeight: "400",
                        letterSpacing: ".5px",
                        fontSize: "16px"
                    }}>
                    Confirm Address
                </Button> : null
            }
        </div>
    );
}

export default MapComp;
