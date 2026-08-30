import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/projects',
    // 使用 frontmatter 中的 slug 作为 URL（如 legal-knowledge-graphrag）
    generateId: ({ data }) => String(data.slug),
  }),
  schema: z.object({
    slug: z.string(),
    /** 展示排序，01 最重要 */
    order: z.number(),
    title: z.string(),
    titleEn: z.string(),
    /** 首页 / 列表页的一句话简介 */
    summary: z.string(),
    /** 详情页 Project Hero 元信息 */
    role: z.string().optional(),
    company: z.string().optional(),
    duration: z.string().optional(),
    focus: z.string().optional(),
    /** 项目类型标签（如 研究生项目 / 实习项目） */
    type: z.string().optional(),
    /** 详情页技术栈标签 */
    tags: z.array(z.string()).default([]),
    /** 首页卡片关键指标（2–3 个） */
    metrics: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .default([]),
    /** 首页卡片配图（仅在有真实截图时填写） */
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
  }),
});

export const collections = { projects };
