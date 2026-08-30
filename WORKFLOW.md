# 网站更新工作流

> 适用范围：`portfolio` 站点的所有内容更新。每次更新只走一条主路径（约 5 分钟），不同场景只影响「改哪里」这一步。

## 总览

```
① 改内容 → ② 本地预览 → ③ 发布前检查 → ④ 提交推送 → ⑤ 自动部署 → ⑥ 线上验证
   改哪看场景表   npm run dev   check+build   git push    Actions 自动   打开域名核对
  （按场景）    （边改边看）   （三道闸）     （约 5 秒）  （1–2 分钟）    （1 分钟）
```

## 1. 按场景修改内容（速查表）

| 想做什么 | 改哪里 | 关键注意点 |
| --- | --- | --- |
| **新增项目** | `src/content/projects/` 新建 `.mdx` | `order` 决定展示位置（01 是主位）；无真实截图不填 `cover`；frontmatter 照抄现有文件 |
| **修改项目内容** | 对应 `.mdx` | 指标出现在 frontmatter `metrics` 和正文 `MetricGrid` **两处**，必须同步改 |
| **换图 / 加图** | `public/images/projects/…` | 单图 < 500KB、写 `alt`、深色截图外层已有白色圆角容器 |
| **个人信息 / 邮箱 / GitHub** | `src/config.ts` | 一处修改全站生效 |
| **首页时间线 / 技能 / 教育 / Bento** | `src/pages/index.astro` 顶部数据数组 | `timeline`、`skillGroups`、Bento 组件内 cells |
| **About 文案 / 能力路径** | `src/pages/about.astro` | 最后一段是职业表述，别扩展成事实 |
| **整站配色 / 风格** | `src/styles/global.css` 的 `@theme` | 设计令牌集中地 |
| **架构图 / 流程图** | `ArchDiagram.astro` / `PipelineFlow.astro` | 节点坐标数据化在文件顶部 |

> 新增项目的完整字段说明见 `README.md` 的「添加新项目」章节。

## 2. 本地预览

```bash
cd D:\Project\blog\portfolio
npm run dev        # http://localhost:4321，改完保存即刷新
```

自查清单：

- [ ] 手机宽度不溢出（F12 → 设备模拟 → 390px）
- [ ] 新数字与简历口径一致（数据一致性备忘见 `README.md` 末尾）
- [ ] 图片有 `alt`、无破图

## 3. 发布前三道闸

```bash
npx astro check    # ① 类型检查 0 错误
npm run build      # ② 构建无报错（MDX 语法 / frontmatter 字段错误会在这里暴露）
npm run preview    # ③ 本地跑最终产物过目一遍（http://localhost:4321，Ctrl+C 退出）
```

可选：`node scripts/capture.mjs` 生成 `.review/` 分段截图，人工抽查视觉。

## 4. 提交推送

```bash
git add -A
git commit -m "内容: 一句话说清本次更新"
git push
```

## 5. 自动部署

- push 后仓库 **Actions** 页自动运行「Deploy to GitHub Pages」，绿勾即发布完成（1–2 分钟）
- 出现红色「pages build and deployment」失败邮件/记录是旧版遗留工作流，与本站部署无关，可无视

## 6. 线上验证

1. 打开 `https://lanyongzhong.app`，**Ctrl+F5** 强制刷新，核对本次更新点
2. 手机关闭 WiFi 用流量再打开一次，确认移动端正常

## 7. 出问题怎么办

| 现象 | 处理 |
| --- | --- |
| Actions 红叉 | 点进失败 run 看日志，九成是 MDX 语法或 frontmatter 字段问题，修复后重新 push 即可 |
| 需要回滚上一版 | `git revert HEAD` → `git push`，站点自动恢复上一版本（发布永远可逆） |
| 线上正常、本地报错 | 删除 `node_modules` 重新 `npm install` |
| 改了没生效 | 确认 Actions 是绿勾；浏览器强刷（Ctrl+F5）；CDN 缓存最长几分钟 |

## 命令速查卡

```bash
# ── 日常更新 ──────────────────────────────
npm run dev                     # 本地预览（边改边看）
npx astro check                 # 类型检查
npm run build                   # 构建
npm run preview                 # 预览构建产物
node scripts/capture.mjs        # 生成分段验收截图（.review/）

# ── 发布 ─────────────────────────────────
git add -A
git commit -m "内容: xxx"
git push                        # 推送后 Actions 自动部署

# ── 补救 ─────────────────────────────────
git revert HEAD                 # 回滚最近一次提交
git push
rm -rf node_modules ; npm install   # 本地环境重置（PowerShell: Remove-Item -Recurse -Force node_modules）
```
