
import "leaflet/dist/leaflet.css";
import MyMap from "@/components/vendor/maps/MyMap";
import { PageHeader } from "antd";
import { AimOutlined } from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import { useState} from "react";
import { Layout } from "antd";


export default function MapSearch () {
    const history = useHistory()
    const [refresh, doRefresh] = useState(0);
    const [clearGeoWatch, doClearGeoWatch] = useState(0);
    const urlSearchParams = new URLSearchParams(history.location.search);
    const params = urlSearchParams?.get('from');
    const riderParams = urlSearchParams?.get('rider');

    const { Content } = Layout;
    
    const handleEvent = () => {
        doRefresh(prev => prev + 1)
    }

    return (
        <Layout>
            <PageHeader
                style={{ position: "fixed", zIndex: 1, width: "100%" }}
                className="site-page-header bg-red "
                onBack={() => params ? history.push('package-form') : history.push('dashboard')}
                title="Location"
                extra={
                    !riderParams ?
                    [
                    <AimOutlined key={0} onClick={ handleEvent } className="my-auto text-white"  style={{ fontSize: '21px' }} />
                ] : ''
            }
            />
            <Content
                className="site-layout"
                style={{
                padding: "0",
                marginTop: 53,
                }}
            >
                <div>
                    <MyMap refresh={refresh} clearGeoWatch={clearGeoWatch} />
                </div>
                
            </Content>
        </Layout>
    )
}

