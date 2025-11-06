"use strict";(()=>{var e={};e.id=820,e.ids=[820,660],e.modules={1323:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},5836:(e,t,r)=>{r.r(t),r.d(t,{config:()=>P,default:()=>m,getServerSideProps:()=>h,getStaticPaths:()=>g,getStaticProps:()=>x,reportWebVitals:()=>S,routeModule:()=>A,unstable_getServerProps:()=>y,unstable_getServerSideProps:()=>_,unstable_getStaticParams:()=>v,unstable_getStaticPaths:()=>j,unstable_getStaticProps:()=>b});var n={};r.r(n),r.d(n,{default:()=>f});var a=r(7093),s=r(5244),i=r(1323),o=r(7997),l=r(784),c=r(997);r(6689);let u=require("next/error");var d=r.n(u);function p({statusCode:e,hasGetInitialPropsRun:t,err:r}){return!t&&r?null:c.jsx(d(),{statusCode:e})}p.getInitialProps=async({res:e,err:t,asPath:r})=>{let n=await d().getInitialProps({res:e,err:t});return(n.hasGetInitialPropsRun=!0,e?.statusCode===404)?{statusCode:404}:(t&&console.error("Error in _error.js:",t),n)};let f=p,m=(0,i.l)(n,"default"),x=(0,i.l)(n,"getStaticProps"),g=(0,i.l)(n,"getStaticPaths"),h=(0,i.l)(n,"getServerSideProps"),P=(0,i.l)(n,"config"),S=(0,i.l)(n,"reportWebVitals"),b=(0,i.l)(n,"unstable_getStaticProps"),j=(0,i.l)(n,"unstable_getStaticPaths"),v=(0,i.l)(n,"unstable_getStaticParams"),y=(0,i.l)(n,"unstable_getServerProps"),_=(0,i.l)(n,"unstable_getServerSideProps"),A=new a.PagesRouteModule({definition:{kind:s.x.PAGES,page:"/_error",pathname:"/_error",bundlePath:"",filename:""},components:{App:l.default,Document:o.default},userland:n})},784:(e,t,r)=>{r.r(t),r.d(t,{default:()=>l});var n=r(997),a=r(968),s=r.n(a),i=r(4298),o=r.n(i);function l({Component:e,pageProps:t}){return(0,n.jsxs)(n.Fragment,{children:[n.jsx(s(),{children:n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"})}),n.jsx(o(),{src:"https://cdn.tailwindcss.com",strategy:"beforeInteractive",onLoad:()=>{}}),n.jsx(e,{...t})]})}},7997:(e,t,r)=>{r.r(t),r.d(t,{default:()=>s});var n=r(997),a=r(6859);function s(){return(0,n.jsxs)(a.Html,{lang:"en",dir:"ltr",children:[(0,n.jsxs)(a.Head,{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{httpEquiv:"Content-Type",content:"text/html; charset=utf-8"}),n.jsx("meta",{httpEquiv:"X-UA-Compatible",content:"IE=edge"}),n.jsx("link",{rel:"icon",type:"image/x-icon",href:"/favicon.ico"}),n.jsx("link",{rel:"shortcut icon",type:"image/x-icon",href:"/favicon.ico"}),n.jsx("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),n.jsx("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:""}),n.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Slabo+27px:wght@400&display=swap",rel:"stylesheet"}),n.jsx("script",{dangerouslySetInnerHTML:{__html:`
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
          `}})]}),(0,n.jsxs)("body",{children:[n.jsx(a.Main,{}),n.jsx(a.NextScript,{})]})]})}},5244:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},968:e=>{e.exports=require("next/head")},6689:e=>{e.exports=require("react")},6405:e=>{e.exports=require("react-dom")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[859,298],()=>r(5836));module.exports=n})();