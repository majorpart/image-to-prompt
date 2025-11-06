// 包装文件：动态导入生成的内容文件
// 这个文件在构建时存在，可以避免 webpack 解析错误

export async function getPages() {
  try {
    const pagesModule = await import('./generated/pages.js');
    return pagesModule.PAGES || pagesModule.default?.PAGES || pagesModule;
  } catch (error) {
    console.error('[Content] Error loading pages:', error.message);
    return null;
  }
}

export async function getPageBySlug(slug) {
  const PAGES = await getPages();
  if (!PAGES) {
    return null;
  }
  return PAGES[slug] || null;
}

