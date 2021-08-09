import { useEffect, useState } from "react";
import { Button } from "antd";

import { Layout} from "antd";
import { Avatar, Form, Input, Skeleton } from "antd";
import { profile, updateProfile } from "@/api/rider/index";
import { storeUser, getUser } from "@/reducers/rider/reducers"
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Toast } from "antd-mobile";
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const antIcon = <LoadingOutlined style={{ fontSize: 18, color:'#fff' }} spin />;
const { Content } = Layout;

const ProfileEdit = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [dateOfBirth, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const userSelector = useSelector(getUser);

  function onFinish(e){
    setLoading(true)
    let formData = new FormData();
    for (const [key, value] of Object.entries(e)) {
      if(typeof value !== "undefined" && value !== null)
        formData.append(key, value)
    }

    formData.append('_method', 'PATCH')
    
    updateProfile(userSelector.id, formData)
    .then(res => {
      Toast.success(res.data.message)
      setLoading(false)
    }).catch(err => {
  
      setLoading(false)
      Object.entries(err?.data?.errors).forEach(res => {
        res[1].forEach(res => {
          Toast.fail(res)
        })
      })


    })
  }

  useEffect(() => {

    if(userSelector === null ){
      profile()
      .then(res => {
        dispatch(storeUser(res.data));
        setLoader(false)
      })
    }else{
      setLoader(false)
    }

  }, [dispatch, userSelector])

  function dateHandle(e) {
    console.log(e)
    form.setFieldsValue({
      date_of_birth: new Date(e).getFullYear()+'-'+ (new Date(e).getMonth() + 1) +'-'+new Date(e).getDate()
    })
  }

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
            {userSelector.first_name.charAt(0)}{userSelector.last_name.charAt(0)}
          </Avatar>

          <div className="pl-2 my-auto">
            <p className="font-14 f-w-500">{userSelector.first_name} {userSelector.last_name}</p>
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

        <DatePicker
          mode="date"
          value={dateOfBirth}
          locale={enUs}
          extra={false}
          maxDate={new Date() }
          minDate={new Date(1880)}
          onChange={d => {dateHandle(d); setDate(d)}}
        >
          <Form.Item label="Date of Birth" name="date_of_birth" formlayout="Vertical">
            <Input placeholder="04-01-1990"/>
          </Form.Item>
        </DatePicker>

          {/* {  typeof date.d !== "undefined" ? date.d : '' } */}
        <Form.Item>
          <Button type="primary" block htmlType={"submit"} className="pb-3">
          {loading ? <Spin indicator={antIcon} /> : 'Update'} 
          </Button>
        </Form.Item>
      </Form>
      </Content>
    </Layout>
  );
};

export default ProfileEdit;
