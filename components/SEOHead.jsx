import Head from 'next/head';

export default function SEOHead({
  title,
  description,
  canonical,
  image,
  type = 'website',
  noindex = false
}) {
  const siteUrl = 'https://imagetoprompt.app';
  
  // 优化title格式，突出"image to prompt"关键词，控制在60字符以内
  // 如果title已经包含"image to prompt"相关关键词，则简化格式
  const getOptimizedTitle = (pageTitle) => {
    if (!pageTitle) {
      return 'Image to Prompt Generator - Free AI Tool';
    }
    
    // 检查title是否已经包含核心关键词
    const hasImageToPrompt = /image.*to.*prompt|prompt.*from.*image/i.test(pageTitle);
    
    if (hasImageToPrompt) {
      // 如果已经包含关键词，直接使用title，但确保不超过60字符
      return pageTitle.length > 60 ? pageTitle.substring(0, 57) + '...' : pageTitle;
    } else {
      // 如果title较短，添加核心关键词
      const shortTitle = pageTitle.length <= 30 
        ? `${pageTitle} - Image to Prompt`
        : pageTitle;
      // 确保总长度不超过60字符
      return shortTitle.length > 60 ? shortTitle.substring(0, 57) + '...' : shortTitle;
    }
  };
  
  const fullTitle = getOptimizedTitle(title);
  const fullImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/assets/images/imagetoprompt.webp`;
  
  // 确保canonical URL指向非www版本
  const fullCanonical = canonical 
    ? canonical.replace(/^https?:\/\/(www\.)?/, 'https://')
    : '';
  
  return (
    <Head>
      {/* 基础 Meta 标签 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || ''} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="googlebot" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="bingbot" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Canonical URL - 核心要求 */}
      {fullCanonical && (
        <link rel="canonical" href={fullCanonical} />
      )}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || ''} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullImage} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || ''} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* 主题色 */}
      <meta name="theme-color" content="#ff6b35" />
      <meta name="msapplication-TileColor" content="#ff6b35" />
    </Head>
  );
}

