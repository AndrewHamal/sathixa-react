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

const ProfileEdit = () => {
  const history = useHistory();

  return (
    <Layout>
      <div className="profile-nav d-flex justify-content-center my-3">
        <div className="d-flex position-relative fa-xs">
          <Avatar
            size={40}
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
            }}
          >
            S
          </Avatar>
          <div className="pl-2 my-auto">
            <p className="font-14 f-w-500">Sangit Poudel</p>
            <p className="faded-text-sm">+977 9856565965</p>
          </div>
          <i class="fas fa-check-circle text-green"></i>
        </div>
      </div>

      <Form layout="vertical" className="mx-2">
        <Form.Item label="Name" formLayout="Vertical">
          <Input placeholder="Sangit Poudel" />
        </Form.Item>
        <Form.Item label="Email Address" formLayout="Vertical">
          <Input placeholder="soemem@gmail.com" />
        </Form.Item>
        <Form.Item label="Phone Number" formLayout="Vertical">
          <Input placeholder="+977 9854517515" />
        </Form.Item>
        <Form.Item label="Date of Birth" formLayout="Vertical">
          <Input placeholder="04-01-1990" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default ProfileEdit;
