import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "antd";
import { PageHeader } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";

import PackgeImg from "../../assets/vendor/packageimg.svg";
import { Steps } from "antd";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Profile from "./Profile";

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

const DocumentsRider = () => {
  const history = useHistory();

  return (
    <Layout>
      <PageHeader
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
        className="site-page-header bg-red "
        onBack={() => "null"}
        title="Documents"
      />
      <Content
        className="site-layout"
        style={{
          padding: "0 14px",
          marginTop: 67,
        }}
      >
        <div className="site-layout-background mt-3">
          <div className="white-card mx-2 mt-3">
            <div className="d-flex mb-3">
              <i className="fas fa-id-badge text-red my-auto mr-2 fa-sm" />
              <p className="text-normal">Driving Licence</p>
            </div>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <div className="white-card mx-2 mt-3">
            <div className="d-flex mb-3">
              <i className="fas fa-user-circle text-red my-auto mr-2 fa-sm" />
              <p className="text-normal">Profile Photo</p>
            </div>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <div className="white-card mx-2 mt-3">
            <div className="d-flex mb-3">
              <i className="fas fa-id-card-alt text-red my-auto mr-2 fa-sm" />
              <p className="text-normal">Photo ID Proof (Optional)</p>
            </div>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <p className="text-normal mx-2 mt-4 f-w-600">Vehicle Requirements</p>
          <div className="white-card mx-2 mt-2 ">
            <div className="d-flex mb-3">
              <i className="fas fa-motorcycle text-red my-auto mr-2 fa-sm" />
              <p className="text-normal">Vehicle Insurance</p>
            </div>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <div className="white-card mx-2 mt-3">
            <div className="d-flex mb-3">
              <i className="fas fa-paste text-red my-auto mr-2 fa-sm" />
              <p className="text-normal">Registration Certificate</p>
            </div>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <Button type="primary mt-3" block>
            Save
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default DocumentsRider;
