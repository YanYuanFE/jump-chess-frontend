import{c as ee,j as r,B as z,r as S,A as Ne,h as Ce,u as Ee,d as Ie,e as ke,D as oe,s as Pe,__tla as __tla_0}from"./index-TbBtWJuP.js";import{u as Re,__tla as __tla_1}from"./useGameContract-Bv7bvqV8.js";import{m as I,__tla as __tla_2}from"./proxy-B28zT_gE.js";let Ve;let __tla=Promise.all([(()=>{try{return __tla_0}catch{}})(),(()=>{try{return __tla_1}catch{}})(),(()=>{try{return __tla_2}catch{}})()]).then(async()=>{const Te=ee("Share2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]);const Se=ee("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);const Oe=ee("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),ce={0:[1,2,4],1:[0,4],2:[0,3,4],3:[2,4],4:[0,1,2,3]},Fe=[{x:20,y:80},{x:20,y:20},{x:80,y:80},{x:80,y:20},{x:50,y:50}];function Le({player:u,selected:d=!1,onClick:m}){return u?r.jsx("div",{className:`
        w-8 h-8 
        cursor-pointer 
        transition-all
        ${d?"scale-110 ring-2 ring-white animate-pulse":""}
        ${u==="GREEN"?"text-green-500":"text-orange-500"}
      `,onClick:m,children:r.jsxs("svg",{viewBox:"0 0 24 24",fill:"currentColor",className:"w-full h-full",children:[r.jsx("path",{d:"M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"}),r.jsx("circle",{cx:"8",cy:"10",r:"1",fill:"white"}),r.jsx("circle",{cx:"16",cy:"10",r:"1",fill:"white"}),r.jsx("path",{d:"M12 14.5C10.5 14.5 9.5 13.5 9.5 13.5C9.5 13.5 10.5 14.5 12 14.5C13.5 14.5 14.5 13.5 14.5 13.5C14.5 13.5 13.5 14.5 12 14.5Z",fill:"white"})]})}):r.jsx("div",{className:"w-8 h-8 rounded-full bg-white/20 cursor-pointer",onClick:m})}function Ae({board:u=[],currentPlayer:d,selectedPiece:m,onMove:v,onSelect:j}){const P=k=>{if(console.log(k,m,u,d),m===null){if(u[k]===d){const R=ce[k]||[];console.log(R),R.some(D=>!u[D])&&j(k)}}else(ce[m]||[]).includes(k)&&!u[k]?v(m,k):j(null)};return r.jsxs("div",{className:"relative w-[300px] h-[300px] bg-sky-100 rounded-lg",children:[r.jsxs("svg",{className:"absolute inset-0 w-full h-full",viewBox:"0 0 100 100",strokeWidth:"1",stroke:"white",fill:"none",children:[r.jsx("path",{d:"M20,20 L20,80 L80,80 L80,20"}),r.jsx("line",{x1:"20",y1:"20",x2:"80",y2:"80"}),r.jsx("line",{x1:"20",y1:"80",x2:"80",y2:"20"})]}),Fe.map((k,R)=>r.jsx("div",{className:"absolute transform -translate-x-1/2 -translate-y-1/2",style:{left:`${k.x}%`,top:`${k.y}%`},children:r.jsx(Le,{player:u[R],selected:m===R,onClick:()=>P(R)})},R))]})}var ae={};(function u(d,m,v,j){var P=!!(d.Worker&&d.Blob&&d.Promise&&d.OffscreenCanvas&&d.OffscreenCanvasRenderingContext2D&&d.HTMLCanvasElement&&d.HTMLCanvasElement.prototype.transferControlToOffscreen&&d.URL&&d.URL.createObjectURL),k=typeof Path2D=="function"&&typeof DOMMatrix=="function",R=function(){if(!d.OffscreenCanvas)return!1;var a=new OffscreenCanvas(1,1),e=a.getContext("2d");e.fillRect(0,0,1,1);var t=a.transferToImageBitmap();try{e.createPattern(t,"no-repeat")}catch{return!1}return!0}();function D(){}function B(a){var e=m.exports.Promise,t=e!==void 0?e:d.Promise;return typeof t=="function"?new t(a):(a(D,D),null)}var q=function(a,e){return{transform:function(t){if(a)return t;if(e.has(t))return e.get(t);var s=new OffscreenCanvas(t.width,t.height),i=s.getContext("2d");return i.drawImage(t,0,0),e.set(t,s),s},clear:function(){e.clear()}}}(R,new Map),G=function(){var a=Math.floor(16.666666666666668),e,t,s={},i=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(e=function(l){var o=Math.random();return s[o]=requestAnimationFrame(function n(c){i===c||i+a-1<c?(i=c,delete s[o],l()):s[o]=requestAnimationFrame(n)}),o},t=function(l){s[l]&&cancelAnimationFrame(s[l])}):(e=function(l){return setTimeout(l,a)},t=function(l){return clearTimeout(l)}),{frame:e,cancel:t}}(),V=function(){var a,e,t={};function s(i){function l(o,n){i.postMessage({options:o||{},callback:n})}i.init=function(n){var c=n.transferControlToOffscreen();i.postMessage({canvas:c},[c])},i.fire=function(n,c,y){if(e)return l(n,null),e;var b=Math.random().toString(36).slice(2);return e=B(function(g){function w(E){E.data.callback===b&&(delete t[b],i.removeEventListener("message",w),e=null,q.clear(),y(),g())}i.addEventListener("message",w),l(n,b),t[b]=w.bind(null,{data:{callback:b}})}),e},i.reset=function(){i.postMessage({reset:!0});for(var n in t)t[n](),delete t[n]}}return function(){if(a)return a;if(!v&&P){var i=["var CONFETTI, SIZE = {}, module = {};","("+u.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{a=new Worker(URL.createObjectURL(new Blob([i])))}catch(l){return typeof console!==void 0&&typeof console.warn=="function"&&console.warn("\uD83C\uDF8A Could not load worker",l),null}s(a)}return a}}(),$={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function Z(a,e){return e?e(a):a}function H(a){return a!=null}function p(a,e,t){return Z(a&&H(a[e])?a[e]:$[e],t)}function Y(a){return a<0?0:Math.floor(a)}function f(a,e){return Math.floor(Math.random()*(e-a))+a}function x(a){return parseInt(a,16)}function M(a){return a.map(N)}function N(a){var e=String(a).replace(/[^0-9a-f]/gi,"");return e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),{r:x(e.substring(0,2)),g:x(e.substring(2,4)),b:x(e.substring(4,6))}}function _(a){var e=p(a,"origin",Object);return e.x=p(e,"x",Number),e.y=p(e,"y",Number),e}function J(a){a.width=document.documentElement.clientWidth,a.height=document.documentElement.clientHeight}function C(a){var e=a.getBoundingClientRect();a.width=e.width,a.height=e.height}function U(a){var e=document.createElement("canvas");return e.style.position="fixed",e.style.top="0px",e.style.left="0px",e.style.pointerEvents="none",e.style.zIndex=a,e}function Q(a,e,t,s,i,l,o,n,c){a.save(),a.translate(e,t),a.rotate(l),a.scale(s,i),a.arc(0,0,1,o,n,c),a.restore()}function de(a){var e=a.angle*(Math.PI/180),t=a.spread*(Math.PI/180);return{x:a.x,y:a.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:a.startVelocity*.5+Math.random()*a.startVelocity,angle2D:-e+(.5*t-Math.random()*t),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:a.color,shape:a.shape,tick:0,totalTicks:a.ticks,decay:a.decay,drift:a.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:a.gravity*3,ovalScalar:.6,scalar:a.scalar,flat:a.flat}}function ue(a,e){e.x+=Math.cos(e.angle2D)*e.velocity+e.drift,e.y+=Math.sin(e.angle2D)*e.velocity+e.gravity,e.velocity*=e.decay,e.flat?(e.wobble=0,e.wobbleX=e.x+10*e.scalar,e.wobbleY=e.y+10*e.scalar,e.tiltSin=0,e.tiltCos=0,e.random=1):(e.wobble+=e.wobbleSpeed,e.wobbleX=e.x+10*e.scalar*Math.cos(e.wobble),e.wobbleY=e.y+10*e.scalar*Math.sin(e.wobble),e.tiltAngle+=.1,e.tiltSin=Math.sin(e.tiltAngle),e.tiltCos=Math.cos(e.tiltAngle),e.random=Math.random()+2);var t=e.tick++/e.totalTicks,s=e.x+e.random*e.tiltCos,i=e.y+e.random*e.tiltSin,l=e.wobbleX+e.random*e.tiltCos,o=e.wobbleY+e.random*e.tiltSin;if(a.fillStyle="rgba("+e.color.r+", "+e.color.g+", "+e.color.b+", "+(1-t)+")",a.beginPath(),k&&e.shape.type==="path"&&typeof e.shape.path=="string"&&Array.isArray(e.shape.matrix))a.fill(fe(e.shape.path,e.shape.matrix,e.x,e.y,Math.abs(l-s)*.1,Math.abs(o-i)*.1,Math.PI/10*e.wobble));else if(e.shape.type==="bitmap"){var n=Math.PI/10*e.wobble,c=Math.abs(l-s)*.1,y=Math.abs(o-i)*.1,b=e.shape.bitmap.width*e.scalar,g=e.shape.bitmap.height*e.scalar,w=new DOMMatrix([Math.cos(n)*c,Math.sin(n)*c,-Math.sin(n)*y,Math.cos(n)*y,e.x,e.y]);w.multiplySelf(new DOMMatrix(e.shape.matrix));var E=a.createPattern(q.transform(e.shape.bitmap),"no-repeat");E.setTransform(w),a.globalAlpha=1-t,a.fillStyle=E,a.fillRect(e.x-b/2,e.y-g/2,b,g),a.globalAlpha=1}else if(e.shape==="circle")a.ellipse?a.ellipse(e.x,e.y,Math.abs(l-s)*e.ovalScalar,Math.abs(o-i)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI):Q(a,e.x,e.y,Math.abs(l-s)*e.ovalScalar,Math.abs(o-i)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI);else if(e.shape==="star")for(var h=Math.PI/2*3,T=4*e.scalar,O=8*e.scalar,F=e.x,A=e.y,W=5,L=Math.PI/W;W--;)F=e.x+Math.cos(h)*O,A=e.y+Math.sin(h)*O,a.lineTo(F,A),h+=L,F=e.x+Math.cos(h)*T,A=e.y+Math.sin(h)*T,a.lineTo(F,A),h+=L;else a.moveTo(Math.floor(e.x),Math.floor(e.y)),a.lineTo(Math.floor(e.wobbleX),Math.floor(i)),a.lineTo(Math.floor(l),Math.floor(o)),a.lineTo(Math.floor(s),Math.floor(e.wobbleY));return a.closePath(),a.fill(),e.tick<e.totalTicks}function he(a,e,t,s,i){var l=e.slice(),o=a.getContext("2d"),n,c,y=B(function(b){function g(){n=c=null,o.clearRect(0,0,s.width,s.height),q.clear(),i(),b()}function w(){v&&!(s.width===j.width&&s.height===j.height)&&(s.width=a.width=j.width,s.height=a.height=j.height),!s.width&&!s.height&&(t(a),s.width=a.width,s.height=a.height),o.clearRect(0,0,s.width,s.height),l=l.filter(function(E){return ue(o,E)}),l.length?n=G.frame(w):g()}n=G.frame(w),c=g});return{addFettis:function(b){return l=l.concat(b),y},canvas:a,promise:y,reset:function(){n&&G.cancel(n),c&&c()}}}function re(a,e){var t=!a,s=!!p(e||{},"resize"),i=!1,l=p(e,"disableForReducedMotion",Boolean),o=P&&!!p(e||{},"useWorker"),n=o?V():null,c=t?J:C,y=a&&n?!!a.__confetti_initialized:!1,b=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,g;function w(h,T,O){for(var F=p(h,"particleCount",Y),A=p(h,"angle",Number),W=p(h,"spread",Number),L=p(h,"startVelocity",Number),ve=p(h,"decay",Number),ye=p(h,"gravity",Number),ge=p(h,"drift",Number),ne=p(h,"colors",M),pe=p(h,"ticks",Number),se=p(h,"shapes"),be=p(h,"scalar"),we=!!p(h,"flat"),ie=_(h),le=F,K=[],je=a.width*ie.x,Me=a.height*ie.y;le--;)K.push(de({x:je,y:Me,angle:A,spread:W,startVelocity:L,color:ne[le%ne.length],shape:se[f(0,se.length)],ticks:pe,decay:ve,gravity:ye,drift:ge,scalar:be,flat:we}));return g?g.addFettis(K):(g=he(a,K,c,T,O),g.promise)}function E(h){var T=l||p(h,"disableForReducedMotion",Boolean),O=p(h,"zIndex",Number);if(T&&b)return B(function(L){L()});t&&g?a=g.canvas:t&&!a&&(a=U(O),document.body.appendChild(a)),s&&!y&&c(a);var F={width:a.width,height:a.height};n&&!y&&n.init(a),y=!0,n&&(a.__confetti_initialized=!0);function A(){if(n){var L={getBoundingClientRect:function(){if(!t)return a.getBoundingClientRect()}};c(L),n.postMessage({resize:{width:L.width,height:L.height}});return}F.width=F.height=null}function W(){g=null,s&&(i=!1,d.removeEventListener("resize",A)),t&&a&&(document.body.contains(a)&&document.body.removeChild(a),a=null,y=!1)}return s&&!i&&(i=!0,d.addEventListener("resize",A,!1)),n?n.fire(h,F,W):w(h,F,W)}return E.reset=function(){n&&n.reset(),g&&g.reset()},E}var X;function te(){return X||(X=re(null,{useWorker:!0,resize:!0})),X}function fe(a,e,t,s,i,l,o){var n=new Path2D(a),c=new Path2D;c.addPath(n,new DOMMatrix(e));var y=new Path2D;return y.addPath(c,new DOMMatrix([Math.cos(o)*i,Math.sin(o)*i,-Math.sin(o)*l,Math.cos(o)*l,t,s])),y}function me(a){if(!k)throw new Error("path confetti are not supported in this browser");var e,t;typeof a=="string"?e=a:(e=a.path,t=a.matrix);var s=new Path2D(e),i=document.createElement("canvas"),l=i.getContext("2d");if(!t){for(var o=1e3,n=o,c=o,y=0,b=0,g,w,E=0;E<o;E+=2)for(var h=0;h<o;h+=2)l.isPointInPath(s,E,h,"nonzero")&&(n=Math.min(n,E),c=Math.min(c,h),y=Math.max(y,E),b=Math.max(b,h));g=y-n,w=b-c;var T=10,O=Math.min(T/g,T/w);t=[O,0,0,O,-Math.round(g/2+n)*O,-Math.round(w/2+c)*O]}return{type:"path",path:e,matrix:t}}function xe(a){var e,t=1,s="#000000",i='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof a=="string"?e=a:(e=a.text,t="scalar"in a?a.scalar:t,i="fontFamily"in a?a.fontFamily:i,s="color"in a?a.color:s);var l=10*t,o=""+l+"px "+i,n=new OffscreenCanvas(l,l),c=n.getContext("2d");c.font=o;var y=c.measureText(e),b=Math.ceil(y.actualBoundingBoxRight+y.actualBoundingBoxLeft),g=Math.ceil(y.actualBoundingBoxAscent+y.actualBoundingBoxDescent),w=2,E=y.actualBoundingBoxLeft+w,h=y.actualBoundingBoxAscent+w;b+=w+w,g+=w+w,n=new OffscreenCanvas(b,g),c=n.getContext("2d"),c.font=o,c.fillStyle=s,c.fillText(e,E,h);var T=1/t;return{type:"bitmap",bitmap:n.transferToImageBitmap(),matrix:[T,0,0,T,-b*T/2,-g*T/2]}}m.exports=function(){return te().apply(this,arguments)},m.exports.reset=function(){te().reset()},m.exports.create=re,m.exports.shapeFromPath=me,m.exports.shapeFromText=xe})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),ae,!1);const Be=ae.exports;ae.exports.create;function Ge({inviterAddress:u,onAcceptInvitation:d,onDeclineInvitation:m}){const v=j=>`${j.slice(0,6)}...${j.slice(-4)}`;return r.jsx("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-100",children:r.jsxs(I.div,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.5},className:"bg-white rounded-lg shadow-lg p-8 max-w-md w-full space-y-6 text-center",children:[r.jsx("h2",{className:"text-2xl font-bold text-gray-800",children:"Game Invitation Received! \uD83D\uDCE9"}),r.jsxs("p",{className:"text-lg text-gray-600",children:[r.jsx("span",{className:"font-semibold",children:v(u)})," has invited you to join a game."]}),r.jsx("div",{className:"flex justify-center",children:r.jsx(I.div,{animate:{y:[0,-10,0]},transition:{duration:1,repeat:1/0},className:"text-6xl",children:"\uD83C\uDFAE"})}),r.jsx("p",{className:"text-xl text-gray-700",children:"Do you want to accept the invitation?"}),r.jsxs("div",{className:"space-y-4",children:[r.jsxs(z,{onClick:d,className:"w-full bg-green-500 hover:bg-green-600",children:[r.jsx(Se,{className:"mr-2 h-4 w-4"})," Accept Invitation ✅"]}),r.jsxs(z,{onClick:m,variant:"outline",className:"w-full border-red-500 text-red-500 hover:bg-red-50",children:[r.jsx(Oe,{className:"mr-2 h-4 w-4"})," Decline Invitation ❌"]})]})]})})}function _e({isWinner:u,onReturnToLobby:d}){S.useEffect(()=>{u&&Be({particleCount:100,spread:70,origin:{y:.6}})},[u]);const m=u?"\uD83C\uDFC6":"\uD83D\uDE22",v=u?"Congratulations! You Won!":"Game Over. Better luck next time!",j=u?"bg-green-100":"bg-red-100",P=u?"text-green-800":"text-red-800";return r.jsx("div",{className:"flex items-center justify-center bg-gray-100",children:r.jsxs(I.div,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.5},className:`${j} ${P} rounded-lg shadow-lg p-8 max-w-md w-full space-y-6 text-center`,children:[r.jsx("div",{className:"text-6xl mb-4",children:m}),r.jsx("h2",{className:"text-3xl font-bold",children:v}),r.jsx("p",{className:"text-xl",children:u?"You've mastered the game! \uD83C\uDF89":"Don't give up, keep practicing! \uD83D\uDCAA"}),r.jsx("div",{className:"flex flex-col space-y-4",children:r.jsx(z,{onClick:d,variant:"outline",size:"lg",children:"Return to Lobby \uD83C\uDFE0"})})]})})}function De({roomNumber:u,onCancel:d}){const[m,v]=S.useState("");return S.useEffect(()=>{const j=setInterval(()=>{v(P=>P.length<3?P+".":"")},500);return()=>clearInterval(j)},[]),r.jsx("div",{className:"flex flex-col items-center justify-center bg-gray-100",children:r.jsxs(I.div,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.5},className:"bg-white rounded-lg shadow-lg p-8 min-w-md w-full space-y-6 text-center",children:[r.jsx("h2",{className:"text-2xl font-bold text-gray-800",children:"Waiting for Player to Join"}),r.jsxs("p",{className:"text-lg text-gray-600",children:["Room: ",r.jsx("span",{className:"font-semibold",children:u})]}),r.jsxs("div",{className:"flex justify-center space-x-4",children:[r.jsx(I.div,{animate:{rotate:360},transition:{duration:2,repeat:1/0,ease:"linear"},className:"w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent flex items-center justify-center",children:r.jsx("span",{className:"text-3xl",children:"\uD83C\uDFB2"})}),r.jsx(I.div,{animate:{scale:[1,1.2,1]},transition:{duration:1.5,repeat:1/0},className:"text-4xl",children:"\uD83D\uDC65"})]}),r.jsxs("p",{className:"text-xl text-gray-700 flex items-center justify-center",children:[r.jsx("span",{children:"Waiting for opponent"}),r.jsx(I.span,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},children:m})]}),r.jsxs("div",{className:"flex justify-center space-x-2",children:[r.jsx(I.div,{animate:{y:[0,-10,0]},transition:{duration:1,repeat:1/0,repeatType:"reverse"},className:"text-2xl",children:"\uD83C\uDFC1"}),r.jsx(I.div,{animate:{y:[0,-10,0]},transition:{duration:1,repeat:1/0,repeatType:"reverse",delay:.3},className:"text-2xl",children:"\uD83C\uDFC1"}),r.jsx(I.div,{animate:{y:[0,-10,0]},transition:{duration:1,repeat:1/0,repeatType:"reverse",delay:.6},className:"text-2xl",children:"\uD83C\uDFC1"})]}),r.jsxs(z,{onClick:()=>{const j=window.location.href;navigator.clipboard.writeText(j).then(()=>{Ne.success("Link copied to clipboard! Share it with your friend.")}).catch(P=>{console.error("Failed to copy: ",P)})},variant:"outline",className:"w-full mb-2",children:[r.jsx(Te,{className:"mr-2 h-4 w-4"})," Share Game Link"]}),r.jsx(z,{onClick:d,variant:"outline",className:"w-full mt-2",children:"Cancel and Return to Lobby \uD83D\uDEAA"})]})})}function Ue(){const[u,d]=S.useState("");return S.useEffect(()=>{const m=setInterval(()=>{d(v=>v.length<3?v+".":"")},500);return()=>clearInterval(m)},[]),r.jsxs("div",{className:"mb-6 flex flex-col items-center justify-center bg-gray-100",children:[r.jsxs("div",{className:"text-2xl font-bold text-gray-700 flex items-center",children:[r.jsx("span",{className:"mr-2",children:"Your turn"}),r.jsx(I.span,{initial:{scale:0},animate:{scale:1},transition:{duration:.5},children:"\uD83E\uDD14"}),r.jsx("span",{children:u})]}),r.jsxs("div",{className:"mt-4 flex items-center space-x-4",children:[r.jsx(I.div,{className:"w-12 h-12 rounded-full bg-green-500 flex items-center justify-center",animate:{y:[0,-10,0]},transition:{duration:1,repeat:1/0},children:r.jsx("span",{className:"text-2xl",children:"♟️"})}),r.jsx(I.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:.5},className:"text-3xl",children:"\uD83D\uDC49"})]})]})}function We(){const[u,d]=S.useState("");return S.useEffect(()=>{const m=setInterval(()=>{d(v=>v.length<3?v+".":"")},500);return()=>clearInterval(m)},[]),r.jsxs("div",{className:"mb-6 flex flex-col items-center justify-center bg-gray-100",children:[r.jsxs("div",{className:"text-2xl font-bold text-gray-700 flex items-center",children:[r.jsx("span",{className:"mr-2",children:"Opponent's turn"}),r.jsx(I.span,{initial:{scale:0},animate:{scale:1},transition:{duration:.5},children:"⏳"}),r.jsx("span",{children:u})]}),r.jsxs("div",{className:"mt-4 flex items-center space-x-4",children:[r.jsx(I.div,{className:"w-12 h-12 rounded-full border-4 border-red-500 border-t-transparent flex items-center justify-center",animate:{rotate:360},transition:{duration:2,repeat:1/0,ease:"linear"},children:r.jsx("span",{className:"text-2xl",children:"\uD83E\uDD16"})}),r.jsx(I.div,{animate:{x:[0,10,0]},transition:{duration:1,repeat:1/0},className:"text-3xl",children:"\uD83E\uDD14"})]})]})}Ve=function(){const u=Ce(),{address:d,account:m}=Ee(),[v,j]=S.useState({board:["GREEN",null,"ORANGE","ORANGE","GREEN"],currentPlayer:"GREEN",winner:null,selectedPiece:null,lastMove:"",creator:""}),[P,k]=S.useState({}),R=Ie(),{client:D,db:B}=ke(),{waitForTransaction:q}=Re(),[G,V]=S.useState(0);console.log(B,v,d,"state");const $=f=>{console.log(f,"game");const x=[];f.grids.forEach(C=>{C.occupied?x[C.name]=C.player===f.creator?"GREEN":"ORANGE":x[C.name]=null});const M=[...new Set(f.grids.filter(C=>C.occupied).map(C=>C.player))],N=M.reduce((C,U)=>({...C,[U]:U===f.creator?"GREEN":"ORANGE"}),{}),_=M.reduce((C,U)=>{const Q=U===f.creator?"GREEN":"ORANGE";return C[Q]=U,C},{});k(_),console.log(M,"players");const J=M.find(C=>C!==f.last_move_player);j({...v,board:x,currentPlayer:N[J],lastMove:f.last_move_player,winner:f.status===2?f.winner:null,creator:f.creator}),V(f.status)},Z=async()=>{const f=new oe().namespace("dojo_starter",x=>x.entity("Container",M=>M.eq("game_id",u.id))).build();try{await B?.getEntities({query:f,callback:x=>{if(x.error){console.error("resp.error.message:",x.error.message);return}if(x.data){console.log(x.data,"res");const M=x.data?.find(N=>N.models.dojo_starter?.Container.game_id===Number(u.id));M&&$(M.models.dojo_starter.Container),console.log(M,"current")}}})}catch(x){console.error("Error querying entities:",x)}};S.useEffect(()=>{Z()},[]),S.useEffect(()=>{let f;return(async()=>{const M=await B?.subscribeEntityQuery({query:new oe().namespace("dojo_starter",N=>N.entity("Container",_=>_.eq("game_id",u.id))).build(),callback:N=>{if(console.log(N),N.error)console.error("Error setting up entity sync:",N.error);else if(N.data&&N.data[0].entityId!=="0x0"){console.log("subscribed",N);const _=N.data[0].models?.dojo_starter?.Container;_&&$(_)}}});f=()=>M?.cancel()})(),()=>{f&&f()}},[B,d,u.id]);const H=async(f,x)=>{const M=parseInt(u.id,16),N=await D.actions.move(m,f,x,M);await q(N?.transaction_hash)},p=({player:f,color:x})=>r.jsxs("div",{className:`flex items-center space-x-2 p-2 rounded-full ${x} text-white`,children:[r.jsx("span",{className:"font-medium",children:Pe(f)}),f===d&&r.jsx("span",{className:"bg-white text-black text-xs px-2 py-1 rounded-full",children:"YOU"})]}),Y=async()=>{const f=parseInt(u.id,16),x=await D.actions.joiningGame(m,f);if(console.log(x,"tx"),!x)return;const M=await q(x?.transaction_hash);console.log(M)};return r.jsx("div",{className:"bg-gray-100 h-full",children:r.jsxs("div",{className:"flex flex-col items-center justify-center w-full h-full",children:[r.jsxs("div",{children:[G===0?v.creator!==d?r.jsx(Ge,{inviterAddress:v.creator,onAcceptInvitation:Y,onDeclineInvitation:()=>R("/")}):r.jsx(De,{roomNumber:u.id,onCancel:()=>R("/")}):null,G===1?v.lastMove!==d?r.jsx(Ue,{}):r.jsx(We,{}):null,G===2?r.jsx(_e,{isWinner:v.winner===d,onReturnToLobby:()=>{R("/")}}):null]}),G===1&&r.jsxs("div",{className:"bg-white p-8 rounded-lg shadow-lg relative pt-10",children:[r.jsx(Ae,{board:v.board,currentPlayer:v.currentPlayer,selectedPiece:v.selectedPiece,onSelect:f=>j(x=>({...x,selectedPiece:f})),onMove:H}),r.jsxs("div",{className:"flex justify-between my-6",children:[r.jsx(p,{player:P.GREEN,color:"bg-green-500"}),r.jsx(p,{player:P.ORANGE,color:"bg-yellow-500"})]}),r.jsx("div",{className:"text-center",children:r.jsxs("p",{className:"text-xl",children:["Current Player: ",v.currentPlayer==="GREEN"?"Green":"Orange"]})})]})]})})}});export{Ve as default,__tla};