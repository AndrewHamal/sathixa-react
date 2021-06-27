import {Suspense} from "react";
import FooterMenu from "@/parts/rider/FooterMenu"
import { useEffect } from "react"

export default function RiderLayout(props) {

  let { mainHistory } = props
  return (
    <div>
        <Suspense mainHistory={mainHistory} fallback={<div></div>}>
            {props.children}
        </Suspense>
        <FooterMenu />
    </div>
  );
}


