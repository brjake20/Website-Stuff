/* ═══ CURSOR ═══ */
const cur=document.getElementById('cur'),curR=document.getElementById('curR');
if(cur&&curR){
  document.addEventListener('mousemove',e=>{
    cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';
    setTimeout(()=>{curR.style.left=e.clientX+'px';curR.style.top=e.clientY+'px';},90);
  });
}

/* ═══ NAV SCROLL ═══ */
const nav=document.getElementById('nav');
if(nav) window.addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>60));

/* ═══ HAMBURGER ═══ */
const burger=document.getElementById('burger');
const mobMenu=document.getElementById('mobMenu');
if(burger&&mobMenu){
  burger.addEventListener('click',()=>{
    burger.classList.toggle('open');
    mobMenu.classList.toggle('open');
    document.body.style.overflow=mobMenu.classList.contains('open')?'hidden':'';
  });
  mobMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    burger.classList.remove('open');
    mobMenu.classList.remove('open');
    document.body.style.overflow='';
  }));
}

/* ═══ SCROLL REVEAL ═══ */
const obs=new IntersectionObserver(e=>e.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* Story section reveals */
document.querySelectorAll('.story-ui').forEach(el=>{
  new IntersectionObserver(e=>e.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:.2}).observe(el);
});
