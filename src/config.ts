/**
 * 站点全局配置：个人信息、联系方式、社交链接都集中在这里维护。
 */

export const SITE = {
  /** 姓名（同时作为 Logo 使用） */
  name: '兰永重',
  /** 职业定位 */
  role: 'AI Application Developer',
  roleSub: 'Python / Machine Learning',
  roleSubZh: 'AI 应用开发 · Python / 机器学习',

  /**
   * 站点正式地址（GitHub Pages 用户站点），与 astro.config.mjs 的 site 保持一致，
   * 用于 canonical URL / Open Graph / sitemap。
   */
  url: 'https://xiaolantongxue666.github.io',

  /** 公开联系方式：只保留邮箱，手机号与微信不公开 */
  email: 'lanyongzhong0929@qq.com',

  /** GitHub 主页（对外展示的个人主页链接） */
  github: 'https://github.com/xiaolantongxue666',

  /**
   * 应用户要求：网站不提供简历下载，也不设在线简历页，
   * 仅通过项目与实习经历内容在线展示。PDF 简历不随站点发布。
   */
} as const;
