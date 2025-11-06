const fs = require('fs');
const path = require('path');

// 页面 URL 映射
const URL_MAP = {
  'index.html': '/',
  'about.html': '/about',
  'blog.html': '/blog',
  'case.html': '/case',
  'contact.html': '/contact',
  'faq.html': '/faq',
  'privacy-policy.html': '/privacy-policy',
  'terms-and-conditions.html': '/terms-and-conditions'
};

// 博客文章 URL 映射
const POST_URL_MAP = {
  'how-ai-image-generators-work.html': '/blog/how-ai-image-generators-work',
  'how-to-generate-prompt-from-image.html': '/blog/how-to-generate-prompt-from-image',
  'how-to-prompt-ai-to-create-image.html': '/blog/how-to-prompt-ai-to-create-image',
  'how-to-use-ai-image-generator-prompts.html': '/blog/how-to-use-ai-image-generator-prompts',
  'how-to-write-ai-prompts-for-images.html': '/blog/how-to-write-ai-prompts-for-images',
  'how-to-write-effective-image-prompts.html': '/blog/how-to-write-effective-image-prompts',
  'what-is-an-image-prompt-comprehensive-guide.html': '/blog/what-is-an-image-prompt-comprehensive-guide',
  'ai-art-prompt-engineering-complete-guide.html': '/blog/ai-art-prompt-engineering-complete-guide'
};

function optimizeLinks(html, currentFile) {
  let optimized = html;
  
  // 替换所有内部链接
  Object.entries(URL_MAP).forEach(([file, url]) => {
    const regex = new RegExp(`href=["']${file.replace(/\./g, '\\.')}["']`, 'gi');
    optimized = optimized.replace(regex, `href="${url}"`);
  });
  
  Object.entries(POST_URL_MAP).forEach(([file, url]) => {
    const regex = new RegExp(`href=["']${file.replace(/\./g, '\\.')}["']`, 'gi');
    optimized = optimized.replace(regex, `href="${url}"`);
  });
  
  // 添加 nofollow 到外部链接
  optimized = optimized.replace(
    /href=["'](https?:\/\/[^"']+)["']/gi,
    (match, url) => {
      // 如果是本站域名，不添加 nofollow
      if (url.includes('imagetoprompt.app')) {
        return match;
      }
      return `href="${url}" rel="noopener noreferrer"`;
    }
  );
  
  return optimized;
}

// 处理所有 HTML 文件
function processFiles() {
  const htmlDir = path.join(__dirname, '..');
  const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));
  
  if (files.length === 0) {
    console.log('No HTML files found to optimize.');
    return;
  }
  
  console.log('Optimizing internal links in HTML files...\n');
  
  files.forEach(file => {
    const filePath = path.join(htmlDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const optimized = optimizeLinks(content, file);
    fs.writeFileSync(filePath, optimized, 'utf8');
    console.log(`✓ Optimized: ${file}`);
  });
  
  console.log('\n✓ Internal link optimization complete!');
}

processFiles();

