// 此页面用于处理旧链接格式（没有 /blog/ 前缀）
// 重定向到正确的 /blog/[slug] 路由

const BLOG_POST_SLUGS = [
  'how-ai-image-generators-work',
  'how-to-generate-prompt-from-image',
  'how-to-prompt-ai-to-create-image',
  'how-to-use-ai-image-generator-prompts',
  'how-to-write-ai-prompts-for-images',
  'how-to-write-effective-image-prompts',
  'what-is-an-image-prompt-comprehensive-guide',
  'ai-art-prompt-engineering-complete-guide'
];

export async function getServerSideProps({ params }) {
  const { slug } = params;
  
  // 排除已知的页面路由，这些路由应该由对应的页面文件处理
  const reservedRoutes = ['blog', 'about', 'case', 'contact', 'faq', 'privacy-policy', 'terms-and-conditions'];
  if (reservedRoutes.includes(slug)) {
    // 如果是保留路由，返回 404，让对应的页面文件处理
    return {
      notFound: true
    };
  }
  
  // 检查是否是博客文章的slug
  if (BLOG_POST_SLUGS.includes(slug)) {
    // 服务器端重定向到 /blog/[slug]
    return {
      redirect: {
        destination: `/blog/${slug}`,
        permanent: true // 301 永久重定向
      }
    };
  }
  
  // 否则显示 404
  return {
    notFound: true
  };
}

// 这个组件永远不会被渲染（因为总是重定向）
export default function LegacyBlogPost() {
  return null;
}

