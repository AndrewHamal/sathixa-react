import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Layout, Upload, PageHeader, Select, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { storeTicket } from "@/api/vendor/index"
import { Toast } from "antd-mobile";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Content } = Layout;

const antIcon = <LoadingOutlined style={{ fontSize: 18, color:'#fff' }} spin />;

const SubmitTicket = () => {
  const history = useHistory();
  const { Option } = Select;
  const [fileAll, setFile] = useState({ files : [] })
  const [loading, setLoading] = useState(false);

  const onFinish = (e) => {
    setLoading(true)
    let formData = new FormData();
    for (const [key, value] of Object.entries(e)) {
      if(value !== null)
        formData.append(key, value)
    }

    if(typeof fileAll !== 'undefined' && fileAll?.files?.length > 0){
      fileAll?.files?.map(res => {
        formData.append('image[]', res)
      })
    }

    storeTicket(formData)
    .then(res => {
      Toast.success(res?.data?.message)
      setLoading(false)
      history.push('/ticket?type=all')
    }).catch(err => {
      setLoading(false)
      Toast.fail(err?.data?.message)
    })
  }

  const handleChange = (file, fileList) => {
      setFile(prevState => ({
          files: [...prevState.files, file]
      }))
      
      return false;
  }

  const deleteFile = (file) => {
      let files = fileAll.files.filter( res => {
          if(file.uid !== res.uid)
              return res
      })
      setFile({files})
  }


  return (
    <Layout>
      <PageHeader
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
        className="site-page-header bg-red "
        title="Ticket Submit"
        onBack={() => history.goBack()}
      />
      <Content
        className="site-layout"
        style={{
          padding: "0 14px",
          marginTop: 67,
        }}
      >
        <div className="site-layout-background mt-3">
          <Form 
            layout="vertical" 
            className="mx-2"
            onFinish={onFinish}
            >

            <Form.Item
              name="type"
              label="Ticket Type"
              rules={[
                {
                  required: true,
                  message: "Please Select One type!",
                },
              ]}
            >
              <Select placeholder="Select Ticket Type">
                <Option value="General">General</Option>
                <Option value="Urgent">Urgent</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item 
            label="Message" 
            formlayout="Vertical" 
            name="message"
            rules={[
              {
                required: true,
                message: "Please write your query!",
              }
            ]}
            >
              <TextArea cols="3" 
              placeholder="Write Your Message" />
            </Form.Item>

            <Form.Item label="Attachment">
              <Upload
                  listType="picture"
                  multiple={true}
                  beforeUpload={handleChange}
                  onRemove = {deleteFile}
                  accept={'image/*'}
                  FileList={[]}
              >
                  <Button icon={<UploadOutlined />} className={"btn-none"}>Upload Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {loading ? <Spin indicator={antIcon} /> : 'Submit'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default SubmitTicket;
