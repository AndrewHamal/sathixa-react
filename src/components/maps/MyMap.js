import './Map.css'
import React, {Component, forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import L, {Point} from "leaflet";
import * as Nominatim from "nominatim-browser";
import {Circle, LayerGroup, Map, Marker, Popup, TileLayer, Tooltip} from "react-leaflet";
import Search from "react-leaflet-search"
import 'leaflet/dist/leaflet.css';
import "leaflet/dist/leaflet.js";
import {Button, Toast} from "antd-mobile";
import {useDispatch, useSelector} from "react-redux";
import {getLocations, storeLocation} from "@/api/vendor";
import {getUser} from "@/reducers/reducers";
import { allVendorLocation, storeVendorLocation } from "@/reducers/rider/reducers"
import { storeRiderLocation, getAllVendorLocation } from "@/api/rider/index";
import {useHistory} from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "Map Marker_8.png",
    iconUrl: "Map Marker_8.png",
    iconSize: new Point(35, 35),
    shadowUrl : ''
});

const iconRider = L.icon({
    iconRetinaUrl: "Truck_6 (1).png",
    iconUrl: "Truck_6 (1).png",
    iconSize: new Point(35, 35),
    shadowUrl : ''
});

const iconAccurate = L.icon({
    iconRetinaUrl: "accurate.svg",
    iconUrl: "accurate.svg",
    iconSize: new Point(40, 40),
    shadowUrl : ''
})

const iconVendor = L.icon({
    iconRetinaUrl: "Map Marker_6.png",
    iconUrl: "Map Marker_6.png",
    iconSize: new Point(35, 35),
    shadowUrl : ''
});


const MapComp = (props) => {

    const leafletMap = useRef()
    const [search, setSearch] = useState()
    const history = useHistory()

    const [location, setLocation] = useState()

    const allLocations = useSelector(allVendorLocation)
    const dispatch = useDispatch()

    const userSelector = useSelector(getUser)

    let geoWatch
    let markerLayer
    let lat = ''
    let long = ''

    useEffect(() => {
        let isMounted = true

        if(allLocations.length === 0 && isMounted){
            getAllVendorLocation()
                .then(res => {
                    dispatch(storeVendorLocation(res.data))
                })
        }

        return () => { isMounted = false } 

    }, [allLocations])

    const center = [27.7081859, 85.322004]

    useEffect(() => {
        watchMyLocateMe();

        // const listenChange = history.listen(() => {
        //     // navigator.geolocation.clearWatch(geoWatch);
        // })

        // return () => { listenChange() }

    },[])

    const watchMyLocateMe = (withMarker = false) => {
        const { current = {} } = leafletMap;
        const { leafletElement: map } = current;

        markerLayer = new L.LayerGroup().addTo(map);
        geoWatch = navigator.geolocation.watchPosition((res) => {
        lat = res.coords.latitude
        long = res.coords.longitude
            if (map) {
                map.setView([lat, long])
                markerLayer.clearLayers()

                if(!window.marker){
                    window.marker = L.marker([lat, long], {
                        icon: iconAccurate,
                        draggable: false
                    }).addTo(map)

                    Nominatim.reverseGeocode({
                        lat: lat,
                        lon: long,
                        addressdetails: true,
                        "accept-language": "np",
                        zoom: 18
                    })
                    .then((result) => {
                        setLocation(location)
                        document.querySelector('.search-input').value = result.display_name
                    })

                }else{
                    window.marker
                    .setLatLng([lat, long])

                    Nominatim.reverseGeocode({
                        lat: lat,
                        lon: long,
                        addressdetails: true,
                        "accept-language": "np",
                        zoom: 18
                    })
                    .then((result) => {
                        setLocation(location)
                        document.querySelector('.search-input').value = result.display_name
                    })
                }

                // storeRiderLocation(lat, long)
                // .then(res => {
                //     console.log('success location saved')
                // })
            }

        })

    }

    const customPopup = (SearchInfo) => {
        return (
            <Popup>
                <div>
                    <p>{SearchInfo.info}</p>
                    <p>
                        {SearchInfo.raw &&
                        SearchInfo.raw.place_id &&
                        JSON.stringify(SearchInfo.raw.place_id)}
                    </p>
                </div>
            </Popup>
        );
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
                'state':  result.address.region || result.address.county,
                'country': result.address.country,
                'long': result.lon,
                'lat':result.lat,
                'whole_address': result.display_name
            }

            document.querySelector('.search-input').value = result.display_name
            setLocation(location)
            markerSet()
        })

    }

    useEffect(() => {

        if(typeof userSelector !== "undefined" && userSelector.location !== null && userSelector.length !== 0) {
            const {current = {}} = leafletMap;
            const {leafletElement: map} = current;
            const markerLayer = new L.LayerGroup().addTo(map);

            markerLayer.clearLayers();

            window.marker = L.marker( [userSelector.location.lat, userSelector.location.long] ,{
                draggable: true,
            }).addTo(map)
                .bindPopup('Drag to change location')
                .openPopup()

            map.setView([userSelector.location.lat, userSelector.location.long])
            markerSet()
        }

    }, [userSelector])

    const markerSet = () => {
        window.marker.on('dragend', function(e) {
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
                    'state':  result.address.region || result.address.county,
                    'country': result.address.country,
                    'long': result.lon,
                    'lat':result.lat,
                    'whole_address': result.display_name
                }
                setSearch(result.display_name)
                document.querySelector('.search-input').value = result.display_name
                setLocation(location)
            })
        });
    }

    const saveLocation = () => {
        storeLocation(location)
            .then(res => {
                navigator.geolocation.clearWatch(geoWatch);
                Toast.success('Location updated !!!', 2);
                history.push('/dashboard');
            })
    }

    return (
      <div className="map-container">
        <Map
            center={center}
            zoom="16"
            keyboard={true}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            ref={leafletMap}

        ><TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />

            {/* all vendor locations  */}
            {   
                allLocations?.map((res, key) => (
                    <Marker key={key}  position={[res.location['lat'], res.location['long']]} icon={iconRider} >
                        <Tooltip sticky offset={[0, -15.2]} direction={"top"} opacity={1}>
                            <p className={"font-weight-bold"}>Sathixa Vendor</p>
                            <p>{res.first_name +' '+ res.last_name}</p>
                        </Tooltip>
                    </Marker>
                ))
            }
            
            <Search
                  onChange={searchEvent}
                  position="topleft"
                  inputPlaceholder="My current location"
                  showMarker={false}
                  icon={false}
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
        </Map>
      </div>
    );
}

export default MapComp;
