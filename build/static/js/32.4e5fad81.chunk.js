(this.webpackJsonphister=this.webpackJsonphister||[]).push([[32],{1516:function(e,t,n){"use strict";var r=n(4),o=(n(2),n(51)),c=n(656),a=n(226),i=n(1364),u=n(1358),s=n(1484),l=n(1490),d=n(97),b=n.n(d),j=n(1378),m=n(61),h=n(7),f=n(1467),p=n(873),x=n(1),O=function(e){var t=e.isAppDrawerOpen,n=e.sidebarContent,r=Object(o.d)();return Object(x.jsx)(u.a,{direction:"right",in:!0,mountOnEnter:!0,unmountOnExit:!0,children:Object(x.jsxs)(a.a,{sx:{height:"100%",width:{lg:280}},children:[Object(x.jsx)(s.a,{lgUp:!0,children:Object(x.jsx)(f.a,{open:t,onClose:function(){return r(Object(m.r)())},sx:Object(h.a)({position:"absolute"},"& .".concat(p.a.paper),{width:280,"& .listItem":{zIndex:1305}}),children:n})}),Object(x.jsx)(s.a,{lgDown:!0,children:Object(x.jsx)(j.a,{style:{height:"100%"},children:n})})]})})},g=n(45),v=n(14),N=n(20),C=["children","navStyle","footer"],z=function(e,t){return e===v.g.BIT_BUCKET?t>=1200?0:70:t>=600?70:56},w=function(e){var t=e.children,n=e.navStyle,o=e.footer,c=Object(N.a)(e,C);return Object(x.jsx)(a.a,Object(r.a)(Object(r.a)({sx:{display:"flex",height:{xs:"calc(100vh - ".concat(87+z(n,0)+(o?47:0),"px) !important"),sm:"calc(100vh - ".concat(87+z(n,600)+(o?47:0),"px) !important"),md:"calc(100vh - ".concat(107+z(n,900)+(o?47:0),"px) !important"),lg:"calc(100vh - ".concat(100+z(n,1200)+(o?47:0),"px) !important"),xl:"calc(100vh - ".concat(140+z(n,1536)+(o?57:0),"px) !important")}}},c),{},{children:t}))},y=function(e){var t=Object(o.d)(),n=Object(o.e)((function(e){return e.common.isAppDrawerOpen})),d=Object(g.c)().footer,h=Object(g.c)().navStyle,f=e.title,p=e.sidebarContent,N=e.fullView,C=e.children;return Object(x.jsxs)(a.a,{sx:Object(r.a)({flex:1,display:"flex",flexDirection:"column",overflow:"hidden",margin:-4,padding:4},e.sxStyle),children:[Object(x.jsxs)(a.a,{sx:{marginTop:N?0:-4,display:"flex",alignItems:"center",mb:{xs:N?4:2,lg:4},mt:{xs:N?0:-4,lg:0}},children:[N?null:Object(x.jsx)(s.a,{lgUp:!0,children:Object(x.jsx)(l.a,{edge:"start",sx:{marginRight:function(e){return e.spacing(2)}},color:"inherit","aria-label":"open drawer",onClick:function(){return t(Object(m.r)())},size:"large",children:Object(x.jsx)(b.a,{sx:{width:35,height:35}})})}),Object(x.jsx)(i.a,{in:!0,style:{transitionDelay:"300ms"},children:Object(x.jsx)(a.a,{component:"h2",variant:"h2",sx:{fontSize:16,color:"text.primary",fontWeight:v.a.SEMI_BOLD},children:f})})]}),Object(x.jsxs)(w,{navStyle:h,footer:d,children:[p?Object(x.jsx)(O,{isAppDrawerOpen:n,footer:d,fullView:N,navStyle:h,sidebarContent:p}):null,Object(x.jsxs)(a.a,{sx:{display:"flex",flexDirection:"column",width:{xs:"100%",lg:"calc(100% - ".concat(N?0:280,"px)")},pl:{lg:e.fullView?0:8}},children:[Object(x.jsx)(u.a,{direction:"left",in:!0,mountOnEnter:!0,unmountOnExit:!0,children:Object(x.jsx)(j.a,{style:Object(r.a)({height:"100%",display:"flex",flexDirection:"column",position:"relative"},e.cardStyle),children:C})}),Object(x.jsx)(c.a,{})]})]})]})};t.a=y;y.defaultProps={title:""}},1518:function(e,t,n){"use strict";var r=n(4),o=n(20),c=(n(2),n(1529)),a=n(17),i=n(14),u=n(1),s=["children"],l=Object(a.a)(c.a)((function(e){var t=e.theme;return{"& th":{fontSize:14,padding:8,fontWeight:i.a.MEDIUM,color:t.palette.text.primary,"&:first-of-type":{paddingLeft:20},"&:last-of-type":{paddingRight:20}}}}));t.a=function(e){var t=e.children,n=Object(o.a)(e,s);return Object(u.jsx)(l,Object(r.a)(Object(r.a)({},n),{},{children:t}))}},1519:function(e,t,n){"use strict";n(2);var r=n(226),o=n(1),c=function(e){var t=e.children;return Object(o.jsx)(r.a,{sx:{height:60,display:"flex",alignItems:"center",borderBottom:function(e){return"1px solid ".concat(e.palette.divider)},padding:{xs:"4px 10px",xl:"12px 10px"}},className:"apps-header",children:t})};t.a=c,c.defaultProps={}},1623:function(e,t,n){"use strict";var r=n(2),o=n.n(r),c=n(226),a=n(902),i=n(327),u=n(1373),s=n(44),l=n(14),d=n(1),b=function(e){var t=e.loader,n=e.placeholder,r=e.loading,s=e.title,b=e.actionTitle,j=e.content,m=e.onClick;return r||t?Object(d.jsx)(o.a.Fragment,{children:n||Object(d.jsxs)(c.a,{sx:{flexDirection:"row",minHeight:"450px",height:"100%",flex:1,display:"flex",p:5,justifyContent:"center",alignItems:"center",borderColor:"transparent",borderRadius:"4px",textAlign:"center"},children:[Object(d.jsx)(a.a,{size:16}),Object(d.jsx)(c.a,{component:"span",sx:{ml:2},children:"Loading..."})]})}):Object(d.jsxs)(c.a,{sx:{flexDirection:"column",minHeight:"450px",height:"100%",flex:1,display:"flex",p:5,justifyContent:"center",alignItems:"center",border:1,borderColor:"transparent",borderRadius:"4px",textAlign:"center"},children:[s?Object(d.jsx)(i.a,{sx:{fontSize:14,color:function(e){return e.palette.text.secondary},fontWeight:l.a.MEDIUM,mb:2},component:"h4",variant:"h4",children:s}):null,Object(d.jsx)(i.a,{sx:{fontSize:14,color:function(e){return e.palette.text.secondary}},children:j}),b?Object(d.jsx)(u.a,{color:"primary",variant:"contained",style:{mt:7.5,height:45,minWidth:150},onClick:m,children:b}):null]})};t.a=b,b.defaultProps={title:Object(d.jsx)(s.a,{id:"common.noRecordFound"})}},1625:function(e,t,n){"use strict";var r=n(1714),o=n(906),c=n(1359),a=n(1378),i=n(1380),u=n(1375),s=n(1371),l=n(1373),d=n(1491),b=n(1642),j=n(1587),m=n(1);t.a=function(e){var t,n,h,f,p,x,O,g,v,N,C,z,w=e.isEdit,y=e.getProductForAddReport,k=e.formik,S=e.showSize,F=e.showOkCanc,E=e.addDamaged,I=e.showColor,D=e.loadingGetProduct,P=e.onClose,A=e.open;return Object(m.jsx)(o.a,{open:A,onClose:function(){return P()},children:Object(m.jsx)(c.a,{in:A,children:Object(m.jsx)("form",{onSubmit:k.handleSubmit,children:Object(m.jsx)(a.a,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"60%",p:4},children:Object(m.jsxs)(i.a,{children:[Object(m.jsx)(u.a,{container:!0,spacing:4,m:2,children:"Report Damaged product"}),Object(m.jsxs)(u.a,{container:!0,item:!0,xs:12,spacing:4,textAlign:"start",children:[Object(m.jsx)(u.a,{item:!0,xs:12,lg:6,textAlign:"start",children:Object(m.jsx)(s.a,{name:"productId",type:"text",required:!0,label:"Product Id",variant:"outlined",disabled:!(!k.values.productId&&!w),value:k.values.productId,onChange:k.handleChange,error:null===(t=k.errors)||void 0===t?void 0:t.productId,helperText:null!==(n=k.errors)&&void 0!==n&&n.productId?k.errors.productId.toString():""})}),Object(m.jsx)(u.a,{item:!0,xs:12,lg:6,textAlign:"start",children:Object(m.jsx)(s.a,{required:!0,type:"number",label:"Count",variant:"outlined",name:"count",value:k.values.count,onChange:k.handleChange,error:null===(h=k.errors)||void 0===h?void 0:h.count,helperText:null!==(f=k.errors)&&void 0!==f&&f.count?k.errors.count:""})}),Object(m.jsx)(u.a,{item:!0,xs:12,textAlign:"start",children:D?Object(m.jsx)(r.a,{loading:!0,variant:"outlined",children:"hi"}):Object(m.jsx)(l.a,{variant:"contained",onClick:function(){y()},children:"Create Report"})}),Object(m.jsx)(u.a,{item:!0,xs:12,lg:6,textAlign:"start",children:Object(m.jsx)(d.a,{in:I,children:Object(m.jsx)(s.a,{fullwidth:!0,required:I,label:"Color",variant:"outlined",disabled:!!w,name:"color",value:k.values.color,onChange:k.handleChange,error:!(null===(p=k.errors)||void 0===p||!p.color)&&(null===(x=k.errors)||void 0===x?void 0:x.color),helperText:null!==(O=k.errors)&&void 0!==O&&O.color?k.errors.color:""})})}),Object(m.jsx)(u.a,{item:!0,xs:12,lg:6,children:Object(m.jsx)(d.a,{in:S,children:Object(m.jsx)(s.a,{fullwidth:!0,label:"Size",disabled:!!w,variant:"outlined",required:S,name:"size",value:null===(g=k.values)||void 0===g?void 0:g.size,onChange:k.handleChange,error:!(null===(v=k.errors)||void 0===v||!v.size)&&(null===(N=k.errors)||void 0===N?void 0:N.size),helperText:null!==(C=k.errors)&&void 0!==C&&C.size?k.errors.size:""})})}),Object(m.jsx)(u.a,{item:!0,xs:12,textAlign:"start",children:Object(m.jsx)(b.a,{name:"isFromOrder",control:Object(m.jsx)(j.a,{disabled:!!w,checked:null===(z=k.values)||void 0===z?void 0:z.isFromOrder,onChange:k.handleChange}),label:"This report from order"})}),Object(m.jsx)(d.a,{in:F,children:Object(m.jsxs)(u.a,{item:!0,container:!0,xs:12,spacing:5,children:[Object(m.jsx)(u.a,{item:!0,xs:12,lg:6,children:Object(m.jsx)(l.a,{variant:"contained",color:"warning",onClick:function(){P()},children:"Canceled"})}),Object(m.jsx)(u.a,{item:!0,x:12,lg:6,children:E?Object(m.jsx)(r.a,{loading:!0,variant:"outlined",children:"hi"}):Object(m.jsx)(l.a,{type:"submit",variant:"contained",children:w?"Edit":"Okay"})})]})})]})]})})})})})}},1690:function(e,t,n){"use strict";var r=n(4),o=n(10),c=n(15),a=n(3),i=n.n(a),u=n(47),s=n(41),l=n(227),d=n(2),b=n(244),j=n(1625),m=n(1);t.a=function(e){var t=e.open,n=e.onClose,a=e.productId,h=Object(d.useState)(!1),f=Object(c.a)(h,2),p=f[0],x=f[1],O=Object(d.useState)(!1),g=Object(c.a)(O,2),v=g[0],N=g[1],C=Object(d.useState)(!1),z=Object(c.a)(C,2),w=z[0],y=z[1],k=Object(d.useState)(!1),S=Object(c.a)(k,2),F=S[0],E=S[1],I=Object(d.useState)(!1),D=Object(c.a)(I,2),P=D[0],A=D[1],T=Object(d.useState)(),_=Object(c.a)(T,2),R=_[0],q=_[1],V=Object(l.d)({initialValues:{productId:a||"",color:"",size:"",count:"",isFromOrder:!1},validationSchema:b.c().shape({productId:b.e().required("Not a product name"),color:b.e(),count:b.b().required("Not a count"),size:b.e(),isFromOrder:b.a()}),onSubmit:function(){var e=Object(o.a)(i.a.mark((function e(t){var c,a,s,l,d;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,E(!0),c={auther:u.l.auth().currentUser.displayName,color:t.color?t.color:"",count:t.count,productId:t.productId,size:t.size?t.size:"",time:Date.now(),thisReportFromOrder:t.isFromOrder},a=u.l.firestore().collection("products").doc(R.id+""),e.next=6,u.l.firestore().collection("databaseCount").doc("damagedProduct").get();case 6:return s=e.sent,l=s.data().count+1,d=s.data().sum+V.values.count,e.next=11,u.l.firestore().collection("databaseCount").doc("damagedProduct").update({count:l,sum:d});case 11:return e.next=13,u.l.firestore().runTransaction(function(){var e=Object(o.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.get(a).then(function(){var e=Object(o.a)(i.a.mark((function e(n){var o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.exists){e.next=2;break}throw"Document does not exist!";case 2:if(console.log(n.data()),B(n.data())){e.next=6;break}throw new Error("validationError");case 6:return o=U(n.data()),e.next=9,u.l.firestore().collection("damaged_product").add(c);case 9:t.update(a,Object(r.a)({},o));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(){return console.log("Transaction successfully committed!"),n(),V.setValues({productId:"",color:"",size:"",count:"",isFromOrder:!1}),!0})).catch((function(e){return console.log("Transaction failed: ",e),!1}));case 13:E(!1),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(0),E(!1),console.log(e.t0);case 20:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(t){return e.apply(this,arguments)}}()}),U=function(e){var t=V.values,n=e;return t.isFromOrder?n.sold=n.sold-Number(t.count):(p&&!v&&n.variants.map((function(e,r){e.color_name==t.color&&(n.variants[r].count=Number(e.count)-Number(t.count))})),!p&&v&&n.variants[0].size.map((function(e,r){e.name==t.size&&(n.variants[0].size[r].count=Number(e.count)-Number(t.count))})),p&&v&&n.variants.map((function(e,r){e.color_name==t.color&&e.size.map((function(e,o){e.name==t.size&&(n.variants[r].size[o].count=Number(e.count)-Number(t.count))}))})),n.stock=n.stock-Number(t.count)),n.damegdCouont=n.damegdCouont+Number(t.count),n},B=function(e){console.log(e);var t=V.values;if(0>Number(t.count)&&V.setFieldError("count","can not be minas "),e.stock<t.count)return V.setFieldError("count","the number in the stock is "+e.stock),!1;if((e.sold<=0||t.count>e.sold)&&t.isFromOrder)return V.setFieldError("count","the sold products are less than"+t.count),!1;if(p){if(!t.color)return V.setFieldError("color","this field is requerid"),!1;var n=e.variants.filter((function(e){return t.color===e.color_name}))[0];if(!n)return V.setFieldError("color","no such color name"),!1;if(n.count&&t.count>n.count)return V.setFieldError("count","the number in the stock is "+n.count),!1}if(v){if(!t.size)return V.setFieldError("size","this field is requerid"),!1;var r=e.variants.filter((function(e){return t.color===e.color_name||"default"===e.color_name}))[0];if(!r)return V.setFieldError("color","no such color name"),!1;var o=r.size.filter((function(e){return t.size===e.name}))[0];if(!o)return V.setFieldError("size","the size not in the stock"),!1;if(o&&t.count>o.count)return V.setFieldError("count","the number in the stock is "+o.count),!1}return!0};return Object(d.useEffect)((function(){y(!1),x(!1),N(!1),V.setFieldValue("color",""),V.setFieldValue("size","")}),[V.values.productId]),Object(d.useEffect)((function(){return function(){V.resetForm(),V.handleReset()}}),[]),Object(m.jsx)(j.a,{open:t,loadingGetProduct:P,onClose:n,showColor:p,addDamaged:F,formik:V,showOkCanc:w,showSize:v,getProductForAddReport:function(){A(!0),s.a.get("/api/ecommerce/get",{params:{id:V.values.productId}}).then((function(e){var t,n,r;q(e.data),(null===(t=e.data.variants)||void 0===t?void 0:t.length)>0&&"default"!==e.data.variants[0].color_name?x(!0):x(!1),(null===(n=e.data.variants[0])||void 0===n||null===(r=n.size)||void 0===r?void 0:r.length)>0?N(!0):N(!1)})).finally((function(){A(!1),y(!0)}))}})}},1914:function(e,t,n){"use strict";n.r(t);var r=n(15),o=n(41),c=n(2),a=n.n(c),i=n(638),u=n(1690),s=n(92),l=n(226),d=n(1373),b=n(1484),j=n(1530),m=n(1531),h=n(1532),f=n(1508),p=n(1518),x=n(1),O=function(){var e=Object(i.a)().messages;return Object(x.jsxs)(p.a,{children:[Object(x.jsx)(f.a,{children:e.DamagedID}),Object(x.jsx)(f.a,{align:"left",children:e["ecommerce.addproduct.count"]}),Object(x.jsx)(f.a,{align:"left",children:e.ProdcutId}),Object(x.jsx)(f.a,{align:"left",children:e.Auther}),Object(x.jsx)(f.a,{align:"left",children:e.DamagedDate}),Object(x.jsx)(f.a,{align:"right",children:e.Actions})]})},g=n(1529),v=n(894),N=n(1382),C=n(1359),z=n(1490),w=n(114),y=n.n(w),k=function(e){var t=e.data,n=e.openEdit,o=a.a.useState(null),c=Object(r.a)(o,2),i=c[0],u=c[1],s=Boolean(i),d=function(){u(null),console.log(t)};return Object(x.jsxs)(l.a,{children:[Object(x.jsx)(z.a,{"aria-controls":"alpha-menu","aria-haspopup":"true",onClick:function(e){u(e.currentTarget)},children:Object(x.jsx)(y.a,{})}),Object(x.jsx)(v.a,{id:"alpha-menu",anchorEl:i,keepMounted:!0,open:s,onClose:d,TransitionComponent:C.a,children:Object(x.jsx)(N.a,{style:{fontSize:14},onClick:function(){n(),d()},children:"Edit"})})]})},S=n(17),F=n(4),E=n(10),I=n(3),D=n.n(I),P=n(47),A=n(227),T=n(244),_=n(1625),R=function(e){var t=e.open,n=e.onClose,a=e.initialValues,i=Object(c.useState)(!1),u=Object(r.a)(i,2),s=u[0],l=u[1],d=Object(c.useState)(!1),b=Object(r.a)(d,2),j=b[0],m=b[1],h=Object(c.useState)(!1),f=Object(r.a)(h,2),p=f[0],O=f[1],g=Object(c.useState)(!1),v=Object(r.a)(g,2),N=v[0],C=v[1],z=Object(c.useState)(!1),w=Object(r.a)(z,2),y=w[0],k=w[1],S=Object(c.useState)(),I=Object(r.a)(S,2),R=I[0],q=I[1],V=Object(A.d)({initialValues:{productId:a.productId,color:a.color,size:a.size,count:a.count,isFromOrder:a.thisReportFromOrder?a.thisReportFromOrder:""},validationSchema:T.c().shape({productId:T.e().required("Not a product name"),color:T.e(),count:T.b().required("Not a count"),size:T.e(),isFromOrder:T.a()}),onSubmit:function(){var e=Object(E.a)(D.a.mark((function e(t){var r,o,c,i,u;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(R),e.prev=1,C(!0),r={id:a.id,auther:P.l.auth().currentUser.displayName,color:t.color?t.color:"",count:t.count,productId:t.productId,size:t.size?t.size:"",thisReportFromOrder:t.isFromOrder},console.log(a),o=P.l.firestore().collection("products").doc(a.productId+""),e.next=8,P.l.firestore().collection("databaseCount").doc("damagedProduct").get();case 8:return c=e.sent,i=c.data().count,u=c.data().sum+Number(a.count)>Number(V.values.count)?c.data().sum+(Number(a.count)-Number(V.values.count)):c.data().sum-(Number(V.values.count)-Number(a.count)),e.next=13,P.l.firestore().collection("databaseCount").doc("damagedProduct").update({count:i,sum:u});case 13:return e.next=15,P.l.firestore().runTransaction(function(){var e=Object(E.a)(D.a.mark((function e(t){return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.get(o).then(function(){var e=Object(E.a)(D.a.mark((function e(n){var c;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.exists){e.next=2;break}throw"Document does not exist!";case 2:if(console.log(n.data()),B(n.data())){e.next=6;break}throw new Error("validationError");case 6:return console.log(r),c=U(n.data()),e.next=10,P.l.firestore().collection("damaged_product").doc(r.id+"").update(r);case 10:t.update(o,Object(F.a)({},c));case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(){return console.log("Transaction successfully committed!"),n(),!0})).catch((function(e){return console.log("Transaction failed: ",e),!1}));case 15:C(!1),e.next=22;break;case 18:e.prev=18,e.t0=e.catch(1),C(!1),console.log(e.t0);case 22:case"end":return e.stop()}}),e,null,[[1,18]])})));return function(t){return e.apply(this,arguments)}}()}),U=function(e){var t=V.values,n=e;return t.isFromOrder?n.sold=Number(a.count)>Number(t.count)?n.sold+(Number(a.count)-Number(t.count)):n.sold-(Number(t.count)-Number(a.count)):(s&&!j&&n.variants.map((function(e,r){e.color_name==t.color&&(n.variants[r].count=Number(a.count)>Number(t.count)?Number(e.count)+(Number(a.count)-Number(t.count)):Number(e.count)-(Number(t.count)-Number(a.count)))})),!s&&j&&n.variants[0].size.map((function(e,r){e.name==t.size&&(n.variants[0].size[r].count=Number(a.count)>Number(t.count)?Number(e.count)+(Number(a.count)-Number(t.count)):Number(e.count)-(Number(t.count)-Number(a.count)))})),s&&j&&n.variants.map((function(e,r){e.color_name==t.color&&e.size.map((function(e,o){e.name==t.size&&(n.variants[r].size[o].count=Number(a.count)>Number(t.count)?Number(e.count)+(Number(a.count)-Number(t.count)):Number(e.count)-(Number(t.count)-Number(a.count)))}))})),n.stock=Number(a.count)>Number(t.count)?n.stock+(Number(a.count)-Number(t.count)):n.stock-(Number(t.count)-Number(a.count))),n.damegdCouont=Number(a.count)>Number(t.count)?e.damegdCouont-(Number(a.count)-Number(t.count)):e.damegdCouont+(Number(t.count)-Number(a.count)),n},B=function(e){console.log(e);var t=V.values;if(0>Number(t.count)&&V.setFieldError("count","can not be minas "),Number(a.count)<Number(t.count)){if(e.stock<Number(t.count)-Number(a.count)&&!t.isFromOrder)return V.setFieldError("count","the number in the stock is "+e.stock),!1;if((e.sold<=0||Number(t.count)-Number(a.count)>e.sold)&&t.isFromOrder)return V.setFieldError("count","the sold products are less than"+t.count),!1;if(s){if(!t.color)return V.setFieldError("color","this field is requerid"),!1;var n=e.variants.filter((function(e){return t.color===e.color_name}))[0];if(!n)return V.setFieldError("color","no such color name"),!1;if(n.count&&Number(t.count)-Number(a.count)>n.count)return V.setFieldError("count","the number in the stock is "+n.count),!1}if(j){if(!t.size)return V.setFieldError("size","this field is requerid"),!1;var r=e.variants.filter((function(e){return t.color===e.color_name||"default"===e.color_name}))[0];if(!r)return V.setFieldError("color","no such color name"),!1;var o=r.size.filter((function(e){return t.size===e.name}))[0];if(!o)return V.setFieldError("size","the size not in the stock"),!1;if(o&&Number(t.count)-Number(a.count)>o.count)return V.setFieldError("count","the number in the stock is "+o.count),!1}}return!0};return Object(c.useEffect)((function(){n()}),[V.values.productId]),Object(c.useEffect)((function(){O(!0),a.color&&l(!0),a.size&&m(!0)}),[a]),Object(x.jsx)(_.a,{open:t,loadingGetProduct:y,onClose:n,showColor:s,addDamaged:N,formik:V,showOkCanc:p,showSize:j,isEdit:!0,getProductForAddReport:function(){k(!0),o.a.get("/api/ecommerce/get",{params:{id:V.values.productId}}).then((function(e){var t,n,r;q(e.data),(null===(t=e.data.variants)||void 0===t?void 0:t.length)>0&&"default"!==e.data.variants[0].color_name?l(!0):l(!1),(null===(n=e.data.variants[0])||void 0===n||null===(r=n.size)||void 0===r?void 0:r.length)>0?m(!0):m(!1)})).finally((function(){k(!1),O(!0)}))}})},q=n(64),V=Object(S.a)(f.a)((function(){return{fontSize:14,padding:8,"&:first-of-type":{paddingLeft:20},"&:last-of-type":{paddingRight:20}}})),U=function(e){var t=e.data,n=Object(q.f)(),o=Object(c.useState)(!1),a=Object(r.a)(o,2),i=a[0],u=a[1],s=function(e){n("/product-management/product_detail/"+e,{state:t})};return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)(g.a,{className:"item-hover",children:[Object(x.jsx)(V,{component:"th",scope:"row",children:Object(x.jsx)(l.a,{onClick:function(){return s(t.productId)},sx:{color:"primary.main",borderBottom:function(e){return"1px solid ".concat(e.palette.primary.main)},display:"inline-block",fontWeight:"bold",fontSize:"15px",cursor:"pointer"},children:t.id})}),Object(x.jsxs)(V,{align:"left",children:["null"===t.color?t.color+"| ":""," ","null"===t.size?t.size+"| ":""," count: ",t.count]}),Object(x.jsx)(f.a,{onClick:function(){return s(t.productId)},children:Object(x.jsx)(l.a,{sx:{color:"primary.main",display:"inline-block",fontWeight:"bold",fontSize:"15px",cursor:"pointer"},children:t.productId})}),Object(x.jsx)(f.a,{children:t.auther}),Object(x.jsx)(f.a,{children:new Date(t.time).toLocaleString()}),Object(x.jsx)(f.a,{align:"right",children:Object(x.jsx)(k,{data:t,openEdit:function(){return u(!0)}})})]},t.damagedId),Object(x.jsx)(R,{initialValues:t,onClose:function(){u(!1)},open:i})]})},B=n(657),M=function(e){var t=e.damagedData;return Object(x.jsx)(B.a,{children:Object(x.jsxs)(j.a,{stickyHeader:!0,className:"table",children:[Object(x.jsx)(m.a,{children:Object(x.jsx)(O,{})}),t?Object(x.jsx)(h.a,{children:t.map((function(e){return Object(x.jsx)(U,{data:e},e.id)}))}):"no data to show"]})})},W=M;M.defaultProps={damagedData:[]};var L=n(1623),H=n(1519),G=n(1516),J=function(e){var t=e.onPageChange,n=e.page,r=e.count,o=e.onSearchOrder,c=e.messages,a=e.loading,i=e.onAddDamagedProductClicked,u=e.damagedData;return Object(x.jsx)(s.a,{animation:"transition.slideUpIn",children:Object(x.jsxs)(G.a,{fullView:!0,children:[Object(x.jsx)(H.a,{children:Object(x.jsxs)(l.a,{display:"flex",flexDirection:"row",alignItems:"center",width:1,justifyContent:"space-between",children:[Object(x.jsx)(s.i,{iconPosition:"right",overlap:!1,onChange:function(e){return o(e.target.value)},placeholder:c["common.searchHere"]}),Object(x.jsxs)(l.a,{display:"flex",flexDirection:"row",alignItems:"center",children:[Object(x.jsx)(d.a,{onClick:function(){return i()},variant:"contained",color:"primary",children:c["ecommerce.addDamaged"]}),Object(x.jsx)(b.a,{smDown:!0,children:Object(x.jsx)(s.k,{rowsPerPage:10,count:r,page:n,onPageChange:t})})]})]})}),a?Object(x.jsx)(L.a,{loading:!0}):Object(x.jsx)(W,{damagedData:u})]})})},K=n(51),Q=n(61),X=function(){var e=Object(K.d)(),t=Object(c.useState)([]),n=Object(r.a)(t,2),a=n[0],s=n[1],l=Object(c.useState)(0),d=Object(r.a)(l,2),b=d[0],j=d[1],m=Object(c.useState)(),h=Object(r.a)(m,2),f=h[0],p=h[1],O=Object(c.useState)(),g=Object(r.a)(O,2),v=g[0],N=g[1],C=Object(c.useState)(!1),z=Object(r.a)(C,2),w=z[0],y=z[1],k=Object(c.useState)(0),S=Object(r.a)(k,2),F=S[0],E=S[1],I=Object(i.a)().messages,D=Object(c.useState)(!1),P=Object(r.a)(D,2),A=P[0],T=P[1];Object(c.useEffect)((function(){_()}),[b]);var _=function(){return y(!0),o.a.get("/api/product/damaged",{params:{page:b,index:b?f:void 0,isNext:v}}).then((function(e){s(e.data.data),E(e.data.length),p(e.data.lastVisible),y(!1)})).catch((function(){e(Object(Q.y)("no data to review")),y(!1),s([]),E(0)})),0};Object(c.useEffect)((function(){j((function(e){return 0==e?_():0}))}),[A]);return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(J,{onSearchOrder:function(){},onPageChange:function(e,t){N(t>b),j(t)},messages:I,page:b,count:F,loading:w,damagedData:a,onAddDamagedProductClicked:function(){return T(!A)}}),Object(x.jsx)(u.a,{open:A,onClose:T})]})};t.default=X}}]);
//# sourceMappingURL=32.4e5fad81.chunk.js.map