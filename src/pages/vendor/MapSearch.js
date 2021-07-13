
import "leaflet/dist/leaflet.css";
import MyMap from "../../components/vendor/maps/MyMap";
// import Maps from "../../components/vendor/maps/MapTs.tsx"
import { NavBar, Icon, Popover } from 'antd-mobile';
import { PageHeader } from "antd";
import { AimOutlined } from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {createRef, useRef, useState} from "react";


export default function MapSearch () {
    const history = useHistory()
    const [refresh, doRefresh] = useState(0);
    const [clearGeoWatch, doClearGeoWatch] = useState(0);
    const urlSearchParams = new URLSearchParams(history.location.search);
    const params = urlSearchParams?.get('from');
    
    const handleEvent = () => {
        doRefresh(prev => prev + 1)
    }

    const handleBackEvent = (e) => {
        e.preventDefault()
        doClearGeoWatch(prev => prev + 1)
        history.goBack()
    }

    return (
        <>
        <PageHeader
            style={{ position: "fixed", zIndex: 1, width: "100%" }}
            className="site-page-header bg-red "
            onBack={() => params ? history.push('package-form') : history.push('dashboard')}
            title="Location"
            extra={[
                <AimOutlined key={0} onClick={ handleEvent } className="my-auto text-white"  style={{ fontSize: '21px' }} />
            ]}
        />

            <div>
                <MyMap refresh={refresh} clearGeoWatch={clearGeoWatch} />
            </div>
        </>
    )
}

