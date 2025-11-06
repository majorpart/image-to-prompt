// 包装文件：动态导入生成的文章文件
// 此文件由 scripts/generate-content.js 自动生成
// DO NOT EDIT MANUALLY

export async function getPosts() {
  try {
    const postsModule = await import('./generated/posts.js');
    return postsModule.POSTS || postsModule.default?.POSTS || postsModule;
  } catch (error) {
    console.error('[Content] Error loading posts:', error.message);
    return null;
  }
}

export async function getPostBySlug(slug) {
  const POSTS = await getPosts();
  if (!POSTS) {
    return null;
  }
  return POSTS[slug] || null;
}
