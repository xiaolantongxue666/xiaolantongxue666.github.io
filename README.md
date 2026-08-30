# 兰永重个人求职 Portfolio

面向 HR、技术面试官与 Hiring Manager 的技术型个人 Portfolio 网站，统一表达
**AI Application Developer · Python / Machine Learning** 一条完整技术路径。

核心内容为三个项目的 Technical Case Study：

1. **法律法规智能知识图谱与问答系统**（Legal Knowledge Graph & GraphRAG QA System）——核心 Case Study
2. **复杂低空场景目标识别系统**（Low-Altitude Target Recognition System）
3. **多模态深度学习干扰智能识别系统**（Multimodal Interference Recognition System）

所有指标均为简历确认的真实数据；未提供的资料（GitHub 地址、域名、头像等）一律留 TODO
配置项或隐藏入口，不做虚构。

## 技术栈

```text
Astro 5（静态优先，零框架 JS）
TypeScript（strict）
Tailwind CSS 4（@tailwindcss/vite）
MDX Content Collections（项目内容与代码分离）
@astrojs/sitemap
@astrojs/rss（博客订阅源 /rss.xml）
```

## 本地运行

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build

```bash
npm run build      # 产物输出到 dist/
npm run preview    # 本地预览构建产物
npx astro check    # TypeScript / Astro 类型检查
```

## 目录结构

```text
portfolio/
├── public/
│   ├── images/projects/graphrag/
│   │   ├── knowledge-graph.png      # 素材：知识图谱运行结果（真实截图）
│   │   └── tool-ui.png              # 素材：图谱工程管理界面（真实截图）
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.astro             # 导航（含移动端菜单）
│   │   ├── Hero.astro               # 首屏（无头像排版型 Hero）
│   │   ├── DirectionCard.astro      # What I Do 方向卡
│   │   ├── ProjectCard.astro        # 项目卡（feature / row 两种形态）
│   │   ├── Metric.astro             # 指标（支持 90% → 95% 变化型高亮）
│   │   ├── ExperienceTimeline.astro # 实习时间线
│   │   ├── SkillGroup.astro         # 技能分组（无星级）
│   │   ├── SectionHead.astro        # 区块标题
│   │   ├── Footer.astro
│   │   └── mdx/                     # 项目正文专用组件
│   │       ├── Figure.astro         # 截图 + 图注
│   │       ├── Callout.astro        # 强调框（职责边界 / 指标说明 / 项目限制）
│   │       ├── MetricGrid.astro     # 指标网格
│   │       ├── ArchDiagram.astro    # GraphRAG 双路检索架构图（纯 HTML/CSS/SVG）
│   │       └── PipelineFlow.astro   # 纵向流程图
│   ├── content/projects/            # 项目内容（MDX，与代码分离）
│   │   ├── legal-knowledge-graphrag.mdx
│   │   ├── low-altitude-target-recognition.mdx
│   │   └── multimodal-interference-recognition.mdx
│   ├── content/blog/                # 博客文章（Markdown，文件名即 URL slug）
│   │   ├── hello-blog.md
│   │   └── how-this-site-is-built.md
│   ├── layouts/
│   │   ├── BaseLayout.astro         # SEO / OG / canonical / 无障碍跳转
│   │   └── ProjectLayout.astro      # 项目详情页外壳（Hero 元信息 + 上一篇/下一篇）
│   ├── lib/
│   │   ├── projects.ts              # 项目集合读取与排序
│   │   └── blog.ts                  # 博客文章读取与排序（draft 构建时排除）
│   ├── pages/
│   │   ├── index.astro              # 首页
│   │   ├── projects/index.astro     # 项目列表页
│   │   ├── projects/[slug].astro    # 项目详情路由
│   │   ├── blog/index.astro         # 博客列表页（按年份分组）
│   │   ├── blog/[slug].astro        # 文章详情路由
│   │   ├── rss.xml.js               # RSS 订阅源（/rss.xml）
│   │   ├── about.astro
│   │   └── 404.astro
│   ├── styles/global.css            # 设计系统（颜色 / 字体 / 排版 / 案例正文样式）
│   ├── config.ts                    # 站点全局配置（个人信息 / 联系方式 / 社交链接）
│   └── content.config.ts            # Content Collection schema
└── astro.config.mjs
```

## 添加新项目

在 `src/content/projects/` 下新建 `.mdx` 文件，frontmatter 参照现有文件：

```yaml
---
slug: my-new-project          # URL：/projects/my-new-project
order: 4                      # 展示排序，01 最重要
title: 项目中文名
titleEn: Project English Name
summary: 一句话简介（首页卡片与列表页使用）
role: 角色名                   # 以下元信息可选
company: 公司名
duration: 2026.01 – 2026.03
focus: A / B / C
type: 研究生项目经历
tags: [Python, PyTorch]
metrics:
  - value: 90%
    label: Some Metric
cover: /images/projects/my-project/cover.png   # 没有真实截图就不要填
---
正文使用 Markdown，可直接 import 使用 src/components/mdx/ 下的组件。
```

无需注册路由，`[slug].astro` 会自动生成详情页并加入列表页与上一篇/下一篇导航。

## 写博客

在 `src/content/blog/` 下新建 `.md` 文件（文件名即 URL slug，如 `my-note.md` → `/blog/my-note`），
frontmatter 参照现有文章：

