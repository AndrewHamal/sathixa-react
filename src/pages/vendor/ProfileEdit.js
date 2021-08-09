import { useEffect, useState } from "react";
import { Button } from "antd";

import { Layout} from "antd";
import { Avatar, Form, Input, Skeleton } from "antd";
import { apiUser, updateProfile } from "@/api/vendor/dashboard";
import { userStore, getUser } from "@/reducers/reducers"
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "antd-mobile";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 18, color:'#fff' }} spin />;
const { Content } = Layout;

const ProfileEdit = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const userSelector = useSelector(getUser);
  const [loading, setLoading] = useState(false);

  function onFinish(e){
    setLoading(true)
    
    let formData = new FormData();
    for (const [key, value] of Object.entries(e)) {
      if(typeof value !== "undefined")
        formData.append(key, value)
    }

    updateProfile(formData)
    .then(res => {
      Toast.success(res?.data?.message)
      setLoading(false)
    }).catch(err => {
      Object.entries(err?.data?.errors).forEach(res => {
        res[1].forEach(res => {
          Toast.fail(res)
        })
      })
      setLoading(false)
    })
  }

  useEffect(() => {

    if(userSelector.length === 0){
      apiUser()
      .then(res => {
        dispatch(userStore(res.data));
        setLoader(false)
      })
    }else{
      setLoader(false)
    }

  }, [dispatch, userSelector])

  if(loader) { return <Content
    className="site-layout"
    style={{
      padding: "0 14px",
      marginTop: 60,
    }}
  > <Skeleton active/></Content> }

  return (
    <Layout>
      <Content 
       className="site-layout"
       style={{
         padding: "0 14px",
        //  marginTop: 67,
       }}
      >
      <div className="profile-nav d-flex my-3">
        <div className="d-flex position-relative fa-xs my-2">
          <Avatar
            size={40}
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
            }}
          >
            { userSelector.first_name.charAt(0).toUpperCase() }{ userSelector.last_name.charAt(0).toUpperCase() }
          </Avatar>

          <div className="pl-2 my-auto">
            <p className="font-14 f-w-500 text-capitalize">{userSelector.first_name} {userSelector.last_name}</p>
            <p className="faded-text-sm pt-1"> {userSelector.phone}</p>
          </div>
          <i className="fas fa-check-circle text-green"></i>
        </div>
      </div>

      <Form 
        layout="vertical"
        onFinish={onFinish}
        form={form}
        initialValues={{
          first_name : userSelector.first_name,
          last_name : userSelector.last_name,
          email : userSelector.email,
          phone : userSelector.phone,
          date_of_birth : userSelector?.rider_detail?.date_of_birth
        }}
      >
        <Form.Item label="First Name" formlayout="Vertical" name="first_name" 
          rules={[{
            required: true,
            message: 'first name is required'
          }]}
        >
          <Input placeholder="First Name"/>
        </Form.Item>

        <Form.Item label="Last Name" formlayout="Vertical" name="last_name"
          rules={[{
            required: true,
            message: 'last name is required'
          }]}
          >
          <Input placeholder="Last Name"/>
        </Form.Item>

        <Form.Item label="Email Address" name="email" formlayout="Vertical"
          rules={[{
            required: true,
            type: 'email',
            message: 'email is required'
          }]}
          >
          <Input placeholder="Email"/>
        </Form.Item>
        <Form.Item label="Phone Number" name="phone" formlayout="Vertical"
           rules={[{
            required: true,
            max: 10,
            min: 10,
          }]}
        >
          <Input placeholder="+977 9800000000"/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType={"submit"}>
            {loading ? <Spin indicator={antIcon} /> : 'Update'} 
          </Button>
        </Form.Item>
      </Form>
      </Content>
    </Layout>
  );
};

export default ProfileEdit;
