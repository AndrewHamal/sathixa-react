
import "leaflet/dist/leaflet.css";
import MyMap from "../../components/vendor/maps/MyMap";
// import Maps from "../../components/vendor/maps/MapTs.tsx"

import { NavBar, Icon, Popover } from 'antd-mobile';
import { AimOutlined } from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {createRef, useRef, useState} from "react";


export default function MapSearch () {
    const history = useHistory()
    const [refresh, doRefresh] = useState(0);
    const [clearGeoWatch, doClearGeoWatch] = useState(0);
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
            <NavBar
                style={{zIndex:"99"}}
                className={"position-relative"}
                mode="primary"
                icon={<Icon type="left" />}
                onLeftClick={ handleBackEvent }
                rightContent={[
                    <AimOutlined key={0} onClick={ handleEvent }  style={{ fontSize: '19px' }} />
                ]}
            ></NavBar>

            <div>
                <MyMap refresh={refresh} clearGeoWatch={clearGeoWatch} />
            </div>
        </>
    )
}

