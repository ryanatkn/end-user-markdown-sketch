import{h as v,l as b,m as q,q as w,n as A,o as B,L as M}from"./runtime.C4ucKE3S.js";import{i as z,d as L,e as C,n as D,f as G}from"./disclose-version.CC55ZLZ5.js";function K(s,i){if(i){const r=document.body;s.autofocus=!0,w(()=>{document.activeElement===r&&s.focus()})}}function F(s){v&&b(s)!==null&&q(s)}let $=!1;function H(){$||($=!0,document.addEventListener("reset",s=>{Promise.resolve().then(()=>{var i;if(!s.defaultPrevented)for(const r of s.target.elements)(i=r.__on_r)==null||i.call(r)})},{capture:!0}))}function R(s,i,r,a){var _=s.__attributes??(s.__attributes={});v&&(_[i]=s.getAttribute(i),i==="src"||i==="srcset"||i==="href"&&s.nodeName==="LINK")||_[i]!==(_[i]=r)&&(i==="style"&&"__styles"in s&&(s.__styles={}),i==="loading"&&(s[M]=r),r==null?s.removeAttribute(i):typeof r!="string"&&E(s).includes(i)?s[i]=r:s.setAttribute(i,r))}function J(s,i,r,a,_=!1,e=!1,S=!1){var f=i||{},O=s.tagName==="OPTION";for(var d in i)d in r||(r[d]=null);a!==void 0&&(r.class=r.class?r.class+" "+a:a);var T=E(s),I=s.__attributes??(s.__attributes={}),p=[];for(const t in r){let o=r[t];if(O&&t==="value"&&o==null){s.value=s.__value="",f[t]=o;continue}var y=f[t];if(o!==y){f[t]=o;var g=t[0]+t[1];if(g!=="$$"){if(g==="on"){const c={},l="$$"+t;let u=t.slice(2);var h=G(u);if(z(u)&&(u=u.slice(0,-7),c.capture=!0),!h&&y){if(o!=null)continue;s.removeEventListener(u,f[l],c),f[l]=null}if(o!=null)if(h)s[`__${u}`]=o,C([u]);else{let N=function(P){f[t].call(this,P)};i?f[l]=L(u,s,N,c):p.push([t,o,()=>f[l]=L(u,s,N,c)])}}else if(t==="style"&&o!=null)s.style.cssText=o+"";else if(t==="autofocus")K(s,!!o);else if(t==="__value"||t==="value"&&o!=null)s.value=s[t]=s.__value=o;else{var n=t;_||(n=D(n)),o==null&&!e?(I[t]=null,s.removeAttribute(t)):T.includes(n)&&(e||typeof o!="string")?s[n]=o:typeof o!="function"&&(v&&(n==="src"||n==="href"||n==="srcset")||R(s,n,o))}t==="style"&&"__styles"in s&&(s.__styles={})}}}return i||w(()=>{if(s.isConnected)for(const[t,o,c]of p)f[t]===o&&c()}),f}var k=new Map;function E(s){var i=k.get(s.nodeName);if(i)return i;k.set(s.nodeName,i=[]);for(var r,a=A(s),_=Element.prototype;_!==a;){r=B(a);for(var e in r)r[e].set&&i.push(e);a=A(a)}return i}export{H as a,J as b,F as r,R as s};
