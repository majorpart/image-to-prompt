import SEOHead from '../components/SEOHead';
import Script from 'next/script';

export async function getServerSideProps() {
  try {
    // 使用动态 import 确保 webpack 能够正确打包文件
    const pagesModule = await import('../lib/content/generated/pages.js');
    const PAGES = pagesModule.PAGES || pagesModule.default?.PAGES || pagesModule;
    
    if (!PAGES || !PAGES.about) {
      throw new Error('About page content not found');
    }
    
    const data = PAGES.about;
    
    return {
      props: {
        data: {
          title: data.title || 'About',
          description: data.description || '',
          canonical: data.canonical || 'https://imagetoprompt.app/about',
          html: data.html || '',
          styles: data.styles || ''
        }
      }
    };
  } catch (error) {
    console.error('[SSR] Error loading about page:', error.message);
    return {
      props: {
        data: {
          title: 'About',
          description: 'About Image to Prompt Generator',
          canonical: 'https://imagetoprompt.app/about',
          html: '<div class="container mx-auto px-4 py-16"><h1>Error loading content.</h1></div>',
          styles: ''
        }
      }
    };
  }
}

export default function About({ data }) {
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
