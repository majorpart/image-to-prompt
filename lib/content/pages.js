// 硬编码的页面内容
// 动态加载生成的内容模块

export function getPageContent(slug) {
  const key = slug || 'home';
  
  // 使用与首页相同的方式加载内容，避免 webpack 动态 require 问题
  try {
    const path = require('path');
    const fs = require('fs');
    
    // 尝试多种路径解析方式
    const possiblePaths = [
      path.resolve(process.cwd(), 'lib', 'content', 'generated', 'pages.js'),
      path.join(process.cwd(), 'lib', 'content', 'generated', 'pages.js')
    ];
    
    let genPath = null;
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        genPath = testPath;
        break;
      }
    }
    
    if (!genPath) {
      throw new Error(`Content file not found`);
    }
    
    // 直接读取文件内容并解析，避免 webpack 动态 require 问题
    const fileContent = fs.readFileSync(genPath, 'utf8');
    
    // 解析 CommonJS 模块格式
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
      // 如果 vm 执行失败，尝试 eval（仅用于开发环境）
      // eslint-disable-next-line no-eval
      eval(`
        (function(module, exports) {
          ${fileContent}
        })(moduleObj, moduleObj.exports)
      `);
    }
    
    const PAGES = moduleObj.exports.PAGES || moduleObj.exports.default?.PAGES;
    
    if (PAGES && PAGES[key]) {
      return PAGES[key];
    }
  } catch (e) {
    console.warn('Failed to load generated pages:', e.message);
  }
  
  // 降级方案
  return {
    slug: key,
    title: 'Not Found',
    description: '',
    html: '<p>Content not available.</p>',
    canonical: `https://imagetoprompt.app/${key === 'home' ? '' : key}`,
    styles: ''
  };
}

export function getAllPages() {
  try {
    const path = require('path');
    const fs = require('fs');
    
    // 尝试多种路径解析方式
    const possiblePaths = [
      path.resolve(process.cwd(), 'lib', 'content', 'generated', 'pages.js'),
      path.join(process.cwd(), 'lib', 'content', 'generated', 'pages.js')
    ];
    
    let genPath = null;
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        genPath = testPath;
        break;
      }
    }
    
    if (!genPath) {
      return [];
    }
    
    // 直接读取文件内容并解析，避免 webpack 动态 require 问题
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
      // 如果 vm 执行失败，尝试 eval（仅用于开发环境）
      // eslint-disable-next-line no-eval
      eval(`
        (function(module, exports) {
          ${fileContent}
        })(moduleObj, moduleObj.exports)
      `);
    }
    
    const PAGES = moduleObj.exports.PAGES || moduleObj.exports.default?.PAGES;
    
    if (PAGES) {
      return Object.values(PAGES);
    }
  } catch (e) {
    console.warn('Failed to load generated pages:', e.message);
  }
  
  return [];
}

