import { useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Avatar,Button, Image, Popconfirm, message } from "antd";
import Layout from "antd/lib/layout/layout";
import "leaflet/dist/leaflet.css";
import MyMap from "@/components/maps/MyMap";
import Pusher from "pusher-js"
import Echo from 'laravel-echo';
import alertMp3 from "../../assets/sound/alert.mp3"
import { Modal, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import { acceptPackage } from "@/api/rider/index"


function confirm(e) {
  console.log(e);
  message.success("Click on Yes");
}

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

const RiderAccept = (props) => {
  let { mainHistory } = props
  const [packageAlert, setPackageAlert] = useState({})
  let audio = useRef()

  const alert = Modal.alert;

  const history = useHistory();
  // listen for real time tracking
  useEffect(() => {
    
    let isMounted = true 
    const options = {
        broadcaster: process.env.REACT_APP_BROADCAST,
        key: process.env.REACT_APP_PUSHER_KEY,
        cluster: 'ap2',
        wsHost: '127.0.0.1',
        wsPort: 6001,
        forceTLS: false,
        encrypted: false,
        disableStats: true,
        enabledTransports: ['ws'],
    };

    const echo = new Echo(options);
    echo.connector.pusher.config.authEndpoint = `http://127.0.0.1:8000/broadcasting/auth`;
    
    if(isMounted)
    {
      echo.channel(`rider`).listen('.package',(data) => {
        history.push('/dashboard')
        setPackageAlert(data)
        setTimeout(() => {
          audio.current.play()
        }, 40)
      });  
    }
 
    return () => { isMounted = false }
  
  }, [])


  const riderAcceptPackage = () => {
    acceptPackage(packageAlert[0].id)
    .then(res => {
      Toast.success('Your package is successfully accepted')
      setPackageAlert({})
    }).catch(err => {
      Toast.fail(err.response.data.message)
    })
  }

  return (
    <Layout>
    <section className="vh-100 map-bg position-relative">
      
      <audio ref={audio}>
          <source src={alertMp3}></source>
      </audio>

      <div className="common-map position-relative">
        <div className="col-2 my-auto profile-pop">
          <Avatar
            className="ava-bg"
            src={
              <Image src="https://uifaces.co/our-content/donated/KtCFjlD4.jpg" width="90" />
            }
          />
        </div>

        <MyMap/>

      </div>

      {
        packageAlert.length > 0 ?
        <div className="col-12 rider-accept">
          <div className="card p-3 ">
            <div className="d-flex">
              <Avatar
                className="ava-bg my-auto"
                src={
                  <Image src="https://uifaces.co/our-content/donated/KtCFjlD4.jpg" />
                }
              />
              <div className="ml-2">
                <p className="heading-xl f-w-600 line-height-07">{ packageAlert[0].vendor.first_name + ' ' + packageAlert[0].vendor.last_name  }</p>
                <p className="faded-text ">{ packageAlert[0]?.vendor?.location?.city }</p>
              </div>
            </div>
            <div className="d-flex my-2">
              <div>
                <p className="faded-text-sm ">Delivery Items</p>
                <p className="heading-l f-w-600">{ packageAlert[0]?.category?.title } x{ packageAlert[0].no_of_package }</p>
              </div>
            </div>
            <div className="d-flex my-2">
              <div className="d-flex">
                <i className="fas fa-map-marker-alt fa-xs my-auto mr-1 text-red"></i>
                <p className="faded-text ">{ packageAlert[0]?.location?.whole_address }</p>
              </div>
            </div>
            <div className="d-flex my-2">
                <Button
                  type="primary"
                  onClick={() =>
                    alert('Accept', 'Are you sure???', [
                      { text: 'Cancel', onPress: () => console.log('cancel') },
                      { text: 'Ok', onPress: () => riderAcceptPackage()},
                    ])
                  }
                >
                  Accept
                </Button>

                <Button
                className="ml-2"
                onClick={() =>
                  alert('Cancel', 'Are you sure???', [
                    { text: 'Cancel', onPress: () => console.log('cancel') },
                    { text: 'Ok', onPress: () => setPackageAlert({})},
                  ])
                }
                > Cancel </Button>
            </div>
          </div>
        </div>
        : ""
      }
   

    </section>
    </Layout>
  );
};

export default RiderAccept;
