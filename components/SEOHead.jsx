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
  const fullTitle = title ? `${title} | Image to Prompt Generator` : 'Image to Prompt Generator';
  const fullImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/assets/images/imagetoprompt.webp`;
  const fullCanonical = canonical || '';
  
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

