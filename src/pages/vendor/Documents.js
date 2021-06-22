import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "antd";
import { PageHeader } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";

import PackgeImg from "../../assets/vendor/packageimg.svg";
import { Steps } from "antd";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

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

const Documents = () => {
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
          padding: "0 10px",
          marginTop: 67,
        }}
      >
        <div className="site-layout-background mt-3">
          <div className="white-card mx-2 mt-3">
            <div className="d-flex mb-3">
              <i className="fas fa-user-alt text-red my-auto mr-2 fa-sm" />
              <p className="text-normal">Pan No Pic</p>
            </div>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <div className="white-card mx-2 mt-3">
            <div className="d-flex mb-3">
              <i className="fas fa-id-card-alt text-red my-auto mr-2 fa-sm" />
              <p className="text-normal">Photo ID Proof</p>
            </div>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <div className="white-card mx-2 mt-3">
            <div className="d-flex mb-3">
              <i className="fas fa-id-card text-red my-auto mr-2 fa-sm" />
              <p className="text-normal">Tax Paid Proof</p>
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

export default Documents;
