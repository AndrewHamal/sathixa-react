import {Suspense} from "react";
import FooterMenu from "@/parts/vendor/FooterMenu"
import { useEffect } from "react"
import { useHistory } from "react-router";

export default function VendorLayout(props) {
  const history = useHistory()
  let { isAuth } = props

  useEffect(() => {
    
    if(!isAuth) {
      history.push('/login')
    }
    
  }, [])

  return (
    <div>
        <Suspense fallback={<div></div>}>
            {props.children}
        </Suspense>
        <FooterMenu />
    </div>
  );
}
