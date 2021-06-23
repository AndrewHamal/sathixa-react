import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import PackgeImg from "../../assets/vendor/packageimg.svg";
import { Steps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { PageHeader, Select, Option } from "antd";
import { Layout, Menu, Breadcrumb, message, Upload } from "antd";
import { Tabs } from "antd";
import { Avatar, Image, Form, Input } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const { Step } = Steps;

const { Header, Content, Footer } = Layout;
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const SubmitTicket = () => {
  const history = useHistory();
  const { Option } = Select;

  return (
    <Layout>
      <PageHeader
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
        className="site-page-header bg-red "
        title="Ticket Submit"
        onBack={() => "null"}
      />
      <Content
        className="site-layout"
        style={{
          padding: "0 14px",
          marginTop: 67,
        }}
      >
        <div className="site-layout-background mt-3">
          <Form layout="vertical" className="mx-2">
            <Form.Item
              label="Name"
              name="Name"
              rules={[
                {
                  required: true,
                  message: "Please Enter Your Name!",
                },
              ]}
              formLayout="Vertical"
            >
              <Input placeholder="Enter Here" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please Enter Your Email!",
                },
              ]}
              formLayout="Vertical"
            >
              <Input placeholder="Enter Here" />
            </Form.Item>
            <Form.Item label="Subject" formLayout="Vertical">
              <Input placeholder="Enter Here" />
            </Form.Item>
            <Form.Item
              name="tickets"
              label="Ticket Type"
              rules={[
                {
                  required: true,
                  message: "Please Select One type!",
                },
              ]}
            >
              <Select placeholder="Select Ticket Type">
                <Option value="Pending">Product Pending</Option>
                <Option value="Damage">Damage Product</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Attachment">
              <Upload {...props} block>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default SubmitTicket;
