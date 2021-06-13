import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "antd";

import PackgeImg from "../../assets/vendor/packageimg.svg";
import { Steps } from "antd";

const { Step } = Steps;

const Delivery = () => {
  const history = useHistory();

  return (
    <section className="container  px-1">
      <div className="col-md-12">
        <div className="top-nav-pro position-relative trans-top-div">
          <i className="fas fa-arrow-left text-white my-auto position-absolute arrow-left " />
          <p className="center-text  ">Delivery Check</p>
        </div>
        <div className="overflow-card-profile">
          <div className="package-card ">
            <div className="d-flex  flex-wrap">
              <img src={PackgeImg} alt="" className="width-pack" />
              <table className="table ml-2 my-auto">
                <tbody>
                  <tr>
                    <td className="font-14 font-weight-600">Akkal Prasad</td>
                    <td className="font-14 font-weight-600 text-align-end">
                      x1
                    </td>
                  </tr>
                  <tr>
                    <td className="p-small">Categories</td>
                    <td className="p-small p-small-sharp ">Electronics</td>
                  </tr>
                  <tr>
                    <td className="p-small">Weight</td>
                    <td className="p-small p-small-sharp ">2KG</td>
                  </tr>
                  <tr>
                    <td className="p-small font-14">Price</td>
                    <td className="vendor-package-price font-14  ">Rs 342</td>
                  </tr>
                </tbody>
              </table>
              <div className="my-auto ml-auto">
                <p className="status-active font-12">Cancel Delivery</p>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Steps direction="vertical" current={1}>
              <Step title="Finished" description="This is a description." />
              <Step title="In Progress" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
            </Steps>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Delivery;
