import { useHistory, Link } from "react-router-dom";
import { useEffect } from "react";

import { Steps } from "antd";
import { PageHeader, Badge } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { Tabs, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

import SplashImg1 from "../../assets/vendor/Splash1.svg";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const { Header, Content, Footer } = Layout;
const { Step } = Steps;

const Splash1 = () => {
  const history = useHistory();
  const { TextArea } = Input;

  return (
    <Layout>
      <Content
        className="site-layout"
        style={{
          padding: "0 14px",
          marginTop: 199,
        }}
      >
        <div className="site-layout-background position-relative  ">
          <div className="center-me">
            <img src={SplashImg1} width="66%" />
          </div>
          <div className="text-center">
            <div className=" mt-3">
              <p className="font-20 f-w-700">Safe Delivery</p>
              <p className=" faded-text pt-2">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et.
              </p>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Splash1;
