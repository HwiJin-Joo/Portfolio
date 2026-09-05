(function(){
  var DRAFT=null;
  try{ var d=localStorage.getItem('site-draft'); if(d) DRAFT=JSON.parse(d); }catch(e){}
  if(DRAFT) window.SITE=DRAFT;
  var S=window.SITE, $=function(s,r){return (r||document).querySelector(s)};
  var esc=function(t){return String(t==null?'':t)};
  function el(h){var d=document.createElement('div'); d.innerHTML=h.trim(); return d.firstChild}

  /* ---------- 공통 ---------- */
  function nav(active){
    var links = active==='index'
      ? '<li><a href="#work">Work</a></li><li><a href="#career">Career</a></li><li><a href="#contact">Contact</a></li>'
      : '<li><a href="index.html#work">Work</a></li>'+S.projects.map(function(p){
          return '<li><a href="'+p.id+'.html">'+esc(p.name)+'</a></li>'}).join('');
    var cta = active==='index'
      ? '<li><a class="cta" href="'+esc(S.meta.notion)+'">경력기술서</a></li>'
      : '<li><a class="cta" href="index.html#contact">연락처</a></li>';
    return '<nav class="nav" id="nav"><div class="wrap">'+
      '<div class="brand-wrap"><a class="brand" href="index.html">JOO<span>.</span>HWIJIN</a>'+
      '<button type="button" class="edit-btn" id="editBtn" title="사이트 내용 수정">편집</button></div>'+
      '<ul>'+links+cta+'</ul></div></nav>';
  }
  function footer(){return '<footer><div class="wrap"><span>주휘진 · HWIJIN JOO</span><span>GAME DESIGNER</span></div></footer>'}

  function toc(items){
    return '<nav class="toc" id="toc" aria-label="목차"><ul>'+items.map(function(it,i){
      return '<li><a href="'+it[0]+'" data-t="'+(it[2]||'')+'">'+
        '<span class="i">'+String(i+1).padStart(2,'0')+'</span>'+
        '<span class="t">'+esc(it[1])+'</span></a></li>'}).join('')+'</ul></nav>';
  }

  /* ---------- index ---------- */
  function renderIndex(){
    var h=S.hero;
    var skills=S.skills.map(function(s){return '<span class="skill'+(s.key?' k':'')+'">'+esc(s.t)+'</span>'}).join('');
    var stats=S.stats.map(function(s){return '<div class="stat"><div class="n mono">'+esc(s.n)+'</div><div class="l">'+s.l+'</div></div>'}).join('');
    var cards=S.projects.map(function(p){
      var chips=p.chips.map(function(c){return '<span class="chip'+(c.live?' live':'')+'">'+esc(c.t)+'</span>'}).join('');
      var duties=p.duties.map(function(d){return '<li><b>'+esc(d[0])+'</b> — '+d[1]+'</li>'}).join('');
      var outs=p.outcomes.map(function(o){return '<li><span>'+o+'</span></li>'}).join('');
      return '<a class="pcard rv" href="'+p.id+'.html">'+
        '<div class="pcard-media"><img src="img/'+esc(p.hero)+'" alt="'+esc(p.name)+' 인게임 화면" loading="lazy">'+
        '<div class="pcard-head"><h3>'+esc(p.name)+'</h3><p class="genre">'+esc(p.genre)+'</p><div class="chips">'+chips+'</div></div></div>'+
        '<div class="pcard-body"><div><div class="blk-h">주요 업무</div><ul class="duty">'+duties+'</ul></div>'+
        '<div><div class="blk-h">성과</div><ul class="outcome">'+outs+'</ul></div>'+
        '<span class="pcard-more">'+p.blocks.length+'건의 업무 이력 자세히 보기 →</span></div></a>';
    }).join('');
    var jobs=S.career.map(function(j){
      return '<div class="job rv"><div class="when">'+esc(j.when)+'</div><div><h3>'+esc(j.role)+'</h3>'+
        '<div class="co mono">'+esc(j.co)+'</div><p>'+esc(j.desc)+'</p></div></div>'}).join('');
    var aw=S.awards.map(function(a){return '<li><span class="yr">'+esc(a[0])+'</span><span>'+a[1]+'</span></li>'}).join('');
    var cc=S.contact.map(function(c){
      return '<a class="ccard rv" href="'+esc(c[2])+'"><span><span class="k">'+esc(c[0])+'</span>'+
        '<span class="v'+(c[3]?' mono':'')+'">'+esc(c[1])+'</span></span><span class="arw">↗</span></a>'}).join('');

    document.body.innerHTML = nav('index')+
    '<header class="hero" id="top"><div class="hero-bg"><img src="img/'+esc(h.bg)+'" alt="" fetchpriority="high"></div>'+
    '<div class="wrap"><div class="hero-row"><div>'+
      '<p class="kicker">'+esc(h.kicker)+'</p>'+
      '<h1>'+esc(h.h1a)+'<br><em>'+esc(h.h1b)+'</em></h1>'+
      '<p class="lede">'+h.lede+'</p>'+
      '<div class="skills">'+skills+'</div>'+
      '<div class="hero-links"><a class="cta solid" href="#work">프로젝트 보기</a>'+
      '<a class="cta" href="'+esc(S.contact[0][2])+'">'+esc(S.contact[0][1])+'</a></div>'+
    '</div><div class="portrait"><img src="img/'+esc(h.portrait)+'" alt="주휘진 프로필 사진" width="440" height="440"></div></div>'+
    '<div class="stats">'+stats+'</div></div></header>'+
    '<main><section id="work"><div class="wrap"><div class="sec-head rv"><span class="idx mono">01 / WORK</span><h2>프로젝트</h2>'+
    '<span class="sub">카드를 누르면 카테고리별 업무 이력으로 이동합니다</span></div>'+cards+'</div></section>'+
    '<section id="career"><div class="wrap"><div class="sec-head rv"><span class="idx mono">02 / CAREER</span><h2>경력</h2></div>'+
    jobs+'<ul class="misc rv" style="margin-top:52px">'+aw+'</ul></div></section>'+
    '<section id="contact"><div class="wrap"><div class="sec-head rv"><span class="idx mono">03 / CONTACT</span><h2>연락처</h2></div>'+
    '<div class="contact-grid">'+cc+'</div></div></section></main>'+
    toc([['#work','프로젝트','work'],['#career','경력','career'],['#contact','연락처','contact']])+footer();
  }

  /* ---------- 상세 ---------- */
  function renderProject(id){
    var p=null; S.projects.forEach(function(x){ if(x.id===id) p=x });
    if(!p) return;
    document.title=p.name+' — '+S.meta.title;
    var counts={all:p.blocks.length};
    p.blocks.forEach(function(b){ counts[b.cat]=(counts[b.cat]||0)+1 });
    var tabs=p.cats.filter(function(c){return counts[c[0]]}).map(function(c,i){
      return '<button class="tab" role="tab" data-f="'+c[0]+'" aria-selected="'+(c[0]==='all')+'">'+
        esc(c[1])+'<span class="c">'+counts[c[0]]+'</span></button>'}).join('');
    var lbl={}; p.cats.forEach(function(c){lbl[c[0]]=c[1]});
    var blocks=p.blocks.map(function(b){
      var roles=b.roles.map(function(r){return '<li>'+esc(r)+'</li>'}).join('');
      var g='';
      if(b.images.length){
        g='<div class="wb-gal"><figure class="big"><img src="img/'+esc(b.images[0])+'" alt="" loading="lazy"></figure>';
        var rest=b.images.slice(1,3);
        if(rest.length) g+='<div class="row">'+rest.map(function(i){
          return '<figure><img src="img/'+esc(i)+'" alt="" loading="lazy"></figure>'}).join('')+'</div>';
        g+='</div>';
      }
      return '<article class="wb rv'+(b.images.length?'':' solo')+'" data-cat="'+b.cat+'">'+
        '<div><div class="wb-cat">'+esc(lbl[b.cat]||b.cat)+'</div><h3>'+esc(b.heading)+'</h3>'+
        '<p class="sub">'+esc(b.title)+'</p><table class="wt">'+
        '<tr><th>기간</th><td class="mono">'+esc(b.period)+'</td></tr>'+
        '<tr><th>역할</th><td><ul class="roles">'+roles+'</ul></td></tr>'+
        '<tr class="res"><th>성과</th><td>'+esc(b.result)+'</td></tr>'+
        '<tr class="skl"><th>기술</th><td>'+esc(b.skills)+'</td></tr></table></div>'+g+'</article>';
    }).join('');
    var sm=p.summary.map(function(s){return '<div><dt>'+esc(s[0])+'</dt><dd>'+esc(s[1])+'</dd></div>'}).join('');
    document.body.innerHTML = nav(id)+
      '<header class="phead"><div class="phead-bg"><img src="img/'+esc(p.hero)+'" alt=""></div><div class="wrap">'+
      '<a class="back" href="index.html">← 전체 프로젝트</a><h1>'+esc(p.name)+'</h1>'+
      '<p class="genre">'+esc(p.genre)+'</p><dl class="psum">'+sm+'</dl></div></header>'+
      '<div class="tabs"><div class="wrap" role="tablist">'+tabs+'</div></div>'+
      '<main class="blocks"><div class="wrap">'+blocks+'</div></main>'+
      toc([['index.html','전체 프로젝트','']].concat(S.projects.map(function(x){
        return [x.id+'.html', x.name, x.id===id?'__self':'']}))) + footer();
  }

  var page=document.body.dataset.page;
  if(page==='index') renderIndex(); else renderProject(page);
  if(DRAFT){
    var bar=el('<div class="draft-bar">초안 미리보기 — 이 브라우저에서만 보입니다'+
      '<button type="button" id="draftDrop">초안 버리기</button>'+
      '<a href="editor.html">편집기로</a></div>');
    document.body.appendChild(bar);
    bar.querySelector('#draftDrop').onclick=function(){
      if(confirm('저장하지 않은 수정 내용이 사라집니다. 계속할까요?')){
        try{ localStorage.removeItem('site-draft') }catch(e){}
        location.reload();
      }
    };
  }
  if(window.initUI) window.initUI();
})();
