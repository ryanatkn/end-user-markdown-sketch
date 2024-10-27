var xt=o=>{throw TypeError(o)};var et=(o,e,a)=>e.has(o)||xt("Cannot "+a);var n=(o,e,a)=>(et(o,e,"read from private field"),a?a.call(o):e.get(o)),we=(o,e,a)=>e.has(o)?xt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,a),L=(o,e,a,r)=>(et(o,e,"write to private field"),r?r.call(o,a):e.set(o,a),a),i=(o,e,a)=>(et(o,e,"access private method"),a);var q=(o,e,a,r)=>({set _(l){L(o,e,l,a)},get _(){return n(o,e,r)}});import{l as gs,a as d,t as C,j,k as qe,b as R}from"../chunks/disclose-version.CC55ZLZ5.js";import{h as G,d as it,ar as Ot,g as Nt,as as bs,at as tt,i as We,q as ys,j as Re,x as Tt,a1 as Mt,T as At,ac as jt,au as Ft,G as Ze,k as Ve,a6 as ws,a3 as ks,E as xs,l as Ts,ad as Ms,K as Lt,J as St,C as As,av as rt,aw as js,r as Fs,p as xe,t as B,a as Te,f as F,B as I,c as m,b as u,Y as ae,ax as O,aq as ot,s as h}from"../chunks/runtime.C4ucKE3S.js";import{s as Et,c as Ht,h as Ls,a as lt,t as Ss,P as It,b as Bt,d as Es,M as Hs,H as Is,L as st,e as Pe,i as Ke,f as Cs}from"../chunks/components.CDiLMIAx.js";import{a as qs,b as Xe,r as Ws,s as Os}from"../chunks/attributes.Z213befe.js";import{b as Ns}from"../chunks/paths.DEYfTl85.js";import{p as ct,i as H,s as Bs}from"../chunks/index-client.D1pYJgIW.js";import{c as Ps}from"../chunks/svelte-component.iyn7_phl.js";const nt=0,De=1,at=2;function zs(o,e,a,r,l){G&&it();var c=o,v=Ot(),f=ks,_,p,g,y,w=(v?Tt:Mt)(void 0),b=(v?Tt:Mt)(void 0),A=!1;function T(k,S){A=!0,S&&(At(M),jt(M),Ft(f)),k===nt&&a&&(p?Ze(p):p=We(()=>a(c))),k===De&&r&&(g?Ze(g):g=We(()=>r(c,w))),k===at&&l&&(y?Ze(y):y=We(()=>l(c,b))),k!==nt&&p&&Ve(p,()=>p=null),k!==De&&g&&Ve(g,()=>g=null),k!==at&&y&&Ve(y,()=>y=null),S&&(Ft(null),jt(null),At(null),ws())}var M=Nt(()=>{if(_!==(_=e())){if(bs(_)){var k=_;A=!1,k.then(S=>{k===_&&(tt(w,S),T(De,!0))},S=>{if(k===_)throw tt(b,S),T(at,!0),b.v}),G?a&&(p=We(()=>a(c))):ys(()=>{A||T(nt,!0)})}else tt(w,_),T(De,!1);return()=>_=null}});G&&(c=Re)}function Ct(o,e,a,r,l,c){let v=G;G&&it();var f,_,p=null;G&&Re.nodeType===1&&(p=Re,it());var g=G?Re:o,y,w=Ht;Nt(()=>{const b=e()||null;var A=b==="svg"?rt:null;if(b!==f){var T=Ht;Et(w),y&&(b===null?Ve(y,()=>{y=null,_=null}):b===_?Ze(y):js(y)),b&&b!==_&&(y=We(()=>{if(p=G?p:A?document.createElementNS(A,b):document.createElement(b),gs(p,p),r){var M=G?Ts(p):p.appendChild(Ms());G&&(M===null?Lt(!1):St(M)),r(p,M)}As.nodes_end=p,g.before(p)})),f=b,f&&(_=f),Et(T)}},xs),v&&(Lt(!0),St(g))}function Gs(o,e,a,r=a){o.addEventListener(e,a);const l=o.__on_r;l?o.__on_r=()=>{l(),r()}:o.__on_r=r,qs()}function Us(o,e,a=e){var r=Ot();Gs(o,"input",()=>{var l=qt(o)?Wt(o.value):o.value;a(l),r&&l!==(l=e())&&(o.value=l??"")}),Fs(()=>{var l=e();if(G&&o.defaultValue!==o.value){a(o.value);return}qt(o)&&l===Wt(o.value)||o.type==="date"&&!l&&!o.value||l!==o.value&&(o.value=l??"")})}function qt(o){var e=o.type;return e==="number"||e==="range"}function Wt(o){return o===""?null:+o}(function(o){o.languages.typescript=o.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),o.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete o.languages.typescript.parameter,delete o.languages.typescript["literal-property"];var e=o.languages.extend("typescript",{});delete e["class-name"],o.languages.typescript["class-name"].inside=e,o.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:e}}}}),o.languages.ts=o.languages.typescript})(Prism);var Ds=C("<pre><code><!></code></pre>");function te(o,e){xe(e,!0);const a=ct(e,"lang",3,"svelte"),r=ct(e,"inline",3,!1),l=ae(()=>a()===null?null:It.languages[a()]),c=ae(()=>I(l)===null?null:e.content&&It.highlight(e.content,I(l),a())),v=ae(()=>I(c)??e.content);var f=Ds();let _;var p=m(f);let g;var y=m(p);H(y,()=>e.children,w=>{var b=j(),A=F(b);lt(A,()=>e.children,()=>I(v)),d(w,b)},w=>{var b=j(),A=F(b);H(A,()=>I(c)!==null,T=>{var M=j(),k=F(M);Ls(k,()=>I(c),!1,!1),d(T,M)},T=>{var M=qe();B(()=>R(M,e.content)),d(T,M)},!0),d(w,b)}),u(p),u(f),B(()=>{_=Xe(f,_,{...e.pre_attrs},"svelte-1a6bj2n"),Ss(f,"inline",r()),g=Xe(p,g,{...e.code_attrs},"svelte-1a6bj2n")}),d(o,f),Te()}const Pt=new Set(["class","href","src","srcset","alt","title","name","width","height"]),Rs=(o,e=Pt)=>{let a;if("attributes"in o)for(const r of o.attributes){const{value:l}=r;if(o.type==="Component"||e.has(r.name)){let c="";for(const v of l)c+=v.content;c&&((a??(a=Object.create(null)))[r.name]=c)}}return a};var Zs=C('<code class="error_text"> </code>'),Vs=C("<code> </code>"),Js=C("<pre><code> </code></pre>"),Ks=C("<strong><!></strong>"),Xs=C("<em><!></em>"),Qs=C("<blockquote><!></blockquote>"),Ys=C("<li><!></li>"),$s=C("<ul></ul>"),en=C('<span class="error_text"> </span>');function zt(o,e){xe(e,!0);const a=(_,p=ot)=>{var g=j(),y=F(g);Pe(y,17,p,Ke,(w,b)=>{zt(w,{get view(){return I(b)}})}),d(_,g)},r=Bt.get(),l=ae(()=>e.view.type==="Component"&&e.view.name in r?r[e.view.name]:null),c=ae(()=>Rs(e.view));var v=j(),f=F(v);H(f,()=>e.view.type==="Component",_=>{var p=j(),g=F(p);H(g,()=>I(l),y=>{var w=j(),b=F(w);zs(b,()=>I(l),A=>{Cs(A,{})},(A,T)=>{var M=j(),k=F(M);Ps(k,()=>I(T),(S,N)=>{N(S,Bs(()=>I(c),{children:(Z,U)=>{var P=j(),V=F(P);H(V,()=>e.view.children,z=>{a(z,()=>e.view.children)}),d(Z,P)},$$slots:{default:!0}}))}),d(A,M)}),d(y,w)},y=>{var w=Zs(),b=m(w);u(w),B(()=>R(b,`<${e.view.name??""} />`)),d(y,w)}),d(_,p)},_=>{var p=j(),g=F(p);H(g,()=>e.view.type==="Element",y=>{var w=j(),b=F(w);H(b,()=>e.view.self_closing,A=>{var T=j(),M=F(T);Ct(M,()=>e.view.name,!1,(k,S)=>{let N;B(()=>N=Xe(k,N,{...I(c)},void 0,k.namespaceURI===rt,k.nodeName.includes("-")))}),d(A,T)},A=>{var T=j(),M=F(T);Ct(M,()=>e.view.name,!1,(k,S)=>{let N;B(()=>N=Xe(k,N,{...I(c)},void 0,k.namespaceURI===rt,k.nodeName.includes("-"))),a(S,()=>e.view.children)}),d(A,T)}),d(y,w)},y=>{var w=j(),b=F(w);H(b,()=>e.view.type==="Text",A=>{var T=qe();B(()=>R(T,e.view.content)),d(A,T)},A=>{var T=j(),M=F(T);H(M,()=>e.view.type==="Code",k=>{var S=Vs(),N=m(S,!0);u(S),B(()=>R(N,e.view.content)),d(k,S)},k=>{var S=j(),N=F(S);H(N,()=>e.view.type==="Code_Block",Z=>{var U=Js(),P=m(U),V=m(P,!0);u(P),u(U),B(()=>{Es(P,e.view.language),R(V,e.view.content)}),d(Z,U)},Z=>{var U=j(),P=F(U);H(P,()=>e.view.type==="Bold",V=>{var z=Ks(),Me=m(z);a(Me,()=>e.view.children),u(z),d(V,z)},V=>{var z=j(),Me=F(z);H(Me,()=>e.view.type==="Italic",ie=>{var J=Xs(),Ae=m(J);a(Ae,()=>e.view.children),u(J),d(ie,J)},ie=>{var J=j(),Ae=F(J);H(Ae,()=>e.view.type==="Mention",re=>{Hs(re,{get name(){return e.view.name}})},re=>{var je=j(),Qe=F(je);H(Qe,()=>e.view.type==="Hashtag",ve=>{Is(ve,{get name(){return e.view.name}})},ve=>{var ze=j(),Fe=F(ze);H(Fe,()=>e.view.type==="Absolute_Link",_e=>{st(_e,{get href(){return e.view.href},children:(oe,Le)=>{O();var K=qe();B(()=>R(K,e.view.href)),d(oe,K)},$$slots:{default:!0}})},_e=>{var oe=j(),Le=F(oe);H(Le,()=>e.view.type==="Global_Link",K=>{st(K,{get href(){return e.view.href},children:(le,Se)=>{O();var Q=qe();B(()=>R(Q,e.view.href)),d(le,Q)},$$slots:{default:!0}})},K=>{var le=j(),Se=F(le);H(Se,()=>e.view.type==="Markdown_Link",Q=>{st(Q,{get href(){return e.view.href},children:(Y,Ee)=>{a(Y,()=>e.view.text)},$$slots:{default:!0}})},Q=>{var Y=j(),Ee=F(Y);H(Ee,()=>e.view.type==="Expression",ce=>{var he=qe();B(()=>R(he,e.view.content)),d(ce,he)},ce=>{var he=j(),Ge=F(he);H(Ge,()=>e.view.type==="Blockquote",fe=>{var $=Qs(),de=m($);a(de,()=>e.view.children),u($),d(fe,$)},fe=>{var $=j(),de=F($);H(de,()=>e.view.type==="List",ge=>{var D=$s();Pe(D,21,()=>e.view.items,Ke,(He,Ie)=>{var be=Ys(),Ue=m(be);a(Ue,()=>I(Ie).children),u(be),d(He,be)}),u(D),d(ge,D)},ge=>{var D=en(),He=m(D);u(D),B(()=>R(He,`Unknown node type: ${e.view.type??""}`)),d(ge,D)},!0),d(fe,$)},!0),d(ce,he)},!0),d(Q,Y)},!0),d(K,le)},!0),d(_e,oe)},!0),d(ve,ze)},!0),d(re,je)},!0),d(ie,J)},!0),d(V,z)},!0),d(Z,U)},!0),d(k,S)},!0),d(A,T)},!0),d(y,w)},!0),d(_,p)}),d(o,v),Te()}const tn=o=>new ht(o).parse();var s,X,ke,me,t,Gt,Oe,dt,ut,Ut,Dt,pt,Rt,Ne,Zt,E,x,Vt,Jt,Kt,Xt,mt,Qt,Yt,$t,es,ts,ss,ns,as,is,vt,rs,os,ls,_t,cs,hs,ft,ds,Je,us,gt,ps,pe,se;const Be=class Be{constructor(e){we(this,t);we(this,s,0);we(this,X,"");we(this,ke,0);we(this,me,[]);this.template=e}parse(){for(L(this,me,[]);n(this,s)<this.template.length;){const e=i(this,t,dt).call(this);e.type==="Text"?i(this,t,Gt).call(this,e.content,e.start):(i(this,t,Oe).call(this),n(this,me).push(e))}return i(this,t,Oe).call(this),n(this,me)}};s=new WeakMap,X=new WeakMap,ke=new WeakMap,me=new WeakMap,t=new WeakSet,Gt=function(e,a){n(this,X)===""&&L(this,ke,a),L(this,X,n(this,X)+e)},Oe=function(){n(this,X)!==""&&(n(this,me).push({type:"Text",content:n(this,X),start:n(this,ke),end:n(this,ke)+n(this,X).length}),L(this,X,""))},dt=function(){return i(this,t,pt).call(this)?(i(this,t,Oe).call(this),i(this,t,ut).call(this,0)):i(this,t,x).call(this,"> ")?i(this,t,ps).call(this):i(this,t,Jt).call(this)?i(this,t,Kt).call(this):i(this,t,x).call(this,"`")?i(this,t,Xt).call(this):i(this,t,x).call(this,"*")?i(this,t,Qt).call(this):i(this,t,x).call(this,"_")?i(this,t,Yt).call(this):i(this,t,x).call(this,"@")?i(this,t,$t).call(this):i(this,t,x).call(this,"#")?i(this,t,es).call(this):i(this,t,x).call(this,"[")?i(this,t,ts).call(this):i(this,t,us).call(this)?i(this,t,ns).call(this):i(this,t,x).call(this,"/")?i(this,t,as).call(this):i(this,t,x).call(this,"<")?i(this,t,is).call(this):i(this,t,x).call(this,"{")?i(this,t,ls).call(this):i(this,t,Ut).call(this)},ut=function(e,a=""){const r=n(this,s),l=[];let c=e===0?"":a,v=r;for(i(this,t,Oe).call(this);n(this,s)<this.template.length;){const{indent_chars:f,effective_indent:_}=i(this,t,Ne).call(this);if(i(this,t,Rt).call(this,_,e)){e>0&&c===a&&(c+=f.slice(a.length));const p=n(this,s);i(this,t,Zt).call(this),i(this,t,Dt).call(this);const g=n(this,s);let y=this.template.indexOf(`
`,n(this,s));y===-1&&(y=this.template.length);const w=this.template.slice(n(this,s),y);L(this,s,y);const A=new Be(w).parse();A.forEach(M=>i(this,t,se).call(this,M,g));const T={type:"List_Item",children:A,start:p,end:n(this,s)};if(l.push(T),i(this,t,x).call(this,`
`)){i(this,t,E).call(this,`
`),v=n(this,s);const{effective_indent:M}=i(this,t,Ne).call(this);if(M>_){const k=i(this,t,ut).call(this,M,c);T.children.push(k),v=k.end}else if(M<_)break}else{v=n(this,s);break}}else break}return{type:"List",start:r,end:v,items:l,indent_level:i(this,t,Vt).call(this,e),indent_text:c}},Ut=function(){const e=n(this,s);let a="";for(;n(this,s)<this.template.length&&!i(this,t,pt).call(this);){const r=this.template[n(this,s)];if(/[`*_@#<{[]/.test(r)||this.template.startsWith("http://",n(this,s))||this.template.startsWith("https://",n(this,s))||this.template.startsWith("//",n(this,s))||r==="/")break;a+=r,q(this,s)._++}return{type:"Text",content:a,start:e,end:n(this,s)}},Dt=function(){if(this.template[n(this,s)]==="-"||this.template[n(this,s)]==="+"||this.template[n(this,s)]==="*")L(this,s,n(this,s)+2);else if(/\d/.test(this.template[n(this,s)])){for(;/\d/.test(this.template[n(this,s)]);)q(this,s)._++;(this.template[n(this,s)]==="."||this.template[n(this,s)]===")")&&L(this,s,n(this,s)+2)}},pt=function(){return(n(this,s)===0||this.template[n(this,s)-1]===`
`)&&(this.template.startsWith("- ",n(this,s))||this.template.startsWith("+ ",n(this,s))||this.template.startsWith("* ",n(this,s))||/^\d+\.( |\))/.test(this.template.slice(n(this,s))))},Rt=function(e,a){if(e<a)return!1;const r=n(this,s)+i(this,t,Ne).call(this).indent_chars.length;return this.template.startsWith("- ",r)||this.template.startsWith("+ ",r)||this.template.startsWith("* ",r)||/^\d+\.( |\))/.test(this.template.slice(r))},Ne=function(){let e="",a=0;for(;n(this,s)+e.length<this.template.length;){const r=this.template[n(this,s)+e.length];if(r===" ")e+=" ",a+=1;else if(r==="	")e+="	",a+=2;else break}return{indent_chars:e,effective_indent:a}},Zt=function(){const{indent_chars:e}=i(this,t,Ne).call(this);L(this,s,n(this,s)+e.length)},E=function(e){if(i(this,t,x).call(this,e))L(this,s,n(this,s)+e.length);else throw new Error(`Expected "${e}" at index ${n(this,s)}`)},x=function(e){return this.template.startsWith(e,n(this,s))},Vt=function(e){return Math.floor(e/2)},Jt=function(){return i(this,t,gt).call(this,"`")>=3},Kt=function(){const e=n(this,s),a=i(this,t,ds).call(this,"`");let r=null,l="",c="",v="";const f=e+a.length,_=this.template.indexOf(`
`,f),p=this.template.indexOf(a,f);_!==-1&&(p===-1||_<p)?(r=this.template.slice(f,_).trim()||null,L(this,s,_+1),l=`
`):L(this,s,f);const g=this.template.indexOf(a,n(this,s));if(g===-1)c=this.template.slice(n(this,s)),L(this,s,this.template.length);else{const w=this.template.slice(n(this,s),g);L(this,s,g+a.length);const b=/^(\s*)([\s\S]*?)(\s*)$/.exec(w);b?(l+=b[1],c=b[2],v=b[3]):c=w}const y=c.trim()===""&&a.length>=6&&a.length%2===0?a[0].repeat(a.length/2):a;return{type:"Code_Block",content:c,language:r,fence:y,leading_whitespace:l,trailing_whitespace:v,start:e,end:n(this,s)}},Xt=function(){const e=n(this,s);i(this,t,E).call(this,"`");const a=n(this,s),r=this.template.indexOf("`",n(this,s));if(r===-1)return L(this,s,this.template.length),{type:"Text",content:this.template.slice(e),start:e,end:n(this,s)};const l=this.template.slice(a,r);return L(this,s,r+1),{type:"Code",content:l,start:e,end:n(this,s)}},mt=function(e,a){const r=n(this,s),l=i(this,t,gt).call(this,e);if(l===1){i(this,t,E).call(this,e);const v=i(this,t,_t).call(this,f=>f===e);if(i(this,t,x).call(this,e))return i(this,t,E).call(this,e),{type:a,children:v,start:r,end:n(this,s)};{L(this,s,r);const f=this.template[n(this,s)];return q(this,s)._++,{type:"Text",content:f,start:r,end:n(this,s)}}}const c=e.repeat(l);return L(this,s,n(this,s)+l),{type:"Text",content:c,start:r,end:n(this,s)}},Qt=function(){return i(this,t,mt).call(this,"*","Bold")},Yt=function(){return i(this,t,mt).call(this,"_","Italic")},$t=function(){const e=n(this,s);return i(this,t,E).call(this,"@"),{type:"Mention",name:i(this,t,ft).call(this),start:e,end:n(this,s)}},es=function(){const e=n(this,s);return i(this,t,E).call(this,"#"),{type:"Hashtag",name:i(this,t,ft).call(this),start:e,end:n(this,s)}},ts=function(){const e=n(this,s);i(this,t,E).call(this,"[");let a="",r=1;for(;n(this,s)<this.template.length;){const l=this.template[n(this,s)];if(q(this,s)._++,a+=l,l==="[")r++;else if(l==="]"){if(r--,r===0&&i(this,t,x).call(this,"("))return i(this,t,E).call(this,"("),i(this,t,ss).call(this,e,a.slice(0,-1));if(r===0)return{type:"Text",content:a,start:e,end:n(this,s)}}}return{type:"Text",content:a,start:e,end:n(this,s)}},ss=function(e,a){const r=this.template.indexOf(")",n(this,s));if(r===-1)return L(this,s,this.template.length),{type:"Text",content:`[${a}(`,start:e,end:n(this,s)};const l=this.template.slice(n(this,s),r);L(this,s,r+1);const c=new Be(a).parse();return c.forEach(v=>i(this,t,se).call(this,v,e+1)),{type:"Markdown_Link",text:c,href:l,start:e,end:n(this,s)}},ns=function(){const e=n(this,s);let a;if(i(this,t,x).call(this,"http://")||i(this,t,x).call(this,"https://")||i(this,t,x).call(this,"//"))return a=i(this,t,pe).call(this,r=>/[\s,<>]/.test(r)),{type:"Global_Link",href:a,start:e,end:n(this,s)};{const r=this.template[n(this,s)];return q(this,s)._++,{type:"Text",content:r,start:e,end:n(this,s)}}},as=function(){const e=n(this,s);if(i(this,t,x).call(this,"/"))return i(this,t,E).call(this,"/"),{type:"Absolute_Link",href:"/"+i(this,t,pe).call(this,r=>/[\s,<>]/.test(r)),start:e,end:n(this,s)};{const a=this.template[n(this,s)];return q(this,s)._++,{type:"Text",content:a,start:e,end:n(this,s)}}},is=function(){const e=n(this,s);i(this,t,E).call(this,"<");const a=i(this,t,hs).call(this),r=/^[A-Z]/.test(a),l=i(this,t,os).call(this),c=i(this,t,rs).call(this);let v=!1,f=null;if(i(this,t,x).call(this,"/>"))v=!0,f=c||null,i(this,t,E).call(this,"/>");else if(i(this,t,x).call(this,">"))i(this,t,E).call(this,">");else return i(this,t,vt).call(this,e);if(v)return{type:r?"Component":"Element",name:a,attributes:l,children:[],start:e,end:n(this,s),self_closing:v,self_closing_space:f,original_syntax:"html"};{const _=`</${a}>`;if(this.template.indexOf(_,n(this,s))!==-1){const g=i(this,t,_t).call(this,()=>this.template.startsWith(_,n(this,s)));return i(this,t,E).call(this,_),{type:r?"Component":"Element",name:a,attributes:l,children:g,start:e,end:n(this,s),self_closing:!1,self_closing_space:null,original_syntax:"html"}}else return i(this,t,vt).call(this,e)}},vt=function(e){return{type:"Text",content:this.template.slice(e,n(this,s)),start:e,end:n(this,s)}},rs=function(){let e="";for(;n(this,s)<this.template.length&&/\s/.test(this.template[n(this,s)]);)e+=this.template[n(this,s)],q(this,s)._++;return e},os=function(){const e=[];for(;!(i(this,t,x).call(this,">")||i(this,t,x).call(this,"/>"));){const a=n(this,s);if(i(this,t,Je).call(this),i(this,t,x).call(this,">")||i(this,t,x).call(this,"/>")){L(this,s,a);break}const r=n(this,s),l=i(this,t,cs).call(this);if(!l)break;let c=[];if(i(this,t,Je).call(this),i(this,t,x).call(this,"=")){i(this,t,E).call(this,"="),i(this,t,Je).call(this);const v=this.template[n(this,s)];if(v==='"'||v==="'"){i(this,t,E).call(this,v);const f=n(this,s),_=i(this,t,pe).call(this,g=>g===v),p=n(this,s);i(this,t,E).call(this,v),c=[{type:"Text",content:_,start:f,end:p}]}else{const f=n(this,s),_=i(this,t,pe).call(this,g=>/[\s/>]/.test(g)),p=n(this,s);c=[{type:"Text",content:_,start:f,end:p}]}}e.push({type:"Attribute",name:l,value:c,start:r,end:n(this,s),parent:null})}return e},ls=function(){const e=n(this,s);i(this,t,E).call(this,"{");const a=i(this,t,pe).call(this,r=>r==="}");return i(this,t,E).call(this,"}"),{type:"Expression",content:a,start:e,end:n(this,s)}},_t=function(e){const a=[];for(;n(this,s)<this.template.length&&!e(this.template[n(this,s)]);){const r=i(this,t,dt).call(this);if(r.type==="Text"&&a.length>0&&a[a.length-1].type==="Text"){const l=a[a.length-1];l.content+=r.content,l.end=r.end}else a.push(r)}return a},cs=function(){const e=n(this,s);for(;n(this,s)<this.template.length&&!/[\s=/>]/.test(this.template[n(this,s)]);)q(this,s)._++;return this.template.slice(e,n(this,s))},hs=function(){const e=n(this,s);for(;n(this,s)<this.template.length&&!/[\s/>]/.test(this.template[n(this,s)]);)q(this,s)._++;return this.template.slice(e,n(this,s))},ft=function(){const e=n(this,s);for(;n(this,s)<this.template.length&&/[a-zA-Z0-9_]/.test(this.template[n(this,s)]);)q(this,s)._++;return this.template.slice(e,n(this,s))},ds=function(e){const a=n(this,s);for(;n(this,s)<this.template.length&&this.template[n(this,s)]===e;)q(this,s)._++;return this.template.slice(a,n(this,s))},Je=function(){for(;n(this,s)<this.template.length&&/\s/.test(this.template[n(this,s)]);)q(this,s)._++},us=function(){return i(this,t,x).call(this,"http://")||i(this,t,x).call(this,"https://")||i(this,t,x).call(this,"//")},gt=function(e){let a=0,r=n(this,s);for(;r<this.template.length&&this.template[r]===e;)a++,r++;return a},ps=function(){const e=n(this,s),a=n(this,s);let r="";for(;n(this,s)<this.template.length;){const f=n(this,s);for(;n(this,s)<this.template.length&&(this.template[n(this,s)]===" "||this.template[n(this,s)]==="	");)q(this,s)._++;if(i(this,t,x).call(this,"> "))i(this,t,E).call(this,"> ");else if(i(this,t,x).call(this,">"))i(this,t,E).call(this,">");else{L(this,s,f);break}const _=i(this,t,pe).call(this,p=>p===`
`);if(r+=_,i(this,t,x).call(this,`
`))r+=`
`,i(this,t,E).call(this,`
`);else break}r.endsWith(`
`)&&(r=r.slice(0,-1));const c=new Be(r).parse();c.forEach(f=>i(this,t,se).call(this,f,a));const v=n(this,s);return{type:"Blockquote",children:c,start:e,end:v}},pe=function(e){let a="";for(;n(this,s)<this.template.length&&!e(this.template[n(this,s)]);)a+=this.template[n(this,s)],q(this,s)._++;return a},se=function(e,a){e.start+=a,e.end+=a,"children"in e&&Array.isArray(e.children)&&e.children.forEach(r=>i(this,t,se).call(this,r,a)),"value"in e&&Array.isArray(e.value)&&e.value.forEach(r=>i(this,t,se).call(this,r,a)),"attributes"in e&&Array.isArray(e.attributes)&&e.attributes.forEach(r=>i(this,t,se).call(this,r,a)),"text"in e&&Array.isArray(e.text)&&e.text.forEach(r=>i(this,t,se).call(this,r,a))};let ht=Be;function ne(o,e){xe(e,!0);const a=ae(()=>tn(e.content));var r=j(),l=F(r);Pe(l,16,()=>I(a),c=>c,(c,v)=>{zt(c,{get view(){return v}})}),d(o,r),Te()}var sn=C('<div class="spaced"><!></div>'),nn=C('<div class="playground svelte-1i3lwl0"><textarea class="svelte-1i3lwl0"></textarea> <div class="preview svelte-1i3lwl0"></div></div>');function an(o,e){xe(e,!0);let r=ct(e,"value",15,`*bold* _italics_ \`code\`

#hashtag and @mention

[markdown link](./markdown-link)

/root/link

network link - //github.com/ryanatkn/end-user-markdown-sketch

<aside>basic safe <a href="https://wikipedia.org/wiki/HTML">html</a> works</aside>

<span class="chip success">class</span> is allowed but <span class="chip" style="color: red">style</span> and most other attributes are not yet - it should support a safe and configurable subset of HTML, not every usecase has the same needs

<button onclick="alert('hax')" title="this button tries to hack you with the onclick attribute but the attribute allowlist disallows it">onclick does not work</button>`);const l=ae(()=>r().split(`
`).filter(Boolean));var c=nn(),v=m(c);Ws(v);var f=h(v,2);Pe(f,21,()=>I(l),Ke,(_,p)=>{var g=sn(),y=m(g);ne(y,{get content(){return I(p)}}),u(g),d(_,g)}),u(f),u(c),Us(v,r),d(o,c),Te()}var rn=C('<div class="markdown_text_example panel svelte-6ael15"><!> <!> <p><!></p> <!></div>');function W(o,e){xe(e,!0);var a=rn(),r=m(a);lt(r,()=>e.children??ot);var l=h(r,2);te(l,{get content(){return e.content}});var c=h(l,2),v=m(c);ne(v,{get content(){return e.content}}),u(c);var f=h(c,2);lt(f,()=>e.after??ot),u(a),d(o,a),Te()}var on=C("<p>Element classes are a powerful and safe way for end-users to access the app's styles:</p>"),ln=C("<li><a> </a></li>"),cn=C(`<p>Perhaps an optional Svelte component can be provided for missing components, and
							plaintext is rendered if none is provided.</p>`),hn=C("<p>If a component isn't found, it renders a fallback that preserves the source text:</p>"),dn=C(`<main class="width_md svelte-1m5pajl"><div class="width_full"><section class="panel p_md section_xl svelte-1m5pajl"><div class="panel_inner svelte-1m5pajl"><h2 id="motivation" class="svelte-1m5pajl">Motivation</h2> <p>Many social websites provide rich text features to end-users like <!>. Markdown is the common
					name for this markup, although the specifics differ:</p> <ul><li><a href="https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-">Discord Markdown</a></li> <li><a href="https://support.microsoft.com/en-au/office/use-markdown-formatting-in-microsoft-teams-4d10bd65-55e2-4b2d-a1f3-2bebdcd2c772">Teams Markdown</a></li> <li><a href="https://api.slack.com/reference/surfaces/formatting">Slack mrkdwn</a></li></ul> <p>Some platform-independent markdowns include:</p> <ul><li><a href="https://github.github.com/gfm/">GitHub Flavored Markdown</a></li> <li><a href="https://mdsvex.pngwn.io/">MDsveX</a> (this sketch is based on its code)</li> <li><a href="https://djot.net/">djot</a></li> <li><a href="https://commonmark.org/">CommonMark</a></li></ul> <p>There are many markdowns. This project describes a proposed flavor of markdown designed
					for the end-users and developers of an unannounced social app framework. My goal is to
					provide highly flexible and performant capabilities to end-users, not make a new flavor,
					and I would enthusiastically use an existing library if it had the desired features and
					runtime characteristics.</p> <aside>This is a rough sketch from end-user and developer perspectives, not a well-constructed
					spec! See <a href="https://github.com/ryanatkn/end-user-markdown-sketch">the source code</a> for the implementation and credits. The <a href="https://github.com/ryanatkn/end-user-markdown-sketch/discussions">GitHub discussions</a> are enabled if you're interested, and you can <a href="mailto:mail@ryanatkn.com">email me</a> if you would like to keep the discussion private.</aside></div></section> <section class="panel p_md section_xl svelte-1m5pajl"><section class="panel_inner svelte-1m5pajl"><h2 id="key-features" class="svelte-1m5pajl">Key features</h2> <ul><li>customizable - features are optional and exposed through configuation, and rendering is
						pluggable</li> <li>extensible - new features can be added by end-users and developers through
						configuration, using a set of supported syntaxes for cases like @mentions and ~whatever~</li> <li>powerful - renders HTML, *markdownisms*, and Svelte components with props and
						composition (no JS/expressions yet but could eventually support all/most of Svelte I
						think?)</li> <li>user-friendly - the default configuration and main Svelte renderer behave more like the
						markdowns of Slack and Discord than traditional dev-friendly markdowns, preserving the
						more common user expectation for newlines and making bold text a single *</li> <li>dev-friendly - renderers like the main HTML/Svelte one may ignore some whitespace but
						parsing+printing any text reproduces it character-for-character, so it's stable to edit
						as data and formatting is off by default, but you can add things like automatic trailing
						whitespace trimming to your UI, if you want</li></ul></section></section> <section class="panel p_md section_xl svelte-1m5pajl"><div class="panel_inner svelte-1m5pajl"><div><h2 id="playground" class="svelte-1m5pajl">Playground</h2> <p>These examples are specific to this context's configuration. Each feature is optional
						and configurable, and the patterns are extensible. See <a href="#extensibility">the extensibility section</a> for more.</p> <br></div> <!> <div><aside>tip: try opening the contextmenu on <!> and <!> and the other <!></aside></div></div></section> <section class="panel p_md section_xl svelte-1m5pajl"><section class="panel_inner svelte-1m5pajl"><h2 id="extensibility" class="svelte-1m5pajl">Extensibility</h2> <p>Almost everything is optional, configurable, or extensible. The goal is to support
					open-ended usecase-specific features, not make a universal markdown.</p> <p>For example, the asterisks for <code>*bold text*</code> are an optional extension
					behavior, so bold could be characters other than <code>*</code>, and its <code>&lt;strong&gt;</code> wrapper is configurable. It could be different HTML or a Svelte
					component.</p> <p>This trades away portability for power and flexibility. It's a huge tradeoff and makes
					this flavor unsuitable for many usecases - it doesn't substitute for existing
					platform-independent markdowns.</p> <p>Some planned extensibility:</p> <ul><li>text wrapped in control characters, like <code>*bold text*</code> and <code>_italics_</code> (probably double character variants too)</li> <li>blocks wrapped in triple control characters, like <code>\`\`\`code blocks\`\`\`</code></li> <li>single words starting with a control character, like <code>@mentions</code> and <code>#hashtags</code></li></ul> <p><a href="#examples">The examples</a> demonstrate extensions with commonly-used control
					characters. Some example control characters include <code>*</code>, <code>_</code>, <code>\`</code>, <code>:</code>, <code>~</code>, <code>%</code>, <code>#</code>, <code>|</code> - any could be supported, including emoji if you want to get 😈weird😈.</p></section></section> <section class="panel p_md section_xl svelte-1m5pajl"><section class="panel_inner svelte-1m5pajl"><h2 id="examples" class="svelte-1m5pajl">Examples</h2> <details><summary>technical details about how these examples work</summary> <p>Each of the following examples mounts a Svelte component named <a href="https://github.com/ryanatkn/end-user-markdown-sketch/blob/main/src/lib/Markdown.svelte"><code>Markdown</code></a> with a <code>content</code> prop:</p> <blockquote><!> <div><!></div></blockquote> <p>The <code>Markdown</code> component internally calls <a href="https://github.com/ryanatkn/end-user-markdown-sketch/blob/main/src/lib/parse_markdown.ts"><code>parse_markdown</code></a> to transform <code>content</code> to its JSON representation, an <a href="https://github.com/estree/estree">ESTree</a>-compliant AST. (and then <a href="https://github.com/ryanatkn/end-user-markdown-sketch/blob/main/src/lib/todo_hacky_parse.ts">some hacky post-processing</a> to demo more features)</p> <p>The @ symbol in <code>hey @you</code> is configured to be interpreted as a shorthand for
						a <a href="https://github.com/ryanatkn/end-user-markdown-sketch/blob/main/src/routes/Mention.svelte"><code>Mention</code></a> component. The text <code>@you</code> is equivalent to <!>. The component is provided by the app and can be anything.</p> <p>The control characters like @ are customizable to enable app-specific features, and they
						could potentially be defined or customized by end-users. (like the people using a chat
						app) <a href="#extensibility">The extensibility section</a> elaborates.</p></details></section> <section class="section_lg svelte-1m5pajl"><h3 id="html-tags">HTML tags</h3> <!> <!></section> <section class="section_lg svelte-1m5pajl"><h3 id="html_attributes">HTML attributes</h3> <p>A safe subset of HTML attributes is supported. Some attributes are sensitive for security
					or privacy, and some contexts need to disallow styles that break the UX.</p> <!> <p>The <code>src</code> and <code>href</code> attributes are enabled here despite having
					security and privacy issues in some contexts. (not here though!) Granular runtime
					configuration including allowlisted hosts is probably desired. Some issues can be handled
					orthogonally with a <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">Content Security Policy</a>.</p> <!> <!></section> <section class="section_lg svelte-1m5pajl"><h3 id="syntax-sugar">Syntax sugar</h3> <!> <!> <!> <details><summary>TODO</summary> <ul><li>correctly support these across multiple words</li> <li>headers</li> <li>lists, using <code>- this</code> not also <code>* that</code></li> <li><code>\`\`\`code blocks\`\`\`</code> with syntax highlighting</li> <li>resolve backtick-wrapped <!> to a system-defined
							namespace, like an app's vocabulary for contextmenu and other widgety behaviors</li> <li>extensibility</li></ul></details></section> <section class="section_lg svelte-1m5pajl"><h3 id="links">Links</h3> <!> <p><code>/path</code> is a shorthand for <!></p> <!> <p><code>//path</code> is a shorthand for <!></p> <p>The <code>Link</code> component is configurable, and the <code>/</code> and <code>//</code> behaviors are a usecase-specific extension.</p></section> <section class="section_lg svelte-1m5pajl"><h3 id="mentions">Mentions</h3> <!> <p>The <code>@</code> is a shorthand for <!>.</p> <p>The <code>Mention</code> component is configurable, and the <code>@</code> behavior is a usecase-specific
					extension.</p></section> <section class="section_lg svelte-1m5pajl"><h3 id="hashtag">Hashtags</h3> <!> <p>The <code>#</code> is a shorthand for <!>.</p> <p>The <code>Hashtag</code> component is configurable, and the <code>#</code> behavior is a usecase-specific
					extension.</p></section> <section class="svelte-1m5pajl"><h3 id="svelte-components">Svelte components</h3> <aside>⚠️ Svelte component support is specific to my usecases. Maybe the implementation should be
					framework-agnostic, but I'm less interested in that because I'm focused on my end-users.</aside> <p>Tags with capital letters like <code></code> are interpreted as Svelte components.
					Each app chooses which components to provide, and the feature can be disabled by providing
					no components. This example app provides the following components:</p> <ul></ul> <!> <!> <!> <!></section></section> <section class="panel p_md section_xl svelte-1m5pajl"><section class="panel_inner svelte-1m5pajl"><h2 id="discussions" class="svelte-1m5pajl">Discussions</h2> <ul><li><a href="https://github.com/ryanatkn/end-user-markdown-sketch/discussions/2">Questions or comments?</a></li> <li><a href="https://github.com/ryanatkn/end-user-markdown-sketch/discussions/1">Newline behavior</a></li></ul></section></section></div></main>`);function yn(o,e){xe(e,!0);const a=Bt.get();var r=dn(),l=m(r),c=m(l),v=m(c),f=h(m(v),2),_=h(m(f));ne(_,{content:"*bold* text and @mentions and #hashtags"}),O(),u(f),O(10),u(v),u(c);var p=h(c,4),g=m(p),y=h(m(g),2);an(y,{});var w=h(y,2),b=m(w),A=h(m(b));ne(A,{content:"@fox"});var T=h(A,2);ne(T,{content:"@dog"});var M=h(T,2);ne(M,{content:"@mentions and #hashtags"}),u(b),u(w),u(g),u(p);var k=h(p,4),S=m(k),N=h(m(S),2),Z=h(m(N),4),U=m(Z);te(U,{content:'<Markdown content="hey @you" />'});var P=h(U,2),V=m(P);ne(V,{content:"hey @you"}),u(P),u(Z);var z=h(Z,4),Me=h(m(z),7);te(Me,{content:'<Mention name="you" />',pre_attrs:{style:"display: inline"}}),O(),u(z),O(2),u(N),u(S);var ie=h(S,2),J=h(m(ie),2);W(J,{content:"<aside>example HTML tag</aside>"});var Ae=h(J,2);W(Ae,{content:`<aside>
	<blockquote>
		<aside>example nesting</aside>
		<details><summary>example summary</summary>hidden details</details>
	</blockquote>
</aside>`}),u(ie);var re=h(ie,2),je=h(m(re),4),Qe=ae(()=>`export const ALLOWED_HTML_ATTRS = new Set([
	${Array.from(Pt).map(ye=>`'${ye}'`).join(", ")}
]);`);te(je,{lang:"ts",get content(){return I(Qe)}});var ve=h(je,4);W(ve,{content:`with class:
<span class="chip">.chip</span>`,children:(ye,ue)=>{var ee=on();d(ye,ee)},$$slots:{default:!0}});var ze=h(ve,2);W(ze,{content:`safe attributes work:
<img
	src="${Ns}/favicon.png"
	alt="a little yellow spider"
	title="this site's favicon"
	width="128"
	height="128"
	class="pixelated"
/>`}),u(re);var Fe=h(re,2),_e=h(m(Fe),2);W(_e,{content:"*asterisks* are replaced with a <code>strong</code> tag"});var oe=h(_e,2);W(oe,{content:"_underscores_ are replaced with an <code>em</code> tag"});var Le=h(oe,2);W(Le,{content:"`backticks` are replaced with a <code>code</code> tag"});var K=h(Le,2),le=h(m(K),2),Se=h(m(le),8),Q=h(m(Se));ne(Q,{content:"`known_identifiers`"}),O(),u(Se),O(2),u(le),u(K),u(Fe);var Y=h(Fe,2),Ee=h(m(Y),2);W(Ee,{content:"/root link to the current base (like GitHub's flavor, not necessarily absolute to the host!)"});var ce=h(Ee,2),he=h(m(ce),2);te(he,{inline:!0,content:'<Link href="{base}/path" />'}),u(ce);var Ge=h(ce,2);W(Ge,{content:"network link to <code>https:</code> - //github.com/ryanatkn/end-user-markdown-sketch"});var fe=h(Ge,2),$=h(m(fe),2);te($,{inline:!0,content:'<Link href="https://path" />'}),u(fe),O(2),u(Y);var de=h(Y,2),ge=h(m(de),2);W(ge,{content:"@username mentions have contextmenus"});var D=h(ge,2),He=h(m(D),3);te(He,{inline:!0,content:'<Mention name="username" />'}),O(),u(D),O(2),u(de);var Ie=h(de,2),be=h(m(Ie),2);W(be,{content:"#hashtags have contextmenus"});var Ue=h(be,2),ms=h(m(Ue),3);te(ms,{inline:!0,content:'<Hashtag name="hashtags" />'}),O(),u(Ue),O(2),u(Ie);var bt=h(Ie,2),Ye=h(m(bt),4),vs=h(m(Ye));vs.textContent="<This />",O(),u(Ye);var $e=h(Ye,2);Pe($e,21,()=>Object.keys(a),Ke,(ye,ue)=>{var ee=ln(),Ce=m(ee),fs=m(Ce,!0);u(Ce),u(ee),B(()=>{Os(Ce,"href",`https://github.com/ryanatkn/end-user-markdown-sketch/blob/main/src/routes/${I(ue)??""}.svelte`),R(fs,I(ue))}),d(ye,ee)}),u($e);var yt=h($e,2);W(yt,{content:'<Link href="/route">this Link</Link> does the same as /route'});var wt=h(yt,2);W(wt,{content:'mentioning <Mention name="username" /> the long way'});var kt=h(wt,2);W(kt,{content:'<Hashtag name="this" /> is equivalent to #this'});var _s=h(kt,2);W(_s,{content:"<Missing /> components are called out",after:ue=>{var ee=cn();d(ue,ee)},children:(ue,ee)=>{var Ce=hn();d(ue,Ce)},$$slots:{after:!0,default:!0}}),u(bt),u(k),O(2),u(l),u(r),d(o,r),Te()}export{yn as component};
