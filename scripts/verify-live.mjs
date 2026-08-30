import { request } from 'node:https';

const html = await new Promise((resolve, reject) => {
  request('https://lanyongzhong.app', (res) => {
    let d = '';
    res.on('data', (c) => (d += c));
    res.on('end', () => resolve(d));
  }).on('error', reject).end();
});

const nums = [...html.matchAll(/class="sec-num[^"]*"[^>]*>([^<]*)</g)].map((m) => m[1].trim());
console.log('区块编号（共 ' + nums.length + ' 个）:');
nums.forEach((n) => console.log('  -', n));

const checks = {
  'About 标题': '从数据，到模型，再到 AI 应用',
  'Capabilities 标题': '我能做什么',
  'Stack 标题': 'Tools I Work With',
  'Work 标题': 'Selected Work',
  'Experience 标题': "Where I've Worked",
  'Education 标题': 'Education',
  'Connect 标题': "Let's connect.",
  '能力线 01 AI Application Engineering': 'AI Application Engineering',
  '能力线 02 Machine Learning Engineering': 'Machine Learning Engineering',
  '能力线 03 Deep Learning & Multimodal': 'Deep Learning &amp; Multimodal Modeling',
  '指标 90 → 95%': '90 → 95%',
  'REAL PROJECT OUTPUT 标签': 'Real Project Output',
  'Career Path 注脚': '2025 为研究生项目阶段',
};
for (const [k, v] of Object.entries(checks)) {
  console.log((html.includes(v) ? '✓' : '✗'), k);
}
