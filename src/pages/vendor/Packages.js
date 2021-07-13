import {useEffect, useState} from "react";
import { getPackages } from "../../api/vendor";
import {getPackage, packageStore} from "../../reducers/reducers";
import {useDispatch, useSelector} from "react-redux";
import {SegmentedControl, Pagination, Icon} from "antd-mobile";
import {Skeleton, Layout, Empty} from "antd";
import { Link } from "react-router-dom";
import * as BS from "bikram-sambat-js"

const { Header, Content, Footer } = Layout;

const Packages = () => {
    const dispatch = useDispatch();
    const packageValue = useSelector(getPackage)
    const [nextPage, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [loader, setLoader] = useState(true)
    const [msgError, setMsgError] = useState('')
    const [segment, setSegment] = useState(0)

    const locale = {
        prevText: 'Prev',
        nextText: 'Next',
    };

    const fetchData = (search, page, type, changeSegment=false) => {
        getPackages(search, page, type)
            .then(res => {
                if(res.data.data.length === 0){
                    dispatch(packageStore([]))
                    if(type === 0)
                        setMsgError(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Oops!! No data"/>)
                    
                    if(type === 1)
                        setMsgError(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Oops!! No data found on processing"/>)
                                 
                    if(type === 2)
                        setMsgError(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Oops!! No data found on Delivery"/>)

                    setHasMore(false)
                    return
                }

                let data = res.data.data
                let lastPage = res.data.last_page
                let currentPage = res.data.current_page;

                setLastPage(lastPage)
                setPage(currentPage)
                dispatch(packageStore(data))
                setLoader(false)
            })
    }

    const handleSearch = (event) => {
        let text = event.target.value
        setLoader(true)
        getPackages(text, 0)
            .then(res => {
                setLoader(false)
                if (res?.status === 200) {
                    dispatch(packageStore(res.data.data))
                }

                if(res.data.data.length === 0)
                    setMsgError(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)

            })
    }

    const getFilterPackages = () => {
        fetchData('', nextPage, segment)
    }

    useEffect(() => {
        if(packageValue.length === 0) {
            fetchData('', nextPage, 0)
        }else{
            setLoader(false)
        }
    }, [])

    return (
    <Layout>

    <Content
        className="site-layout"
        style={{
        padding: "0 14px",
        marginTop: 14,
        }}
    >
    <section className="">
        <div className="pb-2">
            <div className="d-flex justify-content-between mb-3">
                <p className="p-location-14">Satichha</p>
                {/* <i className="fas fa-user-circle fa-lg my-auto" /> */}
            </div>
            <div className="form-group my-3 position-relative">
                <i className="fas fa-search position-absolute " />
                <input type="text" className="form-control search-bar" onInput={handleSearch} id="search" placeholder="Enter your track number" />
            </div>
            <div>
                <p className="font-17 font-weight-bold">Your Packages</p>
                <div className="d-flex overflow-y-scroll hide-scrollbar py-2">
                    <div className="paackage-card mt-1">
                        <div className="d-flex">
                            <svg id="baseline-how_to_reg-24px" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
                                <path id="Path_946" data-name="Path 946" d="M0,0H24V24H0Z" fill="none" fillRule="evenodd" />
                                <g id="Group_11" data-name="Group 11">
                                    <path id="Path_947" data-name="Path 947" d="M9,17l3-2.94A9.341,9.341,0,0,0,11,14c-2.67,0-8,1.34-8,4v2h9Zm2-5A4,4,0,1,0,7,8a4,4,0,0,0,4,4" fill="#db2b39" fillRule="evenodd" />
                                    <path id="Path_948" data-name="Path 948" d="M15.47,20.5,12,17l1.4-1.41,2.07,2.08L20.6,12.5,22,13.91Z" fill="#db2b39" fillRule="evenodd" />
                                </g>
                            </svg>
                            <p className="font-12 font-weight-bold my-auto ml-1">Rider</p>
                        </div>
                        <div className="mt-2">
                            <p className="package-card-date">APR 21</p>
                            <div className="d-flex justify-content-between">
                                <p className="rider-details">Kathmandu - Bhaktapur Assign to : Rider 1</p>
                                <p className="vendor-package-price">Price : Rs 800</p>
                            </div>
                        </div>
                        <div className="d-flex mt-2">
                            <span className="dot my-auto" />
                            <span className="tracking-hr pl-1 my-auto" />
                            <span className=" dot my-auto" />
                            <span className="tracking-hr pl-1 my-auto" />
                            <svg xmlns=" http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                                <g id="Group_2180" data-name="Group 2180" transform="translate(-290 -428.504)">
                                    <circle id="Ellipse_13" data-name="Ellipse 13" cx={11} cy={11} r={11} transform="translate(290 428.504)" fill="#db2b39" />
                                    <g id="outline-local_shipping-24px" transform="translate(293.708 432.708)">
                                        <g id="Bounding_Boxes">
                                            <path id="Path_3290" data-name="Path 3290" d="M0,0H14.83V14.83H0Z" fill="none" />
                                        </g>
                                        <g id="Outline" transform="translate(0.618 2.472)">
                                            <path id="Path_3291" data-name="Path 3291" d="M12.741,6.472H10.887V4H2.236A1.24,1.24,0,0,0,1,5.236v6.8H2.236a1.854,1.854,0,1,0,3.708,0H9.651a1.854,1.854,0,1,0,3.708,0h1.236V8.943Zm-.309.927,1.211,1.545H10.887V7.4ZM4.09,12.651a.618.618,0,1,1,.618-.618A.62.62,0,0,1,4.09,12.651ZM5.461,10.8a1.832,1.832,0,0,0-2.744,0H2.236V5.236H9.651V10.8ZM11.5,12.651a.618.618,0,1,1,.618-.618A.62.62,0,0,1,11.5,12.651Z" transform="translate(-1 -4)" fill="#fff" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span className="tracking-hr-inactive pl-1 my-auto" />
                            <span className="dot-inactive my-auto" />
                        </div>
                        <div className="d-flex justify-content-end">
                            <p className="vendor-cancel-delivery">Cancel delivery</p>
                        </div>
                    </div>
                    <div className="paackage-card mt-1 ml-4">
                        <div className="d-flex">
                            <svg id="baseline-how_to_reg-24px" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
                                <path id="Path_946" data-name="Path 946" d="M0,0H24V24H0Z" fill="none" fillRule="evenodd" />
                                <g id="Group_11" data-name="Group 11">
                                    <path id="Path_947" data-name="Path 947" d="M9,17l3-2.94A9.341,9.341,0,0,0,11,14c-2.67,0-8,1.34-8,4v2h9Zm2-5A4,4,0,1,0,7,8a4,4,0,0,0,4,4" fill="#db2b39" fillRule="evenodd" />
                                    <path id="Path_948" data-name="Path 948" d="M15.47,20.5,12,17l1.4-1.41,2.07,2.08L20.6,12.5,22,13.91Z" fill="#db2b39" fillRule="evenodd" />
                                </g>
                            </svg>
                            <p className="font-12 font-weight-bold my-auto ml-1">Rider</p>
                        </div>
                        <div className="mt-2">
                            <p className="package-card-date">APR 21</p>
                            <div className="d-flex justify-content-between">
                                <p className="rider-details">Kathmandu - Bhaktapur Assign to : Rider 1</p>
                                <p className="vendor-package-price">Price : Rs 800</p>
                            </div>
                        </div>
                        <div className="d-flex mt-2">
                            <span className="dot my-auto" />
                            <span className="tracking-hr pl-1 my-auto" />
                            <span className=" dot my-auto" />
                            <span className="tracking-hr pl-1 my-auto" />
                            <svg xmlns=" http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                                <g id="Group_2180" data-name="Group 2180" transform="translate(-290 -428.504)">
                                    <circle id="Ellipse_13" data-name="Ellipse 13" cx={11} cy={11} r={11} transform="translate(290 428.504)" fill="#db2b39" />
                                    <g id="outline-local_shipping-24px" transform="translate(293.708 432.708)">
                                        <g id="Bounding_Boxes">
                                            <path id="Path_3290" data-name="Path 3290" d="M0,0H14.83V14.83H0Z" fill="none" />
                                        </g>
                                        <g id="Outline" transform="translate(0.618 2.472)">
                                            <path id="Path_3291" data-name="Path 3291" d="M12.741,6.472H10.887V4H2.236A1.24,1.24,0,0,0,1,5.236v6.8H2.236a1.854,1.854,0,1,0,3.708,0H9.651a1.854,1.854,0,1,0,3.708,0h1.236V8.943Zm-.309.927,1.211,1.545H10.887V7.4ZM4.09,12.651a.618.618,0,1,1,.618-.618A.62.62,0,0,1,4.09,12.651ZM5.461,10.8a1.832,1.832,0,0,0-2.744,0H2.236V5.236H9.651V10.8ZM11.5,12.651a.618.618,0,1,1,.618-.618A.62.62,0,0,1,11.5,12.651Z" transform="translate(-1 -4)" fill="#fff" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span className="tracking-hr-inactive pl-1 my-auto" />
                            <span className="dot-inactive my-auto" />
                        </div>
                        <div className="d-flex justify-content-end">
                            <p className="vendor-cancel-delivery">Cancel delivery</p>
                        </div>
                    </div>
                    <div className="paackage-card mt-1 ml-4">
                        <div className="d-flex">
                            <svg id="baseline-how_to_reg-24px" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
                                <path id="Path_946" data-name="Path 946" d="M0,0H24V24H0Z" fill="none" fillRule="evenodd" />
                                <g id="Group_11" data-name="Group 11">
                                    <path id="Path_947" data-name="Path 947" d="M9,17l3-2.94A9.341,9.341,0,0,0,11,14c-2.67,0-8,1.34-8,4v2h9Zm2-5A4,4,0,1,0,7,8a4,4,0,0,0,4,4" fill="#db2b39" fillRule="evenodd" />
                                    <path id="Path_948" data-name="Path 948" d="M15.47,20.5,12,17l1.4-1.41,2.07,2.08L20.6,12.5,22,13.91Z" fill="#db2b39" fillRule="evenodd" />
                                </g>
                            </svg>
                            <p className="font-12 font-weight-bold my-auto ml-1">Rider</p>
                        </div>
                        <div className="mt-2">
                            <p className="package-card-date">APR 21</p>
                            <div className="d-flex justify-content-between">
                                <p className="rider-details">Kathmandu - Bhaktapur Assign to : Rider 1</p>
                                <p className="vendor-package-price">Price : Rs 800</p>
                            </div>
                        </div>
                        <div className="d-flex mt-2">
                            <span className="dot my-auto" />
                            <span className="tracking-hr pl-1 my-auto" />
                            <span className=" dot my-auto" />
                            <span className="tracking-hr pl-1 my-auto" />
                            <svg xmlns=" http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                                <g id="Group_2180" data-name="Group 2180" transform="translate(-290 -428.504)">
                                    <circle id="Ellipse_13" data-name="Ellipse 13" cx={11} cy={11} r={11} transform="translate(290 428.504)" fill="#db2b39" />
                                    <g id="outline-local_shipping-24px" transform="translate(293.708 432.708)">
                                        <g id="Bounding_Boxes">
                                            <path id="Path_3290" data-name="Path 3290" d="M0,0H14.83V14.83H0Z" fill="none" />
                                        </g>
                                        <g id="Outline" transform="translate(0.618 2.472)">
                                            <path id="Path_3291" data-name="Path 3291" d="M12.741,6.472H10.887V4H2.236A1.24,1.24,0,0,0,1,5.236v6.8H2.236a1.854,1.854,0,1,0,3.708,0H9.651a1.854,1.854,0,1,0,3.708,0h1.236V8.943Zm-.309.927,1.211,1.545H10.887V7.4ZM4.09,12.651a.618.618,0,1,1,.618-.618A.62.62,0,0,1,4.09,12.651ZM5.461,10.8a1.832,1.832,0,0,0-2.744,0H2.236V5.236H9.651V10.8ZM11.5,12.651a.618.618,0,1,1,.618-.618A.62.62,0,0,1,11.5,12.651Z" transform="translate(-1 -4)" fill="#fff" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span className="tracking-hr-inactive pl-1 my-auto" />
                            <span className="dot-inactive my-auto" />
                        </div>
                        <div className="d-flex justify-content-end">
                            <p className="vendor-cancel-delivery">Cancel delivery</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="status-tab d-flex justify-content-between my-3">
                <SegmentedControl
                    selectedIndex={segment}
                    className={"w-100 border-none font-14"}
                    values={['Total Order', 'Processing', 'Delivered']}
                    tintColor={"#db2b39"}
                    onChange={e => {setSegment(e.nativeEvent.selectedSegmentIndex); fetchData('', 0, e.nativeEvent.selectedSegmentIndex, true)}}
                    // onValueChange={e => console.log()}
                />
            </div>
            <div>
                <Skeleton loading={loader} active />
                {
                    packageValue.length > 0 ?
                        packageValue.map((res,key) => (
                            <Link to={`/package-detail/${res.id}`} key={key}>
                                <div className="total-order-card ap mb-2 d-flex justify-content-between">
                                    <div className="d-flex">
                                        <div className="store-border d-flex p-2">
                                            <i className="fas fa-store m-auto" />
                                        </div>
                                        <div className="ml-1">
                                            <p className="font-17 font-weight-bold">{ res.receiver_name }</p>
                                            <p className="package-card-date pt-0">{ res?.location?.city }</p>
                                        </div>
                                    </div>
                                    <div>
                                        {/* <p className="package-card-date">{ res.process_step == 1 || res.process_step == 2 ? 'Processing' : 'Delivered' } </p> */}
                                        { res.process_step == 3 ?
                                            <p className="package-card-date text-right">Delivered</p>
                                            : res.process_step === null ?  
                                            <p className="package-card-date text-right">Pending</p>
                                            : <p className="package-card-date text-right">Processing</p>
                                        }
                                        <p className="font-14 f-w-600 text-right">
                                            {BS.ADToBS(`${new Date(res.created_at).getFullYear()}-${new Date(res.created_at).getMonth() + 1}-${new Date(res.created_at).getDate()}`)}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    : msgError
                }   

                {
                    lastPage > 1 ?
                    <Pagination 
                        total={lastPage} 
                        current={nextPage} 
                        locale={locale} 
                        onChange={e => fetchData('', e, segment)}
                    /> : null

                }
   

            </div>
        </div>
    </section>
    </Content>
    </Layout>
    )
}

export default Packages