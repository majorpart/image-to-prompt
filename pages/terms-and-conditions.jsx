import SEOHead from '../components/SEOHead';
import Script from 'next/script';

export async function getServerSideProps() {
  try {
    // 使用 require 在运行时加载（CommonJS），避免 webpack 静态分析问题
    // 使用绝对路径确保在 Vercel serverless 环境中正确解析
    const path = require('path');
    const pagesPath = path.resolve(process.cwd(), 'lib', 'content', 'generated', 'pages.js');
    const pagesModule = require(pagesPath);
    const PAGES = pagesModule.PAGES || pagesModule.default?.PAGES || pagesModule;
    
    if (!PAGES || !PAGES['terms-and-conditions']) {
      throw new Error('Terms and Conditions page content not found');
    }
    
    const data = PAGES['terms-and-conditions'];
    
    return {
      props: {
        data: {
          title: data.title || 'Terms and Conditions',
          description: data.description || '',
          canonical: data.canonical || 'https://imagetoprompt.app/terms-and-conditions',
          html: data.html || '',
          styles: data.styles || ''
        }
      }
    };
  } catch (error) {
    console.error('[SSR] Error loading terms and conditions page:', error.message);
    return {
      props: {
        data: {
          title: 'Terms and Conditions',
          description: 'Terms and Conditions',
          canonical: 'https://imagetoprompt.app/terms-and-conditions',
          html: '<div class="container mx-auto px-4 py-16"><h1>Error loading content.</h1></div>',
          styles: ''
        }
      }
    };
  }
}

export default function TermsAndConditions({ data }) {
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
