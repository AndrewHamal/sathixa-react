import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "antd";
import { Tabs } from "antd";
import { StickyContainer, Sticky } from "react-sticky";

const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className="site-custom-tab-bar"
        style={{ ...style }}
      />
    )}
  </Sticky>
);

const Success = () => {
  const history = useHistory();

  return (
    <section className="container  px-1">
      <div className="col-md-12">
        <div className="top-nav-pro position-relative trans-top-div">
          <i className="fas fa-arrow-left text-white my-auto position-absolute arrow-left " />
          <p className="center-text  ">Transaction Summary</p>
        </div>
        <div className="overflow-card-profile">
          <div className="trans-card">
            <div className="d-flex justify-content-between">
              <div>
                <span className="money">Rs 5000</span>
                <p className="money-text">Cash Balance</p>
                <Button type="primary">Withdraw</Button>
              </div>
              <div>
                <span className="money"> 420</span>
                <p className="money-text">Credit Earned</p>
                <Button>Reedem Credit</Button>
              </div>
            </div>
            <hr className="my-2" />
            <span className="total-earning text-center">
              Total Earning Rs 15000
            </span>
          </div>
          <p className="trans-text text-center mt-2">
            Cash can be withdraw to bank, esewa, khalti , imepay ips transfer
          </p>
          <StickyContainer>
            <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
              <TabPane tab="Transactions" key="1" style={{ height: 200 }}>
                <div className="mt-1">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="trans-text-down">Withdraw</p>
                      <span className="trans-text font-weight-500">
                        Transferred method esewa xxxxxxx96
                      </span>
                    </div>
                    <div>
                      <p className="trans-text-down text-red font-weight-600">
                        -Rs 500
                      </p>
                      <span className="trans-text font-weight-500">
                        May 14 12:50 P.M
                      </span>
                    </div>
                  </div>
                  <hr className="opacity-53" />
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="trans-text-down">Withdraw</p>
                      <span className="trans-text font-weight-500">
                        Transferred method esewa xxxxxxx96
                      </span>
                    </div>
                    <div>
                      <p className="trans-text-down text-red font-weight-600">
                        -Rs 500
                      </p>
                      <span className="trans-text font-weight-500">
                        May 14 12:50 P.M
                      </span>
                    </div>
                  </div>
                  <hr className="opacity-53" />
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="trans-text-down">Withdraw</p>
                      <span className="trans-text font-weight-500">
                        Transferred method esewa xxxxxxx96
                      </span>
                    </div>
                    <div>
                      <p className="trans-text-down text-red font-weight-600">
                        -Rs 500
                      </p>
                      <span className="trans-text font-weight-500">
                        May 14 12:50 P.M
                      </span>
                    </div>
                  </div>
                  <hr className="opacity-53" />
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="trans-text-down">Withdraw</p>
                      <span className="trans-text font-weight-500">
                        Transferred method esewa xxxxxxx96
                      </span>
                    </div>
                    <div>
                      <p className="trans-text-down text-red font-weight-600">
                        -Rs 500
                      </p>
                      <span className="trans-text font-weight-500">
                        May 14 12:50 P.M
                      </span>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Credits history" key="2">
                <div className="mt-1">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="trans-text-down">Credits Earned</p>
                      <span className="trans-text font-weight-500">
                        Hello user 1 you have received 50 points
                      </span>
                    </div>
                    <div>
                      <span className="trans-text font-weight-500">
                        May 14 12:50 P.M
                      </span>
                    </div>
                  </div>
                  <hr className="opacity-53" />
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="trans-text-down">Credits Earned</p>
                      <span className="trans-text font-weight-500">
                        Hello user 1 you have received 50 points
                      </span>
                    </div>
                    <div>
                      <span className="trans-text font-weight-500">
                        May 14 12:50 P.M
                      </span>
                    </div>
                  </div>
                  <hr className="opacity-53" />
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="trans-text-down">Credits Earned</p>
                      <span className="trans-text font-weight-500">
                        Hello user 1 you have received 50 points
                      </span>
                    </div>
                    <div>
                      <span className="trans-text font-weight-500">
                        May 14 12:50 P.M
                      </span>
                    </div>
                  </div>
                  <hr className="opacity-53" />
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="trans-text-down">Credits Earned</p>
                      <span className="trans-text font-weight-500">
                        Hello user 1 you have received 50 points
                      </span>
                    </div>
                    <div>
                      <span className="trans-text font-weight-500">
                        May 14 12:50 P.M
                      </span>
                    </div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </StickyContainer>
        </div>
      </div>
    </section>
  );
};

export default Success;
