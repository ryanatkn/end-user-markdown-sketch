var yn=Array.isArray,wn=Array.from,mn=Object.defineProperty,rt=Object.getOwnPropertyDescriptor,Ht=Object.getOwnPropertyDescriptors,Tn=Object.prototype,An=Array.prototype,Yt=Object.getPrototypeOf;function gn(t){return typeof t=="function"}const xn=()=>{};function Sn(t){return typeof(t==null?void 0:t.then)=="function"}function jt(t){for(var n=0;n<t.length;n++)t[n]()}const w=2,ut=4,k=8,lt=16,g=32,K=64,D=128,B=256,v=512,A=1024,q=2048,N=4096,L=8192,Bt=16384,it=32768,Dn=65536,Ut=1<<18,ft=1<<19,et=Symbol("$state"),In=Symbol("");function _t(t){return t===this.v}function Vt(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function ct(t){return!Vt(t,this.v)}function Gt(t){throw new Error("effect_in_teardown")}function $t(){throw new Error("effect_in_unowned_derived")}function Kt(t){throw new Error("effect_orphan")}function Zt(){throw new Error("effect_update_depth_exceeded")}function Rn(){throw new Error("hydration_failed")}function On(t){throw new Error("props_invalid_value")}function Cn(){throw new Error("state_descriptors_fixed")}function Nn(){throw new Error("state_prototype_fixed")}function zt(){throw new Error("state_unsafe_local_read")}function Wt(){throw new Error("state_unsafe_mutation")}function tt(t){return{f:0,v:t,reactions:null,equals:_t,version:0}}function kn(t){return Xt(tt(t))}function Pn(t,n=!1){var e;const r=tt(t);return n||(r.equals=ct),i!==null&&i.l!==null&&((e=i.l).s??(e.s=[])).push(r),r}function Xt(t){return l!==null&&l.f&w&&(d===null?fn([t]):d.push(t)),t}function Fn(t,n){return l!==null&&J()&&l.f&w&&(d===null||!d.includes(t))&&Wt(),t.equals(n)||(t.v=n,t.version=Nt(),pt(t,A),J()&&u!==null&&u.f&v&&!(u.f&g)&&(p!==null&&p.includes(t)?(y(u,A),z(u)):T===null?_n([t]):T.push(t))),n}function pt(t,n){var r=t.reactions;if(r!==null)for(var e=J(),s=r.length,o=0;o<s;o++){var a=r[o],f=a.f;f&A||!e&&a===u||(y(a,n),f&(v|D)&&(f&w?pt(a,q):z(a)))}}const Mn=1,bn=2,qn=4,Ln=8,Hn=16,Yn=1,jn=2,Bn=4,Un=8,Vn=16,Gn=1,$n=2,Jt="[",Qt="[!",tn="]",vt={},Kn=Symbol(),Zn="http://www.w3.org/2000/svg";function ht(t){console.warn("hydration_mismatch")}let S=!1;function zn(t){S=t}let E;function U(t){if(t===null)throw ht(),vt;return E=t}function Wn(){return U(I(E))}function Xn(t){if(S){if(I(E)!==null)throw ht(),vt;E=t}}function Jn(t=1){if(S){for(var n=t,r=E;n--;)r=I(r);E=r}}function Qn(){for(var t=0,n=E;;){if(n.nodeType===8){var r=n.data;if(r===tn){if(t===0)return n;t-=1}else(r===Jt||r===Qt)&&(t+=1)}var e=I(n);n.remove(),n=e}}var st,nn,Et,dt;function tr(){if(st===void 0){st=window,nn=document;var t=Element.prototype,n=Node.prototype;Et=rt(n,"firstChild").get,dt=rt(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__e=void 0,Text.prototype.__t=void 0}}function yt(t=""){return document.createTextNode(t)}function W(t){return Et.call(t)}function I(t){return dt.call(t)}function nr(t){if(!S)return W(t);var n=W(E);return n===null&&(n=E.appendChild(yt())),U(n),n}function rr(t,n){if(!S){var r=W(t);return r instanceof Comment&&r.data===""?I(r):r}return E}function er(t,n=1,r=!1){let e=S?E:t;for(;n--;)e=I(e);if(!S)return e;var s=e.nodeType;if(r&&s!==3){var o=yt();return e==null||e.before(o),U(o),o}return U(e),e}function sr(t){t.textContent=""}function wt(t){u===null&&l===null&&Kt(),l!==null&&l.f&D&&$t(),nt&&Gt()}function rn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function P(t,n,r,e=!0){var s=(t&K)!==0,o=u,a={ctx:i,deps:null,nodes_start:null,nodes_end:null,f:t|A,first:null,fn:n,last:null,next:null,parent:s?null:o,prev:null,teardown:null,transitions:null,version:0};if(r){var f=O;try{ot(!0),Z(a),a.f|=Bt}catch(m){throw H(a),m}finally{ot(f)}}else n!==null&&z(a);var _=r&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&ft)===0;if(!_&&!s&&e&&(o!==null&&rn(a,o),l!==null&&l.f&w)){var c=l;(c.children??(c.children=[])).push(a)}return a}function or(t){const n=P(k,null,!1);return y(n,v),n.teardown=t,n}function ar(t){wt();var n=u!==null&&(u.f&k)!==0&&i!==null&&!i.m;if(n){var r=i;(r.e??(r.e=[])).push({fn:t,effect:u,reaction:l})}else{var e=mt(t);return e}}function ur(t){return wt(),Tt(t)}function lr(t){const n=P(K,t,!0);return()=>{H(n)}}function mt(t){return P(ut,t,!1)}function Tt(t){return P(k,t,!0)}function ir(t){return Tt(t)}function fr(t,n=0){return P(k|lt|n,t,!0)}function _r(t,n=!0){return P(k|g,t,!0,n)}function At(t){var n=t.teardown;if(n!==null){const r=nt,e=l;at(!0),G(null);try{n.call(null)}finally{at(r),G(e)}}}function H(t,n=!0){var r=!1;if((n||t.f&Ut)&&t.nodes_start!==null){for(var e=t.nodes_start,s=t.nodes_end;e!==null;){var o=e===s?null:I(e);e.remove(),e=o}r=!0}Pt(t,n&&!r),b(t,0),y(t,L);var a=t.transitions;if(a!==null)for(const _ of a)_.stop();At(t);var f=t.parent;f!==null&&f.first!==null&&gt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.parent=t.fn=t.nodes_start=t.nodes_end=null}function gt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function cr(t,n){var r=[];xt(t,r,!0),en(r,()=>{H(t),n&&n()})}function en(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var s of t)s.out(e)}else n()}function xt(t,n,r){if(!(t.f&N)){if(t.f^=N,t.transitions!==null)for(const a of t.transitions)(a.is_global||r)&&n.push(a);for(var e=t.first;e!==null;){var s=e.next,o=(e.f&it)!==0||(e.f&g)!==0;xt(e,n,o?r:!1),e=s}}}function pr(t){St(t,!0)}function St(t,n){if(t.f&N){t.f^=N,Y(t)&&Z(t);for(var r=t.first;r!==null;){var e=r.next,s=(r.f&it)!==0||(r.f&g)!==0;St(r,s?n:!1),r=e}if(t.transitions!==null)for(const o of t.transitions)(o.is_global||n)&&o.in()}}let V=!1,X=[];function Dt(){V=!1;const t=X.slice();X=[],jt(t)}function vr(t){V||(V=!0,queueMicrotask(Dt)),X.push(t)}function sn(){V&&Dt()}function on(t){let n=w|A;u===null?n|=D:u.f|=ft;const r={children:null,deps:null,equals:_t,f:n,fn:t,reactions:null,v:null,version:0,parent:u};if(l!==null&&l.f&w){var e=l;(e.children??(e.children=[])).push(r)}return r}function hr(t){const n=on(t);return n.equals=ct,n}function It(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&w?an(e):H(e)}}}function Rt(t){var n,r=u;$(t.parent);try{It(t),n=kt(t)}finally{$(r)}var e=(R||t.f&D)&&t.deps!==null?q:v;y(t,e),t.equals(n)||(t.v=n,t.version=Nt())}function an(t){It(t),b(t,0),y(t,L),t.children=t.deps=t.reactions=t.fn=null}function un(t){throw new Error("lifecycle_outside_component")}const Ot=0,ln=1;let j=Ot,M=!1,O=!1,nt=!1;function ot(t){O=t}function at(t){nt=t}let x=[],C=0;let l=null;function G(t){l=t}let u=null;function $(t){u=t}let d=null;function fn(t){d=t}let p=null,h=0,T=null;function _n(t){T=t}let Ct=0,R=!1,i=null;function Er(t){i=t}function Nt(){return++Ct}function J(){return i!==null&&i.l===null}function Y(t){var a,f;var n=t.f;if(n&A)return!0;if(n&q){var r=t.deps,e=(n&D)!==0;if(r!==null){var s;if(n&B){for(s=0;s<r.length;s++)((a=r[s]).reactions??(a.reactions=[])).push(t);t.f^=B}for(s=0;s<r.length;s++){var o=r[s];if(Y(o)&&Rt(o),e&&u!==null&&!R&&!((f=o==null?void 0:o.reactions)!=null&&f.includes(t))&&(o.reactions??(o.reactions=[])).push(t),o.version>t.version)return!0}}e||y(t,v)}return!1}function cn(t,n,r){throw t}function kt(t){var m;var n=p,r=h,e=T,s=l,o=R,a=d;p=null,h=0,T=null,l=t.f&(g|K)?null:t,R=!O&&(t.f&D)!==0,d=null;try{var f=(0,t.fn)(),_=t.deps;if(p!==null){var c;if(b(t,h),_!==null&&h>0)for(_.length=h+p.length,c=0;c<p.length;c++)_[h+c]=p[c];else t.deps=_=p;if(!R)for(c=h;c<_.length;c++)((m=_[c]).reactions??(m.reactions=[])).push(t)}else _!==null&&h<_.length&&(b(t,h),_.length=h);return f}finally{p=n,h=r,T=e,l=s,R=o,d=a}}function pn(t,n){let r=n.reactions;if(r!==null){var e=r.indexOf(t);if(e!==-1){var s=r.length-1;s===0?r=n.reactions=null:(r[e]=r[s],r.pop())}}r===null&&n.f&w&&(p===null||!p.includes(n))&&(y(n,q),n.f&(D|B)||(n.f^=B),b(n,0))}function b(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)pn(t,r[e])}function Pt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;H(r,n),r=e}}function Z(t){var n=t.f;if(!(n&L)){y(t,v);var r=u,e=i;u=t,i=t.ctx;try{n&lt||Pt(t),At(t);var s=kt(t);t.teardown=typeof s=="function"?s:null,t.version=Ct}catch(o){cn(o)}finally{u=r,i=e}}}function Ft(){C>1e3&&(C=0,Zt()),C++}function Mt(t){var n=t.length;if(n!==0){Ft();var r=O;O=!0;try{for(var e=0;e<n;e++){var s=t[e];s.f&v||(s.f^=v);var o=[];bt(s,o),vn(o)}}finally{O=r}}}function vn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];!(e.f&(L|N))&&Y(e)&&(Z(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?gt(e):e.fn=null))}}function hn(){if(M=!1,C>1001)return;const t=x;x=[],Mt(t),M||(C=0)}function z(t){j===Ot&&(M||(M=!0,queueMicrotask(hn)));for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(K|g)){if(!(r&v))return;n.f^=v}}x.push(n)}function bt(t,n){var r=t.first,e=[];t:for(;r!==null;){var s=r.f,o=(s&g)!==0,a=o&&(s&v)!==0;if(!a&&!(s&N))if(s&k){o?r.f^=v:Y(r)&&Z(r);var f=r.first;if(f!==null){r=f;continue}}else s&ut&&e.push(r);var _=r.next;if(_===null){let F=r.parent;for(;F!==null;){if(t===F)break t;var c=F.next;if(c!==null){r=c;continue t}F=F.parent}}r=_}for(var m=0;m<e.length;m++)f=e[m],n.push(f),bt(f,n)}function qt(t){var n=j,r=x;try{Ft();const s=[];j=ln,x=s,M=!1,Mt(r);var e=t==null?void 0:t();return sn(),(x.length>0||s.length>0)&&qt(),C=0,e}finally{j=n,x=r}}async function dr(){await Promise.resolve(),qt()}function yr(t){var n=t.f;if(n&L)return t.v;if(l!==null){d!==null&&d.includes(t)&&zt();var r=l.deps;p===null&&r!==null&&r[h]===t?h++:p===null?p=[t]:p.push(t),T!==null&&u!==null&&u.f&v&&!(u.f&g)&&T.includes(t)&&(y(u,A),z(u))}if(n&w){var e=t;Y(e)&&Rt(e)}return t.v}function wr(t){const n=l;try{return l=null,t()}finally{l=n}}const En=~(A|q|v);function y(t,n){t.f=t.f&En|n}function mr(t){return Lt().get(t)}function Tr(t,n){return Lt().set(t,n),n}function Lt(t){return i===null&&un(),i.c??(i.c=new Map(dn(i)||void 0))}function dn(t){let n=t.p;for(;n!==null;){const r=n.c;if(r!==null)return r;n=n.p}return null}function Ar(t,n=!1,r){i={p:i,c:null,e:null,m:!1,s:t,x:null,l:null},n||(i.l={s:null,u:null,r1:[],r2:tt(!1)})}function gr(t){const n=i;if(n!==null){const a=n.e;if(a!==null){var r=u,e=l;n.e=null;try{for(var s=0;s<a.length;s++){var o=a[s];$(o.effect),G(o.reaction),mt(o.fn)}}finally{$(r),G(e)}}i=n.p,n.m=!0}return{}}function xr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(et in t)Q(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&et in r&&Q(r)}}}function Q(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{Q(t[e],n)}catch{}const r=Yt(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Ht(r);for(let s in e){const o=e[s].get;if(o)try{o.call(t)}catch{}}}}}export{gn as $,Tn as A,An as B,tt as C,Cn as D,rt as E,u as F,Nn as G,yn as H,Qt as I,Qn as J,U as K,In as L,zn as M,pr as N,it as O,On as P,Dn as Q,Bn as R,et as S,ct as T,Kn as U,Yn as V,jn as W,Un as X,on as Y,hr as Z,Vn as _,gr as a,i as a0,un as a1,ar as a2,qt as a3,mn as a4,ur as a5,dr as a6,kn as a7,yt as a8,Ut as a9,Ln as aA,xr as aB,Vt as aC,Tr as aD,mr as aE,st as aF,nn as aG,Jt as aa,I as ab,Gn as ac,$n as ad,tr as ae,vt as af,tn as ag,ht as ah,Rn as ai,wn as aj,lr as ak,J as al,Sn as am,$ as an,G as ao,Er as ap,Zn as aq,H as ar,Jn as as,qn as at,N as au,Mn as av,bn as aw,Hn as ax,xt as ay,en as az,Xn as b,nr as c,Wn as d,mt as e,rr as f,fr as g,S as h,_r as i,E as j,cr as k,W as l,sr as m,Yt as n,Ht as o,Ar as p,vr as q,Tt as r,er as s,ir as t,wr as u,xn as v,or as w,Pn as x,yr as y,Fn as z};
