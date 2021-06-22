import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import PackgeImg from "../../assets/vendor/packageimg.svg";
import { Steps } from "antd";
import { PageHeader } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { Tabs } from "antd";
import { Avatar, Image, Form, Input } from "antd";
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const { Step } = Steps;

const { Header, Content, Footer } = Layout;

const SavedAddress = () => {
  const history = useHistory();

  return (
    <Layout>
      <PageHeader
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
        className="site-page-header bg-red "
        title="Saved Address"
        onBack={() => "null"}
      />
      <Content
        className="site-layout"
        style={{
          padding: "0 25px",
          marginTop: 67,
        }}
      >
        <div className="site-layout-background mt-3">
          <Form layout="vertical" className="mx-2">
            <Form.Item label="Home Address" formLayout="Vertical">
              <Input placeholder="Address Here" />
            </Form.Item>
            <Form.Item label="Work Address" formLayout="Vertical">
              <Input placeholder="Address Here" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" block>
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default SavedAddress;
