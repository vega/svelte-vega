import"../sb-preview/runtime.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))_(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&_(r)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function _(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const E="modulepreload",f=function(n,o){return new URL(n,o).href},u={},l=function(o,s,_){if(!s||s.length===0)return o();const t=document.getElementsByTagName("link");return Promise.all(s.map(e=>{if(e=f(e,_),e in u)return;u[e]=!0;const r=e.endsWith(".css"),d=r?'[rel="stylesheet"]':"";if(!!_)for(let c=t.length-1;c>=0;c--){const a=t[c];if(a.href===e&&(!r||a.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${d}`))return;const i=document.createElement("link");if(i.rel=r?"stylesheet":E,r||(i.as="script",i.crossOrigin=""),i.href=e,document.head.appendChild(i),r)return new Promise((c,a)=>{i.addEventListener("load",c),i.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>o()).catch(e=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=e,window.dispatchEvent(r),!r.defaultPrevented)throw e})},{createBrowserChannel:m}=__STORYBOOK_MODULE_CHANNELS__,{addons:w}=__STORYBOOK_MODULE_PREVIEW_API__,O=m({page:"preview"});w.setChannel(O);window.__STORYBOOK_ADDONS_CHANNEL__=O;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=O);const R={"./stories/SvelteVegaDemo.stories.js":async()=>l(()=>import("./SvelteVegaDemo.stories-376f8aaa.js"),["./SvelteVegaDemo.stories-376f8aaa.js","./index-b18406a2.js","./GitHub-b5b1d42a.js","./_commonjsHelpers-725317a4.js","./SvelteVegaDemo.stories-3f13228d.css"],import.meta.url),"./stories/SvelteVegaLiteDemo.stories.js":async()=>l(()=>import("./SvelteVegaLiteDemo.stories-2efafab5.js"),["./SvelteVegaLiteDemo.stories-2efafab5.js","./index-b18406a2.js","./GitHub-b5b1d42a.js","./_commonjsHelpers-725317a4.js","./SvelteVegaDemo.stories-3f13228d.css"],import.meta.url)};async function p(n){return R[n]()}const{composeConfigs:S,PreviewWeb:P,ClientApi:T}=__STORYBOOK_MODULE_PREVIEW_API__,h=async()=>{const n=await Promise.all([l(()=>import("./entry-preview-180094d8.js"),["./entry-preview-180094d8.js","./index-b18406a2.js"],import.meta.url),l(()=>import("./entry-preview-docs-32565f0e.js"),["./entry-preview-docs-32565f0e.js","./_commonjsHelpers-725317a4.js"],import.meta.url),l(()=>import("./preview-0b9869e2.js"),[],import.meta.url)]);return S(n)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new P;window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;window.__STORYBOOK_CLIENT_API__=window.__STORYBOOK_CLIENT_API__||new T({storyStore:window.__STORYBOOK_PREVIEW__.storyStore});window.__STORYBOOK_PREVIEW__.initialize({importFn:p,getProjectAnnotations:h});
