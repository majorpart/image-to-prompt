// 硬编码的博客文章内容
// 动态加载生成的内容模块

// 通用的内容加载函数
function loadPostsModule() {
  try {
    const path = require('path');
    const fs = require('fs');
    
    // 尝试多种路径解析方式
    const possiblePaths = [
      path.resolve(process.cwd(), 'lib', 'content', 'generated', 'posts.js'),
      path.join(process.cwd(), 'lib', 'content', 'generated', 'posts.js')
    ];
    
    let genPath = null;
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        genPath = testPath;
        break;
      }
    }
    
    if (!genPath) {
      return null;
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
    
    return moduleObj.exports.POSTS || moduleObj.exports.default?.POSTS;
  } catch (e) {
    console.warn('Failed to load generated posts:', e.message);
    return null;
  }
}

export function getPostBySlug(slug) {
  const POSTS = loadPostsModule();
  
  if (POSTS && POSTS[slug]) {
    return POSTS[slug];
  }
  
  // 降级方案
  return {
    slug,
    title: 'Post Not Found',
    description: '',
    html: '<p>Post not available.</p>',
    canonical: `https://imagetoprompt.app/blog/${slug}`,
    styles: '',
    date: new Date().toISOString().split('T')[0],
    author: 'Image to Prompt Generator Team',
    tags: [],
    image: '/assets/images/imagetoprompt.webp'
  };
}

export function getAllPosts() {
  const POSTS = loadPostsModule();
  
  if (POSTS) {
    return Object.values(POSTS).sort((a, b) => {
      const dateA = new Date(a.date || 0);
      const dateB = new Date(b.date || 0);
      return dateB - dateA;
    });
  }
  
  return [];
}

export function getRelatedPosts(currentSlug, limit = 3) {
  const allPosts = getAllPosts();
  const currentPost = getPostBySlug(currentSlug);
  const currentTags = currentPost.tags || [];
  
  // 根据标签匹配度排序
  return allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => ({
      ...post,
      score: calculateRelevanceScore(post, currentTags)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function calculateRelevanceScore(post, currentTags) {
  const postTags = post.tags || [];
  const commonTags = currentTags.filter(tag => postTags.includes(tag));
  return commonTags.length;
}

