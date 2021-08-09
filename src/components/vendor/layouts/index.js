import {Suspense} from "react";
import FooterMenu from "@/parts/vendor/FooterMenu"
import { useEffect } from "react"
import { useHistory } from "react-router";
import authClient from '@/services/auth';
import { userStore, getUser } from '@/reducers/reducers'
import { useDispatch, useSelector } from "react-redux";
import { apiUser } from "@/api/vendor/dashboard"

export default function VendorLayout(props) {
  const history = useHistory()
  let { isAuth } = props
  const userSelector = useSelector(getUser)
  const dispatch = useDispatch()

  useEffect(() => {
    
    if(!isAuth) {
      history.push('/login')
    }

    authClient.interceptors.response.use(
      (response) => Promise.resolve(response),
      (error) => {
        const { response } = error;
        if (response.status === 500) {
          // notifyAnt['error']({message:"Somthing went wrong. please try again"})
        }

        if (response.status === 401) { //Unauthenticated
          window.localStorage.removeItem('_token');
          window.localStorage.removeItem('loggedIn');
          history.push("/login");
        }

        return Promise.reject(response);
      },
    );
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

    if(userSelector.length === 0){
      apiUser()
      .then(res => {
        dispatch(userStore(res.data))
      }).catch(err => {
        // alert('something went wrong')
      })
    }


    if(history.location.pathname.match('ticket-message') || history.location.pathname.match('chat')){
      if( document.querySelector('.footerMenu') !== null)
        document.querySelector('.footerMenu').style.display = "none";

      document.querySelector('.App')?.classList.remove("mb-100")
    }else{
      if( document.querySelector('.footerMenu') !== null)
        document.querySelector('.footerMenu').style.display = "block"
        
      document.querySelector('.App')?.classList.add("mb-100")
    }
  }, [dispatch, history.location.pathname, userSelector.length])

  return (
    <div>
        <Suspense fallback={<div></div>}>
            {props.children}
        </Suspense>
        {
          history.location.pathname.match('ticket-message')
          ? '' : <FooterMenu />
        }
    
    </div>
  );
}
