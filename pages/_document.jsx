import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        {/* 字符编码 - 必须在最前面 */}
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        
        {/* Google Fonts 预连接和样式表 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Slabo+27px:wght@400&display=swap"
          rel="stylesheet"
        />
        
        {/* Google AdSense - 所有页面都包含 */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5822504482860674"
          crossOrigin="anonymous"
        />

        {/* Google Analytics 4 - G-ZS7EJJ95YX */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZS7EJJ95YX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZS7EJJ95YX');
            `,
          }}
        />

        {/* Microsoft Clarity - 行为与会话监控 */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments);};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "tlhhu79v1b");
            `,
          }}
        />

        {/* 代码展示广告 - EffectiveGate CPM */}
        <script src="https://pl28855194.effectivegatecpm.com/d9/76/6f/d9766f3ba373c2f77764e508f5b49b69.js" />

        {/* 代码展示广告 - EffectiveGate CPM (pl28855206) + HighPerformanceFormat iframe */}
        <script src="https://pl28855206.effectivegatecpm.com/d4/95/4a/d4954a08d6ed703c04fcff52f1f16dcd.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key' : '5151bb26009578e5e2c373353fda0578',
                'format' : 'iframe',
                'height' : 300,
                'width' : 160,
                'params' : {}
              };
            `,
          }}
        />
        <script src="https://www.highperformanceformat.com/5151bb26009578e5e2c373353fda0578/invoke.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

