"use strict";(()=>{var e={};e.id=219,e.ids=[219,660],e.modules={1323:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},5048:(e,t,r)=>{r.r(t),r.d(t,{config:()=>h,default:()=>d,getServerSideProps:()=>g,getStaticPaths:()=>m,getStaticProps:()=>f,reportWebVitals:()=>x,routeModule:()=>y,unstable_getServerProps:()=>v,unstable_getServerSideProps:()=>j,unstable_getStaticParams:()=>b,unstable_getStaticPaths:()=>S,unstable_getStaticProps:()=>P});var n={};r.r(n),r.d(n,{default:()=>p,getServerSideProps:()=>u});var a=r(7093),i=r(5244),s=r(1323),o=r(7997),c=r(784);let l=["how-ai-image-generators-work","how-to-generate-prompt-from-image","how-to-prompt-ai-to-create-image","how-to-use-ai-image-generator-prompts","how-to-write-ai-prompts-for-images","how-to-write-effective-image-prompts","what-is-an-image-prompt-comprehensive-guide","ai-art-prompt-engineering-complete-guide"];async function u({params:e}){let{slug:t}=e;return l.includes(t)?{redirect:{destination:`/blog/${t}`,permanent:!0}}:{notFound:!0}}function p(){return null}let d=(0,s.l)(n,"default"),f=(0,s.l)(n,"getStaticProps"),m=(0,s.l)(n,"getStaticPaths"),g=(0,s.l)(n,"getServerSideProps"),h=(0,s.l)(n,"config"),x=(0,s.l)(n,"reportWebVitals"),P=(0,s.l)(n,"unstable_getStaticProps"),S=(0,s.l)(n,"unstable_getStaticPaths"),b=(0,s.l)(n,"unstable_getStaticParams"),v=(0,s.l)(n,"unstable_getServerProps"),j=(0,s.l)(n,"unstable_getServerSideProps"),y=new a.PagesRouteModule({definition:{kind:i.x.PAGES,page:"/[slug]",pathname:"/[slug]",bundlePath:"",filename:""},components:{App:c.default,Document:o.default},userland:n})},784:(e,t,r)=>{r.r(t),r.d(t,{default:()=>c});var n=r(997),a=r(968),i=r.n(a),s=r(4298),o=r.n(s);function c({Component:e,pageProps:t}){return(0,n.jsxs)(n.Fragment,{children:[n.jsx(i(),{children:n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"})}),n.jsx(o(),{src:"https://cdn.tailwindcss.com",strategy:"beforeInteractive",onLoad:()=>{}}),n.jsx(e,{...t})]})}},7997:(e,t,r)=>{r.r(t),r.d(t,{default:()=>i});var n=r(997),a=r(6859);function i(){return(0,n.jsxs)(a.Html,{lang:"en",dir:"ltr",children:[(0,n.jsxs)(a.Head,{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{httpEquiv:"Content-Type",content:"text/html; charset=utf-8"}),n.jsx("meta",{httpEquiv:"X-UA-Compatible",content:"IE=edge"}),n.jsx("link",{rel:"icon",type:"image/x-icon",href:"/favicon.ico"}),n.jsx("link",{rel:"shortcut icon",type:"image/x-icon",href:"/favicon.ico"}),n.jsx("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),n.jsx("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:""}),n.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Slabo+27px:wght@400&display=swap",rel:"stylesheet"}),n.jsx("script",{dangerouslySetInnerHTML:{__html:`
            (function() {
              var s = document.createElement('script');
              s.src = 'https://cdn.tailwindcss.com';
              s.async = false;
              s.defer = false;
              document.head.insertBefore(s, document.head.firstChild);
              s.onload = function() {
                if (typeof tailwind !== 'undefined') {
                  tailwind.config = {
                    theme: {
                      extend: {
                        colors: {
                          'primary-bg': '#1a1a1a',
                          'secondary-bg': '#2a2a2a',
                          'text-primary': '#ffffff',
                          'text-secondary': '#a0a0a0',
                          'accent-orange': '#ff6b35',
                          'accent-hover': '#e55a2b'
                        },
                        fontFamily: {
                          'slabo': ['Slabo 27px', 'serif']
                        }
                      }
                    }
                  };
                }
              };
            })();
          `}})]}),(0,n.jsxs)("body",{children:[n.jsx(a.Main,{}),n.jsx(a.NextScript,{})]})]})}},5244:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},968:e=>{e.exports=require("next/head")},6689:e=>{e.exports=require("react")},6405:e=>{e.exports=require("react-dom")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[859,298],()=>r(5048));module.exports=n})();