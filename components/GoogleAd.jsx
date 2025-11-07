import { useEffect } from 'react';

export default function GoogleAd({ 
  slot = 'auto',
  style = { display: 'block' },
  format = 'auto',
  responsive = true,
  className = ''
}) {
  useEffect(() => {
    try {
      // 确保 AdSense 脚本已加载
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`google-ad-container ${className}`} style={{ minHeight: '100px', margin: '20px 0' }}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-5822504482860674"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

