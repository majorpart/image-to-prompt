import Link from 'next/link';
import { useState } from 'react';

export default function Layout({ children, currentPath = '/' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Case', href: '/case' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' }
  ];
  
  return (
    <div className="min-h-screen bg-primary-bg text-text-primary">
      {/* 导航栏 */}
      <nav className="bg-secondary-bg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <img
                  src="/assets/images/imagetoprompt.webp"
                  alt="Image to Prompt Generator"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            
            {/* 桌面导航 */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPath === item.href
                        ? 'bg-accent-orange text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-secondary-bg'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* 移动端菜单按钮 */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-text-primary hover:text-accent-orange"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    currentPath === item.href
                      ? 'bg-accent-orange text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-secondary-bg'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      
      {/* 主要内容 */}
      <main>{children}</main>
      
      {/* 页脚 */}
      <footer className="bg-secondary-bg border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Image to Prompt Generator</h3>
              <p className="text-text-secondary text-sm">
                Free AI tool to convert images to detailed prompts for Stable Diffusion and Midjourney.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-text-secondary hover:text-accent-orange">About</Link></li>
                <li><Link href="/blog" className="text-text-secondary hover:text-accent-orange">Blog</Link></li>
                <li><Link href="/case" className="text-text-secondary hover:text-accent-orange">Case</Link></li>
                <li><Link href="/faq" className="text-text-secondary hover:text-accent-orange">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy-policy" className="text-text-secondary hover:text-accent-orange">Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions" className="text-text-secondary hover:text-accent-orange">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="text-text-secondary hover:text-accent-orange">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-text-secondary">
            <p>&copy; {new Date().getFullYear()} Image to Prompt Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

