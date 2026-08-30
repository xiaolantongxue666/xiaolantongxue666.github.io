import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/**
 * 按发布时间倒序返回全部博客文章。
 * 草稿（draft: true）在构建时排除，dev 模式下仍可预览。
 * 列表页 / 详情页上一篇下一篇 / RSS 共用。
 */
export async function getPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection(
    'blog',
    ({ data }) => (import.meta.env.PROD ? !data.draft : true),
  );
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/** 统一日期展示：YYYY-MM-DD（frontmatter 日期按 UTC 解析，用 UTC 方法避免时区偏移） */
export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
