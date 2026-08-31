(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();function zf(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Fc={exports:{}},Li={},Hc={exports:{}},D={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var as=Symbol.for("react.element"),Bf=Symbol.for("react.portal"),Mf=Symbol.for("react.fragment"),Ff=Symbol.for("react.strict_mode"),Hf=Symbol.for("react.profiler"),Wf=Symbol.for("react.provider"),Vf=Symbol.for("react.context"),qf=Symbol.for("react.forward_ref"),Kf=Symbol.for("react.suspense"),Gf=Symbol.for("react.memo"),Jf=Symbol.for("react.lazy"),Hl=Symbol.iterator;function Qf(t){return t===null||typeof t!="object"?null:(t=Hl&&t[Hl]||t["@@iterator"],typeof t=="function"?t:null)}var Wc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Vc=Object.assign,qc={};function tn(t,e,r){this.props=t,this.context=e,this.refs=qc,this.updater=r||Wc}tn.prototype.isReactComponent={};tn.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};tn.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Kc(){}Kc.prototype=tn.prototype;function Va(t,e,r){this.props=t,this.context=e,this.refs=qc,this.updater=r||Wc}var qa=Va.prototype=new Kc;qa.constructor=Va;Vc(qa,tn.prototype);qa.isPureReactComponent=!0;var Wl=Array.isArray,Gc=Object.prototype.hasOwnProperty,Ka={current:null},Jc={key:!0,ref:!0,__self:!0,__source:!0};function Qc(t,e,r){var n,s={},i=null,o=null;if(e!=null)for(n in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)Gc.call(e,n)&&!Jc.hasOwnProperty(n)&&(s[n]=e[n]);var a=arguments.length-2;if(a===1)s.children=r;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];s.children=l}if(t&&t.defaultProps)for(n in a=t.defaultProps,a)s[n]===void 0&&(s[n]=a[n]);return{$$typeof:as,type:t,key:i,ref:o,props:s,_owner:Ka.current}}function Yf(t,e){return{$$typeof:as,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Ga(t){return typeof t=="object"&&t!==null&&t.$$typeof===as}function Xf(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(r){return e[r]})}var Vl=/\/+/g;function io(t,e){return typeof t=="object"&&t!==null&&t.key!=null?Xf(""+t.key):e.toString(36)}function Bs(t,e,r,n,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case as:case Bf:o=!0}}if(o)return o=t,s=s(o),t=n===""?"."+io(o,0):n,Wl(s)?(r="",t!=null&&(r=t.replace(Vl,"$&/")+"/"),Bs(s,e,r,"",function(u){return u})):s!=null&&(Ga(s)&&(s=Yf(s,r+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(Vl,"$&/")+"/")+t)),e.push(s)),1;if(o=0,n=n===""?".":n+":",Wl(t))for(var a=0;a<t.length;a++){i=t[a];var l=n+io(i,a);o+=Bs(i,e,r,l,s)}else if(l=Qf(t),typeof l=="function")for(t=l.call(t),a=0;!(i=t.next()).done;)i=i.value,l=n+io(i,a++),o+=Bs(i,e,r,l,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function gs(t,e,r){if(t==null)return t;var n=[],s=0;return Bs(t,n,"","",function(i){return e.call(r,i,s++)}),n}function Zf(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(r){(t._status===0||t._status===-1)&&(t._status=1,t._result=r)},function(r){(t._status===0||t._status===-1)&&(t._status=2,t._result=r)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var _e={current:null},Ms={transition:null},ep={ReactCurrentDispatcher:_e,ReactCurrentBatchConfig:Ms,ReactCurrentOwner:Ka};function Yc(){throw Error("act(...) is not supported in production builds of React.")}D.Children={map:gs,forEach:function(t,e,r){gs(t,function(){e.apply(this,arguments)},r)},count:function(t){var e=0;return gs(t,function(){e++}),e},toArray:function(t){return gs(t,function(e){return e})||[]},only:function(t){if(!Ga(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};D.Component=tn;D.Fragment=Mf;D.Profiler=Hf;D.PureComponent=Va;D.StrictMode=Ff;D.Suspense=Kf;D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ep;D.act=Yc;D.cloneElement=function(t,e,r){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var n=Vc({},t.props),s=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=Ka.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)Gc.call(e,l)&&!Jc.hasOwnProperty(l)&&(n[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)n.children=r;else if(1<l){a=Array(l);for(var u=0;u<l;u++)a[u]=arguments[u+2];n.children=a}return{$$typeof:as,type:t.type,key:s,ref:i,props:n,_owner:o}};D.createContext=function(t){return t={$$typeof:Vf,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Wf,_context:t},t.Consumer=t};D.createElement=Qc;D.createFactory=function(t){var e=Qc.bind(null,t);return e.type=t,e};D.createRef=function(){return{current:null}};D.forwardRef=function(t){return{$$typeof:qf,render:t}};D.isValidElement=Ga;D.lazy=function(t){return{$$typeof:Jf,_payload:{_status:-1,_result:t},_init:Zf}};D.memo=function(t,e){return{$$typeof:Gf,type:t,compare:e===void 0?null:e}};D.startTransition=function(t){var e=Ms.transition;Ms.transition={};try{t()}finally{Ms.transition=e}};D.unstable_act=Yc;D.useCallback=function(t,e){return _e.current.useCallback(t,e)};D.useContext=function(t){return _e.current.useContext(t)};D.useDebugValue=function(){};D.useDeferredValue=function(t){return _e.current.useDeferredValue(t)};D.useEffect=function(t,e){return _e.current.useEffect(t,e)};D.useId=function(){return _e.current.useId()};D.useImperativeHandle=function(t,e,r){return _e.current.useImperativeHandle(t,e,r)};D.useInsertionEffect=function(t,e){return _e.current.useInsertionEffect(t,e)};D.useLayoutEffect=function(t,e){return _e.current.useLayoutEffect(t,e)};D.useMemo=function(t,e){return _e.current.useMemo(t,e)};D.useReducer=function(t,e,r){return _e.current.useReducer(t,e,r)};D.useRef=function(t){return _e.current.useRef(t)};D.useState=function(t){return _e.current.useState(t)};D.useSyncExternalStore=function(t,e,r){return _e.current.useSyncExternalStore(t,e,r)};D.useTransition=function(){return _e.current.useTransition()};D.version="18.3.1";Hc.exports=D;var U=Hc.exports;const tp=zf(U);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rp=U,np=Symbol.for("react.element"),sp=Symbol.for("react.fragment"),ip=Object.prototype.hasOwnProperty,op=rp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ap={key:!0,ref:!0,__self:!0,__source:!0};function Xc(t,e,r){var n,s={},i=null,o=null;r!==void 0&&(i=""+r),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(n in e)ip.call(e,n)&&!ap.hasOwnProperty(n)&&(s[n]=e[n]);if(t&&t.defaultProps)for(n in e=t.defaultProps,e)s[n]===void 0&&(s[n]=e[n]);return{$$typeof:np,type:t,key:i,ref:o,props:s,_owner:op.current}}Li.Fragment=sp;Li.jsx=Xc;Li.jsxs=Xc;Fc.exports=Li;var w=Fc.exports,Bo={},Zc={exports:{}},Ne={},ed={exports:{}},td={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(A,I){var L=A.length;A.push(I);e:for(;0<L;){var Y=L-1>>>1,se=A[Y];if(0<s(se,I))A[Y]=I,A[L]=se,L=Y;else break e}}function r(A){return A.length===0?null:A[0]}function n(A){if(A.length===0)return null;var I=A[0],L=A.pop();if(L!==I){A[0]=L;e:for(var Y=0,se=A.length,fs=se>>>1;Y<fs;){var Qt=2*(Y+1)-1,so=A[Qt],Yt=Qt+1,ps=A[Yt];if(0>s(so,L))Yt<se&&0>s(ps,so)?(A[Y]=ps,A[Yt]=L,Y=Yt):(A[Y]=so,A[Qt]=L,Y=Qt);else if(Yt<se&&0>s(ps,L))A[Y]=ps,A[Yt]=L,Y=Yt;else break e}}return I}function s(A,I){var L=A.sortIndex-I.sortIndex;return L!==0?L:A.id-I.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],u=[],d=1,c=null,h=3,f=!1,m=!1,v=!1,k=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(A){for(var I=r(u);I!==null;){if(I.callback===null)n(u);else if(I.startTime<=A)n(u),I.sortIndex=I.expirationTime,e(l,I);else break;I=r(u)}}function _(A){if(v=!1,y(A),!m)if(r(l)!==null)m=!0,ro(b);else{var I=r(u);I!==null&&no(_,I.startTime-A)}}function b(A,I){m=!1,v&&(v=!1,g(R),R=-1),f=!0;var L=h;try{for(y(I),c=r(l);c!==null&&(!(c.expirationTime>I)||A&&!me());){var Y=c.callback;if(typeof Y=="function"){c.callback=null,h=c.priorityLevel;var se=Y(c.expirationTime<=I);I=t.unstable_now(),typeof se=="function"?c.callback=se:c===r(l)&&n(l),y(I)}else n(l);c=r(l)}if(c!==null)var fs=!0;else{var Qt=r(u);Qt!==null&&no(_,Qt.startTime-I),fs=!1}return fs}finally{c=null,h=L,f=!1}}var E=!1,T=null,R=-1,N=5,$=-1;function me(){return!(t.unstable_now()-$<N)}function Jt(){if(T!==null){var A=t.unstable_now();$=A;var I=!0;try{I=T(!0,A)}finally{I?on():(E=!1,T=null)}}else E=!1}var on;if(typeof p=="function")on=function(){p(Jt)};else if(typeof MessageChannel<"u"){var Fl=new MessageChannel,Uf=Fl.port2;Fl.port1.onmessage=Jt,on=function(){Uf.postMessage(null)}}else on=function(){k(Jt,0)};function ro(A){T=A,E||(E=!0,on())}function no(A,I){R=k(function(){A(t.unstable_now())},I)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(A){A.callback=null},t.unstable_continueExecution=function(){m||f||(m=!0,ro(b))},t.unstable_forceFrameRate=function(A){0>A||125<A?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):N=0<A?Math.floor(1e3/A):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return r(l)},t.unstable_next=function(A){switch(h){case 1:case 2:case 3:var I=3;break;default:I=h}var L=h;h=I;try{return A()}finally{h=L}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(A,I){switch(A){case 1:case 2:case 3:case 4:case 5:break;default:A=3}var L=h;h=A;try{return I()}finally{h=L}},t.unstable_scheduleCallback=function(A,I,L){var Y=t.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?Y+L:Y):L=Y,A){case 1:var se=-1;break;case 2:se=250;break;case 5:se=1073741823;break;case 4:se=1e4;break;default:se=5e3}return se=L+se,A={id:d++,callback:I,priorityLevel:A,startTime:L,expirationTime:se,sortIndex:-1},L>Y?(A.sortIndex=L,e(u,A),r(l)===null&&A===r(u)&&(v?(g(R),R=-1):v=!0,no(_,L-Y))):(A.sortIndex=se,e(l,A),m||f||(m=!0,ro(b))),A},t.unstable_shouldYield=me,t.unstable_wrapCallback=function(A){var I=h;return function(){var L=h;h=I;try{return A.apply(this,arguments)}finally{h=L}}}})(td);ed.exports=td;var lp=ed.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var up=U,Ie=lp;function x(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,r=1;r<arguments.length;r++)e+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var rd=new Set,Nn={};function gr(t,e){Kr(t,e),Kr(t+"Capture",e)}function Kr(t,e){for(Nn[t]=e,t=0;t<e.length;t++)rd.add(e[t])}var _t=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Mo=Object.prototype.hasOwnProperty,cp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ql={},Kl={};function dp(t){return Mo.call(Kl,t)?!0:Mo.call(ql,t)?!1:cp.test(t)?Kl[t]=!0:(ql[t]=!0,!1)}function hp(t,e,r,n){if(r!==null&&r.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return n?!1:r!==null?!r.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function fp(t,e,r,n){if(e===null||typeof e>"u"||hp(t,e,r,n))return!0;if(n)return!1;if(r!==null)switch(r.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function ke(t,e,r,n,s,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=n,this.attributeNamespace=s,this.mustUseProperty=r,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var de={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){de[t]=new ke(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];de[e]=new ke(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){de[t]=new ke(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){de[t]=new ke(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){de[t]=new ke(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){de[t]=new ke(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){de[t]=new ke(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){de[t]=new ke(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){de[t]=new ke(t,5,!1,t.toLowerCase(),null,!1,!1)});var Ja=/[\-:]([a-z])/g;function Qa(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Ja,Qa);de[e]=new ke(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Ja,Qa);de[e]=new ke(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Ja,Qa);de[e]=new ke(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){de[t]=new ke(t,1,!1,t.toLowerCase(),null,!1,!1)});de.xlinkHref=new ke("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){de[t]=new ke(t,1,!1,t.toLowerCase(),null,!0,!0)});function Ya(t,e,r,n){var s=de.hasOwnProperty(e)?de[e]:null;(s!==null?s.type!==0:n||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(fp(e,r,s,n)&&(r=null),n||s===null?dp(e)&&(r===null?t.removeAttribute(e):t.setAttribute(e,""+r)):s.mustUseProperty?t[s.propertyName]=r===null?s.type===3?!1:"":r:(e=s.attributeName,n=s.attributeNamespace,r===null?t.removeAttribute(e):(s=s.type,r=s===3||s===4&&r===!0?"":""+r,n?t.setAttributeNS(n,e,r):t.setAttribute(e,r))))}var Et=up.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ys=Symbol.for("react.element"),Tr=Symbol.for("react.portal"),xr=Symbol.for("react.fragment"),Xa=Symbol.for("react.strict_mode"),Fo=Symbol.for("react.profiler"),nd=Symbol.for("react.provider"),sd=Symbol.for("react.context"),Za=Symbol.for("react.forward_ref"),Ho=Symbol.for("react.suspense"),Wo=Symbol.for("react.suspense_list"),el=Symbol.for("react.memo"),xt=Symbol.for("react.lazy"),id=Symbol.for("react.offscreen"),Gl=Symbol.iterator;function an(t){return t===null||typeof t!="object"?null:(t=Gl&&t[Gl]||t["@@iterator"],typeof t=="function"?t:null)}var G=Object.assign,oo;function yn(t){if(oo===void 0)try{throw Error()}catch(r){var e=r.stack.trim().match(/\n( *(at )?)/);oo=e&&e[1]||""}return`
`+oo+t}var ao=!1;function lo(t,e){if(!t||ao)return"";ao=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var n=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){n=u}t.call(e.prototype)}else{try{throw Error()}catch(u){n=u}t()}}catch(u){if(u&&n&&typeof u.stack=="string"){for(var s=u.stack.split(`
`),i=n.stack.split(`
`),o=s.length-1,a=i.length-1;1<=o&&0<=a&&s[o]!==i[a];)a--;for(;1<=o&&0<=a;o--,a--)if(s[o]!==i[a]){if(o!==1||a!==1)do if(o--,a--,0>a||s[o]!==i[a]){var l=`
`+s[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{ao=!1,Error.prepareStackTrace=r}return(t=t?t.displayName||t.name:"")?yn(t):""}function pp(t){switch(t.tag){case 5:return yn(t.type);case 16:return yn("Lazy");case 13:return yn("Suspense");case 19:return yn("SuspenseList");case 0:case 2:case 15:return t=lo(t.type,!1),t;case 11:return t=lo(t.type.render,!1),t;case 1:return t=lo(t.type,!0),t;default:return""}}function Vo(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case xr:return"Fragment";case Tr:return"Portal";case Fo:return"Profiler";case Xa:return"StrictMode";case Ho:return"Suspense";case Wo:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case sd:return(t.displayName||"Context")+".Consumer";case nd:return(t._context.displayName||"Context")+".Provider";case Za:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case el:return e=t.displayName||null,e!==null?e:Vo(t.type)||"Memo";case xt:e=t._payload,t=t._init;try{return Vo(t(e))}catch{}}return null}function gp(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Vo(e);case 8:return e===Xa?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Wt(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function od(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function yp(t){var e=od(t)?"checked":"value",r=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),n=""+t[e];if(!t.hasOwnProperty(e)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var s=r.get,i=r.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(o){n=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(o){n=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ms(t){t._valueTracker||(t._valueTracker=yp(t))}function ad(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var r=e.getValue(),n="";return t&&(n=od(t)?t.checked?"true":"false":t.value),t=n,t!==r?(e.setValue(t),!0):!1}function ri(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function qo(t,e){var r=e.checked;return G({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??t._wrapperState.initialChecked})}function Jl(t,e){var r=e.defaultValue==null?"":e.defaultValue,n=e.checked!=null?e.checked:e.defaultChecked;r=Wt(e.value!=null?e.value:r),t._wrapperState={initialChecked:n,initialValue:r,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function ld(t,e){e=e.checked,e!=null&&Ya(t,"checked",e,!1)}function Ko(t,e){ld(t,e);var r=Wt(e.value),n=e.type;if(r!=null)n==="number"?(r===0&&t.value===""||t.value!=r)&&(t.value=""+r):t.value!==""+r&&(t.value=""+r);else if(n==="submit"||n==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Go(t,e.type,r):e.hasOwnProperty("defaultValue")&&Go(t,e.type,Wt(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Ql(t,e,r){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var n=e.type;if(!(n!=="submit"&&n!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,r||e===t.value||(t.value=e),t.defaultValue=e}r=t.name,r!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,r!==""&&(t.name=r)}function Go(t,e,r){(e!=="number"||ri(t.ownerDocument)!==t)&&(r==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+r&&(t.defaultValue=""+r))}var mn=Array.isArray;function zr(t,e,r,n){if(t=t.options,e){e={};for(var s=0;s<r.length;s++)e["$"+r[s]]=!0;for(r=0;r<t.length;r++)s=e.hasOwnProperty("$"+t[r].value),t[r].selected!==s&&(t[r].selected=s),s&&n&&(t[r].defaultSelected=!0)}else{for(r=""+Wt(r),e=null,s=0;s<t.length;s++){if(t[s].value===r){t[s].selected=!0,n&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function Jo(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(x(91));return G({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Yl(t,e){var r=e.value;if(r==null){if(r=e.children,e=e.defaultValue,r!=null){if(e!=null)throw Error(x(92));if(mn(r)){if(1<r.length)throw Error(x(93));r=r[0]}e=r}e==null&&(e=""),r=e}t._wrapperState={initialValue:Wt(r)}}function ud(t,e){var r=Wt(e.value),n=Wt(e.defaultValue);r!=null&&(r=""+r,r!==t.value&&(t.value=r),e.defaultValue==null&&t.defaultValue!==r&&(t.defaultValue=r)),n!=null&&(t.defaultValue=""+n)}function Xl(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function cd(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Qo(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?cd(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var vs,dd=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,r,n,s){MSApp.execUnsafeLocalFunction(function(){return t(e,r,n,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(vs=vs||document.createElement("div"),vs.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=vs.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function $n(t,e){if(e){var r=t.firstChild;if(r&&r===t.lastChild&&r.nodeType===3){r.nodeValue=e;return}}t.textContent=e}var bn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},mp=["Webkit","ms","Moz","O"];Object.keys(bn).forEach(function(t){mp.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),bn[e]=bn[t]})});function hd(t,e,r){return e==null||typeof e=="boolean"||e===""?"":r||typeof e!="number"||e===0||bn.hasOwnProperty(t)&&bn[t]?(""+e).trim():e+"px"}function fd(t,e){t=t.style;for(var r in e)if(e.hasOwnProperty(r)){var n=r.indexOf("--")===0,s=hd(r,e[r],n);r==="float"&&(r="cssFloat"),n?t.setProperty(r,s):t[r]=s}}var vp=G({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Yo(t,e){if(e){if(vp[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(x(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(x(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(x(61))}if(e.style!=null&&typeof e.style!="object")throw Error(x(62))}}function Xo(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Zo=null;function tl(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ea=null,Br=null,Mr=null;function Zl(t){if(t=cs(t)){if(typeof ea!="function")throw Error(x(280));var e=t.stateNode;e&&(e=Mi(e),ea(t.stateNode,t.type,e))}}function pd(t){Br?Mr?Mr.push(t):Mr=[t]:Br=t}function gd(){if(Br){var t=Br,e=Mr;if(Mr=Br=null,Zl(t),e)for(t=0;t<e.length;t++)Zl(e[t])}}function yd(t,e){return t(e)}function md(){}var uo=!1;function vd(t,e,r){if(uo)return t(e,r);uo=!0;try{return yd(t,e,r)}finally{uo=!1,(Br!==null||Mr!==null)&&(md(),gd())}}function Ln(t,e){var r=t.stateNode;if(r===null)return null;var n=Mi(r);if(n===null)return null;r=n[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(t=t.type,n=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!n;break e;default:t=!1}if(t)return null;if(r&&typeof r!="function")throw Error(x(231,e,typeof r));return r}var ta=!1;if(_t)try{var ln={};Object.defineProperty(ln,"passive",{get:function(){ta=!0}}),window.addEventListener("test",ln,ln),window.removeEventListener("test",ln,ln)}catch{ta=!1}function wp(t,e,r,n,s,i,o,a,l){var u=Array.prototype.slice.call(arguments,3);try{e.apply(r,u)}catch(d){this.onError(d)}}var En=!1,ni=null,si=!1,ra=null,_p={onError:function(t){En=!0,ni=t}};function kp(t,e,r,n,s,i,o,a,l){En=!1,ni=null,wp.apply(_p,arguments)}function Sp(t,e,r,n,s,i,o,a,l){if(kp.apply(this,arguments),En){if(En){var u=ni;En=!1,ni=null}else throw Error(x(198));si||(si=!0,ra=u)}}function yr(t){var e=t,r=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(r=e.return),t=e.return;while(t)}return e.tag===3?r:null}function wd(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function eu(t){if(yr(t)!==t)throw Error(x(188))}function bp(t){var e=t.alternate;if(!e){if(e=yr(t),e===null)throw Error(x(188));return e!==t?null:t}for(var r=t,n=e;;){var s=r.return;if(s===null)break;var i=s.alternate;if(i===null){if(n=s.return,n!==null){r=n;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===r)return eu(s),t;if(i===n)return eu(s),e;i=i.sibling}throw Error(x(188))}if(r.return!==n.return)r=s,n=i;else{for(var o=!1,a=s.child;a;){if(a===r){o=!0,r=s,n=i;break}if(a===n){o=!0,n=s,r=i;break}a=a.sibling}if(!o){for(a=i.child;a;){if(a===r){o=!0,r=i,n=s;break}if(a===n){o=!0,n=i,r=s;break}a=a.sibling}if(!o)throw Error(x(189))}}if(r.alternate!==n)throw Error(x(190))}if(r.tag!==3)throw Error(x(188));return r.stateNode.current===r?t:e}function _d(t){return t=bp(t),t!==null?kd(t):null}function kd(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=kd(t);if(e!==null)return e;t=t.sibling}return null}var Sd=Ie.unstable_scheduleCallback,tu=Ie.unstable_cancelCallback,Ep=Ie.unstable_shouldYield,Tp=Ie.unstable_requestPaint,X=Ie.unstable_now,xp=Ie.unstable_getCurrentPriorityLevel,rl=Ie.unstable_ImmediatePriority,bd=Ie.unstable_UserBlockingPriority,ii=Ie.unstable_NormalPriority,Cp=Ie.unstable_LowPriority,Ed=Ie.unstable_IdlePriority,Di=null,it=null;function Rp(t){if(it&&typeof it.onCommitFiberRoot=="function")try{it.onCommitFiberRoot(Di,t,void 0,(t.current.flags&128)===128)}catch{}}var Ye=Math.clz32?Math.clz32:Op,Pp=Math.log,Ap=Math.LN2;function Op(t){return t>>>=0,t===0?32:31-(Pp(t)/Ap|0)|0}var ws=64,_s=4194304;function vn(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function oi(t,e){var r=t.pendingLanes;if(r===0)return 0;var n=0,s=t.suspendedLanes,i=t.pingedLanes,o=r&268435455;if(o!==0){var a=o&~s;a!==0?n=vn(a):(i&=o,i!==0&&(n=vn(i)))}else o=r&~s,o!==0?n=vn(o):i!==0&&(n=vn(i));if(n===0)return 0;if(e!==0&&e!==n&&!(e&s)&&(s=n&-n,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(n&4&&(n|=r&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=n;0<e;)r=31-Ye(e),s=1<<r,n|=t[r],e&=~s;return n}function jp(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ip(t,e){for(var r=t.suspendedLanes,n=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-Ye(i),a=1<<o,l=s[o];l===-1?(!(a&r)||a&n)&&(s[o]=jp(a,e)):l<=e&&(t.expiredLanes|=a),i&=~a}}function na(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Td(){var t=ws;return ws<<=1,!(ws&4194240)&&(ws=64),t}function co(t){for(var e=[],r=0;31>r;r++)e.push(t);return e}function ls(t,e,r){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Ye(e),t[e]=r}function Np(t,e){var r=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var n=t.eventTimes;for(t=t.expirationTimes;0<r;){var s=31-Ye(r),i=1<<s;e[s]=0,n[s]=-1,t[s]=-1,r&=~i}}function nl(t,e){var r=t.entangledLanes|=e;for(t=t.entanglements;r;){var n=31-Ye(r),s=1<<n;s&e|t[n]&e&&(t[n]|=e),r&=~s}}var B=0;function xd(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Cd,sl,Rd,Pd,Ad,sa=!1,ks=[],Lt=null,Dt=null,Ut=null,Dn=new Map,Un=new Map,Rt=[],$p="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ru(t,e){switch(t){case"focusin":case"focusout":Lt=null;break;case"dragenter":case"dragleave":Dt=null;break;case"mouseover":case"mouseout":Ut=null;break;case"pointerover":case"pointerout":Dn.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Un.delete(e.pointerId)}}function un(t,e,r,n,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:r,eventSystemFlags:n,nativeEvent:i,targetContainers:[s]},e!==null&&(e=cs(e),e!==null&&sl(e)),t):(t.eventSystemFlags|=n,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function Lp(t,e,r,n,s){switch(e){case"focusin":return Lt=un(Lt,t,e,r,n,s),!0;case"dragenter":return Dt=un(Dt,t,e,r,n,s),!0;case"mouseover":return Ut=un(Ut,t,e,r,n,s),!0;case"pointerover":var i=s.pointerId;return Dn.set(i,un(Dn.get(i)||null,t,e,r,n,s)),!0;case"gotpointercapture":return i=s.pointerId,Un.set(i,un(Un.get(i)||null,t,e,r,n,s)),!0}return!1}function Od(t){var e=nr(t.target);if(e!==null){var r=yr(e);if(r!==null){if(e=r.tag,e===13){if(e=wd(r),e!==null){t.blockedOn=e,Ad(t.priority,function(){Rd(r)});return}}else if(e===3&&r.stateNode.current.memoizedState.isDehydrated){t.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Fs(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var r=ia(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(r===null){r=t.nativeEvent;var n=new r.constructor(r.type,r);Zo=n,r.target.dispatchEvent(n),Zo=null}else return e=cs(r),e!==null&&sl(e),t.blockedOn=r,!1;e.shift()}return!0}function nu(t,e,r){Fs(t)&&r.delete(e)}function Dp(){sa=!1,Lt!==null&&Fs(Lt)&&(Lt=null),Dt!==null&&Fs(Dt)&&(Dt=null),Ut!==null&&Fs(Ut)&&(Ut=null),Dn.forEach(nu),Un.forEach(nu)}function cn(t,e){t.blockedOn===e&&(t.blockedOn=null,sa||(sa=!0,Ie.unstable_scheduleCallback(Ie.unstable_NormalPriority,Dp)))}function zn(t){function e(s){return cn(s,t)}if(0<ks.length){cn(ks[0],t);for(var r=1;r<ks.length;r++){var n=ks[r];n.blockedOn===t&&(n.blockedOn=null)}}for(Lt!==null&&cn(Lt,t),Dt!==null&&cn(Dt,t),Ut!==null&&cn(Ut,t),Dn.forEach(e),Un.forEach(e),r=0;r<Rt.length;r++)n=Rt[r],n.blockedOn===t&&(n.blockedOn=null);for(;0<Rt.length&&(r=Rt[0],r.blockedOn===null);)Od(r),r.blockedOn===null&&Rt.shift()}var Fr=Et.ReactCurrentBatchConfig,ai=!0;function Up(t,e,r,n){var s=B,i=Fr.transition;Fr.transition=null;try{B=1,il(t,e,r,n)}finally{B=s,Fr.transition=i}}function zp(t,e,r,n){var s=B,i=Fr.transition;Fr.transition=null;try{B=4,il(t,e,r,n)}finally{B=s,Fr.transition=i}}function il(t,e,r,n){if(ai){var s=ia(t,e,r,n);if(s===null)ko(t,e,n,li,r),ru(t,n);else if(Lp(s,t,e,r,n))n.stopPropagation();else if(ru(t,n),e&4&&-1<$p.indexOf(t)){for(;s!==null;){var i=cs(s);if(i!==null&&Cd(i),i=ia(t,e,r,n),i===null&&ko(t,e,n,li,r),i===s)break;s=i}s!==null&&n.stopPropagation()}else ko(t,e,n,null,r)}}var li=null;function ia(t,e,r,n){if(li=null,t=tl(n),t=nr(t),t!==null)if(e=yr(t),e===null)t=null;else if(r=e.tag,r===13){if(t=wd(e),t!==null)return t;t=null}else if(r===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return li=t,null}function jd(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(xp()){case rl:return 1;case bd:return 4;case ii:case Cp:return 16;case Ed:return 536870912;default:return 16}default:return 16}}var jt=null,ol=null,Hs=null;function Id(){if(Hs)return Hs;var t,e=ol,r=e.length,n,s="value"in jt?jt.value:jt.textContent,i=s.length;for(t=0;t<r&&e[t]===s[t];t++);var o=r-t;for(n=1;n<=o&&e[r-n]===s[i-n];n++);return Hs=s.slice(t,1<n?1-n:void 0)}function Ws(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ss(){return!0}function su(){return!1}function $e(t){function e(r,n,s,i,o){this._reactName=r,this._targetInst=s,this.type=n,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(r=t[a],this[a]=r?r(i):i[a]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ss:su,this.isPropagationStopped=su,this}return G(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Ss)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Ss)},persist:function(){},isPersistent:Ss}),e}var rn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},al=$e(rn),us=G({},rn,{view:0,detail:0}),Bp=$e(us),ho,fo,dn,Ui=G({},us,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ll,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==dn&&(dn&&t.type==="mousemove"?(ho=t.screenX-dn.screenX,fo=t.screenY-dn.screenY):fo=ho=0,dn=t),ho)},movementY:function(t){return"movementY"in t?t.movementY:fo}}),iu=$e(Ui),Mp=G({},Ui,{dataTransfer:0}),Fp=$e(Mp),Hp=G({},us,{relatedTarget:0}),po=$e(Hp),Wp=G({},rn,{animationName:0,elapsedTime:0,pseudoElement:0}),Vp=$e(Wp),qp=G({},rn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Kp=$e(qp),Gp=G({},rn,{data:0}),ou=$e(Gp),Jp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Qp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Yp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Xp(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Yp[t])?!!e[t]:!1}function ll(){return Xp}var Zp=G({},us,{key:function(t){if(t.key){var e=Jp[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Ws(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Qp[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ll,charCode:function(t){return t.type==="keypress"?Ws(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ws(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),eg=$e(Zp),tg=G({},Ui,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),au=$e(tg),rg=G({},us,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ll}),ng=$e(rg),sg=G({},rn,{propertyName:0,elapsedTime:0,pseudoElement:0}),ig=$e(sg),og=G({},Ui,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),ag=$e(og),lg=[9,13,27,32],ul=_t&&"CompositionEvent"in window,Tn=null;_t&&"documentMode"in document&&(Tn=document.documentMode);var ug=_t&&"TextEvent"in window&&!Tn,Nd=_t&&(!ul||Tn&&8<Tn&&11>=Tn),lu=" ",uu=!1;function $d(t,e){switch(t){case"keyup":return lg.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ld(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Cr=!1;function cg(t,e){switch(t){case"compositionend":return Ld(e);case"keypress":return e.which!==32?null:(uu=!0,lu);case"textInput":return t=e.data,t===lu&&uu?null:t;default:return null}}function dg(t,e){if(Cr)return t==="compositionend"||!ul&&$d(t,e)?(t=Id(),Hs=ol=jt=null,Cr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Nd&&e.locale!=="ko"?null:e.data;default:return null}}var hg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function cu(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!hg[t.type]:e==="textarea"}function Dd(t,e,r,n){pd(n),e=ui(e,"onChange"),0<e.length&&(r=new al("onChange","change",null,r,n),t.push({event:r,listeners:e}))}var xn=null,Bn=null;function fg(t){Gd(t,0)}function zi(t){var e=Ar(t);if(ad(e))return t}function pg(t,e){if(t==="change")return e}var Ud=!1;if(_t){var go;if(_t){var yo="oninput"in document;if(!yo){var du=document.createElement("div");du.setAttribute("oninput","return;"),yo=typeof du.oninput=="function"}go=yo}else go=!1;Ud=go&&(!document.documentMode||9<document.documentMode)}function hu(){xn&&(xn.detachEvent("onpropertychange",zd),Bn=xn=null)}function zd(t){if(t.propertyName==="value"&&zi(Bn)){var e=[];Dd(e,Bn,t,tl(t)),vd(fg,e)}}function gg(t,e,r){t==="focusin"?(hu(),xn=e,Bn=r,xn.attachEvent("onpropertychange",zd)):t==="focusout"&&hu()}function yg(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return zi(Bn)}function mg(t,e){if(t==="click")return zi(e)}function vg(t,e){if(t==="input"||t==="change")return zi(e)}function wg(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Ze=typeof Object.is=="function"?Object.is:wg;function Mn(t,e){if(Ze(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var r=Object.keys(t),n=Object.keys(e);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var s=r[n];if(!Mo.call(e,s)||!Ze(t[s],e[s]))return!1}return!0}function fu(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function pu(t,e){var r=fu(t);t=0;for(var n;r;){if(r.nodeType===3){if(n=t+r.textContent.length,t<=e&&n>=e)return{node:r,offset:e-t};t=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=fu(r)}}function Bd(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Bd(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Md(){for(var t=window,e=ri();e instanceof t.HTMLIFrameElement;){try{var r=typeof e.contentWindow.location.href=="string"}catch{r=!1}if(r)t=e.contentWindow;else break;e=ri(t.document)}return e}function cl(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function _g(t){var e=Md(),r=t.focusedElem,n=t.selectionRange;if(e!==r&&r&&r.ownerDocument&&Bd(r.ownerDocument.documentElement,r)){if(n!==null&&cl(r)){if(e=n.start,t=n.end,t===void 0&&(t=e),"selectionStart"in r)r.selectionStart=e,r.selectionEnd=Math.min(t,r.value.length);else if(t=(e=r.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=r.textContent.length,i=Math.min(n.start,s);n=n.end===void 0?i:Math.min(n.end,s),!t.extend&&i>n&&(s=n,n=i,i=s),s=pu(r,i);var o=pu(r,n);s&&o&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>n?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=r;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<e.length;r++)t=e[r],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var kg=_t&&"documentMode"in document&&11>=document.documentMode,Rr=null,oa=null,Cn=null,aa=!1;function gu(t,e,r){var n=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;aa||Rr==null||Rr!==ri(n)||(n=Rr,"selectionStart"in n&&cl(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Cn&&Mn(Cn,n)||(Cn=n,n=ui(oa,"onSelect"),0<n.length&&(e=new al("onSelect","select",null,e,r),t.push({event:e,listeners:n}),e.target=Rr)))}function bs(t,e){var r={};return r[t.toLowerCase()]=e.toLowerCase(),r["Webkit"+t]="webkit"+e,r["Moz"+t]="moz"+e,r}var Pr={animationend:bs("Animation","AnimationEnd"),animationiteration:bs("Animation","AnimationIteration"),animationstart:bs("Animation","AnimationStart"),transitionend:bs("Transition","TransitionEnd")},mo={},Fd={};_t&&(Fd=document.createElement("div").style,"AnimationEvent"in window||(delete Pr.animationend.animation,delete Pr.animationiteration.animation,delete Pr.animationstart.animation),"TransitionEvent"in window||delete Pr.transitionend.transition);function Bi(t){if(mo[t])return mo[t];if(!Pr[t])return t;var e=Pr[t],r;for(r in e)if(e.hasOwnProperty(r)&&r in Fd)return mo[t]=e[r];return t}var Hd=Bi("animationend"),Wd=Bi("animationiteration"),Vd=Bi("animationstart"),qd=Bi("transitionend"),Kd=new Map,yu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function qt(t,e){Kd.set(t,e),gr(e,[t])}for(var vo=0;vo<yu.length;vo++){var wo=yu[vo],Sg=wo.toLowerCase(),bg=wo[0].toUpperCase()+wo.slice(1);qt(Sg,"on"+bg)}qt(Hd,"onAnimationEnd");qt(Wd,"onAnimationIteration");qt(Vd,"onAnimationStart");qt("dblclick","onDoubleClick");qt("focusin","onFocus");qt("focusout","onBlur");qt(qd,"onTransitionEnd");Kr("onMouseEnter",["mouseout","mouseover"]);Kr("onMouseLeave",["mouseout","mouseover"]);Kr("onPointerEnter",["pointerout","pointerover"]);Kr("onPointerLeave",["pointerout","pointerover"]);gr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));gr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));gr("onBeforeInput",["compositionend","keypress","textInput","paste"]);gr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));gr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));gr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var wn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Eg=new Set("cancel close invalid load scroll toggle".split(" ").concat(wn));function mu(t,e,r){var n=t.type||"unknown-event";t.currentTarget=r,Sp(n,e,void 0,t),t.currentTarget=null}function Gd(t,e){e=(e&4)!==0;for(var r=0;r<t.length;r++){var n=t[r],s=n.event;n=n.listeners;e:{var i=void 0;if(e)for(var o=n.length-1;0<=o;o--){var a=n[o],l=a.instance,u=a.currentTarget;if(a=a.listener,l!==i&&s.isPropagationStopped())break e;mu(s,a,u),i=l}else for(o=0;o<n.length;o++){if(a=n[o],l=a.instance,u=a.currentTarget,a=a.listener,l!==i&&s.isPropagationStopped())break e;mu(s,a,u),i=l}}}if(si)throw t=ra,si=!1,ra=null,t}function H(t,e){var r=e[ha];r===void 0&&(r=e[ha]=new Set);var n=t+"__bubble";r.has(n)||(Jd(e,t,2,!1),r.add(n))}function _o(t,e,r){var n=0;e&&(n|=4),Jd(r,t,n,e)}var Es="_reactListening"+Math.random().toString(36).slice(2);function Fn(t){if(!t[Es]){t[Es]=!0,rd.forEach(function(r){r!=="selectionchange"&&(Eg.has(r)||_o(r,!1,t),_o(r,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Es]||(e[Es]=!0,_o("selectionchange",!1,e))}}function Jd(t,e,r,n){switch(jd(e)){case 1:var s=Up;break;case 4:s=zp;break;default:s=il}r=s.bind(null,e,r,t),s=void 0,!ta||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),n?s!==void 0?t.addEventListener(e,r,{capture:!0,passive:s}):t.addEventListener(e,r,!0):s!==void 0?t.addEventListener(e,r,{passive:s}):t.addEventListener(e,r,!1)}function ko(t,e,r,n,s){var i=n;if(!(e&1)&&!(e&2)&&n!==null)e:for(;;){if(n===null)return;var o=n.tag;if(o===3||o===4){var a=n.stateNode.containerInfo;if(a===s||a.nodeType===8&&a.parentNode===s)break;if(o===4)for(o=n.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===s||l.nodeType===8&&l.parentNode===s))return;o=o.return}for(;a!==null;){if(o=nr(a),o===null)return;if(l=o.tag,l===5||l===6){n=i=o;continue e}a=a.parentNode}}n=n.return}vd(function(){var u=i,d=tl(r),c=[];e:{var h=Kd.get(t);if(h!==void 0){var f=al,m=t;switch(t){case"keypress":if(Ws(r)===0)break e;case"keydown":case"keyup":f=eg;break;case"focusin":m="focus",f=po;break;case"focusout":m="blur",f=po;break;case"beforeblur":case"afterblur":f=po;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":f=iu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":f=Fp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":f=ng;break;case Hd:case Wd:case Vd:f=Vp;break;case qd:f=ig;break;case"scroll":f=Bp;break;case"wheel":f=ag;break;case"copy":case"cut":case"paste":f=Kp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":f=au}var v=(e&4)!==0,k=!v&&t==="scroll",g=v?h!==null?h+"Capture":null:h;v=[];for(var p=u,y;p!==null;){y=p;var _=y.stateNode;if(y.tag===5&&_!==null&&(y=_,g!==null&&(_=Ln(p,g),_!=null&&v.push(Hn(p,_,y)))),k)break;p=p.return}0<v.length&&(h=new f(h,m,null,r,d),c.push({event:h,listeners:v}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",f=t==="mouseout"||t==="pointerout",h&&r!==Zo&&(m=r.relatedTarget||r.fromElement)&&(nr(m)||m[kt]))break e;if((f||h)&&(h=d.window===d?d:(h=d.ownerDocument)?h.defaultView||h.parentWindow:window,f?(m=r.relatedTarget||r.toElement,f=u,m=m?nr(m):null,m!==null&&(k=yr(m),m!==k||m.tag!==5&&m.tag!==6)&&(m=null)):(f=null,m=u),f!==m)){if(v=iu,_="onMouseLeave",g="onMouseEnter",p="mouse",(t==="pointerout"||t==="pointerover")&&(v=au,_="onPointerLeave",g="onPointerEnter",p="pointer"),k=f==null?h:Ar(f),y=m==null?h:Ar(m),h=new v(_,p+"leave",f,r,d),h.target=k,h.relatedTarget=y,_=null,nr(d)===u&&(v=new v(g,p+"enter",m,r,d),v.target=y,v.relatedTarget=k,_=v),k=_,f&&m)t:{for(v=f,g=m,p=0,y=v;y;y=mr(y))p++;for(y=0,_=g;_;_=mr(_))y++;for(;0<p-y;)v=mr(v),p--;for(;0<y-p;)g=mr(g),y--;for(;p--;){if(v===g||g!==null&&v===g.alternate)break t;v=mr(v),g=mr(g)}v=null}else v=null;f!==null&&vu(c,h,f,v,!1),m!==null&&k!==null&&vu(c,k,m,v,!0)}}e:{if(h=u?Ar(u):window,f=h.nodeName&&h.nodeName.toLowerCase(),f==="select"||f==="input"&&h.type==="file")var b=pg;else if(cu(h))if(Ud)b=vg;else{b=yg;var E=gg}else(f=h.nodeName)&&f.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(b=mg);if(b&&(b=b(t,u))){Dd(c,b,r,d);break e}E&&E(t,h,u),t==="focusout"&&(E=h._wrapperState)&&E.controlled&&h.type==="number"&&Go(h,"number",h.value)}switch(E=u?Ar(u):window,t){case"focusin":(cu(E)||E.contentEditable==="true")&&(Rr=E,oa=u,Cn=null);break;case"focusout":Cn=oa=Rr=null;break;case"mousedown":aa=!0;break;case"contextmenu":case"mouseup":case"dragend":aa=!1,gu(c,r,d);break;case"selectionchange":if(kg)break;case"keydown":case"keyup":gu(c,r,d)}var T;if(ul)e:{switch(t){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else Cr?$d(t,r)&&(R="onCompositionEnd"):t==="keydown"&&r.keyCode===229&&(R="onCompositionStart");R&&(Nd&&r.locale!=="ko"&&(Cr||R!=="onCompositionStart"?R==="onCompositionEnd"&&Cr&&(T=Id()):(jt=d,ol="value"in jt?jt.value:jt.textContent,Cr=!0)),E=ui(u,R),0<E.length&&(R=new ou(R,t,null,r,d),c.push({event:R,listeners:E}),T?R.data=T:(T=Ld(r),T!==null&&(R.data=T)))),(T=ug?cg(t,r):dg(t,r))&&(u=ui(u,"onBeforeInput"),0<u.length&&(d=new ou("onBeforeInput","beforeinput",null,r,d),c.push({event:d,listeners:u}),d.data=T))}Gd(c,e)})}function Hn(t,e,r){return{instance:t,listener:e,currentTarget:r}}function ui(t,e){for(var r=e+"Capture",n=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=Ln(t,r),i!=null&&n.unshift(Hn(t,i,s)),i=Ln(t,e),i!=null&&n.push(Hn(t,i,s))),t=t.return}return n}function mr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function vu(t,e,r,n,s){for(var i=e._reactName,o=[];r!==null&&r!==n;){var a=r,l=a.alternate,u=a.stateNode;if(l!==null&&l===n)break;a.tag===5&&u!==null&&(a=u,s?(l=Ln(r,i),l!=null&&o.unshift(Hn(r,l,a))):s||(l=Ln(r,i),l!=null&&o.push(Hn(r,l,a)))),r=r.return}o.length!==0&&t.push({event:e,listeners:o})}var Tg=/\r\n?/g,xg=/\u0000|\uFFFD/g;function wu(t){return(typeof t=="string"?t:""+t).replace(Tg,`
`).replace(xg,"")}function Ts(t,e,r){if(e=wu(e),wu(t)!==e&&r)throw Error(x(425))}function ci(){}var la=null,ua=null;function ca(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var da=typeof setTimeout=="function"?setTimeout:void 0,Cg=typeof clearTimeout=="function"?clearTimeout:void 0,_u=typeof Promise=="function"?Promise:void 0,Rg=typeof queueMicrotask=="function"?queueMicrotask:typeof _u<"u"?function(t){return _u.resolve(null).then(t).catch(Pg)}:da;function Pg(t){setTimeout(function(){throw t})}function So(t,e){var r=e,n=0;do{var s=r.nextSibling;if(t.removeChild(r),s&&s.nodeType===8)if(r=s.data,r==="/$"){if(n===0){t.removeChild(s),zn(e);return}n--}else r!=="$"&&r!=="$?"&&r!=="$!"||n++;r=s}while(r);zn(e)}function zt(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function ku(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var r=t.data;if(r==="$"||r==="$!"||r==="$?"){if(e===0)return t;e--}else r==="/$"&&e++}t=t.previousSibling}return null}var nn=Math.random().toString(36).slice(2),st="__reactFiber$"+nn,Wn="__reactProps$"+nn,kt="__reactContainer$"+nn,ha="__reactEvents$"+nn,Ag="__reactListeners$"+nn,Og="__reactHandles$"+nn;function nr(t){var e=t[st];if(e)return e;for(var r=t.parentNode;r;){if(e=r[kt]||r[st]){if(r=e.alternate,e.child!==null||r!==null&&r.child!==null)for(t=ku(t);t!==null;){if(r=t[st])return r;t=ku(t)}return e}t=r,r=t.parentNode}return null}function cs(t){return t=t[st]||t[kt],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Ar(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(x(33))}function Mi(t){return t[Wn]||null}var fa=[],Or=-1;function Kt(t){return{current:t}}function W(t){0>Or||(t.current=fa[Or],fa[Or]=null,Or--)}function F(t,e){Or++,fa[Or]=t.current,t.current=e}var Vt={},ye=Kt(Vt),xe=Kt(!1),cr=Vt;function Gr(t,e){var r=t.type.contextTypes;if(!r)return Vt;var n=t.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===e)return n.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in r)s[i]=e[i];return n&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function Ce(t){return t=t.childContextTypes,t!=null}function di(){W(xe),W(ye)}function Su(t,e,r){if(ye.current!==Vt)throw Error(x(168));F(ye,e),F(xe,r)}function Qd(t,e,r){var n=t.stateNode;if(e=e.childContextTypes,typeof n.getChildContext!="function")return r;n=n.getChildContext();for(var s in n)if(!(s in e))throw Error(x(108,gp(t)||"Unknown",s));return G({},r,n)}function hi(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Vt,cr=ye.current,F(ye,t),F(xe,xe.current),!0}function bu(t,e,r){var n=t.stateNode;if(!n)throw Error(x(169));r?(t=Qd(t,e,cr),n.__reactInternalMemoizedMergedChildContext=t,W(xe),W(ye),F(ye,t)):W(xe),F(xe,r)}var gt=null,Fi=!1,bo=!1;function Yd(t){gt===null?gt=[t]:gt.push(t)}function jg(t){Fi=!0,Yd(t)}function Gt(){if(!bo&&gt!==null){bo=!0;var t=0,e=B;try{var r=gt;for(B=1;t<r.length;t++){var n=r[t];do n=n(!0);while(n!==null)}gt=null,Fi=!1}catch(s){throw gt!==null&&(gt=gt.slice(t+1)),Sd(rl,Gt),s}finally{B=e,bo=!1}}return null}var jr=[],Ir=0,fi=null,pi=0,De=[],Ue=0,dr=null,mt=1,vt="";function Zt(t,e){jr[Ir++]=pi,jr[Ir++]=fi,fi=t,pi=e}function Xd(t,e,r){De[Ue++]=mt,De[Ue++]=vt,De[Ue++]=dr,dr=t;var n=mt;t=vt;var s=32-Ye(n)-1;n&=~(1<<s),r+=1;var i=32-Ye(e)+s;if(30<i){var o=s-s%5;i=(n&(1<<o)-1).toString(32),n>>=o,s-=o,mt=1<<32-Ye(e)+s|r<<s|n,vt=i+t}else mt=1<<i|r<<s|n,vt=t}function dl(t){t.return!==null&&(Zt(t,1),Xd(t,1,0))}function hl(t){for(;t===fi;)fi=jr[--Ir],jr[Ir]=null,pi=jr[--Ir],jr[Ir]=null;for(;t===dr;)dr=De[--Ue],De[Ue]=null,vt=De[--Ue],De[Ue]=null,mt=De[--Ue],De[Ue]=null}var je=null,Oe=null,V=!1,Je=null;function Zd(t,e){var r=ze(5,null,null,0);r.elementType="DELETED",r.stateNode=e,r.return=t,e=t.deletions,e===null?(t.deletions=[r],t.flags|=16):e.push(r)}function Eu(t,e){switch(t.tag){case 5:var r=t.type;return e=e.nodeType!==1||r.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,je=t,Oe=zt(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,je=t,Oe=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(r=dr!==null?{id:mt,overflow:vt}:null,t.memoizedState={dehydrated:e,treeContext:r,retryLane:1073741824},r=ze(18,null,null,0),r.stateNode=e,r.return=t,t.child=r,je=t,Oe=null,!0):!1;default:return!1}}function pa(t){return(t.mode&1)!==0&&(t.flags&128)===0}function ga(t){if(V){var e=Oe;if(e){var r=e;if(!Eu(t,e)){if(pa(t))throw Error(x(418));e=zt(r.nextSibling);var n=je;e&&Eu(t,e)?Zd(n,r):(t.flags=t.flags&-4097|2,V=!1,je=t)}}else{if(pa(t))throw Error(x(418));t.flags=t.flags&-4097|2,V=!1,je=t}}}function Tu(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;je=t}function xs(t){if(t!==je)return!1;if(!V)return Tu(t),V=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!ca(t.type,t.memoizedProps)),e&&(e=Oe)){if(pa(t))throw eh(),Error(x(418));for(;e;)Zd(t,e),e=zt(e.nextSibling)}if(Tu(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(x(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var r=t.data;if(r==="/$"){if(e===0){Oe=zt(t.nextSibling);break e}e--}else r!=="$"&&r!=="$!"&&r!=="$?"||e++}t=t.nextSibling}Oe=null}}else Oe=je?zt(t.stateNode.nextSibling):null;return!0}function eh(){for(var t=Oe;t;)t=zt(t.nextSibling)}function Jr(){Oe=je=null,V=!1}function fl(t){Je===null?Je=[t]:Je.push(t)}var Ig=Et.ReactCurrentBatchConfig;function hn(t,e,r){if(t=r.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(x(309));var n=r.stateNode}if(!n)throw Error(x(147,t));var s=n,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var a=s.refs;o===null?delete a[i]:a[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(x(284));if(!r._owner)throw Error(x(290,t))}return t}function Cs(t,e){throw t=Object.prototype.toString.call(e),Error(x(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function xu(t){var e=t._init;return e(t._payload)}function th(t){function e(g,p){if(t){var y=g.deletions;y===null?(g.deletions=[p],g.flags|=16):y.push(p)}}function r(g,p){if(!t)return null;for(;p!==null;)e(g,p),p=p.sibling;return null}function n(g,p){for(g=new Map;p!==null;)p.key!==null?g.set(p.key,p):g.set(p.index,p),p=p.sibling;return g}function s(g,p){return g=Ht(g,p),g.index=0,g.sibling=null,g}function i(g,p,y){return g.index=y,t?(y=g.alternate,y!==null?(y=y.index,y<p?(g.flags|=2,p):y):(g.flags|=2,p)):(g.flags|=1048576,p)}function o(g){return t&&g.alternate===null&&(g.flags|=2),g}function a(g,p,y,_){return p===null||p.tag!==6?(p=Ao(y,g.mode,_),p.return=g,p):(p=s(p,y),p.return=g,p)}function l(g,p,y,_){var b=y.type;return b===xr?d(g,p,y.props.children,_,y.key):p!==null&&(p.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===xt&&xu(b)===p.type)?(_=s(p,y.props),_.ref=hn(g,p,y),_.return=g,_):(_=Ys(y.type,y.key,y.props,null,g.mode,_),_.ref=hn(g,p,y),_.return=g,_)}function u(g,p,y,_){return p===null||p.tag!==4||p.stateNode.containerInfo!==y.containerInfo||p.stateNode.implementation!==y.implementation?(p=Oo(y,g.mode,_),p.return=g,p):(p=s(p,y.children||[]),p.return=g,p)}function d(g,p,y,_,b){return p===null||p.tag!==7?(p=ur(y,g.mode,_,b),p.return=g,p):(p=s(p,y),p.return=g,p)}function c(g,p,y){if(typeof p=="string"&&p!==""||typeof p=="number")return p=Ao(""+p,g.mode,y),p.return=g,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case ys:return y=Ys(p.type,p.key,p.props,null,g.mode,y),y.ref=hn(g,null,p),y.return=g,y;case Tr:return p=Oo(p,g.mode,y),p.return=g,p;case xt:var _=p._init;return c(g,_(p._payload),y)}if(mn(p)||an(p))return p=ur(p,g.mode,y,null),p.return=g,p;Cs(g,p)}return null}function h(g,p,y,_){var b=p!==null?p.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return b!==null?null:a(g,p,""+y,_);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case ys:return y.key===b?l(g,p,y,_):null;case Tr:return y.key===b?u(g,p,y,_):null;case xt:return b=y._init,h(g,p,b(y._payload),_)}if(mn(y)||an(y))return b!==null?null:d(g,p,y,_,null);Cs(g,y)}return null}function f(g,p,y,_,b){if(typeof _=="string"&&_!==""||typeof _=="number")return g=g.get(y)||null,a(p,g,""+_,b);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case ys:return g=g.get(_.key===null?y:_.key)||null,l(p,g,_,b);case Tr:return g=g.get(_.key===null?y:_.key)||null,u(p,g,_,b);case xt:var E=_._init;return f(g,p,y,E(_._payload),b)}if(mn(_)||an(_))return g=g.get(y)||null,d(p,g,_,b,null);Cs(p,_)}return null}function m(g,p,y,_){for(var b=null,E=null,T=p,R=p=0,N=null;T!==null&&R<y.length;R++){T.index>R?(N=T,T=null):N=T.sibling;var $=h(g,T,y[R],_);if($===null){T===null&&(T=N);break}t&&T&&$.alternate===null&&e(g,T),p=i($,p,R),E===null?b=$:E.sibling=$,E=$,T=N}if(R===y.length)return r(g,T),V&&Zt(g,R),b;if(T===null){for(;R<y.length;R++)T=c(g,y[R],_),T!==null&&(p=i(T,p,R),E===null?b=T:E.sibling=T,E=T);return V&&Zt(g,R),b}for(T=n(g,T);R<y.length;R++)N=f(T,g,R,y[R],_),N!==null&&(t&&N.alternate!==null&&T.delete(N.key===null?R:N.key),p=i(N,p,R),E===null?b=N:E.sibling=N,E=N);return t&&T.forEach(function(me){return e(g,me)}),V&&Zt(g,R),b}function v(g,p,y,_){var b=an(y);if(typeof b!="function")throw Error(x(150));if(y=b.call(y),y==null)throw Error(x(151));for(var E=b=null,T=p,R=p=0,N=null,$=y.next();T!==null&&!$.done;R++,$=y.next()){T.index>R?(N=T,T=null):N=T.sibling;var me=h(g,T,$.value,_);if(me===null){T===null&&(T=N);break}t&&T&&me.alternate===null&&e(g,T),p=i(me,p,R),E===null?b=me:E.sibling=me,E=me,T=N}if($.done)return r(g,T),V&&Zt(g,R),b;if(T===null){for(;!$.done;R++,$=y.next())$=c(g,$.value,_),$!==null&&(p=i($,p,R),E===null?b=$:E.sibling=$,E=$);return V&&Zt(g,R),b}for(T=n(g,T);!$.done;R++,$=y.next())$=f(T,g,R,$.value,_),$!==null&&(t&&$.alternate!==null&&T.delete($.key===null?R:$.key),p=i($,p,R),E===null?b=$:E.sibling=$,E=$);return t&&T.forEach(function(Jt){return e(g,Jt)}),V&&Zt(g,R),b}function k(g,p,y,_){if(typeof y=="object"&&y!==null&&y.type===xr&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case ys:e:{for(var b=y.key,E=p;E!==null;){if(E.key===b){if(b=y.type,b===xr){if(E.tag===7){r(g,E.sibling),p=s(E,y.props.children),p.return=g,g=p;break e}}else if(E.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===xt&&xu(b)===E.type){r(g,E.sibling),p=s(E,y.props),p.ref=hn(g,E,y),p.return=g,g=p;break e}r(g,E);break}else e(g,E);E=E.sibling}y.type===xr?(p=ur(y.props.children,g.mode,_,y.key),p.return=g,g=p):(_=Ys(y.type,y.key,y.props,null,g.mode,_),_.ref=hn(g,p,y),_.return=g,g=_)}return o(g);case Tr:e:{for(E=y.key;p!==null;){if(p.key===E)if(p.tag===4&&p.stateNode.containerInfo===y.containerInfo&&p.stateNode.implementation===y.implementation){r(g,p.sibling),p=s(p,y.children||[]),p.return=g,g=p;break e}else{r(g,p);break}else e(g,p);p=p.sibling}p=Oo(y,g.mode,_),p.return=g,g=p}return o(g);case xt:return E=y._init,k(g,p,E(y._payload),_)}if(mn(y))return m(g,p,y,_);if(an(y))return v(g,p,y,_);Cs(g,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,p!==null&&p.tag===6?(r(g,p.sibling),p=s(p,y),p.return=g,g=p):(r(g,p),p=Ao(y,g.mode,_),p.return=g,g=p),o(g)):r(g,p)}return k}var Qr=th(!0),rh=th(!1),gi=Kt(null),yi=null,Nr=null,pl=null;function gl(){pl=Nr=yi=null}function yl(t){var e=gi.current;W(gi),t._currentValue=e}function ya(t,e,r){for(;t!==null;){var n=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,n!==null&&(n.childLanes|=e)):n!==null&&(n.childLanes&e)!==e&&(n.childLanes|=e),t===r)break;t=t.return}}function Hr(t,e){yi=t,pl=Nr=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Te=!0),t.firstContext=null)}function Me(t){var e=t._currentValue;if(pl!==t)if(t={context:t,memoizedValue:e,next:null},Nr===null){if(yi===null)throw Error(x(308));Nr=t,yi.dependencies={lanes:0,firstContext:t}}else Nr=Nr.next=t;return e}var sr=null;function ml(t){sr===null?sr=[t]:sr.push(t)}function nh(t,e,r,n){var s=e.interleaved;return s===null?(r.next=r,ml(e)):(r.next=s.next,s.next=r),e.interleaved=r,St(t,n)}function St(t,e){t.lanes|=e;var r=t.alternate;for(r!==null&&(r.lanes|=e),r=t,t=t.return;t!==null;)t.childLanes|=e,r=t.alternate,r!==null&&(r.childLanes|=e),r=t,t=t.return;return r.tag===3?r.stateNode:null}var Ct=!1;function vl(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function sh(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function wt(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Bt(t,e,r){var n=t.updateQueue;if(n===null)return null;if(n=n.shared,z&2){var s=n.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),n.pending=e,St(t,r)}return s=n.interleaved,s===null?(e.next=e,ml(n)):(e.next=s.next,s.next=e),n.interleaved=e,St(t,r)}function Vs(t,e,r){if(e=e.updateQueue,e!==null&&(e=e.shared,(r&4194240)!==0)){var n=e.lanes;n&=t.pendingLanes,r|=n,e.lanes=r,nl(t,r)}}function Cu(t,e){var r=t.updateQueue,n=t.alternate;if(n!==null&&(n=n.updateQueue,r===n)){var s=null,i=null;if(r=r.firstBaseUpdate,r!==null){do{var o={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};i===null?s=i=o:i=i.next=o,r=r.next}while(r!==null);i===null?s=i=e:i=i.next=e}else s=i=e;r={baseState:n.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:n.shared,effects:n.effects},t.updateQueue=r;return}t=r.lastBaseUpdate,t===null?r.firstBaseUpdate=e:t.next=e,r.lastBaseUpdate=e}function mi(t,e,r,n){var s=t.updateQueue;Ct=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,a=s.shared.pending;if(a!==null){s.shared.pending=null;var l=a,u=l.next;l.next=null,o===null?i=u:o.next=u,o=l;var d=t.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==o&&(a===null?d.firstBaseUpdate=u:a.next=u,d.lastBaseUpdate=l))}if(i!==null){var c=s.baseState;o=0,d=u=l=null,a=i;do{var h=a.lane,f=a.eventTime;if((n&h)===h){d!==null&&(d=d.next={eventTime:f,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var m=t,v=a;switch(h=e,f=r,v.tag){case 1:if(m=v.payload,typeof m=="function"){c=m.call(f,c,h);break e}c=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=v.payload,h=typeof m=="function"?m.call(f,c,h):m,h==null)break e;c=G({},c,h);break e;case 2:Ct=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,h=s.effects,h===null?s.effects=[a]:h.push(a))}else f={eventTime:f,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(u=d=f,l=c):d=d.next=f,o|=h;if(a=a.next,a===null){if(a=s.shared.pending,a===null)break;h=a,a=h.next,h.next=null,s.lastBaseUpdate=h,s.shared.pending=null}}while(!0);if(d===null&&(l=c),s.baseState=l,s.firstBaseUpdate=u,s.lastBaseUpdate=d,e=s.shared.interleaved,e!==null){s=e;do o|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);fr|=o,t.lanes=o,t.memoizedState=c}}function Ru(t,e,r){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var n=t[e],s=n.callback;if(s!==null){if(n.callback=null,n=r,typeof s!="function")throw Error(x(191,s));s.call(n)}}}var ds={},ot=Kt(ds),Vn=Kt(ds),qn=Kt(ds);function ir(t){if(t===ds)throw Error(x(174));return t}function wl(t,e){switch(F(qn,e),F(Vn,t),F(ot,ds),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Qo(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Qo(e,t)}W(ot),F(ot,e)}function Yr(){W(ot),W(Vn),W(qn)}function ih(t){ir(qn.current);var e=ir(ot.current),r=Qo(e,t.type);e!==r&&(F(Vn,t),F(ot,r))}function _l(t){Vn.current===t&&(W(ot),W(Vn))}var q=Kt(0);function vi(t){for(var e=t;e!==null;){if(e.tag===13){var r=e.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Eo=[];function kl(){for(var t=0;t<Eo.length;t++)Eo[t]._workInProgressVersionPrimary=null;Eo.length=0}var qs=Et.ReactCurrentDispatcher,To=Et.ReactCurrentBatchConfig,hr=0,K=null,re=null,oe=null,wi=!1,Rn=!1,Kn=0,Ng=0;function he(){throw Error(x(321))}function Sl(t,e){if(e===null)return!1;for(var r=0;r<e.length&&r<t.length;r++)if(!Ze(t[r],e[r]))return!1;return!0}function bl(t,e,r,n,s,i){if(hr=i,K=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,qs.current=t===null||t.memoizedState===null?Ug:zg,t=r(n,s),Rn){i=0;do{if(Rn=!1,Kn=0,25<=i)throw Error(x(301));i+=1,oe=re=null,e.updateQueue=null,qs.current=Bg,t=r(n,s)}while(Rn)}if(qs.current=_i,e=re!==null&&re.next!==null,hr=0,oe=re=K=null,wi=!1,e)throw Error(x(300));return t}function El(){var t=Kn!==0;return Kn=0,t}function tt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return oe===null?K.memoizedState=oe=t:oe=oe.next=t,oe}function Fe(){if(re===null){var t=K.alternate;t=t!==null?t.memoizedState:null}else t=re.next;var e=oe===null?K.memoizedState:oe.next;if(e!==null)oe=e,re=t;else{if(t===null)throw Error(x(310));re=t,t={memoizedState:re.memoizedState,baseState:re.baseState,baseQueue:re.baseQueue,queue:re.queue,next:null},oe===null?K.memoizedState=oe=t:oe=oe.next=t}return oe}function Gn(t,e){return typeof e=="function"?e(t):e}function xo(t){var e=Fe(),r=e.queue;if(r===null)throw Error(x(311));r.lastRenderedReducer=t;var n=re,s=n.baseQueue,i=r.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}n.baseQueue=s=i,r.pending=null}if(s!==null){i=s.next,n=n.baseState;var a=o=null,l=null,u=i;do{var d=u.lane;if((hr&d)===d)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),n=u.hasEagerState?u.eagerState:t(n,u.action);else{var c={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(a=l=c,o=n):l=l.next=c,K.lanes|=d,fr|=d}u=u.next}while(u!==null&&u!==i);l===null?o=n:l.next=a,Ze(n,e.memoizedState)||(Te=!0),e.memoizedState=n,e.baseState=o,e.baseQueue=l,r.lastRenderedState=n}if(t=r.interleaved,t!==null){s=t;do i=s.lane,K.lanes|=i,fr|=i,s=s.next;while(s!==t)}else s===null&&(r.lanes=0);return[e.memoizedState,r.dispatch]}function Co(t){var e=Fe(),r=e.queue;if(r===null)throw Error(x(311));r.lastRenderedReducer=t;var n=r.dispatch,s=r.pending,i=e.memoizedState;if(s!==null){r.pending=null;var o=s=s.next;do i=t(i,o.action),o=o.next;while(o!==s);Ze(i,e.memoizedState)||(Te=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),r.lastRenderedState=i}return[i,n]}function oh(){}function ah(t,e){var r=K,n=Fe(),s=e(),i=!Ze(n.memoizedState,s);if(i&&(n.memoizedState=s,Te=!0),n=n.queue,Tl(ch.bind(null,r,n,t),[t]),n.getSnapshot!==e||i||oe!==null&&oe.memoizedState.tag&1){if(r.flags|=2048,Jn(9,uh.bind(null,r,n,s,e),void 0,null),ae===null)throw Error(x(349));hr&30||lh(r,e,s)}return s}function lh(t,e,r){t.flags|=16384,t={getSnapshot:e,value:r},e=K.updateQueue,e===null?(e={lastEffect:null,stores:null},K.updateQueue=e,e.stores=[t]):(r=e.stores,r===null?e.stores=[t]:r.push(t))}function uh(t,e,r,n){e.value=r,e.getSnapshot=n,dh(e)&&hh(t)}function ch(t,e,r){return r(function(){dh(e)&&hh(t)})}function dh(t){var e=t.getSnapshot;t=t.value;try{var r=e();return!Ze(t,r)}catch{return!0}}function hh(t){var e=St(t,1);e!==null&&Xe(e,t,1,-1)}function Pu(t){var e=tt();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Gn,lastRenderedState:t},e.queue=t,t=t.dispatch=Dg.bind(null,K,t),[e.memoizedState,t]}function Jn(t,e,r,n){return t={tag:t,create:e,destroy:r,deps:n,next:null},e=K.updateQueue,e===null?(e={lastEffect:null,stores:null},K.updateQueue=e,e.lastEffect=t.next=t):(r=e.lastEffect,r===null?e.lastEffect=t.next=t:(n=r.next,r.next=t,t.next=n,e.lastEffect=t)),t}function fh(){return Fe().memoizedState}function Ks(t,e,r,n){var s=tt();K.flags|=t,s.memoizedState=Jn(1|e,r,void 0,n===void 0?null:n)}function Hi(t,e,r,n){var s=Fe();n=n===void 0?null:n;var i=void 0;if(re!==null){var o=re.memoizedState;if(i=o.destroy,n!==null&&Sl(n,o.deps)){s.memoizedState=Jn(e,r,i,n);return}}K.flags|=t,s.memoizedState=Jn(1|e,r,i,n)}function Au(t,e){return Ks(8390656,8,t,e)}function Tl(t,e){return Hi(2048,8,t,e)}function ph(t,e){return Hi(4,2,t,e)}function gh(t,e){return Hi(4,4,t,e)}function yh(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function mh(t,e,r){return r=r!=null?r.concat([t]):null,Hi(4,4,yh.bind(null,e,t),r)}function xl(){}function vh(t,e){var r=Fe();e=e===void 0?null:e;var n=r.memoizedState;return n!==null&&e!==null&&Sl(e,n[1])?n[0]:(r.memoizedState=[t,e],t)}function wh(t,e){var r=Fe();e=e===void 0?null:e;var n=r.memoizedState;return n!==null&&e!==null&&Sl(e,n[1])?n[0]:(t=t(),r.memoizedState=[t,e],t)}function _h(t,e,r){return hr&21?(Ze(r,e)||(r=Td(),K.lanes|=r,fr|=r,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Te=!0),t.memoizedState=r)}function $g(t,e){var r=B;B=r!==0&&4>r?r:4,t(!0);var n=To.transition;To.transition={};try{t(!1),e()}finally{B=r,To.transition=n}}function kh(){return Fe().memoizedState}function Lg(t,e,r){var n=Ft(t);if(r={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null},Sh(t))bh(e,r);else if(r=nh(t,e,r,n),r!==null){var s=we();Xe(r,t,n,s),Eh(r,e,n)}}function Dg(t,e,r){var n=Ft(t),s={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null};if(Sh(t))bh(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,a=i(o,r);if(s.hasEagerState=!0,s.eagerState=a,Ze(a,o)){var l=e.interleaved;l===null?(s.next=s,ml(e)):(s.next=l.next,l.next=s),e.interleaved=s;return}}catch{}finally{}r=nh(t,e,s,n),r!==null&&(s=we(),Xe(r,t,n,s),Eh(r,e,n))}}function Sh(t){var e=t.alternate;return t===K||e!==null&&e===K}function bh(t,e){Rn=wi=!0;var r=t.pending;r===null?e.next=e:(e.next=r.next,r.next=e),t.pending=e}function Eh(t,e,r){if(r&4194240){var n=e.lanes;n&=t.pendingLanes,r|=n,e.lanes=r,nl(t,r)}}var _i={readContext:Me,useCallback:he,useContext:he,useEffect:he,useImperativeHandle:he,useInsertionEffect:he,useLayoutEffect:he,useMemo:he,useReducer:he,useRef:he,useState:he,useDebugValue:he,useDeferredValue:he,useTransition:he,useMutableSource:he,useSyncExternalStore:he,useId:he,unstable_isNewReconciler:!1},Ug={readContext:Me,useCallback:function(t,e){return tt().memoizedState=[t,e===void 0?null:e],t},useContext:Me,useEffect:Au,useImperativeHandle:function(t,e,r){return r=r!=null?r.concat([t]):null,Ks(4194308,4,yh.bind(null,e,t),r)},useLayoutEffect:function(t,e){return Ks(4194308,4,t,e)},useInsertionEffect:function(t,e){return Ks(4,2,t,e)},useMemo:function(t,e){var r=tt();return e=e===void 0?null:e,t=t(),r.memoizedState=[t,e],t},useReducer:function(t,e,r){var n=tt();return e=r!==void 0?r(e):e,n.memoizedState=n.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},n.queue=t,t=t.dispatch=Lg.bind(null,K,t),[n.memoizedState,t]},useRef:function(t){var e=tt();return t={current:t},e.memoizedState=t},useState:Pu,useDebugValue:xl,useDeferredValue:function(t){return tt().memoizedState=t},useTransition:function(){var t=Pu(!1),e=t[0];return t=$g.bind(null,t[1]),tt().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,r){var n=K,s=tt();if(V){if(r===void 0)throw Error(x(407));r=r()}else{if(r=e(),ae===null)throw Error(x(349));hr&30||lh(n,e,r)}s.memoizedState=r;var i={value:r,getSnapshot:e};return s.queue=i,Au(ch.bind(null,n,i,t),[t]),n.flags|=2048,Jn(9,uh.bind(null,n,i,r,e),void 0,null),r},useId:function(){var t=tt(),e=ae.identifierPrefix;if(V){var r=vt,n=mt;r=(n&~(1<<32-Ye(n)-1)).toString(32)+r,e=":"+e+"R"+r,r=Kn++,0<r&&(e+="H"+r.toString(32)),e+=":"}else r=Ng++,e=":"+e+"r"+r.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},zg={readContext:Me,useCallback:vh,useContext:Me,useEffect:Tl,useImperativeHandle:mh,useInsertionEffect:ph,useLayoutEffect:gh,useMemo:wh,useReducer:xo,useRef:fh,useState:function(){return xo(Gn)},useDebugValue:xl,useDeferredValue:function(t){var e=Fe();return _h(e,re.memoizedState,t)},useTransition:function(){var t=xo(Gn)[0],e=Fe().memoizedState;return[t,e]},useMutableSource:oh,useSyncExternalStore:ah,useId:kh,unstable_isNewReconciler:!1},Bg={readContext:Me,useCallback:vh,useContext:Me,useEffect:Tl,useImperativeHandle:mh,useInsertionEffect:ph,useLayoutEffect:gh,useMemo:wh,useReducer:Co,useRef:fh,useState:function(){return Co(Gn)},useDebugValue:xl,useDeferredValue:function(t){var e=Fe();return re===null?e.memoizedState=t:_h(e,re.memoizedState,t)},useTransition:function(){var t=Co(Gn)[0],e=Fe().memoizedState;return[t,e]},useMutableSource:oh,useSyncExternalStore:ah,useId:kh,unstable_isNewReconciler:!1};function qe(t,e){if(t&&t.defaultProps){e=G({},e),t=t.defaultProps;for(var r in t)e[r]===void 0&&(e[r]=t[r]);return e}return e}function ma(t,e,r,n){e=t.memoizedState,r=r(n,e),r=r==null?e:G({},e,r),t.memoizedState=r,t.lanes===0&&(t.updateQueue.baseState=r)}var Wi={isMounted:function(t){return(t=t._reactInternals)?yr(t)===t:!1},enqueueSetState:function(t,e,r){t=t._reactInternals;var n=we(),s=Ft(t),i=wt(n,s);i.payload=e,r!=null&&(i.callback=r),e=Bt(t,i,s),e!==null&&(Xe(e,t,s,n),Vs(e,t,s))},enqueueReplaceState:function(t,e,r){t=t._reactInternals;var n=we(),s=Ft(t),i=wt(n,s);i.tag=1,i.payload=e,r!=null&&(i.callback=r),e=Bt(t,i,s),e!==null&&(Xe(e,t,s,n),Vs(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var r=we(),n=Ft(t),s=wt(r,n);s.tag=2,e!=null&&(s.callback=e),e=Bt(t,s,n),e!==null&&(Xe(e,t,n,r),Vs(e,t,n))}};function Ou(t,e,r,n,s,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(n,i,o):e.prototype&&e.prototype.isPureReactComponent?!Mn(r,n)||!Mn(s,i):!0}function Th(t,e,r){var n=!1,s=Vt,i=e.contextType;return typeof i=="object"&&i!==null?i=Me(i):(s=Ce(e)?cr:ye.current,n=e.contextTypes,i=(n=n!=null)?Gr(t,s):Vt),e=new e(r,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Wi,t.stateNode=e,e._reactInternals=t,n&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function ju(t,e,r,n){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(r,n),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(r,n),e.state!==t&&Wi.enqueueReplaceState(e,e.state,null)}function va(t,e,r,n){var s=t.stateNode;s.props=r,s.state=t.memoizedState,s.refs={},vl(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=Me(i):(i=Ce(e)?cr:ye.current,s.context=Gr(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(ma(t,e,i,r),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&Wi.enqueueReplaceState(s,s.state,null),mi(t,r,s,n),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function Xr(t,e){try{var r="",n=e;do r+=pp(n),n=n.return;while(n);var s=r}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function Ro(t,e,r){return{value:t,source:null,stack:r??null,digest:e??null}}function wa(t,e){try{console.error(e.value)}catch(r){setTimeout(function(){throw r})}}var Mg=typeof WeakMap=="function"?WeakMap:Map;function xh(t,e,r){r=wt(-1,r),r.tag=3,r.payload={element:null};var n=e.value;return r.callback=function(){Si||(Si=!0,Pa=n),wa(t,e)},r}function Ch(t,e,r){r=wt(-1,r),r.tag=3;var n=t.type.getDerivedStateFromError;if(typeof n=="function"){var s=e.value;r.payload=function(){return n(s)},r.callback=function(){wa(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(r.callback=function(){wa(t,e),typeof n!="function"&&(Mt===null?Mt=new Set([this]):Mt.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),r}function Iu(t,e,r){var n=t.pingCache;if(n===null){n=t.pingCache=new Mg;var s=new Set;n.set(e,s)}else s=n.get(e),s===void 0&&(s=new Set,n.set(e,s));s.has(r)||(s.add(r),t=ty.bind(null,t,e,r),e.then(t,t))}function Nu(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function $u(t,e,r,n,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(e=wt(-1,1),e.tag=2,Bt(r,e,1))),r.lanes|=1),t)}var Fg=Et.ReactCurrentOwner,Te=!1;function ve(t,e,r,n){e.child=t===null?rh(e,null,r,n):Qr(e,t.child,r,n)}function Lu(t,e,r,n,s){r=r.render;var i=e.ref;return Hr(e,s),n=bl(t,e,r,n,i,s),r=El(),t!==null&&!Te?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,bt(t,e,s)):(V&&r&&dl(e),e.flags|=1,ve(t,e,n,s),e.child)}function Du(t,e,r,n,s){if(t===null){var i=r.type;return typeof i=="function"&&!Nl(i)&&i.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(e.tag=15,e.type=i,Rh(t,e,i,n,s)):(t=Ys(r.type,null,n,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var o=i.memoizedProps;if(r=r.compare,r=r!==null?r:Mn,r(o,n)&&t.ref===e.ref)return bt(t,e,s)}return e.flags|=1,t=Ht(i,n),t.ref=e.ref,t.return=e,e.child=t}function Rh(t,e,r,n,s){if(t!==null){var i=t.memoizedProps;if(Mn(i,n)&&t.ref===e.ref)if(Te=!1,e.pendingProps=n=i,(t.lanes&s)!==0)t.flags&131072&&(Te=!0);else return e.lanes=t.lanes,bt(t,e,s)}return _a(t,e,r,n,s)}function Ph(t,e,r){var n=e.pendingProps,s=n.children,i=t!==null?t.memoizedState:null;if(n.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},F(Lr,Pe),Pe|=r;else{if(!(r&1073741824))return t=i!==null?i.baseLanes|r:r,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,F(Lr,Pe),Pe|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=i!==null?i.baseLanes:r,F(Lr,Pe),Pe|=n}else i!==null?(n=i.baseLanes|r,e.memoizedState=null):n=r,F(Lr,Pe),Pe|=n;return ve(t,e,s,r),e.child}function Ah(t,e){var r=e.ref;(t===null&&r!==null||t!==null&&t.ref!==r)&&(e.flags|=512,e.flags|=2097152)}function _a(t,e,r,n,s){var i=Ce(r)?cr:ye.current;return i=Gr(e,i),Hr(e,s),r=bl(t,e,r,n,i,s),n=El(),t!==null&&!Te?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,bt(t,e,s)):(V&&n&&dl(e),e.flags|=1,ve(t,e,r,s),e.child)}function Uu(t,e,r,n,s){if(Ce(r)){var i=!0;hi(e)}else i=!1;if(Hr(e,s),e.stateNode===null)Gs(t,e),Th(e,r,n),va(e,r,n,s),n=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,u=r.contextType;typeof u=="object"&&u!==null?u=Me(u):(u=Ce(r)?cr:ye.current,u=Gr(e,u));var d=r.getDerivedStateFromProps,c=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";c||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==n||l!==u)&&ju(e,o,n,u),Ct=!1;var h=e.memoizedState;o.state=h,mi(e,n,o,s),l=e.memoizedState,a!==n||h!==l||xe.current||Ct?(typeof d=="function"&&(ma(e,r,d,n),l=e.memoizedState),(a=Ct||Ou(e,r,a,n,h,l,u))?(c||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=n,e.memoizedState=l),o.props=n,o.state=l,o.context=u,n=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),n=!1)}else{o=e.stateNode,sh(t,e),a=e.memoizedProps,u=e.type===e.elementType?a:qe(e.type,a),o.props=u,c=e.pendingProps,h=o.context,l=r.contextType,typeof l=="object"&&l!==null?l=Me(l):(l=Ce(r)?cr:ye.current,l=Gr(e,l));var f=r.getDerivedStateFromProps;(d=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==c||h!==l)&&ju(e,o,n,l),Ct=!1,h=e.memoizedState,o.state=h,mi(e,n,o,s);var m=e.memoizedState;a!==c||h!==m||xe.current||Ct?(typeof f=="function"&&(ma(e,r,f,n),m=e.memoizedState),(u=Ct||Ou(e,r,u,n,h,m,l)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(n,m,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(n,m,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=n,e.memoizedState=m),o.props=n,o.state=m,o.context=l,n=u):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),n=!1)}return ka(t,e,r,n,i,s)}function ka(t,e,r,n,s,i){Ah(t,e);var o=(e.flags&128)!==0;if(!n&&!o)return s&&bu(e,r,!1),bt(t,e,i);n=e.stateNode,Fg.current=e;var a=o&&typeof r.getDerivedStateFromError!="function"?null:n.render();return e.flags|=1,t!==null&&o?(e.child=Qr(e,t.child,null,i),e.child=Qr(e,null,a,i)):ve(t,e,a,i),e.memoizedState=n.state,s&&bu(e,r,!0),e.child}function Oh(t){var e=t.stateNode;e.pendingContext?Su(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Su(t,e.context,!1),wl(t,e.containerInfo)}function zu(t,e,r,n,s){return Jr(),fl(s),e.flags|=256,ve(t,e,r,n),e.child}var Sa={dehydrated:null,treeContext:null,retryLane:0};function ba(t){return{baseLanes:t,cachePool:null,transitions:null}}function jh(t,e,r){var n=e.pendingProps,s=q.current,i=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(s&2)!==0),a?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),F(q,s&1),t===null)return ga(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=n.children,t=n.fallback,i?(n=e.mode,i=e.child,o={mode:"hidden",children:o},!(n&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=Ki(o,n,0,null),t=ur(t,n,r,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=ba(r),e.memoizedState=Sa,t):Cl(e,o));if(s=t.memoizedState,s!==null&&(a=s.dehydrated,a!==null))return Hg(t,e,o,n,a,s,r);if(i){i=n.fallback,o=e.mode,s=t.child,a=s.sibling;var l={mode:"hidden",children:n.children};return!(o&1)&&e.child!==s?(n=e.child,n.childLanes=0,n.pendingProps=l,e.deletions=null):(n=Ht(s,l),n.subtreeFlags=s.subtreeFlags&14680064),a!==null?i=Ht(a,i):(i=ur(i,o,r,null),i.flags|=2),i.return=e,n.return=e,n.sibling=i,e.child=n,n=i,i=e.child,o=t.child.memoizedState,o=o===null?ba(r):{baseLanes:o.baseLanes|r,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~r,e.memoizedState=Sa,n}return i=t.child,t=i.sibling,n=Ht(i,{mode:"visible",children:n.children}),!(e.mode&1)&&(n.lanes=r),n.return=e,n.sibling=null,t!==null&&(r=e.deletions,r===null?(e.deletions=[t],e.flags|=16):r.push(t)),e.child=n,e.memoizedState=null,n}function Cl(t,e){return e=Ki({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Rs(t,e,r,n){return n!==null&&fl(n),Qr(e,t.child,null,r),t=Cl(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Hg(t,e,r,n,s,i,o){if(r)return e.flags&256?(e.flags&=-257,n=Ro(Error(x(422))),Rs(t,e,o,n)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=n.fallback,s=e.mode,n=Ki({mode:"visible",children:n.children},s,0,null),i=ur(i,s,o,null),i.flags|=2,n.return=e,i.return=e,n.sibling=i,e.child=n,e.mode&1&&Qr(e,t.child,null,o),e.child.memoizedState=ba(o),e.memoizedState=Sa,i);if(!(e.mode&1))return Rs(t,e,o,null);if(s.data==="$!"){if(n=s.nextSibling&&s.nextSibling.dataset,n)var a=n.dgst;return n=a,i=Error(x(419)),n=Ro(i,n,void 0),Rs(t,e,o,n)}if(a=(o&t.childLanes)!==0,Te||a){if(n=ae,n!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(n.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,St(t,s),Xe(n,t,s,-1))}return Il(),n=Ro(Error(x(421))),Rs(t,e,o,n)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=ry.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,Oe=zt(s.nextSibling),je=e,V=!0,Je=null,t!==null&&(De[Ue++]=mt,De[Ue++]=vt,De[Ue++]=dr,mt=t.id,vt=t.overflow,dr=e),e=Cl(e,n.children),e.flags|=4096,e)}function Bu(t,e,r){t.lanes|=e;var n=t.alternate;n!==null&&(n.lanes|=e),ya(t.return,e,r)}function Po(t,e,r,n,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=n,i.tail=r,i.tailMode=s)}function Ih(t,e,r){var n=e.pendingProps,s=n.revealOrder,i=n.tail;if(ve(t,e,n.children,r),n=q.current,n&2)n=n&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Bu(t,r,e);else if(t.tag===19)Bu(t,r,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}n&=1}if(F(q,n),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(r=e.child,s=null;r!==null;)t=r.alternate,t!==null&&vi(t)===null&&(s=r),r=r.sibling;r=s,r===null?(s=e.child,e.child=null):(s=r.sibling,r.sibling=null),Po(e,!1,s,r,i);break;case"backwards":for(r=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&vi(t)===null){e.child=s;break}t=s.sibling,s.sibling=r,r=s,s=t}Po(e,!0,r,null,i);break;case"together":Po(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Gs(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function bt(t,e,r){if(t!==null&&(e.dependencies=t.dependencies),fr|=e.lanes,!(r&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(x(153));if(e.child!==null){for(t=e.child,r=Ht(t,t.pendingProps),e.child=r,r.return=e;t.sibling!==null;)t=t.sibling,r=r.sibling=Ht(t,t.pendingProps),r.return=e;r.sibling=null}return e.child}function Wg(t,e,r){switch(e.tag){case 3:Oh(e),Jr();break;case 5:ih(e);break;case 1:Ce(e.type)&&hi(e);break;case 4:wl(e,e.stateNode.containerInfo);break;case 10:var n=e.type._context,s=e.memoizedProps.value;F(gi,n._currentValue),n._currentValue=s;break;case 13:if(n=e.memoizedState,n!==null)return n.dehydrated!==null?(F(q,q.current&1),e.flags|=128,null):r&e.child.childLanes?jh(t,e,r):(F(q,q.current&1),t=bt(t,e,r),t!==null?t.sibling:null);F(q,q.current&1);break;case 19:if(n=(r&e.childLanes)!==0,t.flags&128){if(n)return Ih(t,e,r);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),F(q,q.current),n)break;return null;case 22:case 23:return e.lanes=0,Ph(t,e,r)}return bt(t,e,r)}var Nh,Ea,$h,Lh;Nh=function(t,e){for(var r=e.child;r!==null;){if(r.tag===5||r.tag===6)t.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break;for(;r.sibling===null;){if(r.return===null||r.return===e)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};Ea=function(){};$h=function(t,e,r,n){var s=t.memoizedProps;if(s!==n){t=e.stateNode,ir(ot.current);var i=null;switch(r){case"input":s=qo(t,s),n=qo(t,n),i=[];break;case"select":s=G({},s,{value:void 0}),n=G({},n,{value:void 0}),i=[];break;case"textarea":s=Jo(t,s),n=Jo(t,n),i=[];break;default:typeof s.onClick!="function"&&typeof n.onClick=="function"&&(t.onclick=ci)}Yo(r,n);var o;r=null;for(u in s)if(!n.hasOwnProperty(u)&&s.hasOwnProperty(u)&&s[u]!=null)if(u==="style"){var a=s[u];for(o in a)a.hasOwnProperty(o)&&(r||(r={}),r[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Nn.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in n){var l=n[u];if(a=s!=null?s[u]:void 0,n.hasOwnProperty(u)&&l!==a&&(l!=null||a!=null))if(u==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(r||(r={}),r[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(r||(r={}),r[o]=l[o])}else r||(i||(i=[]),i.push(u,r)),r=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(i=i||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(i=i||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Nn.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&H("scroll",t),i||a===l||(i=[])):(i=i||[]).push(u,l))}r&&(i=i||[]).push("style",r);var u=i;(e.updateQueue=u)&&(e.flags|=4)}};Lh=function(t,e,r,n){r!==n&&(e.flags|=4)};function fn(t,e){if(!V)switch(t.tailMode){case"hidden":e=t.tail;for(var r=null;e!==null;)e.alternate!==null&&(r=e),e=e.sibling;r===null?t.tail=null:r.sibling=null;break;case"collapsed":r=t.tail;for(var n=null;r!==null;)r.alternate!==null&&(n=r),r=r.sibling;n===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:n.sibling=null}}function fe(t){var e=t.alternate!==null&&t.alternate.child===t.child,r=0,n=0;if(e)for(var s=t.child;s!==null;)r|=s.lanes|s.childLanes,n|=s.subtreeFlags&14680064,n|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)r|=s.lanes|s.childLanes,n|=s.subtreeFlags,n|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=n,t.childLanes=r,e}function Vg(t,e,r){var n=e.pendingProps;switch(hl(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return fe(e),null;case 1:return Ce(e.type)&&di(),fe(e),null;case 3:return n=e.stateNode,Yr(),W(xe),W(ye),kl(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(xs(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Je!==null&&(ja(Je),Je=null))),Ea(t,e),fe(e),null;case 5:_l(e);var s=ir(qn.current);if(r=e.type,t!==null&&e.stateNode!=null)$h(t,e,r,n,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!n){if(e.stateNode===null)throw Error(x(166));return fe(e),null}if(t=ir(ot.current),xs(e)){n=e.stateNode,r=e.type;var i=e.memoizedProps;switch(n[st]=e,n[Wn]=i,t=(e.mode&1)!==0,r){case"dialog":H("cancel",n),H("close",n);break;case"iframe":case"object":case"embed":H("load",n);break;case"video":case"audio":for(s=0;s<wn.length;s++)H(wn[s],n);break;case"source":H("error",n);break;case"img":case"image":case"link":H("error",n),H("load",n);break;case"details":H("toggle",n);break;case"input":Jl(n,i),H("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!i.multiple},H("invalid",n);break;case"textarea":Yl(n,i),H("invalid",n)}Yo(r,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var a=i[o];o==="children"?typeof a=="string"?n.textContent!==a&&(i.suppressHydrationWarning!==!0&&Ts(n.textContent,a,t),s=["children",a]):typeof a=="number"&&n.textContent!==""+a&&(i.suppressHydrationWarning!==!0&&Ts(n.textContent,a,t),s=["children",""+a]):Nn.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&H("scroll",n)}switch(r){case"input":ms(n),Ql(n,i,!0);break;case"textarea":ms(n),Xl(n);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(n.onclick=ci)}n=s,e.updateQueue=n,n!==null&&(e.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=cd(r)),t==="http://www.w3.org/1999/xhtml"?r==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof n.is=="string"?t=o.createElement(r,{is:n.is}):(t=o.createElement(r),r==="select"&&(o=t,n.multiple?o.multiple=!0:n.size&&(o.size=n.size))):t=o.createElementNS(t,r),t[st]=e,t[Wn]=n,Nh(t,e,!1,!1),e.stateNode=t;e:{switch(o=Xo(r,n),r){case"dialog":H("cancel",t),H("close",t),s=n;break;case"iframe":case"object":case"embed":H("load",t),s=n;break;case"video":case"audio":for(s=0;s<wn.length;s++)H(wn[s],t);s=n;break;case"source":H("error",t),s=n;break;case"img":case"image":case"link":H("error",t),H("load",t),s=n;break;case"details":H("toggle",t),s=n;break;case"input":Jl(t,n),s=qo(t,n),H("invalid",t);break;case"option":s=n;break;case"select":t._wrapperState={wasMultiple:!!n.multiple},s=G({},n,{value:void 0}),H("invalid",t);break;case"textarea":Yl(t,n),s=Jo(t,n),H("invalid",t);break;default:s=n}Yo(r,s),a=s;for(i in a)if(a.hasOwnProperty(i)){var l=a[i];i==="style"?fd(t,l):i==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&dd(t,l)):i==="children"?typeof l=="string"?(r!=="textarea"||l!=="")&&$n(t,l):typeof l=="number"&&$n(t,""+l):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Nn.hasOwnProperty(i)?l!=null&&i==="onScroll"&&H("scroll",t):l!=null&&Ya(t,i,l,o))}switch(r){case"input":ms(t),Ql(t,n,!1);break;case"textarea":ms(t),Xl(t);break;case"option":n.value!=null&&t.setAttribute("value",""+Wt(n.value));break;case"select":t.multiple=!!n.multiple,i=n.value,i!=null?zr(t,!!n.multiple,i,!1):n.defaultValue!=null&&zr(t,!!n.multiple,n.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=ci)}switch(r){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return fe(e),null;case 6:if(t&&e.stateNode!=null)Lh(t,e,t.memoizedProps,n);else{if(typeof n!="string"&&e.stateNode===null)throw Error(x(166));if(r=ir(qn.current),ir(ot.current),xs(e)){if(n=e.stateNode,r=e.memoizedProps,n[st]=e,(i=n.nodeValue!==r)&&(t=je,t!==null))switch(t.tag){case 3:Ts(n.nodeValue,r,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Ts(n.nodeValue,r,(t.mode&1)!==0)}i&&(e.flags|=4)}else n=(r.nodeType===9?r:r.ownerDocument).createTextNode(n),n[st]=e,e.stateNode=n}return fe(e),null;case 13:if(W(q),n=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(V&&Oe!==null&&e.mode&1&&!(e.flags&128))eh(),Jr(),e.flags|=98560,i=!1;else if(i=xs(e),n!==null&&n.dehydrated!==null){if(t===null){if(!i)throw Error(x(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(x(317));i[st]=e}else Jr(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;fe(e),i=!1}else Je!==null&&(ja(Je),Je=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=r,e):(n=n!==null,n!==(t!==null&&t.memoizedState!==null)&&n&&(e.child.flags|=8192,e.mode&1&&(t===null||q.current&1?ne===0&&(ne=3):Il())),e.updateQueue!==null&&(e.flags|=4),fe(e),null);case 4:return Yr(),Ea(t,e),t===null&&Fn(e.stateNode.containerInfo),fe(e),null;case 10:return yl(e.type._context),fe(e),null;case 17:return Ce(e.type)&&di(),fe(e),null;case 19:if(W(q),i=e.memoizedState,i===null)return fe(e),null;if(n=(e.flags&128)!==0,o=i.rendering,o===null)if(n)fn(i,!1);else{if(ne!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=vi(t),o!==null){for(e.flags|=128,fn(i,!1),n=o.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),e.subtreeFlags=0,n=r,r=e.child;r!==null;)i=r,t=n,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),r=r.sibling;return F(q,q.current&1|2),e.child}t=t.sibling}i.tail!==null&&X()>Zr&&(e.flags|=128,n=!0,fn(i,!1),e.lanes=4194304)}else{if(!n)if(t=vi(o),t!==null){if(e.flags|=128,n=!0,r=t.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),fn(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!V)return fe(e),null}else 2*X()-i.renderingStartTime>Zr&&r!==1073741824&&(e.flags|=128,n=!0,fn(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(r=i.last,r!==null?r.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=X(),e.sibling=null,r=q.current,F(q,n?r&1|2:r&1),e):(fe(e),null);case 22:case 23:return jl(),n=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==n&&(e.flags|=8192),n&&e.mode&1?Pe&1073741824&&(fe(e),e.subtreeFlags&6&&(e.flags|=8192)):fe(e),null;case 24:return null;case 25:return null}throw Error(x(156,e.tag))}function qg(t,e){switch(hl(e),e.tag){case 1:return Ce(e.type)&&di(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Yr(),W(xe),W(ye),kl(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return _l(e),null;case 13:if(W(q),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(x(340));Jr()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return W(q),null;case 4:return Yr(),null;case 10:return yl(e.type._context),null;case 22:case 23:return jl(),null;case 24:return null;default:return null}}var Ps=!1,ge=!1,Kg=typeof WeakSet=="function"?WeakSet:Set,P=null;function $r(t,e){var r=t.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(n){Q(t,e,n)}else r.current=null}function Ta(t,e,r){try{r()}catch(n){Q(t,e,n)}}var Mu=!1;function Gg(t,e){if(la=ai,t=Md(),cl(t)){if("selectionStart"in t)var r={start:t.selectionStart,end:t.selectionEnd};else e:{r=(r=t.ownerDocument)&&r.defaultView||window;var n=r.getSelection&&r.getSelection();if(n&&n.rangeCount!==0){r=n.anchorNode;var s=n.anchorOffset,i=n.focusNode;n=n.focusOffset;try{r.nodeType,i.nodeType}catch{r=null;break e}var o=0,a=-1,l=-1,u=0,d=0,c=t,h=null;t:for(;;){for(var f;c!==r||s!==0&&c.nodeType!==3||(a=o+s),c!==i||n!==0&&c.nodeType!==3||(l=o+n),c.nodeType===3&&(o+=c.nodeValue.length),(f=c.firstChild)!==null;)h=c,c=f;for(;;){if(c===t)break t;if(h===r&&++u===s&&(a=o),h===i&&++d===n&&(l=o),(f=c.nextSibling)!==null)break;c=h,h=c.parentNode}c=f}r=a===-1||l===-1?null:{start:a,end:l}}else r=null}r=r||{start:0,end:0}}else r=null;for(ua={focusedElem:t,selectionRange:r},ai=!1,P=e;P!==null;)if(e=P,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,P=t;else for(;P!==null;){e=P;try{var m=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var v=m.memoizedProps,k=m.memoizedState,g=e.stateNode,p=g.getSnapshotBeforeUpdate(e.elementType===e.type?v:qe(e.type,v),k);g.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var y=e.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(x(163))}}catch(_){Q(e,e.return,_)}if(t=e.sibling,t!==null){t.return=e.return,P=t;break}P=e.return}return m=Mu,Mu=!1,m}function Pn(t,e,r){var n=e.updateQueue;if(n=n!==null?n.lastEffect:null,n!==null){var s=n=n.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&Ta(e,r,i)}s=s.next}while(s!==n)}}function Vi(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var r=e=e.next;do{if((r.tag&t)===t){var n=r.create;r.destroy=n()}r=r.next}while(r!==e)}}function xa(t){var e=t.ref;if(e!==null){var r=t.stateNode;switch(t.tag){case 5:t=r;break;default:t=r}typeof e=="function"?e(t):e.current=t}}function Dh(t){var e=t.alternate;e!==null&&(t.alternate=null,Dh(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[st],delete e[Wn],delete e[ha],delete e[Ag],delete e[Og])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Uh(t){return t.tag===5||t.tag===3||t.tag===4}function Fu(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Uh(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ca(t,e,r){var n=t.tag;if(n===5||n===6)t=t.stateNode,e?r.nodeType===8?r.parentNode.insertBefore(t,e):r.insertBefore(t,e):(r.nodeType===8?(e=r.parentNode,e.insertBefore(t,r)):(e=r,e.appendChild(t)),r=r._reactRootContainer,r!=null||e.onclick!==null||(e.onclick=ci));else if(n!==4&&(t=t.child,t!==null))for(Ca(t,e,r),t=t.sibling;t!==null;)Ca(t,e,r),t=t.sibling}function Ra(t,e,r){var n=t.tag;if(n===5||n===6)t=t.stateNode,e?r.insertBefore(t,e):r.appendChild(t);else if(n!==4&&(t=t.child,t!==null))for(Ra(t,e,r),t=t.sibling;t!==null;)Ra(t,e,r),t=t.sibling}var ue=null,Ge=!1;function Tt(t,e,r){for(r=r.child;r!==null;)zh(t,e,r),r=r.sibling}function zh(t,e,r){if(it&&typeof it.onCommitFiberUnmount=="function")try{it.onCommitFiberUnmount(Di,r)}catch{}switch(r.tag){case 5:ge||$r(r,e);case 6:var n=ue,s=Ge;ue=null,Tt(t,e,r),ue=n,Ge=s,ue!==null&&(Ge?(t=ue,r=r.stateNode,t.nodeType===8?t.parentNode.removeChild(r):t.removeChild(r)):ue.removeChild(r.stateNode));break;case 18:ue!==null&&(Ge?(t=ue,r=r.stateNode,t.nodeType===8?So(t.parentNode,r):t.nodeType===1&&So(t,r),zn(t)):So(ue,r.stateNode));break;case 4:n=ue,s=Ge,ue=r.stateNode.containerInfo,Ge=!0,Tt(t,e,r),ue=n,Ge=s;break;case 0:case 11:case 14:case 15:if(!ge&&(n=r.updateQueue,n!==null&&(n=n.lastEffect,n!==null))){s=n=n.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&Ta(r,e,o),s=s.next}while(s!==n)}Tt(t,e,r);break;case 1:if(!ge&&($r(r,e),n=r.stateNode,typeof n.componentWillUnmount=="function"))try{n.props=r.memoizedProps,n.state=r.memoizedState,n.componentWillUnmount()}catch(a){Q(r,e,a)}Tt(t,e,r);break;case 21:Tt(t,e,r);break;case 22:r.mode&1?(ge=(n=ge)||r.memoizedState!==null,Tt(t,e,r),ge=n):Tt(t,e,r);break;default:Tt(t,e,r)}}function Hu(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var r=t.stateNode;r===null&&(r=t.stateNode=new Kg),e.forEach(function(n){var s=ny.bind(null,t,n);r.has(n)||(r.add(n),n.then(s,s))})}}function He(t,e){var r=e.deletions;if(r!==null)for(var n=0;n<r.length;n++){var s=r[n];try{var i=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:ue=a.stateNode,Ge=!1;break e;case 3:ue=a.stateNode.containerInfo,Ge=!0;break e;case 4:ue=a.stateNode.containerInfo,Ge=!0;break e}a=a.return}if(ue===null)throw Error(x(160));zh(i,o,s),ue=null,Ge=!1;var l=s.alternate;l!==null&&(l.return=null),s.return=null}catch(u){Q(s,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Bh(e,t),e=e.sibling}function Bh(t,e){var r=t.alternate,n=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(He(e,t),et(t),n&4){try{Pn(3,t,t.return),Vi(3,t)}catch(v){Q(t,t.return,v)}try{Pn(5,t,t.return)}catch(v){Q(t,t.return,v)}}break;case 1:He(e,t),et(t),n&512&&r!==null&&$r(r,r.return);break;case 5:if(He(e,t),et(t),n&512&&r!==null&&$r(r,r.return),t.flags&32){var s=t.stateNode;try{$n(s,"")}catch(v){Q(t,t.return,v)}}if(n&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,o=r!==null?r.memoizedProps:i,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&i.type==="radio"&&i.name!=null&&ld(s,i),Xo(a,o);var u=Xo(a,i);for(o=0;o<l.length;o+=2){var d=l[o],c=l[o+1];d==="style"?fd(s,c):d==="dangerouslySetInnerHTML"?dd(s,c):d==="children"?$n(s,c):Ya(s,d,c,u)}switch(a){case"input":Ko(s,i);break;case"textarea":ud(s,i);break;case"select":var h=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var f=i.value;f!=null?zr(s,!!i.multiple,f,!1):h!==!!i.multiple&&(i.defaultValue!=null?zr(s,!!i.multiple,i.defaultValue,!0):zr(s,!!i.multiple,i.multiple?[]:"",!1))}s[Wn]=i}catch(v){Q(t,t.return,v)}}break;case 6:if(He(e,t),et(t),n&4){if(t.stateNode===null)throw Error(x(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(v){Q(t,t.return,v)}}break;case 3:if(He(e,t),et(t),n&4&&r!==null&&r.memoizedState.isDehydrated)try{zn(e.containerInfo)}catch(v){Q(t,t.return,v)}break;case 4:He(e,t),et(t);break;case 13:He(e,t),et(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(Al=X())),n&4&&Hu(t);break;case 22:if(d=r!==null&&r.memoizedState!==null,t.mode&1?(ge=(u=ge)||d,He(e,t),ge=u):He(e,t),et(t),n&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!d&&t.mode&1)for(P=t,d=t.child;d!==null;){for(c=P=d;P!==null;){switch(h=P,f=h.child,h.tag){case 0:case 11:case 14:case 15:Pn(4,h,h.return);break;case 1:$r(h,h.return);var m=h.stateNode;if(typeof m.componentWillUnmount=="function"){n=h,r=h.return;try{e=n,m.props=e.memoizedProps,m.state=e.memoizedState,m.componentWillUnmount()}catch(v){Q(n,r,v)}}break;case 5:$r(h,h.return);break;case 22:if(h.memoizedState!==null){Vu(c);continue}}f!==null?(f.return=h,P=f):Vu(c)}d=d.sibling}e:for(d=null,c=t;;){if(c.tag===5){if(d===null){d=c;try{s=c.stateNode,u?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(a=c.stateNode,l=c.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=hd("display",o))}catch(v){Q(t,t.return,v)}}}else if(c.tag===6){if(d===null)try{c.stateNode.nodeValue=u?"":c.memoizedProps}catch(v){Q(t,t.return,v)}}else if((c.tag!==22&&c.tag!==23||c.memoizedState===null||c===t)&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===t)break e;for(;c.sibling===null;){if(c.return===null||c.return===t)break e;d===c&&(d=null),c=c.return}d===c&&(d=null),c.sibling.return=c.return,c=c.sibling}}break;case 19:He(e,t),et(t),n&4&&Hu(t);break;case 21:break;default:He(e,t),et(t)}}function et(t){var e=t.flags;if(e&2){try{e:{for(var r=t.return;r!==null;){if(Uh(r)){var n=r;break e}r=r.return}throw Error(x(160))}switch(n.tag){case 5:var s=n.stateNode;n.flags&32&&($n(s,""),n.flags&=-33);var i=Fu(t);Ra(t,i,s);break;case 3:case 4:var o=n.stateNode.containerInfo,a=Fu(t);Ca(t,a,o);break;default:throw Error(x(161))}}catch(l){Q(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Jg(t,e,r){P=t,Mh(t)}function Mh(t,e,r){for(var n=(t.mode&1)!==0;P!==null;){var s=P,i=s.child;if(s.tag===22&&n){var o=s.memoizedState!==null||Ps;if(!o){var a=s.alternate,l=a!==null&&a.memoizedState!==null||ge;a=Ps;var u=ge;if(Ps=o,(ge=l)&&!u)for(P=s;P!==null;)o=P,l=o.child,o.tag===22&&o.memoizedState!==null?qu(s):l!==null?(l.return=o,P=l):qu(s);for(;i!==null;)P=i,Mh(i),i=i.sibling;P=s,Ps=a,ge=u}Wu(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,P=i):Wu(t)}}function Wu(t){for(;P!==null;){var e=P;if(e.flags&8772){var r=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:ge||Vi(5,e);break;case 1:var n=e.stateNode;if(e.flags&4&&!ge)if(r===null)n.componentDidMount();else{var s=e.elementType===e.type?r.memoizedProps:qe(e.type,r.memoizedProps);n.componentDidUpdate(s,r.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&Ru(e,i,n);break;case 3:var o=e.updateQueue;if(o!==null){if(r=null,e.child!==null)switch(e.child.tag){case 5:r=e.child.stateNode;break;case 1:r=e.child.stateNode}Ru(e,o,r)}break;case 5:var a=e.stateNode;if(r===null&&e.flags&4){r=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&r.focus();break;case"img":l.src&&(r.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var c=d.dehydrated;c!==null&&zn(c)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(x(163))}ge||e.flags&512&&xa(e)}catch(h){Q(e,e.return,h)}}if(e===t){P=null;break}if(r=e.sibling,r!==null){r.return=e.return,P=r;break}P=e.return}}function Vu(t){for(;P!==null;){var e=P;if(e===t){P=null;break}var r=e.sibling;if(r!==null){r.return=e.return,P=r;break}P=e.return}}function qu(t){for(;P!==null;){var e=P;try{switch(e.tag){case 0:case 11:case 15:var r=e.return;try{Vi(4,e)}catch(l){Q(e,r,l)}break;case 1:var n=e.stateNode;if(typeof n.componentDidMount=="function"){var s=e.return;try{n.componentDidMount()}catch(l){Q(e,s,l)}}var i=e.return;try{xa(e)}catch(l){Q(e,i,l)}break;case 5:var o=e.return;try{xa(e)}catch(l){Q(e,o,l)}}}catch(l){Q(e,e.return,l)}if(e===t){P=null;break}var a=e.sibling;if(a!==null){a.return=e.return,P=a;break}P=e.return}}var Qg=Math.ceil,ki=Et.ReactCurrentDispatcher,Rl=Et.ReactCurrentOwner,Be=Et.ReactCurrentBatchConfig,z=0,ae=null,ee=null,ce=0,Pe=0,Lr=Kt(0),ne=0,Qn=null,fr=0,qi=0,Pl=0,An=null,be=null,Al=0,Zr=1/0,ct=null,Si=!1,Pa=null,Mt=null,As=!1,It=null,bi=0,On=0,Aa=null,Js=-1,Qs=0;function we(){return z&6?X():Js!==-1?Js:Js=X()}function Ft(t){return t.mode&1?z&2&&ce!==0?ce&-ce:Ig.transition!==null?(Qs===0&&(Qs=Td()),Qs):(t=B,t!==0||(t=window.event,t=t===void 0?16:jd(t.type)),t):1}function Xe(t,e,r,n){if(50<On)throw On=0,Aa=null,Error(x(185));ls(t,r,n),(!(z&2)||t!==ae)&&(t===ae&&(!(z&2)&&(qi|=r),ne===4&&Pt(t,ce)),Re(t,n),r===1&&z===0&&!(e.mode&1)&&(Zr=X()+500,Fi&&Gt()))}function Re(t,e){var r=t.callbackNode;Ip(t,e);var n=oi(t,t===ae?ce:0);if(n===0)r!==null&&tu(r),t.callbackNode=null,t.callbackPriority=0;else if(e=n&-n,t.callbackPriority!==e){if(r!=null&&tu(r),e===1)t.tag===0?jg(Ku.bind(null,t)):Yd(Ku.bind(null,t)),Rg(function(){!(z&6)&&Gt()}),r=null;else{switch(xd(n)){case 1:r=rl;break;case 4:r=bd;break;case 16:r=ii;break;case 536870912:r=Ed;break;default:r=ii}r=Jh(r,Fh.bind(null,t))}t.callbackPriority=e,t.callbackNode=r}}function Fh(t,e){if(Js=-1,Qs=0,z&6)throw Error(x(327));var r=t.callbackNode;if(Wr()&&t.callbackNode!==r)return null;var n=oi(t,t===ae?ce:0);if(n===0)return null;if(n&30||n&t.expiredLanes||e)e=Ei(t,n);else{e=n;var s=z;z|=2;var i=Wh();(ae!==t||ce!==e)&&(ct=null,Zr=X()+500,lr(t,e));do try{Zg();break}catch(a){Hh(t,a)}while(!0);gl(),ki.current=i,z=s,ee!==null?e=0:(ae=null,ce=0,e=ne)}if(e!==0){if(e===2&&(s=na(t),s!==0&&(n=s,e=Oa(t,s))),e===1)throw r=Qn,lr(t,0),Pt(t,n),Re(t,X()),r;if(e===6)Pt(t,n);else{if(s=t.current.alternate,!(n&30)&&!Yg(s)&&(e=Ei(t,n),e===2&&(i=na(t),i!==0&&(n=i,e=Oa(t,i))),e===1))throw r=Qn,lr(t,0),Pt(t,n),Re(t,X()),r;switch(t.finishedWork=s,t.finishedLanes=n,e){case 0:case 1:throw Error(x(345));case 2:er(t,be,ct);break;case 3:if(Pt(t,n),(n&130023424)===n&&(e=Al+500-X(),10<e)){if(oi(t,0)!==0)break;if(s=t.suspendedLanes,(s&n)!==n){we(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=da(er.bind(null,t,be,ct),e);break}er(t,be,ct);break;case 4:if(Pt(t,n),(n&4194240)===n)break;for(e=t.eventTimes,s=-1;0<n;){var o=31-Ye(n);i=1<<o,o=e[o],o>s&&(s=o),n&=~i}if(n=s,n=X()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*Qg(n/1960))-n,10<n){t.timeoutHandle=da(er.bind(null,t,be,ct),n);break}er(t,be,ct);break;case 5:er(t,be,ct);break;default:throw Error(x(329))}}}return Re(t,X()),t.callbackNode===r?Fh.bind(null,t):null}function Oa(t,e){var r=An;return t.current.memoizedState.isDehydrated&&(lr(t,e).flags|=256),t=Ei(t,e),t!==2&&(e=be,be=r,e!==null&&ja(e)),t}function ja(t){be===null?be=t:be.push.apply(be,t)}function Yg(t){for(var e=t;;){if(e.flags&16384){var r=e.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var n=0;n<r.length;n++){var s=r[n],i=s.getSnapshot;s=s.value;try{if(!Ze(i(),s))return!1}catch{return!1}}}if(r=e.child,e.subtreeFlags&16384&&r!==null)r.return=e,e=r;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Pt(t,e){for(e&=~Pl,e&=~qi,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var r=31-Ye(e),n=1<<r;t[r]=-1,e&=~n}}function Ku(t){if(z&6)throw Error(x(327));Wr();var e=oi(t,0);if(!(e&1))return Re(t,X()),null;var r=Ei(t,e);if(t.tag!==0&&r===2){var n=na(t);n!==0&&(e=n,r=Oa(t,n))}if(r===1)throw r=Qn,lr(t,0),Pt(t,e),Re(t,X()),r;if(r===6)throw Error(x(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,er(t,be,ct),Re(t,X()),null}function Ol(t,e){var r=z;z|=1;try{return t(e)}finally{z=r,z===0&&(Zr=X()+500,Fi&&Gt())}}function pr(t){It!==null&&It.tag===0&&!(z&6)&&Wr();var e=z;z|=1;var r=Be.transition,n=B;try{if(Be.transition=null,B=1,t)return t()}finally{B=n,Be.transition=r,z=e,!(z&6)&&Gt()}}function jl(){Pe=Lr.current,W(Lr)}function lr(t,e){t.finishedWork=null,t.finishedLanes=0;var r=t.timeoutHandle;if(r!==-1&&(t.timeoutHandle=-1,Cg(r)),ee!==null)for(r=ee.return;r!==null;){var n=r;switch(hl(n),n.tag){case 1:n=n.type.childContextTypes,n!=null&&di();break;case 3:Yr(),W(xe),W(ye),kl();break;case 5:_l(n);break;case 4:Yr();break;case 13:W(q);break;case 19:W(q);break;case 10:yl(n.type._context);break;case 22:case 23:jl()}r=r.return}if(ae=t,ee=t=Ht(t.current,null),ce=Pe=e,ne=0,Qn=null,Pl=qi=fr=0,be=An=null,sr!==null){for(e=0;e<sr.length;e++)if(r=sr[e],n=r.interleaved,n!==null){r.interleaved=null;var s=n.next,i=r.pending;if(i!==null){var o=i.next;i.next=s,n.next=o}r.pending=n}sr=null}return t}function Hh(t,e){do{var r=ee;try{if(gl(),qs.current=_i,wi){for(var n=K.memoizedState;n!==null;){var s=n.queue;s!==null&&(s.pending=null),n=n.next}wi=!1}if(hr=0,oe=re=K=null,Rn=!1,Kn=0,Rl.current=null,r===null||r.return===null){ne=1,Qn=e,ee=null;break}e:{var i=t,o=r.return,a=r,l=e;if(e=ce,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,d=a,c=d.tag;if(!(d.mode&1)&&(c===0||c===11||c===15)){var h=d.alternate;h?(d.updateQueue=h.updateQueue,d.memoizedState=h.memoizedState,d.lanes=h.lanes):(d.updateQueue=null,d.memoizedState=null)}var f=Nu(o);if(f!==null){f.flags&=-257,$u(f,o,a,i,e),f.mode&1&&Iu(i,u,e),e=f,l=u;var m=e.updateQueue;if(m===null){var v=new Set;v.add(l),e.updateQueue=v}else m.add(l);break e}else{if(!(e&1)){Iu(i,u,e),Il();break e}l=Error(x(426))}}else if(V&&a.mode&1){var k=Nu(o);if(k!==null){!(k.flags&65536)&&(k.flags|=256),$u(k,o,a,i,e),fl(Xr(l,a));break e}}i=l=Xr(l,a),ne!==4&&(ne=2),An===null?An=[i]:An.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var g=xh(i,l,e);Cu(i,g);break e;case 1:a=l;var p=i.type,y=i.stateNode;if(!(i.flags&128)&&(typeof p.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(Mt===null||!Mt.has(y)))){i.flags|=65536,e&=-e,i.lanes|=e;var _=Ch(i,a,e);Cu(i,_);break e}}i=i.return}while(i!==null)}qh(r)}catch(b){e=b,ee===r&&r!==null&&(ee=r=r.return);continue}break}while(!0)}function Wh(){var t=ki.current;return ki.current=_i,t===null?_i:t}function Il(){(ne===0||ne===3||ne===2)&&(ne=4),ae===null||!(fr&268435455)&&!(qi&268435455)||Pt(ae,ce)}function Ei(t,e){var r=z;z|=2;var n=Wh();(ae!==t||ce!==e)&&(ct=null,lr(t,e));do try{Xg();break}catch(s){Hh(t,s)}while(!0);if(gl(),z=r,ki.current=n,ee!==null)throw Error(x(261));return ae=null,ce=0,ne}function Xg(){for(;ee!==null;)Vh(ee)}function Zg(){for(;ee!==null&&!Ep();)Vh(ee)}function Vh(t){var e=Gh(t.alternate,t,Pe);t.memoizedProps=t.pendingProps,e===null?qh(t):ee=e,Rl.current=null}function qh(t){var e=t;do{var r=e.alternate;if(t=e.return,e.flags&32768){if(r=qg(r,e),r!==null){r.flags&=32767,ee=r;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{ne=6,ee=null;return}}else if(r=Vg(r,e,Pe),r!==null){ee=r;return}if(e=e.sibling,e!==null){ee=e;return}ee=e=t}while(e!==null);ne===0&&(ne=5)}function er(t,e,r){var n=B,s=Be.transition;try{Be.transition=null,B=1,ey(t,e,r,n)}finally{Be.transition=s,B=n}return null}function ey(t,e,r,n){do Wr();while(It!==null);if(z&6)throw Error(x(327));r=t.finishedWork;var s=t.finishedLanes;if(r===null)return null;if(t.finishedWork=null,t.finishedLanes=0,r===t.current)throw Error(x(177));t.callbackNode=null,t.callbackPriority=0;var i=r.lanes|r.childLanes;if(Np(t,i),t===ae&&(ee=ae=null,ce=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||As||(As=!0,Jh(ii,function(){return Wr(),null})),i=(r.flags&15990)!==0,r.subtreeFlags&15990||i){i=Be.transition,Be.transition=null;var o=B;B=1;var a=z;z|=4,Rl.current=null,Gg(t,r),Bh(r,t),_g(ua),ai=!!la,ua=la=null,t.current=r,Jg(r),Tp(),z=a,B=o,Be.transition=i}else t.current=r;if(As&&(As=!1,It=t,bi=s),i=t.pendingLanes,i===0&&(Mt=null),Rp(r.stateNode),Re(t,X()),e!==null)for(n=t.onRecoverableError,r=0;r<e.length;r++)s=e[r],n(s.value,{componentStack:s.stack,digest:s.digest});if(Si)throw Si=!1,t=Pa,Pa=null,t;return bi&1&&t.tag!==0&&Wr(),i=t.pendingLanes,i&1?t===Aa?On++:(On=0,Aa=t):On=0,Gt(),null}function Wr(){if(It!==null){var t=xd(bi),e=Be.transition,r=B;try{if(Be.transition=null,B=16>t?16:t,It===null)var n=!1;else{if(t=It,It=null,bi=0,z&6)throw Error(x(331));var s=z;for(z|=4,P=t.current;P!==null;){var i=P,o=i.child;if(P.flags&16){var a=i.deletions;if(a!==null){for(var l=0;l<a.length;l++){var u=a[l];for(P=u;P!==null;){var d=P;switch(d.tag){case 0:case 11:case 15:Pn(8,d,i)}var c=d.child;if(c!==null)c.return=d,P=c;else for(;P!==null;){d=P;var h=d.sibling,f=d.return;if(Dh(d),d===u){P=null;break}if(h!==null){h.return=f,P=h;break}P=f}}}var m=i.alternate;if(m!==null){var v=m.child;if(v!==null){m.child=null;do{var k=v.sibling;v.sibling=null,v=k}while(v!==null)}}P=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,P=o;else e:for(;P!==null;){if(i=P,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Pn(9,i,i.return)}var g=i.sibling;if(g!==null){g.return=i.return,P=g;break e}P=i.return}}var p=t.current;for(P=p;P!==null;){o=P;var y=o.child;if(o.subtreeFlags&2064&&y!==null)y.return=o,P=y;else e:for(o=p;P!==null;){if(a=P,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Vi(9,a)}}catch(b){Q(a,a.return,b)}if(a===o){P=null;break e}var _=a.sibling;if(_!==null){_.return=a.return,P=_;break e}P=a.return}}if(z=s,Gt(),it&&typeof it.onPostCommitFiberRoot=="function")try{it.onPostCommitFiberRoot(Di,t)}catch{}n=!0}return n}finally{B=r,Be.transition=e}}return!1}function Gu(t,e,r){e=Xr(r,e),e=xh(t,e,1),t=Bt(t,e,1),e=we(),t!==null&&(ls(t,1,e),Re(t,e))}function Q(t,e,r){if(t.tag===3)Gu(t,t,r);else for(;e!==null;){if(e.tag===3){Gu(e,t,r);break}else if(e.tag===1){var n=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(Mt===null||!Mt.has(n))){t=Xr(r,t),t=Ch(e,t,1),e=Bt(e,t,1),t=we(),e!==null&&(ls(e,1,t),Re(e,t));break}}e=e.return}}function ty(t,e,r){var n=t.pingCache;n!==null&&n.delete(e),e=we(),t.pingedLanes|=t.suspendedLanes&r,ae===t&&(ce&r)===r&&(ne===4||ne===3&&(ce&130023424)===ce&&500>X()-Al?lr(t,0):Pl|=r),Re(t,e)}function Kh(t,e){e===0&&(t.mode&1?(e=_s,_s<<=1,!(_s&130023424)&&(_s=4194304)):e=1);var r=we();t=St(t,e),t!==null&&(ls(t,e,r),Re(t,r))}function ry(t){var e=t.memoizedState,r=0;e!==null&&(r=e.retryLane),Kh(t,r)}function ny(t,e){var r=0;switch(t.tag){case 13:var n=t.stateNode,s=t.memoizedState;s!==null&&(r=s.retryLane);break;case 19:n=t.stateNode;break;default:throw Error(x(314))}n!==null&&n.delete(e),Kh(t,r)}var Gh;Gh=function(t,e,r){if(t!==null)if(t.memoizedProps!==e.pendingProps||xe.current)Te=!0;else{if(!(t.lanes&r)&&!(e.flags&128))return Te=!1,Wg(t,e,r);Te=!!(t.flags&131072)}else Te=!1,V&&e.flags&1048576&&Xd(e,pi,e.index);switch(e.lanes=0,e.tag){case 2:var n=e.type;Gs(t,e),t=e.pendingProps;var s=Gr(e,ye.current);Hr(e,r),s=bl(null,e,n,t,s,r);var i=El();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Ce(n)?(i=!0,hi(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,vl(e),s.updater=Wi,e.stateNode=s,s._reactInternals=e,va(e,n,t,r),e=ka(null,e,n,!0,i,r)):(e.tag=0,V&&i&&dl(e),ve(null,e,s,r),e=e.child),e;case 16:n=e.elementType;e:{switch(Gs(t,e),t=e.pendingProps,s=n._init,n=s(n._payload),e.type=n,s=e.tag=iy(n),t=qe(n,t),s){case 0:e=_a(null,e,n,t,r);break e;case 1:e=Uu(null,e,n,t,r);break e;case 11:e=Lu(null,e,n,t,r);break e;case 14:e=Du(null,e,n,qe(n.type,t),r);break e}throw Error(x(306,n,""))}return e;case 0:return n=e.type,s=e.pendingProps,s=e.elementType===n?s:qe(n,s),_a(t,e,n,s,r);case 1:return n=e.type,s=e.pendingProps,s=e.elementType===n?s:qe(n,s),Uu(t,e,n,s,r);case 3:e:{if(Oh(e),t===null)throw Error(x(387));n=e.pendingProps,i=e.memoizedState,s=i.element,sh(t,e),mi(e,n,null,r);var o=e.memoizedState;if(n=o.element,i.isDehydrated)if(i={element:n,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=Xr(Error(x(423)),e),e=zu(t,e,n,r,s);break e}else if(n!==s){s=Xr(Error(x(424)),e),e=zu(t,e,n,r,s);break e}else for(Oe=zt(e.stateNode.containerInfo.firstChild),je=e,V=!0,Je=null,r=rh(e,null,n,r),e.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(Jr(),n===s){e=bt(t,e,r);break e}ve(t,e,n,r)}e=e.child}return e;case 5:return ih(e),t===null&&ga(e),n=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,o=s.children,ca(n,s)?o=null:i!==null&&ca(n,i)&&(e.flags|=32),Ah(t,e),ve(t,e,o,r),e.child;case 6:return t===null&&ga(e),null;case 13:return jh(t,e,r);case 4:return wl(e,e.stateNode.containerInfo),n=e.pendingProps,t===null?e.child=Qr(e,null,n,r):ve(t,e,n,r),e.child;case 11:return n=e.type,s=e.pendingProps,s=e.elementType===n?s:qe(n,s),Lu(t,e,n,s,r);case 7:return ve(t,e,e.pendingProps,r),e.child;case 8:return ve(t,e,e.pendingProps.children,r),e.child;case 12:return ve(t,e,e.pendingProps.children,r),e.child;case 10:e:{if(n=e.type._context,s=e.pendingProps,i=e.memoizedProps,o=s.value,F(gi,n._currentValue),n._currentValue=o,i!==null)if(Ze(i.value,o)){if(i.children===s.children&&!xe.current){e=bt(t,e,r);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var a=i.dependencies;if(a!==null){o=i.child;for(var l=a.firstContext;l!==null;){if(l.context===n){if(i.tag===1){l=wt(-1,r&-r),l.tag=2;var u=i.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?l.next=l:(l.next=d.next,d.next=l),u.pending=l}}i.lanes|=r,l=i.alternate,l!==null&&(l.lanes|=r),ya(i.return,r,e),a.lanes|=r;break}l=l.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(x(341));o.lanes|=r,a=o.alternate,a!==null&&(a.lanes|=r),ya(o,r,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}ve(t,e,s.children,r),e=e.child}return e;case 9:return s=e.type,n=e.pendingProps.children,Hr(e,r),s=Me(s),n=n(s),e.flags|=1,ve(t,e,n,r),e.child;case 14:return n=e.type,s=qe(n,e.pendingProps),s=qe(n.type,s),Du(t,e,n,s,r);case 15:return Rh(t,e,e.type,e.pendingProps,r);case 17:return n=e.type,s=e.pendingProps,s=e.elementType===n?s:qe(n,s),Gs(t,e),e.tag=1,Ce(n)?(t=!0,hi(e)):t=!1,Hr(e,r),Th(e,n,s),va(e,n,s,r),ka(null,e,n,!0,t,r);case 19:return Ih(t,e,r);case 22:return Ph(t,e,r)}throw Error(x(156,e.tag))};function Jh(t,e){return Sd(t,e)}function sy(t,e,r,n){this.tag=t,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ze(t,e,r,n){return new sy(t,e,r,n)}function Nl(t){return t=t.prototype,!(!t||!t.isReactComponent)}function iy(t){if(typeof t=="function")return Nl(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Za)return 11;if(t===el)return 14}return 2}function Ht(t,e){var r=t.alternate;return r===null?(r=ze(t.tag,e,t.key,t.mode),r.elementType=t.elementType,r.type=t.type,r.stateNode=t.stateNode,r.alternate=t,t.alternate=r):(r.pendingProps=e,r.type=t.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=t.flags&14680064,r.childLanes=t.childLanes,r.lanes=t.lanes,r.child=t.child,r.memoizedProps=t.memoizedProps,r.memoizedState=t.memoizedState,r.updateQueue=t.updateQueue,e=t.dependencies,r.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},r.sibling=t.sibling,r.index=t.index,r.ref=t.ref,r}function Ys(t,e,r,n,s,i){var o=2;if(n=t,typeof t=="function")Nl(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case xr:return ur(r.children,s,i,e);case Xa:o=8,s|=8;break;case Fo:return t=ze(12,r,e,s|2),t.elementType=Fo,t.lanes=i,t;case Ho:return t=ze(13,r,e,s),t.elementType=Ho,t.lanes=i,t;case Wo:return t=ze(19,r,e,s),t.elementType=Wo,t.lanes=i,t;case id:return Ki(r,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case nd:o=10;break e;case sd:o=9;break e;case Za:o=11;break e;case el:o=14;break e;case xt:o=16,n=null;break e}throw Error(x(130,t==null?t:typeof t,""))}return e=ze(o,r,e,s),e.elementType=t,e.type=n,e.lanes=i,e}function ur(t,e,r,n){return t=ze(7,t,n,e),t.lanes=r,t}function Ki(t,e,r,n){return t=ze(22,t,n,e),t.elementType=id,t.lanes=r,t.stateNode={isHidden:!1},t}function Ao(t,e,r){return t=ze(6,t,null,e),t.lanes=r,t}function Oo(t,e,r){return e=ze(4,t.children!==null?t.children:[],t.key,e),e.lanes=r,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function oy(t,e,r,n,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=co(0),this.expirationTimes=co(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=co(0),this.identifierPrefix=n,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function $l(t,e,r,n,s,i,o,a,l){return t=new oy(t,e,r,a,l),e===1?(e=1,i===!0&&(e|=8)):e=0,i=ze(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:n,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},vl(i),t}function ay(t,e,r){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Tr,key:n==null?null:""+n,children:t,containerInfo:e,implementation:r}}function Qh(t){if(!t)return Vt;t=t._reactInternals;e:{if(yr(t)!==t||t.tag!==1)throw Error(x(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Ce(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(x(171))}if(t.tag===1){var r=t.type;if(Ce(r))return Qd(t,r,e)}return e}function Yh(t,e,r,n,s,i,o,a,l){return t=$l(r,n,!0,t,s,i,o,a,l),t.context=Qh(null),r=t.current,n=we(),s=Ft(r),i=wt(n,s),i.callback=e??null,Bt(r,i,s),t.current.lanes=s,ls(t,s,n),Re(t,n),t}function Gi(t,e,r,n){var s=e.current,i=we(),o=Ft(s);return r=Qh(r),e.context===null?e.context=r:e.pendingContext=r,e=wt(i,o),e.payload={element:t},n=n===void 0?null:n,n!==null&&(e.callback=n),t=Bt(s,e,o),t!==null&&(Xe(t,s,o,i),Vs(t,s,o)),o}function Ti(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Ju(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var r=t.retryLane;t.retryLane=r!==0&&r<e?r:e}}function Ll(t,e){Ju(t,e),(t=t.alternate)&&Ju(t,e)}function ly(){return null}var Xh=typeof reportError=="function"?reportError:function(t){console.error(t)};function Dl(t){this._internalRoot=t}Ji.prototype.render=Dl.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(x(409));Gi(t,e,null,null)};Ji.prototype.unmount=Dl.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;pr(function(){Gi(null,t,null,null)}),e[kt]=null}};function Ji(t){this._internalRoot=t}Ji.prototype.unstable_scheduleHydration=function(t){if(t){var e=Pd();t={blockedOn:null,target:t,priority:e};for(var r=0;r<Rt.length&&e!==0&&e<Rt[r].priority;r++);Rt.splice(r,0,t),r===0&&Od(t)}};function Ul(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Qi(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Qu(){}function uy(t,e,r,n,s){if(s){if(typeof n=="function"){var i=n;n=function(){var u=Ti(o);i.call(u)}}var o=Yh(e,n,t,0,null,!1,!1,"",Qu);return t._reactRootContainer=o,t[kt]=o.current,Fn(t.nodeType===8?t.parentNode:t),pr(),o}for(;s=t.lastChild;)t.removeChild(s);if(typeof n=="function"){var a=n;n=function(){var u=Ti(l);a.call(u)}}var l=$l(t,0,!1,null,null,!1,!1,"",Qu);return t._reactRootContainer=l,t[kt]=l.current,Fn(t.nodeType===8?t.parentNode:t),pr(function(){Gi(e,l,r,n)}),l}function Yi(t,e,r,n,s){var i=r._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var a=s;s=function(){var l=Ti(o);a.call(l)}}Gi(e,o,t,s)}else o=uy(r,e,t,s,n);return Ti(o)}Cd=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var r=vn(e.pendingLanes);r!==0&&(nl(e,r|1),Re(e,X()),!(z&6)&&(Zr=X()+500,Gt()))}break;case 13:pr(function(){var n=St(t,1);if(n!==null){var s=we();Xe(n,t,1,s)}}),Ll(t,1)}};sl=function(t){if(t.tag===13){var e=St(t,134217728);if(e!==null){var r=we();Xe(e,t,134217728,r)}Ll(t,134217728)}};Rd=function(t){if(t.tag===13){var e=Ft(t),r=St(t,e);if(r!==null){var n=we();Xe(r,t,e,n)}Ll(t,e)}};Pd=function(){return B};Ad=function(t,e){var r=B;try{return B=t,e()}finally{B=r}};ea=function(t,e,r){switch(e){case"input":if(Ko(t,r),e=r.name,r.type==="radio"&&e!=null){for(r=t;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<r.length;e++){var n=r[e];if(n!==t&&n.form===t.form){var s=Mi(n);if(!s)throw Error(x(90));ad(n),Ko(n,s)}}}break;case"textarea":ud(t,r);break;case"select":e=r.value,e!=null&&zr(t,!!r.multiple,e,!1)}};yd=Ol;md=pr;var cy={usingClientEntryPoint:!1,Events:[cs,Ar,Mi,pd,gd,Ol]},pn={findFiberByHostInstance:nr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},dy={bundleType:pn.bundleType,version:pn.version,rendererPackageName:pn.rendererPackageName,rendererConfig:pn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Et.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=_d(t),t===null?null:t.stateNode},findFiberByHostInstance:pn.findFiberByHostInstance||ly,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Os=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Os.isDisabled&&Os.supportsFiber)try{Di=Os.inject(dy),it=Os}catch{}}Ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=cy;Ne.createPortal=function(t,e){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ul(e))throw Error(x(200));return ay(t,e,null,r)};Ne.createRoot=function(t,e){if(!Ul(t))throw Error(x(299));var r=!1,n="",s=Xh;return e!=null&&(e.unstable_strictMode===!0&&(r=!0),e.identifierPrefix!==void 0&&(n=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=$l(t,1,!1,null,null,r,!1,n,s),t[kt]=e.current,Fn(t.nodeType===8?t.parentNode:t),new Dl(e)};Ne.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(x(188)):(t=Object.keys(t).join(","),Error(x(268,t)));return t=_d(e),t=t===null?null:t.stateNode,t};Ne.flushSync=function(t){return pr(t)};Ne.hydrate=function(t,e,r){if(!Qi(e))throw Error(x(200));return Yi(null,t,e,!0,r)};Ne.hydrateRoot=function(t,e,r){if(!Ul(t))throw Error(x(405));var n=r!=null&&r.hydratedSources||null,s=!1,i="",o=Xh;if(r!=null&&(r.unstable_strictMode===!0&&(s=!0),r.identifierPrefix!==void 0&&(i=r.identifierPrefix),r.onRecoverableError!==void 0&&(o=r.onRecoverableError)),e=Yh(e,null,t,1,r??null,s,!1,i,o),t[kt]=e.current,Fn(t),n)for(t=0;t<n.length;t++)r=n[t],s=r._getVersion,s=s(r._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[r,s]:e.mutableSourceEagerHydrationData.push(r,s);return new Ji(e)};Ne.render=function(t,e,r){if(!Qi(e))throw Error(x(200));return Yi(null,t,e,!1,r)};Ne.unmountComponentAtNode=function(t){if(!Qi(t))throw Error(x(40));return t._reactRootContainer?(pr(function(){Yi(null,null,t,!1,function(){t._reactRootContainer=null,t[kt]=null})}),!0):!1};Ne.unstable_batchedUpdates=Ol;Ne.unstable_renderSubtreeIntoContainer=function(t,e,r,n){if(!Qi(r))throw Error(x(200));if(t==null||t._reactInternals===void 0)throw Error(x(38));return Yi(t,e,r,!1,n)};Ne.version="18.3.1-next-f1338f8080-20240426";function Zh(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Zh)}catch(t){console.error(t)}}Zh(),Zc.exports=Ne;var hy=Zc.exports,Yu=hy;Bo.createRoot=Yu.createRoot,Bo.hydrateRoot=Yu.hydrateRoot;const fy=Symbol.for("@supabase/supabase-js.traceContextExtractor");function py(){return globalThis[fy]}function Xi(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(t);s<n.length;s++)e.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(t,n[s])&&(r[n[s]]=t[n[s]]);return r}function gy(t,e,r,n){function s(i){return i instanceof r?i:new r(function(o){o(i)})}return new(r||(r=Promise))(function(i,o){function a(d){try{u(n.next(d))}catch(c){o(c)}}function l(d){try{u(n.throw(d))}catch(c){o(c)}}function u(d){d.done?i(d.value):s(d.value).then(a,l)}u((n=n.apply(t,e||[])).next())})}const yy=t=>t?(...e)=>t(...e):(...e)=>fetch(...e);class zl extends Error{constructor(e,r="FunctionsError",n){super(e),this.name=r,this.context=n}toJSON(){return{name:this.name,message:this.message,context:this.context}}}class my extends zl{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class Xu extends zl{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class Zu extends zl{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var Ia;(function(t){t.Any="any",t.ApNortheast1="ap-northeast-1",t.ApNortheast2="ap-northeast-2",t.ApSouth1="ap-south-1",t.ApSoutheast1="ap-southeast-1",t.ApSoutheast2="ap-southeast-2",t.CaCentral1="ca-central-1",t.EuCentral1="eu-central-1",t.EuWest1="eu-west-1",t.EuWest2="eu-west-2",t.EuWest3="eu-west-3",t.SaEast1="sa-east-1",t.UsEast1="us-east-1",t.UsWest1="us-west-1",t.UsWest2="us-west-2"})(Ia||(Ia={}));class vy{constructor(e,{headers:r={},customFetch:n,region:s=Ia.Any}={}){this.url=e,this.headers=r,this.region=s,this.fetch=yy(n)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return gy(this,arguments,void 0,function*(r,n={}){var s,i;let o,a,l;try{const{headers:u,method:d,body:c,signal:h,timeout:f}=n;let m={},{region:v}=n;v||(v=this.region);const k=new URL(`${this.url}/${r}`);v&&v!=="any"&&(m["x-region"]=v,k.searchParams.set("forceFunctionRegion",v));let g;const p=!!u&&Object.keys(u).some(R=>R.toLowerCase()==="content-type");c&&!p?typeof Blob<"u"&&c instanceof Blob||c instanceof ArrayBuffer?(m["Content-Type"]="application/octet-stream",g=c):typeof c=="string"?(m["Content-Type"]="text/plain",g=c):typeof FormData<"u"&&c instanceof FormData?g=c:(m["Content-Type"]="application/json",g=JSON.stringify(c)):c&&typeof c!="string"&&!(typeof Blob<"u"&&c instanceof Blob)&&!(c instanceof ArrayBuffer)&&!(typeof FormData<"u"&&c instanceof FormData)?g=JSON.stringify(c):g=c;let y=h;f&&(a=new AbortController,o=setTimeout(()=>a.abort(),f),h?(y=a.signal,l=()=>a.abort(),h.addEventListener("abort",l)):y=a.signal);const _=yield this.fetch(k.toString(),{method:d||"POST",headers:Object.assign(Object.assign(Object.assign({},m),this.headers),u),body:g,signal:y}).catch(R=>{throw new my(R)}),b=_.headers.get("x-relay-error");if(b&&b==="true")throw new Xu(_);if(!_.ok)throw new Zu(_);let E=((s=_.headers.get("Content-Type"))!==null&&s!==void 0?s:"text/plain").split(";")[0].trim().toLowerCase(),T;return E==="application/json"?T=yield _.json():E==="application/octet-stream"||E==="application/pdf"?T=yield _.blob():E==="text/event-stream"?T=_:E==="multipart/form-data"?T=yield _.formData():T=yield _.text(),{data:T,error:null,response:_}}catch(u){return{data:null,error:u,response:u instanceof Zu||u instanceof Xu?u.context:void 0}}finally{o&&clearTimeout(o),l&&((i=n.signal)===null||i===void 0||i.removeEventListener("abort",l))}})}}const ef=3,ec=t=>Math.min(1e3*2**t,3e4),wy=[520,503],tf=["GET","HEAD","OPTIONS"];var jo=class extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function Yn(t){"@babel/helpers - typeof";return Yn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Yn(t)}function _y(t,e){if(Yn(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,e);if(Yn(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function ky(t){var e=_y(t,"string");return Yn(e)=="symbol"?e:e+""}function Sy(t,e,r){return(e=ky(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function tc(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),r.push.apply(r,n)}return r}function Dr(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?tc(Object(r),!0).forEach(function(n){Sy(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):tc(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}function rc(t,e){return new Promise(r=>{if(e!=null&&e.aborted){r();return}const n=setTimeout(()=>{e==null||e.removeEventListener("abort",s),r()},t);function s(){clearTimeout(n),r()}e==null||e.addEventListener("abort",s)})}function by(t,e,r,n){return!(!n||r>=ef||!tf.includes(t)||!wy.includes(e))}var Ey=class{constructor(t){var e,r,n,s,i;this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=t.method,this.url=t.url,this.headers=new Headers(t.headers),this.schema=t.schema,this.body=t.body,this.shouldThrowOnError=(e=t.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=t.signal,this.isMaybeSingle=(r=t.isMaybeSingle)!==null&&r!==void 0?r:!1,this.shouldStripNulls=(n=t.shouldStripNulls)!==null&&n!==void 0?n:!1,this.urlLengthLimit=(s=t.urlLengthLimit)!==null&&s!==void 0?s:8e3,this.retryEnabled=(i=t.retry)!==null&&i!==void 0?i:!0,t.fetch?this.fetch=t.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get("Accept")==="text/csv")throw new Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(t,e){return this.headers=new Headers(this.headers),this.headers.set(t,e),this}retry(t){return this.retryEnabled=t,this}then(t,e){var r=this;if(this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){const o=this.headers.get("Accept");o==="application/vnd.pgrst.object+json"?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!o||o==="application/json")&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}const n=this.fetch;let i=(async()=>{let o=0;for(;;){const u={};r.headers.forEach((c,h)=>{u[h]=c}),o>0&&(u["X-Retry-Count"]=String(o));let d;try{d=await n(r.url.toString(),{method:r.method,headers:u,body:JSON.stringify(r.body,(c,h)=>typeof h=="bigint"?h.toString():h),signal:r.signal})}catch(c){if((c==null?void 0:c.name)==="AbortError"||(c==null?void 0:c.code)==="ABORT_ERR"||!tf.includes(r.method))throw c;if(r.retryEnabled&&o<ef){const h=ec(o);o++,await rc(h,r.signal);continue}throw c}if(by(r.method,d.status,o,r.retryEnabled)){var a,l;const c=(a=(l=d.headers)===null||l===void 0?void 0:l.get("Retry-After"))!==null&&a!==void 0?a:null,h=c!==null?Math.max(0,parseInt(c,10)||0)*1e3:ec(o);await d.text(),o++,await rc(h,r.signal);continue}return await r.processResponse(d)}})();return this.shouldThrowOnError||(i=i.catch(o=>{var a;let l="",u="",d="";const c=o==null?void 0:o.cause;if(c){var h,f,m,v;const p=(h=c==null?void 0:c.message)!==null&&h!==void 0?h:"",y=(f=c==null?void 0:c.code)!==null&&f!==void 0?f:"";l=`${(m=o==null?void 0:o.name)!==null&&m!==void 0?m:"FetchError"}: ${o==null?void 0:o.message}`,l+=`

Caused by: ${(v=c==null?void 0:c.name)!==null&&v!==void 0?v:"Error"}: ${p}`,y&&(l+=` (${y})`),c!=null&&c.stack&&(l+=`
${c.stack}`)}else{var k;l=(k=o==null?void 0:o.stack)!==null&&k!==void 0?k:""}const g=this.url.toString().length;return(o==null?void 0:o.name)==="AbortError"||(o==null?void 0:o.code)==="ABORT_ERR"?(d="",u="Request was aborted (timeout or manual cancellation)",g>this.urlLengthLimit&&(u+=`. Note: Your request URL is ${g} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((c==null?void 0:c.name)==="HeadersOverflowError"||(c==null?void 0:c.code)==="UND_ERR_HEADERS_OVERFLOW")&&(d="",u="HTTP headers exceeded server limits (typically 16KB)",g>this.urlLengthLimit&&(u+=`. Your request URL is ${g} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${(a=o==null?void 0:o.name)!==null&&a!==void 0?a:"FetchError"}: ${o==null?void 0:o.message}`,details:l,hint:u,code:d},data:null,count:null,status:0,statusText:""}})),i.then(t,e)}async processResponse(t){var e=this;let r=null,n=null,s=null,i=t.status,o=t.statusText;if(t.ok){var a,l;if(e.method!=="HEAD"){var u;const f=await t.text();if(f!=="")if(e.headers.get("Accept")==="text/csv")n=f;else if(e.headers.get("Accept")&&(!((u=e.headers.get("Accept"))===null||u===void 0)&&u.includes("application/vnd.pgrst.plan+text")))n=f;else try{n=JSON.parse(f)}catch{if(r={message:f},n=null,e.shouldThrowOnError)throw new jo({message:f,details:"",hint:"",code:""})}}const c=(a=e.headers.get("Prefer"))===null||a===void 0?void 0:a.match(/count=(exact|planned|estimated)/),h=(l=t.headers.get("content-range"))===null||l===void 0?void 0:l.split("/");if(c&&h&&h.length>1&&(s=parseInt(h[1])),e.isMaybeSingle&&Array.isArray(n))if(n.length>1){if(r={code:"PGRST116",details:`Results contain ${n.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},n=null,s=null,i=406,o="Not Acceptable",e.shouldThrowOnError){var d;throw new jo(Dr(Dr({},r),{},{hint:(d=r.hint)!==null&&d!==void 0?d:""}))}}else n.length===1?n=n[0]:n=null}else{const c=await t.text();try{r=JSON.parse(c),Array.isArray(r)&&t.status===404&&(n=[],r=null,i=200,o="OK")}catch{t.status===404&&c===""?(i=204,o="No Content"):r={message:c}}if(r&&e.shouldThrowOnError)throw new jo(r)}return{success:r===null,error:r,data:n,count:s,status:i,statusText:o}}returns(){return this}overrideTypes(){return this}},Ty=class extends Ey{throwOnError(){return super.throwOnError()}select(t){let e=!1;const r=(t??"*").split("").map(n=>/\s/.test(n)&&!e?"":(n==='"'&&(e=!e),n)).join("");return this.url.searchParams.set("select",r),this.headers.append("Prefer","return=representation"),this}order(t,{ascending:e=!0,nullsFirst:r,foreignTable:n,referencedTable:s=n}={}){const i=s?`${s}.order`:"order",o=this.url.searchParams.get(i);return this.url.searchParams.set(i,`${o?`${o},`:""}${t}.${e?"asc":"desc"}${r===void 0?"":r?".nullsfirst":".nullslast"}`),this}limit(t,{foreignTable:e,referencedTable:r=e}={}){const n=typeof r>"u"?"limit":`${r}.limit`;return this.url.searchParams.set(n,`${t}`),this}range(t,e,{foreignTable:r,referencedTable:n=r}={}){const s=typeof n>"u"?"offset":`${n}.offset`,i=typeof n>"u"?"limit":`${n}.limit`;return this.url.searchParams.set(s,`${t}`),this.url.searchParams.set(i,`${e-t+1}`),this}abortSignal(t){return this.signal=t,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:t=!1,verbose:e=!1,settings:r=!1,buffers:n=!1,wal:s=!1,format:i="text"}={}){var o;const a=[t?"analyze":null,e?"verbose":null,r?"settings":null,n?"buffers":null,s?"wal":null].filter(Boolean).join("|"),l=(o=this.headers.get("Accept"))!==null&&o!==void 0?o:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${i}; for="${l}"; options=${a};`),i==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(t){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${t}`),this}};const nc=new RegExp("[,()]");var Sr=class extends Ty{throwOnError(){return super.throwOnError()}eq(t,e){return this.url.searchParams.append(t,`eq.${e}`),this}neq(t,e){return this.url.searchParams.append(t,`neq.${e}`),this}gt(t,e){return this.url.searchParams.append(t,`gt.${e}`),this}gte(t,e){return this.url.searchParams.append(t,`gte.${e}`),this}lt(t,e){return this.url.searchParams.append(t,`lt.${e}`),this}lte(t,e){return this.url.searchParams.append(t,`lte.${e}`),this}like(t,e){return this.url.searchParams.append(t,`like.${e}`),this}likeAllOf(t,e){return this.url.searchParams.append(t,`like(all).{${e.join(",")}}`),this}likeAnyOf(t,e){return this.url.searchParams.append(t,`like(any).{${e.join(",")}}`),this}ilike(t,e){return this.url.searchParams.append(t,`ilike.${e}`),this}ilikeAllOf(t,e){return this.url.searchParams.append(t,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(t,e){return this.url.searchParams.append(t,`ilike(any).{${e.join(",")}}`),this}regexMatch(t,e){return this.url.searchParams.append(t,`match.${e}`),this}regexIMatch(t,e){return this.url.searchParams.append(t,`imatch.${e}`),this}is(t,e){return this.url.searchParams.append(t,`is.${e}`),this}isDistinct(t,e){return this.url.searchParams.append(t,`isdistinct.${e}`),this}in(t,e){const r=Array.from(new Set(e)).map(n=>typeof n=="string"&&nc.test(n)?`"${n}"`:`${n}`).join(",");return this.url.searchParams.append(t,`in.(${r})`),this}notIn(t,e){const r=Array.from(new Set(e)).map(n=>typeof n=="string"&&nc.test(n)?`"${n}"`:`${n}`).join(",");return this.url.searchParams.append(t,`not.in.(${r})`),this}contains(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cs.{${e.join(",")}}`):this.url.searchParams.append(t,`cs.${JSON.stringify(e)}`),this}containedBy(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cd.{${e.join(",")}}`):this.url.searchParams.append(t,`cd.${JSON.stringify(e)}`),this}rangeGt(t,e){return this.url.searchParams.append(t,`sr.${e}`),this}rangeGte(t,e){return this.url.searchParams.append(t,`nxl.${e}`),this}rangeLt(t,e){return this.url.searchParams.append(t,`sl.${e}`),this}rangeLte(t,e){return this.url.searchParams.append(t,`nxr.${e}`),this}rangeAdjacent(t,e){return this.url.searchParams.append(t,`adj.${e}`),this}overlaps(t,e){return typeof e=="string"?this.url.searchParams.append(t,`ov.${e}`):this.url.searchParams.append(t,`ov.{${e.join(",")}}`),this}textSearch(t,e,{config:r,type:n}={}){let s="";n==="plain"?s="pl":n==="phrase"?s="ph":n==="websearch"&&(s="w");const i=r===void 0?"":`(${r})`;return this.url.searchParams.append(t,`${s}fts${i}.${e}`),this}match(t){return Object.entries(t).filter(([e,r])=>r!==void 0).forEach(([e,r])=>{this.url.searchParams.append(e,`eq.${r}`)}),this}not(t,e,r){return this.url.searchParams.append(t,`not.${e}.${r}`),this}or(t,{foreignTable:e,referencedTable:r=e}={}){const n=r?`${r}.or`:"or";return this.url.searchParams.append(n,`(${t})`),this}filter(t,e,r){return this.url.searchParams.append(t,`${e}.${r}`),this}},xy=class{constructor(t,{headers:e={},schema:r,fetch:n,urlLengthLimit:s=8e3,retry:i}){this.url=t,this.headers=new Headers(e),this.schema=r,this.fetch=n,this.urlLengthLimit=s,this.retry=i}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(t,e){const{head:r=!1,count:n}=e??{},s=r?"HEAD":"GET";let i=!1;const o=(t??"*").split("").map(u=>/\s/.test(u)&&!i?"":(u==='"'&&(i=!i),u)).join(""),{url:a,headers:l}=this.cloneRequestState();return a.searchParams.set("select",o),n&&l.append("Prefer",`count=${n}`),new Sr({method:s,url:a,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(t,{count:e,defaultToNull:r=!0}={}){var n;const s="POST",{url:i,headers:o}=this.cloneRequestState();if(e&&o.append("Prefer",`count=${e}`),r||o.append("Prefer","missing=default"),Array.isArray(t)){const a=t.reduce((l,u)=>l.concat(Object.keys(u)),[]);if(a.length>0){const l=[...new Set(a)].map(u=>`"${u}"`);i.searchParams.set("columns",l.join(","))}}return new Sr({method:s,url:i,headers:o,schema:this.schema,body:t,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(t,{onConflict:e,ignoreDuplicates:r=!1,count:n,defaultToNull:s=!0}={}){var i;const o="POST",{url:a,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${r?"ignore":"merge"}-duplicates`),e!==void 0&&a.searchParams.set("on_conflict",e),n&&l.append("Prefer",`count=${n}`),s||l.append("Prefer","missing=default"),Array.isArray(t)){const u=t.reduce((d,c)=>d.concat(Object.keys(c)),[]);if(u.length>0){const d=[...new Set(u)].map(c=>`"${c}"`);a.searchParams.set("columns",d.join(","))}}return new Sr({method:o,url:a,headers:l,schema:this.schema,body:t,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(t,{count:e}={}){var r;const n="PATCH",{url:s,headers:i}=this.cloneRequestState();return e&&i.append("Prefer",`count=${e}`),new Sr({method:n,url:s,headers:i,schema:this.schema,body:t,fetch:(r=this.fetch)!==null&&r!==void 0?r:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:t}={}){var e;const r="DELETE",{url:n,headers:s}=this.cloneRequestState();return t&&s.append("Prefer",`count=${t}`),new Sr({method:r,url:n,headers:s,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}},Cy=class rf{constructor(e,{headers:r={},schema:n,fetch:s,timeout:i,urlLengthLimit:o=8e3,retry:a}={}){this.url=e,this.headers=new Headers(r),this.schemaName=n,this.urlLengthLimit=o;const l=s??globalThis.fetch;i!==void 0&&i>0?this.fetch=(u,d)=>{const c=new AbortController,h=setTimeout(()=>c.abort(),i),f=d==null?void 0:d.signal;if(f){if(f.aborted)return clearTimeout(h),l(u,d);const m=()=>{clearTimeout(h),c.abort()};return f.addEventListener("abort",m,{once:!0}),l(u,Dr(Dr({},d),{},{signal:c.signal})).finally(()=>{clearTimeout(h),f.removeEventListener("abort",m)})}return l(u,Dr(Dr({},d),{},{signal:c.signal})).finally(()=>clearTimeout(h))}:this.fetch=l,this.retry=a}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new xy(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(e){return new rf(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(e,r={},{head:n=!1,get:s=!1,count:i}={}){var o;let a;const l=new URL(`${this.url}/rpc/${e}`);let u;const d=f=>f!==null&&typeof f=="object"&&(!Array.isArray(f)||f.some(d)),c=n&&Object.values(r).some(d);c?(a="POST",u=r):n||s?(a=n?"HEAD":"GET",Object.entries(r).filter(([f,m])=>m!==void 0).map(([f,m])=>[f,Array.isArray(m)?`{${m.join(",")}}`:`${m}`]).forEach(([f,m])=>{l.searchParams.append(f,m)})):(a="POST",u=r);const h=new Headers(this.headers);return c?h.set("Prefer",i?`count=${i},return=minimal`:"return=minimal"):i&&h.set("Prefer",`count=${i}`),new Sr({method:a,url:l,headers:h,schema:this.schemaName,body:u,fetch:(o=this.fetch)!==null&&o!==void 0?o:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};class Ry{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",wsConstructor:WebSocket};const r=globalThis;if(typeof globalThis<"u"&&typeof r.WebSocket<"u")return{type:"native",wsConstructor:r.WebSocket};const n=typeof global<"u"?global:void 0;if(n&&typeof n.WebSocket<"u")return{type:"native",wsConstructor:n.WebSocket};if(typeof globalThis<"u"&&typeof r.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&r.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const s=globalThis.process;if(s){const i=s.versions;if(i&&i.node)return{type:"unsupported",error:"Node.js detected but native WebSocket not found.",workaround:"Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option."}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.wsConstructor)return e.wsConstructor;let r=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(r+=`

Suggested solution: ${e.workaround}`),new Error(r)}static isWebSocketSupported(){try{return this.detectEnvironment().type==="native"}catch{return!1}}}const Py="2.112.2",Ay=`realtime-js/${Py}`,Oy="1.0.0",nf="2.0.0",jy=nf,Iy=1e4,Ny=100,At={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},sf={close:"phx_close",error:"phx_error",join:"phx_join",leave:"phx_leave",access_token:"access_token"},Na={connecting:"connecting",closing:"closing",closed:"closed"};class $y{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,r){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return r(this._binaryEncodeUserBroadcastPush(e));let n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return r(JSON.stringify(n))}_binaryEncodeUserBroadcastPush(e){var r;return this._isArrayBuffer((r=e.payload)===null||r===void 0?void 0:r.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var r,n;const s=(n=(r=e.payload)===null||r===void 0?void 0:r.payload)!==null&&n!==void 0?n:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,s)}_encodeJsonUserBroadcastPush(e){var r,n;const s=(n=(r=e.payload)===null||r===void 0?void 0:r.payload)!==null&&n!==void 0?n:{},o=new TextEncoder().encode(JSON.stringify(s)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,o)}_encodeUserBroadcastPush(e,r,n){var s,i;const o=new TextEncoder,a=o.encode(e.topic),l=o.encode((s=e.ref)!==null&&s!==void 0?s:""),u=o.encode((i=e.join_ref)!==null&&i!==void 0?i:""),d=o.encode(e.payload.event),c=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},h=o.encode(Object.keys(c).length===0?"":JSON.stringify(c));if(u.length>255)throw new Error(`joinRef length ${u.length} exceeds maximum of 255`);if(l.length>255)throw new Error(`ref length ${l.length} exceeds maximum of 255`);if(a.length>255)throw new Error(`topic length ${a.length} exceeds maximum of 255`);if(d.length>255)throw new Error(`userEvent length ${d.length} exceeds maximum of 255`);if(h.length>255)throw new Error(`metadata length ${h.length} exceeds maximum of 255`);const f=this.USER_BROADCAST_PUSH_META_LENGTH+u.length+l.length+a.length+d.length+h.length,m=new ArrayBuffer(this.HEADER_LENGTH+f),v=new DataView(m),k=new Uint8Array(m);let g=0;v.setUint8(g++,this.KINDS.userBroadcastPush),v.setUint8(g++,u.length),v.setUint8(g++,l.length),v.setUint8(g++,a.length),v.setUint8(g++,d.length),v.setUint8(g++,h.length),v.setUint8(g++,r),k.set(u,g),g+=u.length,k.set(l,g),g+=l.length,k.set(a,g),g+=a.length,k.set(d,g),g+=d.length,k.set(h,g),g+=h.length;var p=new Uint8Array(m.byteLength+n.byteLength);return p.set(new Uint8Array(m),0),p.set(new Uint8Array(n),m.byteLength),p.buffer}decode(e,r){if(this._isArrayBuffer(e)){let n=this._binaryDecode(e);return r(n)}if(typeof e=="string"){const n=JSON.parse(e),[s,i,o,a,l]=n;return r({join_ref:s,ref:i,topic:o,event:a,payload:l})}return r({})}_binaryDecode(e){const r=new DataView(e),n=r.getUint8(0),s=new TextDecoder;switch(n){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,r,s)}}_decodeUserBroadcast(e,r,n){const s=r.getUint8(1),i=r.getUint8(2),o=r.getUint8(3),a=r.getUint8(4);let l=this.HEADER_LENGTH+4;const u=n.decode(e.slice(l,l+s));l=l+s;const d=n.decode(e.slice(l,l+i));l=l+i;const c=n.decode(e.slice(l,l+o));l=l+o;const h=e.slice(l,e.byteLength),f=a===this.JSON_ENCODING?JSON.parse(n.decode(h)):h,m={type:this.BROADCAST_EVENT,event:d,payload:f};return o>0&&(m.meta=JSON.parse(c)),{join_ref:null,ref:null,topic:u,event:this.BROADCAST_EVENT,payload:m}}_isArrayBuffer(e){var r;return e instanceof ArrayBuffer||((r=e==null?void 0:e.constructor)===null||r===void 0?void 0:r.name)==="ArrayBuffer"}_pick(e,r){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([n])=>r.includes(n)))}}var M;(function(t){t.abstime="abstime",t.bool="bool",t.date="date",t.daterange="daterange",t.float4="float4",t.float8="float8",t.int2="int2",t.int4="int4",t.int4range="int4range",t.int8="int8",t.int8range="int8range",t.json="json",t.jsonb="jsonb",t.money="money",t.numeric="numeric",t.oid="oid",t.reltime="reltime",t.text="text",t.time="time",t.timestamp="timestamp",t.timestamptz="timestamptz",t.timetz="timetz",t.tsrange="tsrange",t.tstzrange="tstzrange"})(M||(M={}));const sc=(t,e,r={})=>{var n;const s=(n=r.skipTypes)!==null&&n!==void 0?n:[];return e?Object.keys(e).reduce((i,o)=>(i[o]=Ly(o,t,e,s),i),{}):{}},Ly=(t,e,r,n)=>{const s=e.find(a=>a.name===t),i=s==null?void 0:s.type,o=r[t];return i&&!n.includes(i)?of(i,o):$a(o)},of=(t,e)=>{if(t.charAt(0)==="_"){const r=t.slice(1,t.length);return By(e,r)}switch(t){case M.bool:return Dy(e);case M.float4:case M.float8:case M.int2:case M.int4:case M.int8:case M.numeric:case M.oid:return Uy(e);case M.json:case M.jsonb:return zy(e);case M.timestamp:return My(e);case M.abstime:case M.date:case M.daterange:case M.int4range:case M.int8range:case M.money:case M.reltime:case M.text:case M.time:case M.timestamptz:case M.timetz:case M.tsrange:case M.tstzrange:return $a(e);default:return $a(e)}},$a=t=>t,Dy=t=>{switch(t){case"t":return!0;case"f":return!1;default:return t}},Uy=t=>{if(typeof t=="string"){const e=parseFloat(t);if(!Number.isNaN(e))return e}return t},zy=t=>{if(typeof t=="string")try{return JSON.parse(t)}catch{return t}return t},By=(t,e)=>{if(typeof t!="string")return t;const r=t.length-1,n=t[r];if(t[0]==="{"&&n==="}"){let i;const o=t.slice(1,r);try{i=JSON.parse("["+o+"]")}catch{i=o?o.split(","):[]}return i.map(a=>of(e,a))}return t},My=t=>typeof t=="string"?t.replace(" ","T"):t,af=t=>{const e=new URL(t);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};var Vr=t=>typeof t=="function"?t:function(){return t},Fy=typeof self<"u"?self:null,br=typeof window<"u"?window:null,rt=Fy||br||globalThis,Hy="2.0.0",Wy=1e4,Vy=1e3,qy=100,nt={connecting:0,open:1,closing:2,closed:3},Se={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},dt={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},La={longpoll:"longpoll",websocket:"websocket"},Ky={complete:4},Da="base64url.bearer.phx.",js=class{constructor(t,e,r,n){this.channel=t,this.event=e,this.payload=r||function(){return{}},this.receivedResp=null,this.timeout=n,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(t){this.timeout=t,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(t,e){return this.hasReceived(t)&&e(this.receivedResp.response),this.recHooks.push({status:t,callback:e}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:t,response:e,_ref:r}){this.recHooks.filter(n=>n.status===t).forEach(n=>n.callback(e))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,t=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=t,this.matchReceive(t)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}hasReceived(t){return this.receivedResp&&this.receivedResp.status===t}trigger(t,e){this.channel.trigger(this.refEvent,{status:t,response:e})}},lf=class{constructor(t,e){this.callback=t,this.timerCalc=e,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}},Gy=class{constructor(t,e,r){this.state=Se.closed,this.topic=t,this.params=Vr(e||{}),this.socket=r,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new js(this,dt.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new lf(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive("ok",()=>{this.state=Se.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(n=>n.send()),this.pushBuffer=[]}),this.joinPush.receive("error",n=>{this.state=Se.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,n),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=Se.closed,this.socket.remove(this)}),this.onError(n=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,n),this.isJoining()&&this.joinPush.reset(),this.state=Se.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new js(this,dt.leave,Vr({}),this.timeout).send(),this.state=Se.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(dt.reply,(n,s)=>{this.trigger(this.replyEventName(s),n)})}join(t=this.timeout){if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=t,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(t=>t.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=Se.closed,this.bindings=[]}onClose(t){this.on(dt.close,t)}onError(t){return this.on(dt.error,e=>t(e))}on(t,e){let r=this.bindingRef++;return this.bindings.push({event:t,ref:r,callback:e}),r}off(t,e){this.bindings=this.bindings.filter(r=>!(r.event===t&&(typeof e>"u"||e===r.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(t,e,r=this.timeout){if(e=e||{},!this.joinedOnce)throw new Error(`tried to push '${t}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let n=new js(this,t,function(){return e},r);return this.canPush()?n.send():(n.startTimeout(),this.pushBuffer.push(n)),n}leave(t=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=Se.leaving;let e=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(dt.close,"leave")},r=new js(this,dt.leave,Vr({}),t);return r.receive("ok",()=>e()).receive("timeout",()=>e()),r.send(),this.canPush()||r.trigger("ok",{}),r}onMessage(t,e,r){return e}filterBindings(t,e,r){return!0}isMember(t,e,r,n){return this.topic!==t?!1:n&&n!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:t,event:e,payload:r,joinRef:n}),!1):!0}joinRef(){return this.joinPush.ref}rejoin(t=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=Se.joining,this.joinPush.resend(t))}trigger(t,e,r,n){let s=this.onMessage(t,e,r,n);if(e&&!s)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");let i=this.bindings.filter(o=>o.event===t&&this.filterBindings(o,e,r));for(let o=0;o<i.length;o++)i[o].callback(s,r,n||this.joinRef())}replyEventName(t){return`chan_reply_${t}`}isClosed(){return this.state===Se.closed}isErrored(){return this.state===Se.errored}isJoined(){return this.state===Se.joined}isJoining(){return this.state===Se.joining}isLeaving(){return this.state===Se.leaving}},xi=class{static request(t,e,r,n,s,i,o){if(rt.XDomainRequest){let a=new rt.XDomainRequest;return this.xdomainRequest(a,t,e,n,s,i,o)}else if(rt.XMLHttpRequest){let a=new rt.XMLHttpRequest;return this.xhrRequest(a,t,e,r,n,s,i,o)}else{if(rt.fetch&&rt.AbortController)return this.fetchRequest(t,e,r,n,s,i,o);throw new Error("No suitable XMLHttpRequest implementation found")}}static fetchRequest(t,e,r,n,s,i,o){let a={method:t,headers:r,body:n},l=null;return s&&(l=new AbortController,setTimeout(()=>l.abort(),s),a.signal=l.signal),rt.fetch(e,a).then(u=>u.text()).then(u=>this.parseJSON(u)).then(u=>o&&o(u)).catch(u=>{u.name==="AbortError"&&i?i():o&&o(null)}),l}static xdomainRequest(t,e,r,n,s,i,o){return t.timeout=s,t.open(e,r),t.onload=()=>{let a=this.parseJSON(t.responseText);o&&o(a)},i&&(t.ontimeout=i),t.onprogress=()=>{},t.send(n),t}static xhrRequest(t,e,r,n,s,i,o,a){t.open(e,r,!0),t.timeout=i;for(let[l,u]of Object.entries(n))t.setRequestHeader(l,u);return t.onerror=()=>a&&a(null),t.onreadystatechange=()=>{if(t.readyState===Ky.complete&&a){let l=this.parseJSON(t.responseText);a(l)}},o&&(t.ontimeout=o),t.send(s),t}static parseJSON(t){if(!t||t==="")return null;try{return JSON.parse(t)}catch{return console&&console.log("failed to parse JSON response",t),null}}static serialize(t,e){let r=[];for(var n in t){if(!Object.prototype.hasOwnProperty.call(t,n))continue;let s=e?`${e}[${n}]`:n,i=t[n];typeof i=="object"?r.push(this.serialize(i,s)):r.push(encodeURIComponent(s)+"="+encodeURIComponent(i))}return r.join("&")}static appendParams(t,e){if(Object.keys(e).length===0)return t;let r=t.match(/\?/)?"&":"?";return`${t}${r}${this.serialize(e)}`}},Jy=t=>{let e="",r=new Uint8Array(t),n=r.byteLength;for(let s=0;s<n;s++)e+=String.fromCharCode(r[s]);return btoa(e)},vr=class{constructor(t,e){e&&e.length===2&&e[1].startsWith(Da)&&(this.authToken=atob(e[1].slice(Da.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(t),this.readyState=nt.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(t){return t.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+La.websocket),"$1/"+La.longpoll)}endpointURL(){return xi.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(t,e,r){this.close(t,e,r),this.readyState=nt.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===nt.open||this.readyState===nt.connecting}poll(){const t={Accept:"application/json"};this.authToken&&(t["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",t,null,()=>this.ontimeout(),e=>{if(e){var{status:r,token:n,messages:s}=e;if(r===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,"session_gone",!1);return}this.token=n}else r=0;switch(r){case 200:s.forEach(i=>{setTimeout(()=>this.onmessage({data:i}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=nt.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw new Error(`unhandled poll status ${r}`)}})}send(t){typeof t!="string"&&(t=Jy(t)),this.currentBatch?this.currentBatch.push(t):this.awaitingBatchAck?this.batchBuffer.push(t):(this.currentBatch=[t],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(t,e=0){this.awaitingBatchAck=!0;const r=e+qy,n=t.slice(e,r);this.ajax("POST",{"Content-Type":"application/x-ndjson"},n.join(`
`),()=>this.onerror("timeout"),s=>{!s||s.status!==200?(this.awaitingBatchAck=!1,this.onerror(s&&s.status),this.closeAndRetry(1011,"internal server error",!1)):r<t.length?this.batchSend(t,r):this.batchBuffer.length>0?(this.batchSend(this.batchBuffer),this.batchBuffer=[]):this.awaitingBatchAck=!1})}close(t,e,r){for(let s of this.reqs)s.abort();this.readyState=nt.closed;let n=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:t,reason:e,wasClean:r});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",n)):this.onclose(n)}ajax(t,e,r,n,s){let i,o=()=>{this.reqs.delete(i),n()};i=xi.request(t,this.endpointURL(),e,r,this.timeout,o,a=>{this.reqs.delete(i),this.isActive()&&s(a)}),this.reqs.add(i)}},Qy=class _n{constructor(e,r={}){let n=r.events||{state:"presence_state",diff:"presence_diff"};this.state=Object.create(null),this.pendingDiffs=[],this.channel=e,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(n.state,s=>{let{onJoin:i,onLeave:o,onSync:a}=this.caller;this.joinRef=this.channel.joinRef(),this.state=_n.syncState(this.state,s,i,o),this.pendingDiffs.forEach(l=>{this.state=_n.syncDiff(this.state,l,i,o)}),this.pendingDiffs=[],a()}),this.channel.on(n.diff,s=>{let{onJoin:i,onLeave:o,onSync:a}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(s):(this.state=_n.syncDiff(this.state,s,i,o),a())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(e){return _n.list(this.state,e)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,r,n,s){let i=this.toNullProtoObj(this.clone(e));r=this.toNullProtoObj(r);let o=Object.create(null),a=Object.create(null);return this.map(i,(l,u)=>{r[l]||(a[l]=u)}),this.map(r,(l,u)=>{let d=i[l];if(d){let c=u.metas.map(v=>v.phx_ref),h=d.metas.map(v=>v.phx_ref),f=u.metas.filter(v=>h.indexOf(v.phx_ref)<0),m=d.metas.filter(v=>c.indexOf(v.phx_ref)<0);f.length>0&&(o[l]=u,o[l].metas=f),m.length>0&&(a[l]=this.clone(d),a[l].metas=m)}else o[l]=u}),this.syncDiff(i,{joins:o,leaves:a},n,s)}static syncDiff(e,r,n,s){e=this.toNullProtoObj(e);let{joins:i,leaves:o}=this.clone(r);return n||(n=function(){}),s||(s=function(){}),this.map(i,(a,l)=>{let u=e[a];if(e[a]=this.clone(l),u){let d=e[a].metas.map(h=>h.phx_ref),c=u.metas.filter(h=>d.indexOf(h.phx_ref)<0);e[a].metas.unshift(...c)}n(a,u,l)}),this.map(o,(a,l)=>{let u=e[a];if(!u)return;let d=l.metas.map(c=>c.phx_ref);u.metas=u.metas.filter(c=>d.indexOf(c.phx_ref)<0),s(a,u,l),u.metas.length===0&&delete e[a]}),e}static list(e,r){return r||(r=function(n,s){return s}),this.map(e,(n,s)=>r(n,s))}static map(e,r){return Object.getOwnPropertyNames(e).map(n=>r(n,e[n]))}static toNullProtoObj(e){if(Object.getPrototypeOf(e)===null)return e;let r=Object.create(null);return Object.getOwnPropertyNames(e).forEach(n=>{r[n]=e[n]}),r}static clone(e){return JSON.parse(JSON.stringify(e))}},Is={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(t,e){if(t.payload.constructor===ArrayBuffer)return e(this.binaryEncode(t));{let r=[t.join_ref,t.ref,t.topic,t.event,t.payload];return e(JSON.stringify(r))}},decode(t,e){if(t.constructor===ArrayBuffer)return e(this.binaryDecode(t));{let[r,n,s,i,o]=JSON.parse(t);return e({join_ref:r,ref:n,topic:s,event:i,payload:o})}},binaryEncode(t){let{join_ref:e,ref:r,event:n,topic:s,payload:i}=t,o=new TextEncoder,a=o.encode(e),l=o.encode(r),u=o.encode(s),d=o.encode(n);this.assertFieldSize(a.byteLength,"join_ref"),this.assertFieldSize(l.byteLength,"ref"),this.assertFieldSize(u.byteLength,"topic"),this.assertFieldSize(d.byteLength,"event");let c=this.META_LENGTH+a.byteLength+l.byteLength+u.byteLength+d.byteLength,h=new ArrayBuffer(this.HEADER_LENGTH+c),f=new Uint8Array(h),m=new DataView(h),v=0;m.setUint8(v++,this.KINDS.push),m.setUint8(v++,a.byteLength),m.setUint8(v++,l.byteLength),m.setUint8(v++,u.byteLength),m.setUint8(v++,d.byteLength),f.set(a,v),v+=a.byteLength,f.set(l,v),v+=l.byteLength,f.set(u,v),v+=u.byteLength,f.set(d,v),v+=d.byteLength;var k=new Uint8Array(h.byteLength+i.byteLength);return k.set(f,0),k.set(new Uint8Array(i),h.byteLength),k.buffer},assertFieldSize(t,e){if(t>255)throw new Error(`unable to convert ${e} to binary: must be less than or equal to 255 bytes, but is ${t} bytes`)},binaryDecode(t){let e=new DataView(t),r=e.getUint8(0),n=new TextDecoder;switch(r){case this.KINDS.push:return this.decodePush(t,e,n);case this.KINDS.reply:return this.decodeReply(t,e,n);case this.KINDS.broadcast:return this.decodeBroadcast(t,e,n)}},decodePush(t,e,r){let n=e.getUint8(1),s=e.getUint8(2),i=e.getUint8(3),o=this.HEADER_LENGTH+this.META_LENGTH-1,a=r.decode(t.slice(o,o+n));o=o+n;let l=r.decode(t.slice(o,o+s));o=o+s;let u=r.decode(t.slice(o,o+i));o=o+i;let d=t.slice(o,t.byteLength);return{join_ref:a,ref:null,topic:l,event:u,payload:d}},decodeReply(t,e,r){let n=e.getUint8(1),s=e.getUint8(2),i=e.getUint8(3),o=e.getUint8(4),a=this.HEADER_LENGTH+this.META_LENGTH,l=r.decode(t.slice(a,a+n));a=a+n;let u=r.decode(t.slice(a,a+s));a=a+s;let d=r.decode(t.slice(a,a+i));a=a+i;let c=r.decode(t.slice(a,a+o));a=a+o;let h=t.slice(a,t.byteLength),f={status:c,response:h};return{join_ref:l,ref:u,topic:d,event:dt.reply,payload:f}},decodeBroadcast(t,e,r){let n=e.getUint8(1),s=e.getUint8(2),i=this.HEADER_LENGTH+2,o=r.decode(t.slice(i,i+n));i=i+n;let a=r.decode(t.slice(i,i+s));i=i+s;let l=t.slice(i,t.byteLength);return{join_ref:null,ref:null,topic:o,event:a,payload:l}}},Yy=class{constructor(t,e={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=e.timeout||Wy,this.transport=e.transport||rt.WebSocket||vr,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=e.longPollFallbackMs,this.fallbackTimer=null;let r=null;try{r=rt&&rt.sessionStorage}catch{}this.sessionStore=e.sessionStorage||r,this.establishedConnections=0,this.defaultEncoder=Is.encode.bind(Is),this.defaultDecoder=Is.decode.bind(Is),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=e.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport!==vr?(this.encode=e.encode||this.defaultEncoder,this.decode=e.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder);let n=null;br&&br.addEventListener&&(br.addEventListener("pagehide",s=>{this.conn&&(this.disconnect(),n=this.connectClock)}),br.addEventListener("pageshow",s=>{n===this.connectClock&&(n=null,this.connect())}),br.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=e.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=e.autoSendHeartbeat??!0,this.heartbeatCallback=e.heartbeatCallback??(()=>{}),this.rejoinAfterMs=s=>e.rejoinAfterMs?e.rejoinAfterMs(s):[1e3,2e3,5e3][s-1]||1e4,this.reconnectAfterMs=s=>e.reconnectAfterMs?e.reconnectAfterMs(s):[10,50,100,150,200,250,500,1e3,2e3][s-1]||5e3,this.logger=e.logger||null,!this.logger&&e.debug&&(this.logger=(s,i,o)=>{console.log(`${s}: ${i}`,o)}),this.longpollerTimeout=e.longpollerTimeout||2e4,this.params=Vr(e.params||{}),this.endPoint=`${t}/${La.websocket}`,this.vsn=e.vsn||Hy,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new lf(()=>{if(this.pageHidden){this.log("Not reconnecting as page is hidden!"),this.teardown();return}this.teardown(async()=>{e.beforeReconnect&&await e.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=e.authToken&&Vr(e.authToken)}getLongPollTransport(){return vr}replaceTransport(t){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&(this.conn.close(),this.conn=null),this.transport=t}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let t=xi.appendParams(xi.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return t.charAt(0)!=="/"?t:t.charAt(1)==="/"?`${this.protocol()}:${t}`:`${this.protocol()}://${location.host}${t}`}disconnect(t,e,r){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,t&&t()},e,r)}connect(t){t&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=Vr(t)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==vr?this.connectWithFallback(vr,this.longPollFallbackMs):this.transportConnect())}log(t,e,r){this.logger&&this.logger(t,e,r)}hasLogger(){return this.logger!==null}onOpen(t){let e=this.makeRef();return this.stateChangeCallbacks.open.push([e,t]),e}onClose(t){let e=this.makeRef();return this.stateChangeCallbacks.close.push([e,t]),e}onError(t){let e=this.makeRef();return this.stateChangeCallbacks.error.push([e,t]),e}onMessage(t){let e=this.makeRef();return this.stateChangeCallbacks.message.push([e,t]),e}onHeartbeat(t){this.heartbeatCallback=t}ping(t){if(!this.isConnected())return!1;let e=this.makeRef(),r=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:e});let n=this.onMessage(s=>{s.ref===e&&(this.off([n]),t(Date.now()-r))});return!0}transportName(t){switch(t){case vr:return"LongPoll";default:return t.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let t;this.authToken&&(t=["phoenix",`${Da}${btoa(this.authToken()).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),t),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(t){return this.sessionStore&&this.sessionStore.getItem(t)}storeSession(t,e){this.sessionStore&&this.sessionStore.setItem(t,e)}connectWithFallback(t,e=2500){clearTimeout(this.fallbackTimer);let r=!1,n=!0,s,i,o=this.transportName(t),a=l=>{this.log("transport",`falling back to ${o}...`,l),this.off([s,i]),n=!1,this.replaceTransport(t),this.transportConnect()};if(this.getSession(`phx:fallback:${o}`))return a("memorized");this.fallbackTimer=setTimeout(a,e),i=this.onError(l=>{this.log("transport","error",l),n&&!r&&(clearTimeout(this.fallbackTimer),a(l))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(r=!0,!n){let l=this.transportName(t);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${l}`,"true"),this.log("transport",`established ${l} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(a,e),this.ping(l=>{this.log("transport","connected to primary after",l),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this.triggerChanError(new Error("heartbeat timeout")),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),Vy,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(t,e,r){if(!this.conn)return t&&t();const n=this.conn;this.waitForBufferDone(n,()=>{e?n.close(e,r||""):n.close(),this.waitForSocketClosed(n,()=>{this.conn===n&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),t&&t()})})}waitForBufferDone(t,e,r=1){if(r===5||!t.bufferedAmount){e();return}setTimeout(()=>{this.waitForBufferDone(t,e,r+1)},150*r)}waitForSocketClosed(t,e,r=1){if(r===5||t.readyState===nt.closed){e();return}setTimeout(()=>{this.waitForSocketClosed(t,e,r+1)},150*r)}onConnClose(t){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",t),this.triggerChanError(t),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",t)}onConnError(t){this.hasLogger()&&this.log("transport","error",t);let e=this.transport,r=this.establishedConnections;this.triggerStateCallbacks("error",t,e,r),(e===this.transport||r>0)&&this.triggerChanError(t)}triggerChanError(t){this.channels.forEach(e=>{e.isErrored()||e.isLeaving()||e.isClosed()||e.trigger(dt.error,t)})}connectionState(){switch(this.conn&&this.conn.readyState){case nt.connecting:return"connecting";case nt.open:return"open";case nt.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(t){this.off(t.stateChangeRefs),this.channels=this.channels.filter(e=>e!==t)}off(t){for(let e in this.stateChangeCallbacks)this.stateChangeCallbacks[e]=this.stateChangeCallbacks[e].filter(([r])=>t.indexOf(r)===-1)}channel(t,e={}){let r=new Gy(t,e,this);return this.channels.push(r),r}push(t){if(this.hasLogger()){let{topic:e,event:r,payload:n,ref:s,join_ref:i}=t;this.log("push",`${e} ${r} (${i}, ${s})`,n)}this.isConnected()?this.encode(t,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(t,e=>this.conn.send(e)))}makeRef(){let t=this.ref+1;return t===this.ref?this.ref=0:this.ref=t,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(t=>t()),this.sendBuffer=[])}onConnMessage(t){this.decode(t.data,e=>{let{topic:r,event:n,payload:s,ref:i,join_ref:o}=e;if(i&&i===this.pendingHeartbeatRef){const a=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(s.status==="ok"?"ok":"error",a)}catch(l){this.log("error","error in heartbeat callback",l)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${s.status||""} ${r} ${n} ${i&&"("+i+")"||""}`.trim(),s);for(let a=0;a<this.channels.length;a++){const l=this.channels[a];l.isMember(r,n,s,o)&&l.trigger(n,s,i,o)}this.triggerStateCallbacks("message",e)})}triggerStateCallbacks(t,...e){try{this.stateChangeCallbacks[t].forEach(([r,n])=>{try{n(...e)}catch(s){this.log("error",`error in ${t} callback`,s)}})}catch(r){this.log("error",`error triggering ${t} callbacks`,r)}}leaveOpenTopic(t){let e=this.channels.find(r=>r.topic===t&&(r.isJoined()||r.isJoining()));e&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${t}"`),e.leave())}};class jn{constructor(e,r){const n=Zy(r);this.presence=new Qy(e.getChannel(),n),this.presence.onJoin((s,i,o)=>{const a=jn.onJoinPayload(s,i,o);e.getChannel().trigger("presence",a)}),this.presence.onLeave((s,i,o)=>{const a=jn.onLeavePayload(s,i,o);e.getChannel().trigger("presence",a)}),this.presence.onSync(()=>{e.getChannel().trigger("presence",{event:"sync"})})}get state(){return jn.transformState(this.presence.state)}static transformState(e){return e=Xy(e),Object.getOwnPropertyNames(e).reduce((r,n)=>{const s=e[n];return r[n]=Xs(s),r},{})}static onJoinPayload(e,r,n){const s=ic(r),i=Xs(n);return{event:"join",key:e,currentPresences:s,newPresences:i}}static onLeavePayload(e,r,n){const s=ic(r),i=Xs(n);return{event:"leave",key:e,currentPresences:s,leftPresences:i}}}function Xs(t){return t.metas.map(e=>{const r=Object.getOwnPropertyDescriptors(e),n=Object.defineProperties({},r);return n.presence_ref=n.phx_ref,delete n.phx_ref,delete n.phx_ref_prev,n})}function Xy(t){return JSON.parse(JSON.stringify(t))}function Zy(t){return(t==null?void 0:t.events)&&{events:t.events}}function ic(t){return t!=null&&t.metas?Xs(t):[]}var oc;(function(t){t.SYNC="sync",t.JOIN="join",t.LEAVE="leave"})(oc||(oc={}));class em{get state(){return this.presenceAdapter.state}constructor(e,r){this.channel=e,this.presenceAdapter=new jn(this.channel.channelAdapter,r)}}function tm(t){if(t instanceof Error)return t;if(typeof t=="string")return new Error(t);if(t&&typeof t=="object"){const e=t;if(typeof e.code=="number"){const r=typeof e.reason=="string"&&e.reason?` (${e.reason})`:"";return new Error(`socket closed: ${e.code}${r}`,{cause:t})}return new Error("channel error: transport failure",{cause:t})}return new Error("channel error: connection lost")}class rm{constructor(e,r,n){const s=nm(n);this.channel=e.getSocket().channel(r,s),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,r){return this.channel.on(e,r)}off(e,r){this.channel.off(e,r)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,r,n){let s;try{s=this.channel.push(e,r,n)}catch{throw new Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>Ny){const i=this.channel.pushBuffer.shift();i.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${i.event}`,i.payload())}return s}updateJoinPayload(e){const r=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},r),e)}canPush(){return this.socket.isConnected()&&this.state===At.joined}isJoined(){return this.state===At.joined}isJoining(){return this.state===At.joining}isClosed(){return this.state===At.closed}isLeaving(){return this.state===At.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}}function nm(t){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config)}}const sm=/[,()"\\]/,im=t=>sm.test(t)||t!==t.trim(),om=t=>`"${t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`,ac=t=>{const e=t===null?"null":String(t);return im(e)?om(e):e},am=t=>t===null?"null":String(t),lm=(t,e)=>{if(t==="in"){const r=Array.isArray(e)?e:[e];if(r.length===0)throw new Error("Realtime `in` filter requires at least one value.");return`in.(${Array.from(new Set(r)).map(s=>ac(s)).join(",")})`}return t==="is"?`is.${am(e)}`:`${t}.${ac(e)}`};class um{constructor(){this.filters=[]}add(e,r,n,s=!1){const i=s?"not.":"";return this.filters.push(`${e}=${i}${lm(r,n)}`),this}eq(e,r){return this.add(e,"eq",r)}neq(e,r){return this.add(e,"neq",r)}gt(e,r){return this.add(e,"gt",r)}gte(e,r){return this.add(e,"gte",r)}lt(e,r){return this.add(e,"lt",r)}lte(e,r){return this.add(e,"lte",r)}in(e,r){return this.add(e,"in",r)}like(e,r){return this.add(e,"like",r)}ilike(e,r){return this.add(e,"ilike",r)}match(e,r){return this.add(e,"match",r)}imatch(e,r){return this.add(e,"imatch",r)}is(e,r){return this.add(e,"is",r)}isDistinct(e,r){return this.add(e,"isdistinct",r)}not(e,r,n){return this.add(e,r,n,!0)}build(){return this.filters.join(",")}toString(){return this.build()}}var lc;(function(t){t.ALL="*",t.INSERT="INSERT",t.UPDATE="UPDATE",t.DELETE="DELETE"})(lc||(lc={}));var rr;(function(t){t.BROADCAST="broadcast",t.PRESENCE="presence",t.POSTGRES_CHANGES="postgres_changes",t.SYSTEM="system"})(rr||(rr={}));var ht;(function(t){t.SUBSCRIBED="SUBSCRIBED",t.TIMED_OUT="TIMED_OUT",t.CLOSED="CLOSED",t.CHANNEL_ERROR="CHANNEL_ERROR"})(ht||(ht={}));class ft{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,r={config:{}},n){var s,i;if(this.topic=e,this.params=r,this.socket=n,this.bindings={},this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},r.config),this.channelAdapter=new rm(this.socket.socketAdapter,e,this.params),this.presence=new em(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=af(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&(!((i=(s=this.params.config)===null||s===void 0?void 0:s.broadcast)===null||i===void 0)&&i.replay))throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,r=this.timeout){var n,s,i;if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){const{config:{broadcast:o,presence:a,private:l}}=this.params,u=(s=(n=this.bindings.postgres_changes)===null||n===void 0?void 0:n.map(f=>f.filter))!==null&&s!==void 0?s:[],d=!!this.bindings[rr.PRESENCE]&&this.bindings[rr.PRESENCE].length>0||((i=this.params.config.presence)===null||i===void 0?void 0:i.enabled)===!0,c={},h={broadcast:o,presence:Object.assign(Object.assign({},a),{enabled:d}),postgres_changes:u,private:l};this.socket.accessTokenValue&&(c.access_token=this.socket.accessTokenValue),this._onError(f=>{e==null||e(ht.CHANNEL_ERROR,tm(f))}),this._onClose(()=>e==null?void 0:e(ht.CLOSED)),this.updateJoinPayload(Object.assign({config:h},c)),this._updateFilterMessage(),this.channelAdapter.subscribe(r).receive("ok",async({postgres_changes:f})=>{if(this.socket._isManualToken()||this.socket.setAuth(),f===void 0){e==null||e(ht.SUBSCRIBED);return}this._updatePostgresBindings(f,e)}).receive("error",f=>{this.state=At.errored;const m=Object.values(f).join(", ")||"error";e==null||e(ht.CHANNEL_ERROR,new Error(m,{cause:f}))}).receive("timeout",()=>{e==null||e(ht.TIMED_OUT)})}return this}_updatePostgresBindings(e,r){var n;const s=this.bindings.postgres_changes,i=(n=s==null?void 0:s.length)!==null&&n!==void 0?n:0,o=[];for(let a=0;a<i;a++){const l=s[a],{filter:{event:u,schema:d,table:c,filter:h}}=l,f=e&&e[a];if(f&&f.event===u&&ft.isFilterValueEqual(f.schema,d)&&ft.isFilterValueEqual(f.table,c)&&ft.isFilterValueEqual(f.filter,h))o.push(Object.assign(Object.assign({},l),{id:f.id}));else{this.unsubscribe(),this.state=At.errored,r==null||r(ht.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=o,this.state!=At.errored&&r&&r(ht.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,r={}){return await this.send({type:"presence",event:"track",payload:e},r)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,r,n){const s=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),i=e===rr.PRESENCE||e===rr.POSTGRES_CHANGES;if(s&&i)throw this.socket.log("channel",`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),new Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,r,n)}async httpSend(e,r,n={}){var s;if(r==null)return Promise.reject(new Error("Payload is required for httpSend()"));const i=r instanceof ArrayBuffer||ArrayBuffer.isView(r),o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":i?"application/octet-stream":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const a=new URL(this.broadcastEndpointURL);a.pathname+=`/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`,this.private&&a.searchParams.set("private","true");const l={method:"POST",headers:o,body:i?r:JSON.stringify(r)},u=await this._fetchWithTimeout(a.toString(),l,(s=n.timeout)!==null&&s!==void 0?s:this.timeout);if(u.status===202)return{success:!0};if(u.status===404)return Promise.reject(new Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));let d=u.statusText;try{const c=await u.json();d=c.error||c.message||d}catch{}return Promise.reject(new Error(d))}async send(e,r={}){var n,s;if(!this.channelAdapter.canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:i,payload:o}=e,a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:a,body:JSON.stringify({messages:[{topic:this.subTopic,event:i,payload:o,private:this.private}]})};try{const u=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(n=r.timeout)!==null&&n!==void 0?n:this.timeout);return await((s=u.body)===null||s===void 0?void 0:s.cancel()),u.ok?"ok":"error"}catch(u){return u instanceof Error&&u.name==="AbortError"?"timed out":"error"}}else return new Promise(i=>{var o,a,l;const u=this.channelAdapter.push(e.type,e,r.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(a=(o=this.params)===null||o===void 0?void 0:o.config)===null||a===void 0?void 0:a.broadcast)===null||l===void 0)&&l.ack)&&i("ok"),u.receive("ok",()=>i("ok")),u.receive("error",()=>i("error")),u.receive("timeout",()=>i("timed out"))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(r=>{this.channelAdapter.unsubscribe(e).receive("ok",()=>r("ok")).receive("timeout",()=>r("timed out")).receive("error",()=>r("error"))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,r,n){const s=new AbortController,i=setTimeout(()=>s.abort(),n),o=await this.socket.fetch(e,Object.assign(Object.assign({},r),{signal:s.signal}));return clearTimeout(i),o}_on(e,r,n){var s;const i=e.toLocaleLowerCase(),o=r==null?void 0:r.filter;if((o instanceof um||typeof o=="object"&&o!==null&&typeof o.build=="function")&&(r=Object.assign(Object.assign({},r),{filter:o.build()})),i===rr.POSTGRES_CHANGES&&((s=this.bindings[i])===null||s===void 0?void 0:s.find(d=>ft.isSamePostgresFilter(d.filter,r))))return this.socket.log("error",`duplicate \`postgres_changes\` binding for ${this.topic} ignored`,r),this;const a=this.channelAdapter.on(e,n),l={type:i,filter:r,callback:n,ref:a};return this.bindings[i]?this.bindings[i].push(l):this.bindings[i]=[l],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,r,n)=>{var s,i,o,a,l,u,d;const c=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(c,n))return!1;const h=(s=this.bindings[c])===null||s===void 0?void 0:s.find(f=>f.ref===e.ref);if(!h)return!0;if(["broadcast","presence","postgres_changes"].includes(c))if("id"in h){const f=h.id,m=(i=h.filter)===null||i===void 0?void 0:i.event;return f&&((o=r.ids)===null||o===void 0?void 0:o.includes(f))&&(m==="*"||(m==null?void 0:m.toLocaleLowerCase())===((a=r.data)===null||a===void 0?void 0:a.type.toLocaleLowerCase()))}else{const f=(u=(l=h==null?void 0:h.filter)===null||l===void 0?void 0:l.event)===null||u===void 0?void 0:u.toLocaleLowerCase();return f==="*"||f===((d=r==null?void 0:r.event)===null||d===void 0?void 0:d.toLocaleLowerCase())}else return h.type.toLocaleLowerCase()===c})}_notThisChannelEvent(e,r){const{close:n,error:s,leave:i,join:o}=sf;return r&&[n,s,i,o].includes(e)&&r!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,r,n)=>{if(typeof r=="object"&&"ids"in r){const s=r.data,{schema:i,table:o,commit_timestamp:a,type:l,errors:u}=s;return Object.assign(Object.assign({},{schema:i,table:o,commit_timestamp:a,eventType:l,new:{},old:{},errors:u}),this._getPayloadRecords(s))}return r})}copyBindings(e){if(this.joinedOnce)throw new Error("cannot copy bindings into joined channel");for(const r in e.bindings)for(const n of e.bindings[r])this._on(n.type,n.filter,n.callback)}static isFilterValueEqual(e,r){return(e??void 0)===(r??void 0)}static isSamePostgresFilter(e,r){var n,s,i,o;const a=(s=(n=e==null?void 0:e.select)===null||n===void 0?void 0:n.join())!==null&&s!==void 0?s:void 0,l=(o=(i=r==null?void 0:r.select)===null||i===void 0?void 0:i.join())!==null&&o!==void 0?o:void 0;return(e==null?void 0:e.event)===(r==null?void 0:r.event)&&ft.isFilterValueEqual(e==null?void 0:e.schema,r==null?void 0:r.schema)&&ft.isFilterValueEqual(e==null?void 0:e.table,r==null?void 0:r.table)&&ft.isFilterValueEqual(e==null?void 0:e.filter,r==null?void 0:r.filter)&&a===l}_getPayloadRecords(e){const r={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(r.new=sc(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(r.old=sc(e.columns,e.old_record)),r}}class cm{constructor(e,r){this.socket=new Yy(e,r)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,r,n,s=1e4){return new Promise(i=>{setTimeout(()=>i("timeout"),s),this.socket.disconnect(()=>{e(),i("ok")},r,n)})}push(e){this.socket.push(e)}log(e,r,n){this.socket.log(e,r,n)}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==Na.connecting}isDisconnecting(){return this.socket.connectionState()==Na.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}}const uc={HEARTBEAT_INTERVAL:25e3},dm=[1e3,2e3,5e3,1e4],hm=1e4;function fm(){const t=new Map;return{get length(){return t.size},clear(){t.clear()},getItem(e){return t.has(e)?t.get(e):null},key(e){var r;return(r=Array.from(t.keys())[e])!==null&&r!==void 0?r:null},removeItem(e){t.delete(e)},setItem(e,r){t.set(e,String(r))}}}function pm(){try{if(typeof globalThis<"u"&&globalThis.sessionStorage)return globalThis.sessionStorage}catch{}return fm()}const gm=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class ym{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,r){var n;if(this.channels=new Array,this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new $y,this._manuallySetToken=!1,this._authPromise=null,this._authGeneration=0,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=i=>i?(...o)=>i(...o):(...o)=>fetch(...o),!(!((n=r==null?void 0:r.params)===null||n===void 0)&&n.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=r.params.apikey;const s=this._initializeOptions(r);this.socketAdapter=new cm(e,s),this.httpEndpoint=af(e),this.fetch=this._resolveFetch(r==null?void 0:r.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){const r=e.message;throw new Error(`WebSocket not available: ${r}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,r){return this._cancelPendingDisconnect(),this.isDisconnecting()?"ok":await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,r)}getChannels(){return this.channels}async removeChannel(e){const r=await e.unsubscribe();return r==="ok"&&e.teardown(),r}async removeAllChannels(){const e=this.channels.map(async n=>{const s=await n.unsubscribe();return n.teardown(),s}),r=await Promise.all(e);return await this.disconnect(),r}log(e,r,n){this.socketAdapter.log(e,r,n)}connectionState(){return this.socketAdapter.connectionState()||Na.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,r={config:{}}){const n=`realtime:${e}`,s=this.getChannels().find(i=>i.topic===n);if(s)return s;{const i=new ft(`realtime:${e}`,r,this);return this._cancelPendingDisconnect(),this.channels.push(i),i}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){const r=++this._authGeneration,n=this._performAuth(e,r);r===this._authGeneration&&(this._authPromise=n);try{await n}finally{this._authPromise===n&&(this._authPromise=null)}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(r=>r.topic!==e.topic),this.channels.length===0&&(this.log("transport","no channels remaining, scheduling disconnect"),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log("transport","disconnecting immediately - no channels"),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log("transport","deferred disconnect fired - no channels, disconnecting"),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log("transport",`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log("transport","pending disconnect cancelled - channel activity detected"),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(e,r){let n,s=!1;if(e)n=e,s=!0;else if(this.accessToken)try{n=await this.accessToken()}catch(i){this.log("error","Error fetching access token from callback",i),n=this.accessTokenValue}else n=this.accessTokenValue;r===this._authGeneration&&(this.accessToken?this._manuallySetToken=!1:s&&(this._manuallySetToken=!0),this.accessTokenValue!=n&&(this.accessTokenValue=n,this.channels.forEach(i=>{const o={access_token:n,version:Ay};i.updateJoinPayload(o),i.joinedOnce&&i.channelAdapter.isJoined()&&i.channelAdapter.push(sf.access_token,{access_token:n})})))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(r=>{this.log("error",`Error setting auth in ${e}`,r)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(r=>{this.log("error","error waiting for auth on connect",r)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(r,n)=>{r!=="disconnected"&&(r=="sent"&&this._setAuthSafely(),e&&e(r,n))}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=r=>{this.log("worker","worker error",r.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=r=>{r.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_workerObjectUrl(e){let r;if(e)r=e;else{const n=new Blob([gm],{type:"application/javascript"});r=URL.createObjectURL(n)}return r}_initializeOptions(e){var r,n,s,i,o,a,l,u,d,c,h,f;this.worker=(r=e==null?void 0:e.worker)!==null&&r!==void 0?r:!1,this.accessToken=(n=e==null?void 0:e.accessToken)!==null&&n!==void 0?n:null;const m={};m.timeout=(s=e==null?void 0:e.timeout)!==null&&s!==void 0?s:Iy,m.heartbeatIntervalMs=(i=e==null?void 0:e.heartbeatIntervalMs)!==null&&i!==void 0?i:uc.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=(o=e==null?void 0:e.disconnectOnEmptyChannelsAfterMs)!==null&&o!==void 0?o:2*((a=e==null?void 0:e.heartbeatIntervalMs)!==null&&a!==void 0?a:uc.HEARTBEAT_INTERVAL),m.transport=(l=e==null?void 0:e.transport)!==null&&l!==void 0?l:Ry.getWebSocketConstructor(),m.params=e==null?void 0:e.params,m.logger=e==null?void 0:e.logger,m.heartbeatCallback=this._wrapHeartbeatCallback(e==null?void 0:e.heartbeatCallback),m.sessionStorage=(u=e==null?void 0:e.sessionStorage)!==null&&u!==void 0?u:pm(),m.reconnectAfterMs=(d=e==null?void 0:e.reconnectAfterMs)!==null&&d!==void 0?d:p=>dm[p-1]||hm;let v,k;const g=(c=e==null?void 0:e.vsn)!==null&&c!==void 0?c:jy;switch(g){case Oy:v=(p,y)=>y(JSON.stringify(p)),k=(p,y)=>y(JSON.parse(p));break;case nf:v=this.serializer.encode.bind(this.serializer),k=this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${m.vsn}`)}if(m.vsn=g,m.encode=(h=e==null?void 0:e.encode)!==null&&h!==void 0?h:v,m.decode=(f=e==null?void 0:e.decode)!==null&&f!==void 0?f:k,m.beforeReconnect=this._reconnectAuth.bind(this),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,m.params=Object.assign(Object.assign({},m.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl,m.autoSendHeartbeat=!this.worker}return m}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}}var Xn=class extends Error{constructor(t,e){var r;super(t),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((r=e.icebergType)==null?void 0:r.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function mm(t,e,r){const n=new URL(e,t);if(r)for(const[s,i]of Object.entries(r))i!==void 0&&n.searchParams.set(s,i);return n.toString()}async function vm(t){return!t||t.type==="none"?{}:t.type==="bearer"?{Authorization:`Bearer ${t.token}`}:t.type==="header"?{[t.name]:t.value}:t.type==="custom"?await t.getHeaders():{}}function wm(t){const e=t.fetchImpl??globalThis.fetch;return{async request({method:r,path:n,query:s,body:i,headers:o}){const a=mm(t.baseUrl,n,s),l=await vm(t.auth),u=await e(a,{method:r,headers:{...i?{"Content-Type":"application/json"}:{},...l,...o},body:i?JSON.stringify(i):void 0}),d=await u.text(),c=(u.headers.get("content-type")||"").includes("application/json"),h=c&&d?JSON.parse(d):d;if(!u.ok){const f=c?h:void 0,m=f==null?void 0:f.error;throw new Xn((m==null?void 0:m.message)??`Request failed with status ${u.status}`,{status:u.status,icebergType:m==null?void 0:m.type,icebergCode:m==null?void 0:m.code,details:f})}return{status:u.status,headers:u.headers,data:h}}}}function Ns(t){return t.join("")}var _m=class{constructor(t,e=""){this.client=t,this.prefix=e}async listNamespaces(t){const e=t?{parent:Ns(t.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(n=>({namespace:n}))}async createNamespace(t,e){const r={namespace:t.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:r})).data}async dropNamespace(t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Ns(t.namespace)}`})}async loadNamespaceMetadata(t){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Ns(t.namespace)}`})).data.properties}}async namespaceExists(t){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Ns(t.namespace)}`}),!0}catch(e){if(e instanceof Xn&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(t,e){try{return await this.createNamespace(t,e)}catch(r){if(r instanceof Xn&&r.status===409)return;throw r}}};function wr(t){return t.join("")}var km=class{constructor(t,e="",r){this.client=t,this.prefix=e,this.accessDelegation=r}async listTables(t){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${wr(t.namespace)}/tables`})).data.identifiers}async createTable(t,e){const r={};return this.accessDelegation&&(r["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${wr(t.namespace)}/tables`,body:e,headers:r})).data.metadata}async updateTable(t,e){const r=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${wr(t.namespace)}/tables/${t.name}`,body:e});return{"metadata-location":r.data["metadata-location"],metadata:r.data.metadata}}async dropTable(t,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${wr(t.namespace)}/tables/${t.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(t){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${wr(t.namespace)}/tables/${t.name}`,headers:e})).data.metadata}async tableExists(t){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${wr(t.namespace)}/tables/${t.name}`,headers:e}),!0}catch(r){if(r instanceof Xn&&r.status===404)return!1;throw r}}async createTableIfNotExists(t,e){try{return await this.createTable(t,e)}catch(r){if(r instanceof Xn&&r.status===409)return await this.loadTable({namespace:t.namespace,name:e.name});throw r}}},Sm=class{constructor(t){var n;let e="v1";t.catalogName&&(e+=`/${t.catalogName}`);const r=t.baseUrl.endsWith("/")?t.baseUrl:`${t.baseUrl}/`;this.client=wm({baseUrl:r,auth:t.auth,fetchImpl:t.fetch}),this.accessDelegation=(n=t.accessDelegation)==null?void 0:n.join(","),this.namespaceOps=new _m(this.client,e),this.tableOps=new km(this.client,e,this.accessDelegation)}async listNamespaces(t){return this.namespaceOps.listNamespaces(t)}async createNamespace(t,e){return this.namespaceOps.createNamespace(t,e)}async dropNamespace(t){await this.namespaceOps.dropNamespace(t)}async loadNamespaceMetadata(t){return this.namespaceOps.loadNamespaceMetadata(t)}async listTables(t){return this.tableOps.listTables(t)}async createTable(t,e){return this.tableOps.createTable(t,e)}async updateTable(t,e){return this.tableOps.updateTable(t,e)}async dropTable(t,e){await this.tableOps.dropTable(t,e)}async loadTable(t){return this.tableOps.loadTable(t)}async namespaceExists(t){return this.namespaceOps.namespaceExists(t)}async tableExists(t){return this.tableOps.tableExists(t)}async createNamespaceIfNotExists(t,e){return this.namespaceOps.createNamespaceIfNotExists(t,e)}async createTableIfNotExists(t,e){return this.tableOps.createTableIfNotExists(t,e)}};function Zn(t){"@babel/helpers - typeof";return Zn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Zn(t)}function bm(t,e){if(Zn(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,e);if(Zn(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Em(t){var e=bm(t,"string");return Zn(e)=="symbol"?e:e+""}function Tm(t,e,r){return(e=Em(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function cc(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),r.push.apply(r,n)}return r}function j(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?cc(Object(r),!0).forEach(function(n){Tm(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):cc(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}var Zi=class extends Error{constructor(t,e="storage",r,n){super(t),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=r,this.statusCode=n}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function eo(t){return typeof t=="object"&&t!==null&&"__isStorageError"in t}var Ua=class extends Zi{constructor(t,e,r,n="storage",s){super(t,n,e,r),this.name=n==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=r,this.code=s}toJSON(){return j(j({},super.toJSON()),{},{code:this.code})}},uf=class extends Zi{constructor(t,e,r="storage"){super(t,r),this.name=r==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};function Ci(t,e,r){const n=j({},t),s=e.toLowerCase();for(const i of Object.keys(n))i.toLowerCase()===s&&delete n[i];return n[s]=r,n}function xm(t){const e={};for(const[r,n]of Object.entries(t))e[r.toLowerCase()]=n;return e}const Cm=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),Rm=t=>{if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},za=t=>{if(Array.isArray(t))return t.map(r=>za(r));if(typeof t=="function"||t!==Object(t))return t;const e={};return Object.entries(t).forEach(([r,n])=>{const s=r.replace(/([-_][a-z])/gi,i=>i.toUpperCase().replace(/[-_]/g,""));e[s]=za(n)}),e},Pm=t=>!t||typeof t!="string"||t.length===0||t.length>100||t.trim()!==t||t.includes("/")||t.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(t),cf=t=>t.split("/").map(encodeURIComponent).join("/"),dc=t=>{if(typeof t=="object"&&t!==null){const e=t;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error;if(typeof e.error=="object"&&e.error!==null){const r=e.error;if(typeof r.message=="string")return r.message}}return JSON.stringify(t)},Am=async(t,e,r,n)=>{if(t!==null&&typeof t=="object"&&"json"in t&&typeof t.json=="function"){const s=t;let i=parseInt(String(s.status),10);Number.isFinite(i)||(i=500),s.json().then(o=>{const a=(o==null?void 0:o.statusCode)||(o==null?void 0:o.code)||i+"";e(new Ua(dc(o),i,a,n,o==null?void 0:o.code))}).catch(()=>{const o=i+"";e(new Ua(s.statusText||`HTTP ${i} error`,i,o,n))})}else e(new uf(dc(t),t,n))},Om=(t,e,r,n)=>{const s={method:t,headers:(e==null?void 0:e.headers)||{}};if(t==="GET"||t==="HEAD"||!n)return j(j({},s),r);if(Rm(n)){var i;const o=(e==null?void 0:e.headers)||{};let a;for(const[l,u]of Object.entries(o))l.toLowerCase()==="content-type"&&(a=u);s.headers=Ci(o,"Content-Type",(i=a)!==null&&i!==void 0?i:"application/json"),s.body=JSON.stringify(n)}else s.body=n;return e!=null&&e.duplex&&(s.duplex=e.duplex),j(j({},s),r)};async function gn(t,e,r,n,s,i,o){return new Promise((a,l)=>{t(r,Om(e,n,s,i)).then(u=>{if(!u.ok)throw u;if(n!=null&&n.noResolveJson)return u;if(o==="vectors"){const d=u.headers.get("content-type");if(u.headers.get("content-length")==="0"||u.status===204)return{};if(!d||!d.includes("application/json"))return{}}return u.json()}).then(u=>a(u)).catch(u=>Am(u,l,n,o))})}function df(t="storage"){return{get:async(e,r,n,s)=>gn(e,"GET",r,n,s,void 0,t),post:async(e,r,n,s,i)=>gn(e,"POST",r,s,i,n,t),put:async(e,r,n,s,i)=>gn(e,"PUT",r,s,i,n,t),head:async(e,r,n,s)=>gn(e,"HEAD",r,j(j({},n),{},{noResolveJson:!0}),s,void 0,t),remove:async(e,r,n,s,i)=>gn(e,"DELETE",r,s,i,n,t)}}const jm=df("storage"),{get:es,post:Ke,put:Ba,head:Im,remove:ts}=jm,Ae=df("vectors");var sn=class{constructor(t,e={},r,n="storage"){this.shouldThrowOnError=!1,this.url=t,this.headers=xm(e),this.fetch=Cm(r),this.namespace=n}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(t,e){return this.headers=Ci(this.headers,t,e),this}async handleOperation(t){var e=this;try{return{data:await t(),error:null}}catch(r){if(e.shouldThrowOnError)throw r;if(eo(r))return{data:null,error:r};throw r}}};let hf;hf=Symbol.toStringTag;var Nm=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[hf]="StreamDownloadBuilder",this.promise=null}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:(await t.downloadFn()).body,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(eo(e))return{data:null,error:e};throw e}}};let ff;ff=Symbol.toStringTag;var $m=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[ff]="BlobDownloadBuilder",this.promise=null}asStream(){return new Nm(this.downloadFn,this.shouldThrowOnError)}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:await(await t.downloadFn()).blob(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(eo(e))return{data:null,error:e};throw e}}};const Io={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},hc={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var Lm=class extends sn{constructor(t,e={},r,n){super(t,e,n,"storage"),this.bucketId=r}async uploadOrUpdate(t,e,r,n){var s=this;return s.handleOperation(async()=>{let i;const o=j(j({},hc),n);let a=j(j({},s.headers),t==="POST"&&{"x-upsert":String(o.upsert)});const l=o.metadata;if(typeof Blob<"u"&&r instanceof Blob?(i=new FormData,i.append("cacheControl",o.cacheControl),l&&i.append("metadata",s.encodeMetadata(l)),i.append("",r)):typeof FormData<"u"&&r instanceof FormData?(i=r,i.has("cacheControl")||i.append("cacheControl",o.cacheControl),l&&!i.has("metadata")&&i.append("metadata",s.encodeMetadata(l))):(i=r,a["cache-control"]=`max-age=${o.cacheControl}`,a["content-type"]=o.contentType,l&&(a["x-metadata"]=s.toBase64(s.encodeMetadata(l))),(typeof ReadableStream<"u"&&i instanceof ReadableStream||i&&typeof i=="object"&&"pipe"in i&&typeof i.pipe=="function")&&!o.duplex&&(o.duplex="half")),n!=null&&n.headers)for(const[h,f]of Object.entries(n.headers))a=Ci(a,h,f);const u=s._removeEmptyFolders(e),d=s._getFinalPath(u),c=await(t=="PUT"?Ba:Ke)(s.fetch,`${s.url}/object/${d}`,i,j({headers:a},o!=null&&o.duplex?{duplex:o.duplex}:{}));return{path:u,id:c.Id,fullPath:c.Key}})}async upload(t,e,r){return this.uploadOrUpdate("POST",t,e,r)}async uploadToSignedUrl(t,e,r,n){var s=this;const i=s._removeEmptyFolders(t),o=s._getFinalPath(i),a=new URL(s.url+`/object/upload/sign/${o}`);return a.searchParams.set("token",e),s.handleOperation(async()=>{let l;const u=j(j({},hc),n);let d=j(j({},s.headers),{"x-upsert":String(u.upsert)});const c=u.metadata;if(typeof Blob<"u"&&r instanceof Blob?(l=new FormData,l.append("cacheControl",u.cacheControl),c&&l.append("metadata",s.encodeMetadata(c)),l.append("",r)):typeof FormData<"u"&&r instanceof FormData?(l=r,l.has("cacheControl")||l.append("cacheControl",u.cacheControl),c&&!l.has("metadata")&&l.append("metadata",s.encodeMetadata(c))):(l=r,d["cache-control"]=`max-age=${u.cacheControl}`,d["content-type"]=u.contentType,c&&(d["x-metadata"]=s.toBase64(s.encodeMetadata(c))),(typeof ReadableStream<"u"&&l instanceof ReadableStream||l&&typeof l=="object"&&"pipe"in l&&typeof l.pipe=="function")&&!u.duplex&&(u.duplex="half")),n!=null&&n.headers)for(const[h,f]of Object.entries(n.headers))d=Ci(d,h,f);return{path:i,fullPath:(await Ba(s.fetch,a.toString(),l,j({headers:d},u!=null&&u.duplex?{duplex:u.duplex}:{}))).Key}})}async createSignedUploadUrl(t,e){var r=this;return r.handleOperation(async()=>{let n=r._getFinalPath(t);const s=j({},r.headers);e!=null&&e.upsert&&(s["x-upsert"]="true");const i=await Ke(r.fetch,`${r.url}/object/upload/sign/${n}`,{},{headers:s}),o=new URL(r.url+i.url),a=o.searchParams.get("token");if(!a)throw new Zi("No token returned by API");return{signedUrl:o.toString(),path:t,token:a}})}async update(t,e,r){return this.uploadOrUpdate("PUT",t,e,r)}async move(t,e,r){var n=this;return n.handleOperation(async()=>await Ke(n.fetch,`${n.url}/object/move`,{bucketId:n.bucketId,sourceKey:t,destinationKey:e,destinationBucket:r==null?void 0:r.destinationBucket},{headers:n.headers}))}async copy(t,e,r){var n=this;return n.handleOperation(async()=>({path:(await Ke(n.fetch,`${n.url}/object/copy`,{bucketId:n.bucketId,sourceKey:t,destinationKey:e,destinationBucket:r==null?void 0:r.destinationBucket},{headers:n.headers})).Key}))}async createSignedUrl(t,e,r){var n=this;return n.handleOperation(async()=>{let s=n._getFinalPath(t);const i=typeof(r==null?void 0:r.transform)=="object"&&r.transform!==null&&Object.keys(r.transform).length>0;let o=await Ke(n.fetch,`${n.url}/object/sign/${s}`,j({expiresIn:e},i?{transform:r.transform}:{}),{headers:n.headers});const a=new URLSearchParams;r!=null&&r.download&&a.set("download",r.download===!0?"":r.download),(r==null?void 0:r.cacheNonce)!=null&&a.set("cacheNonce",String(r.cacheNonce));const l=a.toString();return{signedUrl:encodeURI(`${n.url}${o.signedURL}${l?`&${l}`:""}`)}})}async createSignedUrls(t,e,r){var n=this;return n.handleOperation(async()=>{const s=await Ke(n.fetch,`${n.url}/object/sign/${n.bucketId}`,{expiresIn:e,paths:t},{headers:n.headers}),i=new URLSearchParams;r!=null&&r.download&&i.set("download",r.download===!0?"":r.download),(r==null?void 0:r.cacheNonce)!=null&&i.set("cacheNonce",String(r.cacheNonce));const o=i.toString();return s.map(a=>j(j({},a),{},{signedUrl:a.signedURL?encodeURI(`${n.url}${a.signedURL}${o?`&${o}`:""}`):null}))})}download(t,e,r){const n=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image/authenticated":"object",s=new URLSearchParams;e!=null&&e.transform&&this.applyTransformOptsToQuery(s,e.transform),(e==null?void 0:e.cacheNonce)!=null&&s.set("cacheNonce",String(e.cacheNonce));const i=s.toString(),o=this._getFinalPath(t),a=()=>es(this.fetch,`${this.url}/${n}/${o}${i?`?${i}`:""}`,{headers:this.headers,noResolveJson:!0},r);return new $m(a,this.shouldThrowOnError)}async info(t){var e=this;const r=e._getFinalPath(t);return e.handleOperation(async()=>za(await es(e.fetch,`${e.url}/object/info/${r}`,{headers:e.headers})))}async exists(t){var e=this;const r=e._getFinalPath(t);try{return await Im(e.fetch,`${e.url}/object/${r}`,{headers:e.headers}),{data:!0,error:null}}catch(s){if(e.shouldThrowOnError)throw s;if(eo(s)){var n;const i=s instanceof Ua?s.status:s instanceof uf?(n=s.originalError)===null||n===void 0?void 0:n.status:void 0;if(i!==void 0&&[400,404].includes(i))return{data:!1,error:s}}throw s}}getPublicUrl(t,e){const r=this._getFinalPath(t),n=new URLSearchParams;e!=null&&e.download&&n.set("download",e.download===!0?"":e.download),e!=null&&e.transform&&this.applyTransformOptsToQuery(n,e.transform),(e==null?void 0:e.cacheNonce)!=null&&n.set("cacheNonce",String(e.cacheNonce));const s=n.toString(),i=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${i}/public/${r}`)+(s?`?${s}`:"")}}}async remove(t){var e=this;return e.handleOperation(async()=>await ts(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:t},{headers:e.headers}))}async purgeCache(t,e,r){var n=this;return n.handleOperation(async()=>{const s=cf(n._getFinalPath(t)),i=new URLSearchParams;e!=null&&e.transformations&&i.set("transformations","true");const o=i.toString();return await ts(n.fetch,`${n.url}/cdn/${s}${o?`?${o}`:""}`,{},{headers:n.headers},r)})}async list(t,e,r){var n=this;return n.handleOperation(async()=>{const s=e!=null&&e.sortBy?j(j({},Io.sortBy),e.sortBy):Io.sortBy,i=j(j(j({},Io),e),{},{sortBy:s,prefix:t||""});return await Ke(n.fetch,`${n.url}/object/list/${n.bucketId}`,i,{headers:n.headers},r)})}async listV2(t,e){var r=this;return r.handleOperation(async()=>{const n=j({},t);return await Ke(r.fetch,`${r.url}/object/list-v2/${r.bucketId}`,n,{headers:r.headers},e)})}encodeMetadata(t){return JSON.stringify(t)}toBase64(t){return typeof Buffer<"u"?Buffer.from(t).toString("base64"):btoa(t)}_getFinalPath(t){return`${this.bucketId}/${t.replace(/^\/+/,"")}`}_removeEmptyFolders(t){return t.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(t,e){return e.width&&t.set("width",e.width.toString()),e.height&&t.set("height",e.height.toString()),e.resize&&t.set("resize",e.resize),e.format&&t.set("format",e.format),e.quality&&t.set("quality",e.quality.toString()),t}};const Dm="2.112.2",hs={"X-Client-Info":`storage-js/${Dm}`};var Um=class extends sn{constructor(t,e={},r,n){const s=new URL(t);n!=null&&n.useNewHostname&&/supabase\.(co|in|red)$/.test(s.hostname)&&!s.hostname.includes("storage.supabase.")&&(s.hostname=s.hostname.replace("supabase.","storage.supabase."));const i=s.href.replace(/\/$/,""),o=j(j({},hs),e);super(i,o,r,"storage")}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const r=e.listBucketOptionsToQueryString(t);return await es(e.fetch,`${e.url}/bucket${r}`,{headers:e.headers})})}async getBucket(t){var e=this;return e.handleOperation(async()=>await es(e.fetch,`${e.url}/bucket/${t}`,{headers:e.headers}))}async createBucket(t,e={public:!1}){var r=this;return r.handleOperation(async()=>await Ke(r.fetch,`${r.url}/bucket`,{id:t,name:t,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:r.headers}))}async updateBucket(t,e){var r=this;return r.handleOperation(async()=>await Ba(r.fetch,`${r.url}/bucket/${t}`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:r.headers}))}async emptyBucket(t){var e=this;return e.handleOperation(async()=>await Ke(e.fetch,`${e.url}/bucket/${t}/empty`,{},{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await ts(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}async purgeBucketCache(t,e,r){var n=this;return n.handleOperation(async()=>{const s=new URLSearchParams;e!=null&&e.transformations&&s.set("transformations","true");const i=s.toString();return await ts(n.fetch,`${n.url}/cdn/${cf(t)}${i?`?${i}`:""}`,{},{headers:n.headers},r)})}listBucketOptionsToQueryString(t){const e={};return t&&("limit"in t&&(e.limit=String(t.limit)),"offset"in t&&(e.offset=String(t.offset)),t.search&&(e.search=t.search),t.sortColumn&&(e.sortColumn=t.sortColumn),t.sortOrder&&(e.sortOrder=t.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},zm=class extends sn{constructor(t,e={},r){const n=t.replace(/\/$/,""),s=j(j({},hs),e);super(n,s,r,"storage")}async createBucket(t){var e=this;return e.handleOperation(async()=>await Ke(e.fetch,`${e.url}/bucket`,{name:t},{headers:e.headers}))}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const r=new URLSearchParams;(t==null?void 0:t.limit)!==void 0&&r.set("limit",t.limit.toString()),(t==null?void 0:t.offset)!==void 0&&r.set("offset",t.offset.toString()),t!=null&&t.sortColumn&&r.set("sortColumn",t.sortColumn),t!=null&&t.sortOrder&&r.set("sortOrder",t.sortOrder),t!=null&&t.search&&r.set("search",t.search);const n=r.toString(),s=n?`${e.url}/bucket?${n}`:`${e.url}/bucket`;return await es(e.fetch,s,{headers:e.headers})})}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await ts(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}from(t){var e=this;if(!Pm(t))throw new Zi("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const r=new Sm({baseUrl:this.url,catalogName:t,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),n=this.shouldThrowOnError;return new Proxy(r,{get(s,i){const o=s[i];return typeof o!="function"?o:async(...a)=>{try{return{data:await o.apply(s,a),error:null}}catch(l){if(n)throw l;return{data:null,error:l}}}}})}},Bm=class extends sn{constructor(t,e={},r){const n=t.replace(/\/$/,""),s=j(j({},hs),{},{"Content-Type":"application/json"},e);super(n,s,r,"vectors")}async createIndex(t){var e=this;return e.handleOperation(async()=>await Ae.post(e.fetch,`${e.url}/CreateIndex`,t,{headers:e.headers})||{})}async getIndex(t,e){var r=this;return r.handleOperation(async()=>await Ae.post(r.fetch,`${r.url}/GetIndex`,{vectorBucketName:t,indexName:e},{headers:r.headers}))}async listIndexes(t){var e=this;return e.handleOperation(async()=>await Ae.post(e.fetch,`${e.url}/ListIndexes`,t,{headers:e.headers}))}async deleteIndex(t,e){var r=this;return r.handleOperation(async()=>await Ae.post(r.fetch,`${r.url}/DeleteIndex`,{vectorBucketName:t,indexName:e},{headers:r.headers})||{})}},Mm=class extends sn{constructor(t,e={},r){const n=t.replace(/\/$/,""),s=j(j({},hs),{},{"Content-Type":"application/json"},e);super(n,s,r,"vectors")}async putVectors(t){var e=this;if(t.vectors.length<1||t.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await Ae.post(e.fetch,`${e.url}/PutVectors`,t,{headers:e.headers})||{})}async getVectors(t){var e=this;return e.handleOperation(async()=>await Ae.post(e.fetch,`${e.url}/GetVectors`,t,{headers:e.headers}))}async listVectors(t){var e=this;if(t.segmentCount!==void 0){if(t.segmentCount<1||t.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(t.segmentIndex!==void 0&&(t.segmentIndex<0||t.segmentIndex>=t.segmentCount))throw new Error(`segmentIndex must be between 0 and ${t.segmentCount-1}`)}return e.handleOperation(async()=>await Ae.post(e.fetch,`${e.url}/ListVectors`,t,{headers:e.headers}))}async queryVectors(t){var e=this;return e.handleOperation(async()=>await Ae.post(e.fetch,`${e.url}/QueryVectors`,t,{headers:e.headers}))}async deleteVectors(t){var e=this;if(t.keys.length<1||t.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await Ae.post(e.fetch,`${e.url}/DeleteVectors`,t,{headers:e.headers})||{})}},Fm=class extends sn{constructor(t,e={},r){const n=t.replace(/\/$/,""),s=j(j({},hs),{},{"Content-Type":"application/json"},e);super(n,s,r,"vectors")}async createBucket(t){var e=this;return e.handleOperation(async()=>await Ae.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}async getBucket(t){var e=this;return e.handleOperation(async()=>await Ae.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:t},{headers:e.headers}))}async listBuckets(t={}){var e=this;return e.handleOperation(async()=>await Ae.post(e.fetch,`${e.url}/ListVectorBuckets`,t,{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await Ae.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}},Hm=class extends Fm{constructor(t,e={}){super(t,e.headers||{},e.fetch)}from(t){return new Wm(this.url,this.headers,t,this.fetch)}async createBucket(t){var e=()=>super.createBucket,r=this;return e().call(r,t)}async getBucket(t){var e=()=>super.getBucket,r=this;return e().call(r,t)}async listBuckets(t={}){var e=()=>super.listBuckets,r=this;return e().call(r,t)}async deleteBucket(t){var e=()=>super.deleteBucket,r=this;return e().call(r,t)}},Wm=class extends Bm{constructor(t,e,r,n){super(t,e,n),this.vectorBucketName=r}async createIndex(t){var e=()=>super.createIndex,r=this;return e().call(r,j(j({},t),{},{vectorBucketName:r.vectorBucketName}))}async listIndexes(t={}){var e=()=>super.listIndexes,r=this;return e().call(r,j(j({},t),{},{vectorBucketName:r.vectorBucketName}))}async getIndex(t){var e=()=>super.getIndex,r=this;return e().call(r,r.vectorBucketName,t)}async deleteIndex(t){var e=()=>super.deleteIndex,r=this;return e().call(r,r.vectorBucketName,t)}index(t){return new Vm(this.url,this.headers,this.vectorBucketName,t,this.fetch)}},Vm=class extends Mm{constructor(t,e,r,n,s){super(t,e,s),this.vectorBucketName=r,this.indexName=n}async putVectors(t){var e=()=>super.putVectors,r=this;return e().call(r,j(j({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async getVectors(t){var e=()=>super.getVectors,r=this;return e().call(r,j(j({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async listVectors(t={}){var e=()=>super.listVectors,r=this;return e().call(r,j(j({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async queryVectors(t){var e=()=>super.queryVectors,r=this;return e().call(r,j(j({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async deleteVectors(t){var e=()=>super.deleteVectors,r=this;return e().call(r,j(j({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}},qm=class extends Um{constructor(t,e={},r,n){super(t,e,r,n)}from(t){return new Lm(this.url,this.headers,t,this.fetch)}get vectors(){return new Hm(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new zm(this.url+"/iceberg",this.headers,this.fetch)}};const pf="2.112.2",pt=30*1e3,kn=3,No=kn*pt,Km=2*pt,Gm="http://localhost:9999",Jm="supabase.auth.token",Qm={"X-Client-Info":`gotrue-js/${pf}`},Ma="X-Supabase-Api-Version",gf={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Ym=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,or="sb_flow_id",Xm=5,Zm=10*60*1e3;class rs extends Error{constructor(e,r,n){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=r,this.code=n}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}}function C(t){return typeof t=="object"&&t!==null&&"__isAuthError"in t}class ev extends rs{constructor(e,r,n){super(e,r,n),this.name="AuthApiError",this.status=r,this.code=n}}function fc(t){return C(t)&&t.name==="AuthApiError"}class Qe extends rs{constructor(e,r){super(e),this.name="AuthUnknownError",this.originalError=r}}class lt extends rs{constructor(e,r,n,s){super(e,n,s),this.name=r,this.status=n}}class ie extends lt{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function $s(t){return C(t)&&t.name==="AuthSessionMissingError"}class _r extends lt{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Ls extends lt{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Ds extends lt{constructor(e,r=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=r}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}function tv(t){return C(t)&&t.name==="AuthImplicitGrantRedirectError"}class pc extends lt{constructor(e,r=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=r}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}class rv extends lt{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Zs extends lt{constructor(e,r){super(e,"AuthRetryableFetchError",r,void 0)}}function Us(t){return C(t)&&t.name==="AuthRetryableFetchError"}class gc extends lt{constructor(e="Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)"){super(e,"AuthRefreshDiscardedError",409,void 0)}}function nv(t){return C(t)&&t.name==="AuthRefreshDiscardedError"}class yc extends lt{constructor(e,r,n){super(e,"AuthWeakPasswordError",r,"weak_password"),this.reasons=n}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}}class Ri extends lt{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const Pi="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),mc=` 	
\r=`.split(""),sv=(()=>{const t=new Array(128);for(let e=0;e<t.length;e+=1)t[e]=-1;for(let e=0;e<mc.length;e+=1)t[mc[e].charCodeAt(0)]=-2;for(let e=0;e<Pi.length;e+=1)t[Pi[e].charCodeAt(0)]=e;return t})();function vc(t,e,r){if(t!==null)for(e.queue=e.queue<<8|t,e.queuedBits+=8;e.queuedBits>=6;){const n=e.queue>>e.queuedBits-6&63;r(Pi[n]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const n=e.queue>>e.queuedBits-6&63;r(Pi[n]),e.queuedBits-=6}}function yf(t,e,r){const n=sv[t];if(n>-1)for(e.queue=e.queue<<6|n,e.queuedBits+=6;e.queuedBits>=8;)r(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(n===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(t)}"`)}}function wc(t){const e=[],r=o=>{e.push(String.fromCodePoint(o))},n={utf8seq:0,codepoint:0},s={queue:0,queuedBits:0},i=o=>{av(o,n,r)};for(let o=0;o<t.length;o+=1)yf(t.charCodeAt(o),s,i);return e.join("")}function iv(t,e){if(t<=127){e(t);return}else if(t<=2047){e(192|t>>6),e(128|t&63);return}else if(t<=65535){e(224|t>>12),e(128|t>>6&63),e(128|t&63);return}else if(t<=1114111){e(240|t>>18),e(128|t>>12&63),e(128|t>>6&63),e(128|t&63);return}throw new Error(`Unrecognized Unicode codepoint: ${t.toString(16)}`)}function ov(t,e){for(let r=0;r<t.length;r+=1){let n=t.charCodeAt(r);if(n>55295&&n<=56319){const s=(n-55296)*1024&65535;n=(t.charCodeAt(r+1)-56320&65535|s)+65536,r+=1}iv(n,e)}}function av(t,e,r){if(e.utf8seq===0){if(t<=127){r(t);return}for(let n=1;n<6;n+=1)if(!(t>>7-n&1)){e.utf8seq=n;break}if(e.utf8seq===2)e.codepoint=t&31;else if(e.utf8seq===3)e.codepoint=t&15;else if(e.utf8seq===4)e.codepoint=t&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(t<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|t&63,e.utf8seq-=1,e.utf8seq===0&&r(e.codepoint)}}function qr(t){const e=[],r={queue:0,queuedBits:0},n=s=>{e.push(s)};for(let s=0;s<t.length;s+=1)yf(t.charCodeAt(s),r,n);return new Uint8Array(e)}function lv(t){const e=[];return ov(t,r=>e.push(r)),new Uint8Array(e)}function ar(t){const e=[],r={queue:0,queuedBits:0},n=s=>{e.push(s)};return t.forEach(s=>vc(s,r,n)),vc(null,r,n),e.join("")}function uv(t){return Math.round(Date.now()/1e3)+t}function cv(){return Symbol("auth-callback")}const le=()=>typeof window<"u"&&typeof document<"u",Xt={tested:!1,writable:!1},mf=()=>{if(!le())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(Xt.tested)return Xt.writable;const t=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(t,t),globalThis.localStorage.removeItem(t),Xt.tested=!0,Xt.writable=!0}catch{Xt.tested=!0,Xt.writable=!1}return Xt.writable};function _c(t){const e={},r=new URL(t);if(r.hash&&r.hash[0]==="#")try{new URLSearchParams(r.hash.substring(1)).forEach((s,i)=>{e[i]=s})}catch{}return r.searchParams.forEach((n,s)=>{e[s]=n}),e}const vf=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),dv=t=>typeof t=="object"&&t!==null&&"status"in t&&"ok"in t&&"json"in t&&typeof t.json=="function",yt=async(t,e,r)=>{await t.setItem(e,JSON.stringify(r))},pe=async(t,e)=>{const r=await t.getItem(e);if(!r)return null;try{return JSON.parse(r)}catch{return null}},Ee=async(t,e)=>{await t.removeItem(e)};class to{constructor(){this.promise=new to.promiseConstructor((e,r)=>{this.resolve=e,this.reject=r})}}to.promiseConstructor=Promise;function zs(t){const e=t.split(".");if(e.length!==3)throw new Ri("Invalid JWT structure");for(let n=0;n<e.length;n++)if(!Ym.test(e[n]))throw new Ri("JWT not in base64url format");return{header:JSON.parse(wc(e[0])),payload:JSON.parse(wc(e[1])),signature:qr(e[2]),raw:{header:e[0],payload:e[1]}}}async function hv(t){return await new Promise(e=>{setTimeout(()=>e(null),t)})}function fv(t,e){return new Promise((n,s)=>{(async()=>{for(let i=0;i<1/0;i++)try{const o=await t(i);if(!e(i,null,o)){n(o);return}}catch(o){if(!e(i,o)){s(o);return}}})()})}function wf(t){return("0"+t.toString(16)).substr(-2)}function pv(){const e=new Uint32Array(56);if(typeof crypto>"u"){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",n=r.length;let s="";for(let i=0;i<56;i++)s+=r.charAt(Math.floor(Math.random()*n));return s}return crypto.getRandomValues(e),Array.from(e,wf).join("")}async function gv(t){const r=new TextEncoder().encode(t),n=await crypto.subtle.digest("SHA-256",r),s=new Uint8Array(n);return Array.from(s).map(i=>String.fromCharCode(i)).join("")}async function yv(t){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),t;const r=await gv(t);return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}const mv=/^[a-zA-Z0-9_-]{8,64}$/;function ei(t){return typeof t=="string"&&mv.test(t)?t:null}function vv(){if(typeof crypto<"u"&&typeof crypto.getRandomValues=="function"){const e=new Uint8Array(16);return crypto.getRandomValues(e),Array.from(e,wf).join("")}let t="";for(let e=0;e<32;e++)t+=Math.floor(Math.random()*16).toString(16);return t}const en=(t,e)=>`${t}-flow-${e}-code-verifier`,ns=t=>`${t}-flows-code-verifier`;async function Bl(t,e){const r=await pe(t,ns(e));return Array.isArray(r)?r.filter(n=>ei(n)!==null):[]}async function wv(t,e,r,n,s){await yt(t,en(e,r),n);const i=(await Bl(t,e)).filter(o=>o!==r);for(i.push(r);i.length>Xm;){const o=i.shift();await Ee(t,en(e,o)),s==null||s(o)}await yt(t,ns(e),i),await yt(t,`${e}-code-verifier`,n)}async function _v(t,e,r){if(r){const s=await pe(t,en(e,r));return{verifier:typeof s=="string"?s:null,flowId:r}}const n=await pe(t,`${e}-code-verifier`);return{verifier:typeof n=="string"?n:null,flowId:null}}async function We(t,e,r){const n=`${e}-code-verifier`;if(!r){await Ee(t,n);return}const s=en(e,r),i=await pe(t,s);await Ee(t,s);const o=await Bl(t,e),a=o.filter(l=>l!==r);a.length!==o.length&&(a.length>0?await yt(t,ns(e),a):await Ee(t,ns(e))),i!=null&&i===await pe(t,n)&&await Ee(t,n)}async function kv(t,e){const r=await Bl(t,e);for(const n of r)await Ee(t,en(e,n));await Ee(t,ns(e)),await Ee(t,`${e}-code-verifier`)}function Sv(t,e){const r=t.indexOf("#");let n=r===-1?t:t.slice(0,r);const s=r===-1?"":t.slice(r),i=n.indexOf("?");if(i!==-1){const a=n.slice(0,i),l=n.slice(i+1).split("&").filter(u=>u!==""&&u!==or&&!u.startsWith(`${or}=`));n=l.length>0?`${a}?${l.join("&")}`:a}const o=n.includes("?")?"&":"?";return`${n}${o}${or}=${encodeURIComponent(e)}${s}`}async function bv(t,e,r=!1,n){const s=pv();let i=s;r&&(i+="/recovery");const o=vv();await wv(t,e,o,i,n);const a=await yv(s);return[a,s===a?"plain":"s256",o]}const Ev=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Tv(t){const e=t.headers.get(Ma);if(!e||!e.match(Ev))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function xv(t){if(!t)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(t<=e)throw new Error("JWT has expired")}function Cv(t){switch(t){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Rv=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function ut(t){if(!Rv.test(t))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function Ve(t){if(!t.passkey)throw new Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).")}function $o(){const t={};return new Proxy(t,{get:(e,r)=>{if(r==="__isUserNotAvailableProxy")return!0;if(typeof r=="symbol"){const n=r.toString();if(n==="Symbol(Symbol.toPrimitive)"||n==="Symbol(Symbol.toStringTag)"||n==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${r}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function Pv(t,e){return new Proxy(t,{get:(r,n,s)=>{if(n==="__isInsecureUserWarningProxy")return!0;if(typeof n=="symbol"){const i=n.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)"||i==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(r,n,s)}return!e.value&&typeof n=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(r,n,s)}})}function kc(t){return JSON.parse(JSON.stringify(t))}const tr=t=>{if(typeof t=="object"&&t!==null){const e=t;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error}return JSON.stringify(t)},Sc=[500,501,502,503,504,520,521,522,523,524,525,526,527,528,529,530];async function bc(t){var e;if(!dv(t))throw new Zs(tr(t),0);let r;try{r=await t.json()}catch(i){throw Sc.includes(t.status)?new Zs(t.statusText||`HTTP ${t.status}`,t.status):new Qe(tr(i),i)}if(Sc.includes(t.status))throw new Zs(tr(r),t.status);let n;const s=Tv(t);if(s&&s.getTime()>=gf["2024-01-01"].timestamp&&typeof r=="object"&&r&&typeof r.code=="string"?n=r.code:typeof r=="object"&&r&&typeof r.error_code=="string"&&(n=r.error_code),n){if(n==="weak_password")throw new yc(tr(r),t.status,((e=r.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(n==="session_not_found")throw new ie}else if(typeof r=="object"&&r&&typeof r.weak_password=="object"&&r.weak_password&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.reasons.reduce((i,o)=>i&&typeof o=="string",!0))throw new yc(tr(r),t.status,r.weak_password.reasons);throw new ev(tr(r),t.status||500,n)}const Av=(t,e,r,n)=>{const s={method:t,headers:(e==null?void 0:e.headers)||{}};return t==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),s.body=JSON.stringify(n),Object.assign(Object.assign({},s),r))};async function O(t,e,r,n){var s;const i=Object.assign({},n==null?void 0:n.headers);i[Ma]||(i[Ma]=gf["2024-01-01"].name),n!=null&&n.jwt&&(i.Authorization=`Bearer ${n.jwt}`);const o=(s=n==null?void 0:n.query)!==null&&s!==void 0?s:{};n!=null&&n.redirectTo&&(o.redirect_to=n.redirectTo);const a=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",l=await Ov(t,e,r+a,{headers:i,noResolveJson:n==null?void 0:n.noResolveJson},{},n==null?void 0:n.body);return n!=null&&n.xform?n==null?void 0:n.xform(l):{data:Object.assign({},l),error:null}}async function Ov(t,e,r,n,s,i){const o=Av(e,n,s,i);let a;try{a=await t(r,Object.assign({},o))}catch(l){throw new Zs(tr(l),0)}if(a.ok||await bc(a),n!=null&&n.noResolveJson)return a;try{return await a.json()}catch(l){await bc(l)}}function Le(t){var e;let r=null;Nv(t)&&(r=Object.assign({},t),t.expires_at||(r.expires_at=uv(t.expires_in)));const n=(e=t.user)!==null&&e!==void 0?e:typeof(t==null?void 0:t.id)=="string"?t:null;return{data:{session:r,user:n},error:null}}function Ec(t){const e=Le(t);return!e.error&&t.weak_password&&typeof t.weak_password=="object"&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.message&&typeof t.weak_password.message=="string"&&t.weak_password.reasons.reduce((r,n)=>r&&typeof n=="string",!0)&&(e.data.weak_password=t.weak_password),e}function Ot(t){var e;return{data:{user:(e=t.user)!==null&&e!==void 0?e:t},error:null}}function jv(t){return{data:t,error:null}}function Iv(t){const{action_link:e,email_otp:r,hashed_token:n,redirect_to:s,verification_type:i}=t,o=Xi(t,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),a={action_link:e,email_otp:r,hashed_token:n,redirect_to:s,verification_type:i},l=Object.assign({},o);return{data:{properties:a,user:l},error:null}}function Tc(t){return t}function Nv(t){return!!t.access_token&&!!t.refresh_token&&!!t.expires_in}const Lo=["global","local","others"];class $v{constructor({url:e="",headers:r={},fetch:n,experimental:s}){this.url=e,this.headers=r,this.fetch=vf(n),this.experimental=s??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(e,r=Lo[0]){if(Lo.indexOf(r)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${Lo.join(", ")}`);try{return await O(this.fetch,"POST",`${this.url}/logout?scope=${r}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(n){if(C(n))return{data:null,error:n};throw n}}async inviteUserByEmail(e,r={}){try{return await O(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:r.data},headers:this.headers,redirectTo:r.redirectTo,xform:Ot})}catch(n){if(C(n))return{data:{user:null},error:n};throw n}}async generateLink(e){try{const{options:r}=e,n=Xi(e,["options"]),s=Object.assign(Object.assign({},n),r);return"newEmail"in n&&(s.new_email=n==null?void 0:n.newEmail,delete s.newEmail),await O(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:Iv,redirectTo:r==null?void 0:r.redirectTo})}catch(r){if(C(r))return{data:{properties:null,user:null},error:r};throw r}}async createUser(e){try{return await O(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Ot})}catch(r){if(C(r))return{data:{user:null},error:r};throw r}}async listUsers(e){var r,n,s,i,o,a,l;try{const u={nextPage:null,lastPage:0,total:0},d=await O(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(n=(r=e==null?void 0:e.page)===null||r===void 0?void 0:r.toString())!==null&&n!==void 0?n:"",per_page:(i=(s=e==null?void 0:e.perPage)===null||s===void 0?void 0:s.toString())!==null&&i!==void 0?i:""},xform:Tc});if(d.error)throw d.error;const c=await d.json(),h=(o=d.headers.get("x-total-count"))!==null&&o!==void 0?o:0,f=(l=(a=d.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return f.length>0&&(f.forEach(m=>{const v=parseInt(m.split(";")[0].split("=")[1].substring(0,1)),k=JSON.parse(m.split(";")[1].split("=")[1]);u[`${k}Page`]=v}),u.total=parseInt(h)),{data:Object.assign(Object.assign({},c),u),error:null}}catch(u){if(C(u))return{data:{users:[]},error:u};throw u}}async getUserById(e){ut(e);try{return await O(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Ot})}catch(r){if(C(r))return{data:{user:null},error:r};throw r}}async updateUserById(e,r){ut(e);try{return await O(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:r,headers:this.headers,xform:Ot})}catch(n){if(C(n))return{data:{user:null},error:n};throw n}}async deleteUser(e,r=!1){ut(e);try{return await O(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:r},xform:Ot})}catch(n){if(C(n))return{data:{user:null},error:n};throw n}}async _listFactors(e){ut(e.userId);try{const{data:r,error:n}=await O(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:s=>({data:{factors:s},error:null})});return{data:r,error:n}}catch(r){if(C(r))return{data:null,error:r};throw r}}async _deleteFactor(e){ut(e.userId),ut(e.id);try{return{data:await O(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(r){if(C(r))return{data:null,error:r};throw r}}async _listOAuthClients(e){var r,n,s,i,o,a,l;try{const u={nextPage:null,lastPage:0,total:0},d=await O(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(n=(r=e==null?void 0:e.page)===null||r===void 0?void 0:r.toString())!==null&&n!==void 0?n:"",per_page:(i=(s=e==null?void 0:e.perPage)===null||s===void 0?void 0:s.toString())!==null&&i!==void 0?i:""},xform:Tc});if(d.error)throw d.error;const c=await d.json(),h=(o=d.headers.get("x-total-count"))!==null&&o!==void 0?o:0,f=(l=(a=d.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return f.length>0&&(f.forEach(m=>{const v=parseInt(m.split(";")[0].split("=")[1].substring(0,1)),k=JSON.parse(m.split(";")[1].split("=")[1]);u[`${k}Page`]=v}),u.total=parseInt(h)),{data:Object.assign(Object.assign({},c),u),error:null}}catch(u){if(C(u))return{data:{clients:[]},error:u};throw u}}async _createOAuthClient(e){try{return await O(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(C(r))return{data:null,error:r};throw r}}async _getOAuthClient(e){try{return await O(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(C(r))return{data:null,error:r};throw r}}async _updateOAuthClient(e,r){try{return await O(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:r,headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(C(n))return{data:null,error:n};throw n}}async _deleteOAuthClient(e){try{return await O(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(C(r))return{data:null,error:r};throw r}}async _regenerateOAuthClientSecret(e){try{return await O(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(C(r))return{data:null,error:r};throw r}}async _listCustomProviders(e){try{const r={};return e!=null&&e.type&&(r.type=e.type),await O(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:r,xform:n=>{var s;return{data:{providers:(s=n==null?void 0:n.providers)!==null&&s!==void 0?s:[]},error:null}}})}catch(r){if(C(r))return{data:{providers:[]},error:r};throw r}}async _createCustomProvider(e){try{return await O(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(C(r))return{data:null,error:r};throw r}}async _getCustomProvider(e){try{return await O(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(C(r))return{data:null,error:r};throw r}}async _updateCustomProvider(e,r){try{return await O(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:r,headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(C(n))return{data:null,error:n};throw n}}async _deleteCustomProvider(e){try{return await O(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(C(r))return{data:null,error:r};throw r}}async _adminListPasskeys(e){Ve(this.experimental),ut(e.userId);try{return await O(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/passkeys`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(C(r))return{data:null,error:r};throw r}}async _adminDeletePasskey(e){Ve(this.experimental),ut(e.userId),ut(e.passkeyId);try{return await O(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(C(r))return{data:null,error:r};throw r}}}function xc(t={}){return{getItem:e=>t[e]||null,setItem:(e,r)=>{t[e]=r},removeItem:e=>{delete t[e]}}}globalThis&&mf()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug");class Lv extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}function Dv(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function _f(t){if(!/^0x[a-fA-F0-9]{40}$/.test(t))throw new Error(`@supabase/auth-js: Address "${t}" is invalid.`);return t.toLowerCase()}function Uv(t){return parseInt(t,16)}function zv(t){const e=new TextEncoder().encode(t);return"0x"+Array.from(e,n=>n.toString(16).padStart(2,"0")).join("")}function Bv(t){var e;const{chainId:r,domain:n,expirationTime:s,issuedAt:i=new Date,nonce:o,notBefore:a,requestId:l,resources:u,scheme:d,uri:c,version:h}=t;{if(!Number.isInteger(r))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`);if(!n)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(o&&o.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${o}`);if(!c)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(h!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${h}`);if(!((e=t.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${t.statement}`)}const f=_f(t.address),m=d?`${d}://${n}`:n,v=t.statement?`${t.statement}
`:"",k=`${m} wants you to sign in with your Ethereum account:
${f}

${v}`;let g=`URI: ${c}
Version: ${h}
Chain ID: ${r}${o?`
Nonce: ${o}`:""}
Issued At: ${i.toISOString()}`;if(s&&(g+=`
Expiration Time: ${s.toISOString()}`),a&&(g+=`
Not Before: ${a.toISOString()}`),l&&(g+=`
Request ID: ${l}`),u){let p=`
Resources:`;for(const y of u){if(!y||typeof y!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${y}`);p+=`
- ${y}`}g+=p}return`${k}
${g}`}class Z extends Error{constructor({message:e,code:r,cause:n,name:s}){var i;super(e,{cause:n}),this.__isWebAuthnError=!0,this.name=(i=s??(n instanceof Error?n.name:void 0))!==null&&i!==void 0?i:"Unknown Error",this.code=r}toJSON(){return{name:this.name,message:this.message,code:this.code}}}class Ai extends Z{constructor(e,r){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r,message:e}),this.name="WebAuthnUnknownError",this.originalError=r}}function Mv({error:t,options:e}){var r,n,s;const{publicKey:i}=e;if(!i)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new Z({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else if(t.name==="ConstraintError"){if(((r=i.authenticatorSelection)===null||r===void 0?void 0:r.requireResidentKey)===!0)return new Z({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:t});if(e.mediation==="conditional"&&((n=i.authenticatorSelection)===null||n===void 0?void 0:n.userVerification)==="required")return new Z({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:t});if(((s=i.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new Z({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:t})}else{if(t.name==="InvalidStateError")return new Z({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:t});if(t.name==="NotAllowedError")return new Z({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="NotSupportedError")return i.pubKeyCredParams.filter(a=>a.type==="public-key").length===0?new Z({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:t}):new Z({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:t});if(t.name==="SecurityError"){const o=window.location.hostname;if(kf(o)){if(i.rp.id!==o)return new Z({message:`The RP ID "${i.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new Z({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="TypeError"){if(i.user.id.byteLength<1||i.user.id.byteLength>64)return new Z({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:t})}else if(t.name==="UnknownError")return new Z({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new Z({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}function Fv({error:t,options:e}){const{publicKey:r}=e;if(!r)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new Z({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else{if(t.name==="NotAllowedError")return new Z({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="SecurityError"){const n=window.location.hostname;if(kf(n)){if(r.rpId!==n)return new Z({message:`The RP ID "${r.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new Z({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="UnknownError")return new Z({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new Z({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}class Hv{createNewAbortSignal(){if(this.controller){const r=new Error("Cancelling existing WebAuthn API call for new one");r.name="AbortError",this.controller.abort(r)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const Fa=new Hv;function Cc(t){if(!t)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(t);const{challenge:e,user:r,excludeCredentials:n}=t,s=Xi(t,["challenge","user","excludeCredentials"]),i=qr(e).buffer,o=Object.assign(Object.assign({},r),{id:qr(r.id).buffer}),a=Object.assign(Object.assign({},s),{challenge:i,user:o});if(n&&n.length>0){a.excludeCredentials=new Array(n.length);for(let l=0;l<n.length;l++){const u=n[l];a.excludeCredentials[l]=Object.assign(Object.assign({},u),{id:qr(u.id).buffer,type:u.type||"public-key",transports:u.transports})}}return a}function Rc(t){if(!t)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(t);const{challenge:e,allowCredentials:r}=t,n=Xi(t,["challenge","allowCredentials"]),s=qr(e).buffer,i=Object.assign(Object.assign({},n),{challenge:s});if(r&&r.length>0){i.allowCredentials=new Array(r.length);for(let o=0;o<r.length;o++){const a=r[o];i.allowCredentials[o]=Object.assign(Object.assign({},a),{id:qr(a.id).buffer,type:a.type||"public-key",transports:a.transports})}}return i}function Pc(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t;return{id:t.id,rawId:t.id,response:{attestationObject:ar(new Uint8Array(t.response.attestationObject)),clientDataJSON:ar(new Uint8Array(t.response.clientDataJSON))},type:"public-key",clientExtensionResults:t.getClientExtensionResults(),authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Ac(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t,n=t.getClientExtensionResults(),s=t.response;return{id:t.id,rawId:t.id,response:{authenticatorData:ar(new Uint8Array(s.authenticatorData)),clientDataJSON:ar(new Uint8Array(s.clientDataJSON)),signature:ar(new Uint8Array(s.signature)),userHandle:s.userHandle?ar(new Uint8Array(s.userHandle)):void 0},type:"public-key",clientExtensionResults:n,authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function kf(t){return t==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t)}function Oi(){var t,e;return!!(le()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((t=navigator==null?void 0:navigator.credentials)===null||t===void 0?void 0:t.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function Sf(t){try{const e=await navigator.credentials.create(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Ai("Browser returned unexpected credential type",e)}:{data:null,error:new Ai("Empty credential response",e)}}catch(e){return{data:null,error:Mv({error:e,options:t})}}}async function bf(t){try{const e=await navigator.credentials.get(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Ai("Browser returned unexpected credential type",e)}:{data:null,error:new Ai("Empty credential response",e)}}catch(e){return{data:null,error:Fv({error:e,options:t})}}}const Wv={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Vv={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function ji(...t){const e=s=>s!==null&&typeof s=="object"&&!Array.isArray(s),r=s=>s instanceof ArrayBuffer||ArrayBuffer.isView(s),n={};for(const s of t)if(s)for(const i in s){const o=s[i];if(o!==void 0)if(Array.isArray(o))n[i]=o;else if(r(o))n[i]=o;else if(e(o)){const a=n[i];e(a)?n[i]=ji(a,o):n[i]=ji(o)}else n[i]=o}return n}function qv(t,e){return ji(Wv,t,e||{})}function Kv(t,e){return ji(Vv,t,e||{})}class Gv{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:r,friendlyName:n,signal:s},i){var o;try{const{data:a,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:r});if(!a)return{data:null,error:l};const u=s??Fa.createNewAbortSignal();if(a.webauthn.type==="create"){const{user:d}=a.webauthn.credential_options.publicKey;if(!d.name){const c=n;if(c)d.name=`${d.id}:${c}`;else{const f=(await this.client.getUser()).data.user,m=((o=f==null?void 0:f.user_metadata)===null||o===void 0?void 0:o.name)||(f==null?void 0:f.email)||(f==null?void 0:f.id)||"User";d.name=`${d.id}:${m}`}}d.displayName||(d.displayName=d.name)}switch(a.webauthn.type){case"create":{const d=qv(a.webauthn.credential_options.publicKey,i==null?void 0:i.create),{data:c,error:h}=await Sf({publicKey:d,signal:u});return c?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:c}},error:null}:{data:null,error:h}}case"request":{const d=Kv(a.webauthn.credential_options.publicKey,i==null?void 0:i.request),{data:c,error:h}=await bf(Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:d,signal:u}));return c?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:c}},error:null}:{data:null,error:h}}}}catch(a){return C(a)?{data:null,error:a}:{data:null,error:new Qe("Unexpected error in challenge",a)}}}async _verify({challengeId:e,factorId:r,webauthn:n}){return this.client.mfa.verify({factorId:r,challengeId:e,webauthn:n})}async _authenticate({factorId:e,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:n=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},i){if(!r)return{data:null,error:new rs("rpId is required for WebAuthn authentication")};try{if(!Oi())return{data:null,error:new Qe("Browser does not support WebAuthn",null)};const{data:o,error:a}=await this.challenge({factorId:e,webauthn:{rpId:r,rpOrigins:n},signal:s},{request:i});if(!o)return{data:null,error:a};const{webauthn:l}=o;return this._verify({factorId:e,challengeId:o.challengeId,webauthn:{type:l.type,rpId:r,rpOrigins:n,credential_response:l.credential_response}})}catch(o){return C(o)?{data:null,error:o}:{data:null,error:new Qe("Unexpected error in authenticate",o)}}}async _register({friendlyName:e,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:n=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},i){if(!r)return{data:null,error:new rs("rpId is required for WebAuthn registration")};try{if(!Oi())return{data:null,error:new Qe("Browser does not support WebAuthn",null)};const{data:o,error:a}=await this._enroll({friendlyName:e});if(!o)return await this.client.mfa.listFactors().then(d=>{var c;return(c=d.data)===null||c===void 0?void 0:c.all.find(h=>h.factor_type==="webauthn"&&h.friendly_name===e&&h.status!=="unverified")}).then(d=>d?this.client.mfa.unenroll({factorId:d==null?void 0:d.id}):void 0),{data:null,error:a};const{data:l,error:u}=await this._challenge({factorId:o.id,friendlyName:o.friendly_name,webauthn:{rpId:r,rpOrigins:n},signal:s},{create:i});return l?this._verify({factorId:o.id,challengeId:l.challengeId,webauthn:{rpId:r,rpOrigins:n,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:u}}catch(o){return C(o)?{data:null,error:o}:{data:null,error:new Qe("Unexpected error in register",o)}}}}Dv();const Jv={url:Gm,storageKey:Jm,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Qm,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}},kr={};class ss{get jwks(){var e,r;return(r=(e=kr[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&r!==void 0?r:{keys:[]}}set jwks(e){kr[this.storageKey]=Object.assign(Object.assign({},kr[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,r;return(r=(e=kr[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&r!==void 0?r:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){kr[this.storageKey]=Object.assign(Object.assign({},kr[this.storageKey]),{cachedAt:e})}constructor(e){var r,n,s;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.lastRefreshFailure=null,this._sessionRemovalEpoch=0,this.initializePromise=null,this._pendingInitNotifications=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lock=null,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const i=Object.assign(Object.assign({},Jv),e);if(this.storageKey=i.storageKey,this.instanceID=(r=ss.nextInstanceID[this.storageKey])!==null&&r!==void 0?r:0,ss.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!i.debug,typeof i.debug=="function"&&(this.logger=i.debug),this.instanceID>0&&le()){const o=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(o),this.logDebugMessages&&console.trace(o)}if(this.persistSession=i.persistSession,this.autoRefreshToken=i.autoRefreshToken,this.experimental=(n=i.experimental)!==null&&n!==void 0?n:{},this.admin=new $v({url:i.url,headers:i.headers,fetch:i.fetch,experimental:this.experimental}),this.url=i.url,this.headers=i.headers,this.fetch=vf(i.fetch),this.detectSessionInUrl=i.detectSessionInUrl,this.flowType=i.flowType,this.hasCustomAuthorizationHeader=i.hasCustomAuthorizationHeader,this.throwOnError=i.throwOnError,this.lockAcquireTimeout=i.lockAcquireTimeout,i.lock!=null&&(this.lock=i.lock),this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Gv(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(i.storage?this.storage=i.storage:mf()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=xc(this.memoryStorage)),i.userStorage&&(this.userStorage=i.userStorage)):(this.memoryStorage={},this.storage=xc(this.memoryStorage)),le()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(o){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",o)}(s=this.broadcastChannel)===null||s===void 0||s.addEventListener("message",async o=>{this._debug("received broadcast notification from other tab or client",o),(o.data.event==="TOKEN_REFRESHED"||o.data.event==="SIGNED_IN")&&(this.lastRefreshFailure=null);try{await this._notifyAllSubscribers(o.data.event,o.data.session,!1)}catch(a){this._debug("#broadcastChannel","error",a)}})}i.skipAutoInitialize||this.initialize().catch(o=>{this._debug("#initialize()","error",o)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${pf}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){var e;if(this.initializePromise)return await this.initializePromise;this._pendingInitNotifications=[],this.initializePromise=(async()=>this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()):await this._initialize())();const r=await this.initializePromise,n=(e=this._pendingInitNotifications)!==null&&e!==void 0?e:[];this._pendingInitNotifications=null;for(const s of n)await this._notifyAllSubscribers(s.event,s.session,s.broadcast);return r}async _initialize(){var e;try{let r={},n="none";if(le()&&(r=_c(window.location.href),this._isImplicitGrantCallback(r)?n="implicit":await this._isPKCECallback(r)&&(n="pkce")),le()&&this.detectSessionInUrl&&n!=="none"){const{data:s,error:i}=await this._getSessionFromURL(r,n);if(i){if(this._debug("#_initialize()","error detecting session from URL",i),tv(i)){const l=(e=i.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:i}}return{error:i}}const{session:o,redirectType:a}=s;return this._debug("#_initialize()","detected session in URL",o,"redirect type",a),await this._saveSession(o),setTimeout(async()=>{a==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",o):await this._notifyAllSubscribers("SIGNED_IN",o)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(r){return C(r)?this._returnResult({error:r}):this._returnResult({error:new Qe("Unexpected error during initialization",r)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var r,n,s;try{const i=await O(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(n=(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.data)!==null&&n!==void 0?n:{},gotrue_meta_security:{captcha_token:(s=e==null?void 0:e.options)===null||s===void 0?void 0:s.captchaToken}},xform:Le}),{data:o,error:a}=i;if(a||!o)return this._returnResult({data:{user:null,session:null},error:a});const l=o.session,u=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:u,session:l},error:null})}catch(i){if(C(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async signUp(e){var r,n,s;let i=null;try{let o;if("email"in e){const{email:c,password:h,options:f}=e;let m=null,v=null;this.flowType==="pkce"&&([m,v,i]=await this._getCodeChallengeAndMethod()),o=await O(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(f==null?void 0:f.emailRedirectTo,i),body:{email:c,password:h,data:(r=f==null?void 0:f.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:f==null?void 0:f.captchaToken},code_challenge:m,code_challenge_method:v},xform:Le})}else if("phone"in e){const{phone:c,password:h,options:f}=e;o=await O(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:c,password:h,data:(n=f==null?void 0:f.data)!==null&&n!==void 0?n:{},channel:(s=f==null?void 0:f.channel)!==null&&s!==void 0?s:"sms",gotrue_meta_security:{captcha_token:f==null?void 0:f.captchaToken}},xform:Le})}else throw new Ls("You must provide either an email or phone number and a password");const{data:a,error:l}=o;if(l||!a)return await We(this.storage,this.storageKey,i),this._returnResult({data:{user:null,session:null},error:l});const u=a.session,d=a.user;return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",u)),this._returnResult({data:{user:d,session:u},error:null})}catch(o){if(await We(this.storage,this.storageKey,i),C(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async signInWithPassword(e){try{let r;if("email"in e){const{email:i,password:o,options:a}=e;r=await O(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:i,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:Ec})}else if("phone"in e){const{phone:i,password:o,options:a}=e;r=await O(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:i,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:Ec})}else throw new Ls("You must provide either an email or phone number and a password");const{data:n,error:s}=r;if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!n||!n.session||!n.user){const i=new _r;return this._returnResult({data:{user:null,session:null},error:i})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),this._returnResult({data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:s})}catch(r){if(C(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOAuth(e){var r,n,s,i;return await this._handleProviderSignIn(e.provider,{redirectTo:(r=e.options)===null||r===void 0?void 0:r.redirectTo,scopes:(n=e.options)===null||n===void 0?void 0:n.scopes,queryParams:(s=e.options)===null||s===void 0?void 0:s.queryParams,skipBrowserRedirect:(i=e.options)===null||i===void 0?void 0:i.skipBrowserRedirect})}async exchangeCodeForSession(e,r){return await this.initializePromise,this.lock!=null?this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e,r)):this._exchangeCodeForSession(e,r)}async signInWithWeb3(e){const{chain:r}=e;switch(r){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`)}}async signInWithEthereum(e){var r,n,s,i,o,a,l,u,d,c,h;let f,m;if("message"in e)f=e.message,m=e.signature;else{const{chain:v,wallet:k,statement:g,options:p}=e;let y;if(le())if(typeof k=="object")y=k;else{const N=window;if("ethereum"in N&&typeof N.ethereum=="object"&&"request"in N.ethereum&&typeof N.ethereum.request=="function")y=N.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof k!="object"||!(p!=null&&p.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");y=k}const _=new URL((r=p==null?void 0:p.url)!==null&&r!==void 0?r:window.location.href),b=await y.request({method:"eth_requestAccounts"}).then(N=>N).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!b||b.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const E=_f(b[0]);let T=(n=p==null?void 0:p.signInWithEthereum)===null||n===void 0?void 0:n.chainId;if(!T){const N=await y.request({method:"eth_chainId"});T=Uv(N)}const R={domain:_.host,address:E,statement:g,uri:_.href,version:"1",chainId:T,nonce:(s=p==null?void 0:p.signInWithEthereum)===null||s===void 0?void 0:s.nonce,issuedAt:(o=(i=p==null?void 0:p.signInWithEthereum)===null||i===void 0?void 0:i.issuedAt)!==null&&o!==void 0?o:new Date,expirationTime:(a=p==null?void 0:p.signInWithEthereum)===null||a===void 0?void 0:a.expirationTime,notBefore:(l=p==null?void 0:p.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(u=p==null?void 0:p.signInWithEthereum)===null||u===void 0?void 0:u.requestId,resources:(d=p==null?void 0:p.signInWithEthereum)===null||d===void 0?void 0:d.resources};f=Bv(R),m=await y.request({method:"personal_sign",params:[zv(f),E]})}try{const{data:v,error:k}=await O(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:f,signature:m},!((c=e.options)===null||c===void 0)&&c.captchaToken?{gotrue_meta_security:{captcha_token:(h=e.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:Le});if(k)throw k;if(!v||!v.session||!v.user){const g=new _r;return this._returnResult({data:{user:null,session:null},error:g})}return v.session&&(await this._saveSession(v.session),await this._notifyAllSubscribers("SIGNED_IN",v.session)),this._returnResult({data:Object.assign({},v),error:k})}catch(v){if(C(v))return this._returnResult({data:{user:null,session:null},error:v});throw v}}async signInWithSolana(e){var r,n,s,i,o,a,l,u,d,c,h,f;let m,v;if("message"in e)m=e.message,v=e.signature;else{const{chain:k,wallet:g,statement:p,options:y}=e;let _;if(le())if(typeof g=="object")_=g;else{const E=window;if("solana"in E&&typeof E.solana=="object"&&("signIn"in E.solana&&typeof E.solana.signIn=="function"||"signMessage"in E.solana&&typeof E.solana.signMessage=="function"))_=E.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof g!="object"||!(y!=null&&y.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");_=g}const b=new URL((r=y==null?void 0:y.url)!==null&&r!==void 0?r:window.location.href);if("signIn"in _&&_.signIn){const E=await _.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},y==null?void 0:y.signInWithSolana),{version:"1",domain:b.host,uri:b.href}),p?{statement:p}:null));let T;if(Array.isArray(E)&&E[0]&&typeof E[0]=="object")T=E[0];else if(E&&typeof E=="object"&&"signedMessage"in E&&"signature"in E)T=E;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in T&&"signature"in T&&(typeof T.signedMessage=="string"||T.signedMessage instanceof Uint8Array)&&T.signature instanceof Uint8Array)m=typeof T.signedMessage=="string"?T.signedMessage:new TextDecoder().decode(T.signedMessage),v=T.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in _)||typeof _.signMessage!="function"||!("publicKey"in _)||typeof _!="object"||!_.publicKey||!("toBase58"in _.publicKey)||typeof _.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");m=[`${b.host} wants you to sign in with your Solana account:`,_.publicKey.toBase58(),...p?["",p,""]:[""],"Version: 1",`URI: ${b.href}`,`Issued At: ${(s=(n=y==null?void 0:y.signInWithSolana)===null||n===void 0?void 0:n.issuedAt)!==null&&s!==void 0?s:new Date().toISOString()}`,...!((i=y==null?void 0:y.signInWithSolana)===null||i===void 0)&&i.notBefore?[`Not Before: ${y.signInWithSolana.notBefore}`]:[],...!((o=y==null?void 0:y.signInWithSolana)===null||o===void 0)&&o.expirationTime?[`Expiration Time: ${y.signInWithSolana.expirationTime}`]:[],...!((a=y==null?void 0:y.signInWithSolana)===null||a===void 0)&&a.chainId?[`Chain ID: ${y.signInWithSolana.chainId}`]:[],...!((l=y==null?void 0:y.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${y.signInWithSolana.nonce}`]:[],...!((u=y==null?void 0:y.signInWithSolana)===null||u===void 0)&&u.requestId?[`Request ID: ${y.signInWithSolana.requestId}`]:[],...!((c=(d=y==null?void 0:y.signInWithSolana)===null||d===void 0?void 0:d.resources)===null||c===void 0)&&c.length?["Resources",...y.signInWithSolana.resources.map(T=>`- ${T}`)]:[]].join(`
`);const E=await _.signMessage(new TextEncoder().encode(m),"utf8");if(!E||!(E instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");v=E}}try{const{data:k,error:g}=await O(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:m,signature:ar(v)},!((h=e.options)===null||h===void 0)&&h.captchaToken?{gotrue_meta_security:{captcha_token:(f=e.options)===null||f===void 0?void 0:f.captchaToken}}:null),xform:Le});if(g)throw g;if(!k||!k.session||!k.user){const p=new _r;return this._returnResult({data:{user:null,session:null},error:p})}return k.session&&(await this._saveSession(k.session),await this._notifyAllSubscribers("SIGNED_IN",k.session)),this._returnResult({data:Object.assign({},k),error:g})}catch(k){if(C(k))return this._returnResult({data:{user:null,session:null},error:k});throw k}}async _exchangeCodeForSession(e,r){const n=(r==null?void 0:r.flowId)!=null,s=n?ei(r==null?void 0:r.flowId):le()?ei(_c(window.location.href)[or]):null;n&&!s&&this._debug("#_exchangeCodeForSession()","provided flowId is not a valid flow id",r==null?void 0:r.flowId);const{verifier:i,flowId:o}=n&&!s?{verifier:null,flowId:null}:await _v(this.storage,this.storageKey,s),[a,l]=(i??"").split("/");try{if(!a&&this.flowType==="pkce")throw new rv;const{data:u,error:d}=await O(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:a},xform:Le});if(await We(this.storage,this.storageKey,o),d)throw d;if(!u||!u.session||!u.user){const c=new _r;return this._returnResult({data:{user:null,session:null,redirectType:null},error:c})}return u.session&&(await this._saveSession(u.session),await this._notifyAllSubscribers(l==="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",u.session)),this._returnResult({data:Object.assign(Object.assign({},u),{redirectType:l??null}),error:d})}catch(u){if(await We(this.storage,this.storageKey,o),C(u))return this._returnResult({data:{user:null,session:null,redirectType:null},error:u});throw u}}async signInWithIdToken(e){try{const{options:r,provider:n,token:s,access_token:i,nonce:o}=e,a=await O(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:s,access_token:i,nonce:o,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},xform:Le}),{data:l,error:u}=a;if(u)return this._returnResult({data:{user:null,session:null},error:u});if(!l||!l.session||!l.user){const d=new _r;return this._returnResult({data:{user:null,session:null},error:d})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:u})}catch(r){if(C(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOtp(e){var r,n,s,i,o;let a=null;try{if("email"in e){const{email:l,options:u}=e;let d=null,c=null;this.flowType==="pkce"&&([d,c,a]=await this._getCodeChallengeAndMethod());const{error:h}=await O(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:l,data:(r=u==null?void 0:u.data)!==null&&r!==void 0?r:{},create_user:(n=u==null?void 0:u.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:u==null?void 0:u.captchaToken},code_challenge:d,code_challenge_method:c},redirectTo:this._maybeAppendFlowIdToRedirect(u==null?void 0:u.emailRedirectTo,a)});return this._returnResult({data:{user:null,session:null},error:h})}if("phone"in e){const{phone:l,options:u}=e,{data:d,error:c}=await O(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:l,data:(s=u==null?void 0:u.data)!==null&&s!==void 0?s:{},create_user:(i=u==null?void 0:u.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:u==null?void 0:u.captchaToken},channel:(o=u==null?void 0:u.channel)!==null&&o!==void 0?o:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:d==null?void 0:d.message_id},error:c})}throw new Ls("You must provide either an email or phone number.")}catch(l){if(await We(this.storage,this.storageKey,a),C(l))return this._returnResult({data:{user:null,session:null},error:l});throw l}}async verifyOtp(e){var r,n;try{let s,i;"options"in e&&(s=(r=e.options)===null||r===void 0?void 0:r.redirectTo,i=(n=e.options)===null||n===void 0?void 0:n.captchaToken);const{data:o,error:a}=await O(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:i}}),redirectTo:s,xform:Le});if(a)throw a;if(!o)throw new Error("An error occurred on token verification.");const l=o.session,u=o.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:u,session:l},error:null})}catch(s){if(C(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async signInWithSSO(e){var r,n,s,i;let o=null;try{let a=null,l=null;this.flowType==="pkce"&&([a,l,o]=await this._getCodeChallengeAndMethod());const u=await O(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:this._maybeAppendFlowIdToRedirect((r=e.options)===null||r===void 0?void 0:r.redirectTo,o)}),!((n=e==null?void 0:e.options)===null||n===void 0)&&n.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:a,code_challenge_method:l}),headers:this.headers,xform:jv});return!((s=u.data)===null||s===void 0)&&s.url&&le()&&!(!((i=e.options)===null||i===void 0)&&i.skipBrowserRedirect)&&window.location.assign(u.data.url),this._returnResult(u)}catch(a){if(await We(this.storage,this.storageKey,o),C(a))return this._returnResult({data:null,error:a});throw a}}async reauthenticate(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate()):await this._reauthenticate()}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:r},error:n}=e;if(n)throw n;if(!r)throw new ie;const{error:s}=await O(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:r.access_token});return this._returnResult({data:{user:null,session:null},error:s})})}catch(e){if(C(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){let r=null;try{const n=`${this.url}/resend`;if("email"in e){const{email:s,type:i,options:o}=e;let a=null,l=null;this.flowType==="pkce"&&([a,l,r]=await this._getCodeChallengeAndMethod());const{error:u}=await O(this.fetch,"POST",n,{headers:this.headers,body:{email:s,type:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken},code_challenge:a,code_challenge_method:l},redirectTo:this._maybeAppendFlowIdToRedirect(o==null?void 0:o.emailRedirectTo,r)});return u&&await We(this.storage,this.storageKey,r),this._returnResult({data:{user:null,session:null},error:u})}else if("phone"in e){const{phone:s,type:i,options:o}=e,{data:a,error:l}=await O(this.fetch,"POST",n,{headers:this.headers,body:{phone:s,type:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:a==null?void 0:a.message_id},error:l})}throw new Ls("You must provide either an email or phone number and a type")}catch(n){if(await We(this.storage,this.storageKey,r),C(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async getSession(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e)):await this._useSession(async e=>e)}async _acquireLock(e,r){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const n=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),s=(async()=>(await n,await r()))();return this.pendingInLock.push((async()=>{try{await s}catch{}})()),s}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const n=r();for(this.pendingInLock.push((async()=>{try{await n}catch{}})()),await n;this.pendingInLock.length;){const s=[...this.pendingInLock];await Promise.all(s),this.pendingInLock.splice(0,s.length)}return await n}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const r=await this.__loadSession();return await e(r)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lock!=null&&!this.lockAcquired&&this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const r=await pe(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",r),r!==null&&(this._isValidSession(r)?e=r:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const n=e.expires_at?e.expires_at*1e3-Date.now()<No:!1;if(this._debug("#__loadSession()",`session has${n?"":" not"} expired`,"expires_at",e.expires_at),!n){if(this.userStorage){const o=await pe(this.userStorage,this.storageKey+"-user");o!=null&&o.user?e.user=o.user:e.user=$o()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const o={value:this.suppressGetSessionWarning};e.user=Pv(e.user,o),o.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:s,error:i}=await this._callRefreshToken(e.refresh_token);if(i){if(!!(e.expires_at&&e.expires_at*1e3>Date.now())){const a=await pe(this.storage,this.storageKey);if(a&&a.refresh_token===e.refresh_token)return this._returnResult({data:{session:e},error:null})}return this._returnResult({data:{session:null},error:i})}return this._returnResult({data:{session:s},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let r;return this.lock!=null?r=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser()):r=await this._getUser(),r.data.user&&(this.suppressGetSessionWarning=!0),r}async _getUser(e){try{return e?await O(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:Ot}):await this._useSession(async r=>{var n,s,i;const{data:o,error:a}=r;if(a)throw a;return!(!((n=o.session)===null||n===void 0)&&n.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new ie}:await O(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(i=(s=o.session)===null||s===void 0?void 0:s.access_token)!==null&&i!==void 0?i:void 0,xform:Ot})})}catch(r){if(C(r))return $s(r)&&await this._removeSession(),this._returnResult({data:{user:null},error:r});throw r}}async updateUser(e,r={}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,r)):await this._updateUser(e,r)}async _updateUser(e,r={}){let n=null;try{return await this._useSession(async s=>{const{data:i,error:o}=s;if(o)throw o;if(!i.session)throw new ie;const a=i.session;let l=null,u=null;this.flowType==="pkce"&&e.email!=null&&([l,u,n]=await this._getCodeChallengeAndMethod());const{data:d,error:c}=await O(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(r==null?void 0:r.emailRedirectTo,n),body:Object.assign(Object.assign({},e),{code_challenge:l,code_challenge_method:u}),jwt:a.access_token,xform:Ot});if(c)throw c;return a.user=d.user,await this._saveSession(a),await this._notifyAllSubscribers("USER_UPDATED",a),this._returnResult({data:{user:a.user},error:null})})}catch(s){if(await We(this.storage,this.storageKey,n),C(s))return this._returnResult({data:{user:null},error:s});throw s}}async setSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e)):await this._setSession(e)}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new ie;const r=Date.now()/1e3;let n=r,s=!0,i=null;const{payload:o}=zs(e.access_token);if(o.exp&&(n=o.exp,s=n<=r),s){const{data:a,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!a)return{data:{user:null,session:null},error:null};i=a}else{const{data:a,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});i={access_token:e.access_token,refresh_token:e.refresh_token,user:a.user,token_type:"bearer",expires_in:n-r,expires_at:n},await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)}return this._returnResult({data:{user:i.user,session:i},error:null})}catch(r){if(C(r))return this._returnResult({data:{session:null,user:null},error:r});throw r}}async refreshSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e)):await this._refreshSession(e)}async _refreshSession(e){try{return await this._useSession(async r=>{var n;if(!e){const{data:o,error:a}=r;if(a)throw a;e=(n=o.session)!==null&&n!==void 0?n:void 0}if(!(e!=null&&e.refresh_token))throw new ie;const{data:s,error:i}=await this._callRefreshToken(e.refresh_token);return i?this._returnResult({data:{user:null,session:null},error:i}):s?this._returnResult({data:{user:s.user,session:s},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(r){if(C(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async _getSessionFromURL(e,r){var n;try{if(!le())throw new Ds("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Ds(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(r){case"implicit":if(this.flowType==="pkce")throw new pc("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Ds("Not a valid implicit grant flow url.");break;default:}if(r==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new pc("No code detected.");const{data:y,error:_}=await this._exchangeCodeForSession(e.code,{flowId:e[or]});if(_)throw _;const b=new URL(window.location.href);return b.searchParams.delete("code"),b.searchParams.delete(or),window.history.replaceState(window.history.state,"",b.toString()),{data:{session:y.session,redirectType:(n=y.redirectType)!==null&&n!==void 0?n:null},error:null}}const{provider_token:s,provider_refresh_token:i,access_token:o,refresh_token:a,expires_in:l,expires_at:u,token_type:d}=e;if(!o||!l||!a||!d)throw new Ds("No session defined in URL");const c=Math.round(Date.now()/1e3),h=parseInt(l);let f=c+h;u&&(f=parseInt(u));const m=f-c;m*1e3<=pt&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${m}s, should have been closer to ${h}s`);const v=f-h;c-v>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",v,f,c):c-v<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",v,f,c);const{data:k,error:g}=await this._getUser(o);if(g)throw g;const p={provider_token:s,provider_refresh_token:i,access_token:o,expires_in:h,expires_at:f,refresh_token:a,token_type:d,user:k.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:p,redirectType:e.type},error:null})}catch(s){if(C(s))return this._returnResult({data:{session:null,redirectType:null},error:s});throw s}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error||e.error_description||e.error_code)}async _isPKCECallback(e){if(!e.code)return!1;const r=ei(e[or]);return r&&await pe(this.storage,en(this.storageKey,r))?!0:!!await pe(this.storage,`${this.storageKey}-code-verifier`)}async signOut(e={scope:"global"}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e)):await this._signOut(e)}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async r=>{var n;const s=async()=>{await this._removeSession()},{data:i,error:o}=r;if(o&&!$s(o))return this._returnResult({error:o});const a=(n=i.session)===null||n===void 0?void 0:n.access_token;if(a){const{error:l}=await this.admin.signOut(a,e);if(l&&!(fc(l)&&(l.status===404||l.status===401||l.status===403)||$s(l)))return e!=="others"&&await s(),this._returnResult({error:l})}return e!=="others"&&await s(),this._returnResult({error:null})})}onAuthStateChange(e){const r=cv(),n={id:r,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",r),this.stateChangeEmitters.delete(r)}};return this._debug("#onAuthStateChange()","registered callback with id",r),this.stateChangeEmitters.set(r,n),(async()=>(await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(r)}):await this._emitInitialSession(r)))(),{data:{subscription:n}}}async _emitInitialSession(e){return await this._useSession(async r=>{var n,s;try{const{data:{session:i},error:o}=r;if(o)throw o;await((n=this.stateChangeEmitters.get(e))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",i)),this._debug("INITIAL_SESSION","callback id",e,"session",i)}catch(i){await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",i),$s(i)||Us(i)||fc(i)&&(i.code==="refresh_token_not_found"||i.code==="refresh_token_already_used"||i.code==="session_expired")?console.warn(i):console.error(i)}})}async resetPasswordForEmail(e,r={}){let n=null,s=null,i=null;this.flowType==="pkce"&&([n,s,i]=await this._getCodeChallengeAndMethod(!0));try{return await O(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:n,code_challenge_method:s,gotrue_meta_security:{captcha_token:r.captchaToken}},headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(r.redirectTo,i)})}catch(o){if(await We(this.storage,this.storageKey,i),C(o))return this._returnResult({data:null,error:o});throw o}}async getUserIdentities(){var e;try{const{data:r,error:n}=await this.getUser();if(n)throw n;return this._returnResult({data:{identities:(e=r.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(r){if(C(r))return this._returnResult({data:null,error:r});throw r}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var r;let n=null;try{const{data:s,error:i}=await this._useSession(async o=>{var a,l,u,d,c;const{data:h,error:f}=o;if(f)throw f;const{url:m,flowId:v}=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(a=e.options)===null||a===void 0?void 0:a.redirectTo,scopes:(l=e.options)===null||l===void 0?void 0:l.scopes,queryParams:(u=e.options)===null||u===void 0?void 0:u.queryParams,skipBrowserRedirect:!0});return n=v,await O(this.fetch,"GET",m,{headers:this.headers,jwt:(c=(d=h.session)===null||d===void 0?void 0:d.access_token)!==null&&c!==void 0?c:void 0})});if(i)throw i;return le()&&!(!((r=e.options)===null||r===void 0)&&r.skipBrowserRedirect)&&window.location.assign(s==null?void 0:s.url),this._returnResult({data:{provider:e.provider,url:s==null?void 0:s.url,flowId:n},error:null})}catch(s){if(C(s))return this._returnResult({data:{provider:e.provider,url:null,flowId:n},error:s});throw s}}async linkIdentityIdToken(e){return await this._useSession(async r=>{var n;try{const{error:s,data:{session:i}}=r;if(s)throw s;const{options:o,provider:a,token:l,access_token:u,nonce:d}=e,c=await O(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(n=i==null?void 0:i.access_token)!==null&&n!==void 0?n:void 0,body:{provider:a,id_token:l,access_token:u,nonce:d,link_identity:!0,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:Le}),{data:h,error:f}=c;return f?this._returnResult({data:{user:null,session:null},error:f}):!h||!h.session||!h.user?this._returnResult({data:{user:null,session:null},error:new _r}):(h.session&&(await this._saveSession(h.session),await this._notifyAllSubscribers("USER_UPDATED",h.session)),this._returnResult({data:h,error:f}))}catch(s){if(await We(this.storage,this.storageKey,null),C(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}})}async unlinkIdentity(e){try{return await this._useSession(async r=>{var n,s;const{data:i,error:o}=r;if(o)throw o;return await O(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(s=(n=i.session)===null||n===void 0?void 0:n.access_token)!==null&&s!==void 0?s:void 0})})}catch(r){if(C(r))return this._returnResult({data:null,error:r});throw r}}async _refreshAccessToken(e){const r="#_refreshAccessToken()";this._debug(r,"begin");try{const n=Date.now();return await fv(async s=>(s>0&&await hv(200*Math.pow(2,s-1)),this._debug(r,"refreshing attempt",s),await O(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Le})),(s,i)=>{const o=200*Math.pow(2,s);return i&&Us(i)&&Date.now()+o-n<pt})}catch(n){if(this._debug(r,"error",n),C(n))return this._returnResult({data:{session:null,user:null},error:n});throw n}finally{this._debug(r,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,r){const{url:n,flowId:s}=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:r.redirectTo,scopes:r.scopes,queryParams:r.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",r,"url",n),le()&&!r.skipBrowserRedirect&&window.location.assign(n),{data:{provider:e,url:n,flowId:s},error:null}}async _recoverAndRefresh(){var e,r;const n="#_recoverAndRefresh()";this._debug(n,"begin");try{const s=await pe(this.storage,this.storageKey);if(s&&this.userStorage){let o=await pe(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!o&&(o={user:s.user},await yt(this.userStorage,this.storageKey+"-user",o)),s.user=(e=o==null?void 0:o.user)!==null&&e!==void 0?e:$o()}else if(s&&!s.user&&!s.user){const o=await pe(this.storage,this.storageKey+"-user");o&&(o!=null&&o.user)?(s.user=o.user,await Ee(this.storage,this.storageKey+"-user"),await yt(this.storage,this.storageKey,s)):s.user=$o()}if(this._debug(n,"session from storage",s),!this._isValidSession(s)){this._debug(n,"session is not valid"),s!==null&&await this._removeSession();return}const i=((r=s.expires_at)!==null&&r!==void 0?r:1/0)*1e3-Date.now()<No;if(this._debug(n,`session has${i?"":" not"} expired with margin of ${No}s`),i){if(this.autoRefreshToken&&s.refresh_token){const{error:o}=await this._callRefreshToken(s.refresh_token);o&&(nv(o)?this._debug(n,"refresh discarded by commit guard",o):this._debug(n,"refresh failed",o))}}else if(s.user&&s.user.__isUserNotAvailableProxy===!0)try{const{data:o,error:a}=await this._getUser(s.access_token);!a&&(o!=null&&o.user)?(s.user=o.user,await this._saveSession(s),await this._notifyAllSubscribers("SIGNED_IN",s)):this._debug(n,"could not get user data, skipping SIGNED_IN notification")}catch(o){console.error("Error getting user data:",o),this._debug(n,"error getting user data, skipping SIGNED_IN notification",o)}else await this._notifyAllSubscribers("SIGNED_IN",s)}catch(s){this._debug(n,"error",s),Us(s)?console.warn(s):console.error(s);return}finally{this._debug(n,"end")}}async _callRefreshToken(e){var r,n;if(!e)throw new ie;if(this.refreshingDeferred)return this.refreshingDeferred.promise;if(this.lastRefreshFailure&&this.lastRefreshFailure.refreshToken===e&&Date.now()<this.lastRefreshFailure.expiresAt)return this._debug("#_callRefreshToken()","returning cached failure (cooldown active)"),this.lastRefreshFailure.result;const s="#_callRefreshToken()";this._debug(s,"begin");try{this.refreshingDeferred=new to;const i=await pe(this.storage,this.storageKey),{data:o,error:a}=await this._refreshAccessToken(e);if(a)throw a;if(!o.session)throw new ie;const l=await pe(this.storage,this.storageKey);if(i!==null&&(l===null||l.refresh_token!==i.refresh_token)){this._debug(s,"commit guard: storage changed since refresh started, discarding rotated tokens",{startedWith:"present",nowHolds:l?"replaced":"cleared"});const h={data:null,error:new gc};return this.refreshingDeferred.resolve(h),h}const d=this._sessionRemovalEpoch;if(await this._saveSession(o.session),this._sessionRemovalEpoch!==d){this._debug(s,"commit guard (post-save): _removeSession ran during _saveSession, undoing write"),await Ee(this.storage,this.storageKey),this.userStorage&&await Ee(this.userStorage,this.storageKey+"-user");const h={data:null,error:new gc};return this.refreshingDeferred.resolve(h),h}await this._notifyAllSubscribers("TOKEN_REFRESHED",o.session);const c={data:o.session,error:null};return this.lastRefreshFailure=null,this.refreshingDeferred.resolve(c),c}catch(i){if(this._debug(s,"error",i),C(i)){const o={data:null,error:i};if(!Us(i)){const a=await pe(this.storage,this.storageKey);!!(a!=null&&a.expires_at&&a.expires_at*1e3>Date.now())?this._debug(s,"proactive refresh failed, access token still valid — preserving session"):await this._removeSession()}return this.lastRefreshFailure={refreshToken:e,result:o,expiresAt:Date.now()+Km},(r=this.refreshingDeferred)===null||r===void 0||r.resolve(o),o}throw(n=this.refreshingDeferred)===null||n===void 0||n.reject(i),i}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(e,r,n=!0){if(this._pendingInitNotifications!==null&&n){this._pendingInitNotifications.push({event:e,session:r,broadcast:n});return}const s=`#_notifyAllSubscribers(${e})`;this._debug(s,"begin",r,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:e,session:r});const i=[],o=Array.from(this.stateChangeEmitters.values()).map(async a=>{try{await a.callback(e,r)}catch(l){i.push(l)}});if(await Promise.all(o),i.length>0){for(let a=0;a<i.length;a+=1)console.error(i[a]);throw i[0]}}finally{this._debug(s,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0;const r=Object.assign({},e),n=r.user&&r.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!n&&r.user&&await yt(this.userStorage,this.storageKey+"-user",{user:r.user});const s=Object.assign({},r);delete s.user;const i=kc(s);await yt(this.storage,this.storageKey,i)}else{const s=kc(r);await yt(this.storage,this.storageKey,s)}}async _removeSession(){this._sessionRemovalEpoch+=1,this._debug("#_removeSession()"),this.lastRefreshFailure=null,this.suppressGetSessionWarning=!1,await Ee(this.storage,this.storageKey),await kv(this.storage,this.storageKey),await Ee(this.storage,this.storageKey+"-user"),this.userStorage&&await Ee(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&le()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(r){console.error("removing visibilitychange callback failed",r)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),pt);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const r=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=r,r&&typeof r=="object"&&typeof r.unref=="function"?r.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(r)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const r=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,r&&clearTimeout(r)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async dispose(){var e;this._removeVisibilityChangedCallback(),await this._stopAutoRefresh(),(e=this.broadcastChannel)===null||e===void 0||e.close(),this.broadcastChannel=null,this.stateChangeEmitters.clear()}async _autoRefreshTokenTick(){if(this._debug("#_autoRefreshTokenTick()","begin"),this.lock!=null){try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async r=>{const{data:{session:n}}=r;if(!n||!n.refresh_token||!n.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const s=Math.floor((n.expires_at*1e3-e)/pt);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${pt}ms, refresh threshold is ${kn} ticks`),s<=kn&&await this._callRefreshToken(n.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e instanceof Lv)this._debug("auto refresh token tick lock not available");else throw e}return}if(this.refreshingDeferred!==null){this._debug("#_autoRefreshTokenTick()","refresh already in flight, skipping");return}try{const e=Date.now();try{await this._useSession(async r=>{const{data:{session:n}}=r;if(!n||!n.refresh_token||!n.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const s=Math.floor((n.expires_at*1e3-e)/pt);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${pt}ms, refresh threshold is ${kn} ticks`),s<=kn&&await this._callRefreshToken(n.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!le()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const r=`#_onVisibilityChanged(${e})`;if(this._debug(r,"visibilityState",document.visibilityState),document.visibilityState==="visible"){if(this.autoRefreshToken&&this._startAutoRefresh(),!e)if(await this.initializePromise,this.lock!=null)await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(r,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()});else{if(document.visibilityState!=="visible"){this._debug(r,"visibilityState is no longer visible, skipping recovery");return}await this._recoverAndRefresh()}}else document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,r,n){let s=n==null?void 0:n.redirectTo,i=null,o=null,a=null;this.flowType==="pkce"&&([i,o,a]=await this._getCodeChallengeAndMethod(),s=this._maybeAppendFlowIdToRedirect(s,a));const l=[`provider=${encodeURIComponent(r)}`];if(s&&l.push(`redirect_to=${encodeURIComponent(s)}`),n!=null&&n.scopes&&l.push(`scopes=${encodeURIComponent(n.scopes)}`),i!=null&&o!=null){const u=new URLSearchParams({code_challenge:`${encodeURIComponent(i)}`,code_challenge_method:`${encodeURIComponent(o)}`});l.push(u.toString())}if(n!=null&&n.queryParams){const u=new URLSearchParams(n.queryParams);l.push(u.toString())}return n!=null&&n.skipBrowserRedirect&&l.push(`skip_http_redirect=${n.skipBrowserRedirect}`),{url:`${e}?${l.join("&")}`,flowId:a}}_maybeAppendFlowIdToRedirect(e,r){return!e||!r||!this.experimental.appendPkceFlowIdToRedirects?e??void 0:Sv(e,r)}async _getCodeChallengeAndMethod(e=!1){return bv(this.storage,this.storageKey,e,r=>this._debug("#_getCodeChallengeAndMethod()","evicted oldest pending PKCE verifier slot",r))}async _unenroll(e){try{return await this._useSession(async r=>{var n;const{data:s,error:i}=r;return i?this._returnResult({data:null,error:i}):await O(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token})})}catch(r){if(C(r))return this._returnResult({data:null,error:r});throw r}}async _enroll(e){try{return await this._useSession(async r=>{var n,s;const{data:i,error:o}=r;if(o)return this._returnResult({data:null,error:o});const a=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:u}=await O(this.fetch,"POST",`${this.url}/factors`,{body:a,headers:this.headers,jwt:(n=i==null?void 0:i.session)===null||n===void 0?void 0:n.access_token});return u?this._returnResult({data:null,error:u}):(e.factorType==="totp"&&l.type==="totp"&&(!((s=l==null?void 0:l.totp)===null||s===void 0)&&s.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(r){if(C(r))return this._returnResult({data:null,error:r});throw r}}async _verify(e){const r=async()=>{try{return await this._useSession(async n=>{var s;const{data:i,error:o}=n;if(o)return this._returnResult({data:null,error:o});const a=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?Pc(e.webauthn.credential_response):Ac(e.webauthn.credential_response)})}:{code:e.code}),{data:l,error:u}=await O(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:a,headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token});return u?this._returnResult({data:null,error:u}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+l.expires_in},l)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",l),this._returnResult({data:l,error:u}))})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,r):r()}async _challenge(e){const r=async()=>{try{return await this._useSession(async n=>{var s;const{data:i,error:o}=n;if(o)return this._returnResult({data:null,error:o});const a=await O(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token});if(a.error)return a;const{data:l}=a;if(l.type!=="webauthn")return{data:l,error:null};switch(l.webauthn.type){case"create":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:Cc(l.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:Rc(l.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,r):r()}async _challengeAndVerify(e){const{data:r,error:n}=await this._challenge({factorId:e.factorId});return n?this._returnResult({data:null,error:n}):await this._verify({factorId:e.factorId,challengeId:r.id,code:e.code})}async _listFactors(){var e;const{data:{user:r},error:n}=await this.getUser();if(n)return{data:null,error:n};const s={all:[],phone:[],totp:[],webauthn:[]};for(const i of(e=r==null?void 0:r.factors)!==null&&e!==void 0?e:[])s.all.push(i),i.status==="verified"&&s[i.factor_type].push(i);return{data:s,error:null}}async _getAuthenticatorAssuranceLevel(e){var r,n,s,i;if(e)try{const{payload:f}=zs(e);let m=null;f.aal&&(m=f.aal);let v=m;const{data:{user:k},error:g}=await this.getUser(e);if(g)return this._returnResult({data:null,error:g});((n=(r=k==null?void 0:k.factors)===null||r===void 0?void 0:r.filter(_=>_.status==="verified"))!==null&&n!==void 0?n:[]).length>0&&(v="aal2");const y=f.amr||[];return{data:{currentLevel:m,nextLevel:v,currentAuthenticationMethods:y},error:null}}catch(f){if(C(f))return this._returnResult({data:null,error:f});throw f}const{data:{session:o},error:a}=await this.getSession();if(a)return this._returnResult({data:null,error:a});if(!o)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=zs(o.access_token);let u=null;l.aal&&(u=l.aal);let d=u;((i=(s=o.user.factors)===null||s===void 0?void 0:s.filter(f=>f.status==="verified"))!==null&&i!==void 0?i:[]).length>0&&(d="aal2");const h=l.amr||[];return{data:{currentLevel:u,nextLevel:d,currentAuthenticationMethods:h},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async r=>{const{data:{session:n},error:s}=r;return s?this._returnResult({data:null,error:s}):n?await O(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:n.access_token,xform:i=>({data:i,error:null})}):this._returnResult({data:null,error:new ie})})}catch(r){if(C(r))return this._returnResult({data:null,error:r});throw r}}async _approveAuthorization(e,r){try{return await this._useSession(async n=>{const{data:{session:s},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new ie});const o=await O(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"approve"},xform:a=>({data:a,error:null})});return o.data&&o.data.redirect_url&&le()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(o.data.redirect_url),o})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}}async _denyAuthorization(e,r){try{return await this._useSession(async n=>{const{data:{session:s},error:i}=n;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new ie});const o=await O(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"deny"},xform:a=>({data:a,error:null})});return o.data&&o.data.redirect_url&&le()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(o.data.redirect_url),o})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:r},error:n}=e;return n?this._returnResult({data:null,error:n}):r?await O(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,xform:s=>({data:s,error:null})}):this._returnResult({data:null,error:new ie})})}catch(e){if(C(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async r=>{const{data:{session:n},error:s}=r;return s?this._returnResult({data:null,error:s}):n?(await O(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:n.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new ie})})}catch(r){if(C(r))return this._returnResult({data:null,error:r});throw r}}async fetchJwk(e,r={keys:[]}){let n=r.keys.find(a=>a.kid===e);if(n)return n;const s=Date.now();if(n=this.jwks.keys.find(a=>a.kid===e),n&&this.jwks_cached_at+Zm>s)return n;const{data:i,error:o}=await O(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(o)throw o;return!i.keys||i.keys.length===0||(this.jwks=i,this.jwks_cached_at=s,n=i.keys.find(a=>a.kid===e),!n)?null:n}async getClaims(e,r={}){try{let n=e;if(!n){const{data:f,error:m}=await this.getSession();if(m||!f.session)return this._returnResult({data:null,error:m});n=f.session.access_token}const{header:s,payload:i,signature:o,raw:{header:a,payload:l}}=zs(n);if(!(r!=null&&r.allowExpired))try{xv(i.exp)}catch(f){throw new Ri(f instanceof Error?f.message:"JWT validation failed")}const u=!s.alg||s.alg.startsWith("HS")||!s.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(s.kid,r!=null&&r.keys?{keys:r.keys}:r==null?void 0:r.jwks);if(!u){const{error:f}=await this.getUser(n);if(f)throw f;return{data:{claims:i,header:s,signature:o},error:null}}const d=Cv(s.alg),c=await crypto.subtle.importKey("jwk",u,d,!0,["verify"]);if(!await crypto.subtle.verify(d,c,o,lv(`${a}.${l}`)))throw new Ri("Invalid JWT signature");return{data:{claims:i,header:s,signature:o},error:null}}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}}async signInWithPasskey(e){var r,n,s;Ve(this.experimental);try{if(!Oi())return this._returnResult({data:null,error:new Qe("Browser does not support WebAuthn",null)});const{data:i,error:o}=await this._startPasskeyAuthentication({options:{captchaToken:(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.captchaToken}});if(o||!i)return this._returnResult({data:null,error:o});const a=Rc(i.options),l=(s=(n=e==null?void 0:e.options)===null||n===void 0?void 0:n.signal)!==null&&s!==void 0?s:Fa.createNewAbortSignal(),{data:u,error:d}=await bf({publicKey:a,signal:l});if(d||!u)return this._returnResult({data:null,error:d??new Qe("WebAuthn ceremony failed",null)});const c=Ac(u);return this._verifyPasskeyAuthentication({challengeId:i.challenge_id,credential:c})}catch(i){if(C(i))return this._returnResult({data:null,error:i});throw i}}async registerPasskey(e){var r,n;Ve(this.experimental);try{if(!Oi())return this._returnResult({data:null,error:new Qe("Browser does not support WebAuthn",null)});const{data:s,error:i}=await this._startPasskeyRegistration();if(i||!s)return this._returnResult({data:null,error:i});const o=Cc(s.options),a=(n=(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.signal)!==null&&n!==void 0?n:Fa.createNewAbortSignal(),{data:l,error:u}=await Sf({publicKey:o,signal:a});if(u||!l)return this._returnResult({data:null,error:u??new Qe("WebAuthn ceremony failed",null)});const d=Pc(l);return this._verifyPasskeyRegistration({challengeId:s.challenge_id,credential:d})}catch(s){if(C(s))return this._returnResult({data:null,error:s});throw s}}async _startPasskeyRegistration(){Ve(this.experimental);try{return await this._useSession(async e=>{const{data:{session:r},error:n}=e;if(n)return this._returnResult({data:null,error:n});if(!r)return this._returnResult({data:null,error:new ie});const{data:s,error:i}=await O(this.fetch,"POST",`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:r.access_token,body:{}});return i?this._returnResult({data:null,error:i}):this._returnResult({data:s,error:null})})}catch(e){if(C(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyRegistration(e){Ve(this.experimental);try{return await this._useSession(async r=>{const{data:{session:n},error:s}=r;if(s)return this._returnResult({data:null,error:s});if(!n)return this._returnResult({data:null,error:new ie});const{data:i,error:o}=await O(this.fetch,"POST",`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:n.access_token,body:{challenge_id:e.challengeId,credential:e.credential}});return o?this._returnResult({data:null,error:o}):this._returnResult({data:i,error:null})})}catch(r){if(C(r))return this._returnResult({data:null,error:r});throw r}}async _startPasskeyAuthentication(e){var r;Ve(this.experimental);try{const{data:n,error:s}=await O(this.fetch,"POST",`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.captchaToken}}});return s?this._returnResult({data:null,error:s}):this._returnResult({data:n,error:null})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}}async _verifyPasskeyAuthentication(e){Ve(this.experimental);try{const{data:r,error:n}=await O(this.fetch,"POST",`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:e.challengeId,credential:e.credential},xform:Le});return n?this._returnResult({data:null,error:n}):(r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),this._returnResult({data:r,error:null}))}catch(r){if(C(r))return this._returnResult({data:null,error:r});throw r}}async _listPasskeys(){Ve(this.experimental);try{return await this._useSession(async e=>{const{data:{session:r},error:n}=e;if(n)return this._returnResult({data:null,error:n});if(!r)return this._returnResult({data:null,error:new ie});const{data:s,error:i}=await O(this.fetch,"GET",`${this.url}/passkeys`,{headers:this.headers,jwt:r.access_token,xform:o=>({data:o,error:null})});return i?this._returnResult({data:null,error:i}):this._returnResult({data:s,error:null})})}catch(e){if(C(e))return this._returnResult({data:null,error:e});throw e}}async _updatePasskey(e){Ve(this.experimental);try{return await this._useSession(async r=>{const{data:{session:n},error:s}=r;if(s)return this._returnResult({data:null,error:s});if(!n)return this._returnResult({data:null,error:new ie});const{data:i,error:o}=await O(this.fetch,"PATCH",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:n.access_token,body:{friendly_name:e.friendlyName}});return o?this._returnResult({data:null,error:o}):this._returnResult({data:i,error:null})})}catch(r){if(C(r))return this._returnResult({data:null,error:r});throw r}}async _deletePasskey(e){Ve(this.experimental);try{return await this._useSession(async r=>{const{data:{session:n},error:s}=r;if(s)return this._returnResult({data:null,error:s});if(!n)return this._returnResult({data:null,error:new ie});const{error:i}=await O(this.fetch,"DELETE",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:n.access_token,noResolveJson:!0});return i?this._returnResult({data:null,error:i}):this._returnResult({data:null,error:null})})}catch(r){if(C(r))return this._returnResult({data:null,error:r});throw r}}}ss.nextInstanceID={};const Qv=ss,Yv="2.112.2";let Sn="",Ii;if(typeof Deno<"u"){var Do;Sn="deno",Ii=(Do=Deno.version)===null||Do===void 0?void 0:Do.deno}else if(typeof document<"u")Sn="web";else if(typeof navigator<"u"&&navigator.product==="ReactNative")Sn="react-native";else{var Uo;Sn="node";const t=globalThis.process;Ii=t==null||(Uo=t.version)===null||Uo===void 0?void 0:Uo.replace(/^v/,"")}const Ef=[`runtime=${Sn}`];Ii&&Ef.push(`runtime-version=${Ii}`);const Xv={"X-Client-Info":`supabase-js/${Yv}; ${Ef.join("; ")}`},Zv={headers:Xv},e0={schema:"public"},t0={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},r0={},n0={enabled:!1,respectSamplingDecision:!0};function s0(t){if(!t||typeof t!="string")return null;const e=t.split("-");if(e.length!==4)return null;const[r,n,s,i]=e;if(r.length!==2||n.length!==32||s.length!==16||i.length!==2)return null;const o=/^[0-9a-f]+$/i;return!o.test(r)||!o.test(n)||!o.test(s)||!o.test(i)||n==="00000000000000000000000000000000"||s==="0000000000000000"?null:{version:r,traceId:n,parentId:s,traceFlags:i,isSampled:(parseInt(i,16)&1)===1}}function i0(t,e){if(!t||!e||e.length===0)return!1;let r;if(t instanceof URL)r=t;else try{r=new URL(t)}catch{return!1}for(const n of e)try{if(typeof n=="string"){if(o0(r.hostname,n))return!0}else if(n instanceof RegExp){if(n.test(r.hostname))return!0}else if(typeof n=="function"&&n(r))return!0}catch{continue}return!1}function o0(t,e){if(e===t)return!0;if(e.startsWith("*.")){const r=e.slice(2);if(t.endsWith(r)&&(t===r||t.endsWith("."+r)))return!0}return!1}function a0(t){const e=[];try{const r=new URL(t);e.push(r.hostname)}catch{}return e.push("*.supabase.co","*.supabase.in"),e.push("localhost","127.0.0.1","[::1]"),e}function is(t){"@babel/helpers - typeof";return is=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},is(t)}function l0(t,e){if(is(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,e);if(is(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function u0(t){var e=l0(t,"string");return is(e)=="symbol"?e:e+""}function c0(t,e,r){return(e=u0(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Oc(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),r.push.apply(r,n)}return r}function J(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Oc(Object(r),!0).forEach(function(n){c0(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Oc(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}const d0=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),h0=()=>Headers,Tf=t=>t.startsWith("sb_publishable_")||t.startsWith("sb_secret_"),f0="sb_temp_",jc=new Set,p0=t=>{var e,r;if(!t.startsWith("sb_")||Tf(t)||t.startsWith(f0))return;const n=(e=(r=t.match(/^sb_[a-zA-Z0-9]+_/))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:"unknown";jc.has(n)||(jc.add(n),console.warn("@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type."))},Ic=(t,e,r,n,s,i)=>{const o=d0(n),a=h0(),l=(s==null?void 0:s.enabled)===!0,u=(s==null?void 0:s.respectSamplingDecision)!==!1,d=l?a0(e):null,c=!(i!=null&&i.omitApiKeyAsBearer&&Tf(t));return async(h,f)=>{const m=await r();let v=new a(f==null?void 0:f.headers);if(v.has("apikey")||v.set("apikey",t),!v.has("Authorization")){const k=m??(c?t:null);k&&v.set("Authorization",`Bearer ${k}`)}if(d){const k=g0(h,d,u);k&&(k.traceparent&&!v.has("traceparent")&&v.set("traceparent",k.traceparent),k.tracestate&&!v.has("tracestate")&&v.set("tracestate",k.tracestate),k.baggage&&!v.has("baggage")&&v.set("baggage",k.baggage))}return o(h,J(J({},f),{},{headers:v}))}};let Nc=!1;function g0(t,e,r){const n=py();if(!n)return Nc||(Nc=!0,console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.")),null;if(!i0(typeof t=="string"||t instanceof URL?t:t.url,e))return null;const s=n();if(!s||!s.traceparent)return null;if(r){const i=s0(s.traceparent);if(i&&!i.isSampled)return null}return s}function $c(t){return typeof t=="boolean"?{enabled:t}:t}function y0(t){return t.endsWith("/")?t:t+"/"}function m0(t,e){var r,n,s,i,o,a;const{db:l,auth:u,realtime:d,global:c}=t,{db:h,auth:f,realtime:m,global:v}=e,k=$c(t.tracePropagation),g=$c(e.tracePropagation),p={db:J(J({},h),l),auth:J(J({},f),u),realtime:J(J({},m),d),storage:{},global:J(J(J({},v),c),{},{headers:J(J({},(r=v==null?void 0:v.headers)!==null&&r!==void 0?r:{}),(n=c==null?void 0:c.headers)!==null&&n!==void 0?n:{})}),tracePropagation:{enabled:(s=(i=k==null?void 0:k.enabled)!==null&&i!==void 0?i:g==null?void 0:g.enabled)!==null&&s!==void 0?s:!1,respectSamplingDecision:(o=(a=k==null?void 0:k.respectSamplingDecision)!==null&&a!==void 0?a:g==null?void 0:g.respectSamplingDecision)!==null&&o!==void 0?o:!0},accessToken:async()=>""};return t.accessToken?p.accessToken=t.accessToken:delete p.accessToken,p}function v0(t){const e=t==null?void 0:t.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(y0(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var w0=class extends Qv{constructor(t){super(t)}},_0=class{constructor(t,e,r){var n,s;this.supabaseUrl=t,this.supabaseKey=e;const i=v0(t);if(!e)throw new Error("supabaseKey is required.");p0(e),this.realtimeUrl=new URL("realtime/v1",i),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",i),this.storageUrl=new URL("storage/v1",i),this.functionsUrl=new URL("functions/v1",i);const o=`sb-${i.hostname.split(".")[0]}-auth-token`,a={db:e0,realtime:r0,auth:J(J({},t0),{},{storageKey:o}),global:Zv,tracePropagation:n0},l=m0(r??{},a);if(this.settings=l,this.storageKey=(n=l.auth.storageKey)!==null&&n!==void 0?n:"",this.headers=(s=l.global.headers)!==null&&s!==void 0?s:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(d,c)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(c)} is not possible`)}});else{var u;this.auth=this._initSupabaseAuthClient((u=l.auth)!==null&&u!==void 0?u:{},this.headers,l.global.fetch)}this.fetch=Ic(e,t,this._getSessionToken.bind(this),l.global.fetch,l.tracePropagation),this.functionsFetch=Ic(e,t,this._getSessionToken.bind(this),l.global.fetch,l.tracePropagation,{omitApiKeyAsBearer:!0}),this.realtime=this._initRealtimeClient(J({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(d=>this.realtime.setAuth(d)).catch(d=>console.warn("Failed to set initial Realtime auth token:",d)),this.rest=new Cy(new URL("rest/v1",i).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit,retry:l.db.retry}),this.storage=new qm(this.storageUrl.href,this.headers,this.fetch,r==null?void 0:r.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new vy(this.functionsUrl.href,{headers:this.headers,customFetch:this.functionsFetch})}from(t){return this.rest.from(t)}schema(t){return this.rest.schema(t)}rpc(t,e={},r={head:!1,get:!1,count:void 0}){return this.rest.rpc(t,e,r)}channel(t,e={config:{}}){return this.realtime.channel(t,e)}getChannels(){return this.realtime.getChannels()}removeChannel(t){return this.realtime.removeChannel(t)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getSessionToken(){var t=this,e,r;if(t.accessToken)return await t.accessToken();const{data:n}=await t.auth.getSession();return(e=(r=n.session)===null||r===void 0?void 0:r.access_token)!==null&&e!==void 0?e:null}async _getAccessToken(){var t=this,e;return(e=await t._getSessionToken())!==null&&e!==void 0?e:t.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:t,persistSession:e,detectSessionInUrl:r,storage:n,userStorage:s,storageKey:i,flowType:o,lock:a,debug:l,throwOnError:u,experimental:d,lockAcquireTimeout:c,skipAutoInitialize:h},f,m){const v={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new w0({url:this.authUrl.href,headers:J(J({},v),f),storageKey:i,autoRefreshToken:t,persistSession:e,detectSessionInUrl:r,storage:n,userStorage:s,flowType:o,lock:a,debug:l,throwOnError:u,experimental:d,fetch:m,lockAcquireTimeout:c,skipAutoInitialize:h,hasCustomAuthorizationHeader:Object.keys(this.headers).some(k=>k.toLowerCase()==="authorization")})}_initRealtimeClient(t){return new ym(this.realtimeUrl.href,J(J({},t),{},{params:J(J({},{apikey:this.supabaseKey}),t==null?void 0:t.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,e)=>{this._handleTokenChanged(t,"CLIENT",e==null?void 0:e.access_token)})}_handleTokenChanged(t,e,r){(t==="TOKEN_REFRESHED"||t==="SIGNED_IN"||t==="INITIAL_SESSION")&&this.changedAccessToken!==r?(this.changedAccessToken=r,this.realtime.setAuth(r)):t==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const k0=(t,e,r)=>new _0(t,e,r);function S0(){if(typeof window<"u"||globalThis.Deno!==void 0)return!1;const t=globalThis.process;if(!t)return!1;const e=t.version;if(e==null)return!1;const r=e.match(/^v(\d+)\./);return r?parseInt(r[1],10)<=20:!1}S0()&&console.warn("⚠️  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715");const xf = (typeof window < "u" && window.SMOQUIT_CONFIG) || {},
  Ha = xf.SUPABASE_URL || void 0,
  Wa = xf.SUPABASE_ANON_KEY || void 0,
  Ni = !Ha || !Wa || Ha.includes("YOUR-PROJECT") || Wa.includes("YOUR-ANON");
Ni && console.warn("Supabase not configured. Edit config.js with your Project URL and anon key.");
const at = k0(Ni ? "http://localhost" : Ha, Ni ? "public-anon-key" : Wa, {
    auth: { persistSession: !0, autoRefreshToken: !0, detectSessionInUrl: !0 },
  }),
  b0 = !Ni;
function E0() {
  const [t, e] = U.useState(null),
    [r, n] = U.useState(!1);
  return (
    U.useEffect(() => {
      at.auth.getSession().then(({ data: i }) => {
        (e(i.session), n(!0));
      });
      const { data: s } = at.auth.onAuthStateChange((i, o) => {
        e(o);
      });
      return () => s.subscription.unsubscribe();
    }, []),
    { session: t, user: (t == null ? void 0 : t.user) ?? null, ready: r }
  );
}
async function T0(t, e) {
  return at.auth.signInWithPassword({ email: t, password: e });
}
async function x0(t, e) {
  return at.auth.signUp({ email: t, password: e });
}
async function C0(t) {
  return at.auth.signInWithOAuth({ provider: t, options: { redirectTo: window.location.origin } });
}
async function R0() {
  return at.auth.signOut();
}
const te = {
  breath: "#F5F3EE",
  paper: "#FFFFFF",
  ash: "#8A8577",
  smoke: "#3A3A36",
  ink: "#1C1B18",
  ember: "#E4572E",
  moss: "#5C7457",
  line: "#E3DFD5",
};

// ─────────────────────────────────────────────────────────────────────────
//  Language (i18n)
//
//  The app ships English and Hebrew. The chosen language is kept in the
//  user's own settings row in Supabase, so it follows the account to every
//  device and every sign-in; localStorage holds a copy so the login screen
//  and the first paint are already in the right language, before the
//  settings row has come back from the network.
//
//  sqT("English text") is the lookup: English doubles as the key, so a
//  missing Hebrew entry falls back to readable English rather than a blank.
//  Values stored in the database (trigger names, product names, country
//  codes) stay English — only what is drawn on screen is translated, so
//  switching language never rewrites anyone's history.
// ─────────────────────────────────────────────────────────────────────────
const SQ_LANG_STORAGE_KEY = "smoquit.lang",
  SQ_LANG_OPTIONS = [
    { id: "en", label: "English", dir: "ltr" },
    { id: "he", label: "עברית", dir: "rtl" },
  ],
  SQ_HE = {
  "Today": "היום",
  "Insights": "תובנות",
  "Tips": "טיפים",
  "Habits": "הרגלים",
  "Goal": "יעד",
  "Settings": "הגדרות",
  "Clearing the air…": "מפזרים את העשן…",
  "Smoquit — quit smoking, one logged craving at a time": "Smoquit — נגמלים מעישון, סיגריה מתועדת אחת בכל פעם",
  "Track what you smoke. Notice the pattern. Loosen its grip.": "עקבו אחרי מה שאתם מעשנים. שימו לב לדפוס. שחררו את האחיזה.",
  "Continue with Google": "התחברות עם Google",
  "Continue with Apple": "התחברות עם Apple",
  "or": "או",
  "Password": "סיסמה",
  "Create account": "יצירת חשבון",
  "Sign in": "כניסה",
  "Already have an account? Sign in": "כבר יש לכם חשבון? כניסה",
  "New here? Create an account": "חדשים כאן? יצירת חשבון",
  "Check your email to confirm your account, then sign in.": "שלחנו לכם מייל לאישור החשבון — אשרו אותו ואז היכנסו.",
  "Something went wrong.": "משהו השתבש.",
  "That sign-in option isn't switched on for this app yet. Use your email and password below.": "אפשרות ההתחברות הזו עדיין לא מופעלת באפליקציה. השתמשו בדוא״ל ובסיסמה שלמטה.",
  "Your data is stored privately in your own account and is visible only to you. We don't sell it, share it, or analyze it.": "הנתונים שלכם נשמרים באופן פרטי בחשבון שלכם וגלויים רק לכם. איננו מוכרים, משתפים או מנתחים אותם.",
  "Sign out": "התנתקות",
  "Log what you smoke. Notice the pattern. Loosen its grip.": "תעדו כל סיגריה. שימו לב לדפוס. שחררו את האחיזה.",
  "Today: {count}. Over your {target}/day target — tomorrow's a fresh start.": "היום: {count}. מעל היעד של {target} ליום — מחר מתחילים מחדש.",
  "Today: {count} of {target} allowed. Every skipped one counts.": "היום: {count} מתוך {target} מותרות. כל אחת שדילגתם עליה נחשבת.",
  "Cigarettes today": "סיגריות היום",
  "{n} over target": "{n} מעל היעד",
  "{n} left before target": "נשארו {n} עד היעד",
  "≈ {currency}{amount} saved today vs. your usual": "≈ {currency}{amount} נחסכו היום לעומת יום רגיל",
  "+ I just smoked one": "\u200f+ עישנתי עכשיו אחת",
  "Logging honestly is how the insights get useful.": "תיעוד כן הוא מה שהופך את התובנות למועילות.",
  "Today's timeline": "ציר הזמן של היום",
  "Nothing logged yet today. If a craving comes, try waiting it out — most pass in 3–5 minutes. If you do smoke, tap the button above so you can see your own pattern later.": "עדיין לא תועד כלום היום. אם עולה דחף, נסו לחכות שיחלוף — רובם עוברים תוך 3–5 דקות. אם בכל זאת עישנתם, לחצו על הכפתור למעלה כדי שתוכלו לראות בהמשך את הדפוס שלכם.",
  "Remove this entry": "הסרת הרשומה",
  "Undo": "ביטול",
  "What set this one off?": "מה גרם לזו?",
  "Naming the trigger is half of unlearning it.": "לתת שם לטריגר זה חצי מהעבודה.",
  "Stress": "לחץ",
  "Boredom": "שעמום",
  "Coffee": "קפה",
  "After a meal": "אחרי ארוחה",
  "Social": "חברה",
  "Craving": "דחף",
  "Habit": "הרגל",
  "Unlogged": "ללא תיוג",
  "Skip — just count it": "דילוג — רק לספור",
  "When did you actually smoke it?": "מתי באמת עישנתם אותה?",
  "Logged just now. Nudge it back if this one was earlier today.": "תועדה עכשיו. הזיזו אחורה אם זה קרה מוקדם יותר היום.",
  "Logged at the current time": "תועדה בשעה הנוכחית",
  "{n} min earlier": "{n} דקות קודם לכן",
  "{h}h {m}m earlier": "{h} שעות ו-{m} דקות קודם לכן",
  "−{n}m": "−{n} דק׳",
  "−{n}h": "−{n} שע׳",
  "Reset": "איפוס",
  "Or set an exact time": "או קבעו שעה מדויקת",
  "Save time": "שמירת השעה",
  "Keep current time": "להשאיר את השעה הנוכחית",
  "Once you've logged a few cigarettes, this page fills in with your patterns — busiest hours, top triggers, daily trend, and how many days you've cut back.": "אחרי שתתעדו כמה סיגריות, העמוד הזה יתמלא בדפוסים שלכם — השעות העמוסות, הטריגרים המובילים, המגמה היומית וכמה ימים הצלחתם לצמצם.",
  "Logged total": "סה״כ תועדו",
  "Daily average": "ממוצע יומי",
  "Days tracked": "ימים במעקב",
  "Best (lowest) day": "היום הכי טוב",
  "When you smoke": "מתי אתם מעשנים",
  "Your peak is around ": "השיא שלכם הוא בסביבות ",
  ". Plan a replacement for that window — a walk, water, a piece of gum.": " — תכננו תחליף לשעה הזו: הליכה, מים, מסטיק.",
  "{count} at {hour}:00": "{count} בשעה {hour}:00",
  "Top triggers": "טריגרים מובילים",
  "No triggers tagged yet.": "עדיין לא תויגו טריגרים.",
  "Last 7 days": "7 הימים האחרונים",
  "Small, repeatable moves beat willpower. Pick two that fit your day and lean on them.": "צעדים קטנים שחוזרים על עצמם עדיפים על כוח רצון. בחרו שניים שמתאימים ליום שלכם והישענו עליהם.",
  "Ride the 5-minute wave": "רכבו על הגל של 5 הדקות",
  "A craving peaks and fades in about 3–5 minutes whether or not you smoke. Set a timer and do anything else until it rings.": "דחף מגיע לשיא ודועך תוך 3–5 דקות, בין אם עישנתם ובין אם לא. הפעילו טיימר ועשו כל דבר אחר עד שיצלצל.",
  "Delay, don't decide": "לדחות, לא להחליט",
  "Don't tell yourself 'never again' in the moment. Tell yourself 'not right now.' Push the next one 10 minutes later each time.": "אל תגידו לעצמכם ברגע האמת ״אף פעם יותר״. תגידו ״לא עכשיו״. דחו כל סיגריה בעוד 10 דקות בכל פעם.",
  "Change your hands' job": "תנו לידיים תפקיד אחר",
  "Cravings are partly muscle memory. Hold a pen, a coin, or a stress ball. Keep your hands busy and the urge loses its ritual.": "דחפים הם גם זיכרון שרירי. החזיקו עט, מטבע או כדור לחיץ. כשהידיים עסוקות, הדחף מאבד את הטקס שלו.",
  "Drink cold water slowly": "שתו מים קרים לאט",
  "Sipping water mimics the hand-to-mouth motion and dulls the urge. Keep a full glass or bottle within reach.": "לגימות מים מחקות את תנועת היד לפה ומעמעמות את הדחף. החזיקו כוס או בקבוק מלאים בהישג יד.",
  "Break the pairings": "שברו את הצימודים",
  "Coffee, alcohol, and the after-meal moment are cues, not needs. Change the setting: brush your teeth, step outside, switch chairs.": "קפה, אלכוהול והרגע שאחרי הארוחה הם רמזים, לא צרכים. שנו את הסביבה: צחצחו שיניים, צאו החוצה, החליפו כיסא.",
  "Make it inconvenient": "הפכו את זה למסורבל",
  "Don't carry a lighter. Leave cigarettes in another room or the car. Every extra step is a chance to reconsider.": "אל תסתובבו עם מצית. השאירו את הסיגריות בחדר אחר או ברכב. כל צעד נוסף הוא הזדמנות להתחרט.",
  "Breathe like you're smoking": "נשמו כאילו אתם מעשנים",
  "The deep inhale is part of what relaxes you. Try four slow breaths — in for 4, hold for 4, out for 6 — without the cigarette.": "השאיפה העמוקה היא חלק ממה שמרגיע. נסו ארבע נשימות איטיות — שאיפה 4, החזקה 4, נשיפה 6 — בלי הסיגריה.",
  "Reward the skips": "תגמלו את הדילוגים",
  "Move the cigarette money into a jar or a savings note each day. Watching it grow makes the benefit concrete.": "העבירו את כסף הסיגריות לצנצנת או להוראת חיסכון בכל יום. לראות אותו גדל הופך את הרווח למוחשי.",
  "Smoquit is a self-help tracker, not medical advice. For nicotine replacement, prescriptions, or a quit plan tailored to you, talk to a doctor or a free quitline.": "Smoquit הוא כלי מעקב לעזרה עצמית, לא ייעוץ רפואי. לתחליפי ניקוטין, מרשמים או תוכנית גמילה מותאמת אישית — פנו לרופא או למוקד גמילה.",
  "A habit is a loop: ": "הרגל הוא לולאה: ",
  "cue → routine → reward": "רמז ← שגרה ← תגמול",
  ". You can't easily delete the cue, but you can swap the routine and still get a reward. Find your cue below and try its swap.": ". קשה למחוק את הרמז, אבל אפשר להחליף את השגרה ועדיין לקבל תגמול. מצאו למטה את הרמז שלכם ונסו את התחליף שלו.",
  "Cue": "רמז",
  "Swap": "תחליף",
  "Morning coffee": "קפה של הבוקר",
  "Drink it standing at a window, or switch to tea for a week so the pairing breaks.": "שתו אותו בעמידה ליד החלון, או עברו לתה לשבוע כדי לשבור את הצימוד.",
  "The commute": "הנסיעה לעבודה",
  "Chew gum or queue a podcast the moment you sit down — fill the hand and the head.": "לעסו מסטיק או הפעילו פודקאסט ברגע שאתם מתיישבים — תעסיקו את היד ואת הראש.",
  "Work stress break": "הפסקת לחץ בעבודה",
  "Take the break, drop the cigarette. Walk to get water or do 10 slow breaths outside.": "קחו את ההפסקה, ותרו על הסיגריה. לכו להביא מים או קחו 10 נשימות איטיות בחוץ.",
  "After eating": "אחרי האוכל",
  "Stand up and brush your teeth or leave the table immediately. The clean-mouth feeling fights the urge.": "קומו וצחצחו שיניים, או עזבו את השולחן מיד. תחושת הפה הנקי נלחמת בדחף.",
  "With a drink": "עם משקה",
  "Hold the glass in your smoking hand and keep it full. Sit with non-smokers when you can.": "החזיקו את הכוס ביד המעשנת ודאגו שתישאר מלאה. שבו ליד לא־מעשנים כשאפשר.",
  "Keep a 5-minute list ready: text a friend, stretch, a quick game — anything to bridge the gap.": "החזיקו רשימת 5 דקות מוכנה: הודעה לחבר, מתיחות, משחק קצר — כל דבר שיגשר על הפער.",
  "Why you're doing this": "למה אתם עושים את זה",
  "Days to quit date": "ימים לתאריך הגמילה",
  "Days since quit date": "ימים מאז תאריך הגמילה",
  "Est. total saved": "חיסכון כולל מוערך",
  "Cigarettes on a typical day (before quitting)": "סיגריות ביום רגיל (לפני הגמילה)",
  "Daily target for now": "יעד יומי לעכשיו",
  "Target quit date": "תאריך יעד לגמילה",
  "Your reason (you'll see it every time you open this)": "הסיבה שלכם (תראו אותה בכל פעם שתפתחו את זה)",
  "e.g. 15": "למשל 15",
  "e.g. 8": "למשל 8",
  "e.g. Be there for my kids without getting winded.": "למשל: להיות שם בשביל הילדים בלי להתנשף.",
  "Save my goal": "שמירת היעד",
  "Language": "שפה",
  "Saved to your account, so it follows you to every device you sign in on.": "נשמרת בחשבון שלכם, כך שהיא מתלווה לכל מכשיר שתתחברו ממנו.",
  "We set your country automatically when you first opened Smoquit": "קבענו את המדינה שלכם אוטומטית כשפתחתם את Smoquit בפעם הראשונה",
  " (you've since changed it)": " (מאז שיניתם אותה)",
  ". Currency and the product list follow from it. Everything here stays on your device.": ". המטבע ורשימת המוצרים נגזרים ממנה. כל מה שכאן נשמר בחשבון הפרטי שלכם.",
  "Country": "מדינה",
  "Other ($ USD)": "אחר (\u200e$ USD)",
  "Prices show in ": "המחירים מוצגים ב־",
  "What do you smoke?": "מה אתם מעשנים?",
  "Cigarettes": "סיגריות",
  "Roll-your-own": "טבק לגלגול",
  "Heated tobacco": "טבק מחומם",
  "Price per pack ({currency})": "מחיר לחפיסה ({currency})",
  "Prefilled from your brand. Adjust it to match what you actually pay — the savings numbers on Today and Goal use this (÷20 per cigarette).": "מולא לפי המותג שלכם. התאימו למה שאתם באמת משלמים — חישובי החיסכון בלשוניות היום והיעד מסתמכים על זה (חלקי 20 לסיגריה).",
  "Your setup": "המצב שלכם",
  "{currency}{price} per pack · ≈ {currency}{each} per cigarette": "{currency}{price} לחפיסה · ≈ {currency}{each} לסיגריה",
  "Product prices are rough 2026 estimates to get you started, not live retail prices — always trust the value you enter yourself.": "מחירי המוצרים הם הערכות גסות לשנת 2026 כנקודת פתיחה, לא מחירים בזמן אמת — סמכו תמיד על הסכום שאתם מזינים בעצמכם.",
  "Your account & privacy": "החשבון והפרטיות שלכם",
  "Everything you log is stored privately in your own account and is visible only to you. We don't sell, share, or analyze it.": "כל מה שאתם מתעדים נשמר באופן פרטי בחשבון שלכם וגלוי רק לכם. איננו מוכרים, משתפים או מנתחים אותו.",
  "Permanently delete all your Smoquit data? This can't be undone.": "למחוק לצמיתות את כל הנתונים שלכם ב־Smoquit? אי אפשר לבטל את זה.",
  "Delete all my data": "מחיקת כל הנתונים שלי",
  "Israel": "ישראל",
  "United States": "ארצות הברית",
  "United Kingdom": "בריטניה",
  "Germany": "גרמניה",
  "France": "צרפת",
  "Italy": "איטליה",
  "Spain": "ספרד",
  "Australia": "אוסטרליה",
  "Canada": "קנדה",
  "India": "הודו",
  "Other": "אחר",
  "Almost there": "כמעט שם",
  "Open ": "פתחו את ",
  " in this folder and paste in your Supabase Project URL and anon key (from Supabase → Settings → API), then reload this page.": " בתיקייה הזו, הדביקו את כתובת הפרויקט ומפתח ה־anon מ־Supabase (דרך Supabase ← Settings ← API), ואז רעננו את הדף.",
  "Prices show in {currency} {code}.": "המחירים מוצגים ב־\u200e{currency} {code}.",
  "{country} · {product}": "{country} · {product}"
};
function sqIsLang(t) {
  return t === "en" || t === "he";
}
function sqDetectLang() {
  try {
    const t = window.localStorage.getItem(SQ_LANG_STORAGE_KEY);
    if (sqIsLang(t)) return t;
  } catch {}
  try {
    const t = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    if (/^(he|iw)\b/i.test(t)) return "he";
  } catch {}
  return "en";
}
let SQ_LANG = sqDetectLang();
const sqLangListeners = new Set();
function sqDir() {
  return SQ_LANG === "he" ? "rtl" : "ltr";
}
function sqLocale() {
  return SQ_LANG === "he" ? "he-IL" : [];
}
function sqT(t, e) {
  let r = (SQ_LANG === "he" && SQ_HE[t]) || t;
  if (e) for (const n in e) r = r.split("{" + n + "}").join(String(e[n]));
  return r;
}
function sqApplyLangToDocument() {
  try {
    window.SMOQUIT_LANG = SQ_LANG;
    const t = document.documentElement;
    ((t.lang = SQ_LANG), (t.dir = sqDir()));
    document.title = sqT("Smoquit — quit smoking, one logged craving at a time");
  } catch {}
}
function sqSetLang(t, e) {
  if (!sqIsLang(t)) return;
  if (!e || e.remember !== !1)
    try {
      window.localStorage.setItem(SQ_LANG_STORAGE_KEY, t);
    } catch {}
  if (t === SQ_LANG) {
    sqApplyLangToDocument();
    return;
  }
  ((SQ_LANG = t), sqApplyLangToDocument(), sqLangListeners.forEach((r) => r(t)));
}
function useSqLang() {
  const [, t] = U.useState(0);
  return (
    U.useEffect(() => {
      const e = () => t((r) => r + 1);
      return (sqLangListeners.add(e), () => sqLangListeners.delete(e));
    }, []),
    SQ_LANG
  );
}
sqApplyLangToDocument();
async function fetchEnabledProviders() {
  var fallback = { google: !0, apple: !0 };
  try {
    if (!Ha || !Wa) return fallback;
    var base = String(Ha).replace(/\/+$/, "");
    var res = await fetch(base + "/auth/v1/settings", { headers: { apikey: Wa } });
    if (!res.ok) return fallback;
    var json = await res.json();
    var ext = json && json.external;
    if (!ext || typeof ext != "object") return fallback;
    return { google: ext.google === !0, apple: ext.apple === !0 };
  } catch (e) {
    return fallback;
  }
}
function friendlyAuthError(msg) {
  var m = String(msg || "");
  if (/provider is not enabled|Unsupported provider/i.test(m))
    return sqT(
      "That sign-in option isn't switched on for this app yet. Use your email and password below.",
    );
  return m || sqT("Something went wrong.");
}
function P0() {
  useSqLang();
  const [oauthProviders, setOauthProviders] = U.useState(null),
    [t, e] = U.useState("signin"),
    [r, n] = U.useState(""),
    [s, i] = U.useState(""),
    [o, a] = U.useState(null),
    [l, u] = U.useState(!1),
    d = async () => {
      (a(null), u(!0));
      try {
        if (t === "signup") {
          const { error: h } = await x0(r, s);
          if (h) throw h;
          a({ ok: !0, text: sqT("Check your email to confirm your account, then sign in.") });
        } else {
          const { error: h } = await T0(r, s);
          if (h) throw h;
        }
      } catch (h) {
        a({ ok: !1, text: h.message || sqT("Something went wrong.") });
      } finally {
        u(!1);
      }
    },
    c = async (h) => {
      a(null);
      const { error: f } = await C0(h);
      f && a({ ok: !1, text: friendlyAuthError(f.message) });
    };
  U.useEffect(() => {
    let alive = !0;
    fetchEnabledProviders().then((p) => {
      alive && setOauthProviders(p);
    });
    return () => {
      alive = !1;
    };
  }, []);
  const showGoogleBtn = !!(oauthProviders && oauthProviders.google),
    showAppleBtn = !!(oauthProviders && oauthProviders.apple),
    showOauthRow = showGoogleBtn || showAppleBtn;
  return w.jsx("div", {
    style: A0,
    children: w.jsxs("div", {
      style: O0,
      children: [
        w.jsx("div", {
          style: {
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            justifyContent: "center",
            marginBottom: 6,
          },
          children: w.jsxs("span", {
            style: j0,
            children: ["Smo", w.jsx("span", { style: { color: te.ember }, children: "quit" })],
          }),
        }),
        w.jsx("p", {
          style: I0,
          children: sqT("Track what you smoke. Notice the pattern. Loosen its grip."),
        }),
        showOauthRow
          ? w.jsxs("div", {
              style: { display: "flex", flexDirection: "column", gap: 10, marginTop: 22 },
              children: [
                showGoogleBtn
                  ? w.jsx("button", {
                      style: Lc,
                      onClick: () => c("google"),
                      children: sqT("Continue with Google"),
                    })
                  : null,
                showAppleBtn
                  ? w.jsx("button", {
                      style: { ...Lc, background: "#000", color: "#fff", borderColor: "#000" },
                      onClick: () => c("apple"),
                      children: sqT("Continue with Apple"),
                    })
                  : null,
              ],
            })
          : null,
        showOauthRow
          ? w.jsx("div", { style: N0, children: w.jsx("span", { style: $0, children: sqT("or") }) })
          : null,
        w.jsx("input", {
          style: Dc,
          type: "email",
          placeholder: "you@email.com",
          value: r,
          onChange: (h) => n(h.target.value),
          autoComplete: "email",
        }),
        w.jsx("input", {
          style: Dc,
          type: "password",
          placeholder: sqT("Password"),
          value: s,
          onChange: (h) => i(h.target.value),
          autoComplete: t === "signup" ? "new-password" : "current-password",
        }),
        w.jsx("button", {
          style: L0,
          onClick: d,
          disabled: l || !r || !s,
          children: l ? "…" : sqT(t === "signup" ? "Create account" : "Sign in"),
        }),
        o &&
          w.jsx("div", {
            style: {
              fontSize: 13,
              marginTop: 12,
              color: o.ok ? te.moss : te.ember,
              lineHeight: 1.5,
            },
            children: o.text,
          }),
        w.jsx("button", {
          style: D0,
          onClick: () => {
            (e(t === "signup" ? "signin" : "signup"), a(null));
          },
          children: sqT(
            t === "signup" ? "Already have an account? Sign in" : "New here? Create an account",
          ),
        }),
        w.jsx("p", {
          style: U0,
          children: sqT(
            "Your data is stored privately in your own account and is visible only to you. We don't sell it, share it, or analyze it.",
          ),
        }),
        w.jsx("div", {
          style: { display: "flex", justifyContent: "center", gap: 10, marginTop: 14 },
          children: SQ_LANG_OPTIONS.map((L) =>
            w.jsx(
              "button",
              {
                type: "button",
                lang: L.id,
                onClick: () => sqSetLang(L.id),
                style: {
                  background: "none",
                  border: "none",
                  padding: "2px 6px",
                  fontSize: 12.5,
                  cursor: "pointer",
                  color: SQ_LANG === L.id ? te.ink : te.ash,
                  fontWeight: SQ_LANG === L.id ? 700 : 500,
                  textDecoration: SQ_LANG === L.id ? "none" : "underline",
                },
                children: L.label,
              },
              L.id,
            ),
          ),
        }),
      ],
    }),
  });
}
const A0 = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    background: te.breath,
  },
  O0 = {
    width: "100%",
    maxWidth: 380,
    background: te.paper,
    border: `1px solid ${te.line}`,
    borderRadius: 18,
    padding: "32px 26px",
    boxShadow: "0 10px 40px rgba(0,0,0,.05)",
  },
  j0 = {
    direction: "ltr",
    fontSize: 34,
    fontWeight: 800,
    letterSpacing: -1,
    fontFamily: "Georgia, serif",
    color: te.ink,
  },
  I0 = { textAlign: "center", fontSize: 13.5, color: te.ash, lineHeight: 1.5, margin: "4px 0 0" },
  Lc = {
    width: "100%",
    padding: "12px",
    borderRadius: 10,
    border: `1px solid ${te.line}`,
    background: te.paper,
    color: te.ink,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  },
  N0 = {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    margin: "18px 0",
    borderTop: `1px solid ${te.line}`,
    position: "relative",
  },
  $0 = {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: te.paper,
    padding: "0 10px",
    fontSize: 12,
    color: te.ash,
  },
  Dc = {
    width: "100%",
    padding: "12px",
    border: `1px solid ${te.line}`,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 10,
    color: te.ink,
    background: te.paper,
  },
  L0 = {
    width: "100%",
    padding: "13px",
    borderRadius: 10,
    border: "none",
    background: te.ember,
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 2,
  },
  D0 = {
    width: "100%",
    marginTop: 14,
    background: "none",
    border: "none",
    color: te.smoke,
    fontSize: 13,
    cursor: "pointer",
    textDecoration: "underline",
  },
  U0 = { fontSize: 11.5, color: te.ash, lineHeight: 1.5, marginTop: 18, textAlign: "center" };
async function Ml() {
  var e;
  const { data: t } = await at.auth.getUser();
  return ((e = t == null ? void 0 : t.user) == null ? void 0 : e.id) || null;
}
async function zo(t, e) {
  try {
    const r = await Ml();
    if (!r) return e;
    const { data: n, error: s } = await at
      .from("user_data")
      .select("value")
      .eq("user_id", r)
      .eq("key", t)
      .maybeSingle();
    if (s) throw s;
    return n ? n.value : e;
  } catch (r) {
    return (
      (console.error("loadKey failed", t, r),
      window.SMOQUIT_STORAGE_ERROR && window.SMOQUIT_STORAGE_ERROR("load", t, r)),
      e
    );
  }
}
async function Er(t, e) {
  try {
    const r = await Ml();
    if (!r) return;
    const { error: n } = await at
      .from("user_data")
      .upsert(
        { user_id: r, key: t, value: e, updated_at: new Date().toISOString() },
        { onConflict: "user_id,key" },
      );
    if (n) throw n;
  } catch (r) {
    (console.error("saveKey failed", t, r),
      window.SMOQUIT_STORAGE_ERROR && window.SMOQUIT_STORAGE_ERROR("save", t, r));
  }
}
async function z0() {
  const t = await Ml();
  t && (await at.from("user_data").delete().eq("user_id", t));
}
const S = {
    breath: "#F5F3EE",
    paper: "#FFFFFF",
    ash: "#8A8577",
    smoke: "#3A3A36",
    ink: "#1C1B18",
    ember: "#E4572E",
    emberSoft: "#F6C9B8",
    moss: "#5C7457",
    mossSoft: "#D6E0D0",
    line: "#E3DFD5",
  },
  B0 = [
    { id: "log", label: "Today" },
    { id: "insights", label: "Insights" },
    { id: "tips", label: "Tips" },
    { id: "habits", label: "Habits" },
    { id: "goal", label: "Goal" },
    { id: "settings", label: "Settings" },
  ],
  M0 = ["Stress", "Boredom", "Coffee", "After a meal", "Social", "Craving", "Habit"],
  $i = {
    IL: {
      name: "Israel",
      currency: "₪",
      code: "ILS",
      perPack: 36,
      products: [
        { n: "Marlboro (Red / Gold)", p: 36, type: "cig" },
        { n: "L&M", p: 34, type: "cig" },
        { n: "Winston", p: 35, type: "cig" },
        { n: "Parliament", p: 39, type: "cig" },
        { n: "Camel", p: 36, type: "cig" },
        { n: "Noblesse", p: 30, type: "cig" },
        { n: "Time", p: 30, type: "cig" },
        { n: "Golf", p: 30, type: "cig" },
        { n: "Pall Mall", p: 33, type: "cig" },
        { n: "Roll-your-own (Drum / Golden Virginia)", p: 45, type: "roll" },
        { n: "IQOS / Heets", p: 34, type: "heated" },
      ],
    },
    US: {
      name: "United States",
      currency: "$",
      code: "USD",
      perPack: 8,
      products: [
        { n: "Marlboro", p: 9, type: "cig" },
        { n: "Newport", p: 9, type: "cig" },
        { n: "Camel", p: 8, type: "cig" },
        { n: "Pall Mall", p: 7, type: "cig" },
        { n: "Winston", p: 7.5, type: "cig" },
        { n: "American Spirit", p: 10, type: "cig" },
        { n: "Lucky Strike", p: 7.5, type: "cig" },
        { n: "Roll-your-own", p: 6, type: "roll" },
        { n: "IQOS / Heets", p: 8, type: "heated" },
      ],
    },
    GB: {
      name: "United Kingdom",
      currency: "£",
      code: "GBP",
      perPack: 16,
      products: [
        { n: "Marlboro", p: 16.6, type: "cig" },
        { n: "Benson & Hedges", p: 16, type: "cig" },
        { n: "Lambert & Butler", p: 14.5, type: "cig" },
        { n: "Mayfair", p: 13.5, type: "cig" },
        { n: "Richmond", p: 13, type: "cig" },
        { n: "Amber Leaf (roll-your-own)", p: 20, type: "roll" },
        { n: "Golden Virginia (roll-your-own)", p: 21, type: "roll" },
        { n: "IQOS / Heets", p: 12, type: "heated" },
      ],
    },
    DE: {
      name: "Germany",
      currency: "€",
      code: "EUR",
      perPack: 8,
      products: [
        { n: "Marlboro", p: 8.6, type: "cig" },
        { n: "L&M", p: 8, type: "cig" },
        { n: "Gauloises", p: 8, type: "cig" },
        { n: "Lucky Strike", p: 8.2, type: "cig" },
        { n: "Pall Mall", p: 8, type: "cig" },
        { n: "West", p: 8, type: "cig" },
        { n: "Roll-your-own (Van Nelle / Pueblo)", p: 12, type: "roll" },
        { n: "IQOS / Heets", p: 8, type: "heated" },
      ],
    },
    FR: {
      name: "France",
      currency: "€",
      code: "EUR",
      perPack: 12,
      products: [
        { n: "Marlboro", p: 12.5, type: "cig" },
        { n: "Gauloises", p: 11.5, type: "cig" },
        { n: "Camel", p: 12, type: "cig" },
        { n: "Philip Morris", p: 11.5, type: "cig" },
        { n: "Winston", p: 11.5, type: "cig" },
        { n: "Roll-your-own", p: 16, type: "roll" },
        { n: "IQOS / Heets", p: 11, type: "heated" },
      ],
    },
    IT: {
      name: "Italy",
      currency: "€",
      code: "EUR",
      perPack: 6,
      products: [
        { n: "Marlboro", p: 6.2, type: "cig" },
        { n: "MS", p: 5.8, type: "cig" },
        { n: "Camel", p: 6, type: "cig" },
        { n: "Chesterfield", p: 5.5, type: "cig" },
        { n: "Winston", p: 5.7, type: "cig" },
        { n: "Roll-your-own", p: 8, type: "roll" },
        { n: "IQOS / Heets", p: 5.5, type: "heated" },
      ],
    },
    ES: {
      name: "Spain",
      currency: "€",
      code: "EUR",
      perPack: 5.4,
      products: [
        { n: "Marlboro", p: 5.4, type: "cig" },
        { n: "Fortuna", p: 5, type: "cig" },
        { n: "Ducados", p: 5, type: "cig" },
        { n: "Camel", p: 5.3, type: "cig" },
        { n: "Winston", p: 5.1, type: "cig" },
        { n: "Roll-your-own", p: 7, type: "roll" },
        { n: "IQOS / Heets", p: 5, type: "heated" },
      ],
    },
    AU: {
      name: "Australia",
      currency: "A$",
      code: "AUD",
      perPack: 45,
      products: [
        { n: "Winfield", p: 45, type: "cig" },
        { n: "Marlboro", p: 48, type: "cig" },
        { n: "Longbeach", p: 42, type: "cig" },
        { n: "Peter Jackson", p: 43, type: "cig" },
        { n: "Roll-your-own", p: 55, type: "roll" },
      ],
    },
    CA: {
      name: "Canada",
      currency: "C$",
      code: "CAD",
      perPack: 16,
      products: [
        { n: "du Maurier", p: 16, type: "cig" },
        { n: "Player's", p: 15.5, type: "cig" },
        { n: "Export A", p: 15, type: "cig" },
        { n: "Marlboro", p: 16, type: "cig" },
        { n: "Belmont", p: 16, type: "cig" },
        { n: "Roll-your-own", p: 14, type: "roll" },
      ],
    },
    IN: {
      name: "India",
      currency: "₹",
      code: "INR",
      perPack: 340,
      products: [
        { n: "Gold Flake", p: 340, type: "cig" },
        { n: "Classic", p: 360, type: "cig" },
        { n: "Wills Navy Cut", p: 320, type: "cig" },
        { n: "Marlboro", p: 380, type: "cig" },
        { n: "Bidi (bundle)", p: 30, type: "roll" },
      ],
    },
  },
  F0 = {
    name: "Other",
    currency: "$",
    code: "USD",
    perPack: 6,
    products: [
      { n: "Marlboro", p: 6, type: "cig" },
      { n: "Camel", p: 6, type: "cig" },
      { n: "Winston", p: 5.5, type: "cig" },
      { n: "L&M", p: 5, type: "cig" },
      { n: "Lucky Strike", p: 5.5, type: "cig" },
      { n: "Local brand", p: 5, type: "cig" },
      { n: "Roll-your-own", p: 7, type: "roll" },
      { n: "IQOS / Heets", p: 6, type: "heated" },
    ],
  };
function os(t) {
  return $i[t] || F0;
}
function Cf() {
  try {
    const e = (
      Intl.DateTimeFormat().resolvedOptions().locale ||
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      ""
    ).split("-")[1];
    if (e && $i[e.toUpperCase()]) return e.toUpperCase();
    const r = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (r.includes("Jerusalem")) return "IL";
    if (r.includes("London")) return "GB";
    if (r.includes("Paris")) return "FR";
    if (r.includes("Berlin")) return "DE";
    if (r.includes("Rome")) return "IT";
    if (r.includes("Madrid")) return "ES";
    if (r.includes("Sydney") || r.includes("Melbourne")) return "AU";
    if (r.includes("Toronto") || r.includes("Vancouver")) return "CA";
    if (r.includes("Kolkata")) return "IN";
    if (r.includes("New_York") || r.includes("Chicago") || r.includes("Los_Angeles")) return "US";
  } catch {}
  return "IL";
}
const H0 = () => new Date().toISOString().slice(0, 10),
  Rf = (t) => new Date(t).toLocaleTimeString(sqLocale(), { hour: "numeric", minute: "2-digit" });
function W0({ user: t }) {
  useSqLang();
  const [e, r] = U.useState("log"),
    [n, s] = U.useState(!1),
    [i, o] = U.useState({}),
    [a, l] = U.useState(null),
    [u, d] = U.useState(null),
    [c, h] = U.useState(null),
    [f, m] = U.useState(null);
  U.useEffect(() => {
    (async () => {
      (o(await zo("logs", {})), l(await zo("goal", null)));
      let b = await zo("settings", null);
      if (!b) {
        const E = Cf(),
          R = os(E).products[0];
        ((b = { country: E, product: R.n, pricePerPack: R.p, lang: SQ_LANG }), Er("settings", b));
      } else if (!sqIsLang(b.lang))
        // An account saved before the app spoke Hebrew: adopt whatever this
        // browser is showing and write it back, so it is pinned from now on.
        ((b = { ...b, lang: SQ_LANG }), Er("settings", b));
      (sqSetLang(b.lang), d(b), s(!0));
    })();
  }, []);
  const v = U.useCallback((b) => {
      d((E) => {
        const T = { ...E, ...b };
        return (Er("settings", T), T);
      });
    }, []),
    k = H0(),
    g = i[k] || [],
    p = U.useCallback(
      (b) => {
        const E = Date.now();
        return (
          o((T) => {
            const R = T[k] ? [...T[k]] : [];
            R.push({ ts: E, trigger: b });
            const N = { ...T, [k]: R };
            return (Er("logs", N), N);
          }),
          E
        );
      },
      [k],
    ),
    y = U.useCallback(
      (b, E) => {
        o((T) => {
          const R = [...(T[k] || [])],
            N = R.findIndex((me) => me.ts === b);
          if (N === -1) return T;
          ((R[N] = { ...R[N], ts: E }), R.sort((me, Jt) => me.ts - Jt.ts));
          const $ = { ...T, [k]: R };
          return (Er("logs", $), $);
        });
      },
      [k],
    ),
    _ = U.useCallback(
      (b) => {
        o((E) => {
          const T = [...(E[k] || [])];
          T.splice(b, 1);
          const R = { ...E, [k]: T };
          return (Er("logs", R), R);
        });
      },
      [k],
    );
  return n
    ? w.jsxs("div", {
        style: Uc,
        children: [
          w.jsx("style", {
            children: `
        * { box-sizing: border-box; }
        @keyframes rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes smoke { 0% { opacity:.5; transform: translateY(0) scaleX(1); } 100% { opacity:0; transform: translateY(-22px) scaleX(1.6); } }
        .sq-tab:focus-visible, .sq-btn:focus-visible { outline: 2px solid ${S.ember}; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `,
          }),
          w.jsxs("div", {
            style: sw,
            children: [
              w.jsx(V0, { goal: a, count: g.length, user: t }),
              w.jsx("nav", {
                style: lw,
                children: B0.map((b) =>
                  w.jsx(
                    "button",
                    {
                      className: "sq-tab",
                      onClick: () => r(b.id),
                      style: {
                        ...uw,
                        color: e === b.id ? S.ink : S.ash,
                        borderBottom: e === b.id ? `2px solid ${S.ember}` : "2px solid transparent",
                        fontWeight: e === b.id ? 700 : 500,
                      },
                      children: sqT(b.label),
                    },
                    b.id,
                  ),
                ),
              }),
              w.jsxs("main", {
                style: { padding: "22px 20px 40px", animation: "rise .3s ease" },
                children: [
                  e === "log" &&
                    w.jsx(q0, {
                      todayLogs: g,
                      goal: a,
                      settings: u,
                      onAsk: () => h(!0),
                      onRemove: _,
                    }),
                  e === "insights" && w.jsx(J0, { logs: i }),
                  e === "tips" && w.jsx(X0, {}),
                  e === "habits" && w.jsx(ew, {}),
                  e === "goal" && w.jsx(tw, { goal: a, setGoal: l, logs: i, settings: u }),
                  e === "settings" && w.jsx(nw, { settings: u, onChange: v }),
                ],
              }),
            ],
          }),
          c &&
            w.jsx(K0, {
              onPick: (b) => {
                const E = p(b);
                (h(null), m({ ts: E, trigger: b }));
              },
              onClose: () => h(null),
            }),
          f &&
            w.jsx(G0, {
              entry: f,
              onSave: (b) => {
                (b !== f.ts && y(f.ts, b), m(null));
              },
              onClose: () => m(null),
            }),
        ],
      })
    : w.jsx("div", {
        style: { ...Uc, display: "flex", alignItems: "center", justifyContent: "center" },
        children: w.jsx("span", {
          style: { color: S.ash, fontFamily: "Georgia, serif", fontStyle: "italic" },
          children: sqT("Clearing the air…"),
        }),
      });
}
function V0({ goal: t, count: e, user: r }) {
  const n = t && t.target != null && e > t.target;
  return w.jsxs("header", {
    style: iw,
    children: [
      w.jsxs("div", {
        style: { display: "flex", alignItems: "center", justifyContent: "space-between" },
        children: [
          w.jsxs("div", {
            style: { display: "flex", alignItems: "baseline", gap: 10 },
            children: [
              w.jsxs("span", {
                style: ow,
                children: ["Smo", w.jsx("span", { style: { color: S.ember }, children: "quit" })],
              }),
              w.jsxs("span", {
                style: { position: "relative", width: 3, height: 14, display: "inline-block" },
                children: [
                  w.jsx("span", {
                    style: {
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: 3,
                      height: 14,
                      background: `linear-gradient(${S.ash}, ${S.breath})`,
                      borderRadius: 2,
                    },
                  }),
                  w.jsx("span", {
                    style: {
                      position: "absolute",
                      left: 0,
                      top: -4,
                      width: 3,
                      height: 4,
                      background: S.ember,
                      borderRadius: 2,
                      animation: "smoke 2.4s ease-out infinite",
                    },
                  }),
                ],
              }),
            ],
          }),
          r &&
            w.jsx("button", {
              onClick: () => R0(),
              style: {
                background: "none",
                border: "none",
                color: S.ash,
                fontSize: 12,
                cursor: "pointer",
                textDecoration: "underline",
              },
              title: r.email,
              children: sqT("Sign out"),
            }),
        ],
      }),
      w.jsx("p", {
        style: aw,
        children: t
          ? n
            ? sqT("Today: {count}. Over your {target}/day target — tomorrow's a fresh start.", {
                count: e,
                target: t.target,
              })
            : sqT("Today: {count} of {target} allowed. Every skipped one counts.", {
                count: e,
                target: t.target ?? "—",
              })
          : sqT("Log what you smoke. Notice the pattern. Loosen its grip."),
      }),
    ],
  });
}
function q0({ todayLogs: t, goal: e, settings: r, onAsk: n, onRemove: s }) {
  const i = t.length,
    o = (e == null ? void 0 : e.target) ?? null,
    a = o ? Math.min(100, (i / Math.max(1, o)) * 100) : 0,
    l = r != null && r.country ? os(r.country).currency : "$",
    u = ((r == null ? void 0 : r.pricePerPack) ?? 13) / 20,
    d = U.useMemo(
      () => (e != null && e.baseline ? Math.max(0, e.baseline - i) * u : null),
      [e, i, u],
    );
  return w.jsxs("div", {
    children: [
      w.jsxs("div", {
        style: cw,
        children: [
          w.jsx("div", {
            style: { fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", color: S.ash },
            children: sqT("Cigarettes today"),
          }),
          w.jsx("div", { style: dw, children: i }),
          o != null &&
            w.jsxs(w.Fragment, {
              children: [
                w.jsx("div", {
                  style: Pf,
                  children: w.jsx("div", {
                    style: { ...Af, width: `${a}%`, background: i > o ? S.ember : S.moss },
                  }),
                }),
                w.jsx("div", {
                  style: { fontSize: 13, color: S.ash, marginTop: 6 },
                  children:
                    i > o
                      ? sqT("{n} over target", { n: i - o })
                      : sqT("{n} left before target", { n: o - i }),
                }),
              ],
            }),
          d != null &&
            w.jsxs("div", {
              style: { fontSize: 13, color: S.moss, marginTop: 10, fontWeight: 600 },
              children: sqT("≈ {currency}{amount} saved today vs. your usual", {
                currency: l,
                amount: d.toFixed(2),
              }),
            }),
          w.jsx("button", {
            className: "sq-btn",
            style: Of,
            onClick: n,
            children: sqT("+ I just smoked one"),
          }),
          w.jsx("div", {
            style: { fontSize: 12, color: S.ash, marginTop: 8 },
            children: sqT("Logging honestly is how the insights get useful."),
          }),
        ],
      }),
      w.jsx("h3", { style: ti, children: sqT("Today's timeline") }),
      i === 0
        ? w.jsx("div", {
            style: jf,
            children: sqT(
              "Nothing logged yet today. If a craving comes, try waiting it out — most pass in 3–5 minutes. If you do smoke, tap the button above so you can see your own pattern later.",
            ),
          })
        : w.jsx("ul", {
            style: { listStyle: "none", padding: 0, margin: 0 },
            children: t
              .map((c, h) => ({ ...c, i: h }))
              .reverse()
              .map((c) =>
                w.jsxs(
                  "li",
                  {
                    style: hw,
                    children: [
                      w.jsx("span", {
                        style: {
                          fontVariantNumeric: "tabular-nums",
                          color: S.smoke,
                          fontWeight: 600,
                        },
                        children: Rf(c.ts),
                      }),
                      w.jsx("span", { style: fw, children: sqT(c.trigger) }),
                      w.jsx("button", {
                        className: "sq-btn",
                        onClick: () => s(c.i),
                        style: pw,
                        "aria-label": sqT("Remove this entry"),
                        children: sqT("Undo"),
                      }),
                    ],
                  },
                  c.ts,
                ),
              ),
          }),
    ],
  });
}
function K0({ onPick: t, onClose: e }) {
  return w.jsx("div", {
    style: If,
    onClick: e,
    children: w.jsxs("div", {
      style: Nf,
      onClick: (r) => r.stopPropagation(),
      children: [
        w.jsx("div", {
          style: { fontSize: 15, fontWeight: 700, color: S.ink, marginBottom: 4 },
          children: sqT("What set this one off?"),
        }),
        w.jsx("div", {
          style: { fontSize: 13, color: S.ash, marginBottom: 14 },
          children: sqT("Naming the trigger is half of unlearning it."),
        }),
        w.jsx("div", {
          style: { display: "flex", flexWrap: "wrap", gap: 8 },
          children: M0.map((r) =>
            w.jsx(
              "button",
              { className: "sq-btn", style: In, onClick: () => t(r), children: sqT(r) },
              r,
            ),
          ),
        }),
        w.jsx("button", {
          className: "sq-btn",
          style: { ...In, marginTop: 14, width: "100%" },
          onClick: () => t("Unlogged"),
          children: sqT("Skip — just count it"),
        }),
      ],
    }),
  });
}
function G0({ entry: t, onSave: e, onClose: r }) {
  const [n, s] = U.useState(t.ts),
    i = t.ts,
    o = U.useMemo(() => {
      const c = new Date(n);
      return `${String(c.getHours()).padStart(2, "0")}:${String(c.getMinutes()).padStart(2, "0")}`;
    }, [n]),
    a = (c) => {
      s((h) => {
        const f = h - c * 6e4,
          m = new Date(h);
        return (m.setHours(0, 0, 0, 0), Math.max(m.getTime(), f));
      });
    },
    l = (c) => {
      if (!c) return;
      const [h, f] = c.split(":").map(Number),
        m = new Date(i);
      m.setHours(h, f, 0, 0);
      let v = m.getTime();
      (v > i && (v = i), s(v));
    },
    u = Math.round((i - n) / 6e4),
    d =
      u <= 0
        ? sqT("Logged at the current time")
        : u < 60
          ? sqT("{n} min earlier", { n: u })
          : sqT("{h}h {m}m earlier", { h: Math.floor(u / 60), m: u % 60 });
  return w.jsx("div", {
    style: If,
    onClick: r,
    children: w.jsxs("div", {
      style: Nf,
      onClick: (c) => c.stopPropagation(),
      children: [
        w.jsx("div", {
          style: { fontSize: 15, fontWeight: 700, color: S.ink, marginBottom: 4 },
          children: sqT("When did you actually smoke it?"),
        }),
        w.jsx("div", {
          style: { fontSize: 13, color: S.ash, marginBottom: 16 },
          children: sqT("Logged just now. Nudge it back if this one was earlier today."),
        }),
        w.jsxs("div", {
          style: { textAlign: "center", marginBottom: 14 },
          children: [
            w.jsx("div", {
              style: { fontFamily: "Georgia, serif", fontSize: 40, fontWeight: 700, color: S.ink },
              children: Rf(n),
            }),
            w.jsx("div", {
              style: { fontSize: 12.5, color: u > 0 ? S.ember : S.ash, marginTop: 2 },
              children: d,
            }),
          ],
        }),
        w.jsxs("div", {
          style: { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" },
          children: [
            [5, 15, 30, 60, 120].map((c) =>
              w.jsxs(
                "button",
                {
                  className: "sq-btn",
                  style: In,
                  onClick: () => a(c),
                  children: c < 60 ? sqT("−{n}m", { n: c }) : sqT("−{n}h", { n: c / 60 }),
                },
                c,
              ),
            ),
            w.jsx("button", {
              className: "sq-btn",
              style: { ...In, color: S.ash },
              onClick: () => s(i),
              children: sqT("Reset"),
            }),
          ],
        }),
        w.jsxs("label", {
          style: { ...Nt, marginTop: 18 },
          children: [
            sqT("Or set an exact time"),
            w.jsx("input", {
              type: "time",
              value: o,
              max: new Date(i).toTimeString().slice(0, 5),
              onChange: (c) => l(c.target.value),
              style: $t,
            }),
          ],
        }),
        w.jsx("button", {
          className: "sq-btn",
          style: { ...Of, background: S.moss, marginTop: 20 },
          onClick: () => e(n),
          children: sqT("Save time"),
        }),
        w.jsx("button", {
          className: "sq-btn",
          style: {
            ...In,
            width: "100%",
            marginTop: 8,
            border: "none",
            background: "none",
            color: S.ash,
          },
          onClick: () => e(i),
          children: sqT("Keep current time"),
        }),
      ],
    }),
  });
}
function J0({ logs: t }) {
  const lang = useSqLang(),
    e = U.useMemo(() => Q0(t), [t, lang]);
  if (e.total === 0)
    return w.jsx("div", {
      style: jf,
      children: sqT(
        "Once you've logged a few cigarettes, this page fills in with your patterns — busiest hours, top triggers, daily trend, and how many days you've cut back.",
      ),
    });
  const r = Math.max(...e.byHour, 1),
    n = Math.max(...e.last7.map((s) => s.count), 1);
  return w.jsxs("div", {
    children: [
      w.jsxs("div", {
        style: $f,
        children: [
          w.jsx(Ur, { label: sqT("Logged total"), value: e.total }),
          w.jsx(Ur, { label: sqT("Daily average"), value: e.avgPerDay.toFixed(1) }),
          w.jsx(Ur, { label: sqT("Days tracked"), value: e.days }),
          w.jsx(Ur, { label: sqT("Best (lowest) day"), value: e.bestDay, accent: S.moss }),
        ],
      }),
      w.jsx("h3", { style: ti, children: sqT("When you smoke") }),
      w.jsxs("div", {
        style: { fontSize: 13, color: S.ash, marginBottom: 12 },
        children: [
          sqT("Your peak is around "),
          w.jsx("strong", { style: { color: S.ember }, children: e.peakHourLabel }),
          sqT(". Plan a replacement for that window — a walk, water, a piece of gum."),
        ],
      }),
      w.jsx("div", {
        style: yw,
        children: e.byHour.map((s, i) =>
          w.jsxs(
            "div",
            {
              style: {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
              },
              children: [
                w.jsx("div", {
                  title: sqT("{count} at {hour}:00", { count: s, hour: i }),
                  style: {
                    width: "70%",
                    height: `${(s / r) * 90 + (s ? 6 : 0)}px`,
                    background: s === r && s > 0 ? S.ember : S.emberSoft,
                    borderRadius: "3px 3px 0 0",
                    transition: "height .3s",
                  },
                }),
                i % 6 === 0 &&
                  w.jsx("span", {
                    style: { fontSize: 9, color: S.ash, marginTop: 3 },
                    children: i,
                  }),
              ],
            },
            i,
          ),
        ),
      }),
      w.jsx("h3", { style: ti, children: sqT("Top triggers") }),
      e.topTriggers.length === 0
        ? w.jsx("div", {
            style: { fontSize: 13, color: S.ash },
            children: sqT("No triggers tagged yet."),
          })
        : w.jsx("div", {
            children: e.topTriggers.map(([s, i]) =>
              w.jsxs(
                "div",
                {
                  style: { marginBottom: 8 },
                  children: [
                    w.jsxs("div", {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 13,
                        color: S.smoke,
                      },
                      children: [
                        w.jsx("span", { children: sqT(s) }),
                        w.jsx("span", { style: { color: S.ash }, children: i }),
                      ],
                    }),
                    w.jsx("div", {
                      style: Pf,
                      children: w.jsx("div", {
                        style: { ...Af, width: `${(i / e.total) * 100}%`, background: S.smoke },
                      }),
                    }),
                  ],
                },
                s,
              ),
            ),
          }),
      w.jsx("h3", { style: ti, children: sqT("Last 7 days") }),
      w.jsx("div", {
        style: { display: "flex", gap: 6, alignItems: "flex-end", height: 90 },
        children: e.last7.map((s) =>
          w.jsxs(
            "div",
            {
              style: {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                height: "100%",
              },
              children: [
                w.jsx("span", {
                  style: { fontSize: 11, color: S.smoke, marginBottom: 2, fontWeight: 600 },
                  children: s.count,
                }),
                w.jsx("div", {
                  style: {
                    width: "68%",
                    height: `${(s.count / n) * 70 + 2}px`,
                    background: S.moss,
                    borderRadius: "3px 3px 0 0",
                  },
                }),
                w.jsx("span", {
                  style: { fontSize: 10, color: S.ash, marginTop: 4 },
                  children: s.label,
                }),
              ],
            },
            s.date,
          ),
        ),
      }),
    ],
  });
}
function Ur({ label: t, value: e, accent: r }) {
  return w.jsxs("div", {
    style: gw,
    children: [
      w.jsx("div", {
        style: { fontSize: 24, fontWeight: 700, color: r || S.ink, fontFamily: "Georgia, serif" },
        children: e,
      }),
      w.jsx("div", {
        style: { fontSize: 11, color: S.ash, textTransform: "uppercase", letterSpacing: 0.6 },
        children: t,
      }),
    ],
  });
}
function Q0(t) {
  Object.keys(t).filter((m) => t[m].length >= 0);
  const e = [];
  Object.values(t).forEach((m) => m.forEach((v) => e.push(v)));
  const r = e.length,
    n = new Array(24).fill(0),
    s = {};
  e.forEach((m) => {
    (n[new Date(m.ts).getHours()]++,
      m.trigger && m.trigger !== "Unlogged" && (s[m.trigger] = (s[m.trigger] || 0) + 1));
  });
  const i = Object.keys(t).filter((m) => t[m].length > 0),
    o = Math.max(i.length, 1),
    a = r / o,
    l = i.map((m) => t[m].length),
    u = l.length ? Math.min(...l) : 0,
    d = n.indexOf(Math.max(...n)),
    c =
      r === 0
        ? "—"
        : SQ_LANG === "he"
          ? `${String(d).padStart(2, "0")}:00`
          : `${d === 0 ? 12 : d > 12 ? d - 12 : d}${d >= 12 ? "pm" : "am"}`,
    h = Object.entries(s)
      .sort((m, v) => v[1] - m[1])
      .slice(0, 5),
    f = [];
  for (let m = 6; m >= 0; m--) {
    const v = new Date();
    v.setDate(v.getDate() - m);
    const k = v.toISOString().slice(0, 10);
    f.push({
      date: k,
      count: (t[k] || []).length,
      label: v.toLocaleDateString(sqLocale(), { weekday: "narrow" }),
    });
  }
  return {
    total: r,
    byHour: n,
    days: o,
    avgPerDay: a,
    bestDay: u,
    peakHourLabel: c,
    topTriggers: h,
    last7: f,
  };
}
const Y0 = [
  {
    t: "Ride the 5-minute wave",
    d: "A craving peaks and fades in about 3–5 minutes whether or not you smoke. Set a timer and do anything else until it rings.",
  },
  {
    t: "Delay, don't decide",
    d: "Don't tell yourself 'never again' in the moment. Tell yourself 'not right now.' Push the next one 10 minutes later each time.",
  },
  {
    t: "Change your hands' job",
    d: "Cravings are partly muscle memory. Hold a pen, a coin, or a stress ball. Keep your hands busy and the urge loses its ritual.",
  },
  {
    t: "Drink cold water slowly",
    d: "Sipping water mimics the hand-to-mouth motion and dulls the urge. Keep a full glass or bottle within reach.",
  },
  {
    t: "Break the pairings",
    d: "Coffee, alcohol, and the after-meal moment are cues, not needs. Change the setting: brush your teeth, step outside, switch chairs.",
  },
  {
    t: "Make it inconvenient",
    d: "Don't carry a lighter. Leave cigarettes in another room or the car. Every extra step is a chance to reconsider.",
  },
  {
    t: "Breathe like you're smoking",
    d: "The deep inhale is part of what relaxes you. Try four slow breaths — in for 4, hold for 4, out for 6 — without the cigarette.",
  },
  {
    t: "Reward the skips",
    d: "Move the cigarette money into a jar or a savings note each day. Watching it grow makes the benefit concrete.",
  },
];
function X0() {
  return w.jsxs("div", {
    children: [
      w.jsx("p", {
        style: { fontSize: 14, color: S.smoke, lineHeight: 1.6, marginTop: 0 },
        children: sqT(
          "Small, repeatable moves beat willpower. Pick two that fit your day and lean on them.",
        ),
      }),
      Y0.map((t, e) =>
        w.jsxs(
          "div",
          {
            style: mw,
            children: [
              w.jsx("div", { style: vw, children: String(e + 1).padStart(2, "0") }),
              w.jsxs("div", {
                children: [
                  w.jsx("div", {
                    style: { fontWeight: 700, color: S.ink, marginBottom: 4 },
                    children: sqT(t.t),
                  }),
                  w.jsx("div", {
                    style: { fontSize: 13.5, color: S.smoke, lineHeight: 1.55 },
                    children: sqT(t.d),
                  }),
                ],
              }),
            ],
          },
          e,
        ),
      ),
      w.jsx("div", {
        style: Lf,
        children: sqT(
          "Smoquit is a self-help tracker, not medical advice. For nicotine replacement, prescriptions, or a quit plan tailored to you, talk to a doctor or a free quitline.",
        ),
      }),
    ],
  });
}
const Z0 = [
  {
    cue: "Morning coffee",
    swap: "Drink it standing at a window, or switch to tea for a week so the pairing breaks.",
  },
  {
    cue: "The commute",
    swap: "Chew gum or queue a podcast the moment you sit down — fill the hand and the head.",
  },
  {
    cue: "Work stress break",
    swap: "Take the break, drop the cigarette. Walk to get water or do 10 slow breaths outside.",
  },
  {
    cue: "After eating",
    swap: "Stand up and brush your teeth or leave the table immediately. The clean-mouth feeling fights the urge.",
  },
  {
    cue: "With a drink",
    swap: "Hold the glass in your smoking hand and keep it full. Sit with non-smokers when you can.",
  },
  {
    cue: "Boredom",
    swap: "Keep a 5-minute list ready: text a friend, stretch, a quick game — anything to bridge the gap.",
  },
];
function ew() {
  return w.jsxs("div", {
    children: [
      w.jsxs("p", {
        style: { fontSize: 14, color: S.smoke, lineHeight: 1.6, marginTop: 0 },
        children: [
          sqT("A habit is a loop: "),
          w.jsx("strong", { children: sqT("cue → routine → reward") }),
          sqT(
            ". You can't easily delete the cue, but you can swap the routine and still get a reward. Find your cue below and try its swap.",
          ),
        ],
      }),
      Z0.map((t, e) =>
        w.jsxs(
          "div",
          {
            style: ww,
            children: [
              w.jsxs("div", {
                style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 },
                children: [
                  w.jsx("span", { style: zc, children: sqT("Cue") }),
                  w.jsx("span", { style: { fontWeight: 700, color: S.ink }, children: sqT(t.cue) }),
                ],
              }),
              w.jsxs("div", {
                style: { display: "flex", gap: 8, alignItems: "flex-start" },
                children: [
                  w.jsx("span", {
                    style: { ...zc, background: S.mossSoft, color: S.moss },
                    children: sqT("Swap"),
                  }),
                  w.jsx("span", {
                    style: { fontSize: 13.5, color: S.smoke, lineHeight: 1.55 },
                    children: sqT(t.swap),
                  }),
                ],
              }),
            ],
          },
          e,
        ),
      ),
    ],
  });
}
function tw({ goal: t, setGoal: e, logs: r, settings: n }) {
  const s = n != null && n.country ? os(n.country).currency : "$",
    i = ((n == null ? void 0 : n.pricePerPack) ?? 13) / 20,
    [o, a] = U.useState((t == null ? void 0 : t.baseline) ?? ""),
    [l, u] = U.useState((t == null ? void 0 : t.target) ?? ""),
    [d, c] = U.useState((t == null ? void 0 : t.quitDate) ?? ""),
    [h, f] = U.useState((t == null ? void 0 : t.reason) ?? ""),
    m = () => {
      const g = {
        baseline: o === "" ? null : Number(o),
        target: l === "" ? null : Number(l),
        quitDate: d || null,
        reason: h.trim(),
      };
      (e(g), Er("goal", g));
    },
    v = U.useMemo(
      () =>
        t != null && t.quitDate ? Math.ceil((new Date(t.quitDate) - new Date()) / 864e5) : null,
      [t],
    ),
    k = U.useMemo(() => {
      if (!(t != null && t.baseline)) return null;
      let g = 0;
      return (
        Object.values(r).forEach((p) => {
          g += Math.max(0, t.baseline - p.length) * i;
        }),
        g
      );
    }, [t, r, i]);
  return w.jsxs("div", {
    children: [
      (t == null ? void 0 : t.reason) &&
        w.jsxs("div", {
          style: Df,
          children: [
            w.jsx("div", {
              style: {
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: S.ash,
                marginBottom: 6,
              },
              children: sqT("Why you're doing this"),
            }),
            w.jsxs("div", {
              style: {
                fontFamily: "Georgia, serif",
                fontSize: 18,
                fontStyle: "italic",
                color: S.ink,
                lineHeight: 1.4,
              },
              children: ['"', t.reason, '"'],
            }),
          ],
        }),
      t &&
        (v != null || k != null) &&
        w.jsxs("div", {
          style: $f,
          children: [
            v != null &&
              w.jsx(Ur, {
                label: sqT(v >= 0 ? "Days to quit date" : "Days since quit date"),
                value: Math.abs(v),
                accent: S.moss,
              }),
            k != null &&
              w.jsx(Ur, {
                label: sqT("Est. total saved"),
                value: `${s}${k.toFixed(0)}`,
                accent: S.moss,
              }),
          ],
        }),
      w.jsxs("div", {
        style: _w,
        children: [
          w.jsxs("label", {
            style: Nt,
            children: [
              sqT("Cigarettes on a typical day (before quitting)"),
              w.jsx("input", {
                type: "number",
                min: "0",
                value: o,
                onChange: (g) => a(g.target.value),
                style: $t,
                placeholder: sqT("e.g. 15"),
              }),
            ],
          }),
          w.jsxs("label", {
            style: Nt,
            children: [
              sqT("Daily target for now"),
              w.jsx("input", {
                type: "number",
                min: "0",
                value: l,
                onChange: (g) => u(g.target.value),
                style: $t,
                placeholder: sqT("e.g. 8"),
              }),
            ],
          }),
          w.jsxs("label", {
            style: Nt,
            children: [
              sqT("Target quit date"),
              w.jsx("input", {
                type: "date",
                value: d,
                onChange: (g) => c(g.target.value),
                style: $t,
              }),
            ],
          }),
          w.jsxs("label", {
            style: Nt,
            children: [
              sqT("Your reason (you'll see it every time you open this)"),
              w.jsx("textarea", {
                value: h,
                onChange: (g) => f(g.target.value),
                style: { ...$t, minHeight: 70, resize: "vertical", fontFamily: "inherit" },
                placeholder: sqT("e.g. Be there for my kids without getting winded."),
              }),
            ],
          }),
          w.jsx("button", {
            className: "sq-btn",
            style: kw,
            onClick: m,
            children: sqT("Save my goal"),
          }),
        ],
      }),
    ],
  });
}
const rw = { cig: "Cigarettes", roll: "Roll-your-own", heated: "Heated tobacco" };
function nw({ settings: t, onChange: e }) {
  if (!t) return null;
  const r = os(t.country),
    n = Cf(),
    s = (o) => {
      const l = os(o).products[0];
      e({ country: o, product: l.n, pricePerPack: l.p });
    },
    i = (o) => {
      const a = r.products.find((l) => l.n === o);
      e({ product: o, pricePerPack: a ? a.p : t.pricePerPack });
    };
  return w.jsxs("div", {
    children: [
      w.jsxs("label", {
        style: Nt,
        children: [
          sqT("Language"),
          w.jsx("select", {
            value: SQ_LANG,
            onChange: (o) => {
              const a = o.target.value;
              // Two places, on purpose: sqSetLang repaints the app now (and
              // remembers the choice on this device), onChange writes it into
              // the account so every later sign-in comes back in it.
              (sqSetLang(a), e({ lang: a }));
            },
            style: { ...$t, appearance: "auto" },
            children: SQ_LANG_OPTIONS.map((o) =>
              w.jsx("option", { value: o.id, lang: o.id, children: o.label }, o.id),
            ),
          }),
        ],
      }),
      w.jsx("div", {
        style: Bc,
        children: sqT("Saved to your account, so it follows you to every device you sign in on."),
      }),
      w.jsxs("p", {
        style: { fontSize: 14, color: S.smoke, lineHeight: 1.6, marginTop: 26 },
        children: [
          sqT("We set your country automatically when you first opened Smoquit"),
          t.country === n ? "" : sqT(" (you've since changed it)"),
          sqT(
            ". Currency and the product list follow from it. Everything here stays on your device.",
          ),
        ],
      }),
      w.jsxs("label", {
        style: Nt,
        children: [
          sqT("Country"),
          w.jsxs("select", {
            value: t.country,
            onChange: (o) => s(o.target.value),
            style: { ...$t, appearance: "auto" },
            children: [
              Object.entries($i).map(([o, a]) =>
                w.jsx("option", { value: o, children: `${sqT(a.name)} (‎${a.currency} ${a.code})` }, o),
              ),
              !$i[t.country] &&
                w.jsx("option", { value: t.country, children: sqT("Other ($ USD)") }),
            ],
          }),
        ],
      }),
      w.jsx("div", {
        style: { ...Bc },
        children: sqT("Prices show in {currency} {code}.", { currency: r.currency, code: r.code }),
      }),
      w.jsxs("label", {
        style: { ...Nt, marginTop: 18 },
        children: [
          sqT("What do you smoke?"),
          w.jsx("select", {
            value: t.product,
            onChange: (o) => i(o.target.value),
            style: { ...$t, appearance: "auto" },
            children: r.products.map((o) =>
              w.jsx(
                "option",
                { value: o.n, children: `${o.n} — ${r.currency}${o.p} · ${sqT(rw[o.type] || o.type)}` },
                o.n,
              ),
            ),
          }),
        ],
      }),
      w.jsxs("label", {
        style: { ...Nt, marginTop: 18 },
        children: [
          sqT("Price per pack ({currency})", { currency: r.currency }),
          w.jsx("input", {
            type: "number",
            min: "0",
            step: "0.5",
            value: t.pricePerPack,
            onChange: (o) =>
              e({ pricePerPack: o.target.value === "" ? 0 : Number(o.target.value) }),
            style: $t,
          }),
        ],
      }),
      w.jsx("div", {
        style: Bc,
        children: sqT(
          "Prefilled from your brand. Adjust it to match what you actually pay — the savings numbers on Today and Goal use this (÷20 per cigarette).",
        ),
      }),
      w.jsxs("div", {
        style: { ...Df, background: S.breath, marginTop: 22 },
        children: [
          w.jsx("div", {
            style: {
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: S.ash,
              marginBottom: 8,
            },
            children: sqT("Your setup"),
          }),
          w.jsxs("div", {
            style: { fontSize: 14, color: S.smoke, lineHeight: 1.7 },
            children: [
              `${sqT(r.name)} · ${t.product}`,
              w.jsx("br", {}),
              sqT("{currency}{price} per pack · ≈ {currency}{each} per cigarette", {
                currency: r.currency,
                price: Number(t.pricePerPack).toFixed(2),
                each: (Number(t.pricePerPack) / 20).toFixed(2),
              }),
            ],
          }),
        ],
      }),
      w.jsx("div", {
        style: Lf,
        children: sqT(
          "Product prices are rough 2026 estimates to get you started, not live retail prices — always trust the value you enter yourself.",
        ),
      }),
      w.jsxs("div", {
        style: { marginTop: 26, borderTop: `1px solid ${S.line}`, paddingTop: 18 },
        children: [
          w.jsx("div", {
            style: {
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: S.ash,
              marginBottom: 8,
            },
            children: sqT("Your account & privacy"),
          }),
          w.jsx("p", {
            style: { fontSize: 13, color: S.smoke, lineHeight: 1.6, marginTop: 0 },
            children: sqT(
              "Everything you log is stored privately in your own account and is visible only to you. We don't sell, share, or analyze it.",
            ),
          }),
          w.jsx("button", {
            onClick: async () => {
              window.confirm(sqT("Permanently delete all your Smoquit data? This can't be undone.")) &&
                (await z0(), window.location.reload());
            },
            style: {
              background: "none",
              border: `1px solid ${S.ember}`,
              color: S.ember,
              borderRadius: 10,
              padding: "11px 14px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              width: "100%",
              marginTop: 6,
            },
            children: sqT("Delete all my data"),
          }),
        ],
      }),
    ],
  });
}
const Uc = {
    minHeight: "100vh",
    background: S.breath,
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    color: S.ink,
    padding: "0",
  },
  sw = {
    maxWidth: 480,
    margin: "0 auto",
    minHeight: "100vh",
    background: S.paper,
    boxShadow: "0 0 40px rgba(0,0,0,.04)",
  },
  iw = { padding: "26px 20px 16px", borderBottom: `1px solid ${S.line}` },
  ow = {
    direction: "ltr",
    fontSize: 30,
    fontWeight: 800,
    letterSpacing: -1,
    fontFamily: "Georgia, serif",
  },
  aw = { margin: "10px 0 0", fontSize: 13.5, color: S.ash, lineHeight: 1.5 },
  lw = {
    display: "flex",
    gap: 4,
    padding: "0 12px",
    borderBottom: `1px solid ${S.line}`,
    position: "sticky",
    top: 0,
    background: S.paper,
    zIndex: 5,
    overflowX: "auto",
  },
  uw = {
    background: "none",
    border: "none",
    padding: "13px 12px 11px",
    fontSize: 14,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  cw = {
    background: S.breath,
    border: `1px solid ${S.line}`,
    borderRadius: 14,
    padding: "22px 20px",
    textAlign: "center",
    marginBottom: 26,
  },
  dw = {
    fontSize: 64,
    fontWeight: 800,
    lineHeight: 1,
    margin: "6px 0 14px",
    fontFamily: "Georgia, serif",
    color: S.ink,
  },
  Pf = { height: 8, background: S.line, borderRadius: 6, overflow: "hidden", marginTop: 4 },
  Af = { height: "100%", borderRadius: 6, transition: "width .4s ease" },
  Of = {
    marginTop: 18,
    width: "100%",
    background: S.ember,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "14px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  },
  ti = {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: S.ash,
    margin: "26px 0 12px",
    fontWeight: 700,
  },
  jf = {
    fontSize: 14,
    color: S.smoke,
    lineHeight: 1.6,
    background: S.breath,
    border: `1px dashed ${S.line}`,
    borderRadius: 12,
    padding: "18px 16px",
  },
  hw = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 4px",
    borderBottom: `1px solid ${S.line}`,
  },
  fw = {
    fontSize: 12,
    color: S.smoke,
    background: S.breath,
    border: `1px solid ${S.line}`,
    borderRadius: 20,
    padding: "3px 10px",
    flex: 1,
  },
  pw = {
    background: "none",
    border: "none",
    color: S.ash,
    fontSize: 12,
    cursor: "pointer",
    textDecoration: "underline",
  },
  If = {
    position: "fixed",
    inset: 0,
    background: "rgba(28,27,24,.4)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    zIndex: 50,
  },
  Nf = {
    background: S.paper,
    borderRadius: "18px 18px 0 0",
    padding: "22px 20px 30px",
    width: "100%",
    maxWidth: 480,
    animation: "rise .25s ease",
  },
  In = {
    background: S.breath,
    border: `1px solid ${S.line}`,
    borderRadius: 22,
    padding: "9px 16px",
    fontSize: 14,
    color: S.smoke,
    cursor: "pointer",
  },
  $f = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 6 },
  gw = {
    background: S.breath,
    border: `1px solid ${S.line}`,
    borderRadius: 12,
    padding: "14px 16px",
  },
  yw = {
    display: "flex",
    alignItems: "flex-end",
    gap: 2,
    height: 110,
    borderBottom: `1px solid ${S.line}`,
    paddingBottom: 2,
  },
  mw = {
    display: "flex",
    gap: 14,
    padding: "16px 0",
    borderBottom: `1px solid ${S.line}`,
    alignItems: "flex-start",
  },
  vw = {
    fontFamily: "Georgia, serif",
    fontSize: 20,
    fontWeight: 700,
    color: S.emberSoft,
    minWidth: 30,
  },
  Lf = {
    marginTop: 22,
    fontSize: 12,
    color: S.ash,
    lineHeight: 1.55,
    borderTop: `1px solid ${S.line}`,
    paddingTop: 16,
  },
  ww = {
    background: S.breath,
    border: `1px solid ${S.line}`,
    borderRadius: 12,
    padding: "14px 16px",
    marginBottom: 10,
  },
  zc = {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: 700,
    background: S.emberSoft,
    color: S.ember,
    borderRadius: 6,
    padding: "3px 7px",
    whiteSpace: "nowrap",
  },
  Df = { background: S.mossSoft, borderRadius: 14, padding: "18px 20px", marginBottom: 16 },
  _w = { display: "flex", flexDirection: "column", gap: 16, marginTop: 8 },
  Nt = {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    fontSize: 13,
    fontWeight: 600,
    color: S.smoke,
  },
  $t = {
    border: `1px solid ${S.line}`,
    borderRadius: 10,
    padding: "11px 12px",
    fontSize: 15,
    color: S.ink,
    background: S.paper,
    fontWeight: 400,
  },
  kw = {
    background: S.moss,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "14px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 4,
  },
  Bc = { fontSize: 12.5, color: S.ash, lineHeight: 1.5, marginTop: 8 };
function Sw() {
  useSqLang();
  const { user: t, ready: e } = E0();
  return b0
    ? e
      ? t
        ? w.jsx(W0, { user: t }, t.id)
        : w.jsx(P0, {})
      : w.jsx("div", {
          style: Mc,
          children: w.jsx("span", {
            style: { color: "#8A8577", fontFamily: "Georgia, serif", fontStyle: "italic" },
            children: sqT("Clearing the air…"),
          }),
        })
    : w.jsx("div", {
        style: Mc,
        children: w.jsxs("div", {
          style: bw,
          children: [
            w.jsx("h2", {
              style: { margin: "0 0 8px", fontFamily: "Georgia, serif" },
              children: sqT("Almost there"),
            }),
            w.jsxs("p", {
              style: { color: "#3A3A36", lineHeight: 1.6, fontSize: 14 },
              children: [
                sqT("Open "),
                w.jsx("code", { children: "config.js" }),
                sqT(
                  " in this folder and paste in your Supabase Project URL and anon key (from Supabase → Settings → API), then reload this page.",
                ),
              ],
            }),
          ],
        }),
      });
}
const Mc = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    background: "#F5F3EE",
  },
  bw = {
    maxWidth: 420,
    background: "#fff",
    border: "1px solid #E3DFD5",
    borderRadius: 16,
    padding: "28px 24px",
  };
Bo.createRoot(document.getElementById("root")).render(
  w.jsx(tp.StrictMode, { children: w.jsx(Sw, {}) }),
);
