import SEOHead from '../components/SEOHead';
import Script from 'next/script';

export async function getServerSideProps() {
  // 使用与首页相同的加载方式
  const path = require('path');
  const fs = require('fs');
  let genPath;
  
  try {
    const possiblePaths = [
      path.resolve(process.cwd(), 'lib', 'content', 'generated', 'pages.js'),
      path.join(process.cwd(), 'lib', 'content', 'generated', 'pages.js')
    ];
    
    genPath = null;
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        genPath = testPath;
        break;
      }
    }
    
    if (!genPath) {
      throw new Error('Content file not found');
    }
    
    // 直接读取文件内容并解析
    const fileContent = fs.readFileSync(genPath, 'utf8');
    const moduleExports = {};
    const moduleObj = { exports: moduleExports };
    
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
      vm.runInContext(fileContent, context);
    } catch (vmError) {
      // eslint-disable-next-line no-eval
      eval(`
        (function(module, exports) {
          ${fileContent}
        })(moduleObj, moduleObj.exports)
      `);
    }
    
    const PAGES = moduleObj.exports.PAGES || moduleObj.exports.default?.PAGES;
    const data = PAGES?.about;
    
    if (!data) {
      throw new Error('About page content not found');
    }
    
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
