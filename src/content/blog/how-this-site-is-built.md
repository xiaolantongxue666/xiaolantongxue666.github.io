---
title: 这个博客是怎么搭起来的
description: 用 Astro 给个人站点补上博客区块的实现笔记：Content Collections、零客户端 JS、RSS，以及几个小的设计取舍。
pubDate: 2026-08-30
tags: [Astro, 前端]
---

站点本体是一个 Astro 静态站，这次给预留的 `/blog` 路由补上了博客功能。整体不到一天的工作量，记录几个关键取舍。

## 技术选择：继续留在 Astro

没有引入任何前端框架，原因和当初选 Astro 一致：内容型站点不需要客户端 JavaScript，静态生成后就是纯 HTML，加载快、 SEO 天然友好。博客与项目 Case Study 的区别只是内容形态，架构上没有理由分叉。

## 内容与代码分离

文章放在 `src/content/blog/` 下的 Markdown 文件，通过 Astro 的 Content Collections 管理，schema 定义了 frontmatter 的合法字段：

```ts
schema: z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
})
```

`pubDate` 用 `z.coerce.date()`，直接写 `2026-08-30` 这样的字符串就能自动转成 Date 对象，省掉手写 `new Date()` 的解析。`draft: true` 的文章构建时会被排除，dev 模式下仍可预览，写未完成的文章时很有用。

发文流程就是新建一个 `.md` 文件，写好 frontmatter，push 之后 GitHub Actions 自动构建发布——不需要动任何路由代码。

## 设计上的复用

博客页没有另起一套视觉体系，全部复用站点已有的设计系统：玻璃拟态卡片、紫→靛→青的渐变强调色、`chip` 标签。唯一新增的是一个 `.blog-post` 排版容器——项目 Case Study 的 `.case-study` 带有 `01 / 02` 的自动编号标题，适合章节化叙事，但博客文章不长，编号反而累赘，所以单独写了一套不带编号的正文样式，顺带补了引用块、代码块和表格的样式。

## RSS

顺手加了 `/rss.xml`，用 `@astrojs/rss` 从同一个 Content Collection 生成，文章的 tags 直接映射为 RSS 的 categories。订阅入口在博客列表页底部。
