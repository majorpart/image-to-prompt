const fs = require('fs');
const path = require('path');

const ASSETS_TO_COPY = [
  { from: 'assets/css', to: 'public/assets/css' },
  { from: 'assets/images', to: 'public/assets/images' },
  { from: 'js', to: 'public/js' },
  { from: 'favicon.ico', to: 'public/favicon.ico' }
];

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

function copyAssets() {
  console.log('Copying assets...\n');
  
  ASSETS_TO_COPY.forEach(({ from, to }) => {
    const fromPath = path.join(__dirname, '..', from);
    const toPath = path.join(__dirname, '..', to);
    
    if (fs.existsSync(fromPath)) {
      copyRecursiveSync(fromPath, toPath);
      console.log(`✓ Copied: ${from} -> ${to}`);
    } else {
      console.log(`⚠ Skipped (not found): ${from}`);
    }
  });
  
  console.log('\n✓ Asset copying complete!');
}

copyAssets();

