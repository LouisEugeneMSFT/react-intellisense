(this["webpackJsonpreact-intellisense-client"]=this["webpackJsonpreact-intellisense-client"]||[]).push([[0],{242:function(e,t,n){e.exports=n(429)},266:function(e,t){},268:function(e,t){},278:function(e,t){},280:function(e,t){},305:function(e,t){},306:function(e,t){},311:function(e,t){},313:function(e,t){},337:function(e,t){},428:function(e,t,n){},429:function(e,t,n){"use strict";n.r(t);var r=n(222),a=n(18),o=n(459),i=n(38),c=n.n(i),l=n(94),u=n(469),s=n(470),d=n(467),f=n(0),m=n.n(f);var p=function(){var e=f.useState(""),t=Object(a.a)(e,2),n=t[0],r=t[1],o=f.useState([]),i=Object(a.a)(o,2),m=i[0],p=i[1],v=function(){var e=Object(l.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=m,""!==n&&m.push(n),e.next=4,fetch("/setvariables",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({list:t})});case 4:p(t),r("");case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return f.useEffect((function(){v()}),[]),f.createElement("div",null,f.createElement(s.a,null,"Variables:"),f.createElement("div",{style:{display:"flex",flexDirection:"row"}},f.createElement(d.a,{value:n,placeholder:"New variable",onChange:function(e,t){return r(t||"")},onKeyDown:function(e){13==e.keyCode&&v()},style:{width:"220px"}}),f.createElement(u.a,{onClick:function(){return v()}},"Add")),f.createElement("ul",null,m.map((function(e,t){return f.createElement("li",{key:t},e)}))))},v=n(36),g=n(213),h=n(463),E=n(10),y=function(e){return m.a.createElement(m.a.Fragment,null," ",e.map((function(e){return function(e){var t=0,n=e.value.length,r=e.indices.map((function(n){var r=m.a.createElement("span",null,e.value.slice(t,n[0])),a=m.a.createElement("span",{style:{color:"blue",justifyContent:"center"}},e.value.slice(n[0],n[1]+1));return t=n[1]+1,m.a.createElement(m.a.Fragment,null,r,a)}));return r.push(m.a.createElement("span",null,e.value.slice(t,n))),m.a.createElement(m.a.Fragment,null,r)}(e)}))," ")},b=function(e){var t,n=e.completionItem,r=e.isSelected,a=e.onClickCompletionItem;return m.a.createElement(h.a,{content:(t=n.documentation,m.a.createElement("span",{style:{maxWidth:"200px"}},t)),directionalHint:E.a.rightCenter},m.a.createElement("div",{style:{height:"32px",cursor:"pointer",padding:"0 4px",width:"100%",display:"flex",alignItems:"center",backgroundColor:r?"#ddd":""},onClick:a},function(e){var t=m.a.createElement(m.a.Fragment,null," ");switch(e){case v.CompletionItemKind.Function:t=m.a.createElement(g.a,{iconName:"Variable",style:{marginRight:"5px"}});break;case v.CompletionItemKind.Variable:t=m.a.createElement(g.a,{iconName:"VariableGroup",style:{marginRight:"5px"}})}return t}(n.kind),n.data.matches?y(n.data.matches):n.label))},x=m.a.forwardRef((function(e,t){var n=e.completionItems,r=e.selectedItem,a=e.onClickCompletionItem;return m.a.createElement("div",{ref:t,style:{position:"absolute",top:32,left:0,maxHeight:"300px",width:"100%",backgroundColor:"white",overflowY:"auto",overflowX:"hidden",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",zIndex:2e3}},n.map((function(e,t){return m.a.createElement(b,{key:t,completionItem:e,isSelected:r===t,onClickCompletionItem:function(){return a(t)}})})))})),w=n(219),k=function(e,t,n){var r=n.getBoundingClientRect(),a=r.left,o=r.top,i=r.right,c=r.bottom;return e<a||e>i||t<o||t>c};var C=function(e){var t=e.url,n=e.scopes,r=e.id,o=e.value,i=e.onChange,c=m.a.useState(""),l=Object(a.a)(c,2),u=l[0],s=l[1],f=m.a.useState(!1),p=Object(a.a)(f,2),v=p[0],g=p[1],h=m.a.useState(0),E=Object(a.a)(h,2),y=E[0],b=E[1],C=m.a.useState(0),S=Object(a.a)(C,2),O=S[0],j=S[1],I=m.a.useRef(!1),D=m.a.useRef(null),F=m.a.useRef(null),N=function(e,t,n,r,o){var i=m.a.useRef(),c=m.a.useRef(0),l=m.a.useRef(0),u=m.a.useState([]),s=Object(a.a)(u,2),d=s[0],f=s[1];m.a.useEffect((function(){i.current=new w.w3cwebsocket(e),i.current.onopen=function(){var e,a,o;i.current.send(JSON.stringify(function(e){return{jsonrpc:"2.0",id:0,method:"initialize",params:{clientInfo:{name:"IntellisenseTextField"},rootUri:null,capabilities:{},workspaceFolders:null,processId:null,initializationOptions:{scopes:e}}}}(t))),i.current.send(JSON.stringify((e=n,a="intellisense",o=l.current,{jsonrpc:"2.0",method:"textDocument/didOpen",params:{textDocument:{uri:e,languageId:a,version:o,text:r}}})))},i.current.onmessage=function(e){p(e)}}),[e]),m.a.useEffect((function(){i.current.readyState===WebSocket.OPEN&&i.current.send(JSON.stringify(function(e){return{jsonrpc:"2.0",method:"workspace/didChangeConfiguration",params:{settings:{scopes:e}}}}(t)))}),[t]),m.a.useEffect((function(){i.current.readyState===WebSocket.OPEN&&(v(r),g())}),[r]),m.a.useEffect((function(){i.current.readyState===WebSocket.OPEN&&g()}),[o]);var p=function(e){var t,n,r=JSON.parse(e.data);r.id&&((null===(t=r.result)||void 0===t?void 0:t.items)?f(null===(n=r.result)||void 0===n?void 0:n.items):f([]))},v=function(e){var t,r,a;l.current+=1,i.current.readyState===WebSocket.OPEN&&i.current.send(JSON.stringify((t=e,r=n,a=l.current,{jsonrpc:"2.0",method:"textDocument/didChange",params:{contentChanges:[{text:t}],textDocument:{uri:r,version:a}}})))},g=function(){c.current+=1,i.current.send(JSON.stringify({id:c.current,jsonrpc:"2.0",method:"textDocument/completion",params:{position:{line:0,character:o},textDocument:{uri:n}}}))};return d}(t,n,r,u,O);m.a.useEffect((function(){o&&o!==u&&s(o)}),[o]),m.a.useEffect((function(){b(0),I.current?I.current=!1:g(!0)}),[N]),m.a.useEffect((function(){var e=function(e){var t=e.x,n=e.y;D.current&&F.current&&k(t,n,D.current)&&k(t,n,F.current)&&g(!1)},t=function(e){"Escape"===e.key&&g(!1)};return document.body.addEventListener("click",e),document.body.addEventListener("keyup",t),function(){document.body.removeEventListener("click",e),document.body.removeEventListener("keyup",t)}}),[]);var R=function(e){s(e),i(e)},L=function(e){if(N.length>=e){var t=N[e].insertText||"",n=N[e].data.range;if(n){var r=u.substr(0,n.start.character)+t+u.substr(n.end.character);R(r)}else R(t);I.current=!0,g(!1)}};return m.a.createElement("div",{onKeyUp:function(e){switch(e.key){case"ArrowDown":(null===N||void 0===N?void 0:N.length)&&b((function(e){return(e+1)%(null===N||void 0===N?void 0:N.length)}));break;case"ArrowUp":(null===N||void 0===N?void 0:N.length)&&b((function(e){return((null===N||void 0===N?void 0:N.length)+e-1)%(null===N||void 0===N?void 0:N.length)}));break;case"Enter":L(y)}},ref:D,style:{position:"relative"}},m.a.createElement(d.a,{value:u,onChange:function(e,t){return R(t||"")},onKeyDown:function(e){switch(e.key){case"ArrowDown":case"ArrowUp":(null===N||void 0===N?void 0:N.length)&&e.preventDefault()}j(e.target.selectionStart||0)},onClick:function(e){j(e.target.selectionStart||0)},style:{width:"300px"}}),v&&m.a.createElement(x,{ref:F,completionItems:N,selectedItem:y,onClickCompletionItem:function(e){L(e)}}))},S=n(98),O=n.n(S);var j=n(220);var I=n(221),D={quickSuggestions:!0,wordBasedSuggestions:!0};var F=function(e){var t=e.url,n=e.value,r=e.onChange,o=m.a.useState(),i=Object(a.a)(o,2),c=i[0],l=i[1];return m.a.useEffect((function(){if(c){window.monacoServiceInstance||(window.monacoServiceInstance=v.MonacoServices.install(c));var e=function(e){var t={constructor:WebSocket,maxReconnectionDelay:1e4,minReconnectionDelay:1e3,reconnectionDelayGrowFactor:1.3,connectionTimeout:1e4,maxRetries:500,debug:!1};return new j.a(e,[],t)}(t);Object(I.listen)({webSocket:e,onConnection:function(e){var t=function(e,t,n){return new v.MonacoLanguageClient({name:e,clientOptions:{documentSelector:t,errorHandler:{error:function(){return v.ErrorAction.Continue},closed:function(){return v.CloseAction.DoNotRestart}}},connectionProvider:{get:function(e,t){return Promise.resolve(Object(v.createConnection)(n,e,t))}}})}("Intellisense Language Client",["intellisense"],e).start();e.onClose((function(){return t.dispose()}))}})}}),[c]),m.a.useEffect((function(){if(c){var e=c.onDidChangeModelContent((function(){r(c.getValue())}));return function(){e.dispose()}}}),[r,c]),m.a.useEffect((function(){S.monaco.init().then((function(e){var t,n;n="intellisense",(t=e).languages.getLanguages().some((function(e){return e.id===n}))||t.languages.register({id:n})}))}),[]),m.a.createElement(m.a.Fragment,null,m.a.createElement(O.a,{height:"100px",width:"300px",language:"intellisense",theme:"vs-dark",value:n,editorDidMount:function(e,t){l(t)},options:D}))},N=n(102),R=n(471),L=n(464),J=n(460),A=n(462),W=n(466);Object(J.a)();var P=[{key:"textField",text:"TextField"},{key:"monacoEditor",text:"Monaco Editor"}],T=["variables","expressions","scopes"],B="ws://".concat(window.location.hostname,":9000/intellisense-language-server");var K=function(){var e=f.useState(P[0]),t=Object(a.a)(e,2),n=t[0],i=t[1],c=f.useState(T),l=Object(a.a)(c,2),u=l[0],d=l[1],m=f.useState(""),v=Object(a.a)(m,2),g=v[0],h=v[1],E=f.useState(!1),y=Object(a.a)(E,2),b=y[0],x=y[1],w=Object(o.a)((function(){return x(!0)})),k=Object(o.a)((function(){return x(!1)}));return f.createElement("div",{style:{height:"100vh",width:"100vw",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:"#f8f8f8"}},f.createElement(W.a,{variant:"xxLarge",nowrap:!0,block:!0,style:{margin:"20px"}},"React Intellisense"),f.createElement(N.a,{text:"Settings",onClick:w}),f.createElement("div",{style:{boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",padding:"40px",backgroundColor:"white",margin:"20px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}},"textField"===n.key?f.createElement(C,{url:B,scopes:u,id:"inmemory://intellisens/1",value:g,onChange:function(e){return h(e)}}):f.createElement(F,{url:B,value:g,onChange:function(e){return h(e)}})),f.createElement(A.a,{isLightDismiss:!0,isOpen:b,onDismiss:k,closeButtonAriaLabel:"Close",headerText:""},f.createElement(L.a,{label:"Field type:",selectedKey:n.key,onChange:function(e,t){i(t)},placeholder:"Select an option",options:P,style:{width:300,marginBottom:"20px"}}),"textField"===n.key?f.createElement(f.Fragment,null,f.createElement(s.a,null,"Completion kinds:"),f.createElement("div",{style:{display:"flex",flexDirection:"row"}},T.map((function(e){return f.createElement("div",{style:{margin:"10px"},key:e},f.createElement(R.a,{label:e,checked:u.includes(e),onChange:function(t,n){return function(e,t){var n=Object(r.a)(u);t?n.push(e):n=n.filter((function(t){return t!==e})),d(n)}(e,n)}}))})))):f.createElement(f.Fragment,null),f.createElement(p,null)))},M=n(58),V=n.n(M);n(428),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));V.a.render(m.a.createElement(m.a.StrictMode,null,m.a.createElement(K,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[242,1,2]]]);
//# sourceMappingURL=main.976718fc.chunk.js.map