import"../sb-preview/runtime.mjs";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))_(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&_(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function _(t){if(t.ep)return;t.ep=!0;const e=i(t);fetch(t.href,e)}})();const m="modulepreload",R=function(r,o){return new URL(r,o).href},O={},a=function(o,i,_){if(!i||i.length===0)return o();const t=document.getElementsByTagName("link");return Promise.all(i.map(e=>{if(e=R(e,_),e in O)return;O[e]=!0;const n=e.endsWith(".css"),f=n?'[rel="stylesheet"]':"";if(!!_)for(let c=t.length-1;c>=0;c--){const l=t[c];if(l.href===e&&(!n||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${f}`))return;const s=document.createElement("link");if(s.rel=n?"stylesheet":m,n||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),n)return new Promise((c,l)=>{s.addEventListener("load",c),s.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>o())},{createChannel:S}=__STORYBOOK_MODULE_CHANNEL_POSTMESSAGE__,{createChannel:w}=__STORYBOOK_MODULE_CHANNEL_WEBSOCKET__,{addons:E}=__STORYBOOK_MODULE_PREVIEW_API__,d=S({page:"preview"});E.setChannel(d);window.__STORYBOOK_ADDONS_CHANNEL__=d;const{SERVER_CHANNEL_URL:u}=globalThis;if(u){const r=w({url:u});E.setServerChannel(r),window.__STORYBOOK_SERVER_CHANNEL__=r}const h={"./stories/SvelteVegaDemo.stories.js":async()=>a(()=>import("./SvelteVegaDemo.stories-ef6e9dd7.js"),["./SvelteVegaDemo.stories-ef6e9dd7.js","./index-74ba2a5f.js","./GitHub-aabaedc4.js","./SvelteVegaDemo.stories-3f13228d.css"],import.meta.url),"./stories/SvelteVegaLiteDemo.stories.js":async()=>a(()=>import("./SvelteVegaLiteDemo.stories-0c7266ac.js"),["./SvelteVegaLiteDemo.stories-0c7266ac.js","./index-74ba2a5f.js","./GitHub-aabaedc4.js","./SvelteVegaDemo.stories-3f13228d.css"],import.meta.url)};async function T(r){return h[r]()}const{composeConfigs:p,PreviewWeb:P,ClientApi:L}=__STORYBOOK_MODULE_PREVIEW_API__,y=async()=>{const r=await Promise.all([a(()=>import("./config-89594624.js"),["./config-89594624.js","./index-74ba2a5f.js"],import.meta.url),a(()=>import("./preview-0b9869e2.js"),[],import.meta.url)]);return p(r)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new P;window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;window.__STORYBOOK_CLIENT_API__=window.__STORYBOOK_CLIENT_API__||new L({storyStore:window.__STORYBOOK_PREVIEW__.storyStore});window.__STORYBOOK_PREVIEW__.initialize({importFn:T,getProjectAnnotations:y});
//# sourceMappingURL=iframe-7f999091.js.map
