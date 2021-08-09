import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPackages } from "@/api/vendor";
import { onGoingPackage } from "@/api/rider/index"
import { Layout, PageHeader, Tabs, Skeleton, Badge, Empty } from "antd";
import { Pagination } from "antd-mobile"
import { vendorAuth } from '@/reducers/reducers'
import { isAuthRider } from "@/reducers/rider/reducers"
import { useSelector } from "react-redux";
import moment from 'moment'
import Avatar from "antd/lib/avatar/avatar";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const { Content } = Layout;

const locale = {
  prevText: 'Prev',
  nextText: 'Next',
};

const Inbox = () => {
  const history = useHistory();
  const [packages, setPackage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastPage, setLast] = useState(1)
  const [pages, setPages] = useState(1)

  const isVendor = useSelector(vendorAuth)
  const isRider = useSelector(isAuthRider)

  function getPackage(page) {
    getPackages('', page, 1)
    .then(res => {
      console.log(res?.data?.last_page)
      setPackage(res?.data)
      setLast(res?.data?.last_page)
      setPages(res?.data?.current_page)
      setLoading(false)
    })
  }

  function onGoingPackages(page) {
    onGoingPackage(page)
    .then(res => {
      setPackage(res.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    if(isVendor) {
      getPackage(1) 
    }

    if(isRider) {
      onGoingPackages(1)
    }
  }, [isRider, isVendor])
  
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
        title="Inbox"
      />

      <Content
        className="site-layout"
        style={{
          padding: "0 14px",
          marginTop: 60,
        }}
      >
        <div className="site-layout-background">
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Messages" key="1" className="mt-2">
              {
                packages.data.length === 0 ?
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
                :
                packages.data.map((res, i) => (
                  <Link to={`/chat/${isVendor ? res?.id : res?.package?.id}`}  key={i}>
                    <div className="d-flex mb-3">

                      {
                        res.new_chat ? 
                        <Badge dot className="my-auto">
                          <Avatar className="text-capitalize" style={{ backgroundColor: '#f56a00', verticalAlign: 'center' }} shape="square" size="large" gap={1}>
                            {  isRider ?
                              res?.package?.vendor?.first_name.charAt(0)  :
                              res?.rider?.first_name.charAt(0)
                            }
                          </Avatar>
                        </Badge> : 
                         <Avatar className="my-auto text-capitalize" style={{ backgroundColor: '#f56a00', verticalAlign: 'center' }} shape="square" size="large" gap={1}>
                           {  isRider ?
                             res?.package?.vendor?.first_name.charAt(0)  :
                             res?.rider?.first_name.charAt(0)
                           }
                         </Avatar>
                      }

                      <div className="ml-2 d-flex flex-wrap">
                        <div>
                          {
                            isRider ?
                            <p className="message-heading text-capitalize" style={{lineHeight:'13px'}}>{res?.package?.vendor?.first_name} {res?.package?.vendor?.last_name}</p> :
                            <p className="message-heading text-capitalize" style={{lineHeight:'13px'}}>{res?.receiver_name}</p>
                            // {res?.rider?.first_name} {res?.rider?.last_name}  
                          }
                        
                          <p className="message-desc w-100">
                            { res?.chat_last?.message.substring(0, 50)+' ...' || '....' }
                          </p>
                        </div>
                        <p className="message-time w-100">{ moment(res?.chat_last?.created_at || res?.created_at).fromNow(true) }</p>
                      </div>
                    </div>
                  </Link>
                ))
              }

              {
              lastPage > 1 ?
                <Pagination 
                    total={lastPage} 
                    current={pages} 
                    locale={locale} 
                    onChange={e => getPackage(e)}
                /> : null

              }
   

            </TabPane>
           
            <TabPane tab="Notifications" key="2">
              <div className=" d-flex ">
                <div className="bell-border  d-flex">
                  <i className="far fa-bell m-auto" />
                </div>
                <div className="ml-2 my-auto">
                  <p className="notif-heading">
                    Rider has requested to deliver your your package
                  </p>
                  <span className="notif-time">3 min ago</span>
                </div>
              </div>

              <div className="  d-flex my-3 ">
                <div className="bell-border  d-flex">
                  <i className="far fa-bell m-auto" />
                </div>
                <div className="ml-2 my-auto">
                  <p className="notif-heading">please verify your details</p>
                  <span className="notif-time">5 min ago</span>
                </div>
              </div>
              <div className="  d-flex my-3 ">
                <div className="bell-border  d-flex">
                  <i className="far fa-bell m-auto" />
                </div>
                <div className="ml-2 my-auto">
                  <p className="notif-heading">
                    Welcome to Satichha Sangit sir
                  </p>
                  <span className="notif-time">10 min ago</span>
                </div>
              </div>
              <div className=" d-flex my-3 ">
                <div className="bell-border  d-flex">
                  <i className="far fa-bell m-auto" />
                </div>

                <div className="ml-2 my-auto">
                  <p className="notif-heading">नयाँ बर्ष २०७८ को शुभकामना</p>
                  <span className="notif-time">10 min ago</span>

                  
                  <p className="font-14 mt-4">
                    नयाँ बर्ष २०७८ को शुभकामना – यस ब्लगमा नयाँ बर्षको शुभकामना
                    तथा SMS को फोटोहरु र सन्देसहरु राखेको छु। आशा
                  </p>
                  <img
                    src="https://1.bp.blogspot.com/-eYsS8ZkoBlI/YEPdPzCjDyI/AAAAAAAAZ5c/HUN5cZq4E50WXEUWu98d-ndVXwi9AuTJwCLcBGAsYHQ/s1662/Happy%2BNew%2BYear%2B2078%2BImages%2B%25286%2529.jpg"
                    alt=""
                    className=" mt-2 img-fluid"
                  />
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default Inbox;
