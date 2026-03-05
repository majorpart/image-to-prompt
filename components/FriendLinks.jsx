const FRIEND_LINKS = [
  {
    href: 'https://dang.ai/',
    src: '/assets/images/friendship-links/dang-badge.png',
    alt: 'Image-to-Prompt featured on Dang.ai',
    width: 120,
    height: 40,
  },
  {
    href: 'https://tooljourney.com',
    src: '/assets/images/friendship-links/tooljourney-badge.png',
    alt: 'Image-to-Prompt featured on Tool Journey',
    width: 140,
    height: 40,
  },
  {
    href: 'https://www.toolpilot.ai/',
    src: '/assets/images/friendship-links/toolpilot-badge.png',
    alt: 'Image-to-Prompt featured on ToolPilot.ai',
    width: 140,
    height: 40,
  },
];

const TEXT_LINKS = [
  {
    href: 'https://www.toolpilot.ai',
    label: 'ToolPilot.ai',
  },
  {
    href: 'https://seektool.ai/',
    label: 'SeekTool.ai Tools Directory',
  },
];

export default function FriendLinks() {
  return (
    <section
      aria-labelledby="friend-links-title"
      className="bg-gray-900 border-t border-gray-800 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2
            id="friend-links-title"
            className="text-sm font-medium tracking-wide text-gray-400 uppercase"
          >
            Featured directories &amp; partners
          </h2>
          <p className="mt-2 text-sm text-gray-500 max-w-2xl mx-auto">
            Image-to-Prompt is listed in trusted AI tool directories and communities
            to help more creators discover{' '}
            <span className="whitespace-nowrap">https://imagetoprompt.app/</span>.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {FRIEND_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-gray-800 px-3 py-2 hover:bg-gray-700 transition-colors"
            >
              <img
                src={link.src}
                alt={link.alt}
                width={link.width}
                height={link.height}
                loading="lazy"
                className="h-10 max-h-12 w-auto max-w-[160px] object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400">
          {TEXT_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener"
              className="hover:text-orange-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

