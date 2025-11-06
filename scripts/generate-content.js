const fs = require('fs');
const path = require('path');

// 配置
const HTML_DIR = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, '..', 'lib', 'content', 'generated');

// 页面映射（slug -> HTML文件名）
const PAGE_MAP = {
  'home': 'index.html',
  'about': 'about.html',
  'blog': 'blog.html',
  'case': 'case.html',
  'contact': 'contact.html',
  'faq': 'faq.html',
  'privacy-policy': 'privacy-policy.html',
  'terms-and-conditions': 'terms-and-conditions.html'
};

// 博客文章映射
const POST_MAP = {
  'how-ai-image-generators-work': 'how-ai-image-generators-work.html',
  'how-to-generate-prompt-from-image': 'how-to-generate-prompt-from-image.html',
  'how-to-prompt-ai-to-create-image': 'how-to-prompt-ai-to-create-image.html',
  'how-to-use-ai-image-generator-prompts': 'how-to-use-ai-image-generator-prompts.html',
  'how-to-write-ai-prompts-for-images': 'how-to-write-ai-prompts-for-images.html',
  'how-to-write-effective-image-prompts': 'how-to-write-effective-image-prompts.html',
  'what-is-an-image-prompt-comprehensive-guide': 'what-is-an-image-prompt-comprehensive-guide.html',
  'ai-art-prompt-engineering-complete-guide': 'ai-art-prompt-engineering-complete-guide.html'
};

// 提取 HTML 内容
function extractContent(htmlFile) {
  const content = fs.readFileSync(htmlFile, 'utf8');
  
  // 提取 <title>
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : '';
  
  // 提取 <meta name="description">
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  const description = descMatch ? descMatch[1] : '';
  
  // 提取 <link rel="canonical">
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : '';
  
  // 提取 <body> 内容
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : '';
  
  // 提取 <style> 标签
  const styleMatches = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  const styles = styleMatches.map(match => {
    const styleContent = match.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    return styleContent ? styleContent[1] : '';
  }).join('\n');
  
  // 博客文章 slug 列表（用于识别博客文章链接）
  const blogPostSlugs = Object.keys(POST_MAP);
  
  // 替换路径
  let processedBody = bodyContent
    // 移除 <script> 标签（Next.js 会通过 <Script> 组件加载）
    .replace(/<script[^>]*src=["']\/?js\/(languages|main)\.js["'][^>]*><\/script>/gi, '')
    .replace(/<script[^>]*src=["']\/?js\/(languages|main)\.js["'][^>]*>[\s\S]*?<\/script>/gi, '')
    // 替换 HTML 链接为 Next.js 路由
    .replace(/href=["']([^"']*\.html)["']/g, (match, url) => {
      if (url === 'index.html') return 'href="/"';
      const slug = url.replace('.html', '');
      // 检查是否是博客文章（包括所有可能的博客文章文件名）
      if (blogPostSlugs.includes(slug)) {
        return `href="/blog/${slug}"`;
      }
      // 检查是否是博客文章的文件名（如 blog-post-1.html）
      const blogPostMap = {
        'blog-post-1': 'how-to-write-effective-image-prompts',
        'blog-post-2': 'how-ai-image-generators-work',
        'blog-post-3': 'what-is-an-image-prompt-comprehensive-guide',
        'blog-post-4': 'ai-art-prompt-engineering-complete-guide'
      };
      if (blogPostMap[slug]) {
        return `href="/blog/${blogPostMap[slug]}"`;
      }
      return `href="/${slug}"`;
    })
    // 替换相对路径为绝对路径
    .replace(/src=["']assets\//g, 'src="/assets/')
    .replace(/src=["']js\//g, 'src="/js/')
    .replace(/href=["']assets\//g, 'href="/assets/')
    // 替换图片路径为 WebP（如果存在）
    .replace(/src=["']([^"']*\.(png|jpg|jpeg))["']/gi, (match, imgPath) => {
      // 如果已经是 WebP，保持不变；否则替换为 .webp
      if (imgPath.toLowerCase().endsWith('.webp')) {
        return match;
      }
      const webpPath = imgPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      return `src="${webpPath}"`;
    });
  
  return {
    title,
    description,
    canonical,
    html: processedBody,
    styles
  };
}

// 提取标签（从 HTML 内容中）
function extractTags(html) {
  // 尝试从 meta 标签提取
  const tagMatch = html.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i);
  if (tagMatch) {
    return tagMatch[1].split(',').map(t => t.trim()).filter(t => t);
  }
  return [];
}

// 提取主图（从 HTML 内容中）
function extractImage(html) {
  // 查找第一个图片
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  if (imgMatch) {
    let imgPath = imgMatch[1];
    // 转换为绝对路径
    if (!imgPath.startsWith('/') && !imgPath.startsWith('http')) {
      imgPath = '/' + imgPath;
    }
    // 转换为 WebP
    if (imgPath.match(/\.(png|jpg|jpeg)$/i)) {
      imgPath = imgPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    }
    return imgPath;
  }
  return '/assets/images/imagetoprompt.webp';
}

// 生成页面内容模块
function generatePagesModule() {
  const pages = {};
  
  for (const [slug, htmlFile] of Object.entries(PAGE_MAP)) {
    const filePath = path.join(HTML_DIR, htmlFile);
    if (fs.existsSync(filePath)) {
      pages[slug] = extractContent(filePath);
      pages[slug].slug = slug;
      console.log(`✓ Extracted: ${slug}`);
    } else {
      console.log(`⚠ File not found: ${htmlFile}`);
    }
  }
  
  const output = `// Auto-generated content module
// DO NOT EDIT MANUALLY - Generated by scripts/generate-content.js

module.exports = {
  PAGES: ${JSON.stringify(pages, null, 2)}
};
`;
  
  const outputPath = path.join(OUTPUT_DIR, 'pages.js');
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(outputPath, output, 'utf8');
  console.log(`\n✓ Generated: ${outputPath}`);
  return pages;
}

// 生成博客文章模块
function generatePostsModule() {
  const posts = {};
  
  for (const [slug, htmlFile] of Object.entries(POST_MAP)) {
    const filePath = path.join(HTML_DIR, htmlFile);
    if (fs.existsSync(filePath)) {
      const content = extractContent(filePath);
      posts[slug] = {
        slug,
        title: content.title,
        description: content.description,
        canonical: content.canonical,
        html: content.html,
        styles: content.styles,
        // 添加元数据
        date: new Date().toISOString().split('T')[0], // 默认日期，可以从HTML中提取
        author: 'Image to Prompt Generator Team',
        tags: extractTags(content.html),
        image: extractImage(content.html)
      };
      console.log(`✓ Extracted: ${slug}`);
    } else {
      console.log(`⚠ File not found: ${htmlFile}`);
    }
  }
  
  const output = `// Auto-generated posts module
// DO NOT EDIT MANUALLY - Generated by scripts/generate-content.js

module.exports = {
  POSTS: ${JSON.stringify(posts, null, 2)}
};
`;
  
  const outputPath = path.join(OUTPUT_DIR, 'posts.js');
  fs.writeFileSync(outputPath, output, 'utf8');
  console.log(`\n✓ Generated: ${outputPath}`);
  return posts;
}

// 主函数
function main() {
  console.log('Generating content modules...\n');
  console.log(`HTML Directory: ${HTML_DIR}`);
  console.log(`Output Directory: ${OUTPUT_DIR}\n`);
  
  try {
    generatePagesModule();
    generatePostsModule();
    console.log('\n✓ Content generation complete!');
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();

