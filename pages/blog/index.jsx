import SEOHead from '../../components/SEOHead';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';

export async function getServerSideProps() {
  try {
    // 使用 require 在运行时加载（CommonJS），避免 webpack 静态分析问题
    // 使用绝对路径确保在 Vercel serverless 环境中正确解析
    const path = require('path');
    const pagesPath = path.resolve(process.cwd(), 'lib', 'content', 'generated', 'pages.js');
    const postsPath = path.resolve(process.cwd(), 'lib', 'content', 'generated', 'posts.js');
    const pagesModule = require(pagesPath);
    const postsModule = require(postsPath);
    
    const PAGES = pagesModule.PAGES || pagesModule.default?.PAGES || pagesModule;
    const POSTS = postsModule.POSTS || postsModule.default?.POSTS || postsModule;
    
    const pageData = PAGES?.blog;
    
    // 检查是否有完整的HTML内容（包含导航和页脚）
    const hasFullHtml = pageData?.html && (pageData.html.includes('<nav') || pageData.html.includes('<footer'));
    
    // 如果原始HTML包含完整结构，直接返回HTML内容
    if (hasFullHtml) {
      return {
        props: {
          pageData: {
            title: pageData.title || 'Blog',
            description: pageData.description || '',
            canonical: pageData.canonical || 'https://imagetoprompt.app/blog',
            html: pageData.html || '',
            styles: pageData.styles || ''
          }
        }
      };
    }
    
    const posts = POSTS ? Object.values(POSTS).sort((a, b) => {
      const dateA = new Date(a.date || 0);
      const dateB = new Date(b.date || 0);
      return dateB - dateA;
    }) : [];
    
    return {
      props: {
        posts,
        pageData: {
          title: pageData?.title || 'Blog',
          description: pageData?.description || '',
          canonical: pageData?.canonical || 'https://imagetoprompt.app/blog',
          styles: pageData?.styles || ''
        }
      }
    };
  } catch (error) {
    console.error('[SSR] Error loading blog index:', error.message);
    return {
      props: {
        posts: [],
        pageData: {
          title: 'Blog',
          description: 'Blog',
          canonical: 'https://imagetoprompt.app/blog',
          styles: ''
        }
      }
    };
  }
}

export default function BlogIndex({ posts, pageData }) {
  // 如果原始HTML包含完整结构，直接渲染
  if (pageData?.html && (pageData.html.includes('<nav') || pageData.html.includes('<footer'))) {
    return (
      <>
        <SEOHead
          title={pageData.title}
          description={pageData.description}
          canonical={pageData.canonical}
        />
        {pageData.styles && (
          <style dangerouslySetInnerHTML={{ __html: pageData.styles }} />
        )}
        {/* 原始HTML已经包含完整的导航和页脚，不需要Layout组件 */}
        <div dangerouslySetInnerHTML={{ __html: pageData.html }} />
        <Script src="/js/languages.js" strategy="afterInteractive" />
        <Script src="/js/main.js" strategy="afterInteractive" />
      </>
    );
  }
  
  // 自定义布局（如果没有完整HTML）
  return (
    <>
      <SEOHead
        title={pageData.title}
        description={pageData.description}
        canonical={pageData.canonical}
      />
      {pageData.styles && (
        <style dangerouslySetInnerHTML={{ __html: pageData.styles }} />
      )}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-secondary-bg rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/blog/${post.slug}`}>
                  {post.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-text-secondary mb-4">{post.description}</p>
                    <div className="flex items-center text-sm text-text-secondary">
                      <span>{post.date}</span>
                      {post.tags && post.tags.length > 0 && (
                        <span className="ml-4">
                          {post.tags.slice(0, 2).join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary">No posts available.</p>
        )}
      </div>
      <Script src="/js/languages.js" strategy="afterInteractive" />
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}
