import { useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "antd";

import { Steps } from "antd";
import { PageHeader } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { Tabs } from "antd";
import packageimg from "../../assets/vendor/packageimg.svg";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const { Step } = Steps;

const { Header, Content, Footer } = Layout;

const Pack = () => {
  const history = useHistory();

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
        <div className="site-layout-background">
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Ongoing" key="1">
              <Link to="/Delivery">
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
                          <td className="p-small p-small-sharp ">
                            Electronics
                          </td>
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
                      <p className="status-active font-12">Processing</p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="package-card my-3">
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
                    <p className="status-active font-12">Processing</p>
                  </div>
                </div>
              </div>
              <div className="package-card my-3">
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
                    <p className="status-active font-12">Processing</p>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Completed" key="2">
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
                    <p className="status-sent font-12">Delivered</p>
                  </div>
                </div>
              </div>
              <div className="package-card my-3">
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
                    <p className="status-sent font-12">Delivered</p>
                  </div>
                </div>
              </div>
              <div className="package-card my-3">
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
                    <p className="status-sent font-12">Delivered</p>
                  </div>
                </div>
              </div>
              <div className="package-card my-3">
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
                    <p className="status-sent font-12">Delivered</p>
                  </div>
                </div>
              </div>
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
      </Content>
    </Layout>
  );
};

export default Pack;
