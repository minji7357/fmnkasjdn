const paddle = document.getElementById('player1');
const paddle2 = document.getElementById('player2');
const puck = document.getElementById('puck');
const score1El = document.getElementById('score1');
const score2El = document.getElementById('score2');

let score1 = 0;
let score2 = 0;

const gameWidth = 400;
const gameHeight = 600;
const paddleWidth = 80;
const paddleHeight = 15;
const puckSize = 20;

let paddleX = 160;
let paddle2X = 160;
const paddleSpeed = 5;

// 키 상태 저장
let keys = {
    ArrowLeft: false,
    ArrowRight: false
};

// 키 이벤트
document.addEventListener('keydown', e => {
    if(keys.hasOwnProperty(e.key)) keys[e.key] = true;
});
document.addEventListener('keyup', e => {
    if(keys.hasOwnProperty(e.key)) keys[e.key] = false;
});

// puck 초기 위치
let puckX = 190;
let puckY = 290;
let velocityX = 3;
let velocityY = 3;

// 게임 루프
function gameLoop() {
    // 플레이어 이동
    if(keys.ArrowLeft) paddleX -= paddleSpeed;
    if(keys.ArrowRight) paddleX += paddleSpeed;
    paddleX = Math.max(0, Math.min(gameWidth - paddleWidth, paddleX));
    paddle.style.left = paddleX + 'px';

    // 컴퓨터 이동 (AI)
    if(paddle2X + paddleWidth/2 < puckX + puckSize/2) paddle2X += 3;
    if(paddle2X + paddleWidth/2 > puckX + puckSize/2) paddle2X -= 3;
    paddle2X = Math.max(0, Math.min(gameWidth - paddleWidth, paddle2X));
    paddle2.style.left = paddle2X + 'px';

    // puck 이동
    puckX += velocityX;
    puckY += velocityY;

    // 벽 충돌
    if(puckX <= 0 || puckX >= gameWidth - puckSize) velocityX *= -1;

    // 상하 점수
    if(puckY <= 0) {
        score1++;
        resetPuck();
    }
    if(puckY >= gameHeight - puckSize) {
        score2++;
        resetPuck();
    }

    // 패들 충돌
    if(puckY + puckSize >= gameHeight - 20 && puckX + puckSize >= paddleX && puckX <= paddleX + paddleWidth) {
        velocityY *= -1;
        puckY = gameHeight - 20 - puckSize;
    }
    if(puckY <= 20 + paddleHeight && puckX + puckSize >= paddle2X && puckX <= paddle2X + paddleWidth) {
        velocityY *= -1;
        puckY = 20 + paddleHeight;
    }

    puck.style.left = puckX + 'px';
    puck.style.top = puckY + 'px';

    requestAnimationFrame(gameLoop);
}

function resetPuck() {
    puckX = 190;
    puckY = 290;
    velocityY = -velocityY;
    score1El.textContent = score1;
    score2El.textContent = score2;
}

gameLoop();
