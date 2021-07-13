import {Suspense, useRef, useState} from "react";
import FooterMenu from "@/parts/rider/FooterMenu"
import { useEffect } from "react"
import { useHistory } from "react-router";
import { storePackageAlert, storeUser, getUser, packageAlertData} from "@/reducers/rider/reducers"

import { profile, onGoingPackage } from "@/api/rider"

import Pusher from "pusher-js"
import Echo from 'laravel-echo';

import alertMp3 from "@/assets/sound/alert.mp3"
import { useDispatch, useSelector } from "react-redux";

export default function RiderLayout(props) {

  const history = useHistory()
  let { mainHistory, isAuth } = props

  const dispatch = useDispatch()
  const userSelector = useSelector(getUser)
  const packageSelector = useSelector(packageAlertData)
  const [hasPackage, setHasPackage] = useState(null)

  let audio = useRef();

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
      
      if(userSelector === null){
        profile()
        .then(res => {
          dispatch(storeUser(res.data))
        }).catch(err => {
          alert('something went wrong')
        })
      }

      if(isMounted && packageSelector === null)
      { 
        echo.channel(`rider`).listen('.package', (data) => {
          if(!data?.rider_id ){
            history.push('/dashboard')
            dispatch(storePackageAlert(data[0]))
            setTimeout(() => {
                setTimeout(() => {
                  if(audio?.current !== "undefined") {
                    audio?.current?.play()
                  }
                }, 200)
            }, 400)

            setTimeout(() => {
              dispatch(storePackageAlert(null))
            }, 3000 * 10)
          }
        })
      }
  
      return () => { isMounted = false }
    
  }, [])
      

  useEffect(() => {
    
    if(!isAuth) {
      history.push('/login')
    }
    
  }, [])

  return (
    <div>
        <audio ref={audio}>
          <source src={alertMp3}></source>
        </audio>
        <Suspense mainHistory={mainHistory} fallback={<div></div>}>
            {props.children}
        </Suspense>
        <FooterMenu />
    </div>
  );
}


