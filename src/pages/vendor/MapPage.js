
import React, {useEffect} from "react";
import { Map, TileLayer, Marker, Polyline } from "react-leaflet";
import L, { Point, DivIcon } from 'leaflet'
import "leaflet/dist/leaflet.css";
import { location, getLocation } from "../../reducers/locateReducer";
import {useDispatch, useSelector} from "react-redux";
import Echo from "laravel-echo";

const icon = L.icon({
    iconUrl: "marker.png",
    iconSize: new Point(40, 40)
});

const osm = {
    maptiler: {
        url:
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }
}


const MapTraker = () => {

    const coordinateValue = useSelector(getLocation)
    const dispatch = useDispatch()

    useEffect(() => {
        if(Object.keys(coordinateValue).length === 0) {
            navigator.geolocation.getCurrentPosition((res) => {
                let lat = res.coords.latitude
                let long = res.coords.longitude
                dispatch(location({lat: lat, long: long}))
            })
        }
    })

    const polyline = [
        [28.198834285568235, 81.67747020721437],
        [28.19890992924868, 81.68293118476868],
        [28.199240869721123, 81.68308138847352],
    ]

    const limeOptions = { color: 'lime' }
    const position = [ coordinateValue.lat ? coordinateValue.lat : 51.505, coordinateValue.long ? coordinateValue.long : -0.09]
    const ZOOM_LEVEL = 15;
    return (<>
        <Map center={position} zoom={ZOOM_LEVEL} scrollWheelZoom={false} className={"vh-100"}>
            <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
            />
            <Marker
                position={position}
                icon={icon}
            >

                <Polyline pathOptions={limeOptions} positions={polyline} />
            </Marker>

        </Map>
        </>
    )
}

export default MapTraker