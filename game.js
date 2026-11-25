let stages = [];
let currentStage = 1;
let soundEnabled = false;

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    loadStages();
    setupEventListeners();
});

// 스테이지 데이터 로드
async function loadStages() {
    try {
        const response = await fetch('stages.json');
        stages = await response.json();
        stages.sort((a, b) => a.stage - b.stage);
        displayStageInfo(1);
    } catch (error) {
        console.error('스테이지 데이터를 로드할 수 없습니다:', error);
    }
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // PRESS START 화면
    document.getElementById('startScreen').addEventListener('click', startGame);
    document.addEventListener('keypress', (e) => {
        if (document.getElementById('startScreen').style.display !== 'none' && e.code === 'Space') {
            startGame();
        }
    });

    // 스테이지 선택
    document.querySelectorAll('.stage-node').forEach(node => {
        node.addEventListener('click', (e) => {
            const stageNum = parseInt(e.target.dataset.stage);
            selectStage(stageNum);
        });
    });

    // 탭 버튼
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            switchTab(tabName);
        });
    });

    // 액션 버튼
    document.getElementById('playBtn').addEventListener('click', playGame);
    document.getElementById('sourceBtn').addEventListener('click', viewSource);

    // 키보드 네비게이션
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('gameScreen').style.display !== 'none') {
            if (e.key === 'ArrowLeft') selectStage(Math.max(1, currentStage - 1));
            if (e.key === 'ArrowRight') selectStage(Math.min(5, currentStage + 1));
            if (e.key === 'Enter') playGame();
        }
    });

    // 사운드 토글
    document.getElementById('soundToggle').addEventListener('click', toggleSound);
}

// 게임 시작
function startGame() {
    playSound('start');
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    selectStage(1);
}

// 스테이지 선택
function selectStage(stageNum) {
    currentStage = stageNum;

    // 맵에서 활성 스테이지 표시
    document.querySelectorAll('.stage-node').forEach(node => {
        node.classList.remove('active');
    });
    document.querySelector(`.stage-node[data-stage="${stageNum}"]`).classList.add('active');

    // 플레이어 마커 이동 (SVG에서)
    const svg = document.querySelector('.stage-svg');
    const nodes = Array.from(svg.querySelectorAll('.stage-node'));
    const targetNode = nodes.find(n => parseInt(n.getAttribute('data-stage')) === stageNum);

    if (targetNode) {
        const marker = document.getElementById('playerMarker');
        const cx = targetNode.getAttribute('cx');
        const cy = targetNode.getAttribute('cy');
        marker.setAttribute('x', cx);
        marker.setAttribute('y', parseInt(cy) + 8);
    }

    displayStageInfo(stageNum);
    playSound('click');
}

// 스테이지 정보 표시
function displayStageInfo(stageNum) {
    const stage = stages.find(s => s.stage === stageNum);
    if (!stage) return;

    // 제목
    document.getElementById('stageTitle').textContent = `STAGE ${stage.stage} · ${stage.icon} ${stage.title}`;

    // 미션
    document.getElementById('missionText').textContent = stage.mission;

    // WHY
    document.getElementById('whyText').textContent = stage.why;

    // ITEMS
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '';
    stage.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        itemsList.appendChild(li);
    });

    // EXP
    document.getElementById('expText').textContent = stage.exp;

    // BOSS
    document.getElementById('bossProblem').textContent = stage.boss.problem;
    document.getElementById('bossSolve').textContent = stage.boss.solve;

    // RESULT
    document.getElementById('resultGood').textContent = stage.result.good;
    document.getElementById('resultBad').textContent = stage.result.bad;
    document.getElementById('resultNext').textContent = stage.result.next || '';

    // 진행도 게이지
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const percentage = stage.result.progress;
    progressFill.style.width = percentage + '%';
    progressText.textContent = percentage + '%';

    // 기술 스택
    const techStack = document.getElementById('techStack');
    techStack.innerHTML = stage.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join(' ');

    // 버튼 URL
    document.getElementById('playBtn').onclick = () => {
        window.open(stage.playUrl, '_blank');
        playSound('click');
    };
    document.getElementById('sourceBtn').onclick = () => {
        window.open(stage.sourceUrl, '_blank');
        playSound('click');
    };

    // 첫 탭 활성화
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    document.querySelector('.tab-button').classList.add('active');
    document.getElementById('mission').classList.add('active');

    // 모든 스테이지가 완료되었는지 확인
    if (stageNum === 5) {
        checkGameComplete();
    }
}

// 탭 전환
function switchTab(tabName) {
    // 모든 탭 비활성화
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

    // 선택한 탭 활성화
    document.querySelector(`.tab-button[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');

    playSound('click');
}

// 게임 플레이 (Streamlit 앱 열기)
function playGame() {
    const stage = stages.find(s => s.stage === currentStage);
    if (stage) {
        window.open(stage.playUrl, '_blank');
        playSound('start');
    }
}

// 소스 보기 (GitHub 열기)
function viewSource() {
    const stage = stages.find(s => s.stage === currentStage);
    if (stage) {
        window.open(stage.sourceUrl, '_blank');
        playSound('click');
    }
}

// 사운드 토글
function toggleSound() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('soundToggle');
    if (soundEnabled) {
        btn.classList.remove('muted');
        btn.textContent = '🔊';
    } else {
        btn.classList.add('muted');
        btn.textContent = '🔇';
    }
}

// 사운드 재생 (실제로는 시각적 피드백만)
function playSound(type) {
    if (!soundEnabled) return;

    // 간단한 비주얼 피드백
    if (type === 'click') {
        // 클릭 시각적 피드백
    } else if (type === 'start') {
        // 시작 시각적 피드백
    }
}

// 게임 완료 확인
function checkGameComplete() {
    // 선택적: 5번 스테이지 완료 후 추가 연출
    // 나중에 "GAME OVER" 화면으로 전환할 수 있음
}

// 모든 스테이지 완료 화면 표시 (선택)
function showGameOver(message) {
    const stageInfo = document.getElementById('stageInfo');
    const gameOver = document.getElementById('gameOver');

    if (stageInfo) stageInfo.classList.add('hidden');
    if (gameOver) gameOver.classList.remove('hidden');

    if (message) {
        document.getElementById('bioText').textContent = message;
    }
}

// 하단 "GAME OVER" 버튼 (선택사항)
function showAllClear() {
    console.log('모든 스테이지 클리어!');
    // 필요시 특수 연출 추가
}
