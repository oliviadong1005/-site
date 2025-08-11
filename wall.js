// wall.js  基于 GitHub Issues 的留言墙
const OWNER = 'zplapi';           // 改成你的用户名
const REPO  = 'zplapi-site';      // 改成你的仓库名
const ISSUES_URL = `https://api.github.com/repos/${OWNER}/${REPO}/issues`;

const wall   = document.getElementById('wall');
const form   = document.getElementById('msgForm');

/* 读取留言 */
async function loadIssues(){
  const res  = await fetch(`${ISSUES_URL}?state=open&labels=wall`);
  const list = await res.json();
  wall.innerHTML = '';
  list.forEach(iss=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <b>${iss.user.login}</b>：
      ${iss.body.replace(/\r\n/g,'<br>')}
      <div style="font-size:0.8em;color:#888">
        ${new Date(iss.created_at).toLocaleString()}
      </div>
    `;
    wall.appendChild(card);
  });
}

/* 发表留言 */
form.addEventListener('submit', async e=>{
  e.preventDefault();
  const nick = nickname.value.trim();
  const text = content.value.trim();
  if(!nick || !text) return alert('内容不能为空');

  // 弹出 OAuth 授权登录
  const title = `留言：${nick}`;
  const body  = text;
  const res = await fetch(ISSUES_URL, {
    method : 'POST',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `token ${prompt('请输入你的 GitHub Personal Access Token')} `
    },
    body: JSON.stringify({
      title,
      body,
      labels: ['wall']
    })
  });

  if(res.ok){
    form.reset();
    await loadIssues();
  }else{
    alert('提交失败：' + res.status);
  }
});

loadIssues();
