var Et=Object.defineProperty;var tt=n=>{throw TypeError(n)};var St=(n,e,t)=>e in n?Et(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var j=(n,e,t)=>St(n,typeof e!="symbol"?e+"":e,t),Tt=(n,e,t)=>e.has(n)||tt("Cannot "+t);var A=(n,e,t)=>(Tt(n,e,"read from private field"),t?t.call(n):e.get(n)),D=(n,e,t)=>e.has(n)?tt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t);import{a8 as Ct,g as We,at as gt,h as L,K as De,d as Xe,l as ue,H as Pt,aj as ft,I as It,J as nt,M as Be,j as V,ag as Rt,N as ht,i as Le,k as Dt,au as Ge,q as Mt,F as at,av as Ve,z as R,aw as Je,ax as Ot,x as Lt,C as st,ay as Nt,m as jt,az as Ht,ar as $e,aA as zt,ab as pt,ah as Ut,af as qt,O as Bt,v as Gt,e as Yt,u as Zt,r as Xt,aB as Wt,aC as Vt,aD as Jt,aE as $t,a7 as M,y as E,p as te,c as H,f as G,b as z,s as ee,t as $,a as ne,a2 as Kt,Y as B,as as Qt}from"./runtime.zJu6gAe0.js";import{g as rt,j as en,f as Q,a as P,e as Z,t as ae,s as Ne,k as tn,d as Ke}from"./disclose-version.Cy9Xpbgu.js";import{a as C,b as it,p as je,i as Y}from"./index-client.C4xOEwYd.js";import{b as vt,s as nn}from"./attributes.C5c3IZQV.js";import{b as an}from"./paths.CdO5APgh.js";let Me=null;function Xn(n){Me=n}function Wn(n,e){return e}function sn(n,e,t,s){for(var l=[],d=e.length,g=0;g<d;g++)Nt(e[g].e,l,!0);var u=d>0&&l.length===0&&t!==null;if(u){var v=t.parentNode;jt(v),v.append(t),s.clear(),W(n,e[0].prev,e[d-1].next)}Ht(l,()=>{for(var F=0;F<d;F++){var S=e[F];u||(s.delete(S.k),W(n,S.prev,S.next)),$e(S.e,!u)}})}function Vn(n,e,t,s,l,d=null){var g=n,u={flags:e,items:new Map,first:null},v=(e&gt)!==0;if(v){var F=n;g=L?De(ue(F)):F.appendChild(Ct())}L&&Xe();var S=null;We(()=>{var f=t(),_=Pt(f)?f:f==null?[]:ft(f),m=_.length;let x=!1;if(L){var y=g.data===It;y!==(m===0)&&(g=nt(),De(g),Be(!1),x=!0)}if(L){for(var b=null,k,r=0;r<m;r++){if(V.nodeType===8&&V.data===Rt){g=V,x=!0,Be(!1);break}var a=_[r],i=s(a,r);k=mt(V,u,b,null,a,i,r,l,e),u.items.set(i,k),b=k}m>0&&De(nt())}L||rn(_,u,g,l,e,s),d!==null&&(m===0?S?ht(S):S=Le(()=>d(g)):S!==null&&Dt(S,()=>{S=null})),x&&Be(!0)}),L&&(g=V)}function rn(n,e,t,s,l,d){var se,re,Se,Te;var g=(l&zt)!==0,u=(l&(Ve|Je))!==0,v=n.length,F=e.items,S=e.first,f=S,_,m=null,x,y=[],b=[],k,r,a,i;if(g)for(i=0;i<v;i+=1)k=n[i],r=d(k,i),a=F.get(r),a!==void 0&&((se=a.a)==null||se.measure(),(x??(x=new Set)).add(a));for(i=0;i<v;i+=1){if(k=n[i],r=d(k,i),a=F.get(r),a===void 0){var c=f?f.e.nodes_start:t;m=mt(c,e,m,m===null?e.first:m.next,k,r,i,s,l),F.set(r,m),y=[],b=[],f=m.next;continue}if(u&&ln(a,k,i,l),a.e.f&Ge&&(ht(a.e),g&&((re=a.a)==null||re.unfix(),(x??(x=new Set)).delete(a))),a!==f){if(_!==void 0&&_.has(a)){if(y.length<b.length){var o=b[0],h;m=o.prev;var w=y[0],p=y[y.length-1];for(h=0;h<y.length;h+=1)lt(y[h],o,t);for(h=0;h<b.length;h+=1)_.delete(b[h]);W(e,w.prev,p.next),W(e,m,w),W(e,p,o),f=o,m=p,i-=1,y=[],b=[]}else _.delete(a),lt(a,f,t),W(e,a.prev,a.next),W(e,a,m===null?e.first:m.next),W(e,m,a),m=a;continue}for(y=[],b=[];f!==null&&f.k!==r;)f.e.f&Ge||(_??(_=new Set)).add(f),b.push(f),f=f.next;if(f===null)continue;a=f}y.push(a),m=a,f=a.next}if(f!==null||_!==void 0){for(var T=_===void 0?[]:ft(_);f!==null;)f.e.f&Ge||T.push(f),f=f.next;var I=T.length;if(I>0){var U=l&gt&&v===0?t:null;if(g){for(i=0;i<I;i+=1)(Se=T[i].a)==null||Se.measure();for(i=0;i<I;i+=1)(Te=T[i].a)==null||Te.fix()}sn(e,T,U,F)}}g&&Mt(()=>{var ie;if(x!==void 0)for(a of x)(ie=a.a)==null||ie.apply()}),at.first=e.first&&e.first.e,at.last=m&&m.e}function ln(n,e,t,s){s&Ve&&R(n.v,e),s&Je?R(n.i,t):n.i=t}function mt(n,e,t,s,l,d,g,u,v){var F=Me;try{var S=(v&Ve)!==0,f=(v&Ot)===0,_=S?f?Lt(l):st(l):l,m=v&Je?st(g):g,x={i:m,v:_,k:d,a:null,e:null,prev:t,next:s};return Me=x,x.e=Le(()=>u(n,_,m),L),x.e.prev=t&&t.e,x.e.next=s&&s.e,t===null?e.first=x:(t.next=x,t.e.next=x.e),s!==null&&(s.prev=x,s.e.prev=x.e),x}finally{Me=F}}function lt(n,e,t){for(var s=n.next?n.next.e.nodes_start:t,l=e?e.e.nodes_start:t,d=n.e.nodes_start;d!==s;){var g=pt(d);l.before(d),d=g}}function W(n,e,t){e===null?n.first=t:(e.next=t,e.e.next=t&&t.e),t!==null&&(t.prev=e,t.e.prev=e&&e.e)}function Jn(n,e,t,s,l){var d=n,g="",u;We(()=>{if(g===(g=e()??"")){L&&Xe();return}u!==void 0&&($e(u),u=void 0),g!==""&&(u=Le(()=>{if(L){V.data;for(var v=Xe(),F=v;v!==null&&(v.nodeType!==8||v.data!=="");)F=v,v=pt(v);if(v===null)throw Ut(),qt;rt(V,F),d=De(v);return}var S=g+"";t&&(S=`<svg>${S}</svg>`);var f=en(S);if((t||s)&&(f=ue(f)),rt(ue(f),f.lastChild),t||s)for(;ue(f);)d.before(ue(f));else d.before(f)}))})}function J(n,e,...t){var s=n,l=Gt,d;We(()=>{l!==(l=e())&&(d&&($e(d),d=null),d=Le(()=>l(s,...t)))},Bt),L&&(s=V)}function _t(n,e,t){Yt(()=>{var s=Zt(()=>e(n,t==null?void 0:t())||{});if(t&&(s!=null&&s.update)){var l=!1,d={};Xt(()=>{var g=t();Wt(g),l&&Vt(d,g)&&(d=g,s.update(g))}),l=!0}if(s!=null&&s.destroy)return()=>s.destroy()})}function $n(n,e){var t=n.__className,s=un(e);L&&n.className===s?n.__className=s:(t!==s||L&&n.className!==s)&&(e==null?n.removeAttribute("class"):n.className=s,n.__className=s)}function un(n){return n??""}function oe(n,e,t){if(t){if(n.classList.contains(e))return;n.classList.add(e)}else{if(!n.classList.contains(e))return;n.classList.remove(e)}}function Ye(n,e,t,s,l){var d=n.__attributes??(n.__attributes={}),g=n.style,u="style-"+e;d[u]===t&&(!l||g.getPropertyValue(e)===t)||(d[u]=t,t==null?g.removeProperty(e):g.setProperty(e,t,""))}var ut=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function on(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var yt={exports:{}};(function(n){var e=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=function(s){var l=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,d=0,g={},u={manual:s.Prism&&s.Prism.manual,disableWorkerMessageHandler:s.Prism&&s.Prism.disableWorkerMessageHandler,util:{encode:function r(a){return a instanceof v?new v(a.type,r(a.content),a.alias):Array.isArray(a)?a.map(r):a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(r){return Object.prototype.toString.call(r).slice(8,-1)},objId:function(r){return r.__id||Object.defineProperty(r,"__id",{value:++d}),r.__id},clone:function r(a,i){i=i||{};var c,o;switch(u.util.type(a)){case"Object":if(o=u.util.objId(a),i[o])return i[o];c={},i[o]=c;for(var h in a)a.hasOwnProperty(h)&&(c[h]=r(a[h],i));return c;case"Array":return o=u.util.objId(a),i[o]?i[o]:(c=[],i[o]=c,a.forEach(function(w,p){c[p]=r(w,i)}),c);default:return a}},getLanguage:function(r){for(;r;){var a=l.exec(r.className);if(a)return a[1].toLowerCase();r=r.parentElement}return"none"},setLanguage:function(r,a){r.className=r.className.replace(RegExp(l,"gi"),""),r.classList.add("language-"+a)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(c){var r=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(c.stack)||[])[1];if(r){var a=document.getElementsByTagName("script");for(var i in a)if(a[i].src==r)return a[i]}return null}},isActive:function(r,a,i){for(var c="no-"+a;r;){var o=r.classList;if(o.contains(a))return!0;if(o.contains(c))return!1;r=r.parentElement}return!!i}},languages:{plain:g,plaintext:g,text:g,txt:g,extend:function(r,a){var i=u.util.clone(u.languages[r]);for(var c in a)i[c]=a[c];return i},insertBefore:function(r,a,i,c){c=c||u.languages;var o=c[r],h={};for(var w in o)if(o.hasOwnProperty(w)){if(w==a)for(var p in i)i.hasOwnProperty(p)&&(h[p]=i[p]);i.hasOwnProperty(w)||(h[w]=o[w])}var T=c[r];return c[r]=h,u.languages.DFS(u.languages,function(I,U){U===T&&I!=r&&(this[I]=h)}),h},DFS:function r(a,i,c,o){o=o||{};var h=u.util.objId;for(var w in a)if(a.hasOwnProperty(w)){i.call(a,w,a[w],c||w);var p=a[w],T=u.util.type(p);T==="Object"&&!o[h(p)]?(o[h(p)]=!0,r(p,i,null,o)):T==="Array"&&!o[h(p)]&&(o[h(p)]=!0,r(p,i,w,o))}}},plugins:{},highlightAll:function(r,a){u.highlightAllUnder(document,r,a)},highlightAllUnder:function(r,a,i){var c={callback:i,container:r,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};u.hooks.run("before-highlightall",c),c.elements=Array.prototype.slice.apply(c.container.querySelectorAll(c.selector)),u.hooks.run("before-all-elements-highlight",c);for(var o=0,h;h=c.elements[o++];)u.highlightElement(h,a===!0,c.callback)},highlightElement:function(r,a,i){var c=u.util.getLanguage(r),o=u.languages[c];u.util.setLanguage(r,c);var h=r.parentElement;h&&h.nodeName.toLowerCase()==="pre"&&u.util.setLanguage(h,c);var w=r.textContent,p={element:r,language:c,grammar:o,code:w};function T(U){p.highlightedCode=U,u.hooks.run("before-insert",p),p.element.innerHTML=p.highlightedCode,u.hooks.run("after-highlight",p),u.hooks.run("complete",p),i&&i.call(p.element)}if(u.hooks.run("before-sanity-check",p),h=p.element.parentElement,h&&h.nodeName.toLowerCase()==="pre"&&!h.hasAttribute("tabindex")&&h.setAttribute("tabindex","0"),!p.code){u.hooks.run("complete",p),i&&i.call(p.element);return}if(u.hooks.run("before-highlight",p),!p.grammar){T(u.util.encode(p.code));return}if(a&&s.Worker){var I=new Worker(u.filename);I.onmessage=function(U){T(U.data)},I.postMessage(JSON.stringify({language:p.language,code:p.code,immediateClose:!0}))}else T(u.highlight(p.code,p.grammar,p.language))},highlight:function(r,a,i){var c={code:r,grammar:a,language:i};if(u.hooks.run("before-tokenize",c),!c.grammar)throw new Error('The language "'+c.language+'" has no grammar.');return c.tokens=u.tokenize(c.code,c.grammar),u.hooks.run("after-tokenize",c),v.stringify(u.util.encode(c.tokens),c.language)},tokenize:function(r,a){var i=a.rest;if(i){for(var c in i)a[c]=i[c];delete a.rest}var o=new f;return _(o,o.head,r),S(r,o,a,o.head,0),x(o)},hooks:{all:{},add:function(r,a){var i=u.hooks.all;i[r]=i[r]||[],i[r].push(a)},run:function(r,a){var i=u.hooks.all[r];if(!(!i||!i.length))for(var c=0,o;o=i[c++];)o(a)}},Token:v};s.Prism=u;function v(r,a,i,c){this.type=r,this.content=a,this.alias=i,this.length=(c||"").length|0}v.stringify=function r(a,i){if(typeof a=="string")return a;if(Array.isArray(a)){var c="";return a.forEach(function(T){c+=r(T,i)}),c}var o={type:a.type,content:r(a.content,i),tag:"span",classes:["token",a.type],attributes:{},language:i},h=a.alias;h&&(Array.isArray(h)?Array.prototype.push.apply(o.classes,h):o.classes.push(h)),u.hooks.run("wrap",o);var w="";for(var p in o.attributes)w+=" "+p+'="'+(o.attributes[p]||"").replace(/"/g,"&quot;")+'"';return"<"+o.tag+' class="'+o.classes.join(" ")+'"'+w+">"+o.content+"</"+o.tag+">"};function F(r,a,i,c){r.lastIndex=a;var o=r.exec(i);if(o&&c&&o[1]){var h=o[1].length;o.index+=h,o[0]=o[0].slice(h)}return o}function S(r,a,i,c,o,h){for(var w in i)if(!(!i.hasOwnProperty(w)||!i[w])){var p=i[w];p=Array.isArray(p)?p:[p];for(var T=0;T<p.length;++T){if(h&&h.cause==w+","+T)return;var I=p[T],U=I.inside,se=!!I.lookbehind,re=!!I.greedy,Se=I.alias;if(re&&!I.pattern.global){var Te=I.pattern.toString().match(/[imsuy]*$/)[0];I.pattern=RegExp(I.pattern.source,Te+"g")}for(var ie=I.pattern||I,O=c.next,q=o;O!==a.tail&&!(h&&q>=h.reach);q+=O.value.length,O=O.next){var K=O.value;if(a.length>r.length)return;if(!(K instanceof v)){var Ce=1,N;if(re){if(N=F(ie,q,r,se),!N||N.index>=r.length)break;var Pe=N.index,Ft=N.index+N[0].length,X=q;for(X+=O.value.length;Pe>=X;)O=O.next,X+=O.value.length;if(X-=O.value.length,q=X,O.value instanceof v)continue;for(var le=O;le!==a.tail&&(X<Ft||typeof le.value=="string");le=le.next)Ce++,X+=le.value.length;Ce--,K=r.slice(q,X),N.index-=q}else if(N=F(ie,0,K,se),!N)continue;var Pe=N.index,Ie=N[0],ze=K.slice(0,Pe),et=K.slice(Pe+Ie.length),Ue=q+K.length;h&&Ue>h.reach&&(h.reach=Ue);var Re=O.prev;ze&&(Re=_(a,Re,ze),q+=ze.length),m(a,Re,Ce);var kt=new v(w,U?u.tokenize(Ie,U):Ie,Se,Ie);if(O=_(a,Re,kt),et&&_(a,O,et),Ce>1){var qe={cause:w+","+T,reach:Ue};S(r,a,i,O.prev,q,qe),h&&qe.reach>h.reach&&(h.reach=qe.reach)}}}}}}function f(){var r={value:null,prev:null,next:null},a={value:null,prev:r,next:null};r.next=a,this.head=r,this.tail=a,this.length=0}function _(r,a,i){var c=a.next,o={value:i,prev:a,next:c};return a.next=o,c.prev=o,r.length++,o}function m(r,a,i){for(var c=a.next,o=0;o<i&&c!==r.tail;o++)c=c.next;a.next=c,c.prev=a,r.length-=o}function x(r){for(var a=[],i=r.head.next;i!==r.tail;)a.push(i.value),i=i.next;return a}if(!s.document)return s.addEventListener&&(u.disableWorkerMessageHandler||s.addEventListener("message",function(r){var a=JSON.parse(r.data),i=a.language,c=a.code,o=a.immediateClose;s.postMessage(u.highlight(c,u.languages[i],i)),o&&s.close()},!1)),u;var y=u.util.currentScript();y&&(u.filename=y.src,y.hasAttribute("data-manual")&&(u.manual=!0));function b(){u.manual||u.highlightAll()}if(!u.manual){var k=document.readyState;k==="loading"||k==="interactive"&&y&&y.defer?document.addEventListener("DOMContentLoaded",b):window.requestAnimationFrame?window.requestAnimationFrame(b):window.setTimeout(b,16)}return u}(e);n.exports&&(n.exports=t),typeof ut<"u"&&(ut.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(s){s.type==="entity"&&(s.attributes.title=s.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(l,d){var g={};g["language-"+d]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[d]},g.cdata=/^<!\[CDATA\[|\]\]>$/i;var u={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:g}};u["language-"+d]={pattern:/[\s\S]+/,inside:t.languages[d]};var v={};v[l]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return l}),"i"),lookbehind:!0,greedy:!0,inside:u},t.languages.insertBefore("markup","cdata",v)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(s,l){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+s+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[l,"language-"+l],inside:t.languages[l]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,function(s){var l=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;s.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+l.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+l.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+l.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+l.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:l,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},s.languages.css.atrule.inside.rest=s.languages.css;var d=s.languages.markup;d&&(d.tag.addInlined("style","css"),d.tag.addAttribute("style","css"))}(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var s="Loading…",l=function(y,b){return"✖ Error "+y+" while fetching file: "+b},d="✖ Error: File does not exist or is empty",g={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},u="data-src-status",v="loading",F="loaded",S="failed",f="pre[data-src]:not(["+u+'="'+F+'"]):not(['+u+'="'+v+'"])';function _(y,b,k){var r=new XMLHttpRequest;r.open("GET",y,!0),r.onreadystatechange=function(){r.readyState==4&&(r.status<400&&r.responseText?b(r.responseText):r.status>=400?k(l(r.status,r.statusText)):k(d))},r.send(null)}function m(y){var b=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(y||"");if(b){var k=Number(b[1]),r=b[2],a=b[3];return r?a?[k,Number(a)]:[k,void 0]:[k,k]}}t.hooks.add("before-highlightall",function(y){y.selector+=", "+f}),t.hooks.add("before-sanity-check",function(y){var b=y.element;if(b.matches(f)){y.code="",b.setAttribute(u,v);var k=b.appendChild(document.createElement("CODE"));k.textContent=s;var r=b.getAttribute("data-src"),a=y.language;if(a==="none"){var i=(/\.(\w+)$/.exec(r)||[,"none"])[1];a=g[i]||i}t.util.setLanguage(k,a),t.util.setLanguage(b,a);var c=t.plugins.autoloader;c&&c.loadLanguages(a),_(r,function(o){b.setAttribute(u,F);var h=m(b.getAttribute("data-range"));if(h){var w=o.split(/\r\n?|\n/g),p=h[0],T=h[1]==null?w.length:h[1];p<0&&(p+=w.length),p=Math.max(0,Math.min(p-1,w.length)),T<0&&(T+=w.length),T=Math.max(0,Math.min(T,w.length)),o=w.slice(p,T).join(`
`),b.hasAttribute("data-start")||b.setAttribute("data-start",String(p+1))}k.textContent=o,t.highlightElement(k)},function(o){b.setAttribute(u,S),k.textContent=o})}}),t.plugins.fileHighlight={highlight:function(b){for(var k=(b||document).querySelectorAll(f),r=0,a;a=k[r++];)t.highlightElement(a)}};var x=!1;t.fileHighlight=function(){x||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),x=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(yt);var cn=yt.exports;const Kn=on(cn),ot="(if|else if|await|then|catch|each|html|debug)";Prism.languages.svelte=Prism.languages.extend("markup",{each:{pattern:new RegExp("{[#/]each(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}"),inside:{"language-javascript":[{pattern:/(as[\s\S]*)\([\s\S]*\)(?=\s*\})/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(as[\s]*)[\s\S]*(?=\s*)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(#each[\s]*)[\s\S]*(?=as)/,lookbehind:!0,inside:Prism.languages.javascript}],keyword:/[#/]each|as/,punctuation:/{|}/}},block:{pattern:new RegExp("{[#:/@]/s"+ot+"(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}"),inside:{punctuation:/^{|}$/,keyword:[new RegExp("[#:/@]"+ot+"( )*"),/as/,/then/],"language-javascript":{pattern:/[\s\S]*/,inside:Prism.languages.javascript}}},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?:"[^"]*"|'[^']*'|{[\s\S]+?}(?=[\s/>])))|(?=[\s/>])))+)?\s*\/?>/i,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"language-javascript":{pattern:/\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,inside:Prism.languages.javascript},"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,inside:{punctuation:[/^=/,{pattern:/^(\s*)["']|["']$/,lookbehind:!0}],"language-javascript":{pattern:/{[\s\S]+}/,inside:Prism.languages.javascript}}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},"language-javascript":{pattern:/\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,lookbehind:!0,inside:Prism.languages.javascript}});Prism.languages.svelte.tag.inside["attr-value"].inside.entity=Prism.languages.svelte.entity;Prism.hooks.add("wrap",n=>{n.type==="entity"&&(n.attributes.title=n.content.replace(/&amp;/,"&"))});Object.defineProperty(Prism.languages.svelte.tag,"addInlined",{value:function(e,t){const s={};s["language-"+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[t]},s.cdata=/^<!\[CDATA\[|\]\]>$/i;const l={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:s}};l["language-"+t]={pattern:/[\s\S]+/,inside:Prism.languages[t]};const d={};d[e]={pattern:RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g,e),"i"),lookbehind:!0,greedy:!0,inside:l},Prism.languages.insertBefore("svelte","cdata",d)}});Prism.languages.svelte.tag.addInlined("style","css");Prism.languages.svelte.tag.addInlined("script","javascript");function He(n){const e=Symbol(),t=()=>{const s=$t(e);return s===void 0?n==null?void 0:n():s};return{get:s=>{const l=t();if(l===void 0)throw Error(s??"context value is not set");return l},maybe_get:t,set:(s=n==null?void 0:n())=>Jt(e,s)}}const Qn=n=>{var t;if(!n)return!1;const{tagName:e}=n;if(e==="INPUT"){const{type:s}=n;return s==="text"||s==="number"||s==="password"||s==="email"||s==="search"||s==="url"}return e==="TEXTAREA"||!!((t=n.getAttribute)!=null&&t.call(n,"contenteditable"))&&n.getAttribute("contenteditable")!=="false"},ea=n=>{const e=n.closest("[contenteditable]");return e!==null&&e.getAttribute("contenteditable")!=="false"},dn=(n,e=!0,t=!0)=>(t&&n.preventDefault(),e?n.stopImmediatePropagation():n.stopPropagation(),n),ta=(n=0)=>new Promise(e=>setTimeout(e,n)),gn=n=>n&&typeof n.then=="function";var ce,de;class bt{constructor(){D(this,ce,M(0));D(this,de,M(0))}get width(){return E(A(this,ce))}set width(e){R(A(this,ce),C(e))}get height(){return E(A(this,de))}set height(e){R(A(this,de),C(e))}}ce=new WeakMap,de=new WeakMap;var ge,fe,he,pe,ve;class fn{constructor(e,t){j(this,"is_menu",!1);j(this,"menu");D(this,ge,M(!1));D(this,fe,M());D(this,he,M(!1));D(this,pe,M(null));D(this,ve,M(null));this.menu=e,this.run=t}get selected(){return E(A(this,ge))}set selected(e){R(A(this,ge),C(e))}get run(){return E(A(this,fe))}set run(e){R(A(this,fe),C(e))}get pending(){return E(A(this,he))}set pending(e){R(A(this,he),C(e))}get error_message(){return E(A(this,pe))}set error_message(e){R(A(this,pe),C(e))}get promise(){return E(A(this,ve))}set promise(e){R(A(this,ve),C(e))}}ge=new WeakMap,fe=new WeakMap,he=new WeakMap,pe=new WeakMap,ve=new WeakMap;var me,_e;class hn{constructor(e,t){j(this,"is_menu",!0);j(this,"menu");j(this,"depth");D(this,me,M(!1));D(this,_e,M(C([])));this.menu=e,this.depth=t}get selected(){return E(A(this,me))}set selected(e){R(A(this,me),C(e))}get items(){return E(A(this,_e))}set items(e){R(A(this,_e),C(e))}}me=new WeakMap,_e=new WeakMap;var ye;class pn{constructor(){j(this,"is_menu",!0);j(this,"menu",null);j(this,"depth",1);D(this,ye,M(C([])))}get items(){return E(A(this,ye))}set items(e){R(A(this,ye),C(e))}}ye=new WeakMap;var be,xe,we,Ae,Fe,ke,Ee;class na{constructor(e){j(this,"layout");j(this,"initial_layout");D(this,be,M(!1));D(this,xe,M(0));D(this,we,M(0));D(this,Ae,M(C([])));D(this,Fe,M());D(this,ke,M(C(new pn)));D(this,Ee,M(C([])));this.initial_layout=e==null?void 0:e.layout,this.layout=this.initial_layout??new bt}get opened(){return E(A(this,be))}set opened(e){R(A(this,be),C(e))}get x(){return E(A(this,xe))}set x(e){R(A(this,xe),C(e))}get y(){return E(A(this,we))}set y(e){R(A(this,we),C(e))}get params(){return E(A(this,Ae))}set params(e){R(A(this,Ae),C(e))}get error(){return E(A(this,Fe))}set error(e){R(A(this,Fe),C(e))}get root_menu(){return E(A(this,ke))}set root_menu(e){R(A(this,ke),C(e))}get selections(){return E(A(this,Ee))}set selections(e){R(A(this,Ee),C(e))}open(e,t,s){this.selections.length=0,this.opened=!0,this.x=t,this.y=s,this.params=e}close(){this.opened&&(this.reset_items(this.root_menu.items),this.opened=!1)}reset_items(e){for(const t of e)t.is_menu?this.reset_items(t.items):(t.promise!==null&&(t.promise=null),t.error_message!==null&&(t.error_message=null))}activate(e){if(e.is_menu)this.expand_selected();else{let t;try{t=e.run()}catch(s){const l=typeof(s==null?void 0:s.message)=="string"?s.message:void 0;e.error_message=l??"unknown error",this.error=l}if(gn(t)){e.pending=!0,e.error_message=null;const s=e.promise=t.then(l=>{if(s===e.promise){if(typeof(l==null?void 0:l.ok)=="boolean")if(l.ok)this.close();else{const d=typeof l.message=="string"?l.message:void 0;e.error_message=d??"unknown error",this.error=d}else this.close();return l}},l=>{if(s!==e.promise)return;const d=typeof(l==null?void 0:l.message)=="string"?l.message:void 0;e.error_message=d??"unknown error",this.error=d}).finally(()=>{s===e.promise&&(e.pending=!1,e.promise=null)});return e.promise}this.close()}return!0}activate_selected(){const e=this.selections.at(-1);if(e)return this.activate(e);this.select_first()}select(e){if(this.selections.at(-1)===e)return;for(const s of this.selections)s.selected=!1;this.selections.length=0;let t=e;do t.selected=!0,this.selections.unshift(t);while((t=t.menu)&&t.menu)}collapse_selected(){if(this.selections.length<=1)return;const e=this.selections.pop();e.selected=!1}expand_selected(){const e=this.selections.at(-1);if(!(e!=null&&e.is_menu))return;const t=e.items[0];t.selected=!0,this.selections.push(t)}select_next(){if(!this.selections.length){this.select_first();return}const e=this.selections.at(-1),t=e.menu.items.indexOf(e);this.select(e.menu.items[t===e.menu.items.length-1?0:t+1])}select_previous(){if(!this.selections.length){this.select_last();return}const e=this.selections.at(-1),t=e.menu.items.indexOf(e);this.select(e.menu.items[t===0?e.menu.items.length-1:t-1])}select_first(){var e;this.select((((e=this.selections.at(-1))==null?void 0:e.menu)??this.root_menu).items[0])}select_last(){var t;const{items:e}=((t=this.selections.at(-1))==null?void 0:t.menu)??this.root_menu;this.select(e.at(-1))}add_entry(e){const t=Ze.maybe_get()??this.root_menu,s=new fn(t,e);return t.items.push(s),it(()=>{t.items.length=0}),s}add_submenu(){const e=Ze.maybe_get()??this.root_menu,t=new hn(e,e.depth+1);return e.items.push(t),Ze.set(t),it(()=>{e.items.length=0}),t}}be=new WeakMap,xe=new WeakMap,we=new WeakMap,Ae=new WeakMap,Fe=new WeakMap,ke=new WeakMap,Ee=new WeakMap;const Qe="contextmenu",vn=`a,[data-${Qe}]`,Oe=new Map;let mn=0;const xt=(n,e)=>{if(e==null)return;const t=(mn+=1)-1+"";return n.dataset[Qe]=t,Oe.set(t,e),{update:s=>{Oe.set(t,s)},destroy:()=>{Oe.delete(t)}}},_n=17,aa=(n,e,t,s)=>{const l=yn(n);return l!=null&&l.length?(s.open(l,e,t),navigator.vibrate&&navigator.vibrate(_n),!0):!1},yn=n=>{var d;let e=null,t=n,s,l;for(;t=t==null?void 0:t.closest(vn);){if(s=t.dataset[Qe]){if(e??(e=[]),l=Oe.get(s),l===void 0)continue;Array.isArray(l)?(e??(e=[])).push(...l):(e??(e=[])).push(l)}t.tagName==="A"&&(e??(e=[])).push({snippet:"link",props:{href:t.href}}),t=t.parentElement}if(e){const g=(d=window.getSelection())==null?void 0:d.toString();g&&e.unshift({snippet:"text",props:{content:"Copy text",icon:"📋",run:()=>void navigator.clipboard.writeText(g)}})}return e},bn=He(),Ze=He(),sa=He(()=>new bt);var xn=ae('<div><span class="svelte-cfxv0r"><!></span><span class="svelte-cfxv0r"><!></span><span class="svelte-cfxv0r"><!></span></div>');function wn(n,e){te(e,!0);const t=je(e,"running",3,!0);var s=xn();let l;var d=H(s);Ye(d,"animation-delay","0s");var g=H(d);Y(g,()=>e.children,f=>{var _=Z(),m=G(_);J(m,()=>e.children,()=>0),P(f,_)},f=>{var _=Q("•");P(f,_)}),z(d);var u=ee(d);Ye(u,"animation-delay","0.09s");var v=H(u);Y(v,()=>e.children,f=>{var _=Z(),m=G(_);J(m,()=>e.children,()=>1),P(f,_)},f=>{var _=Q("•");P(f,_)}),z(u);var F=ee(u);Ye(F,"animation-delay","0.3s");var S=H(F);Y(S,()=>e.children,f=>{var _=Z(),m=G(_);J(m,()=>e.children,()=>2),P(f,_)},f=>{var _=Q("•");P(f,_)}),z(F),z(s),$(()=>{l=vt(s,l,{...e.attrs},"svelte-cfxv0r"),oe(s,"pending_animation",!0),oe(s,"running",t())}),P(n,s),ne()}var An=ae('<li class="menu_item plain selectable deselectable svelte-10kraez" role="menuitem" aria-label="contextmenu entry" tabindex="-1"><div class="content"><div class="icon"><!></div> <div class="title"><!></div> <!></div></li>');function Fn(n,e){te(e,!0);const t=bn.get(),s=t.add_entry(e.run);Kt(()=>{s.run=e.run});const l=B(()=>s.selected),d=B(()=>s.pending),g=B(()=>s.error_message);var u=An();u.__click=()=>{setTimeout(()=>t.activate(s))};var v=H(u),F=H(v),S=H(F);Y(S,()=>typeof e.icon=="string",x=>{var y=Q();$(()=>Ne(y,e.icon)),P(x,y)},x=>{var y=Z(),b=G(y);Y(b,()=>e.icon,k=>{var r=Z(),a=G(r);J(a,()=>e.icon),P(k,r)},null,!0),P(x,y)}),z(F);var f=ee(F,2),_=H(f);J(_,()=>e.children),z(f);var m=ee(f,2);Y(m,()=>E(d),x=>{wn(x,{})},x=>{var y=Z(),b=G(y);Y(b,()=>E(g),k=>{var r=Q("⚠️");P(k,r)},null,!0),P(x,y)}),z(v),z(u),$(()=>{nn(u,"title",E(g)?`Error: ${E(g)}`:void 0),oe(u,"selected",E(l))}),tn("mouseenter",u,x=>{dn(x),t.select(s)}),P(n,u),ne()}Ke(["click"]);const kn=n=>{const e=n.split("/").filter(Boolean);if(!e.length)return!1;for(const t of e)if(!Pn.test(t))return!1;return!0},En=n=>{if(n[0]!=="/"||n[1]!=="/")return!1;const e=n[2];return!!e&&e!=="/"},Sn=n=>!0,Tn=n=>n[0]==="/"&&n[1]!=="/",Cn=kn,Pn=/^[a-z\d_]+$/iu;var In=ae("<a><!></a>");function Rn(n,e){te(e,!0);const t=je(e,"attrs",19,()=>{}),s=B(()=>En(e.href)),l=B(()=>Tn(e.href)),d=B(()=>E(s)?Sn(e.href):E(l)?Cn(e.href):!0),g=B(()=>E(s)?"https:"+e.href:E(l)?an+e.href:e.href),u=B(()=>!(E(l)||e.href[0]===".")),v=B(()=>E(u)?"external noreferrer nofollow":void 0),F=B(()=>E(u)?"_blank":void 0);var S=Z(),f=G(S);Y(f,()=>E(d),_=>{var m=In();let x;var y=H(m);J(y,()=>e.children),z(m),$(()=>x=vt(m,x,{...t(),href:E(g),rel:E(v),target:E(F)})),P(_,m)},_=>{var m=Z(),x=G(m);J(x,()=>e.children),P(_,m)}),P(n,S),ne()}const ct={fox:"🦊",dog:"🐶"},dt={fox:"hail",dog:"hello"},wt=n=>{const e=n in dt?dt[n]:"hi",t=n in ct?ct[n]:"@";return{snippet:"text",props:{content:"Greet @"+n,icon:t,run:()=>{alert(`${t}${n} says ${e} back to you!`)}}}},At=n=>{alert('you selected the hashtag "'+n+'", I wonder what that could do')},Dn=(n,e)=>{wt(e.name).props.run()};var Mn=ae('<span class="mention svelte-583bh5" role="button" tabindex="0"> </span>');function On(n,e){te(e,!0);const t=je(e,"inline",3,!0);var s=Mn();s.__keydown=void 0,s.__click=[Dn,e];var l=H(s);z(s),$(()=>{oe(s,"inline",t()),Ne(l,`@${e.name??""}`)}),_t(s,(d,g)=>xt(d,g),()=>wt(e.name)),P(n,s),ne()}Ke(["keydown","click"]);var Ln=ae("Do something with <!> ",1);function Nn(n,e){te(e,!0),Fn(n,{run:()=>{At(e.name)},children:(t,s)=>{Qt();var l=Ln(),d=ee(G(l));Y(d,()=>e.icon,u=>{var v=Z(),F=G(v);J(F,()=>e.icon),P(u,v)},u=>{var v=Q("#");P(u,v)});var g=ee(d,1,!0);$(()=>Ne(g,e.name)),P(t,l)},$$slots:{default:!0}}),ne()}var jn=(n,e)=>{At(e.name)},Hn=ae('<span class="hashtag svelte-1qc5z8a" role="button" tabindex="0"> </span>');function zn(n,e){te(e,!0);const t=g=>{Nn(g,{get name(){return e.name}})},s=je(e,"inline",3,!0);var l=Hn();l.__keydown=void 0,l.__click=[jn,e];var d=H(l);z(l),$(()=>{oe(l,"inline",s()),Ne(d,`#${e.name??""}`)}),_t(l,(g,u)=>xt(g,u),()=>t),P(n,l),ne()}Ke(["keydown","click"]);const ra={Link:Rn,Mention:On,Hashtag:zn},ia=He();export{Fn as C,zn as H,On as M,Kn as P,J as a,ia as b,Me as c,$n as d,Vn as e,wn as f,He as g,Jn as h,Wn as i,Ye as j,dn as k,Qn as l,bn as m,na as n,sa as o,_t as p,ea as q,aa as r,Xn as s,oe as t,ra as u,xt as v,ta as w};