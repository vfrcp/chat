(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],[,,,,,,,,,,,,,,function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return i}));var r=n(2),a=n.n(r),c=n(3);function s(e){var t={method:"POST",credentials:"include"};return localStorage.getItem("token")?t.headers={Authorization:"Bearer ".concat(localStorage.getItem("token")),"Content-Type":"application/json;charset=utf-8"}:t.headers={"Content-Type":"application/json;charset=utf-8"},e&&(t.body=JSON.stringify(e)),t}function i(e,t){return o.apply(this,arguments)}function o(){return(o=Object(c.a)(a.a.mark((function t(n,r){var c,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e.serverLink,"/").concat(n),s(r));case 2:return c=t.sent,i=c.clone(),t.next=6,i.json();case 6:return(i=t.sent).changeTokenA&&localStorage.setItem("token",i.changeTokenA),t.abrupt("return",c);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}}).call(this,n(19))},,function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(8),a=n(9),c=function(){function e(){Object(r.a)(this,e)}return Object(a.a)(e,null,[{key:"connect",value:function(e,t,n,r){e&&(t.onmessage=function(e){var t=JSON.parse(e.data);switch(t.action){case"alert":n(t.body);break;case"message":try{r(t.body)}catch(a){}}},setTimeout((function(){t.send(JSON.stringify({action:"connect",username:e.username,id:e.id}))}),1e3))}},{key:"sendAction",value:function(e,t,n,r,a){r.send(JSON.stringify({action:e,senderId:t,recipientId:n,body:a}))}}]),e}()},,function(e,t,n){"use strict";t.a=n.p+"static/media/avatar.fbfe03c2.png"},,,function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n(2),a=n.n(r),c=n(3),s=n(8),i=n(9),o=n(14),u=function(){function e(){Object(s.a)(this,e)}return Object(i.a)(e,null,[{key:"create",value:function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.a)("chat/create",{recipientId:t});case 2:return n=e.sent,e.next=5,n.json();case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.a)("chat/get/".concat(t));case 2:return n=e.sent,e.next=5,n.json();case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"sendMessage",value:function(){var e=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.a)("chat/sendMessage",{chatId:t,message:n});case 2:return r=e.sent,e.next=5,r.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()}]),e}(),l=function(){function e(){Object(s.a)(this,e)}return Object(i.a)(e,null,[{key:"create",value:function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.create(t);case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.get(t);case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"sendMessage",value:function(){var e=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.sendMessage(t,n);case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()}]),e}()},,,,,,,,function(e,t,n){(function(e){e.serverLink="http://localhost:5000",e.fetchCount=0}).call(this,n(19))},,function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return f}));var r=n(24),a=n(2),c=n.n(a),s=n(3),i=n(15),o=n(1),u=n(4),l=n(5),d=n(21),b=n(16),j=(n(45),n(18)),p=n(0);function f(){var t=Object(u.g)(),n=Object(l.c)((function(e){return e.auth}));n||t.push("/");var a=Object(l.c)((function(e){return e.webSocket})),f=Object(l.c)((function(e){return e.modal})),m=Object(u.i)().id,h=Object(o.useState)({}),O=Object(i.a)(h,2),x=O[0],v=O[1],g=Object(o.useState)(null),y=Object(i.a)(g,2),k=y[0],w=y[1],N=Object(o.useState)(""),S=Object(i.a)(N,2),R=S[0],A=S[1],C=Object(o.useRef)(),T=Object(o.useRef)(!1),E=Object(o.useRef)(new WebSocket("ws://".concat(e.serverLink.split("//")[1],"/ws/chat")));Object(o.useEffect)((function(){var e=function(){var e=Object(s.a)(c.a.mark((function e(){var r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get(m);case 2:"success"===(r=e.sent).message?(r.body.users.forEach((function(e,t){e.id===n.id&&r.body.users.splice(t,1)})),v(r.body),b.a.connect(n,E.current,f,w)):t.push("/");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return n&&a&&C&&e(),v([])}),[n,m,f,t,a]),Object(o.useEffect)((function(){if(k){var e=Object(r.a)({},x);e.messages.push(k),v(e),w(null)}}),[k,x]),Object(o.useEffect)((function(){C.current&&!T.current&&(C.current.scrollTop=C.current.scrollHeight,T.current=!0)}));return Object(p.jsx)("section",{className:"chat",children:x.id?Object(p.jsx)("div",{className:"container d-flex justify-content-center",children:Object(p.jsxs)("div",{className:"card mt-5 d-flex flex-column",children:[Object(p.jsx)("div",{className:"d-flex flex-row justify-content-between p-3 adiv text-white",children:Object(p.jsxs)("span",{className:"pb-3",children:["Chat with ",x.users[0].username]})}),Object(p.jsx)("div",{ref:C,className:"messageArea flex-grow-1 overflow-auto",children:x.messages.map((function(e,t){var r=n.id===e.senderId?"green":"white",a=n.id===e.senderId?"l":"r";return Object(p.jsxs)("div",{className:"d-flex justify-content-".concat("l"===a?"start":"end"," flex-row p-3 message"),children:["l"===a&&Object(p.jsx)("img",{src:j.a,alt:"",width:"60",height:"60"}),Object(p.jsx)("div",{className:"chat bg-".concat(r," m").concat(a,"-2 p-3"),children:Object(p.jsx)("span",{className:"text",children:e.body})}),"r"===a&&Object(p.jsx)("img",{src:j.a,alt:"",width:"60",height:"60"})]},e.messageId)}))}),Object(p.jsxs)("div",{className:"form-group px-3 d-flex align-items-center",children:[Object(p.jsx)("textarea",{value:R,onChange:function(e){return A(e.target.value)},className:"form-control",rows:"5",placeholder:"Type your message"}),Object(p.jsx)("button",{className:"btn",onClick:function(){var e={messageId:Date.now()+Math.random(),senderId:n.id,body:R,date:Date.now()};b.a.sendAction("alert",n.id,x.users[0].id,a),b.a.sendAction("sentChatMessage",n.id,x.users[0].id,E.current,e),d.a.sendMessage(x.id,e),x.messages.push(e),A("")},children:"Send"})]})]})}):Object(p.jsx)("div",{className:"main",children:Object(p.jsx)("div",{className:"spinner-grow text-primary",role:"status",children:Object(p.jsx)("span",{className:"visually-hidden",children:"Loading..."})})})})}}).call(this,n(19))},function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return a}));n(29);var r=new WebSocket("ws://".concat(e.serverLink.split("//")[1],"/ws")),a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,t=arguments.length>1?arguments[1]:void 0;return"SET_SOCKET"===t.type?t.payload:e}}).call(this,n(19))},,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(1),a=n(22),c=n.n(a),s=n(2),i=n.n(s),o=n(3),u=n(7),l=n(4),d=n(5),b=n(8),j=n(9),p=n(14),f=function(){function e(){Object(b.a)(this,e)}return Object(j.a)(e,null,[{key:"get",value:function(){var e=Object(o.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.a)("auth/get");case 2:return t=e.sent,e.next=5,t.json();case 5:return t=e.sent,e.abrupt("return",t);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"loginOrRegister",value:function(){var e=Object(o.a)(i.a.mark((function e(t,n){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.a)("auth/".concat(n),t);case 2:return r=e.sent,e.next=5,r.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"logout",value:function(){var e=Object(o.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.a)("auth/logout");case 2:localStorage.removeItem("token");case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),e}(),m=function(){function e(){Object(b.a)(this,e)}return Object(j.a)(e,null,[{key:"set",value:function(){var e=Object(o.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.get();case 3:if("success"!==(n=e.sent).message){e.next=8;break}t({type:"SET_AUTH",payload:{id:n.id,username:n.username}}),e.next=9;break;case 8:throw Error;case 9:e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),localStorage.removeItem("token"),t({type:"SET_AUTH",payload:null});case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}()},{key:"loginOrRegister",value:function(){var e=Object(o.a)(i.a.mark((function e(t,n,r){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.loginOrRegister(t,n);case 3:if("success"!==(a=e.sent).message){e.next=10;break}return localStorage.setItem("token",a.token),r({type:"SET_AUTH",payload:{id:t.id,username:t.username}}),e.abrupt("return",a.message);case 10:return e.abrupt("return",a.message);case 11:e.next=16;break;case 13:return e.prev=13,e.t0=e.catch(0),e.abrupt("return","Something gone wrong");case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t,n,r){return e.apply(this,arguments)}}()}]),e}(),h=n(16),O=n(0);function x(){var e=Object(d.b)(),t=Object(l.h)().pathname,n=Object(l.g)(),r=Object(d.c)((function(e){return e.auth})),a=function(){var t=Object(o.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.logout();case 2:e({type:"SET_AUTH",payload:null}),n.push("/");case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(O.jsx)("nav",{className:"navbar navbar-expand-lg navbar-dark bg-primary",children:Object(O.jsxs)("div",{className:"container-fluid",children:[Object(O.jsx)(u.b,{className:"navbar-brand",to:"/",children:"Chat"}),Object(O.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(O.jsx)("span",{className:"navbar-toggler-icon"})}),Object(O.jsx)("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent",children:Object(O.jsxs)("ul",{className:"navbar-nav me-auto mb-2 mb-lg-0",children:[Object(O.jsx)("li",{className:"nav-item",children:"/"===t?Object(O.jsx)("span",{style:{cursor:"pointer"},className:"nav-link active","aria-current":"page",to:"/",children:"Home"}):Object(O.jsx)(u.b,{className:"nav-link","aria-current":"page",to:"/",children:"Home"})}),r&&Object(O.jsx)("li",{className:"nav-item",children:"/mychats"===t?Object(O.jsx)("span",{style:{cursor:"pointer"},className:"nav-link active",children:"My Chats"}):Object(O.jsx)(u.b,{className:"nav-link",to:"/mychats",children:"My Chats"})}),Object(O.jsx)("li",{className:"nav-item",children:"/allpeople"===t?Object(O.jsx)("span",{style:{cursor:"pointer"},className:"nav-link active",children:"All people"}):Object(O.jsx)(u.b,{className:"nav-link",to:"/allpeople",children:"All people"})}),r&&Object(O.jsx)("li",{className:"nav-item",children:"/myfriends"===t?Object(O.jsx)("span",{style:{cursor:"pointer"},className:"nav-link active",children:"My Friends"}):Object(O.jsx)(u.b,{className:"nav-link",to:"/myfriends",children:"My Friends"})}),r&&Object(O.jsx)("li",{className:"nav-item",children:"/gotreq"===t?Object(O.jsx)("span",{style:{cursor:"pointer"},className:"nav-link active",children:"Got Requests"}):Object(O.jsx)(u.b,{className:"nav-link",to:"/gotreq",children:"Got Requests"})}),!r&&Object(O.jsx)("li",{className:"nav-item",children:"/auth/login"===t?Object(O.jsx)("span",{style:{cursor:"pointer"},className:"nav-link active",children:"Login"}):Object(O.jsx)(u.b,{className:"nav-link",to:"/auth/login",children:"Login"})}),r?Object(O.jsx)("li",{className:"nav-item",children:Object(O.jsx)("span",{style:{cursor:"pointer"},className:"nav-link",onClick:a,children:"Logout"})}):Object(O.jsx)("li",{className:"nav-item",children:"/auth/register"===t?Object(O.jsx)("span",{style:{cursor:"pointer"},className:"nav-link active",children:"Register"}):Object(O.jsx)(u.b,{className:"nav-link",to:"/auth/register",children:"Register"})})]})})]})})}n(43);function v(){var e=Object(d.c)((function(e){return e.auth})),t="Guest";return e&&(t=e.username),Object(O.jsx)("section",{className:"main",children:Object(O.jsxs)("h1",{children:["Hello ",t,", this is site where you can text with others"]})})}var g=n(15),y=function(){function e(){Object(b.a)(this,e)}return Object(j.a)(e,null,[{key:"getAll",value:function(){var e=Object(o.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.a)("users/getAll");case 2:return t=e.sent,e.next=5,t.json();case 5:return t=e.sent,e.abrupt("return",t);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"getProperty",value:function(){var e=Object(o.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.a)("users/getProperty",{property:t});case 2:return n=e.sent,e.next=5,n.json();case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"sendAction",value:function(){var e=Object(o.a)(i.a.mark((function e(t,n){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.a)("users/sendAction",{recipientId:t,action:n});case 2:return r=e.sent,e.next=5,r.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()}]),e}(),k=function(){function e(){Object(b.a)(this,e)}return Object(j.a)(e,null,[{key:"getAll",value:function(){var e=Object(o.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.getAll();case 3:if("success"!==(t=e.sent).message){e.next=8;break}return e.abrupt("return",t.body);case 8:throw Error;case 9:e.next=14;break;case 11:return e.prev=11,e.t0=e.catch(0),e.abrupt("return",[]);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}()},{key:"getProperty",value:function(){var e=Object(o.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.getProperty(t);case 3:if("success"!==(n=e.sent).message){e.next=8;break}return e.abrupt("return",n.body);case 8:throw Error;case 9:e.next=14;break;case 11:return e.prev=11,e.t0=e.catch(0),e.abrupt("return",[]);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}()},{key:"sendAction",value:function(){var e=Object(o.a)(i.a.mark((function e(t,n){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.sendAction(t,n);case 3:return r=e.sent,e.abrupt("return",r);case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}()}]),e}(),w=n(21),N=n(18);n(44);function S(e){var t=e.type,n=e.label,a=Object(l.g)(),c=Object(d.b)(),s=Object(d.c)((function(e){return e.auth})),u=Object(d.c)((function(e){return e.webSocket})),b=Object(d.c)((function(e){return e.modal})),j=Object(r.useState)(new Date),p=Object(g.a)(j,2),f=p[0],m=p[1],x=Object(r.useState)(1),v=Object(g.a)(x,2),y=v[0],S=v[1],R=Object(r.useState)([]),A=Object(g.a)(R,2),C=A[0],T=A[1],E=Object(r.useState)(""),q=Object(g.a)(E,2),L=q[0],I=q[1],M=Object(r.useState)(1),D=Object(g.a)(M,2),_=D[0],F=D[1],H=Object(r.useMemo)((function(){if(C.length)return C.filter((function(e){return e.username.toLowerCase().includes(L.toLowerCase())}))}),[C,L]);Object(r.useEffect)((function(){if(!s){["chats","friends","got"].includes(t)&&a.push("/")}c({type:"SET_RENDERLIST",payload:m});var e=function(){var e=Object(o.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("all"!==t){e.next=8;break}return e.t0=T,e.next=4,k.getAll();case 4:e.t1=e.sent,(0,e.t0)(e.t1),e.next=13;break;case 8:return e.t2=T,e.next=11,k.getProperty(t);case 11:e.t3=e.sent,(0,e.t2)(e.t3);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return e(),T([])}),[t,s,a,f,c]),Object(r.useEffect)((function(){return H&&(S(1),F(Math.ceil(H.length/10))),F(1)}),[H]);var P=function(){var e=Object(o.a)(i.a.mark((function e(n,r){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!s){e.next=19;break}return e.next=3,k.sendAction(n,r);case 3:if(h.a.sendAction(r,s.id,n,u),"all"!==t){e.next=12;break}return e.t0=T,e.next=8,k.getAll();case 8:e.t1=e.sent,(0,e.t0)(e.t1),e.next=17;break;case 12:return e.t2=T,e.next=15,k.getProperty(t);case 15:e.t3=e.sent,(0,e.t2)(e.t3);case 17:e.next=20;break;case 19:b("You nead Login or Register first");case 20:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),U=function(){var e=Object(o.a)(i.a.mark((function e(t,n){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!s){e.next=11;break}if(!n){e.next=5;break}a.push("/chat/".concat(n)),e.next=9;break;case 5:return e.next=7,w.a.create(t);case 7:"success"===(r=e.sent).message&&a.push("/chat/".concat(r.body.id));case 9:e.next=12;break;case 11:b("You nead Login or Register first");case 12:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return Object(O.jsxs)("section",{className:"list",children:[Object(O.jsxs)("div",{className:"logoAndSearch d-flex justify-content-between mb-5",children:[Object(O.jsxs)("h1",{children:["all"===t?"All":"My"," ",n]}),Object(O.jsxs)("form",{className:"search d-flex",children:[Object(O.jsx)("input",{className:"form-control me-2",value:L,onChange:function(e){return I(e.target.value)},type:"search",placeholder:"Search people","aria-label":"Search"}),Object(O.jsx)("button",{className:"btn btn-outline-light",type:"submit",children:"Search"})]})]}),C.length?Object(O.jsx)("div",{className:"row main",children:H.length?H.map((function(e,t){var n="primary",r="Add to friends",a="modal",c=!1;if(s){if(e.username===s.username)return!1;n=e.friends.includes(s.id)||e.gotReq.includes(s.id)?"danger":e.sentReq.includes(s.id)?"success":"primary",r=e.friends.includes(s.id)?"Delete from friends":e.gotReq.includes(s.id)?"Cancel request":e.sentReq.includes(s.id)?"Accept request":"Add to friends",a=e.friends.includes(s.id)?"deleteFriend":e.gotReq.includes(s.id)?"cancelReq":e.sentReq.includes(s.id)?"acceptReq":"sendReq",e.chats.forEach((function(e){e.users.includes(s.id)&&(c=e.chatId)}))}return 1===y&&t<10||t>=10*(y-1)&&t<10*y?Object(O.jsx)("div",{className:"col-sm-6",children:Object(O.jsx)("div",{className:"card",children:Object(O.jsxs)("div",{className:"card-body",children:[Object(O.jsxs)("h5",{className:"card-title",children:[Object(O.jsx)("img",{style:{width:"50px"},src:N.a,alt:""})," ",e.username]}),Object(O.jsx)("p",{className:"card-text",children:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio blanditiis debitis, itaque atque excepturi commodi quaera."}),Object(O.jsx)("button",{onClick:function(){return U(e.id,c)},className:"btn btn-primary",children:"Chat"}),Object(O.jsx)("button",{onClick:function(){return P(e.id,a)},className:"btn btn-"+n,children:r})]})})},e.id):null})):Object(O.jsx)("h2",{className:"main",children:"such people do not exist"})}):Object(O.jsxs)("div",{className:"result",children:["You dont have any ",n]}),H&&Object(O.jsxs)("div",{className:"pages",children:[y>1&&Object(O.jsx)("span",{className:"change",onClick:function(){y>1&&S(y-1)},children:"prev/"}),Object(O.jsx)("span",{children:y}),y<_&&Object(O.jsx)("span",{className:"change",onClick:function(){return S(y+1)},children:"/next"})]})]})}function R(){var e=Object(l.g)();Object(d.c)((function(e){return e.auth}))&&e.push("/");var t=Object(l.i)().type,n=Object(d.b)(),a=Object(r.useRef)(),c=function(){var e=Object(o.a)(i.a.mark((function e(r){var c,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),c=new FormData(r.target),c=Object.fromEntries(c),e.next=5,m.loginOrRegister(c,t,n);case 5:"success"===(s=e.sent)?document.location.href="/":(a.current.textContent=s,a.current.style.color="red",setTimeout((function(){a.current.textContent="Username",a.current.style.color="black"}),3e3));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return"login"===t?Object(O.jsx)("section",{className:"auth container py-5",children:Object(O.jsx)("div",{className:"row d-flex justify-content-center align-items-center",children:Object(O.jsx)("div",{className:"col-12 col-md-8 col-lg-6 col-xl-5",children:Object(O.jsx)("div",{className:"card shadow-2-strong",style:{borderRadius:"1rem"},children:Object(O.jsxs)("form",{className:"card-body p-5 text-center",onSubmit:c,children:[Object(O.jsx)("h3",{className:"mb-5",children:"Login"}),Object(O.jsxs)("div",{className:"form-outline mb-4",children:[Object(O.jsx)("input",{required:!0,name:"username",id:"username",className:"form-control form-control-lg"}),Object(O.jsx)("label",{ref:a,style:{transition:"all 1.5s"},className:"form-label",htmlFor:"username",children:"Username"})]}),Object(O.jsxs)("div",{className:"form-outline mb-4",children:[Object(O.jsx)("input",{required:!0,type:"password",name:"password",id:"password",className:"form-control form-control-lg"}),Object(O.jsx)("label",{className:"form-label",htmlFor:"password",children:"Password"})]}),Object(O.jsxs)("div",{className:"d-flex justify-content-between mb-4",children:[Object(O.jsx)(u.b,{to:"/",children:" Reset password "}),Object(O.jsx)(u.b,{to:"/auth/register",children:" Register "})]}),Object(O.jsx)("button",{className:"btn btn-primary btn-lg btn-block",type:"submit",children:"Login"}),Object(O.jsx)("hr",{className:"my-4"})]})})})})}):Object(O.jsx)("section",{className:"auth container py-5",children:Object(O.jsx)("div",{className:"row d-flex justify-content-center align-items-center",children:Object(O.jsx)("div",{className:"col-12 col-md-8 col-lg-6 col-xl-5",children:Object(O.jsx)("div",{className:"card shadow-2-strong",style:{borderRadius:"1rem"},children:Object(O.jsxs)("form",{className:"card-body p-5 text-center",onSubmit:c,children:[Object(O.jsx)("h3",{className:"mb-5",children:"Register"}),Object(O.jsxs)("div",{className:"form-outline mb-4",children:[Object(O.jsx)("input",{required:!0,type:"username",name:"username",id:"username",className:"form-control form-control-lg"}),Object(O.jsx)("label",{ref:a,style:{transition:"all 1.5s"},className:"form-label",htmlFor:"username",children:"Username"})]}),Object(O.jsxs)("div",{className:"form-outline mb-4",children:[Object(O.jsx)("input",{required:!0,type:"password",name:"password",id:"password",className:"form-control form-control-lg"}),Object(O.jsx)("label",{type:"password",className:"form-label",htmlFor:"password",children:"Password"})]}),Object(O.jsxs)("div",{className:"form-outline mb-4",children:[Object(O.jsx)("input",{required:!0,type:"emali",name:"email",id:"email",className:"form-control form-control-lg"}),Object(O.jsx)("label",{type:"email",className:"form-label",htmlFor:"email",children:"Email"})]}),Object(O.jsxs)("div",{className:"d-flex justify-content-between mb-4",children:[Object(O.jsx)(u.b,{to:"/",children:" Reset password "}),Object(O.jsx)(u.b,{to:"/auth/login",children:" Login "})]}),Object(O.jsx)("button",{className:"btn btn-primary btn-lg btn-block",type:"submit",children:"Register"}),Object(O.jsx)("hr",{className:"my-4"})]})})})})})}var A=n(31),C=n.p+"static/media/new_message.9412f5cf.wav";n(46);function T(){var e=Object(r.useState)(""),t=Object(g.a)(e,2),n=t[0],a=t[1],c=Object(d.c)((function(e){return e.modal})),s=Object(d.c)((function(e){return e.renderList})),i=new Audio(C),o=Object(d.b)();return c||o({type:"SET_MODAL",payload:a}),n&&(i.play(),setTimeout((function(){s(new Date)}),300),setTimeout((function(){a("")}),3e3)),n&&Object(O.jsx)("div",{className:"message",children:Object(O.jsx)("div",{className:"modal-dialog",children:Object(O.jsxs)("div",{className:"modal-content",children:[Object(O.jsxs)("div",{className:"modal-header",children:[Object(O.jsx)("h5",{className:"modal-title",id:"staticBackdropLabel",children:"New message"}),Object(O.jsx)("button",{onClick:function(){return a("")},type:"button",className:"btn-close"})]}),Object(O.jsx)("div",{className:"modal-body",children:n}),Object(O.jsx)("div",{className:"modal-footer",children:Object(O.jsx)("button",{onClick:function(){return a("")},type:"button",className:"btn btn-secondary",children:"Close"})})]})})})}function E(){var e=Object(d.b)(),t=Object(d.c)((function(e){return e.webSocket})),n=Object(d.c)((function(e){return e.auth})),a=Object(d.c)((function(e){return e.modal}));return Object(r.useEffect)((function(){var t=function(){var t=Object(o.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m.set(e);case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();localStorage.getItem("token")&&t()}),[e]),Object(r.useEffect)((function(){n&&t&&a&&h.a.connect(n,t,a)}),[n,t,a]),Object(O.jsx)("div",{className:"app",style:{minHeight:"100vh"},children:Object(O.jsxs)(u.a,{children:[Object(O.jsx)(x,{}),Object(O.jsx)(T,{}),Object(O.jsxs)(l.d,{children:[Object(O.jsx)(l.b,{exact:!0,path:"/",component:v}),Object(O.jsx)(l.b,{path:"/auth/:type",component:R}),Object(O.jsx)(l.b,{exact:!0,path:"/mychats",component:function(){return Object(O.jsx)(S,{type:"chats",label:"Chats"})}}),Object(O.jsx)(l.b,{exact:!0,path:"/allpeople",component:function(){return Object(O.jsx)(S,{type:"all",label:"People"})}}),Object(O.jsx)(l.b,{exact:!0,path:"/myfriends",component:function(){return Object(O.jsx)(S,{type:"friends",label:"Friends"})}}),Object(O.jsx)(l.b,{exact:!0,path:"/gotReq",component:function(){return Object(O.jsx)(S,{type:"gotReq",label:"Got friends request"})}}),Object(O.jsx)(l.b,{path:"/chat/:id",component:A.a}),Object(O.jsx)(l.a,{to:"/"})]})]})})}var q=n(28),L=n(24),I=n(32),M=Object(q.a)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;return"SET_AUTH"===t.type?t.payload?Object(L.a)({},t.payload):t.payload:e},webSocket:I.a,modal:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;return"SET_MODAL"===t.type?t.payload:e},renderList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;return"SET_RENDERLIST"===t.type?t.payload:e}}),D=Object(q.b)(M);n(29),n(47);c.a.render(Object(O.jsx)(d.a,{store:D,children:Object(O.jsx)(E,{})}),document.querySelector("#root"))}],[[48,1,2]]]);
//# sourceMappingURL=main.8e86f337.chunk.js.map