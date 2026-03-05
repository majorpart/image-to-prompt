// 友情链接数据配置（根据指南，数据驱动）
const friendLinks = [
  {
    href: 'https://dang.ai/',
    src: '/assets/images/friendship-links/dang-badge.png',
    alt: 'Image-to-Prompt featured on Dang.ai (https://imagetoprompt.app/)',
    width: 120,
    height: 40,
  },
  {
    href: 'https://tooljourney.com',
    src: '/assets/images/friendship-links/tooljourney-badge.png',
    alt: 'Image-to-Prompt featured on Tool Journey (https://imagetoprompt.app/)',
    width: 140,
    height: 40,
  },
  {
    href: 'https://www.toolpilot.ai/',
    src: '/assets/images/friendship-links/toolpilot-badge.png',
    alt: 'Image-to-Prompt featured on ToolPilot.ai (https://imagetoprompt.app/)',
    width: 140,
    height: 40,
  },
  {
    href: 'https://seektool.ai/',
    type: 'text',
    alt: 'SeekTool.ai Tools Directory listing Image-to-Prompt (https://imagetoprompt.app/)',
    content: 'SeekTool.ai Tools Directory',
  },
];

function renderFriendLink(link, key) {
  const isTextLink = link.type === 'text';

  return (
    <a
      key={key}
      href={link.href}
      target="_blank"
      rel={isTextLink ? 'noopener' : 'noopener noreferrer'}
      className="friend-links-item"
      title={link.alt}
    >
      {isTextLink ? (
        <span className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
          {link.content}
        </span>
      ) : (
        <img
          src={link.src}
          alt={link.alt}
          width={link.width}
          height={link.height}
          loading="lazy"
          className="h-10 max-h-12 w-auto max-w-[160px] object-contain opacity-80 hover:opacity-100 transition-opacity"
        />
      )}
    </a>
  );
}

export default function FriendLinks() {
  return (
    <section
      className="border-t border-gray-800 bg-gray-900 py-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 滚动容器 - 所有链接都在初始 HTML 中（SEO 友好） */}
        <div className="friend-links-scroll-container">
          <div className="friend-links-scroll-track">
            {friendLinks.map((link, index) =>
              renderFriendLink(link, `link-${index}`),
            )}
            {friendLinks.map((link, index) =>
              renderFriendLink(link, `link-duplicate-${index}`),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

