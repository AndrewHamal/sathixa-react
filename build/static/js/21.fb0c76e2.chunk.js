(this["webpackJsonpsathixa-react"]=this["webpackJsonpsathixa-react"]||[]).push([[21],{654:function(e,t,c){},670:function(e,t,c){"use strict";var a=c(0),s={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2a15.99 15.99 0 00-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-.9 3.7-.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 .7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z"}}]},name:"send",theme:"outlined"},n=c(17),i=function(e,t){return a.createElement(n.a,Object.assign({},e,{ref:t,icon:s}))};i.displayName="SendOutlined";t.a=a.forwardRef(i)},682:function(e,t,c){"use strict";c.r(t);var a=c(21),s=c(31),n=c(0),i=c(279),l=c(478),r=c(171),o=c(57),d=c(670),j=c(97),u=(c(280),c(173)),h=c(63),b=c.n(h),m=(c(654),c(477)),f=c(65),x=c(1),p=r.a.Content;t.default=function(){var e,t,c=Object(s.g)(),h=Object(s.i)().id,O=Object(n.useRef)(),v=Object(n.useState)(null),g=Object(a.a)(v,2),y=g[0],N=g[1],k=Object(n.useState)(!0),w=Object(a.a)(k,2),S=w[0],T=w[1],z=Object(n.useState)(null),_=Object(a.a)(z,2),B=_[0],q=_[1],L=Object(x.jsx)(f.a,{style:{fontSize:18},spin:!0}),A=Object(n.useState)(!1),I=Object(a.a)(A,2),M=I[0],C=I[1],D={broadcaster:"pusher",key:"f1420c508647e4f94ca3",cluster:"ap2",wsHost:"socket.sathichha.com",wsPort:443,forceTLS:!0,disableStats:!0,enabledTransports:["ws","wss"],authorizer:function(e,t){return{authorize:function(t,c){b()({method:"POST",url:"".concat("https://api.sathichha.com/","api/vendor/broadcasting/auth"),headers:{Authorization:"Bearer ".concat(localStorage.getItem("_token"))},data:{socket_id:t,channel_name:e.name}}).then((function(e){c(!1,e.data)})).catch((function(e){c(!0,e)}))}}}},E=new u.a(D),F=function(){O.current.scrollIntoView()},J=function(){Object(j.q)(h).then((function(e){N(e.data),T(!1),F()}))};Object(n.useEffect)((function(){Object(j.p)(h).then((function(e){q(null===e||void 0===e?void 0:e.data),J()})),E.channel("ticket.".concat(h)).listen(".tickets",(function(e){J(),C(!1)}))}),[]);return S?Object(x.jsxs)(p,{className:"site-layout",style:{padding:"0 14px",marginTop:60},children:[" ",Object(x.jsx)(i.a,{active:!0})]}):Object(x.jsxs)(r.a,{children:[Object(x.jsx)(l.a,{style:{position:"fixed",zIndex:1,width:"100%"},className:"site-page-header bg-red ",title:"Ticket Message",onBack:function(){return c.goBack()}}),Object(x.jsx)(p,{className:"site-layout",style:{height:"-webkit-fill-available!important",paddingTop:54,paddingBottom:54},children:Object(x.jsxs)("div",{className:"site-layout-background",children:[Object(x.jsxs)("div",{className:"chat-screen px-3",children:[Object(x.jsxs)("div",{className:"d-flex justify-content flex-column mt-3 mb-4 ",children:[Object(x.jsx)("p",{className:"font-14 font-weight-600 pt-2 text-center text-capitalize",children:null===B||void 0===B?void 0:B.message}),Object(x.jsxs)("p",{className:"font-10 text-center",children:["Ticket status: ",0==B.status?Object(x.jsx)("span",{className:"text-success",children:"Active"}):Object(x.jsx)("span",{className:"text-danger",children:"Closed"})]})]}),(null===B||void 0===B||null===(e=B.ticket_file)||void 0===e?void 0:e.length)?Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("p",{className:"mb-2",children:"Attachments"}),Object(x.jsx)("div",{className:"row",children:null===B||void 0===B||null===(t=B.ticket_file)||void 0===t?void 0:t.map((function(e,t){return Object(x.jsx)("div",{className:"col-4 p-3 text-center bg-white",children:Object(x.jsx)("img",{src:e.url,alt:"d",className:"img-fluid"})},t)}))})]}):" ",y.map((function(e,t){return Object(x.jsx)("div",{children:null===e.vendor_id?Object(x.jsx)("div",{className:"send my-3 ml-auto",children:Object(x.jsx)("p",{children:e.message})}):Object(x.jsx)("div",{className:"recieve my-3",children:Object(x.jsx)("p",{children:e.message})})},t)})),M?Object(x.jsx)("div",{style:{float:"left",clear:"both"},children:Object(x.jsx)(m.a,{indicator:L})}):"",Object(x.jsx)("div",{style:{float:"left",clear:"both"},ref:O})]}),Object(x.jsx)("div",{className:"chat-bg position-fixed py-2 px-3",children:Object(x.jsxs)("form",{onSubmit:function(e){e.preventDefault(),F(),C(!0);var t=new FormData(e.target);t.append("ticket_id",h),Object(j.l)(h,t).then((function(e){F(),document.querySelector("textarea").value="",document.querySelector("#form").reset()}))},className:"d-flex",id:"form",children:[Object(x.jsx)("textarea",{rows:1,name:"message",placeholder:"Type your message here",required:!0}),Object(x.jsx)(o.a,{htmlType:"submit",type:"primary",shape:"circle",icon:Object(x.jsx)(d.a,{}),className:"ml-2 my-auto"})]})})]})})]})}}}]);
//# sourceMappingURL=21.fb0c76e2.chunk.js.map