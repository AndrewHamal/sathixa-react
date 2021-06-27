import {Link, useHistory} from "react-router-dom";
import { imagePath } from '../../services/assetsHelper'
import 'antd/dist/antd.css';
import {useEffect, useState} from "react";
import { Typography, Space, Layout, Drawer, PageHeader } from 'antd';
import { Button } from 'antd-mobile';
import {apiUser} from "../../api/vendor/dashboard";
import {useDispatch, useSelector} from "react-redux";

import { userStore, getUser } from "../../reducers/reducers";
import { NoticeBar } from 'antd-mobile';

const Dashboard = () => {
    const [visible, setVisible] = useState(false);
    const { Text } = Typography;
    const { Header, Content, Footer } = Layout;
    const showDrawer = () => {
        setVisible(true);
    };
    const history = useHistory();
    const dispatch = useDispatch()
    const userSelector = useSelector(getUser)

    const onClose = () => {
        setVisible(false);
    };


    useEffect(() => {

        if(userSelector.length === 0 || typeof userSelector === "undefined") {

            apiUser().then(res => {          
                if(res.data.location !== null) {
                    dispatch(userStore(res.data))
                    console.log(res)
                }
            })
        }
    },[userSelector])

    return (
        <Layout>

        <PageHeader
            style={{ position: "fixed", zIndex: 1, width: "100%", right:0 }}
            className="site-page-header-white w-100"
            title={<div className="w-100">
            <div className="p-location-12 pr-1 w-100">
                <div className="d-flex w-100">
                    <i className="fas fa-map-marker-alt red-gps my-auto mr-2"/>
                    <NoticeBar icon={null} className="mr-4" marqueeProps={{ loop: true }} onClick={() => history.push('/map-search')}>
                        { userSelector?.location?.whole_address || "Click to Add Location"}
                    </NoticeBar>  

                    <i className="fas fa-bars font-16 my-auto ml-auto" onClick={showDrawer}/>       
                </div>
            </div>
            {/* <p className="p-location-14" >
                Add location
            </p> */}
            </div>}
        />
        
        <Content
            className="site-layout"
            style={{
            padding: "0 14px",
            // marginTop: 67,
            }}
        >
            <section className="mt-4 pb-4" >
                <Drawer
                    title="Basic Drawer"
                    placement="left"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
                <div className="pt-3">
                    <div>
                        <h3>Welcome</h3>
                        <img src={imagePath('delivery.svg')} alt="" className="img-fluid mx-auto d-block" />
                        <p className="sathixa-intro-p">You can now send your packages upto 10 km
                            within 30min using sathicha</p>
                        <div className="btn-container text-center mt-2">
                            <Button className={"w-100 my-3 w-100 border-15 text-white"} onClick={ () => history.push("/package-form")} type={"primary"} size={"large"}>Send Package</Button>
                        </div>
                    </div>

                    <div className="options-container-package d-flex justify-content-between mt-4">
                        <div className="text-center">
                            <img src={imagePath('add-to-cart.svg')} alt="" width={"26"}/>
                            <p className="package-options-p">Orders</p>
                        </div>
                        <div className="text-center">
                            <img src={imagePath('tick.svg')} alt="" width={"26"} />
                            <p className="package-options-p">Delivered</p>
                        </div>
                        <div className="text-center">
                            <img src={imagePath('cart-crossed.svg')} width={"26"} alt="" />
                            <p className="package-options-p">Returned</p>
                        </div>
                        <div className="text-center">
                            <img src={imagePath('processing.svg')} alt="" width={"20"}/>
                            <p className="package-options-p">Processing</p>
                        </div>
                    </div>

                    <div className="d-flex flex-wrap justify-content-between mt-4">
                        <div className="col-6 p-2 text-center">
                            <div className={"order-details-box padding-10  py-4"}>
                                <Text className="order-details-heading" type={"secondary"}>Order Value</Text>
                                <div className={"mt-1"}>
                                    <span className="package-options-p font-weight-500 ">Rs 50,000</span>
                                </div>
                            </div>
                        </div>
                        <div className="box col-6 p-2 text-center ">
                            <div className={"order-details-box padding-10  py-4"}>
                                <Text className="order-details-heading" type={"secondary"}>Delivered Value</Text>
                                <div className={"mt-1"}>
                                    <span className="package-options-p font-weight-500 ">Rs 50,000</span>
                                </div>
                            </div>
                        </div>

                        <div className="box col-6 p-2 text-center">
                            <div className={"order-details-box padding-10  py-4"}>
                                <Text className="order-details-heading" type={"secondary"}>Returned Value</Text>
                                <div className={"mt-1"}>
                                    <span className="package-options-p font-weight-500 ">Rs 50,000</span>
                                </div>
                            </div>
                        </div>
                        <div className="box col-6 p-2 text-center">
                            <div className={"order-details-box py-4 padding-10"}>
                                <Text className="order-details-heading" type={"secondary"}>Pending Value</Text>
                                <div className={"mt-1"}>
                                    <span className="package-options-p font-weight-500">Rs 50,000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Content>       
        </Layout>

    )
}

export default Dashboard