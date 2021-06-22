import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

// import PackgeImg from "../../assets/vendor/packageimg.svg";
import { Steps } from "antd";
import { PageHeader } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { Tabs } from "antd";
import { Avatar, Image } from "antd";
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const { Step } = Steps;

const { Header, Content, Footer } = Layout;

const Profile = () => {
  const history = useHistory();

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
              S
            </Avatar>
            <div className="pl-2 my-auto">
              <p className="font-14 f-w-500">Sangit Poudel</p>
              <p className="faded-text-sm pt-1">+977 9856565965</p>
            </div>
            <i class="fas fa-check-circle text-green"></i>
          </div>
        </div>
        <Link to="/ProfileEdit">
          <div className="white-card my-2">
            <p className="heading-sm">ACCOUNT</p>
            <div className="d-flex mt-2">
              <i className="fas fa-user text-red my-auto mr-2" />
              <p className="text-normal">Profile</p>
            </div>
          </div>
        </Link>
        <Link to="./Documents">
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
        <div className="white-card my-2">
        <div className="d-flex">
          <i className="fas fa-sign-out-alt text-red my-auto mr-2" />
          <p className="text-normal">Log out</p>
        </div>
      </div>
      </Content>
    </Layout>
  );
};

export default Profile;
