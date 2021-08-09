import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { userStore, getUser } from "@/reducers/reducers"
import { apiUser, logout } from "@/api/vendor/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Layout, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { token } from "@/reducers/reducers";

const ProfilePage = () => {
  const { Content } = Layout;
  const dispatch = useDispatch();
  const userSelector = useSelector(getUser);
  const [loader, setLoader] = useState(true);
  const history = useHistory()
  

  useEffect(() => {    
    if(userSelector.length === 0 ){
      apiUser()
      .then(res => {
        dispatch(userStore(res.data));
        setLoader(false)
      })
    }else{
      setLoader(false)
    }

  }, [dispatch, userSelector])

  function logoutVendor() {
    logout()
    .then(res => {
      localStorage.removeItem('_token');
      localStorage.removeItem('loggedIn');
      dispatch(token(false))
      history.push('/login')
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
            { userSelector.first_name.charAt(0).toUpperCase() }{ userSelector.last_name.charAt(0).toUpperCase() }
            </Avatar>
            <div className="pl-2 my-auto">
              <p className="font-14 f-w-500 text-capitalize">{userSelector.first_name} {userSelector.last_name}</p>
              <p className="faded-text-sm pt-1"> {userSelector.phone}</p>
            </div>
            <i className="fas fa-check-circle text-green"></i>
          </div>
        </div>
        <Link to="/profile-edit">
          <div className="white-card my-2">
            <p className="heading-sm">ACCOUNT</p>
            <div className="d-flex mt-2">
              <i className="fas fa-user text-red my-auto mr-2" />
              <p className="text-normal">Profile</p>
            </div>
          </div>
        </Link>
        <Link to="/document">
          <div className="white-card my-2">
            <p className="heading-sm">DOCUMENTS</p>
            <div className="d-flex mt-2">
              <i className="fas fa-file-alt text-red my-auto mr-2" />
              <p className="text-normal">Documents</p>
            </div>
          </div>
        </Link>

        <div className="white-card my-2">
          <p className="heading-sm">OFFERS</p>
          <div className="d-flex mt-2">
            <i className="fas fa-tag text-red my-auto mr-2 fa-sm" />
            <p className="text-normal">Get Discounts</p>
          </div>
        </div>
        <div className="white-card my-2">
          <p className="heading-sm">OTHERS</p>
          <div className="d-flex mt-2">
            <i className="fas fa-question-circle text-red my-auto mr-2" />
            <p className="text-normal">Help</p>
          </div>
          <div className="d-flex mt-2">
            <i className="fas fa-lock text-red my-auto mr-2" />
            <p className="text-normal">Policies</p>
          </div>
        </div>
        <div className="white-card my-2"  onClick={logoutVendor}>
          <div className="d-flex"> 
            <i className="fas fa-sign-out-alt text-red my-auto mr-2" />
            <p className="text-normal">Log out</p>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ProfilePage;
