// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages 用户站点：https://xiaolantongxue666.github.io
// 仓库固定为 xiaolantongxue666/xiaolantongxue666.github.io（base 为根路径，无需改页面链接）
export default defineConfig({
  site: 'https://xiaolantongxue666.github.io',
  trailingSlash: 'never',
  integrations: [mdx(), sitemap()],
  vite: {
    // @ts-expect-error @tailwindcss/vite 与 Astro 内置 Vite 类型版本差异，构建无影响
    plugins: [tailwindcss()],
  },
});
