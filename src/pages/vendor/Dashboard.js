import {Link, useHistory} from "react-router-dom";
import { imagePath } from '../../services/assetsHelper'
import 'antd/dist/antd.css';
import { Drawer } from 'antd';
import {useEffect, useState} from "react";
import { Typography, Space, Layout } from 'antd';
import { Button } from 'antd-mobile';
import {apiUser} from "../../api/vendor/dashboard";
import {useDispatch, useSelector} from "react-redux";

import { userStore, getUser } from "../../reducers/reducers";

const Dashboard = () => {
    const [visible, setVisible] = useState(false);
    const { Text } = Typography;

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
        if(userSelector.length === 0) {
            apiUser().then(res => {
                if (res.status === 200){
                    if(res.data.location !== null) {
                        dispatch(userStore(res.data))
                    }
                }

            })
        }
    },[userSelector])

    return (
        <Layout>
        <section className="container mt-4 px-2 pb-4" >
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
            <div className="col-md-12">
                <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex">
                        <i className="fas fa-map-marker-alt red-gps" />
                        <div className="ml-1">
                            <p className="p-location-12 pr-1">{ userSelector?.location?.whole_address.substring(0,80) || "Your current location"}</p>
                            <p className="p-location-14" onClick={() => history.push('/map-search')}>
                                Add location
                            </p>
                        </div>
                    </div>
                    <div className="d-flex">
                        <i className="far fa-comment-alt" />
                        <i className="far fa-bell fa-bell-og  mx-3" />
                        <i className="fas fa-bars" onClick={showDrawer}/>
                    </div>
                </div>
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

                <div className="d-flex flex-wrap row px-2 justify-content-between mt-4">
                    <div className="col-6 p-2 text-center">
                        <div className={"order-details-box padding-10  py-4 border"}>
                            <Text className="order-details-heading" type={"secondary"}>Order Value</Text>
                            <div className={"mt-1"}>
                                <span className="package-options-p font-weight-500 ">Rs 50,000</span>
                            </div>
                        </div>
                    </div>
                    <div className="box col-6 p-2 text-center ">
                        <div className={"order-details-box padding-10  py-4 border"}>
                            <Text className="order-details-heading" type={"secondary"}>Delivered Value</Text>
                            <div className={"mt-1"}>
                                <span className="package-options-p font-weight-500 ">Rs 50,000</span>
                            </div>
                        </div>
                    </div>

                    <div className="box col-6 p-2 text-center">
                        <div className={"order-details-box padding-10  py-4 border"}>
                            <Text className="order-details-heading" type={"secondary"}>Returned Value</Text>
                            <div className={"mt-1"}>
                                <span className="package-options-p font-weight-500 ">Rs 50,000</span>
                            </div>
                        </div>
                    </div>
                    <div className="box col-6 p-2 text-center">
                        <div className={"order-details-box py-4 padding-10 border"}>
                            <Text className="order-details-heading" type={"secondary"}>Pending Value</Text>
                            <div className={"mt-1"}>
                                <span className="package-options-p font-weight-500">Rs 50,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </Layout>

    )
}

export default Dashboard