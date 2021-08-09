import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout, Upload, PageHeader, Button, Skeleton, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { profile, removeLicense, removeID, removeInsurance } from "@/api/rider/index";
import { storeUser, getUser } from "@/reducers/rider/reducers"
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "antd-mobile";


const DocumentsRider = () => {
const history = useHistory();
const dispatch = useDispatch();
const userSelector = useSelector(getUser);
const [loader, setLoader] = useState(true);
const [license, setFileLicense] = useState([]);
const [idProof, setFileIdProof] = useState([]);
const [insurance, setFileInsurance] = useState([]);

const { Content } = Layout;

useEffect(() => {

  if(userSelector === null ){
    getProfile();
  }else{
    setLoader(false)
    setFileLicense(userSelector?.driver_license || [])
    setFileIdProof(userSelector?.id_proof || [])
    setFileInsurance(userSelector?.insurance || [])
  }

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [dispatch, userSelector])

function getProfile(){
  profile()
  .then(res => {
    dispatch(storeUser(res.data) || []);
    setFileLicense(res?.data?.driver_license || [])
    setFileIdProof(res?.data?.id_proof || [])
    setFileInsurance(res?.data?.insurance || [])
    setLoader(false)
  })
}

const propsLicense = {
  name: "file",
  action: process.env.REACT_APP_API_URL+'api/rider/license',
  defaultFileList:license,
  headers: {
    authorization:'Bearer ' + localStorage.getItem('_riderToken'),
  },
  onPreview(info){
    window.open(info.name, '_blank');
  },
  onRemove(files, file) {
    if(typeof files !== "undefined"){
      removeLicense(files.uid)
      .then(res => {
        getProfile();
        Toast.success(res.data.message)
      })
    }
  },
  onChange(info) {
    let newFile = info.file
    if(license !== null)
      setFileLicense(license.concat([newFile]))

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      getProfile();
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const propsID = {
  name: "file",
  action: process.env.REACT_APP_API_URL+'api/rider/photo-proof',
  headers: {
    authorization:'Bearer ' + localStorage.getItem('_riderToken'),
  },
  onPreview(info){
    window.open(info.name, '_blank');
  },
  onRemove(files, file) {
    if(typeof files !== "undefined"){
      removeID(files.uid)
      .then(res => {
        getProfile();
        Toast.success(res.data.message)
      })
    }
  },
  onChange(info) {
    let newFile = info.file
    if(idProof !== null)
      setFileIdProof(idProof.concat([newFile]))

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      getProfile();
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const propsInsurance = {
  name: "file",
  action: process.env.REACT_APP_API_URL+'api/rider/insurance',
  headers: {
    authorization:'Bearer ' + localStorage.getItem('_riderToken'),
  },
  onPreview(info){
    window.open(info.name, '_blank');
  },
  onRemove(files, file) {
    if(typeof files !== "undefined"){
      removeInsurance(files.uid)
      .then(res => {
        getProfile();
        Toast.success(res.data.message)
      })
    }
  },
  onChange(info) {
    let newFile = info.file
    if(insurance !== null)
      setFileInsurance(insurance.concat([newFile]))

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
        <div className="site-layout-background my-3">
          <div className="white-card mt-3">
            <div className="d-flex mb-3">
              <i className="fas fa-id-badge text-red my-auto mr-2 fa-sm" />
              <p className="text-normal">Driving Licence</p>
            </div>
            <Upload 
              accept={'image/*'}
              listType="picture"
              {...propsLicense}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>

          <div className="white-card mt-3">
            <div className="d-flex mb-3">
              <i className="fas fa-id-card-alt text-red my-auto mr-2 fa-sm" />
              <p className="text-normal">Photo ID Proof (Optional)</p>
            </div>
            <Upload 
              accept={'image/*'}
              listType="picture"
              defaultFileList={idProof}
              {...propsID}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <p className="text-normal mt-4 f-w-600">Vehicle Requirements</p>
          <div className="white-card mt-2 ">
            <div className="d-flex mb-3">
              <i className="fas fa-motorcycle text-red my-auto mr-2 fa-sm" />
              <p className="text-normal">Vehicle Insurance</p>
            </div>
            <Upload 
              accept={'image/*'}
              listType="picture"
              defaultFileList={insurance}
              {...propsInsurance}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default DocumentsRider;
