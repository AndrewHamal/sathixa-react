(this["webpackJsonpsathixa-react"]=this["webpackJsonpsathixa-react"]||[]).push([[19],{518:function(e,t,n){"use strict";var a=n(551),c=n.n(a),o=n(692),i=n(57),l=n(40),s=n(65),r=n(1);t.a=function(e){var t=e.isModalVisible,n=e.signpad,a=e.completeDelivery,d=e.handleCancel,u=e.clearSign,p=e.loading,v=l.d.alert;return Object(r.jsxs)(o.a,{visible:t,footer:null,onCancel:d,style:{top:20},children:[Object(r.jsx)("p",{className:"text-center text-lg f-w-600",children:"Reciever Signature"}),Object(r.jsx)(c.a,{ref:n,penColor:"black",canvasProps:{className:"sigCanvas border rounded my-4"}}),Object(r.jsx)(i.a,{block:!0,type:"",onClick:u,className:"mb-2",children:"Clear signature"}),Object(r.jsx)(i.a,{disabled:p,block:!0,type:"primary",onClick:function(){return v("Complete Delivery","Are you sure???",[{text:"Cancel",onPress:function(){return console.log("cancel")}},{text:"Ok",onPress:function(){return a()}}])},className:"mb-2",children:p?Object(r.jsx)(s.a,{}):"Complete Delivery"})]})}},519:function(e,t,n){"use strict";var a=n(135),c=n(692),o=n(693),i=n(701),l=n(57),s=n(65),r=n(1);t.a=function(e){var t=e.cancelReasonModal,n=e.setCancelReasonModal,d=e.cancelSubmit,u=e.radio,p=e.handleRadio,v=e.cancelReason,j=e.loading,m=a.a.TextArea;return Object(r.jsxs)(c.a,{visible:t,footer:null,onCancel:function(){return n(!1)},style:{top:20},children:[Object(r.jsx)("p",{className:" text-lg f-w-600",children:"Select one of the reason below?"}),Object(r.jsx)("div",{className:"py-4",children:Object(r.jsxs)("form",{onSubmit:d,children:[Object(r.jsx)(o.a.Group,{name:"cancel_reasons_id",defaultValue:u,onChange:p,children:Object(r.jsxs)(i.b,{direction:"vertical",children:[null===v||void 0===v?void 0:v.map((function(e,t){return Object(r.jsxs)(o.a,{value:e.id,children:[e.title," "]},t)})),Object(r.jsx)(o.a,{value:5,children:"Other"})]})}),5===u?Object(r.jsx)(m,{required:!0,className:"mt-2",rows:3,name:"custom_cancel_reason",placeholder:"Enter Reason Here"}):null,Object(r.jsx)(l.a,{block:!0,type:"primary",className:"mb-0 mt-3",htmlType:"submit",children:j?Object(r.jsx)(s.a,{}):"Submit"})]})})]})}},655:function(e,t,n){},700:function(e,t,n){"use strict";n.r(t);var a=n(23),c=(n(506),n(31)),o=n(0),i=(n(87),n(200)),l=n(688),s=n(57),r=n(659),d=n.n(r),u=(n(655),n(486)),p=(n(521),n(522)),v=(n(673),n(696)),j=n(705),m=n(674),b=n(675),f=n(556),h=n(40),g=n(36),O=(n(97),n(51)),x=n(43),y=n(118),w=n(703),k=n(1);delete u.Icon.Default.prototype._getIconUrl,u.Icon.Default.mergeOptions({iconRetinaUrl:"Map Marker_8.png",iconUrl:"Map Marker_8.png",iconSize:new u.Point(35,35),shadowUrl:""});var _=u.icon({iconRetinaUrl:"Truck_6 (1).png",iconUrl:"Truck_6 (1).png",iconSize:new u.Point(35,35),shadowUrl:""}),N=(u.icon({iconRetinaUrl:"Map Marker_6.png",iconUrl:"Map Marker_6.png",iconSize:new u.Point(35,35),shadowUrl:""}),function(e){var t,n=e.packageAlert,i=e.setSummary,l=e.refetch,s=navigator.userAgent.match(/(iPod|iPhone|iPad)/)&&navigator.userAgent.match(/AppleWebKit/),r=Object(o.useRef)(),d=Object(g.b)(),h=Object(c.g)(),N=Object(o.useState)(),S=Object(a.a)(N,2),C=(S[0],S[1]),L=Object(o.useState)(),P=Object(a.a)(L,2),D=P[0],R=P[1],M=Object(o.useState)(0),T=Object(a.a)(M,2),E=(T[0],T[1]),A=Object(g.c)(x.a),z=Object(g.c)(O.g),U="",G="",B=u.divIcon({html:'<div class="accurate" ><svg width="90" height="90" viewBox="0 0 1357 1357" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M926.575 248.275C851.09 204.694 765.463 181.75 678.3 181.75C591.137 181.75 505.51 204.694 430.025 248.275L678.3 678.3L926.575 248.275Z" fill="url(#paint0_linear)"/>\n        <circle cx="677.5" cy="678.5" r="144" fill="#DB2B39" stroke="#fff" stroke-width="45"/>\n        <defs>\n        <linearGradient id="paint0_linear" x1="634.773" y1="178.393" x2="645.717" y2="605.77" gradientUnits="userSpaceOnUse">\n        <stop stop-color="#DB2B39" stop-opacity="0"/>\n        <stop offset="1" stop-color="#DB2B39"/>\n        </linearGradient>\n        </defs>\n        </svg></div>\n        ',iconAnchor:[40,40]});Object(o.useEffect)((function(){var e=r.current,t=((void 0===e?{}:e).leafletElement,!0);return 0===A.length&&t&&Object(y.c)().then((function(e){d(Object(x.k)(e.data))})),function(){t=!1}}),[A]);function F(){s&&DeviceOrientationEvent.requestPermission().then((function(e){"granted"===e&&window.addEventListener("deviceorientation",q,!0)})).catch((function(){return alert("not supported")}))}function q(e){var t=e.webkitCompassHeading||Math.abs(e.alpha-360);E(t),"undefined"!==typeof window.path&&(window.path.style.transform="rotate(".concat(t,"deg)"))}Object(o.useEffect)((function(){var e,t,a,c,o,l;s||window.addEventListener("deviceorientationabsolute",q,!0);var d=r.current,p=(void 0===d?{}:d).leafletElement,v={fromLat:null===n||void 0===n||null===(e=n.vendor)||void 0===e||null===(t=e.location)||void 0===t?void 0:t.lat,fromLong:null===n||void 0===n||null===(a=n.vendor)||void 0===a||null===(c=a.location)||void 0===c?void 0:c.long,toLat:null===n||void 0===n||null===(o=n.location)||void 0===o?void 0:o.lat,toLong:null===n||void 0===n||null===(l=n.location)||void 0===l?void 0:l.long};u.Routing.control({waypoints:[u.latLng(v.fromLat,v.fromLong),u.latLng(v.toLat,v.toLong)],useZoomParameter:!0,pointMarkerStyle:{display:"none"},summaryTemplate:function(e){var t={distance:null===e||void 0===e?void 0:e.distance,time:null===e||void 0===e?void 0:e.time};i(t)}}).addTo(p)}),[l]),Object(o.useEffect)((function(){var e=h.listen((function(){"undefined"!==typeof window.geoWatch&&(navigator.geolocation.clearWatch(window.geoWatch),delete window.marker,delete window.path)}));return function(){e()}}),[]);var H=function(){F();var e=r.current,a=void 0===e?{}:e,c=a.leafletElement;t=(new u.LayerGroup).addTo(c);var o={enableHighAccuracy:!1};window.geoWatch=navigator.geolocation.watchPosition((function(e){U=e.coords.latitude,G=e.coords.longitude;var a=a;c&&(c.setView([U,G]),t.clearLayers(),window.marker?(window.marker.setLatLng([U,G]),p.reverseGeocode({lat:U,lon:G,addressdetails:!0,"accept-language":"np",zoom:17}).then((function(e){R(D),document.querySelector(".search-input").value=e.display_name}))):(window.marker=u.marker([U,G],{icon:B,draggable:!1}).addTo(c),p.reverseGeocode({lat:U,lon:G,addressdetails:!0,"accept-language":"np",zoom:17}).then((function(e){R(D),document.querySelector(".search-input").value=e.display_name}))),null!==n&&Object(y.r)(U,G,a,null===n||void 0===n?void 0:n.id).then((function(e){console.log("success location saved")})),window.path=document.querySelector(".accurate svg path"))}),V,o)};function V(e){console.warn("ERROR("+e.code+"): "+e.message)}Object(o.useEffect)((function(){if("undefined"!==typeof z&&null!==z.location&&0!==z.length){var e=r.current,t=(void 0===e?{}:e).leafletElement;(new u.LayerGroup).addTo(t).clearLayers(),window.marker=u.marker([z.location.lat,z.location.long],{draggable:!0}).addTo(t).bindPopup("Drag to change location").openPopup(),t.setView([z.location.lat,z.location.long]),W()}}),[z]);var W=function(){window.marker.on("dragend",(function(e){var t,n;p.reverseGeocode({lat:null===e||void 0===e||null===(t=e.target)||void 0===t?void 0:t._latlng.lat,lon:null===e||void 0===e||null===(n=e.target)||void 0===n?void 0:n._latlng.lng,addressdetails:!0,"accept-language":"np",zoom:18}).then((function(t){var n;window.marker.setLatLng(null===e||void 0===e||null===(n=e.target)||void 0===n?void 0:n._latlng);var a={city:t.address.suburb||t.address.town||t.address.city,state:t.address.region||t.address.county,country:t.address.country,long:t.lon,lat:t.lat,whole_address:t.display_name};C(t.display_name),document.querySelector(".search-input").value=t.display_name,R(a)}))}))};return Object(k.jsx)("div",{className:"map-container",children:Object(k.jsxs)(v.a,{center:[27.7081859,85.322004],minZoom:"6",maxZoom:"18",zoom:"15",keyboard:!0,doubleClickZoom:!0,scrollWheelZoom:!0,ref:r,children:[Object(k.jsx)(j.a,{url:"https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",attribution:'\xa9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),null===A||void 0===A?void 0:A.map((function(e,t){return Object(k.jsx)(m.a,{position:[e.location.lat,e.location.long],icon:_,children:Object(k.jsxs)(b.a,{sticky:!0,offset:[0,-15.2],direction:"top",opacity:1,children:[Object(k.jsx)("p",{className:"font-weight-bold",children:"Sathixa Vendor"}),Object(k.jsx)("p",{children:e.first_name+" "+e.last_name})]})},t)})),Object(k.jsx)(f.a,{onChange:function(e){var t=r.current,n=(void 0===t?{}:t).leafletElement,a=(new u.LayerGroup).addTo(n);a.clearLayers(),"undefined"!==typeof e.latLng&&p.reverseGeocode({lat:e.latLng.lat,lon:e.latLng.lng,addressdetails:!0,"accept-language":"np",zoom:18}).then((function(t){if(a.clearLayers(),"undefined"!==typeof window.marker){window.marker.setLatLng(e.latLng);var n={city:t.address.suburb||t.address.town||t.address.city,state:t.address.region||t.address.county,country:t.address.country,long:t.lon,lat:t.lat,whole_address:t.display_name};document.querySelector(".search-input").value=t.display_name,R(n),W()}}))},position:"topleft",inputPlaceholder:"My current location",showMarker:!1,icon:!1,zoom:14,closeResultsOnClick:!0,openSearchOnLoad:!0,providerOptions:{searchBounds:[[26.3477581,30.446945],[80.0586226,88.2015257]],region:"np"}}),Object(k.jsx)("button",{className:"btn locate-me",onClick:function(){H()},children:Object(k.jsx)(w.a,{style:{fontSize:"19px"}})})]})})}),S=n(518),C=n(47),L=n(704),P=n(519),D=n(658);t.default=function(e){e.mainHistory;var t,n,r,u,p,v=Object(g.b)(),j=Object(o.useState)(!1),m=Object(a.a)(j,2),b=m[0],f=m[1],O=Object(o.useState)(null),w=Object(a.a)(O,2),_=w[0],R=w[1],M=Object(o.useState)(!0),T=Object(a.a)(M,2),E=T[0],A=T[1],z=Object(o.useState)(null),U=Object(a.a)(z,2),G=U[0],B=U[1],F=Object(o.useState)(0),q=Object(a.a)(F,2),H=q[0],V=q[1],W=Object(o.useState)(!1),Z=Object(a.a)(W,2),I=Z[0],K=Z[1],J=Object(o.useState)(!1),Q=Object(a.a)(J,2),X=Q[0],Y=Q[1],$=Object(o.useState)(null),ee=Object(a.a)($,2),te=ee[0],ne=ee[1],ae=Object(o.useState)(1),ce=Object(a.a)(ae,2),oe=ce[0],ie=ce[1],le=Object(o.useRef)(),se=Object(o.useRef)(),re=Object(o.useRef)(),de=Object(g.c)(x.e),ue=h.d.alert;Object(c.g)();function pe(){Object(y.i)(1).then((function(e){if(0==e.data.data.length)return v(Object(x.h)(null)),R(null),V(H+1),void A(!1);v(Object(x.h)(e.data.data[0].package)),R(e.data.data[0]),V(H+1),A(!1)})).catch((function(e){h.i.fail("someting went wrong")}))}Object(o.useEffect)((function(){var e=!0;return e&&(null===de?pe():(A(!1),setTimeout((function(){V(H+1)}),200))),function(){e=!1}}),[de]);var ve=function(e){if(0==e){var t=new FormData;return t.append("process_step",1),t.append("package_id",de.id),t.append("_method","PATCH"),void Object(y.t)(_.id,t).then((function(e){h.i.success("Okay! going to pickup the package"),pe()})).catch((function(e){console.log(e),h.i.success("Something went wrong!")}))}if(1==e){var n=new FormData;return n.append("process_step",2),n.append("package_id",de.id),n.append("_method","PATCH"),void Object(y.t)(_.id,n).then((function(e){h.i.success("Successfully picked up the package"),pe()})).catch((function(e){console.log(e),h.i.success("Something went wrong!")}))}2!=e?Object(y.a)(de.id).then((function(e){h.i.success("hurray!!! Package is successfully accepted"),v(Object(x.h)(null)),pe()})).catch((function(e){h.i.fail(e.response.data.message)})):f(!0)};Object(o.useEffect)((function(){var e=!0;return Object(y.d)().then((function(t){e&&ne(t.data)})).catch((function(e){ue(e.message)})),function(){e=!1}}),[]);var je=function(){return Object(k.jsx)("span",{children:"Time out!!!"})};return E?"":Object(k.jsxs)(d.a,{children:[Object(k.jsxs)("section",{className:"vhc-100 map-bg position-relative",children:[Object(k.jsxs)("div",{className:"common-map position-relative",children:[Object(k.jsx)("div",{className:"col-2 my-auto profile-pop",children:Object(k.jsx)(i.a,{className:"ava-bg",src:Object(k.jsx)(l.a,{src:"https://uifaces.co/our-content/donated/KtCFjlD4.jpg",width:"90"})})}),Object(k.jsx)(N,{packageAlert:de,setSummary:B,refetch:H})]}),null!==de&&3!==(null===de||void 0===de?void 0:de.process_step)?Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("button",{className:"show-detail-dialog btn",onClick:function(){se.current.style.visibility="visible",se.current.style.bottom="14px",re.current.style.visibility="hidden"},ref:re,children:Object(k.jsx)("i",{className:"fa fa-angle-up"})}),Object(k.jsx)("div",{className:"col-12 rider-accept",ref:se,children:Object(k.jsxs)("div",{className:"card p-3 ",children:[Object(k.jsxs)("div",{className:"d-flex",children:[Object(k.jsx)(i.a,{className:"ava-bg my-auto",src:Object(k.jsx)(l.a,{src:"https://uifaces.co/our-content/donated/KtCFjlD4.jpg"})}),Object(k.jsxs)("div",{className:"ml-2",children:[Object(k.jsx)("p",{className:"heading-xl f-w-600 line-height-07 text-capitalize",children:de.vendor.first_name+" "+de.vendor.last_name}),Object(k.jsx)("p",{className:"faded-text ",children:null===de||void 0===de||null===(t=de.vendor)||void 0===t||null===(n=t.location)||void 0===n?void 0:n.city})]}),null!==(null===de||void 0===de?void 0:de.process_step)?Object(k.jsx)("div",{className:"ml-auto pl-3 mr-2 text-right",children:Object(k.jsx)("a",{href:"tel:".concat(null===de||void 0===de||null===(r=de.vendor)||void 0===r?void 0:r.phone),children:Object(k.jsx)("button",{className:"btn btn-sm bg-light text-dark",children:Object(k.jsx)(L.a,{})})})}):Object(k.jsx)("button",{className:"ml-auto mr-2 text-white btn btn-sm bg-secondary border-15 p-0",style:{width:"24px",height:"24px",fontSize:"12px"},disabled:!0,children:Object(k.jsx)(D.a,{date:Date.now()+3e4,renderer:function(e){return Object(k.jsx)("div",{children:e.seconds})},children:Object(k.jsx)(je,{})})}),Object(k.jsx)("div",{className:"pl-2 text-right",onClick:function(){se.current.style.bottom="-250px",se.current.style.visibility="hidden",re.current.style.visibility="visible"},children:Object(k.jsx)("i",{className:"fa fa-angle-down"})})]}),Object(k.jsx)("div",{className:"d-flex mt-2",children:Object(k.jsxs)("div",{children:[Object(k.jsx)("p",{className:"faded-text-sm ",children:"Delivery Items"}),Object(k.jsxs)("p",{className:"heading-l f-w-600",children:[null===de||void 0===de||null===(u=de.category)||void 0===u?void 0:u.title," x",de.no_of_package]})]})}),Object(k.jsx)("div",{className:"d-flex my-2",children:Object(k.jsxs)("div",{className:"d-flex",children:[Object(k.jsx)("i",{className:"fas fa-map-marker-alt fa-xs my-auto mr-1 text-red"}),Object(k.jsx)("p",{className:"faded-text ",children:null===de||void 0===de||null===(p=de.location)||void 0===p?void 0:p.whole_address})]})}),Object(k.jsxs)("div",{className:"d-flex",children:[Object(k.jsxs)("small",{className:"my-auto",children:["Distance: ",null===G||void 0===G?void 0:G.distance]}),Object(k.jsx)("small",{className:"my-auto mx-1",children:"|"}),Object(k.jsxs)("small",{className:"my-auto",children:["Time: ",null===G||void 0===G?void 0:G.time]})]}),Object(k.jsxs)("div",{className:"d-flex my-2",children:[Object(k.jsx)(s.a,{type:"primary",className:"w-100",onClick:function(){return 2!==(null===_||void 0===_?void 0:_.process_step)?ue("Accept","Are you sure???",[{text:"Cancel",onPress:function(){return console.log("cancel")}},{text:"Ok",onPress:function(){return ve(null===_||void 0===_?void 0:_.process_step)}}]):ve(null===_||void 0===_?void 0:_.process_step)},children:0===(null===_||void 0===_?void 0:_.process_step)?"Going For Package":1===(null===_||void 0===_?void 0:_.process_step)?"Pickup":2===(null===_||void 0===_?void 0:_.process_step)?"Delivered":"Accept"}),Object(k.jsx)(s.a,{className:"ml-2",onClick:function(){null===(null===_||void 0===_?void 0:_.process_step)||"undefined"===typeof(null===_||void 0===_?void 0:_.process_step)?ue("Cancel","Are you sure???",[{text:"Cancel",onPress:function(){return console.log("cancel")}},{text:"Ok",onPress:function(){return v(Object(x.h)(null))}}]):Y(!0)},children:" Cancel "})]})]})})]}):""]}),Object(k.jsx)(S.a,{isModalVisible:b,handleCancel:function(){f(!1),le.current.clear()},signpad:le,loading:E,clearSign:function(){le.current.clear()},completeDelivery:function(){var e,t,n;if(A(!0),1===le.current.getTrimmedCanvas().width)return h.i.fail("Please add signature to the canvas."),void A(!1);var a=le.current.getTrimmedCanvas().toDataURL("image/png"),c=new FormData;c.append("package_id",null===_||void 0===_||null===(e=_.package)||void 0===e?void 0:e.id),c.append("receiver_signature_image",Object(C.a)(a,"signature"+(null===_||void 0===_||null===(t=_.package)||void 0===t?void 0:t.receiver_name))),c.append("receiver_signature_name",null===_||void 0===_||null===(n=_.package)||void 0===n?void 0:n.receiver_name),Object(y.o)(c).then((function(e){h.i.success("Package delivered successfully"),f(!1),pe(),A(!1)})).catch((function(e){h.i.fail("Someting went wrong. please try again"),A(!1)}))}}),Object(k.jsx)(P.a,{cancelReasonModal:X,setCancelReasonModal:Y,cancelSubmit:function(e){e.preventDefault();var t=new FormData(e.target);t.append("package_id",null===de||void 0===de?void 0:de.id),K(!0),Object(y.n)(t).then((function(e){h.i.success(e.data.message),Y(!1),pe(),K(!1)})).catch((function(e){var t;Object.entries(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.errors).map((function(e){h.i.info(e[1][0])})),K(!1)}))},radio:oe,handleRadio:function(e){ie(e.target.value)},cancelReason:te,loading:I})]})}}}]);
//# sourceMappingURL=19.a7342663.chunk.js.map