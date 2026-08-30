// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 自定义域名（GitHub Pages）：https://lanyongzhong.app
// DNS 已指向 GitHub Pages；域名在 Name.com 注册（学生包首年免费）
export default defineConfig({
  site: 'https://lanyongzhong.app',
  trailingSlash: 'never',
  integrations: [mdx(), sitemap()],
  vite: {
    // @ts-expect-error @tailwindcss/vite 与 Astro 内置 Vite 类型版本差异，构建无影响
    plugins: [tailwindcss()],
  },
});
