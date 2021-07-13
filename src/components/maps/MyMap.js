import './Map.css'
import React, {useEffect, useRef, useState} from "react";
import * as L from "leaflet";
import { Point } from "leaflet";
import 'leaflet-routing-machine';
import * as Nominatim from "nominatim-browser";
import {Map, Marker, Popup, TileLayer, Tooltip} from "react-leaflet";
import Search from "react-leaflet-search"
import {Toast} from "antd-mobile";
import {useDispatch, useSelector} from "react-redux";
import {storeLocation} from "@/api/vendor";
import {getUser} from "@/reducers/reducers";
import { allVendorLocation, storeVendorLocation } from "@/reducers/rider/reducers"
import { storeRiderLocation, getAllVendorLocation, getDirection } from "@/api/rider/index";
import {useHistory} from "react-router-dom";
import { AimOutlined } from "@ant-design/icons";

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

const iconVendor = L.icon({
    iconRetinaUrl: "Map Marker_6.png",
    iconUrl: "Map Marker_6.png",
    iconSize: new Point(35, 35),
    shadowUrl : ''
});


const MapComp = (props) => {
    let { packageAlert, setSummary, refetch } = props;
    const isIOS =
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/);

    const leafletMap = useRef()
    const dispatch = useDispatch()
    const history = useHistory()

    const [search, setSearch] = useState()
    const [location, setLocation] = useState()
    const [heading, setHeading] = useState(0)

    const allLocations = useSelector(allVendorLocation)
    const userSelector = useSelector(getUser)

    let markerLayer
    let lat = ''
    let long = ''
    let pointDegree;

    const iconAccurate = L.divIcon({
        html:`<div class="accurate" ><svg width="90" height="90" viewBox="0 0 1357 1357" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M926.575 248.275C851.09 204.694 765.463 181.75 678.3 181.75C591.137 181.75 505.51 204.694 430.025 248.275L678.3 678.3L926.575 248.275Z" fill="url(#paint0_linear)"/>
        <circle cx="677.5" cy="678.5" r="144" fill="#DB2B39" stroke="#fff" stroke-width="45"/>
        <defs>
        <linearGradient id="paint0_linear" x1="634.773" y1="178.393" x2="645.717" y2="605.77" gradientUnits="userSpaceOnUse">
        <stop stop-color="#DB2B39" stop-opacity="0"/>
        <stop offset="1" stop-color="#DB2B39"/>
        </linearGradient>
        </defs>
        </svg></div>
        `,
        iconAnchor:[40, 40]
    })    

    useEffect(() => {
        const {current = {}} = leafletMap;
        const {leafletElement: map} = current;

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

    //@ when click locate me button fire 
    const locateMe = () => {
        watchMyLocateMe();
    }

    function init() {
        if (!isIOS) {
            window.addEventListener("deviceorientationabsolute", handler, true);
        }
    }


    function calcDegreeToPoint(latitude, longitude) {
        // Qibla geolocation
        const point = {
        lat: 21.422487,
        lng: 39.826206
        };

        const phiK = (point.lat * Math.PI) / 180.0;
        const lambdaK = (point.lng * Math.PI) / 180.0;
        const phi = (latitude * Math.PI) / 180.0;
        const lambda = (longitude * Math.PI) / 180.0;
        const psi =
        (180.0 / Math.PI) *
        Math.atan2(
            Math.sin(lambdaK - lambda),
            Math.cos(phi) * Math.tan(phiK) -
            Math.sin(phi) * Math.cos(lambdaK - lambda)
        );
        return Math.round(psi);
    }

    function startCompass() {
        if (isIOS) {
            DeviceOrientationEvent.requestPermission()
            .then((response) => {
                if (response === "granted") {
                window.addEventListener("deviceorientation", handler, true);
                } else {
                // alert("has to be allowed!");
                }
            })
            .catch(() => alert("not supported"));
        }
    }


    function handler(e) {
        let compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
        setHeading(compass)
        if(typeof window.path !== "undefined"){
            window.path.style.transform = `rotate(${compass}deg)`
        }
    }

    //@ if has dialog for package 
    useEffect(() => {
        init();

        const {current = {}} = leafletMap;
        const {leafletElement: map} = current;

        let data = {
          fromLat: packageAlert?.vendor?.location?.lat,
          fromLong: packageAlert?.vendor?.location?.long,
          toLat: packageAlert?.location?.lat,
          toLong: packageAlert?.location?.long
        }

        L.Routing.control({
            waypoints: [
              L.latLng(data.fromLat, data.fromLong),
              L.latLng(data.toLat, data.toLong)
            ],
            useZoomParameter: true,
            pointMarkerStyle: {display:'none'},
            // draggableWaypoints: false,
            summaryTemplate:(info) => {
                let summary = {
                    distance : info?.distance,
                    time : info?.time
                }

                setSummary(summary)
            }
        }).addTo(map);

    },[refetch])    

    //@ unlisten geolocation on route change
    useEffect(() => {
        const deactive = history.listen(() => {
            if(typeof window.geoWatch !== "undefined"){
                navigator.geolocation.clearWatch(window.geoWatch)
                delete window.marker;
                delete window.path;
            }
        })
        
        return () => { deactive() }
    }, [])

    //@ locate me realtime location
    const watchMyLocateMe = (withMarker = false) => {

        startCompass()

        const { current = {} } = leafletMap;
        const { leafletElement: map } = current;
        
        markerLayer = new L.LayerGroup().addTo(map);

        let options = {
            enableHighAccuracy: false
        }

        window.geoWatch = navigator.geolocation.watchPosition((res) => {
        lat = res.coords.latitude
        long = res.coords.longitude
        let heading = heading
  
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
                        zoom: 17
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
                        zoom: 17
                    })
                    .then((result) => {
                        setLocation(location)
                        document.querySelector('.search-input').value = result.display_name
                    })
                }

                if(packageAlert !== null){
                    storeRiderLocation(lat, long, heading, packageAlert?.id)
                    .then(res => {
                        console.log('success location saved')
                    })
                }

                window.path = document.querySelector('.accurate svg path')
            }
        },error, options)

    }

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
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

        if(typeof info.latLng !== "undefined"){
            Nominatim.reverseGeocode({
                lat: info.latLng['lat'],
                lon: info.latLng['lng'],
                addressdetails: true,
                "accept-language": "np",
                zoom: 18
            })
            .then((result) => {
                markerLayer.clearLayers();
                if(typeof window.marker !== "undefined"){
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
                }
            })
        }

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
                navigator.geolocation.clearWatch(window.geoWatch);
                Toast.success('Location updated !!!', 2);
                history.push('/dashboard');
            })
    }

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

        >
            
            <TileLayer 
                url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" 
                attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" 
            />

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
                    searchBounds: [
                        [26.3477581, 30.446945],
                        [80.0586226, 88.2015257]
                    ],
                        region: "np"
                  }}
            />


            <button className="btn locate-me" onClick={locateMe}>
                <AimOutlined style={{ fontSize: '19px' }}/>
            </button>
        </Map>
      </div>
    );
}

export default MapComp;
