window.initUI=function(){
  var eb=document.getElementById('editBtn');
  if(eb) eb.addEventListener('click',function(){ if(window.openGate) window.openGate() });
  var nav=document.getElementById('nav');
  if(nav) addEventListener('scroll',function(){ nav.classList.toggle('stuck', scrollY>8) },{passive:true});
  var tabs=[].slice.call(document.querySelectorAll('.tab'));
  var wbs=[].slice.call(document.querySelectorAll('.wb'));
  function apply(f,push){
    tabs.forEach(function(t){ t.setAttribute('aria-selected', t.dataset.f===f) });
    wbs.forEach(function(w){ w.hidden = !(f==='all' || w.dataset.cat===f) });
    if(push) history.replaceState(null,'', f==='all' ? location.pathname : '#'+f);
    reveal();
  }
  tabs.forEach(function(t){ t.addEventListener('click',function(){ apply(t.dataset.f,true) }) });
  if(tabs.length){
    var h=location.hash.slice(1);
    apply(tabs.some(function(t){return t.dataset.f===h})?h:'all', false);
  }
  var io=null;
  function reveal(){
    var els=[].slice.call(document.querySelectorAll('.rv:not(.in)')).filter(function(e){return !e.hidden});
    if(matchMedia('(prefers-reduced-motion:reduce)').matches || !('IntersectionObserver' in window)){
      els.forEach(function(e){ e.classList.add('in') }); return;
    }
    if(!io) io=new IntersectionObserver(function(es){
      es.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('in'); io.unobserve(x.target) } })
    },{rootMargin:'0px 0px -6% 0px', threshold:.04});
    els.forEach(function(e,i){ e.style.transitionDelay=(i%3*70)+'ms'; io.observe(e) });
  }
  // 우측 목차 현재 위치 표시
  var links=[].slice.call(document.querySelectorAll('.toc a[data-t]'));
  var secs=links.map(function(a){return a.dataset.t?document.getElementById(a.dataset.t):null});
  links.forEach(function(a){ if(a.dataset.t==='__self') a.setAttribute('aria-current','true') });
  if(secs.some(Boolean)){
    var mark=function(){
      var best=-1, line=innerHeight*0.35;
      secs.forEach(function(s,i){ if(s && s.getBoundingClientRect().top<=line) best=i });
      if(best<0) best=0;
      links.forEach(function(a,i){ a.setAttribute('aria-current', i===best) });
    };
    addEventListener('scroll',mark,{passive:true}); addEventListener('resize',mark); mark();
  }
  reveal();
  if(location.hash && location.hash.length>1){
    var t=document.querySelector(location.hash);
    if(t) setTimeout(function(){t.scrollIntoView()},60);
  }
};
