import { useHistory, Link } from "react-router-dom";
import { useEffect } from "react";

import { Steps } from "antd";
import { PageHeader, Badge } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { Tabs, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

import packageimg from "../../assets/vendor/packageimg.svg";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const { Header, Content, Footer } = Layout;
const { Step } = Steps;

const Chat = () => {
  const history = useHistory();
  const { TextArea } = Input;

  return (
    <Layout>
      <PageHeader
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
        className="site-page-header bg-red "
        title="Chat"
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
            <div className="d-flex justify-content flex-column mt-3 ">
              <img
                src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg"
                alt=""
                className="ticket-img mx-auto"
              />
              <p className="font-14 font-weight-600 pt-2 text-center">
                Vendor 1
              </p>
              <p className="message-time text-center py-1 f-w-600">
                Baneshwor, kathmandu
              </p>
              <p className="message-time text-center">+977 99855454</p>
            </div>
          </Link>
          <div className="recieve">
            <p>Ka ho sir</p>
          </div>
          <div className="send my-3 ml-auto">
            <p>Ghar ma xu Talai baal</p>
          </div>
          <div className="recieve my-3">
            <p>Testo na Vanu na sir plz</p>
          </div>
          <div className="send my-3 ml-auto">
            <p>ko ho ra ta</p>
          </div>
          <div className="recieve my-3">
            <p>
              ma sankhar ho sankhar sathi ko lagi yo hat salam xa vane dusman ko
              lagi falam xa
            </p>
          </div>
          <div className="send my-3 ml-auto">
            <p>ehh eh dai mafi pau</p>
          </div>
          <div className="recieve my-3">
            <p>aja bata malai msg na gar</p>
          </div>
          <div className="send my-3 ml-auto">
            <p>yad hai muje tune kahatha tujne na ruthnge kahi</p>
          </div>
          <div className="recieve my-3">
            <p>pyar yar dewana hota hai mastana hota hai</p>
          </div>

          <div className="d-flex chat-bg">
            <TextArea rows={2} placeholder="Type your message here" />
            <Button
              type="primary"
              shape="circle"
              icon={<SendOutlined />}
              className="ml-2"
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Chat;
