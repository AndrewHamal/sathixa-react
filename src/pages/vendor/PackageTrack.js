import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "antd";
import React, { useState } from "react";
import { Steps } from "antd";
import { PageHeader } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { Tabs } from "antd";
import packageimg from "../../assets/vendor/packageimg.svg";
import { Modal } from "antd";
import ReactDOM from "react-dom";
import Verify from "../../assets/vendor/Verify.svg";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const { Step } = Steps;

const { Header, Content, Footer } = Layout;

const PackageTrack = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const history = useHistory();

  return (
    <Layout>
      <PageHeader
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
        className="site-page-header bg-red "
        onBack={() => null}
        title="Packages"
      />

      <Content
        className="site-layout"
        style={{
          padding: "0 25px",
          marginTop: 67,
        }}
      >
        <div className="site-layout-background">
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Ongoing" key="1">
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
                    <p className="status-active font-12">Processing</p>
                  </div>
                </div>
              </div>
              <div className="package-card mt-3">
                <Steps
                  direction="vertical"
                  size="small"
                  className="mt-1"
                  current={1}
                >
                  <Step
                    title="Shipping Address"
                    description="Lokanthali, Bhaktapur Nepal"
                  />
                  <Step
                    title="On the way"
                    description="Package has been sent from the client to reciever."
                  />
                  <Step title="Waiting" description="Package received" />
                </Steps>
                <Button className="mb-1" block onClick={showModal}>
                  Completed
                </Button>
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
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        style={{ top: 20 }}
      >
        <img src={Verify}></img>
        <p className="text-center text-lg f-w-600">Need Verification</p>
        <p className="heading-sm  text-center heading-l">
          We need to verify you before you proceed with our service.
        </p>
        <Button block type="primary" className="my-2">
          Verify Now
        </Button>
      </Modal>
    </Layout>
  );
};

export default PackageTrack;
