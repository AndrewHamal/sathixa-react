import { Link, useHistory } from "react-router-dom";
import { imagePath } from '@/services/assetsHelper'
import { useEffect, useState } from "react";
import { Button, NoticeBar } from 'antd-mobile';
import { Typography, Layout, Drawer, PageHeader, Menu } from 'antd';
import { apiUser } from "@/api/vendor/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { MailOutlined } from '@ant-design/icons';

import { userStore, getUser } from "@/reducers/reducers";

const Dashboard = () => {
    const [visible, setVisible] = useState(false);
    const { Text } = Typography;
    const { Content } = Layout;
    const { SubMenu } = Menu;

    const showDrawer = () => {
        setVisible(true);
    };
    const history = useHistory();
    const dispatch = useDispatch()
    const userSelector = useSelector(getUser)

    const onClose = () => {
        setVisible(false);
    };

    const handleClick = e => {
        console.log(e.key)
        history.push(e.key)
    };

    useEffect(() => {

        if(userSelector.length === 0) {
            apiUser().then(res => {          
                if(res.data.location !== null) {
                    dispatch(userStore(res.data))
                }
            })
        }
    },[dispatch, userSelector])

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
                    title="Menu"
                    placement="left"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    className="p-0"
                >   

                    <Menu
                        onClick={handleClick}
                        defaultSelectedKeys={['/ticket/create']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu key="sub1" icon={<MailOutlined />} title="Ticket">
                            <Menu.Item key="/ticket/create" className="my-0 py-0">Open New Ticket</Menu.Item>
                            <Menu.Item key="/ticket?type=all" className="my-0 py-0">Ticket List</Menu.Item>
                        </SubMenu>
                    </Menu>
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