import SEOHead from '../../components/SEOHead';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export async function getServerSideProps({ params }) {
  console.log('[SSR] Loading blog post:', params.slug);
  
  try {
    // 使用 require 在运行时加载（CommonJS），避免 webpack 静态分析问题
    // 使用绝对路径确保在 Vercel serverless 环境中正确解析
    const path = require('path');
    const postsPath = path.resolve(process.cwd(), 'lib', 'content', 'generated', 'posts.js');
    const postsModule = require(postsPath);
    const POSTS = postsModule.POSTS || postsModule.default?.POSTS || postsModule;
    
    if (!POSTS) {
      console.error('[SSR] POSTS not found in module');
      return {
        notFound: true
      };
    }
    
    console.log('[SSR] POSTS loaded, available slugs:', Object.keys(POSTS).slice(0, 5));
    
    // 尝试直接匹配
    let post = POSTS[params.slug];
    
    // 如果直接匹配失败，尝试查找匹配的slug（处理可能的URL编码或大小写问题）
    if (!post) {
      const slugs = Object.keys(POSTS);
      const matchedSlug = slugs.find(s => 
        s.toLowerCase() === params.slug.toLowerCase() ||
        s.replace(/-/g, '') === params.slug.replace(/-/g, '')
      );
      
      if (matchedSlug) {
        console.log('[SSR] Found matching slug:', matchedSlug, 'for requested:', params.slug);
        post = POSTS[matchedSlug];
      }
    }
    
    if (!post) {
      console.error('[SSR] Post not found for slug:', params.slug);
      console.error('[SSR] Available slugs:', Object.keys(POSTS).slice(0, 10));
      return {
        notFound: true
      };
    }
    
    console.log('[SSR] Post found:', post.title);
    console.log('[SSR] Post has HTML:', !!post.html);
    console.log('[SSR] Post HTML length:', post.html ? post.html.length : 0);
    
    // 获取相关文章
    const allPosts = POSTS ? Object.values(POSTS) : [];
    const currentTags = post.tags || [];
    const relatedPosts = allPosts
      .filter(p => p.slug !== params.slug)
      .map(p => ({
        ...p,
        score: (p.tags || []).filter(tag => currentTags.includes(tag)).length
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    
    return {
      props: {
        post: {
          ...post,
          canonical: post.canonical || `https://imagetoprompt.app/blog/${params.slug}`
        },
        relatedPosts
      }
    };
  } catch (error) {
    console.error('[SSR] Error loading blog post:', error.message);
    console.error('[SSR] Error stack:', error.stack);
    return {
      notFound: true
    };
  }
}

export default function BlogPost({ post, relatedPosts }) {
  // JSON-LD 结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image ? (post.image.startsWith('http') ? post.image : `https://imagetoprompt.app${post.image}`) : '',
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Image to Prompt Generator Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Image to Prompt Generator'
    }
  };
  
  // 检查文章HTML是否包含完整的导航和页脚
  const hasFullHtml = post.html && (post.html.includes('<nav') || post.html.includes('<footer'));
  
  if (hasFullHtml) {
    // 如果包含完整HTML，直接渲染
    return (
      <>
        <SEOHead
          title={post.title}
          description={post.description}
          canonical={post.canonical}
          image={post.image}
          type="article"
        />
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </Head>
        {post.styles && (
          <style dangerouslySetInnerHTML={{ __html: post.styles }} />
        )}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <Script src="/js/languages.js" strategy="afterInteractive" />
        <Script src="/js/main.js" strategy="afterInteractive" />
      </>
    );
  }
  
  // 否则使用自定义布局
  return (
    <>
      <SEOHead
        title={post.title}
        description={post.description}
        canonical={post.canonical}
        image={post.image}
        type="article"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      {post.styles && (
        <style dangerouslySetInnerHTML={{ __html: post.styles }} />
      )}
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* 面包屑导航 - 内链优化 */}
        <nav className="mb-8 text-sm text-text-secondary">
          <Link href="/" className="hover:text-accent-orange">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-accent-orange">Blog</Link>
          <span className="mx-2">/</span>
          <span>{post.title}</span>
        </nav>
        
        {/* 文章头部 */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-text-secondary mb-4">
            <span>{post.date}</span>
            {post.author && (
              <span className="ml-4">By {post.author}</span>
            )}
          </div>
          {post.image && (
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          )}
        </header>
        
        {/* 文章内容 */}
        <div
          className="prose prose-lg max-w-none prose-invert"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        
        {/* 相关文章 - 内链建设 */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="mt-16 pt-8 border-t border-gray-800">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="block bg-secondary-bg rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {related.image && (
                    <div className="relative h-32 w-full">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{related.title}</h3>
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {related.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
      <Script src="/js/languages.js" strategy="afterInteractive" />
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}
