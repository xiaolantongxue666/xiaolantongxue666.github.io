/** 诊断脚本：列出 Pages 相关工作流运行 + 最新失败运行的失败原因 */
const repo = 'xiaolantongxue666/xiaolantongxue666.github.io';

async function get(path) {
  const res = await fetch(`https://api.github.com/repos/${repo}/${path}`, {
    headers: { 'User-Agent': 'diag', Accept: 'application/vnd.github+json' },
  });
  return res.json();
}

const runs = await get('actions/runs?per_page=10');
console.log('总运行数:', runs.total_count);
for (const r of runs.workflow_runs ?? []) {
  console.log('---');
  console.log(`run#${r.id} | ${r.name}`);
  console.log(`  事件: ${r.event} | 状态: ${r.status} | 结论: ${r.conclusion ?? '-'}`);
  console.log(`  时间: ${r.created_at} | 提交: ${r.head_sha.slice(0, 7)} | 路径: ${r.path ?? '-'}`);
}

// 找最近一次失败的 legacy 运行，拉取失败 job 与注释
const failed = (runs.workflow_runs ?? []).find(
  (r) => r.name === 'pages build and deployment' && r.conclusion === 'failure',
);
if (failed) {
  console.log('\n===== 最新失败运行详情 run#' + failed.id + ' =====');
  const jobs = await get(`actions/runs/${failed.id}/jobs`);
  for (const job of jobs.jobs ?? []) {
    console.log('job:', job.name, '|', job.conclusion);
    for (const s of job.steps ?? []) {
      if (s.conclusion !== 'success' && s.conclusion !== 'skipped') {
        console.log('   失败步骤:', s.name, '->', s.conclusion);
      }
    }
  }
}
