import {Suspense, useRef, useState} from "react";
import FooterMenu from "@/parts/rider/FooterMenu"
import { useEffect } from "react"
import { useHistory } from "react-router";
import { storePackageAlert, storeUser, getUser, packageAlertData} from "@/reducers/rider/reducers"
import { profile } from "@/api/rider"
import authClient from "@/services/rider/auth";
import Pusher from "pusher-js"
import { setToken } from "@/reducers/rider/reducers"
import Echo from 'laravel-echo';
import { iOS } from "@/helper/helper"

import alertMp3 from "@/assets/sound/alert.mp3"
import { useDispatch, useSelector } from "react-redux";

export default function RiderLayout(props) {

  const history = useHistory()
  let { mainHistory, isAuth } = props

  const dispatch = useDispatch()
  const userSelector = useSelector(getUser)
  const packageSelector = useSelector(packageAlertData)

  let audio = useRef();

  useEffect(() => {
    if(history.location.pathname.match('chat')){
      if( document.querySelector('.footerMenu') !== null)
        document.querySelector('.footerMenu').style.display = "none";

      document.querySelector('.App')?.classList.remove("mb-100")
    }else{
      if( document.querySelector('.footerMenu') !== null)
        document.querySelector('.footerMenu').style.display = "block"
        
      document.querySelector('.App')?.classList.add("mb-100")
    }
  }, [history.location.pathname])

  window.addEventListener('resize', () => { 
    document.querySelector(':root').style
      .setProperty('--vh', window.innerHeight/100 - .15 + 'px');
  })
  

  // listen for real time tracking
  useEffect(() => {

    authClient.interceptors.response.use(
      (response) => Promise.resolve(response),
      (error) => {
        const { response } = error;
        if (response?.status === 500) {
          // notifyAnt['error']({message:"Somthing went wrong. please try again"})
        }

        if (response.status === 401) { //Unauthenticated
          window.localStorage.removeItem('_riderToken');
          dispatch(setToken(false))
          history.push("/login");
        }

        return Promise.reject(response);
      },
    );
    

    let isMounted = true 
    const options = {
        broadcaster: process.env.REACT_APP_BROADCAST,
        key: process.env.REACT_APP_PUSHER_KEY,
        cluster: 'ap2',
        wsHost: 'socket.sathichha.com',
        wsPort: 443,
        forceTLS: true,
        disableStats: true,
        enabledTransports: ["ws", "wss"]
    };

    const echo = new Echo(options);
    echo.connector.pusher.config.authEndpoint = `https://api.sathichha.com/broadcasting/auth`;
    
    if(userSelector === null){
      profile()
      .then(res => {
        dispatch(storeUser(res.data))
      }).catch(err => {
        // alert('something went wrong')
      })
    }

    if(isMounted && packageSelector === null)
    { 
      echo.channel(`rider`).listen('.package', (data) => {
        if(!data?.rider_id ){
          history.push('/dashboard')
          dispatch(storePackageAlert(data[0]))
          setTimeout(() => {
            if(!iOS){
              setTimeout(() => {
                if(audio?.current !== "undefined") {
                  audio?.current?.play()
                }
              }, 200)
            }
          }, 400)

          setTimeout(() => {
            dispatch(storePackageAlert(null))
          }, 3000 * 10)
        }
      })
    }

    return () => { isMounted = false }
    
  }, [dispatch, history, packageSelector, userSelector])
      

  useEffect(() => {
    
    if(!isAuth) {
      history.push('/login')
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
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


