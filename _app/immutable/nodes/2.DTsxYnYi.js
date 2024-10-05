var xt=o=>{throw TypeError(o)};var et=(o,e,a)=>e.has(o)||xt("Cannot "+a);var n=(o,e,a)=>(et(o,e,"read from private field"),a?a.call(o):e.get(o)),xe=(o,e,a)=>e.has(o)?xt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,a),S=(o,e,a,r)=>(et(o,e,"write to private field"),r?r.call(o,a):e.set(o,a),a),i=(o,e,a)=>(et(o,e,"access private method"),a);var q=(o,e,a,r)=>({set _(l){S(o,e,l,a)},get _(){return n(o,e,r)}});import{g as gs,a as u,t as H,e as F,f as at,s as V}from"../chunks/disclose-version.BV1ZLE2j.js";import{h as G,d as it,al as Wt,g as Nt,am as bs,z as tt,i as qe,q as ys,j as Pe,C as Tt,x as Mt,an as At,ao as Ft,ap as jt,N as Re,k as Ze,a3 as ws,a0 as ks,O as xs,l as Ts,a8 as Ms,M as St,K as Et,F as As,aq as rt,ar as Fs,r as js,p as Me,t as N,a as Ae,f as j,y as I,c as p,b as d,Y as ie,v as ot,s as h,as as z}from"../chunks/runtime.C8xWL2y2.js";import{s as Lt,c as Ht,h as Ss,a as lt,t as Es,P as Ct,b as zt,d as Ls,M as Hs,H as Cs,e as ze,i as Ke,f as Is}from"../chunks/components.CJWpKQXk.js";import{a as qs,b as Xe,s as Ve,r as Os}from"../chunks/attributes.CKkYvfAQ.js";import{b as Ws}from"../chunks/paths.CyAbMsKw.js";import{p as ct,i as C,s as Ns}from"../chunks/index-client.BEHTeI2k.js";import{c as zs}from"../chunks/svelte-component.CQAx8UZi.js";const st=0,Ue=1,nt=2;function Bs(o,e,a,r,l){G&&it();var c=o,v=Wt(),f=ks,_,m,g,b,w=(v?Tt:Mt)(void 0),y=(v?Tt:Mt)(void 0),A=!1;function T(k,E){A=!0,E&&(At(M),Ft(M),jt(f)),k===st&&a&&(m?Re(m):m=qe(()=>a(c))),k===Ue&&r&&(g?Re(g):g=qe(()=>r(c,w))),k===nt&&l&&(b?Re(b):b=qe(()=>l(c,y))),k!==st&&m&&Ze(m,()=>m=null),k!==Ue&&g&&Ze(g,()=>g=null),k!==nt&&b&&Ze(b,()=>b=null),E&&(jt(null),Ft(null),At(null),ws())}var M=Nt(()=>{if(_!==(_=e())){if(bs(_)){var k=_;A=!1,k.then(E=>{k===_&&(tt(w,E),T(Ue,!0))},E=>{k===_&&(tt(y,E),T(nt,!0))}),G?a&&(m=qe(()=>a(c))):ys(()=>{A||T(st,!0)})}else tt(w,_),T(Ue,!1);return()=>_=null}});G&&(c=Pe)}function It(o,e,a,r,l,c){let v=G;G&&it();var f,_,m=null;G&&Pe.nodeType===1&&(m=Pe,it());var g=G?Pe:o,b,w=Ht;Nt(()=>{const y=e()||null;var A=y==="svg"?rt:null;if(y!==f){var T=Ht;Lt(w),b&&(y===null?Ze(b,()=>{b=null,_=null}):y===_?Re(b):Fs(b)),y&&y!==_&&(b=qe(()=>{if(m=G?m:A?document.createElementNS(A,y):document.createElement(y),gs(m,m),r){var M=G?Ts(m):m.appendChild(Ms());G&&(M===null?St(!1):Et(M)),r(m,M)}As.nodes_end=m,g.before(m)})),f=y,f&&(_=f),Lt(T)}},xs),v&&(St(!0),Et(g))}function Ds(o,e,a,r=a){o.addEventListener(e,a);const l=o.__on_r;l?o.__on_r=()=>{l(),r()}:o.__on_r=r,qs()}function Gs(o,e,a=e){var r=Wt();Ds(o,"input",()=>{var l=qt(o)?Ot(o.value):o.value;a(l),r&&l!==(l=e())&&(o.value=l??"")}),js(()=>{var l=e();if(G&&o.defaultValue!==o.value){a(o.value);return}qt(o)&&l===Ot(o.value)||o.type==="date"&&!l&&!o.value||(o.value=l??"")})}function qt(o){var e=o.type;return e==="number"||e==="range"}function Ot(o){return o===""?null:+o}(function(o){o.languages.typescript=o.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),o.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete o.languages.typescript.parameter,delete o.languages.typescript["literal-property"];var e=o.languages.extend("typescript",{});delete e["class-name"],o.languages.typescript["class-name"].inside=e,o.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:e}}}}),o.languages.ts=o.languages.typescript})(Prism);var Us=H("<pre><code><!></code></pre>");function se(o,e){Me(e,!0);const a=ct(e,"lang",3,"svelte"),r=ct(e,"inline",3,!1),l=ie(()=>a()===null?null:Ct.languages[a()]),c=ie(()=>I(l)===null?null:e.content&&Ct.highlight(e.content,I(l),a())),v=ie(()=>I(c)??e.content);var f=Us();let _;var m=p(f);let g;var b=p(m);C(b,()=>e.children,w=>{var y=F(),A=j(y);lt(A,()=>e.children,()=>I(v)),u(w,y)},w=>{var y=F(),A=j(y);C(A,()=>I(c)!==null,T=>{var M=F(),k=j(M);Ss(k,()=>I(c),!1,!1),u(T,M)},T=>{var M=at();N(()=>V(M,e.content)),u(T,M)},!0),u(w,y)}),d(m),d(f),N(()=>{_=Xe(f,_,{...e.pre_attrs},"svelte-1a6bj2n"),Es(f,"inline",r()),g=Xe(m,g,{...e.code_attrs},"svelte-1a6bj2n")}),u(o,f),Ae()}const Ps=o=>new ht(o).parse();var s,$,Te,ue,t,Bt,Oe,dt,ut,Dt,Gt,pt,Ut,We,Pt,L,x,Rt,Zt,Vt,Jt,mt,Kt,Xt,Qt,Yt,$t,es,ts,ss,ns,vt,as,is,rs,_t,os,ls,ft,cs,Je,hs,gt,ds,de,ne;const Ne=class Ne{constructor(e){xe(this,t);xe(this,s,0);xe(this,$,"");xe(this,Te,0);xe(this,ue,[]);this.template=e}parse(){for(S(this,ue,[]);n(this,s)<this.template.length;){const e=i(this,t,dt).call(this);e.type==="Text"?i(this,t,Bt).call(this,e.content,e.start):(i(this,t,Oe).call(this),n(this,ue).push(e))}return i(this,t,Oe).call(this),n(this,ue)}};s=new WeakMap,$=new WeakMap,Te=new WeakMap,ue=new WeakMap,t=new WeakSet,Bt=function(e,a){n(this,$)===""&&S(this,Te,a),S(this,$,n(this,$)+e)},Oe=function(){n(this,$)!==""&&(n(this,ue).push({type:"Text",content:n(this,$),start:n(this,Te),end:n(this,Te)+n(this,$).length}),S(this,$,""))},dt=function(){return i(this,t,pt).call(this)?(i(this,t,Oe).call(this),i(this,t,ut).call(this,0)):i(this,t,x).call(this,"> ")?i(this,t,ds).call(this):i(this,t,Zt).call(this)?i(this,t,Vt).call(this):i(this,t,x).call(this,"`")?i(this,t,Jt).call(this):i(this,t,x).call(this,"*")?i(this,t,Kt).call(this):i(this,t,x).call(this,"_")?i(this,t,Xt).call(this):i(this,t,x).call(this,"@")?i(this,t,Qt).call(this):i(this,t,x).call(this,"#")?i(this,t,Yt).call(this):i(this,t,x).call(this,"[")?i(this,t,$t).call(this):i(this,t,hs).call(this)?i(this,t,ts).call(this):i(this,t,x).call(this,"/")?i(this,t,ss).call(this):i(this,t,x).call(this,"<")?i(this,t,ns).call(this):i(this,t,x).call(this,"{")?i(this,t,rs).call(this):i(this,t,Dt).call(this)},ut=function(e,a=""){const r=n(this,s),l=[];let c=e===0?"":a,v=r;for(i(this,t,Oe).call(this);n(this,s)<this.template.length;){const{indent_chars:f,effective_indent:_}=i(this,t,We).call(this);if(i(this,t,Ut).call(this,_,e)){e>0&&c===a&&(c+=f.slice(a.length));const m=n(this,s);i(this,t,Pt).call(this),i(this,t,Gt).call(this);const g=n(this,s);let b=this.template.indexOf(`
`,n(this,s));b===-1&&(b=this.template.length);const w=this.template.slice(n(this,s),b);S(this,s,b);const A=new Ne(w).parse();A.forEach(M=>i(this,t,ne).call(this,M,g));const T={type:"List_Item",children:A,start:m,end:n(this,s)};if(l.push(T),i(this,t,x).call(this,`
`)){i(this,t,L).call(this,`
`),v=n(this,s);const{effective_indent:M}=i(this,t,We).call(this);if(M>_){const k=i(this,t,ut).call(this,M,c);T.children.push(k),v=k.end}else if(M<_)break}else{v=n(this,s);break}}else break}return{type:"List",start:r,end:v,items:l,indent_level:i(this,t,Rt).call(this,e),indent_text:c}},Dt=function(){const e=n(this,s);let a="";for(;n(this,s)<this.template.length&&!i(this,t,pt).call(this);){const r=this.template[n(this,s)];if(/[`*_@#<{[]/.test(r)||this.template.startsWith("http://",n(this,s))||this.template.startsWith("https://",n(this,s))||this.template.startsWith("//",n(this,s))||r==="/")break;a+=r,q(this,s)._++}return{type:"Text",content:a,start:e,end:n(this,s)}},Gt=function(){if(this.template[n(this,s)]==="-"||this.template[n(this,s)]==="+"||this.template[n(this,s)]==="*")S(this,s,n(this,s)+2);else if(/\d/.test(this.template[n(this,s)])){for(;/\d/.test(this.template[n(this,s)]);)q(this,s)._++;(this.template[n(this,s)]==="."||this.template[n(this,s)]===")")&&S(this,s,n(this,s)+2)}},pt=function(){return(n(this,s)===0||this.template[n(this,s)-1]===`
`)&&(this.template.startsWith("- ",n(this,s))||this.template.startsWith("+ ",n(this,s))||this.template.startsWith("* ",n(this,s))||/^\d+\.( |\))/.test(this.template.slice(n(this,s))))},Ut=function(e,a){if(e<a)return!1;const r=n(this,s)+i(this,t,We).call(this).indent_chars.length;return this.template.startsWith("- ",r)||this.template.startsWith("+ ",r)||this.template.startsWith("* ",r)||/^\d+\.( |\))/.test(this.template.slice(r))},We=function(){let e="",a=0;for(;n(this,s)+e.length<this.template.length;){const r=this.template[n(this,s)+e.length];if(r===" ")e+=" ",a+=1;else if(r==="	")e+="	",a+=2;else break}return{indent_chars:e,effective_indent:a}},Pt=function(){const{indent_chars:e}=i(this,t,We).call(this);S(this,s,n(this,s)+e.length)},L=function(e){if(i(this,t,x).call(this,e))S(this,s,n(this,s)+e.length);else throw new Error(`Expected "${e}" at index ${n(this,s)}`)},x=function(e){return this.template.startsWith(e,n(this,s))},Rt=function(e){return Math.floor(e/2)},Zt=function(){return i(this,t,gt).call(this,"`")>=3},Vt=function(){const e=n(this,s),a=i(this,t,cs).call(this,"`");let r=null,l="",c="",v="";const f=e+a.length,_=this.template.indexOf(`
`,f),m=this.template.indexOf(a,f);_!==-1&&(m===-1||_<m)?(r=this.template.slice(f,_).trim()||null,S(this,s,_+1),l=`
`):S(this,s,f);const g=this.template.indexOf(a,n(this,s));if(g===-1)c=this.template.slice(n(this,s)),S(this,s,this.template.length);else{const w=this.template.slice(n(this,s),g);S(this,s,g+a.length);const y=/^(\s*)([\s\S]*?)(\s*)$/.exec(w);y?(l+=y[1],c=y[2],v=y[3]):c=w}const b=c.trim()===""&&a.length>=6&&a.length%2===0?a[0].repeat(a.length/2):a;return{type:"Code_Block",content:c,language:r,fence:b,leading_whitespace:l,trailing_whitespace:v,start:e,end:n(this,s)}},Jt=function(){const e=n(this,s);i(this,t,L).call(this,"`");const a=n(this,s),r=this.template.indexOf("`",n(this,s));if(r===-1)return S(this,s,this.template.length),{type:"Text",content:this.template.slice(e),start:e,end:n(this,s)};const l=this.template.slice(a,r);return S(this,s,r+1),{type:"Code",content:l,start:e,end:n(this,s)}},mt=function(e,a){const r=n(this,s),l=i(this,t,gt).call(this,e);if(l===1){i(this,t,L).call(this,e);const v=i(this,t,_t).call(this,f=>f===e);if(i(this,t,x).call(this,e))return i(this,t,L).call(this,e),{type:a,children:v,start:r,end:n(this,s)};{S(this,s,r);const f=this.template[n(this,s)];return q(this,s)._++,{type:"Text",content:f,start:r,end:n(this,s)}}}const c=e.repeat(l);return S(this,s,n(this,s)+l),{type:"Text",content:c,start:r,end:n(this,s)}},Kt=function(){return i(this,t,mt).call(this,"*","Bold")},Xt=function(){return i(this,t,mt).call(this,"_","Italic")},Qt=function(){const e=n(this,s);return i(this,t,L).call(this,"@"),{type:"Mention",name:i(this,t,ft).call(this),start:e,end:n(this,s)}},Yt=function(){const e=n(this,s);return i(this,t,L).call(this,"#"),{type:"Hashtag",name:i(this,t,ft).call(this),start:e,end:n(this,s)}},$t=function(){const e=n(this,s);i(this,t,L).call(this,"[");let a="",r=1;for(;n(this,s)<this.template.length;){const l=this.template[n(this,s)];if(q(this,s)._++,a+=l,l==="[")r++;else if(l==="]"){if(r--,r===0&&i(this,t,x).call(this,"("))return i(this,t,L).call(this,"("),i(this,t,es).call(this,e,a.slice(0,-1));if(r===0)return{type:"Text",content:a,start:e,end:n(this,s)}}}return{type:"Text",content:a,start:e,end:n(this,s)}},es=function(e,a){const r=this.template.indexOf(")",n(this,s));if(r===-1)return S(this,s,this.template.length),{type:"Text",content:`[${a}(`,start:e,end:n(this,s)};const l=this.template.slice(n(this,s),r);S(this,s,r+1);const c=new Ne(a).parse();return c.forEach(v=>i(this,t,ne).call(this,v,e+1)),{type:"Markdown_Link",text:c,href:l,start:e,end:n(this,s)}},ts=function(){const e=n(this,s);let a;if(i(this,t,x).call(this,"http://")||i(this,t,x).call(this,"https://")||i(this,t,x).call(this,"//"))return a=i(this,t,de).call(this,r=>/[\s,<>]/.test(r)),{type:"Global_Link",href:a,start:e,end:n(this,s)};{const r=this.template[n(this,s)];return q(this,s)._++,{type:"Text",content:r,start:e,end:n(this,s)}}},ss=function(){const e=n(this,s);if(i(this,t,x).call(this,"/"))return i(this,t,L).call(this,"/"),{type:"Absolute_Link",href:"/"+i(this,t,de).call(this,r=>/[\s,<>]/.test(r)),start:e,end:n(this,s)};{const a=this.template[n(this,s)];return q(this,s)._++,{type:"Text",content:a,start:e,end:n(this,s)}}},ns=function(){const e=n(this,s);i(this,t,L).call(this,"<");const a=i(this,t,ls).call(this),r=/^[A-Z]/.test(a),l=i(this,t,is).call(this),c=i(this,t,as).call(this);let v=!1,f=null;if(i(this,t,x).call(this,"/>"))v=!0,f=c||null,i(this,t,L).call(this,"/>");else if(i(this,t,x).call(this,">"))i(this,t,L).call(this,">");else return i(this,t,vt).call(this,e);if(v)return{type:r?"Component":"Element",name:a,attributes:l,children:[],start:e,end:n(this,s),self_closing:v,self_closing_space:f,original_syntax:"html"};{const _=`</${a}>`;if(this.template.indexOf(_,n(this,s))!==-1){const g=i(this,t,_t).call(this,()=>this.template.startsWith(_,n(this,s)));return i(this,t,L).call(this,_),{type:r?"Component":"Element",name:a,attributes:l,children:g,start:e,end:n(this,s),self_closing:!1,self_closing_space:null,original_syntax:"html"}}else return i(this,t,vt).call(this,e)}},vt=function(e){return{type:"Text",content:this.template.slice(e,n(this,s)),start:e,end:n(this,s)}},as=function(){let e="";for(;n(this,s)<this.template.length&&/\s/.test(this.template[n(this,s)]);)e+=this.template[n(this,s)],q(this,s)._++;return e},is=function(){const e=[];for(;!(i(this,t,x).call(this,">")||i(this,t,x).call(this,"/>"));){const a=n(this,s);if(i(this,t,Je).call(this),i(this,t,x).call(this,">")||i(this,t,x).call(this,"/>")){S(this,s,a);break}const r=n(this,s),l=i(this,t,os).call(this);if(!l)break;let c=[];if(i(this,t,Je).call(this),i(this,t,x).call(this,"=")){i(this,t,L).call(this,"="),i(this,t,Je).call(this);const v=this.template[n(this,s)];if(v==='"'||v==="'"){i(this,t,L).call(this,v);const f=n(this,s),_=i(this,t,de).call(this,g=>g===v),m=n(this,s);i(this,t,L).call(this,v),c=[{type:"Text",content:_,start:f,end:m}]}else{const f=n(this,s),_=i(this,t,de).call(this,g=>/[\s/>]/.test(g)),m=n(this,s);c=[{type:"Text",content:_,start:f,end:m}]}}e.push({type:"Attribute",name:l,value:c,start:r,end:n(this,s),parent:null})}return e},rs=function(){const e=n(this,s);i(this,t,L).call(this,"{");const a=i(this,t,de).call(this,r=>r==="}");return i(this,t,L).call(this,"}"),{type:"Expression",content:a,start:e,end:n(this,s)}},_t=function(e){const a=[];for(;n(this,s)<this.template.length&&!e(this.template[n(this,s)]);){const r=i(this,t,dt).call(this);if(r.type==="Text"&&a.length>0&&a[a.length-1].type==="Text"){const l=a[a.length-1];l.content+=r.content,l.end=r.end}else a.push(r)}return a},os=function(){const e=n(this,s);for(;n(this,s)<this.template.length&&!/[\s=/>]/.test(this.template[n(this,s)]);)q(this,s)._++;return this.template.slice(e,n(this,s))},ls=function(){const e=n(this,s);for(;n(this,s)<this.template.length&&!/[\s/>]/.test(this.template[n(this,s)]);)q(this,s)._++;return this.template.slice(e,n(this,s))},ft=function(){const e=n(this,s);for(;n(this,s)<this.template.length&&/[a-zA-Z0-9_]/.test(this.template[n(this,s)]);)q(this,s)._++;return this.template.slice(e,n(this,s))},cs=function(e){const a=n(this,s);for(;n(this,s)<this.template.length&&this.template[n(this,s)]===e;)q(this,s)._++;return this.template.slice(a,n(this,s))},Je=function(){for(;n(this,s)<this.template.length&&/\s/.test(this.template[n(this,s)]);)q(this,s)._++},hs=function(){return i(this,t,x).call(this,"http://")||i(this,t,x).call(this,"https://")||i(this,t,x).call(this,"//")},gt=function(e){let a=0,r=n(this,s);for(;r<this.template.length&&this.template[r]===e;)a++,r++;return a},ds=function(){const e=n(this,s),a=n(this,s);let r="";for(;n(this,s)<this.template.length;){const f=n(this,s);for(;n(this,s)<this.template.length&&(this.template[n(this,s)]===" "||this.template[n(this,s)]==="	");)q(this,s)._++;if(i(this,t,x).call(this,"> "))i(this,t,L).call(this,"> ");else if(i(this,t,x).call(this,">"))i(this,t,L).call(this,">");else{S(this,s,f);break}const _=i(this,t,de).call(this,m=>m===`
`);if(r+=_,i(this,t,x).call(this,`
`))r+=`
`,i(this,t,L).call(this,`
`);else break}r.endsWith(`
`)&&(r=r.slice(0,-1));const c=new Ne(r).parse();c.forEach(f=>i(this,t,ne).call(this,f,a));const v=n(this,s);return{type:"Blockquote",children:c,start:e,end:v}},de=function(e){let a="";for(;n(this,s)<this.template.length&&!e(this.template[n(this,s)]);)a+=this.template[n(this,s)],q(this,s)._++;return a},ne=function(e,a){e.start+=a,e.end+=a,"children"in e&&Array.isArray(e.children)&&e.children.forEach(r=>i(this,t,ne).call(this,r,a)),"value"in e&&Array.isArray(e.value)&&e.value.forEach(r=>i(this,t,ne).call(this,r,a)),"attributes"in e&&Array.isArray(e.attributes)&&e.attributes.forEach(r=>i(this,t,ne).call(this,r,a)),"text"in e&&Array.isArray(e.text)&&e.text.forEach(r=>i(this,t,ne).call(this,r,a))};let ht=Ne;const us=new Set(["class","href","src","srcset","alt","title","name","width","height"]),Rs=(o,e=us)=>{let a;if("attributes"in o)for(const r of o.attributes){const{value:l}=r;if(o.type==="Component"||e.has(r.name)){let c="";for(const v of l)c+=v.content;c&&((a??(a=Object.create(null)))[r.name]=c)}}return a};var Zs=H('<code class="error_text"> </code>'),Vs=H("<code> </code>"),Js=H("<pre><code> </code></pre>"),Ks=H("<strong><!></strong>"),Xs=H("<em><!></em>"),Qs=H("<a> </a>"),Ys=H("<a> </a>"),$s=H("<a><!></a>"),en=H("<blockquote><!></blockquote>"),tn=H("<li><!></li>"),sn=H("<ul></ul>"),nn=H('<span class="error_text"> </span>');function ps(o,e){Me(e,!0);const a=(_,m=ot)=>{var g=F(),b=j(g);ze(b,17,m,Ke,(w,y)=>{ps(w,{get view(){return I(y)}})}),u(_,g)},r=zt.get(),l=ie(()=>e.view.type==="Component"&&e.view.name in r?r[e.view.name]:null),c=ie(()=>Rs(e.view));var v=F(),f=j(v);C(f,()=>e.view.type==="Component",_=>{var m=F(),g=j(m);C(g,()=>I(l),b=>{var w=F(),y=j(w);Bs(y,()=>I(l),A=>{Is(A,{})},(A,T)=>{var M=F(),k=j(M);zs(k,()=>I(T),(E,W)=>{W(E,Ns(()=>I(c),{children:(J,U)=>{var B=F(),K=j(B);C(K,()=>e.view.children,D=>{a(D,()=>e.view.children)}),u(J,B)},$$slots:{default:!0}}))}),u(A,M)}),u(b,w)},b=>{var w=Zs(),y=p(w);d(w),N(()=>V(y,`<${e.view.name??""} />`)),u(b,w)}),u(_,m)},_=>{var m=F(),g=j(m);C(g,()=>e.view.type==="Element",b=>{var w=F(),y=j(w);C(y,()=>e.view.self_closing,A=>{var T=F(),M=j(T);It(M,()=>e.view.name,!1,(k,E)=>{let W;N(()=>W=Xe(k,W,{...I(c)},void 0,k.namespaceURI!==rt,k.nodeName.includes("-")))}),u(A,T)},A=>{var T=F(),M=j(T);It(M,()=>e.view.name,!1,(k,E)=>{let W;N(()=>W=Xe(k,W,{...I(c)},void 0,k.namespaceURI!==rt,k.nodeName.includes("-"))),a(E,()=>e.view.children)}),u(A,T)}),u(b,w)},b=>{var w=F(),y=j(w);C(y,()=>e.view.type==="Text",A=>{var T=at();N(()=>V(T,e.view.content)),u(A,T)},A=>{var T=F(),M=j(T);C(M,()=>e.view.type==="Code",k=>{var E=Vs(),W=p(E);d(E),N(()=>V(W,e.view.content)),u(k,E)},k=>{var E=F(),W=j(E);C(W,()=>e.view.type==="Code_Block",J=>{var U=Js(),B=p(U),K=p(B);d(B),d(U),N(()=>{Ls(B,e.view.language),V(K,e.view.content)}),u(J,U)},J=>{var U=F(),B=j(U);C(B,()=>e.view.type==="Bold",K=>{var D=Ks(),Fe=p(D);a(Fe,()=>e.view.children),d(D),u(K,D)},K=>{var D=F(),Fe=j(D);C(Fe,()=>e.view.type==="Italic",re=>{var X=Xs(),je=p(X);a(je,()=>e.view.children),d(X),u(re,X)},re=>{var X=F(),je=j(X);C(je,()=>e.view.type==="Mention",oe=>{Hs(oe,{get name(){return e.view.name}})},oe=>{var Se=F(),Qe=j(Se);C(Qe,()=>e.view.type==="Hashtag",pe=>{Cs(pe,{get name(){return e.view.name}})},pe=>{var Be=F(),Ee=j(Be);C(Ee,()=>e.view.type==="Absolute_Link",me=>{var P=Qs(),ve=p(P);d(P),N(()=>{Ve(P,"href",e.view.href),V(ve,e.view.href)}),u(me,P)},me=>{var P=F(),ve=j(P);C(ve,()=>e.view.type==="Global_Link",_e=>{var R=Ys(),fe=p(R);d(R),N(()=>{Ve(R,"href",e.view.href),V(fe,e.view.href)}),u(_e,R)},_e=>{var R=F(),fe=j(R);C(fe,()=>e.view.type==="Expression",Le=>{var Q=at();N(()=>V(Q,e.view.content)),u(Le,Q)},Le=>{var Q=F(),De=j(Q);C(De,()=>e.view.type==="Markdown_Link",le=>{var Y=$s(),ge=p(Y);a(ge,()=>e.view.text),d(Y),N(()=>Ve(Y,"href",e.view.href)),u(le,Y)},le=>{var Y=F(),ge=j(Y);C(ge,()=>e.view.type==="Blockquote",be=>{var ee=en(),ce=p(ee);a(ce,()=>e.view.children),d(ee),u(be,ee)},be=>{var ee=F(),ce=j(ee);C(ce,()=>e.view.type==="List",ye=>{var Z=sn();ze(Z,21,()=>e.view.items,Ke,(He,Ce)=>{var we=tn(),Ge=p(we);a(Ge,()=>I(Ce).children),d(we),u(He,we)}),d(Z),u(ye,Z)},ye=>{var Z=nn(),He=p(Z);d(Z),N(()=>V(He,`Unknown node type: ${e.view.type??""}`)),u(ye,Z)},!0),u(be,ee)},!0),u(le,Y)},!0),u(Le,Q)},!0),u(_e,R)},!0),u(me,P)},!0),u(pe,Be)},!0),u(oe,Se)},!0),u(re,X)},!0),u(K,D)},!0),u(J,U)},!0),u(k,E)},!0),u(A,T)},!0),u(b,w)},!0),u(_,m)}),u(o,v),Ae()}function ae(o,e){Me(e,!0);const a=ie(()=>Ps(e.content));var r=F(),l=j(r);ze(l,16,()=>I(a),c=>c,(c,v)=>{ps(c,{get view(){return v}})}),u(o,r),Ae()}var an=H('<div class="spaced"><!></div>'),rn=H('<div class="playground svelte-1i3lwl0"><textarea class="svelte-1i3lwl0"></textarea> <div class="preview svelte-1i3lwl0"></div></div>');function on(o,e){Me(e,!0);let r=ct(e,"value",15,`*bold* _italics_ \`code\`

#hashtag and @mention

/root/link

network link - //github.com/ryanatkn/end-user-markdown-sketch

<aside>basic safe <a href="https://wikipedia.org/wiki/HTML">html</a> works</aside>

<span class="chip success">class</span> is allowed but <span class="chip" style="color: red">style</span> and most other attributes are not yet - it should support a safe and configurable subset of HTML, not every usecase has the same needs

<button onclick="alert('hax')" title="this button tries to hack you with the onclick attribute but the attribute allowlist disallows it">onclick does not work</button>`);const l=ie(()=>r().split(`
`).filter(Boolean));var c=rn(),v=p(c);Os(v);var f=h(v,2);ze(f,21,()=>I(l),Ke,(_,m)=>{var g=an(),b=p(g);ae(b,{get content(){return I(m)}}),d(g),u(_,g)}),d(f),d(c),Gs(v,r),u(o,c),Ae()}var ln=H('<div class="markdown_text_example panel svelte-6ael15"><!> <!> <p><!></p> <!></div>');function O(o,e){Me(e,!0);var a=ln(),r=p(a);lt(r,()=>e.children??ot);var l=h(r,2);se(l,{get content(){return e.content}});var c=h(l,2),v=p(c);ae(v,{get content(){return e.content}}),d(c);var f=h(c,2);lt(f,()=>e.after??ot),d(a),u(o,a),Ae()}var cn=H("<p>Element classes are a powerful and safe way for end-users to access the app's styles:</p>"),hn=H("<li><a> </a></li>"),dn=H(`<p>Perhaps an optional Svelte component can be provided for missing components, and
							plaintext is rendered if none is provided.</p>`),un=H("<p>If a component isn't found, it renders a fallback that preserves the source text:</p>"),pn=H(`<main class="width_md svelte-1m5pajl"><div class="width_full"><section class="panel p_md section_xl svelte-1m5pajl"><div class="panel_inner svelte-1m5pajl"><h2 id="motivation" class="svelte-1m5pajl">Motivation</h2> <p>Many social websites provide rich text features to end-users like <!>. Markdown is the common
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
						as data and formatting isn't a thing</li></ul></section></section> <section class="panel p_md section_xl svelte-1m5pajl"><div class="panel_inner svelte-1m5pajl"><div><h2 id="playground" class="svelte-1m5pajl">Playground</h2> <p>These examples are specific to this context's configuration. Each feature is optional
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
					no components. This example app provides the following components:</p> <ul></ul> <!> <!> <!> <!></section></section> <section class="panel p_md section_xl svelte-1m5pajl"><section class="panel_inner svelte-1m5pajl"><h2 id="discussions" class="svelte-1m5pajl">Discussions</h2> <ul><li><a href="https://github.com/ryanatkn/end-user-markdown-sketch/discussions/2">Questions or comments?</a></li> <li><a href="https://github.com/ryanatkn/end-user-markdown-sketch/discussions/1">Newline behavior</a></li></ul></section></section></div></main>`);function kn(o,e){Me(e,!0);const a=zt.get();var r=pn(),l=p(r),c=p(l),v=p(c),f=h(p(v),2),_=h(p(f));ae(_,{content:"*bold* text and @mentions and #hashtags"}),z(),d(f),z(10),d(v),d(c);var m=h(c,4),g=p(m),b=h(p(g),2);on(b,{});var w=h(b,2),y=p(w),A=h(p(y));ae(A,{content:"@fox"});var T=h(A,2);ae(T,{content:"@dog"});var M=h(T,2);ae(M,{content:"@mentions and #hashtags"}),d(y),d(w),d(g),d(m);var k=h(m,4),E=p(k),W=h(p(E),2),J=h(p(W),4),U=p(J);se(U,{content:'<Markdown content="hey @you" />'});var B=h(U,2),K=p(B);ae(K,{content:"hey @you"}),d(B),d(J);var D=h(J,4),Fe=h(p(D),7);se(Fe,{content:'<Mention name="you" />',pre_attrs:{style:"display: inline"}}),z(),d(D),z(2),d(W),d(E);var re=h(E,2),X=h(p(re),2);O(X,{content:"<aside>example HTML tag</aside>"});var je=h(X,2);O(je,{content:`<aside>
	<blockquote>
		<aside>example nesting</aside>
		<details><summary>example summary</summary>hidden details</details>
	</blockquote>
</aside>`}),d(re);var oe=h(re,2),Se=h(p(oe),4),Qe=ie(()=>`export const ALLOWED_HTML_ATTRS = new Set([
	${Array.from(us).map(ke=>`'${ke}'`).join(", ")}
]);`);se(Se,{lang:"ts",get content(){return I(Qe)}});var pe=h(Se,4);O(pe,{content:`with class:
<span class="chip">.chip</span>`,children:(ke,he)=>{var te=cn();u(ke,te)},$$slots:{default:!0}});var Be=h(pe,2);O(Be,{content:`safe attributes work:
<img
	src="${Ws}/favicon.png"
	alt="a little yellow spider"
	title="this site's favicon"
	width="128"
	height="128"
	class="pixelated"
/>`}),d(oe);var Ee=h(oe,2),me=h(p(Ee),2);O(me,{content:"*asterisks* are replaced with a <code>strong</code> tag"});var P=h(me,2);O(P,{content:"_underscores_ are replaced with an <code>em</code> tag"});var ve=h(P,2);O(ve,{content:"`backticks` are replaced with a <code>code</code> tag"});var _e=h(ve,2),R=h(p(_e),2),fe=h(p(R),8),Le=h(p(fe));ae(Le,{content:"`known_identifiers`"}),z(),d(fe),z(2),d(R),d(_e),d(Ee);var Q=h(Ee,2),De=h(p(Q),2);O(De,{content:"/root link to the current base (like GitHub's flavor, not necessarily absolute to the host!)"});var le=h(De,2),Y=h(p(le),2);se(Y,{inline:!0,content:'<Link href="{base}/path" />'}),d(le);var ge=h(le,2);O(ge,{content:"network link to <code>https:</code> - //github.com/ryanatkn/end-user-markdown-sketch"});var be=h(ge,2),ee=h(p(be),2);se(ee,{inline:!0,content:'<Link href="https://path" />'}),d(be),z(2),d(Q);var ce=h(Q,2),ye=h(p(ce),2);O(ye,{content:"@username mentions have contextmenus"});var Z=h(ye,2),He=h(p(Z),3);se(He,{inline:!0,content:'<Mention name="username" />'}),z(),d(Z),z(2),d(ce);var Ce=h(ce,2),we=h(p(Ce),2);O(we,{content:"#hashtags have contextmenus"});var Ge=h(we,2),ms=h(p(Ge),3);se(ms,{inline:!0,content:'<Hashtag name="hashtags" />'}),z(),d(Ge),z(2),d(Ce);var bt=h(Ce,2),Ye=h(p(bt),4),vs=h(p(Ye));vs.textContent="<This />",z(),d(Ye);var $e=h(Ye,2);ze($e,21,()=>Object.keys(a),Ke,(ke,he)=>{var te=hn(),Ie=p(te),fs=p(Ie);d(Ie),d(te),N(()=>{Ve(Ie,"href",`https://github.com/ryanatkn/end-user-markdown-sketch/blob/main/src/routes/${I(he)??""}.svelte`),V(fs,I(he))}),u(ke,te)}),d($e);var yt=h($e,2);O(yt,{content:'<Link href="/route">this Link</Link> does the same as /route'});var wt=h(yt,2);O(wt,{content:'mentioning <Mention name="username" /> the long way'});var kt=h(wt,2);O(kt,{content:'<Hashtag name="this" /> is equivalent to #this'});var _s=h(kt,2);O(_s,{content:"<Missing /> components are called out",after:he=>{var te=dn();u(he,te)},children:(he,te)=>{var Ie=un();u(he,Ie)},$$slots:{default:!0}}),d(bt),d(k),z(2),d(l),d(r),u(o,r),Ae()}export{kn as component};
