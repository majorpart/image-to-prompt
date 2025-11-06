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
        
        {/* Tailwind CSS CDN - 必须在文档级别同步加载 */}
        <script dangerouslySetInnerHTML={{
          __html: `
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
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

