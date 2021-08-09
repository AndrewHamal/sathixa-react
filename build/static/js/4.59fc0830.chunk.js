(this["webpackJsonpsathixa-react"]=this["webpackJsonpsathixa-react"]||[]).push([[4],{502:function(e,t,n){"use strict";var a=n(482);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.responsiveMap=t.responsiveArray=void 0;var r=a(n(485)),c=a(n(483));t.responsiveArray=["xxl","xl","lg","md","sm","xs"];var i={xs:"(max-width: 575px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)",xxl:"(min-width: 1600px)"};t.responsiveMap=i;var s=new Map,o=-1,l={},u={matchHandlers:{},dispatch:function(e){return l=e,s.forEach((function(e){return e(l)})),s.size>=1},subscribe:function(e){return s.size||this.register(),o+=1,s.set(o,e),e(l),o},unsubscribe:function(e){s.delete(e),s.size||this.unregister()},unregister:function(){var e=this;Object.keys(i).forEach((function(t){var n=i[t],a=e.matchHandlers[n];null===a||void 0===a||a.mql.removeListener(null===a||void 0===a?void 0:a.listener)})),s.clear()},register:function(){var e=this;Object.keys(i).forEach((function(t){var n=i[t],a=function(n){var a=n.matches;e.dispatch((0,c.default)((0,c.default)({},l),(0,r.default)({},t,a)))},s=window.matchMedia(n);s.addListener(a),e.matchHandlers[n]={mql:s,listener:a},a(s)}))}};t.default=u},509:function(e,t,n){"use strict";var a=n(482),r=n(204);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n(483)),i=a(n(485)),s=a(n(204)),o=a(n(489)),l=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==r(e)&&"function"!==typeof e)return{default:e};var n=b(t);if(n&&n.has(e))return n.get(e);var a={},c=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if("default"!==i&&Object.prototype.hasOwnProperty.call(e,i)){var s=c?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(a,i,s):a[i]=e[i]}a.default=e,n&&n.set(e,a);return a}(n(0)),u=a(n(2)),d=a(n(54)),f=n(510),p=n(487),m=a(n(503)),j=n(502),h=a(n(515)),v=a(n(516));function b(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(b=function(e){return e?n:t})(e)}var O=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},x=function(e,t){var n,a,r=l.useContext(v.default),b=l.useState(1),x=(0,o.default)(b,2),g=x[0],y=x[1],w=l.useState(!1),N=(0,o.default)(w,2),_=N[0],S=N[1],P=l.useState(!0),E=(0,o.default)(P,2),k=E[0],M=E[1],z=l.useRef(),I=l.useRef(),T=(0,f.composeRef)(t,z),C=l.useContext(p.ConfigContext).getPrefixCls,R=function(){if(I.current&&z.current){var t=I.current.offsetWidth,n=z.current.offsetWidth;if(0!==t&&0!==n){var a=e.gap,r=void 0===a?4:a;2*r<n&&y(n-2*r<t?(n-2*r)/t:1)}}};l.useEffect((function(){S(!0)}),[]),l.useEffect((function(){M(!0),y(1)}),[e.src]),l.useEffect((function(){R()}),[e.gap]);var A=e.prefixCls,D=e.shape,W=e.size,q=e.src,H=e.srcSet,L=e.icon,B=e.className,V=e.alt,F=e.draggable,J=e.children,G=O(e,["prefixCls","shape","size","src","srcSet","icon","className","alt","draggable","children"]),K="default"===W?r:W,U=(0,h.default)(),X=l.useMemo((function(){if("object"!==(0,s.default)(K))return{};var e=j.responsiveArray.find((function(e){return U[e]})),t=K[e];return t?{width:t,height:t,lineHeight:"".concat(t,"px"),fontSize:L?t/2:18}:{}}),[U,K]);(0,m.default)(!("string"===typeof L&&L.length>2),"Avatar","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(L,"` at https://ant.design/components/icon"));var Q,Y=C("avatar",A),Z=(0,u.default)((n={},(0,i.default)(n,"".concat(Y,"-lg"),"large"===K),(0,i.default)(n,"".concat(Y,"-sm"),"small"===K),n)),$=l.isValidElement(q),ee=(0,u.default)(Y,Z,(a={},(0,i.default)(a,"".concat(Y,"-").concat(D),!!D),(0,i.default)(a,"".concat(Y,"-image"),$||q&&k),(0,i.default)(a,"".concat(Y,"-icon"),!!L),a),B),te="number"===typeof K?{width:K,height:K,lineHeight:"".concat(K,"px"),fontSize:L?K/2:18}:{};if("string"===typeof q&&k)Q=l.createElement("img",{src:q,draggable:F,srcSet:H,onError:function(){var t=e.onError;!1!==(t?t():void 0)&&M(!1)},alt:V});else if($)Q=q;else if(L)Q=L;else if(_||1!==g){var ne="scale(".concat(g,") translateX(-50%)"),ae={msTransform:ne,WebkitTransform:ne,transform:ne},re="number"===typeof K?{lineHeight:"".concat(K,"px")}:{};Q=l.createElement(d.default,{onResize:R},l.createElement("span",{className:"".concat(Y,"-string"),ref:function(e){I.current=e},style:(0,c.default)((0,c.default)({},re),ae)},J))}else Q=l.createElement("span",{className:"".concat(Y,"-string"),style:{opacity:0},ref:function(e){I.current=e}},J);return delete G.onError,delete G.gap,l.createElement("span",(0,c.default)({},G,{style:(0,c.default)((0,c.default)((0,c.default)({},te),X),G.style),className:ee,ref:T}),Q)},g=l.forwardRef(x);g.displayName="Avatar",g.defaultProps={shape:"circle",size:"default"};var y=g;t.default=y},510:function(e,t,n){"use strict";var a=n(482);Object.defineProperty(t,"__esModule",{value:!0}),t.fillRef=i,t.composeRef=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){t.forEach((function(t){i(t,e)}))}},t.supportRef=function(e){var t,n,a=(0,c.isMemo)(e)?e.type.type:e.type;if("function"===typeof a&&!(null===(t=a.prototype)||void 0===t?void 0:t.render))return!1;if("function"===typeof e&&!(null===(n=e.prototype)||void 0===n?void 0:n.render))return!1;return!0};var r=a(n(204)),c=n(82);function i(e,t){"function"===typeof e?e(t):"object"===(0,r.default)(e)&&e&&"current"in e&&(e.current=t)}},515:function(e,t,n){"use strict";var a=n(482);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(489)),c=n(0),i=a(n(502));var s=function(){var e=(0,c.useState)({}),t=(0,r.default)(e,2),n=t[0],a=t[1];return(0,c.useEffect)((function(){var e=i.default.subscribe((function(e){a(e)}));return function(){return i.default.unsubscribe(e)}}),[]),n};t.default=s},516:function(e,t,n){"use strict";var a=n(204);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.SizeContextProvider=void 0;var r=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!==typeof e)return{default:e};var n=c(t);if(n&&n.has(e))return n.get(e);var r={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if("default"!==s&&Object.prototype.hasOwnProperty.call(e,s)){var o=i?Object.getOwnPropertyDescriptor(e,s):null;o&&(o.get||o.set)?Object.defineProperty(r,s,o):r[s]=e[s]}r.default=e,n&&n.set(e,r);return r}(n(0));function c(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(c=function(e){return e?n:t})(e)}var i=r.createContext("default");t.SizeContextProvider=function(e){var t=e.children,n=e.size;return r.createElement(i.Consumer,null,(function(e){return r.createElement(i.Provider,{value:n||e},t)}))};var s=i;t.default=s},670:function(e,t,n){"use strict";var a=n(0),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2a15.99 15.99 0 00-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-.9 3.7-.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 .7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z"}}]},name:"send",theme:"outlined"},c=n(17),i=function(e,t){return a.createElement(c.a,Object.assign({},e,{ref:t,icon:r}))};i.displayName="SendOutlined";t.a=a.forwardRef(i)},683:function(e,t,n){"use strict";n.r(t);var a=n(21),r=n(31),c=n(32),i=n(0),s=n(279),o=n(478),l=n(117),u=n(171),d=n(57),f=n(670),p=n(97),m=n(118),j=n(51),h=n(43),v=n(35),b=(n(280),n(173)),O=n(63),x=n.n(O),g=n(509),y=n.n(g),w=n(477),N=n(65),_=n(1),S=u.a.Content;t.default=function(){var e,t,n,O=Object(r.g)(),g=Object(r.i)().id,P=Object(i.useRef)(),E=Object(i.useRef)(),k=Object(v.c)(j.m),M=Object(v.c)(h.d),z=Object(v.c)(h.c),I=Object(v.c)(j.g),T=Object(i.useState)(null),C=Object(a.a)(T,2),R=C[0],A=C[1],D=Object(i.useState)(!0),W=Object(a.a)(D,2),q=W[0],H=W[1],L=Object(i.useState)(!1),B=Object(a.a)(L,2),V=B[0],F=B[1],J=Object(i.useState)(!1),G=Object(a.a)(J,2),K=G[0],U=G[1],X=Object(_.jsx)(N.a,{style:{fontSize:18},spin:!0}),Q={broadcaster:"pusher",key:"f1420c508647e4f94ca3",cluster:"ap2",wsHost:"socket.sathichha.com",wsPort:443,forceTLS:!0,disableStats:!0,enabledTransports:["ws","wss"],authorizer:function(e,t){return{authorize:function(t,n){k?x()({method:"POST",url:"".concat("https://api.sathichha.com/","api/vendor/broadcasting/auth"),headers:{Authorization:"Bearer ".concat(localStorage.getItem("_token"))},data:{socket_id:t,channel_name:e.name}}).then((function(e){n(!1,e.data)})).catch((function(e){n(!0,e)})):x()({method:"POST",url:"".concat("https://api.sathichha.com/","api/rider/broadcasting/auth"),headers:{Authorization:"Bearer ".concat(localStorage.getItem("_riderToken"))},data:{socket_id:t,channel_name:e.name}}).then((function(e){n(!1,e.data)})).catch((function(e){n(!0,e)}))}}}},Y=new b.a(Q),Z=function(){var e,t;k?null===E||void 0===E||null===(e=E.current)||void 0===e||e.scrollIntoView():null===P||void 0===P||null===(t=P.current)||void 0===t||t.scrollIntoView()},$=function(){k&&Object(p.b)(g).then((function(e){A(e.data),H(!1),Object(p.j)(g).then((function(e){})),Z()})),M&&Object(m.e)(g).then((function(e){A(e.data),H(!1),Z(),Object(m.p)(g).then((function(e){}))}))};Object(i.useEffect)((function(){Y.join("chat.".concat(g)).listen(".chat-listen",(function(e){$(),U(!1),F(!1)})).listenForWhisper("typings",(function(e){var t,n;(F(e),k)?null===E||void 0===E||null===(t=E.current)||void 0===t||t.scrollIntoView():null===P||void 0===P||null===(n=P.current)||void 0===n||n.scrollIntoView()})),$()}),[]);return q?Object(_.jsxs)(S,{className:"site-layout",style:{padding:"0 14px",marginTop:60},children:[" ",Object(_.jsx)(s.a,{active:!0})]}):Object(_.jsxs)(u.a,{children:[Object(_.jsx)(o.a,{style:{position:"fixed",zIndex:1,width:"100%"},className:"site-page-header bg-red ",title:"Chat",onBack:function(){return O.goBack()}}),Object(_.jsx)(S,{className:"site-layout",style:{height:"-webkit-fill-available!important",paddingTop:54,paddingBottom:54},children:Object(_.jsxs)("div",{className:"site-layout-background",children:[Object(_.jsxs)("div",{className:"chat-screen px-3",children:[k?Object(_.jsx)(c.b,{to:"/Delivery",children:Object(_.jsxs)("div",{className:"d-flex justify-content flex-column mt-4 mb-4",children:[Object(_.jsx)(y.a,{size:"large",className:"ticket-img mx-auto rounded-circle",children:null===I||void 0===I||null===(e=I.first_name)||void 0===e?void 0:e.charAt(0)}),Object(_.jsxs)("p",{className:"font-14 font-weight-600 pt-2 text-center",children:[null===I||void 0===I?void 0:I.first_name," ",null===I||void 0===I?void 0:I.last_name]}),Object(_.jsx)("p",{className:"message-time text-center py-1 f-w-600",children:null===I||void 0===I||null===(t=I.location)||void 0===t?void 0:t.whole_address}),Object(_.jsxs)("p",{className:"message-time text-center",children:["+977 ",null===I||void 0===I?void 0:I.phone]})]})}):Object(_.jsx)(c.b,{to:"/Delivery",children:Object(_.jsxs)("div",{className:"d-flex justify-content flex-column mt-5 mb-4",children:[Object(_.jsx)(y.a,{size:"large",className:"ticket-img mx-auto rounded-circle",children:null===z||void 0===z||null===(n=z.first_name)||void 0===n?void 0:n.charAt(0)}),Object(_.jsxs)("p",{className:"font-14 font-weight-600 pt-2 text-center",children:[null===z||void 0===z?void 0:z.first_name," ",null===z||void 0===z?void 0:z.last_name]}),Object(_.jsxs)("p",{className:"message-time text-center py-1 f-w-600",children:[Object(_.jsx)("i",{className:"fa fa-certificate text-success"})," Verified"]}),Object(_.jsxs)("p",{className:"message-time text-center",children:["+977 ",null===z||void 0===z?void 0:z.phone]})]})}),R.map((function(e,t){return Object(_.jsx)("div",{children:k?null===e.vendor_id?Object(_.jsx)("div",{className:"send my-3 ml-auto",children:Object(_.jsx)("p",{children:e.message})}):Object(_.jsx)("div",{className:"recieve my-3",children:Object(_.jsx)("p",{children:e.message})}):null===e.rider_id?Object(_.jsx)("div",{className:"send my-3 ml-auto",children:Object(_.jsx)("p",{children:e.message})}):Object(_.jsx)("div",{className:"recieve my-3",children:Object(_.jsx)("p",{children:e.message})})},t)})),0===R.length?Object(_.jsx)(l.a,{image:l.a.PRESENTED_IMAGE_SIMPLE}):k?V&&"is_vendor"!==V.type?Object(_.jsx)("div",{className:"my-3",children:Object(_.jsx)("div",{className:"chat-bubble",children:Object(_.jsxs)("div",{className:"typing",children:[Object(_.jsx)("div",{className:"dot"}),Object(_.jsx)("div",{className:"dot"}),Object(_.jsx)("div",{className:"dot"})]})})}):"":V&&"is_rider"!==V.type?Object(_.jsx)("div",{className:"my-3",children:Object(_.jsx)("div",{className:"chat-bubble",children:Object(_.jsxs)("div",{className:"typing",children:[Object(_.jsx)("div",{className:"dot"}),Object(_.jsx)("div",{className:"dot"}),Object(_.jsx)("div",{className:"dot"})]})})}):"",k?Object(_.jsx)("div",{style:{float:"left",clear:"both"},ref:E}):Object(_.jsx)("div",{style:{float:"left",clear:"both"},ref:P}),K?Object(_.jsx)("div",{style:{float:"left",clear:"both"},children:Object(_.jsx)(w.a,{indicator:X})}):""]}),Object(_.jsx)("div",{className:"chat-bg position-fixed py-2 px-3",children:Object(_.jsxs)("form",{onSubmit:function(e){e.preventDefault(),U(!0);var t=new FormData(e.target);t.append("package_id",g),k?Object(p.k)(t).then((function(e){document.querySelector("textarea").value="",document.querySelector("#form").reset()})):Object(m.q)(t).then((function(e){document.querySelector("textarea").value="",document.querySelector("#form").reset()}))},className:"d-flex",id:"form",children:[Object(_.jsx)("textarea",{rows:1,name:"message",placeholder:"Type your message here",onKeyUp:function(){k?setTimeout((function(){Y.join("chat.".concat(g)).whisper("typings",{userId:localStorage.getItem("_vendorID"),type:"is_vendor",typing:!0})}),300):setTimeout((function(){Y.join("chat.".concat(g)).whisper("typings",{userId:localStorage.getItem("_riderID"),type:"is_rider",typing:!0})}),300)},required:!0}),Object(_.jsx)(d.a,{htmlType:"submit",type:"primary",shape:"circle",icon:Object(_.jsx)(f.a,{}),className:"ml-2 my-auto"})]})})]})})]})}}}]);
//# sourceMappingURL=4.59fc0830.chunk.js.map