import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </Head>
      {/* Tailwind CSS CDN - 使用 Next.js Script 组件 */}
      <Script
        src="https://cdn.tailwindcss.com"
        strategy="beforeInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.tailwind) {
            window.tailwind.config = {
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
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

