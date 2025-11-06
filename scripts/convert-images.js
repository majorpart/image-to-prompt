const fs = require('fs');
const path = require('path');

// 检查是否安装了 sharp
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.error('✗ sharp library is not installed.');
  console.error('\n📦 Installation options:');
  console.error('  1. Standard install: npm install sharp');
  console.error('  2. With mirror (China): npm install sharp --registry=https://registry.npmmirror.com');
  console.error('  3. With proxy: npm install sharp --proxy=http://proxy:port');
  console.error('\n💡 If network timeout, try:');
  console.error('  - Use VPN or proxy');
  console.error('  - Manually download from: https://github.com/lovell/sharp-libvips/releases');
  console.error('  - Or retry later when network is stable');
  console.error('\n⏭ Skipping image conversion for now.');
  process.exit(1);
}

const IMAGE_DIR = path.join(__dirname, '..', 'assets', 'images');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'images');
const BACKUP_DIR = path.join(IMAGE_DIR, '_backup');

// 图片配置 - 根据网站实际使用场景优化
const IMAGE_CONFIG = {
  // 默认配置
  default: {
    quality: 80,
    format: 'webp'
  },
  // 特殊图片配置 - 根据实际使用场景设置尺寸
  special: {
    // Logo - 导航栏使用，高度32px，保留高清晰度
    'imagetoprompt.png': { width: 200, quality: 90 },
    // Hero 背景图 - 全屏背景，需要较大尺寸但保持压缩
    'image-to-prompt.jpg': { width: 1920, quality: 85 },
    // 博客/案例图片 - 通常显示宽度1200px
    '1.jpg': { width: 1200, quality: 85 }
  }
};

async function convertImage(filePath, optimizeExisting = false) {
  const fileName = path.basename(filePath);
  const ext = path.extname(fileName).toLowerCase();
  
  // 处理 PNG、JPG、JPEG
  if (['.png', '.jpg', '.jpeg'].includes(ext)) {
    return await convertToWebP(filePath, fileName, ext);
  }
  
  // 如果已经是 WebP，检查是否需要优化
  if (ext === '.webp' && optimizeExisting) {
    const stats = fs.statSync(filePath);
    const sizeKB = stats.size / 1024;
    
    // 如果文件大于100KB，进行优化
    if (sizeKB > 100) {
      return await optimizeWebP(filePath, fileName, sizeKB);
    }
  }
  
  return;
}

async function convertToWebP(filePath, fileName, ext) {
  
  // 创建备份
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  const backupPath = path.join(BACKUP_DIR, fileName);
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
  }
  
  // 获取配置
  const specialConfig = IMAGE_CONFIG.special[fileName];
  const config = {
    width: specialConfig?.width || null,
    quality: specialConfig?.quality || IMAGE_CONFIG.default.quality
  };
  
  // 生成输出路径
  const outputFileName = fileName.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const outputPath = path.join(OUTPUT_DIR, outputFileName);
  
  // 确保输出目录存在
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // 如果已存在，跳过
  if (fs.existsSync(outputPath)) {
    console.log(`⏭ Skipped (already exists): ${outputFileName}`);
    return;
  }
  
  try {
    let sharpInstance = sharp(filePath);
    
    // 如果指定了宽度，进行缩放
    if (config.width) {
      sharpInstance = sharpInstance.resize(config.width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // 转换为 WebP
    await sharpInstance
      .webp({ quality: config.quality })
      .toFile(outputPath);
    
    console.log(`✓ Converted: ${fileName} -> ${outputFileName} (${config.width ? `${config.width}px` : 'original'})`);
    
    // 获取文件大小对比
    const originalSize = fs.statSync(filePath).size;
    const newSize = fs.statSync(outputPath).size;
    const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);
    console.log(`  Size reduction: ${reduction}% (${(originalSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB)`);
  } catch (error) {
    console.error(`✗ Error converting ${fileName}:`, error.message);
  }
}

async function optimizeWebP(filePath, fileName, originalSizeKB) {
  // 根据文件大小确定优化配置
  let targetWidth = null;
  let quality = 80;
  
  // 根据文件大小和类型设置优化参数
  if (fileName.includes('blog')) {
    targetWidth = 1200; // 博客图片通常显示宽度1200px
  } else if (fileName.includes('case')) {
    targetWidth = 1200; // 案例图片通常显示宽度1200px
  } else if (fileName.includes('image-to-prompt')) {
    targetWidth = 1920; // 大图可能需要更大尺寸
  } else {
    targetWidth = 1200; // 默认1200px
  }
  
  // 如果文件很大，降低质量
  if (originalSizeKB > 200) {
    quality = 75;
  } else if (originalSizeKB > 150) {
    quality = 80;
  }
  
  const outputPath = path.join(OUTPUT_DIR, fileName);
  
  // 确保输出目录存在
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // 创建备份
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  const backupPath = path.join(BACKUP_DIR, fileName);
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
  }
  
  try {
    let sharpInstance = sharp(filePath);
    
    // 如果指定了宽度，进行缩放
    if (targetWidth) {
      sharpInstance = sharpInstance.resize(targetWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // 重新压缩 WebP
    await sharpInstance
      .webp({ quality: quality })
      .toFile(outputPath);
    
    const newSizeKB = fs.statSync(outputPath).size / 1024;
    const reduction = ((1 - newSizeKB / originalSizeKB) * 100).toFixed(1);
    
    console.log(`✓ Optimized: ${fileName} (${targetWidth ? `${targetWidth}px` : 'original'}, quality: ${quality}%)`);
    console.log(`  Size reduction: ${reduction}% (${originalSizeKB.toFixed(1)}KB -> ${newSizeKB.toFixed(1)}KB)`);
  } catch (error) {
    console.error(`✗ Error optimizing ${fileName}:`, error.message);
  }
}

// 处理所有图片
async function processAllImages() {
  console.log('Starting image conversion...\n');
  console.log(`Source: ${IMAGE_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);
  
  if (!fs.existsSync(IMAGE_DIR)) {
    console.error(`✗ Image directory not found: ${IMAGE_DIR}`);
    return;
  }
  
  const files = fs.readdirSync(IMAGE_DIR);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.webp'].includes(ext);
  });
  
  const toConvert = imageFiles.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext);
  });
  
  const toOptimize = imageFiles.filter(file => {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.webp') {
      const filePath = path.join(IMAGE_DIR, file);
      const stats = fs.statSync(filePath);
      return stats.size / 1024 > 100; // 大于100KB的WebP需要优化
    }
    return false;
  });
  
  console.log(`Found ${toConvert.length} images to convert`);
  console.log(`Found ${toOptimize.length} WebP images to optimize (>100KB)\n`);
  
  if (imageFiles.length === 0) {
    console.log('No images to process.');
    return;
  }
  
  // 转换 PNG/JPG 为 WebP
  for (const file of toConvert) {
    const filePath = path.join(IMAGE_DIR, file);
    await convertImage(filePath);
  }
  
  // 优化现有的大型 WebP 图片
  for (const file of toOptimize) {
    const filePath = path.join(IMAGE_DIR, file);
    await convertImage(filePath, true);
  }
  
  console.log('\n✓ Image conversion complete!');
  console.log(`\nBackup location: ${BACKUP_DIR}`);
}

// 运行转换
processAllImages().catch(console.error);

