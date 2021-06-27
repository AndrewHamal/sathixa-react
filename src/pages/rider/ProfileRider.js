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

const ProfileRider = () => {
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
          <i className="fas fa-check-circle text-green"></i>
        </div>
      </div>
      <Link to="/ProfileEdit">
        <div className="white-card m-2">
          <p className="heading-sm">ACCOUNT</p>
          <div className="d-flex mt-2">
            <i className="fas fa-user text-red my-auto mr-2" />
            <p className="text-normal">Profile</p>
          </div>
        </div>
      </Link>
      <Link to="/ProfileEdit">
        <div className="white-card m-2">
          <p className="heading-sm">ADDRESS</p>
          <div className="d-flex mt-2">
            <i className="far fa-heart text-red my-auto mr-2" />
            <p className="text-normal">Saved Address</p>
          </div>
        </div>
      </Link>
      <Link to="./Documents">
        <div className="white-card m-2">
          <p className="heading-sm">DOCUMENTS</p>
          <div className="d-flex mt-2">
            <i className="fas fa-file-alt text-red my-auto mr-2" />
            <p className="text-normal">Documents</p>
          </div>
        </div>
      </Link>

      <div className="white-card m-2">
        <p className="heading-sm">OFFERS</p>
        <div className="d-flex mt-2">
          <i className="fas fa-tag text-red my-auto mr-2 fa-sm" />
          <p className="text-normal">Get Discounts</p>
        </div>
      </div>
      <Link to="/ProfileEdit">
        <div className="white-card m-2">
          <p className="heading-sm">VEHICLES</p>
          <div className="d-flex mt-2">
            <i className="fas fa-motorcycle text-red my-auto mr-2" />
            <p className="text-normal">Vehicles Info</p>
          </div>
        </div>
      </Link>
      <Link to="/ProfileEdit">
        <div className="white-card m-2">
          <p className="heading-sm">SETTINGS</p>
          <div className="d-flex mt-2">
            <i className="fas fa-user text-red my-auto mr-2" />
            <p className="text-normal">Permissons</p>
          </div>
        </div>
      </Link>

      <div className="white-card m-2">
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
      <div className="white-card m-2">
        <div className="d-flex">
          <i className="fas fa-sign-out-alt text-red my-auto mr-2" />
          <p className="text-normal">Log out</p>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileRider;
