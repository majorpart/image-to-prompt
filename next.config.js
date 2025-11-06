const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  compress: true,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    unoptimized: false
  },
  
  webpack: (config, { isServer, webpack }) => {
    // 确保 webpack 能够正确处理动态生成的内容文件
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    } else {
      // 在服务器端，确保生成的文件可以被 require
      // 添加 alias 确保路径解析正确
      config.resolve.alias = {
        ...config.resolve.alias,
        '@content': path.resolve(__dirname, 'lib', 'content'),
      };
      
      // 确保生成的目录在 webpack 的上下文中
      config.resolve.modules = [
        ...(config.resolve.modules || []),
        path.resolve(__dirname, 'lib'),
      ];
      
      // 确保文件系统模块在服务器端可用
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    
    return config;
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
        ]
      },
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ];
  }
};

module.exports = nextConfig;

