import { useHistory, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PageHeader, Skeleton, Layout, Tabs, Empty } from "antd";
import { getTicket } from "@/api/vendor/index"
import Moment from "react-moment";

const AllTicket = () => {
  const { TabPane } = Tabs;
  const history = useHistory();
  const [loading, setLoading] = useState(true)
  const [allTicket, setAllTicket] = useState(null)
  const { Content } = Layout;


  const getTickets = (type='') => {
    getTicket(type)
    .then(res => {
        setAllTicket(res.data)
        setLoading(false)
    })
  } 

  useEffect(() => {
    getTickets(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  function callback(key) {

    if(key === '2'){
        getTickets(0)
    }

    if(key === '3'){
        getTickets(1)
    }
  }
  

  if(loading) { return <Content
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
        title="All Tickets"
        onBack={() => history.goBack()}
      />

      <Content
        className="site-layout"
        style={{
          padding: "0 14px",
          marginTop: 67,
        }}
      >
        <div className="site-layout-background">
          <Tabs defaultActiveKey="1" onChange={callback}>

            <TabPane tab="Active Ticket" key="2">
              
                { 
                  allTicket.length === 0 ?
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Oops!! No ticket"/>
                  :
                    allTicket.map((res, key) => (
                      <Link to={'/ticket-message/'+ res.id} key={key}>
                        <div className="package-card  mb-3">
                          <div className="d-flex">
                            <div className="my-auto flex-wrap">
                              <p className="message-time"> <Moment format="dd mm yy h:s">{res.createad_at}</Moment> </p>
                              <p className="font-14 font-weight-600 pt-2">
                                {res.message}
                              </p>
                            </div>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between">
                            <div className="priority-badge green-bg d-flex mr-2">
                              <span className="dot-green my-auto mr-1"></span>
                              <p className="font-10 green">{res.type}</p>
                            </div>
                            <div className="priority-badge d-flex">
                              <p className="font-10 ">{
                                  res.status == 0 ? <span className="text-success">Active</span> : <span className="text-danger">Closed</span>
                              }</p>
                            </div>
                          </div>
                        </div>
                      </Link>
            
                    ))
                }
            </TabPane>
            <TabPane tab="Closed" key="3">

                {
                  allTicket.length === 0 ?
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Oops!! No ticket"/>
                  :
                    allTicket.map((res, key) => (
          
                        <div className="package-card  mb-3" key={key}>
                          <div className="d-flex">
                            <div className="my-auto flex-wrap">
                              <p className="message-time"> <Moment format="dd mm yy h:s">{res.createad_at}</Moment> </p>
                              <p className="font-14 font-weight-600 pt-2">
                                {res.message}
                              </p>
                            </div>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between">
                            <div className="priority-badge green-bg d-flex mr-2">
                              <span className="dot-green my-auto mr-1"></span>
                              <p className="font-10 green">{res.type}</p>
                            </div>
                            <div className="priority-badge d-flex">
                              <p className="font-10 ">{
                                  res.status == 0 ? <span className="text-success">Active</span> : <span className="text-danger">Closed</span>
                              }</p>
                            </div>
                          </div>
                        </div>

                    ))
                }
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default AllTicket;
