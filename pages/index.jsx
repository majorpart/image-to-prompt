import SEOHead from '../components/SEOHead';
import Script from 'next/script';

export async function getServerSideProps() {
  try {
    // 使用包装文件避免 webpack 静态分析问题
    const { getPageBySlug } = await import('../lib/content/pages-wrapper.js');
    const data = await getPageBySlug('home');
    
    if (!data) {
      throw new Error('Home page content not found in PAGES');
    }
    
    // 验证数据
    if (!data.html || data.html.trim().length === 0) {
      throw new Error('Home page HTML content is empty');
    }
    
    return {
      props: {
        data: {
          title: data.title || 'Image to Prompt Generator',
          description: data.description || '',
          canonical: data.canonical || 'https://imagetoprompt.app/',
          html: data.html || '',
          styles: data.styles || ''
        }
      }
    };
  } catch (error) {
    console.error('[SSR] Error loading homepage:', error.message);
    return {
      props: {
        data: {
          title: 'Image to Prompt Generator',
          description: 'Free AI image to prompt generator',
          canonical: 'https://imagetoprompt.app/',
          html: '<div class="container mx-auto px-4 py-16"><h1>Error loading content. Please check server logs.</h1></div>',
          styles: ''
        }
      }
    };
  }
}

export default function Home({ data }) {
  return (
    <>
      <SEOHead
        title={data.title}
        description={data.description}
        canonical={data.canonical}
      />
      {/* 注入内联样式 - 必须在内容渲染之前 */}
      {data.styles && (
        <style dangerouslySetInnerHTML={{ __html: data.styles }} />
      )}
      {/* 原始HTML已经包含完整的导航和页脚，不需要Layout组件 */}
      {/* 渲染页面内容 */}
      <div dangerouslySetInnerHTML={{ __html: data.html }} />
      {/* 加载原有 JavaScript - 必须在内容之后加载 */}
      <Script 
        src="/js/languages.js" 
        strategy="afterInteractive"
        onLoad={() => {
          // 确保 LanguageSystem 加载后再加载 main.js
          if (typeof window !== 'undefined' && window.LanguageSystem) {
            console.log('[SSR] LanguageSystem loaded');
          }
        }}
      />
      <Script 
        src="/js/main.js" 
        strategy="afterInteractive"
        onLoad={() => {
          // 确保 main.js 加载后初始化应用
          if (typeof window !== 'undefined') {
            console.log('[SSR] main.js loaded');
            console.log('[SSR] ImageToPromptApp available:', !!window.ImageToPromptApp);
            console.log('[SSR] DOM ready state:', document.readyState);
            
            // 检查 DOM 元素是否存在
            const checkColumns = () => {
              const col1 = document.getElementById('testimonialsColumn1');
              const col2 = document.getElementById('testimonialsColumn2');
              const col3 = document.getElementById('testimonialsColumn3');
              console.log('[SSR] Testimonials columns exist:', {
                col1: !!col1,
                col2: !!col2,
                col3: !!col3
              });
              return col1 && col2 && col3;
            };
            
            // 使用更长的延迟确保 DOM 已经完全渲染（特别是通过 dangerouslySetInnerHTML 注入的内容）
            setTimeout(() => {
              // 等待 ImageToPromptApp 类可用
              if (!window.ImageToPromptApp) {
                console.warn('[SSR] ImageToPromptApp class not available, retrying...');
                setTimeout(() => {
                  if (window.ImageToPromptApp) {
                    initializeApp();
                  } else {
                    console.error('[SSR] ImageToPromptApp class still not available after retry');
                  }
                }, 500);
              } else {
                initializeApp();
              }
              
              function initializeApp() {
                // 如果 main.js 的自动初始化还没执行，我们手动初始化
                if (!window.imageToPromptApp && window.ImageToPromptApp) {
                  window.imageToPromptApp = new window.ImageToPromptApp();
                  console.log('[SSR] ImageToPromptApp initialized manually');
                }
                
                // 确保 generateTestimonials 被调用（即使已经初始化过）
                if (window.imageToPromptApp && typeof window.imageToPromptApp.generateTestimonials === 'function') {
                  // 延迟调用，确保 DOM 元素已准备好
                  setTimeout(() => {
                    if (checkColumns()) {
                      window.imageToPromptApp.generateTestimonials();
                      console.log('[SSR] generateTestimonials manually called');
                    } else {
                      console.warn('[SSR] Columns not found, retrying generateTestimonials...');
                      setTimeout(() => {
                        if (checkColumns()) {
                          window.imageToPromptApp.generateTestimonials();
                          console.log('[SSR] generateTestimonials called after retry');
                        }
                      }, 500);
                    }
                  }, 500);
                } else {
                  console.warn('[SSR] ImageToPromptApp or generateTestimonials not available:', {
                    imageToPromptApp: !!window.imageToPromptApp,
                    ImageToPromptApp: !!window.ImageToPromptApp,
                    generateTestimonials: window.imageToPromptApp ? typeof window.imageToPromptApp.generateTestimonials : 'N/A'
                  });
                }
              }
            }, 1000);
          }
        }}
      />
    </>
  );
}

