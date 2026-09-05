포트폴리오 사이트 — 사용법
==========================

[1] 사이트 보기
    index.html 을 더블클릭

[2] 내용 수정 (Claude 없이 혼자)
    editor.html 을 더블클릭 → 고치고 → 우측 상단 [data.js 내려받기]
    → 내려받은 data.js 를 이 폴더의 data.js 에 덮어쓰기 → 끝

    · 모든 글/숫자/이미지가 data.js 한 파일에 들어 있습니다.
    · HTML/CSS 는 건드릴 필요 없습니다.
    · [되돌리기] 로 직전 수정 취소 가능.
    · 다른 PC에서 이어서 고치려면 [data.js 불러오기] 로 파일을 올리세요.

[3] 이미지 추가
    img 폴더에 .webp / .jpg / .png 를 넣고,
    data.js 맨 아래 "images" 목록에 파일명을 한 줄 추가하면
    편집기 드롭다운에 나타납니다.

    "images": [
      "bb-hero.webp",
      "새이미지.webp",     <- 이렇게 추가
      ...
    ]

[4] 배포
    폴더 전체를 zip 으로 묶어
    https://app.netlify.com/drop 에 끌어다 놓으면 주소가 나옵니다.
    또는 GitHub 저장소에 올리고 Pages 를 켜면 됩니다.
    수정 후에는 같은 방법으로 다시 올리면 갱신됩니다.

[폴더 구조]
    index.html          첫 화면          <- 사이트 보려면 이것
    beastblood.html     비스트블러드 상세
    nomanual.html       NOMANUAL 상세
    editor.html         편집기            <- 내용 고치려면 이것
    data.js             모든 내용         <- 편집기가 만들어 주는 파일

    img/                이미지 40장
    assets/             건드릴 일 없는 코드
      style.css           디자인
      render.js           data.js 를 화면으로 그리는 코드
      app.js              탭·스크롤 동작
    docs/               문서
      README.txt          이 파일
      DESIGN.md           디자인 규격서

    * 평소에 열 파일은 index.html 과 editor.html 두 개뿐입니다.
    * data.js 만 바꾸면 사이트 내용이 전부 바뀝니다.
