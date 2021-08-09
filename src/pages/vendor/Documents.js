import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, message, Skeleton } from "antd";
import { PageHeader } from "antd";
import { Layout } from "antd";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { removeId, removeTax, removePan } from "@/api/vendor/index";
import { userStore, getUser } from "@/reducers/reducers"
import { apiUser } from "@/api/vendor/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "antd-mobile";
const { Content } = Layout;

const Documents = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userSelector = useSelector(getUser);
  const [loader, setLoader] = useState(true);
  const [filePan, setFilePan] = useState([]);
  const [fileId, setFileId] = useState([]);
  const [fileTax, setFileTax] = useState([]);

  useEffect(() => {
    if(userSelector.length === 0){
      getProfile();
      setFilePan(userSelector?.pan)
      setFileTax(userSelector?.tax)
      setFileId(userSelector?.id)
    }else{
      setFilePan(userSelector?.pan)
      setLoader(false)
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userSelector])
  
  function getProfile(){
    apiUser()
    .then(res => {
      dispatch(userStore(res.data));
      setLoader(false)
    })
  }
  

  const propsPan = {
    name: "file",
    action: process.env.REACT_APP_API_URL+'api/vendor/pan',
    headers: {
      authorization:'Bearer ' + localStorage.getItem('_token'),
    },
    defaultFileList: filePan,
    onPreview(info){
      window.open(info.name, '_blank');
    },
    onRemove(files, file) {
      if(typeof files !== "undefined"){
        removePan(files.uid)
        .then(res => {
          getProfile();
          Toast.success(res.data.message)
        })
      }
    },
    onChange(info) {
      let newFile = info.file
      if(filePan !== null)
        setFilePan(filePan.concat([newFile]))

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        getProfile();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }

    },
  };

  const propsId = {
    name: "file",
    action: process.env.REACT_APP_API_URL+'api/vendor/id-proof',
    headers: {
      authorization:'Bearer ' + localStorage.getItem('_token'),
    },
    onPreview(info){
      window.open(info.name, '_blank');
    },
    onRemove(files, file) {
      if(typeof files !== "undefined"){
        removeId(files.uid)
        .then(res => {
          getProfile();
          Toast.success(res.data.message)
        })
      }
    },
    onChange(info) {
      let newFile = info.file

      if(fileId !== null)
        setFileId(fileId.concat([newFile]))

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        getProfile();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const propsTax = {
    name: "file",
    action: process.env.REACT_APP_API_URL+'api/vendor/tax',
    headers: {
      authorization:'Bearer ' + localStorage.getItem('_token'),
    },
    onPreview(info){
      window.open(info.name, '_blank');
    },
    onRemove(files, file) {
      if(typeof files !== "undefined"){
        removeTax(files.uid)
        .then(res => {
          getProfile();
          Toast.success(res.data.message)
        })
      }
    },
    onChange(info) {
      let newFile = info.file

      if(fileTax !== null)
        setFileTax(fileTax.concat([newFile]))

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        getProfile();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  if(loader) { return <Content
    className="site-layout"
    style={{
      padding: "0 14px",
      marginTop: 60,
    }}
  > <Skeleton active/></Content> }

  return (
    <Layout>
      <PageHeader
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
        className="site-page-header bg-red "
        onBack={() => history.goBack()}
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
          <div className="white-card mt-3">
            <div className="d-flex mb-3">
              <i className="fas fa-user-alt text-red my-auto mr-2 fa-sm" />
              <p className="text-normal">Pan No Pic</p>
            </div>
            <Upload 
              accept={'image/*'}
              listType="picture"
              {...propsPan}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <div className="white-card mt-3">
            <div className="d-flex mb-3">
              <i className="fas fa-id-card-alt text-red my-auto mr-2 fa-sm" />
              <p className="text-normal">Photo ID Proof</p>
            </div>
            <Upload 
              accept={'image/*'}
              listType="picture"
              defaultFileList={fileId}
              {...propsId}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <div className="white-card mt-3">
            <div className="d-flex mb-3">
              <i className="fas fa-id-card text-red my-auto mr-2 fa-sm" />
              <p className="text-normal">Tax Paid Proof</p>
            </div>
            <Upload 
              accept={'image/*'}
              listType="picture"
              defaultFileList={fileTax}
              {...propsTax}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Documents;
