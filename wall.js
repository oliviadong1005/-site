const form   = document.getElementById('msgForm');
const wall   = document.getElementById('wall');
const LS_KEY = 'zpl_wall';

function render(){
  const data = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  wall.innerHTML = '';
  data.forEach(item=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<b>${item.nick}</b>：${item.text}`;
    wall.appendChild(card);
  });
}

form.addEventListener('submit',e=>{
  e.preventDefault();
  const nick = nickname.value.trim();
  const text = content.value.trim();
  if(!nick || !text) return;
  const data = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  data.unshift({nick,text});          // 已去掉 replies 字段
  localStorage.setItem(LS_KEY,JSON.stringify(data));
  form.reset();
  render();
});

render();   // 首次加载
