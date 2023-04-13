import{S as E,i as G,s as I,q as d,r as b,u as A,j as W,v as m,w as B,a as H,x as l,m as F,y as C,b as J,t as K,d as O,n as N,A as P,z as Q}from"./index-74ba2a5f.js";import{a as R,g as X,d as Y}from"./GitHub-aabaedc4.js";function j(s){let e,t;return{c(){e=d("p"),t=A(s[1])},m(n,i){H(n,e,i),l(e,t)},p(n,i){i&2&&Q(t,n[1])},d(n){n&&O(e)}}}function Z(s){let e,t,n,i,v,u,_,r,p,c,f,k,q,g,D,y,w,V;g=new R({props:{data:s[2],spec:s[3],options:s[0],signalListeners:{select:s[5]}}});let a=s[1]!==""&&j(s);return{c(){e=d("main"),t=d("div"),n=d("div"),i=d("h3"),i.innerHTML="<code>&lt;VegaLite&gt;</code> Svelte Component",v=b(),u=d("button"),u.textContent="Update Data",_=b(),r=d("button"),p=d("img"),f=b(),k=d("div"),k.textContent="View on GitHub",q=A(`
	Will recompile when spec changes and update when data changes.
	`),W(g.$$.fragment),D=b(),a&&a.c(),m(u,"class","common-button svelte-14y2pdq"),m(n,"class","row-content svelte-14y2pdq"),B(p.src,c=X)||m(p,"src",c),m(p,"alt","github mark"),m(p,"class","svelte-14y2pdq"),m(r,"class","github-button svelte-14y2pdq"),m(t,"class","head svelte-14y2pdq"),m(e,"class","content svelte-14y2pdq")},m(o,h){H(o,e,h),l(e,t),l(t,n),l(n,i),l(n,v),l(n,u),l(t,_),l(t,r),l(r,p),l(r,f),l(r,k),l(e,q),F(g,e,null),l(e,D),a&&a.m(e,null),y=!0,w||(V=[C(u,"click",s[4]),C(r,"click",s[6])],w=!0)},p(o,[h]){const L={};h&4&&(L.data=o[2]),h&1&&(L.options=o[0]),g.$set(L),o[1]!==""?a?a.p(o,h):(a=j(o),a.c(),a.m(e,null)):a&&(a.d(1),a=null)},i(o){y||(J(g.$$.fragment,o),y=!0)},o(o){K(g.$$.fragment,o),y=!1},d(o){o&&O(e),N(g),a&&a.d(),w=!1,P(V)}}}function x(s,e,t){let{options:n={}}=e,i="",v=Y,u={$schema:"https://vega.github.io/schema/vega-lite/v5.json",description:"A simple bar chart with embedded data.",data:{name:"table"},params:[{name:"select",select:{type:"point",encodings:["x"]}}],mark:{type:"bar",cursor:"pointer"},encoding:{x:{field:"category",type:"nominal"},y:{field:"amount",type:"quantitative"},fillOpacity:{condition:{param:"select",value:1},value:.3}}};function _(){const c=[];for(let f=1;f<=20;f++)c.push({amount:Math.round(Math.random()*100),category:String.fromCharCode(65+f)});t(2,v={table:c})}function r(...c){c[1].category!==void 0?t(1,i=`selected column(s): ${c[1].category}`):t(1,i="")}const p=()=>window.open("https://github.com/vega/svelte-vega");return s.$$set=c=>{"options"in c&&t(0,n=c.options)},[n,i,v,u,_,r,p]}class U extends E{constructor(e){super(),G(this,e,x,Z,I,{options:0})}}const z=U;U.__docgen={version:3,name:"SvelteVegaLiteDemo.svelte",data:[{visibility:"public",description:null,keywords:[],name:"options",kind:"let",static:!1,readonly:!1,type:{kind:"type",text:"object",type:"object"}}],computed:[],methods:[],components:[],description:null,keywords:[],events:[],slots:[],refs:[]};const ae={title:"svelte-vega/VegaLite",component:z,argTypes:{}},ee=()=>({Component:z}),S=ee.bind({});var $,M,T;S.parameters={...S.parameters,docs:{...($=S.parameters)==null?void 0:$.docs,source:{originalSource:`() => ({
  Component: SvelteVegaLiteDemo
})`,...(T=(M=S.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};const se=["Demo"];export{S as Demo,se as __namedExportsOrder,ae as default};
//# sourceMappingURL=SvelteVegaLiteDemo.stories-0c7266ac.js.map
