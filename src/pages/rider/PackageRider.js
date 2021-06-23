import { useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "antd";
import React, { useState } from "react";

import { Steps } from "antd";
import { PageHeader } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { Modal } from "antd";
import { Tabs } from "antd";
import packageimg from "../../assets/vendor/packageimg.svg";
import Delivery from "./Delivery";
import CanvasDraw from "react-canvas-draw";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const { Step } = Steps;

const { Header, Content, Footer } = Layout;

const PackageRider = () => {
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
              <Button type="default " block className="my-2">
                Cancel Pickup
              </Button>
              {/* //Additional Info Section */}
              <section>
                <p className="mt-2 mb-1 font-12">Additional Information</p>
                <div className="package-card ">
                  <p className="add-info  ">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus
                    diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                  </p>
                </div>
              </section>
              {/* //payment details info */}
              <section className="package-card my-2">
                <div className="d-flex justify-content-between">
                  <p className="p-location-14">Delivery Charge</p>
                  <p className="p-location-14 ">Rs 200</p>
                </div>
                <div className="d-flex justify-content-between pt-3">
                  <p className="p-location-14 text-red">Total</p>
                  <p className="p-location-14 text-red">Rs 1000</p>
                </div>
              </section>
              <section>
                <p className="mt-3 mb-1 font-12">Reciever Info</p>
                <div className="package-card ">
                  <div className="d-flex">
                    <i class="fas fa-user-alt mr-2 d-p-color fa-xs my-auto "></i>
                    <p className="f-w-600">Hari Karki</p>
                  </div>
                  <div className="d-flex mt-3 pb-2">
                    <i class="fas fa-phone-alt mr-2 d-p-color fa-xs my-auto  "></i>
                    <p className="f-w-600">9842578777</p>
                  </div>
                  <Button
                    type="default "
                    block
                    className="my-2"
                    onClick={showModal}
                  >
                    Add Signature
                  </Button>
                </div>
              </section>
              <div className="d-flex justify-content-around">
                <Button type="primary " className="my-2">
                  <i class="fas fa-phone-volume pr-2 text-white"></i>
                  Call Vendor
                </Button>
                <Button type="default " className="my-2">
                  <i class="far fa-comment-dots pr-2"></i>
                  Message
                </Button>
              </div>
            </TabPane>
            <TabPane tab="History" key="2">
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
          </Tabs>
        </div>
      </Content>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        style={{ top: 20 }}
      >
        <p className="text-center text-lg f-w-600">Reciever Signature</p>
        <CanvasDraw className="sign-draw" />

        <Button block type="primary" className="my-2">
          Complete Delivery
        </Button>
      </Modal>
    </Layout>
  );
};

export default PackageRider;