```yaml
---
title: 文章标题
description: 一句话描述（列表页 / RSS / SEO 使用）
pubDate: 2026-08-30
tags: [随笔]          # 可选
draft: true           # 可选，草稿构建时排除，dev 模式仍可预览
---
正文使用 Markdown，样式由 global.css 的 .blog-post 提供（含代码块 / 引用块 / 表格）。
```

发布即 git push——GitHub Actions 会自动构建上线，无需改任何路由代码。
列表页按年份分组，详情页自带「较新一篇 / 较早一篇」导航，`/rss.xml` 自动收录。

## 修改个人信息

集中在一处：`src/config.ts`（姓名、定位、邮箱、GitHub）。
文案分散在：

- 首页各区块：`src/pages/index.astro`
- Hero 简介：`src/components/Hero.astro`
- About 文案：`src/pages/about.astro`
- 教育背景 / 时间线 / 技能：`src/pages/index.astro` 内的数据数组

## 关于简历

应用户要求，网站**不提供简历下载**，也没有在线简历页：招聘方通过首页、项目
Case Study 与实习经历直接了解候选人。两份 PDF 简历仅本地保留，不随站点发布，
仓库与构建产物中均不存在简历文件。

## 替换图片

- 项目素材放在 `public/images/projects/<项目名>/`，在 MDX 中用 `Figure` 组件引用。
- **替换前请确认公司保密要求**：当前 `tool-ui.png` 包含内部产品名（浮木·元枢）与内部
  项目名（如“城市管理-full-ontology”），`knowledge-graph.png` 状态栏显示节点/边统计。
  如需脱敏，可裁剪、模糊或加遮罩后覆盖同名文件；图注同步调整。
- 首页 / 列表页卡片配图在 frontmatter 的 `cover` / `coverAlt` 字段配置；
  没有真实截图的项目不要配图。

## Deployment（GitHub Pages）

站点部署在 GitHub Pages（自定义域名）：**https://lanyongzhong.app**

仓库固定为 `xiaolantongxue666/xiaolantongxue666.github.io`（用户站点，base 为根路径，
页面内部链接无需任何前缀改造）。部署通过 GitHub Actions 自动完成：
`.github/workflows/deploy.yml` 在每次 push 到 main 分支时安装依赖、构建并发布。

### 首次部署步骤

1. 在 GitHub 上新建**空仓库**，名称必须是 `xiaolantongxue666.github.io`
   （不要勾选 README / .gitignore / License）。
2. 本地推送（在 portfolio 目录下）：

   ```bash
   git remote add origin https://github.com/xiaolantongxue666/xiaolantongxue666.github.io.git
   git push -u origin main
   ```

3. 仓库 **Settings → Pages → Build and deployment → Source** 选择
   **GitHub Actions**（首次部署前设置一次即可）。
4. 之后每次 `git push`，Actions 会自动构建并发布，约 1–2 分钟后
   https://lanyongzhong.app 生效（域名在 Name.com 注册，学生包首年免费，次年续费约 US$22.99）。

### 注意事项

- 站点地址同时写在三处，改域名时需同步：`astro.config.mjs`（site）、
  `src/config.ts`（url）、`public/robots.txt`（Sitemap）。
- 若以后改用项目站点（仓库名不是 xiaolantongxue666.github.io），需要为所有
  内部链接加 base 前缀，不建议；绑定自定义域名时把三处地址换成域名即可。
- 也可以部署到 Cloudflare Pages（构建命令 `npm run build`，输出目录 `dist`）
  或 Vercel（Framework 选 Astro），步骤从略。

## 待补充内容（TODO）

| 事项 | 位置 | 状态 |
| --- | --- | --- |
| —— | —— | GitHub 主页已配置（`src/config.ts`），如需更换直接改 `github` 字段 |
| 自定义域名 | `astro.config.mjs` / `src/config.ts` / `public/robots.txt` | 占位 `lan-yongzhong.example.com` |
| 低空项目截图 | `public/images/projects/radar/` | 无素材，页面用排版 + 指标 + 流程图表达 |
| 多模态项目截图 | `public/images/projects/interference/` | 无素材，同上 |
| GraphRAG 表格解析前后对比图 | `legal-knowledge-graphrag.mdx` 的 Document Parsing 节 | 无素材，未放占位假图 |
| Demo / Repo 链接 | 项目 frontmatter | 未提供，未展示 |
| `/blog` | `src/content/blog/` | 已上线：列表页（按年份分组）/ 文章详情页 / `/rss.xml`，导航与页脚已挂链接 |

## 数据一致性备忘（改动前必读）

以下为简历确认口径，不要为了好看修改，也不要混用截图中的统计：

- 表格解析准确率：70% → 90%
- 知识图谱：5000 节点 / 12 种节点类型 / 10000 关系 / 30 种关系类型
- 检索召回率（不是准确率）：90% → 95%
- 约 10 页文档 7–8 分钟从入库到可问答
- 低空项目：40+ 维特征 / 验证集 98.99% / 单周期测试 98.92% / 航迹级 97.76%
- 多模态项目：Validation Accuracy 92.71% / Macro F1 0.8398
- 图谱截图状态栏的「节点 2326 / 边 14421」是某次运行统计，与最终项目总量口径不同，
  不在页面中解释或引用（图注仅写“领域知识图谱运行结果示例”）。
