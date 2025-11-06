import SEOHead from '../components/SEOHead';
import Script from 'next/script';

export async function getServerSideProps() {
  // 在函数顶层定义变量，确保在catch中也能访问
  const path = require('path');
  const fs = require('fs');
  let genPath;
  
  try {
    // 尝试多种路径解析方式，确保能找到文件
    // 在 Next.js 中，__dirname 可能不可用，所以优先使用 process.cwd()
    const possiblePaths = [
      path.resolve(process.cwd(), 'lib', 'content', 'generated', 'pages.js'),
      path.join(process.cwd(), 'lib', 'content', 'generated', 'pages.js')
    ];
    
    // 如果 __dirname 可用，也尝试
    try {
      if (typeof __dirname !== 'undefined') {
        possiblePaths.push(
          path.resolve(__dirname, '..', 'lib', 'content', 'generated', 'pages.js'),
          path.join(__dirname, '..', 'lib', 'content', 'generated', 'pages.js')
        );
      }
    } catch (e) {
      // __dirname 不可用，忽略
    }
    
    genPath = null;
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        genPath = testPath;
        break;
      }
    }
    
    console.log('[SSR] ========== START ==========');
    console.log('[SSR] Working directory:', process.cwd());
    console.log('[SSR] Content file path:', genPath);
    console.log('[SSR] File exists:', genPath ? fs.existsSync(genPath) : false);
    
    if (!fs.existsSync(genPath)) {
      throw new Error(`Content file not found: ${genPath}`);
    }
    
    // 直接读取文件内容并解析，避免 webpack 动态 require 问题
    let PAGES;
    try {
      const fileContent = fs.readFileSync(genPath, 'utf8');
      console.log('[SSR] File read successfully, length:', fileContent.length);
      
      // 解析 CommonJS 模块格式: module.exports = { PAGES: {...} };
      // 创建一个模拟的 module 对象来捕获导出
      const moduleExports = {};
      const moduleObj = { exports: moduleExports };
      
      // 执行文件内容（在服务器端，这是安全的）
      // eslint-disable-next-line no-eval
      const vm = require('vm');
      const context = vm.createContext({
        module: moduleObj,
        exports: moduleObj.exports,
        require: require,
        __dirname: path.dirname(genPath),
        __filename: genPath,
        console: console,
        process: process,
        Buffer: Buffer,
        global: global
      });
      
      try {
        // 使用 vm.runInContext 来执行文件内容
        vm.runInContext(fileContent, context);
        PAGES = moduleObj.exports.PAGES || moduleObj.exports.default?.PAGES;
      } catch (vmError) {
        // 如果 vm 执行失败，尝试简单的 eval（仅用于开发环境）
        console.warn('[SSR] VM execution failed, trying eval:', vmError.message);
        // eslint-disable-next-line no-eval
        eval(`
          (function(module, exports) {
            ${fileContent}
          })(moduleObj, moduleObj.exports)
        `);
        PAGES = moduleObj.exports.PAGES || moduleObj.exports.default?.PAGES;
      }
      
      console.log('[SSR] PAGES extracted, exists:', !!PAGES);
    } catch (readError) {
      console.error('[SSR] File read error:', readError.message);
      throw readError;
    }
    
    if (!PAGES || !PAGES.home) {
      console.error('[SSR] PAGES not found or PAGES.home not found');
      throw new Error('Home page content not found in PAGES');
    }
    
    const data = PAGES.home;
    console.log('[SSR] Data loaded - Title:', data.title);
    console.log('[SSR] Data loaded - HTML length:', data.html ? data.html.length : 0);
    
    // 验证数据
    if (!data.html || data.html.trim().length === 0) {
      console.error('[SSR] HTML content is empty');
      throw new Error('Home page HTML content is empty');
    }
    
    console.log('[SSR] Successfully loaded homepage content');
    console.log('[SSR] HTML length:', data.html.length);
    console.log('[SSR] ========== SUCCESS ==========');
    
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
    console.error('[SSR] ========== ERROR START ==========');
    console.error('[SSR] Error loading homepage:', error.message);
    console.error('[SSR] Error name:', error.name);
    console.error('[SSR] Error stack:', error.stack);
    if (genPath) {
      console.error('[SSR] Working directory:', process.cwd());
      console.error('[SSR] Content file path:', genPath);
      console.error('[SSR] File exists:', fs.existsSync(genPath));
    }
    console.error('[SSR] ========== ERROR END ==========');
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

