window.initUI=function(){
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
  reveal();
  if(location.hash && location.hash.length>1){
    var t=document.querySelector(location.hash);
    if(t) setTimeout(function(){t.scrollIntoView()},60);
  }
};
