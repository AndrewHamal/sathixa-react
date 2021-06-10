import {Link} from "react-router-dom";
import { imagePath } from '../../services/assetsHelper'
import 'antd/dist/antd.css';
import { Drawer } from 'antd';
import { apiLocation } from '../../api/vendor/register'
import {useEffect, useState} from "react";
import { Typography, Space, Button } from 'antd';

const { Text } = Typography;

const Dashboard = () => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    // const dispatch = useDispatch()
    // const locationValue = useSelector(location).payload.locateReducer

    // useEffect(() => {
    //     let user = apiUser()
    //     user.then(res => {
    //         if(res.status === 200){
    //             let whole_address = res.data.location.whole_address
    //             let address = whole_address.split(', ')
    //             let city = address[2]
    //             let district = address[3]
    //             let locationAll = city +', '+ district
    //             // dispatch(location(locationAll))
    //         }
    //     })
    //
    //     navigator.geolocation.getCurrentPosition((res) => {
    //         let lat = res.coords.latitude
    //         let long = res.coords.longitude
    //         let locationUpdate = apiLocation(lat, long)
    //         locationUpdate
    //             .then(res => {
    //                 if(res.status === 200) {
    //                     res['city'] = res.data.address.city
    //                     res['state'] = res.data.address.state
    //                     res['whole_address'] = res.data.display_name
    //                     res['lat'] = lat
    //                     res['long'] = long
    //                     let locationUpdate = apiLocationUpdate(res)
    //
    //                     locationUpdate
    //                         .then(res => {
    //                             if (res.status === 201) {
    //                                 dispatch(location(res.data.data.city))
    //                             }
    //                         })
    //                 }
    //             })
    //     })
    // },[locationValue])

    return (
        <section className="container mt-4 px-2 pb-4" >
            <Drawer
                title="Basic Drawer"
                placement="right"
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
                            <p className="p-location-12">Your current location</p>
                            <p className="p-location-14">
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
                        <Link className={"w-100 my-3"} to={"/package-form"}>
                            {/*<Button>*/}
                                <Button type={"primary"} size={"large"} className={"w-100 h-48 border-15"}>Send Package</Button>
                        </Link>
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

                <div className="d-flex flex-wrap row justify-content-between mt-4">
                    <div className="col-6 p-2 text-center">
                        <div className={"order-details-box padding-10  py-4 border"}>
                            <Text className="order-details-heading" type={"secondary"}>Order Value</Text>
                            <div>
                                <span className="package-options-p font-weight-500 ">Rs 50,000</span>
                            </div>
                        </div>
                    </div>
                    <div className="box col-6 p-2 text-center ">
                        <div className={"order-details-box padding-10  py-4 border"}>
                            <Text className="order-details-heading" type={"secondary"}>Delivered Value</Text>
                            <div>
                                <span className="package-options-p font-weight-500 ">Rs 50,000</span>
                            </div>
                        </div>
                    </div>

                    <div className="box col-6 p-2 text-center">
                        <div className={"order-details-box padding-10  py-4 border"}>
                            <Text className="order-details-heading" type={"secondary"}>Returned Value</Text>
                            <div>
                                <span className="package-options-p font-weight-500 ">Rs 50,000</span>
                            </div>
                        </div>
                    </div>
                    <div className="box col-6 p-2 text-center">
                        <div className={"order-details-box py-4 padding-10 border"}>
                            <Text className="order-details-heading" type={"secondary"}>Pending Value</Text>
                            <div>
                                <span className="package-options-p font-weight-500">Rs 50,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    )
}

export default Dashboard