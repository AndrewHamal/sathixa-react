import { useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "antd";

import { Steps } from "antd";
import { PageHeader } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { Tabs } from "antd";
import { onGoingPackage, historyPackage } from "@/api/rider/index"
import packageimg from "@/assets/vendor/packageimg.svg";
import { Empty } from 'antd';
import { Skeleton } from "antd"

const { TabPane } = Tabs;

const { Step } = Steps;

const { Header, Content, Footer } = Layout;

const Pack = () => {

  const history = useHistory();
  const [packagesOnGoing, setPackagesOnGoing] = useState([])
  const [packagesHistory, setPackagesHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    if(isMounted)
      callback(1)

    return () => { isMounted = false }
  }, [])

  function callback(key) {
    if(key == 1){
      if(packagesOnGoing.length === 0){
        onGoingPackage()
        .then(res => {
          setPackagesOnGoing(res.data)
          setLoading(false)
        })
      }

    }
    if(key == 2){
      if(packagesHistory.length === 0){
        historyPackage()
        .then(res => {
          setPackagesHistory(res.data)
          setLoading(false)
        })
      }
    }
  }

  return (
    <Layout>
      <PageHeader
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
        className="site-page-header bg-red "
        title="Packages"
      />

      <Content
        className="site-layout"
        style={{
          padding: "0 14px",
          marginTop: 67,
        }}
      >
        {
          loading ? <Skeleton active/>
          :
          <div className="site-layout-background mb-2">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Ongoing" key="1">

                {
                  packagesOnGoing.map((v, i)=> (
                    <Link to="/Delivery" key={i}>
                      <div className="package-card mb-2">
                        <div className="d-flex  flex-wrap">
                          <img src={packageimg} alt="" className="width-pack" />
                          { console.log(v) }
                          <table className="table ml-2 my-auto">
                            <tbody>
                              <tr>
                                <td className="font-14 font-weight-600 text-capitalize">
                                  {  v?.package?.vendor?.first_name + ' ' + v?.package?.vendor?.last_name  }
                                </td>
                                <td className="font-14 font-weight-600 text-align-end pl-1">
                                  x {v?.package?.no_of_package }
                                </td>
                              </tr>
                              <tr>
                                <td className="p-small">Categories</td>
                                <td className="p-small p-small-sharp ">
                                  {v?.package?.category?.title }
                                </td>
                              </tr>
                              <tr>
                                <td className="p-small">Weight</td>
                                <td className="p-small p-small-sharp ">{v?.package?.weight }KG</td>
                              </tr>
                              <tr>
                                <td className="p-small font-14">Price</td>
                                <td className="vendor-package-price font-14  ">
                                  Rs {v?.package?.product_price }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="my-auto ml-auto">
                            <p className="status-active font-12">Processing</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                }

                {
                  packagesOnGoing.length === 0 
                  ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : ''
                }
          
              </TabPane>
              <TabPane tab="Completed" key="2">
              {
                  packagesHistory.map((v, i)=> (
                    <Link to="/Delivery" key={i}>
                      <div className="package-card mb-2">
                        <div className="d-flex  flex-wrap">
                          <img src={packageimg} alt="" className="width-pack" />
                          { console.log(v) }
                          <table className="table ml-2 my-auto">
                            <tbody>
                              <tr>
                                <td className="font-14 font-weight-600 text-capitalize">
                                  {  v?.package?.vendor?.first_name + ' ' + v?.package?.vendor?.last_name  }
                                </td>
                                <td className="font-14 font-weight-600 text-align-end pl-1">
                                  x {v?.package?.no_of_package }
                                </td>
                              </tr>
                              <tr>
                                <td className="p-small">Categories</td>
                                <td className="p-small p-small-sharp ">
                                  {v?.package?.category?.title }
                                </td>
                              </tr>
                              <tr>
                                <td className="p-small">Weight</td>
                                <td className="p-small p-small-sharp ">{v?.package?.weight }KG</td>
                              </tr>
                              <tr>
                                <td className="p-small font-14">Price</td>
                                <td className="vendor-package-price font-14  ">
                                  Rs {v?.package?.product_price }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="my-auto ml-auto">
                            <p className="status-active font-12">Processing</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                }
                {
                  packagesHistory.length === 0 
                  ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : ''
                }
              </TabPane>
              <TabPane tab="Cancelled" key="3">
                <div className="package-card ">
                  <div className="d-flex  flex-wrap">
                    <img src={packageimg} alt="" className="width-pack" />
                    <table className="table ml-2 my-auto">
                      <tbody>
                        <tr>
                          <td className="font-14 font-weight-600">
                            Akkal Prasad
                          </td>
                          <td className="font-14 font-weight-600 text-align-end">
                            x1
                          </td>
                        </tr>
                        <tr>
                          <td className="p-small">Categories</td>
                          <td className="p-small p-small-sharp ">Electronics</td>
                        </tr>
                        <tr>
                          <td className="p-small">Weight</td>
                          <td className="p-small p-small-sharp ">2KG</td>
                        </tr>
                        <tr>
                          <td className="p-small font-14">Price</td>
                          <td className="vendor-package-price font-14  ">
                            Rs 342
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="my-auto ml-auto">
                      <p className="status-closed font-12">Returned</p>
                    </div>
                  </div>
                </div>
                <div className="package-card my-3 ">
                  <div className="d-flex  flex-wrap">
                    <img src={packageimg} alt="" className="width-pack" />
                    <table className="table ml-2 my-auto">
                      <tbody>
                        <tr>
                          <td className="font-14 font-weight-600">
                            Akkal Prasad
                          </td>
                          <td className="font-14 font-weight-600 text-align-end">
                            x1
                          </td>
                        </tr>
                        <tr>
                          <td className="p-small">Categories</td>
                          <td className="p-small p-small-sharp ">Electronics</td>
                        </tr>
                        <tr>
                          <td className="p-small">Weight</td>
                          <td className="p-small p-small-sharp ">2KG</td>
                        </tr>
                        <tr>
                          <td className="p-small font-14">Price</td>
                          <td className="vendor-package-price font-14  ">
                            Rs 342
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="my-auto ml-auto">
                      <p className="status-closed font-12">Returned</p>
                    </div>
                  </div>
                </div>
                <div className="package-card my-3 ">
                  <div className="d-flex  flex-wrap">
                    <img src={packageimg} alt="" className="width-pack" />
                    <table className="table ml-2 my-auto">
                      <tbody>
                        <tr>
                          <td className="font-14 font-weight-600">
                            Akkal Prasad
                          </td>
                          <td className="font-14 font-weight-600 text-align-end">
                            x1
                          </td>
                        </tr>
                        <tr>
                          <td className="p-small">Categories</td>
                          <td className="p-small p-small-sharp ">Electronics</td>
                        </tr>
                        <tr>
                          <td className="p-small">Weight</td>
                          <td className="p-small p-small-sharp ">2KG</td>
                        </tr>
                        <tr>
                          <td className="p-small font-14">Price</td>
                          <td className="vendor-package-price font-14  ">
                            Rs 342
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="my-auto ml-auto">
                      <p className="status-closed font-12">Returned</p>
                    </div>
                  </div>
                </div>
                <div className="package-card my-3 ">
                  <div className="d-flex  flex-wrap">
                    <img src={packageimg} alt="" className="width-pack" />
                    <table className="table ml-2 my-auto">
                      <tbody>
                        <tr>
                          <td className="font-14 font-weight-600">
                            Akkal Prasad
                          </td>
                          <td className="font-14 font-weight-600 text-align-end">
                            x1
                          </td>
                        </tr>
                        <tr>
                          <td className="p-small">Categories</td>
                          <td className="p-small p-small-sharp ">Electronics</td>
                        </tr>
                        <tr>
                          <td className="p-small">Weight</td>
                          <td className="p-small p-small-sharp ">2KG</td>
                        </tr>
                        <tr>
                          <td className="p-small font-14">Price</td>
                          <td className="vendor-package-price font-14  ">
                            Rs 342
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="my-auto ml-auto">
                      <p className="status-closed font-12">Returned</p>
                    </div>
                  </div>
                </div>

                <div className="package-card my-3 ">
                  <div className="d-flex  flex-wrap">
                    <img src={packageimg} alt="" className="width-pack" />
                    <table className="table ml-2 my-auto">
                      <tbody>
                        <tr>
                          <td className="font-14 font-weight-600">
                            Akkal Prasad
                          </td>
                          <td className="font-14 font-weight-600 text-align-end">
                            x1
                          </td>
                        </tr>
                        <tr>
                          <td className="p-small">Categories</td>
                          <td className="p-small p-small-sharp ">Electronics</td>
                        </tr>
                        <tr>
                          <td className="p-small">Weight</td>
                          <td className="p-small p-small-sharp ">2KG</td>
                        </tr>
                        <tr>
                          <td className="p-small font-14">Price</td>
                          <td className="vendor-package-price font-14  ">
                            Rs 342
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="my-auto ml-auto">
                      <p className="status-closed font-12">Returned</p>
                    </div>
                  </div>
                </div>

                <div className="package-card my-3 ">
                  <div className="d-flex  flex-wrap">
                    <img src={packageimg} alt="" className="width-pack" />
                    <table className="table ml-2 my-auto">
                      <tbody>
                        <tr>
                          <td className="font-14 font-weight-600">
                            Akkal Prasad
                          </td>
                          <td className="font-14 font-weight-600 text-align-end">
                            x1
                          </td>
                        </tr>
                        <tr>
                          <td className="p-small">Categories</td>
                          <td className="p-small p-small-sharp ">Electronics</td>
                        </tr>
                        <tr>
                          <td className="p-small">Weight</td>
                          <td className="p-small p-small-sharp ">2KG</td>
                        </tr>
                        <tr>
                          <td className="p-small font-14">Price</td>
                          <td className="vendor-package-price font-14  ">
                            Rs 342
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="my-auto ml-auto">
                      <p className="status-closed font-12">Returned</p>
                    </div>
                  </div>
                </div>

                <div className="package-card my-3 ">
                  <div className="d-flex  flex-wrap">
                    <img src={packageimg} alt="" className="width-pack" />
                    <table className="table ml-2 my-auto">
                      <tbody>
                        <tr>
                          <td className="font-14 font-weight-600">
                            Akkal Prasad
                          </td>
                          <td className="font-14 font-weight-600 text-align-end">
                            x1
                          </td>
                        </tr>
                        <tr>
                          <td className="p-small">Categories</td>
                          <td className="p-small p-small-sharp ">Electronics</td>
                        </tr>
                        <tr>
                          <td className="p-small">Weight</td>
                          <td className="p-small p-small-sharp ">2KG</td>
                        </tr>
                        <tr>
                          <td className="p-small font-14">Price</td>
                          <td className="vendor-package-price font-14  ">
                            Rs 342
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="my-auto ml-auto">
                      <p className="status-closed font-12">Returned</p>
                    </div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        }
       
      </Content>
    </Layout>
  );
};

export default Pack;
