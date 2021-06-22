import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "antd";

import PackgeImg from "../../assets/vendor/packageimg.svg";
import { Steps } from "antd";
import { PageHeader } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const { Step } = Steps;

const { Header, Content, Footer } = Layout;

const Inbox = () => {
  const history = useHistory();

  return (
    <Layout>
      <PageHeader
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
        className="site-page-header bg-red "
        onBack={() => null}
        title="Inbox"
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
            <TabPane tab="Messages" key="1">
              <div className="d-flex">
                <img
                  src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg"
                  alt=""
                  className="message-img"
                />
                <div className="ml-2">
                  <p className="message-heading">Rider 1</p>
                  <p className="message-desc">
                    Your delivery requested has been accepted
                  </p>
                  <p className="message-time">3 min ago</p>
                </div>
              </div>
              <div className="d-flex my-3">
                <img
                  src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg"
                  alt=""
                  className="message-img"
                />
                <div className="ml-2">
                  <p className="message-heading">Rider 1</p>
                  <p className="message-desc">
                    Your delivery requested has been accepted
                  </p>
                  <p className="message-time">3 min ago</p>
                </div>
              </div>
              <div className="d-flex my-3">
                <img
                  src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg"
                  alt=""
                  className="message-img"
                />
                <div className="ml-2">
                  <p className="message-heading">Rider 1</p>
                  <p className="message-desc">
                    Your delivery requested has been accepted
                  </p>
                  <p className="message-time">3 min ago</p>
                </div>
              </div>
              <div className="d-flex my-3">
                <img
                  src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg"
                  alt=""
                  className="message-img"
                />
                <div className="ml-2">
                  <p className="message-heading">Rider 1</p>
                  <p className="message-desc">
                    Your delivery requested has been accepted
                  </p>
                  <p className="message-time">3 min ago</p>
                </div>
              </div>

              <div className="d-flex my-3">
                <img
                  src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg"
                  alt=""
                  className="message-img"
                />
                <div className="ml-2">
                  <p className="message-heading">Rider 1</p>
                  <p className="message-desc">
                    Your delivery requested has been accepted
                  </p>
                  <p className="message-time">3 min ago</p>
                </div>
              </div>

              <div className="d-flex my-3">
                <img
                  src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg"
                  alt=""
                  className="message-img"
                />
                <div className="ml-2">
                  <p className="message-heading">Rider 1</p>
                  <p className="message-desc">
                    Your delivery requested has been accepted
                  </p>
                  <p className="message-time">3 min ago</p>
                </div>
              </div>

              <div className="d-flex my-3">
                <img
                  src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg"
                  alt=""
                  className="message-img"
                />
                <div className="ml-2">
                  <p className="message-heading">Rider 1</p>
                  <p className="message-desc">
                    Your delivery requested has been accepted
                  </p>
                  <p className="message-time">3 min ago</p>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Notifications" key="2">
              <div className=" d-flex ">
                <div className="bell-border  ">
                  <i className="far fa-bell" />
                </div>
                <div className="ml-2 my-auto">
                  <p className="notif-heading">
                    Rider has requested to deliver your your package
                  </p>
                  <span className="notif-time">3 min ago</span>
                </div>
              </div>

              <div className="  d-flex my-3 ">
                <div className="bell-border ">
                  <i className="far fa-bell" />
                </div>
                <div className="ml-2 my-auto">
                  <p className="notif-heading">please verify your details</p>
                  <span className="notif-time">5 min ago</span>
                </div>
              </div>
              <div className="  d-flex my-3 ">
                <div className="bell-border  ">
                  <i className="far fa-bell" />
                </div>
                <div className="ml-2 my-auto">
                  <p className="notif-heading">
                    Welcome to Satichha Sangit sir
                  </p>
                  <span className="notif-time">10 min ago</span>
                </div>
              </div>
              <div className=" d-flex my-3 ">
                <div className="bell-border ">
                  <i className="far fa-bell" />
                </div>
                <div className="ml-2 my-auto">
                  <p className="notif-heading">नयाँ बर्ष २०७८ को शुभकामना</p>
                  <span className="notif-time">10 min ago</span>
                  <p className="font-14">
                    नयाँ बर्ष २०७८ को शुभकामना – यस ब्लगमा नयाँ बर्षको शुभकामना
                    तथा SMS को फोटोहरु र सन्देसहरु राखेको छु। आशा
                  </p>
                  <img
                    src="https://1.bp.blogspot.com/-eYsS8ZkoBlI/YEPdPzCjDyI/AAAAAAAAZ5c/HUN5cZq4E50WXEUWu98d-ndVXwi9AuTJwCLcBGAsYHQ/s1662/Happy%2BNew%2BYear%2B2078%2BImages%2B%25286%2529.jpg"
                    alt=""
                    className=" mt-2 img-fluid"
                  />
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default Inbox;
