(this["webpackJsonpsathixa-react"]=this["webpackJsonpsathixa-react"]||[]).push([[22],{518:function(e,a,c){"use strict";var l=c(551),t=c.n(l),n=c(692),s=c(57),i=c(40),o=c(65),d=c(1);a.a=function(e){var a=e.isModalVisible,c=e.signpad,l=e.completeDelivery,r=e.handleCancel,j=e.clearSign,u=e.loading,b=i.d.alert;return Object(d.jsxs)(n.a,{visible:a,footer:null,onCancel:r,style:{top:20},children:[Object(d.jsx)("p",{className:"text-center text-lg f-w-600",children:"Reciever Signature"}),Object(d.jsx)(t.a,{ref:c,penColor:"black",canvasProps:{className:"sigCanvas border rounded my-4"}}),Object(d.jsx)(s.a,{block:!0,type:"",onClick:j,className:"mb-2",children:"Clear signature"}),Object(d.jsx)(s.a,{disabled:u,block:!0,type:"primary",onClick:function(){return b("Complete Delivery","Are you sure???",[{text:"Cancel",onPress:function(){return console.log("cancel")}},{text:"Ok",onPress:function(){return l()}}])},className:"mb-2",children:u?Object(d.jsx)(o.a,{}):"Complete Delivery"})]})}},519:function(e,a,c){"use strict";var l=c(135),t=c(692),n=c(693),s=c(701),i=c(57),o=c(65),d=c(1);a.a=function(e){var a=e.cancelReasonModal,c=e.setCancelReasonModal,r=e.cancelSubmit,j=e.radio,u=e.handleRadio,b=e.cancelReason,p=e.loading,v=l.a.TextArea;return Object(d.jsxs)(t.a,{visible:a,footer:null,onCancel:function(){return c(!1)},style:{top:20},children:[Object(d.jsx)("p",{className:" text-lg f-w-600",children:"Select one of the reason below?"}),Object(d.jsx)("div",{className:"py-4",children:Object(d.jsxs)("form",{onSubmit:r,children:[Object(d.jsx)(n.a.Group,{name:"cancel_reasons_id",defaultValue:j,onChange:u,children:Object(d.jsxs)(s.b,{direction:"vertical",children:[null===b||void 0===b?void 0:b.map((function(e,a){return Object(d.jsxs)(n.a,{value:e.id,children:[e.title," "]},a)})),Object(d.jsx)(n.a,{value:5,children:"Other"})]})}),5===j?Object(d.jsx)(v,{required:!0,className:"mt-2",rows:3,name:"custom_cancel_reason",placeholder:"Enter Reason Here"}):null,Object(d.jsx)(i.a,{block:!0,type:"primary",className:"mb-0 mt-3",htmlType:"submit",children:p?Object(d.jsx)(o.a,{}):"Submit"})]})})]})}},687:function(e,a,c){"use strict";c.r(a);var l=c(21),t=c(31),n=c(32),s=c(0),i=c(480),o=c(481),d=c(171),r=c(135),j=c(478),u=c(279),b=c(57),p=c(207),v=c(669),m=c(118),x=c(43),O=c(35),h=c(40),f=c(518),g=c(47),N=c(519),k=c(1),y=i.a.TabPane,_=(o.a.Step,d.a.Header,d.a.Content);d.a.Footer;a.default=function(){r.a.TextArea;var e,a,c,o,w,C,S,R,D,P,T,M,A,I,V,F,z,B,E=Object(s.useState)(!1),G=Object(l.a)(E,2),H=G[0],J=G[1],K=Object(s.useState)(!0),q=Object(l.a)(K,2),L=q[0],U=q[1],W=Object(s.useState)(!1),Q=Object(l.a)(W,2),X=Q[0],Y=Q[1],Z=Object(s.useState)(1),$=Object(l.a)(Z,2),ee=$[0],ae=$[1],ce=Object(s.useState)(null),le=Object(l.a)(ce,2),te=le[0],ne=le[1],se=Object(s.useState)(!1),ie=Object(l.a)(se,2),oe=ie[0],de=ie[1],re=Object(s.useState)(!1),je=Object(l.a)(re,2),ue=(je[0],je[1],Object(s.useState)(!1)),be=Object(l.a)(ue,2),pe=be[0],ve=be[1],me=Object(s.useRef)(),xe=(h.d.alert,Object(O.b)()),Oe=Object(O.c)(x.f),he=Object(t.i)().id;Object(s.useEffect)((function(){var e;Object(m.d)().then((function(e){ne(e.data)})).catch((function(e){})),null===Oe||(null===Oe||void 0===Oe||null===(e=Oe.package)||void 0===e?void 0:e.id)!==he?fe():U(!1)}),[]);var fe=function(){Object(m.f)(he).then((function(e){xe(Object(x.i)(e.data)),U(!1)})).catch((function(e){console.log(e)}))},ge=Object(t.g)(),Ne=function(){me.current.clear()};return Object(k.jsxs)(d.a,{children:[Object(k.jsx)(j.a,{style:{position:"fixed",zIndex:1,width:"100%"},onBack:function(){return ge.goBack()},className:"site-page-header bg-red",title:"Package"}),Object(k.jsx)(_,{className:"site-layout",style:{padding:"0 14px",marginTop:60},children:L?Object(k.jsx)(u.a,{active:!0}):Object(k.jsx)("div",{className:"site-layout-background mb-3",children:Object(k.jsx)(i.a,{defaultActiveKey:"1",onChange:function(e){console.log(e)},children:Object(k.jsxs)(y,{tab:null!==(null===Oe||void 0===Oe?void 0:Oe.cancel_ride)?"Canceled":3===Oe.process_step?"Delivered":"Ongoing",children:[Object(k.jsx)("div",{className:"package-card ",children:Object(k.jsxs)("div",{className:"d-flex  flex-wrap",children:[Object(k.jsx)("img",{src:p.a,alt:"",className:"width-pack"}),Object(k.jsx)("table",{className:"table ml-2 my-auto",children:Object(k.jsxs)("tbody",{children:[Object(k.jsxs)("tr",{children:[Object(k.jsx)("td",{className:"font-14 font-weight-600 text-capitalize",children:(null===Oe||void 0===Oe||null===(e=Oe.package)||void 0===e||null===(a=e.vendor)||void 0===a?void 0:a.first_name)+" "+(null===Oe||void 0===Oe||null===(c=Oe.package)||void 0===c||null===(o=c.vendor)||void 0===o?void 0:o.last_name)}),Object(k.jsxs)("td",{className:"font-14 font-weight-600 text-align-end pl-1",children:["x ",null===Oe||void 0===Oe||null===(w=Oe.package)||void 0===w?void 0:w.no_of_package]})]}),Object(k.jsxs)("tr",{children:[Object(k.jsx)("td",{className:"p-small",children:"Categories"}),Object(k.jsx)("td",{className:"p-small p-small-sharp ",children:null===Oe||void 0===Oe||null===(C=Oe.package)||void 0===C||null===(S=C.category)||void 0===S?void 0:S.title})]}),Object(k.jsxs)("tr",{children:[Object(k.jsx)("td",{className:"p-small",children:"Weight"}),Object(k.jsxs)("td",{className:"p-small p-small-sharp ",children:[null===Oe||void 0===Oe||null===(R=Oe.package)||void 0===R?void 0:R.weight,"KG"]})]}),Object(k.jsxs)("tr",{children:[Object(k.jsx)("td",{className:"p-small font-14",children:"Price"}),Object(k.jsxs)("td",{className:"vendor-package-price font-14  ",children:["Rs ",null===Oe||void 0===Oe||null===(D=Oe.package)||void 0===D?void 0:D.product_price]})]})]})}),Object(k.jsx)("div",{className:"my-auto ml-auto",children:null!==(null===Oe||void 0===Oe?void 0:Oe.cancel_ride)?Object(k.jsx)("p",{className:"status-success font-12 text-danger",children:"Canceled"}):3==Oe.process_step?Object(k.jsx)("p",{className:"status-success font-12 text-success",children:"Delivered"}):Object(k.jsx)("p",{className:"status-active font-12 text-warning",children:"Processing"})})]})}),3!==Oe.process_step&&null!==(null===Oe||void 0===Oe?void 0:Oe.cancel_ride)?Object(k.jsx)(b.a,{onClick:function(){return de(!0)},type:"",block:!0,className:"my-2",children:"Cancel Pickup"}):"",null!==(null===Oe||void 0===Oe||null===(P=Oe.package)||void 0===P?void 0:P.special_instruction)?Object(k.jsxs)("section",{children:[Object(k.jsx)("p",{className:"mt-2 mb-1 font-12",children:"Additional Information"}),Object(k.jsx)("div",{className:"package-card ",children:Object(k.jsx)("p",{className:"add-info ",children:null===Oe||void 0===Oe||null===(T=Oe.package)||void 0===T?void 0:T.special_instruction})})]}):"",Object(k.jsxs)("section",{className:"package-card my-2",children:[Object(k.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(k.jsx)("p",{className:"p-location-14",children:"Delivery Charge"}),Object(k.jsx)("p",{className:"p-location-14 ",children:"Rs 200"})]}),Object(k.jsxs)("div",{className:"d-flex justify-content-between pt-3",children:[Object(k.jsx)("p",{className:"p-location-14 text-red",children:"Total"}),Object(k.jsx)("p",{className:"p-location-14 text-red",children:parseInt(null===Oe||void 0===Oe||null===(M=Oe.package)||void 0===M?void 0:M.product_price)+parseInt(200)})]})]}),null===(null===Oe||void 0===Oe?void 0:Oe.cancel_ride)?Object(k.jsxs)("section",{children:[Object(k.jsx)("p",{className:"mt-3 mb-1 font-12",children:"Reciever Info"}),Object(k.jsxs)("div",{className:"package-card ",children:[Object(k.jsxs)("div",{className:"d-flex",children:[Object(k.jsx)("i",{className:"fas fa-user-alt mr-2 d-p-color fa-xs my-auto "}),Object(k.jsx)("p",{className:"f-w-600",children:null===Oe||void 0===Oe||null===(A=Oe.package)||void 0===A?void 0:A.receiver_name})]}),Object(k.jsxs)("div",{className:"d-flex mt-3 pb-2",children:[Object(k.jsx)("i",{className:"fas fa-phone-alt mr-2 d-p-color fa-xs my-auto  "}),Object(k.jsx)("p",{className:"f-w-600",children:null===Oe||void 0===Oe||null===(I=Oe.package)||void 0===I?void 0:I.receiver_phone})]}),3!==Oe.process_step&&null===(null===Oe||void 0===Oe||null===(V=Oe.accepted_package)||void 0===V?void 0:V.cancel_reasons_id)&&null===(null===Oe||void 0===Oe||null===(F=Oe.accepted_package)||void 0===F?void 0:F.custom_cancel_reason)?Object(k.jsx)(b.a,{type:"",block:!0,className:"my-2",onClick:function(){v.a,J(!0)},children:"Add Signature"}):""]})]}):null,null===(null===Oe||void 0===Oe?void 0:Oe.cancel_ride)?Object(k.jsxs)("div",{className:"d-flex",style:3!==Oe.process_step?{padding:"0 13px"}:{},children:[Object(k.jsx)("a",{className:"mr-1 w-100",href:"tel:".concat(null===Oe||void 0===Oe||null===(z=Oe.package)||void 0===z?void 0:z.receiver_phone),children:Object(k.jsxs)(b.a,{type:"primary flex-fill w-100",className:"my-2",children:[Object(k.jsx)("i",{className:"fas fa-phone-volume pr-2 text-white"}),"Call Vendor"]})}),Object(k.jsx)(n.b,{to:"/chat/"+(null===Oe||void 0===Oe||null===(B=Oe.package)||void 0===B?void 0:B.id),className:"my-2 flex-fill w-100 ml-1",children:Object(k.jsxs)(b.a,{type:"default",className:"w-100",children:[Object(k.jsx)("i",{className:"far fa-comment-dots pr-2"}),"Message"]})})]}):null]},"1")})})}),Object(k.jsx)(f.a,{isModalVisible:H,handleCancel:function(){J(!1),me.current.clear()},signpad:me,loading:X,clearSign:Ne,completeDelivery:function(){var e,a,c;if(Y(!0),1===me.current.getTrimmedCanvas().width)return h.i.fail("Please add signature to the canvas."),void Y(!1);var l=me.current.getTrimmedCanvas().toDataURL("image/png"),t=new FormData;t.append("package_id",null===Oe||void 0===Oe||null===(e=Oe.package)||void 0===e?void 0:e.id),t.append("receiver_signature_image",Object(g.a)(l,"signature"+(null===Oe||void 0===Oe||null===(a=Oe.package)||void 0===a?void 0:a.receiver_name))),t.append("receiver_signature_name",null===Oe||void 0===Oe||null===(c=Oe.package)||void 0===c?void 0:c.receiver_name),Object(m.o)(t).then((function(e){h.i.success("Package delivered successfully"),J(!1),Ne(),Y(!1),fe()})).catch((function(e){h.i.fail("Someting went wrong. please try again"),Y(!1)}))}}),Object(k.jsx)(N.a,{cancelReasonModal:oe,setCancelReasonModal:de,cancelSubmit:function(e){e.preventDefault();var a=new FormData(e.target);a.append("package_id",he),ve(!0),Object(m.n)(a).then((function(e){h.i.success(e.data.message),de(!1),fe(),ve(!1)})).catch((function(e){var a;Object.entries(null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.errors).map((function(e){h.i.info(e[1][0])})),ve(!1)}))},radio:ee,handleRadio:function(e){ae(e.target.value)},cancelReason:te,loading:pe})]})}}}]);
//# sourceMappingURL=22.fc24853f.chunk.js.map