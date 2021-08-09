import { useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pagination } from "antd-mobile";
import { PageHeader, Steps, Layout, Tabs } from "antd";
import { onGoingPackage, historyPackage, canceledPackage } from "@/api/rider/index"
import packageimg from "@/assets/vendor/packageimg.svg";
import { Empty } from 'antd';
import { Skeleton } from "antd"
import { Helmet } from "react-helmet";

const { TabPane } = Tabs;
const { Content } = Layout;

const Pack = () => {

  const history = useHistory();
  const [packagesOnGoing, setPackagesOnGoing] = useState([])
  const [packagesHistory, setPackagesHistory] = useState([])
  const [packagesCanceled, setPackagesCanceled] = useState([])
  const [loading, setLoading] = useState(true)
  const [nextPageOn, setPageOn] = useState(1)
  const [lastPageOn, setLastPageOn] = useState(1)
  const [nextPageHis, setPageHis] = useState(1)
  const [lastPageHis, setLastPageHis] = useState(1)
  const [nextPageCanc, setPageCanc] = useState(1)
  const [lastPageCanc, setLastPageCanc] = useState(1)
  const [keyStep, setKeyStep] = useState(1);

  const locale = {
    prevText: 'Prev',
    nextText: 'Next',
  };


  useEffect(() => {
    let isMounted = true

    if(isMounted)
      callback(1)

    return () => { isMounted = false }
  }, [])

  function callback(key, page = 1) {
    setKeyStep(key)
    if(key == 1){
      onGoingPackage(page)
      .then(res => {
        setPackagesOnGoing(res.data)
        setLastPageOn(res?.data?.last_page)
        setPageOn(res?.data?.current_page)
        setLoading(false)
      })
    }
    if(key == 2){
      historyPackage(page)
      .then(res => {
        setPackagesHistory(res.data)
        setLastPageHis(res?.data?.last_page)
        setPageHis(res?.data?.current_page)
        setLoading(false)
      })
    }
    
    if(key == 3){
      canceledPackage(page)
      .then(res => {
        setPackagesCanceled(res.data)
        setLastPageCanc(res?.data?.last_page)
        setPageCanc(res?.data?.current_page)
        setLoading(false)
      })
    }
  }

  return (
    <Layout>
      <Helmet>
        <meta name="apple-mobile-web-app-status-bar-style" content="default"></meta>
      </Helmet>
      <PageHeader
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
        className="site-page-header bg-red "
        title="Packages"
      />

      <Content
        className="site-layout"
        style={{
          padding: "0 14px",
          marginTop: 60,
        }}
      >
        {
          loading ? <Skeleton active/>
          :
          <div className="site-layout-background mb-2">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Ongoing" key="1">

                {
                  packagesOnGoing?.data?.map((v, i)=> (
                    <Link to={`/package-detail/${v?.package?.id}`} key={i}>
                      <div className="package-card mb-2">
                        <div className="d-flex  flex-wrap">
                          <img src={packageimg} alt="" className="width-pack" />
                          <table className="table ml-2 my-auto">
                            <tbody>
                              <tr>
                                <td className="font-14 font-weight-600 text-capitalize">
                                  {  v?.package?.vendor?.first_name + ' ' + v?.package?.vendor?.last_name  }
                                </td>
                                <td className="font-14 font-weight-600 text-align-end pl-1">
                                  x {v?.package?.no_of_package }
                                </td>
                              </tr>
                              <tr>
                                <td className="p-small">Categories</td>
                                <td className="p-small p-small-sharp ">
                                  {v?.package?.category?.title }
                                </td>
                              </tr>
                              <tr>
                                <td className="p-small">Weight</td>
                                <td className="p-small p-small-sharp ">{v?.package?.weight }KG</td>
                              </tr>
                              <tr>
                                <td className="p-small font-14">Price</td>
                                <td className="vendor-package-price font-14  ">
                                  Rs {v?.package?.product_price }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="my-auto ml-auto">
                            <p className="status-active text-warning font-12">Processing</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                }

                {
                    lastPageOn > 1 ?
                    <Pagination 
                        total={lastPageOn} 
                        current={nextPageOn} 
                        locale={locale} 
                        onChange={e => callback(keyStep, e)}
                    /> : null

                }

                {
                  packagesOnGoing?.data?.length === 0 
                  ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : ''
                }
          
              </TabPane>
              <TabPane tab="Completed" key="2">
              {
                  packagesHistory?.data?.map((v, i)=> (
                    <Link to={`/package-detail/${v?.package?.id}`} key={i}>
                      <div className="package-card mb-2">
                        <div className="d-flex  flex-wrap">
                          <img src={packageimg} alt="" className="width-pack" />
                          <table className="table ml-2 my-auto">
                            <tbody>
                              <tr>
                                <td className="font-14 font-weight-600 text-capitalize">
                                  {  v?.package?.vendor?.first_name + ' ' + v?.package?.vendor?.last_name  }
                                </td>
                                <td className="font-14 font-weight-600 text-align-end pl-1">
                                  x {v?.package?.no_of_package }
                                </td>
                              </tr>
                              <tr>
                                <td className="p-small">Categories</td>
                                <td className="p-small p-small-sharp ">
                                  {v?.package?.category?.title }
                                </td>
                              </tr>
                              <tr>
                                <td className="p-small">Weight</td>
                                <td className="p-small p-small-sharp ">{v?.package?.weight }KG</td>
                              </tr>
                              <tr>
                                <td className="p-small font-14">Price</td>
                                <td className="vendor-package-price font-14  ">
                                  Rs {v?.package?.product_price }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="my-auto ml-auto">
                          { v.process_step == 3 ?
                              <p className="status-success font-12 text-success">Delivered</p> 	
                            :	<p className="status-active font-12 text-warning">Processing</p>
                          }
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                }

                {
                   lastPageHis > 1 ?
                    <Pagination 
                        total={lastPageHis} 
                        current={nextPageHis} 
                        locale={locale} 
                        onChange={e => callback(keyStep, e)}
                    /> : null
                 }

                {
                  packagesHistory?.data?.length === 0 
                  ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : ''
                }
              </TabPane>


              <TabPane tab="Canceled" key="3">
              {
                  packagesCanceled?.data?.map((v, i)=> (
                    <Link to={`/package-detail/${v?.package?.id}`} key={i}>
                      <div className="package-card mb-2">
                        <div className="d-flex  flex-wrap">
                          <img src={packageimg} alt="" className="width-pack" />
                          <table className="table ml-2 my-auto">
                            <tbody>
                              <tr>
                                <td className="font-14 font-weight-600 text-capitalize">
                                  {  v?.package?.vendor?.first_name + ' ' + v?.package?.vendor?.last_name  }
                                </td>
                                <td className="font-14 font-weight-600 text-align-end pl-1">
                                  x {v?.package?.no_of_package }
                                </td>
                              </tr>
                              <tr>
                                <td className="p-small">Categories</td>
                                <td className="p-small p-small-sharp ">
                                  {v?.package?.category?.title }
                                </td>
                              </tr>
                              <tr>
                                <td className="p-small">Weight</td>
                                <td className="p-small p-small-sharp ">{v?.package?.weight }KG</td>
                              </tr>
                              <tr>
                                <td className="p-small font-14">Price</td>
                                <td className="vendor-package-price font-14  ">
                                  Rs {v?.package?.product_price }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="my-auto ml-auto">
                            <p className="status-success font-12 text-danger">Canceled</p> 	
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                }

                {
                   lastPageCanc > 1 ?
                    <Pagination 
                        total={lastPageCanc} 
                        current={nextPageCanc} 
                        locale={locale} 
                        onChange={e => callback(keyStep, e)}
                    /> : null
                 }

                {
                  packagesCanceled?.data?.length === 0 
                  ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : ''
                }
               
              </TabPane>
            </Tabs>
          </div>
        }
       
      </Content>
    </Layout>
  );
};

export default Pack;
