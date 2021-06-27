import {Suspense} from "react";
import FooterMenu from "@/parts/vendor/FooterMenu"

export default function VendorLayout(props) {
  return (
    <div>
        <Suspense fallback={<div></div>}>
            {props.children}
        </Suspense>
        <FooterMenu />
    </div>
  );
}
