const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'images', 'friendship-links');
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'assets', 'images', 'friendship-links');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// 友情链接图片配置
const images = [
  {
    url: 'https://cdn.prod.website-files.com/63d8afd87da01fb58ea3fbcb/6487e2868c6c8f93b4828827_dang-badge.png',
    filename: 'dang-badge.png',
    name: 'Dang.ai'
  },
  {
    url: 'https://tooljourney.com/assets/images/badge.png',
    filename: 'tooljourney-badge.png',
    name: 'Tool Journey'
  },
  {
    url: 'https://www.toolpilot.ai/cdn/shop/files/f-w_690x151_crop_center.png',
    filename: 'toolpilot-badge.png',
    name: 'ToolPilot.ai'
  }
];

function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // 处理重定向
        return downloadImage(response.headers.location, outputPath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(outputPath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  console.log('Downloading friendship link images...\n');
  
  for (const image of images) {
    const outputPath = path.join(OUTPUT_DIR, image.filename);
    const publicPath = path.join(PUBLIC_DIR, image.filename);
    
    // 如果文件已存在，跳过
    if (fs.existsSync(outputPath) && fs.existsSync(publicPath)) {
      console.log(`⏭ Skipped (already exists): ${image.name} - ${image.filename}`);
      continue;
    }
    
    try {
      console.log(`Downloading ${image.name}...`);
      await downloadImage(image.url, outputPath);
      
      // 复制到 public 目录
      fs.copyFileSync(outputPath, publicPath);
      
      console.log(`✓ Downloaded: ${image.name} - ${image.filename}`);
    } catch (error) {
      console.error(`✗ Failed to download ${image.name}:`, error.message);
    }
  }
  
  console.log('\n✓ Download complete!');
}

downloadAllImages().catch(console.error);

