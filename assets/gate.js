/* 편집기 접근 게이트 — 정적 사이트용 가림막(보안 아님)
   비밀번호 변경: docs/set-password.html 에서 새 해시를 만들어 아래 PW_HASH 만 교체 */
window.PW_HASH = "ca6a65c4d20c6c5bd46af2b8953c6f4046c1c4823b254d3f9e88014e32ffcb36";

(function(){
  async function sha256(t){
    var b=new TextEncoder().encode(t);
    var h=await crypto.subtle.digest('SHA-256',b);
    return [].map.call(new Uint8Array(h),function(x){return x.toString(16).padStart(2,'0')}).join('');
  }
  window.gateHash = sha256;

  window.openGate=function(){
    var ov=document.createElement('div'); ov.className='gate';
    ov.innerHTML='<div class="gate-box" role="dialog" aria-modal="true" aria-label="편집기 접근">'+
      '<div class="gate-h">편집기 접근</div>'+
      '<p class="gate-d">사이트 내용을 수정하는 도구입니다.</p>'+
      '<input type="password" id="gpw" placeholder="비밀번호" autocomplete="current-password">'+
      '<p class="gate-e" id="gerr" hidden>비밀번호가 맞지 않습니다</p>'+
      '<div class="gate-btns"><button type="button" class="g-cancel">취소</button>'+
      '<button type="button" class="g-ok">열기</button></div></div>';
    document.body.appendChild(ov);
    var inp=ov.querySelector('#gpw'), err=ov.querySelector('#gerr');
    setTimeout(function(){inp.focus()},30);
    function close(){ ov.remove(); document.removeEventListener('keydown',esc) }
    function esc(e){ if(e.key==='Escape') close() }
    document.addEventListener('keydown',esc);
    ov.addEventListener('click',function(e){ if(e.target===ov) close() });
    ov.querySelector('.g-cancel').onclick=close;
    async function go(){
      var h=await sha256(inp.value);
      if(h===window.PW_HASH){
        try{ sessionStorage.setItem('edit-ok', h) }catch(e){}
        location.href='editor.html';
      } else {
        err.hidden=false; inp.value=''; inp.focus();
        ov.querySelector('.gate-box').classList.remove('shake');
        void ov.offsetWidth; ov.querySelector('.gate-box').classList.add('shake');
      }
    }
    ov.querySelector('.g-ok').onclick=go;
    inp.addEventListener('keydown',function(e){ if(e.key==='Enter') go() });
  };
})();
