import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/** 按 order 升序返回全部项目（首页 / 列表页 / 详情页导航共用） */
export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}
