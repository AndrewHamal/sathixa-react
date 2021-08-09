import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import React, { useState } from "react";
import {
  Steps,
  Button,
  PageHeader,
  Layout,
  Tabs,
  Skeleton
} from "antd";
import packageimg from "../../assets/vendor/packageimg.svg";
// import ReactDOM from "react-dom";
// import Verify from "../../assets/vendor/Verify.svg";
import { getPackage } from "@/api/vendor"

const PackageTrack = () => {
  let { id } = useParams()

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  const { Step } = Steps;

  const { Header, Content, Footer } = Layout;

  const history = useHistory()
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {

    getPackage(id)
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
  }, [])

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <PageHeader
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
        className="site-page-header bg-red "
        onBack={() => history.goBack()}
        title="Packages"
      />


      <Content
        className="site-layout"
        style={{
          padding: "0 14px",
          marginTop: 60,
        }}
      >
        {
          loading ? <Skeleton active /> :
            <div className="site-layout-background mb-3">
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab={data.process_step == 3 ?
                  "Delivered"
                  : data.process_step === null ?
                    "Pending"
                    : "Processing"
                } key="1">
                  <div className="package-card ">
                    <div className="d-flex  flex-wrap">
                      <img src={packageimg} alt="" className="width-pack" />
                      <table className="table ml-2 my-auto">
                        <tbody>
                          <tr>
                            <td className="font-14 font-weight-600 text-capitalize">
                              {data?.vendor?.first_name + ' ' + data?.vendor?.last_name}
                            </td>
                            <td className="font-14 font-weight-600 text-align-end pl-1">
                              x {data?.no_of_package}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-small">Categories</td>
                            <td className="p-small p-small-sharp ">
                              {data?.category?.title}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-small">Weight</td>
                            <td className="p-small p-small-sharp ">{data?.weight}KG</td>
                          </tr>
                          <tr>
                            <td className="p-small font-14">Price</td>
                            <td className="vendor-package-price font-14  ">
                              Rs {data?.product_price}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="my-auto ml-auto">
                        {data.process_step == 3 ?
                          <p className="status-success font-12 text-success">Delivered</p>
                          : data.process_step === null ?
                            <p className="status-success font-12 text-warning">Pending</p>
                            : <p className="status-active font-12 text-info">Processing</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="package-card mt-3 step">
                    <Steps
                      direction="vertical"
                      size="small"
                      className="mt-1"
                      current={data.process_step === null ? '' : data.process_step === 3 ? 4 : data.process_step - 1}
                    >
                      <Step
                        title="Shipping Address"
                        description={data?.location?.whole_address}
                      />
                      <Step
                        title="On the way"
                        description="Package has been sent from the client to reciever."
                      />
                      <Step title="Delivered" description="Package received" />
                    </Steps>

                  </div>
                  {data?.process_step !== null ?
                    <div className="d-flex mt-2">
                      <a className="mr-1 w-100" href={`tel:${data?.rider?.phone}`}>
                        <Button type="primary" className="my-2 flex-fill w-100 ">
                          <i className="fas fa-phone-volume pr-2 text-white"></i>
                        Call Rider
                      </Button>
                      </a>
                      <Link to={'/chat/' + id} className="my-2 flex-fill w-100 ml-1">
                        <Button type="default" className="w-100">
                          <i className="far fa-comment-dots pr-2"></i>
                          Message
                        </Button>
                      </Link>
                    </div>
                    : ""
                  }

                  {data?.process_step !== null && data?.process_step !== 3 ?
                    <Link to={`/map-search?rider=${data?.id}`}>
                      <Button type="defaylt" className="my-2 flex-fill w-100 ">
                        <i className="fas fa-map-pin pr-2"></i>
                      Track My Rider
                  </Button>
                    </Link> : null
                  }

                </TabPane>

              </Tabs>
            </div>
        }
      </Content>

    </Layout>
  );
};

export default PackageTrack;