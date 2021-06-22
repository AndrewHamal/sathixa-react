import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Avatar, Image, Button, Popconfirm, message } from "antd";
import Delivery from "./Delivery";
function confirm(e) {
  console.log(e);
  message.success("Click on Yes");
}

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

const RiderAccept = () => {
  const history = useHistory();

  return (
    <section className="container vh-100 p-3 map-bg">
      <div className="row">
        <div className="col-10">
          <div className="card px-3  py-2 circle-rad">
            <div className="d-flex">
              <i class="fas fa-map-marker-alt my-auto mr-2"></i>
              <p className="font-12">My Currnet Location</p>
              <p className="ml-auto terms-color font-12 ">Change</p>
            </div>
          </div>
        </div>
        <div className="col-2 my-auto">
          <Avatar
            className="ava-bg"
            src={
              <Image src="https://uifaces.co/our-content/donated/KtCFjlD4.jpg" />
            }
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <div className="card p-3 ">
            <div className="d-flex">
              <Avatar
                className="ava-bg my-auto"
                src={
                  <Image src="https://uifaces.co/our-content/donated/KtCFjlD4.jpg" />
                }
              />
              <div className="ml-2">
                <p className="heading-xl f-w-600 line-height-07">Vendor Name</p>
                <p className="faded-text ">Baneshwor</p>
              </div>
            </div>
            <div className="d-flex my-2">
              <div>
                <p className="faded-text-sm ">Delivery Items</p>
                <p className="heading-l f-w-600">Electronics Item x1</p>
              </div>
            </div>
            <div className="d-flex my-2">
              <div className="d-flex">
                <i class="fas fa-map-marker-alt fa-xs my-auto mr-1 text-red"></i>
                <p className="faded-text ">Your Destination for Delivery</p>
              </div>
            </div>
            <div className="d-flex my-2">
              <Popconfirm
                title="Are you sure to Accept This Ride?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" block>
                  Accept
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiderAccept;
