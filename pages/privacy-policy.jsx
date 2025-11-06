import SEOHead from '../components/SEOHead';
import Script from 'next/script';

export async function getServerSideProps() {
  try {
    // 使用 require 在运行时加载（CommonJS），避免 webpack 静态分析问题
    const pagesModule = require('../../lib/content/generated/pages.js');
    const PAGES = pagesModule.PAGES || pagesModule.default?.PAGES || pagesModule;
    
    if (!PAGES || !PAGES['privacy-policy']) {
      throw new Error('Privacy Policy page content not found');
    }
    
    const data = PAGES['privacy-policy'];
    
    return {
      props: {
        data: {
          title: data.title || 'Privacy Policy',
          description: data.description || '',
          canonical: data.canonical || 'https://imagetoprompt.app/privacy-policy',
          html: data.html || '',
          styles: data.styles || ''
        }
      }
    };
  } catch (error) {
    console.error('[SSR] Error loading privacy policy page:', error.message);
    return {
      props: {
        data: {
          title: 'Privacy Policy',
          description: 'Privacy Policy',
          canonical: 'https://imagetoprompt.app/privacy-policy',
          html: '<div class="container mx-auto px-4 py-16"><h1>Error loading content.</h1></div>',
          styles: ''
        }
      }
    };
  }
}

export default function PrivacyPolicy({ data }) {
  return (
    <>
      <SEOHead
        title={data.title}
        description={data.description}
        canonical={data.canonical}
      />
      {data.styles && (
        <style dangerouslySetInnerHTML={{ __html: data.styles }} />
      )}
      {/* 原始HTML已经包含完整的导航和页脚，不需要Layout组件 */}
      <div dangerouslySetInnerHTML={{ __html: data.html }} />
      <Script src="/js/languages.js" strategy="afterInteractive" />
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}
