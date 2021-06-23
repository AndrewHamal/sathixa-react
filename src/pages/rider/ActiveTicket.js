import { useHistory, Link } from "react-router-dom";
import { useEffect } from "react";

import { Steps } from "antd";
import { PageHeader, Badge } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { Tabs } from "antd";
import packageimg from "../../assets/vendor/packageimg.svg";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const { Step } = Steps;

const { Header, Content, Footer } = Layout;

const ActiveTicket = () => {
  const history = useHistory();

  return (
    <Layout>
      <PageHeader
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
        className="site-page-header bg-red "
        title="Active Ticket"
        onBack={() => "null"}
      />

      <Content
        className="site-layout"
        style={{
          padding: "0 14px",
          marginTop: 67,
        }}
      >
        <div className="site-layout-background">
          <Link to="/Delivery">
            <div className="package-card mt-3 ">
              <div className="d-flex">
                <img
                  src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg"
                  alt=""
                  className="ticket-img"
                />
                <div className="ml-2   my-auto flex-wrap">
                  <p className="message-time">Apr 20, 2021</p>
                  <p className="font-14 font-weight-600 pt-2">
                    Is Your Office Open ?
                  </p>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="priority-badge green-bg d-flex mr-2">
                  <span className="dot-green my-auto mr-1"></span>
                  <p className="font-10 green">Medium</p>
                </div>
                <div className="priority-badge d-flex">
                  <p className="font-10 ">Closed</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </Content>
    </Layout>
  );
};

export default ActiveTicket;
