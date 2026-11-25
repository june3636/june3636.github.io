# 🕹️ 최우준 포트폴리오

레트로 게임 스타일의 포트폴리오 웹사이트 - 5개 프로젝트를 "STAGE SELECT" 콘셉트로 소개합니다.

## 프로젝트 구조

```
portfolio/
├── index.html              # 메인 HTML 파일
├── style.css              # 스타일시트 (레트로 게임 디자인)
├── game.js                # 게임 로직 및 인터랙션
├── stages.json            # 프로젝트 5개 정보 (수정은 여기서만)
├── README.md              # 이 파일
└── assets/
    ├── screenshots/       # 스크린샷 (stage1.png ~ stage5.png)
    └── sounds/           # 효과음 (선택사항)
```

## 주요 기능

- **🎮 PRESS START**: 첫 화면에서 클릭 또는 스페이스바로 시작
- **👤 플레이어 프로필**: 이름, 학교, 개발자 등급, 스킬 레벨 표시
- **🗺️ STAGE MAP**: 5개 프로젝트를 게임 맵처럼 표시
- **📋 스테이지 정보**: 미션, WHY, 아이템, EXP, 보스전, 결과를 탭으로 구성
- **▶️ PLAY 버튼**: 각 프로젝트의 Streamlit 앱으로 이동
- **📜 SOURCE 버튼**: 각 프로젝트의 GitHub 코드 보기
- **⌨️ 키보드 네비게이션**: ← → 로 스테이지 이동, Enter로 플레이

## 사용 기술

- **HTML5** - 구조
- **CSS3** - 반응형 레트로 게임 스타일 디자인
- **JavaScript (Vanilla)** - 상호작용 및 동적 콘텐츠
- **JSON** - 프로젝트 데이터 저장

## 디자인 특징

| 요소 | 사양 |
|---|---|
| **배경** | 어두운 남색 (#0f0f23) + 별 점들 |
| **색상** | 네온 초록 #39ff14, 네온 분홍 #ff2e88, 금색 #ffd700 |
| **글꼴** | Press Start 2P (제목), Galmuri 또는 기본 폰트 (본문) |
| **스타일** | 아케이드 게임, 픽셀, 다크 모드 |
| **효과** | 깜빡임, 튀어나오기, 2px 버튼 눌림 효과 |

## 배포 방법 (GitHub Pages)

### 1. GitHub 저장소 만들기
```bash
# GitHub에서 new repository 생성
# 저장소 이름: portfolio
```

### 2. 로컬에서 Git 설정
```bash
cd portfolio
git init
git add .
git commit -m "Initial commit: Retro game portfolio"
git branch -M main
git remote add origin https://github.com/[username]/portfolio.git
git push -u origin main
```

### 3. GitHub Pages 활성화
1. GitHub 저장소 열기
2. Settings → Pages 메뉴 이동
3. Source에서 "Deploy from a branch" 선택
4. Branch: main, folder: / (root) 선택
5. Save 클릭

### 4. 배포 완료
- 주소: `https://june3636.github.io/portfolio/`
- 이 주소를 Notion 포트폴리오 맨 위에 추가

## 데이터 수정 방법

모든 프로젝트 정보는 **`stages.json`** 파일에서만 수정합니다.

### 스테이지 데이터 구조

```json
{
  "stage": 1,
  "icon": "🎮",
  "title": "게임을 찾아주는 웹앱",
  "mission": "게임을 찾아주는 웹앱",
  "why": "첫 프로젝트로 게임 추천 앱을 만들고 싶었다",
  "items": ["항목1", "항목2", "항목3"],
  "exp": "배운 점",
  "boss": {
    "problem": "어려웠던 점",
    "solve": "해결 방법"
  },
  "result": {
    "progress": 85,
    "good": "잘 된 점",
    "bad": "아쉬운 점",
    "next": "다음 도전"
  },
  "tech": ["Python", "Streamlit", "AI"],
  "screenshot": "assets/screenshots/stage1.png",
  "playUrl": "https://앱-배포주소.streamlit.app/",
  "sourceUrl": "https://github.com/june3636/프로젝트-저장소"
}
```

## 스크린샷 추가

1. 각 프로젝트의 Streamlit 앱 실행
2. 주요 화면 캡처
3. `assets/screenshots/` 폴더에 `stage1.png` ~ `stage5.png` 로 저장

## 호환성

- 최신 브라우저 (Chrome, Firefox, Safari, Edge)
- 모바일 반응형 디자인 지원
- 접근성 고려 (다크 모드 선호도 지원)

## 커스터마이징

### 플레이어 정보 변경
`index.html`에서 `.profile-card` 섹션 수정

### 색상 변경
`style.css`에서 `:root` CSS 변수 수정:
```css
:root {
    --neon-green: #39ff14;
    --neon-pink: #ff2e88;
    --gold: #ffd700;
    --dark-blue: #0f0f23;
}
```

### 글꼴 변경
`style.css`에서 font-family 값 수정

## 문제 해결

### 스크린샷이 안 보일 때
- 파일 경로 확인: `assets/screenshots/stage1.png` 등
- 파일명이 정확한지 확인

### Streamlit 앱이 느릴 때
- Streamlit 무료 서버는 처음 접속 시 1분 정도 걸릴 수 있음
- 로딩 메시지: "LOADING... 서버를 깨우는 중 (최대 1분)"

### 모바일에서 맵이 안 보일 때
- 브라우저 새로고침
- 스케일 조정 (Ctrl + 0)

## 라이선스

© 2024 최우준. All rights reserved.

## 연락처

- GitHub: https://github.com/june3636
- Notion: 최우준의 포트폴리오

---

**마지막 업데이트**: 2024-11-25
**상태**: 활성 개발 중
