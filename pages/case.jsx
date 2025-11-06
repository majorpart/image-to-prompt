import SEOHead from '../components/SEOHead';
import Script from 'next/script';

export async function getServerSideProps() {
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
    const data = PAGES?.case;
    
    if (!data) {
      throw new Error('Case page content not found');
    }
    
    return {
      props: {
        data: {
          title: data.title || 'Case',
          description: data.description || '',
          canonical: data.canonical || 'https://imagetoprompt.app/case',
          html: data.html || '',
          styles: data.styles || ''
        }
      }
    };
  } catch (error) {
    console.error('[SSR] Error loading case page:', error.message);
    return {
      props: {
        data: {
          title: 'Case',
          description: 'Case Studies',
          canonical: 'https://imagetoprompt.app/case',
          html: '<div class="container mx-auto px-4 py-16"><h1>Error loading content.</h1></div>',
          styles: ''
        }
      }
    };
  }
}

export default function Case({ data }) {
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
