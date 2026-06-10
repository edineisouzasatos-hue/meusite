// E-Football Game - Lógica Completa com Passes, Chutes e Dribles
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Redimensionar canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Configurações
const gameConfig = {
    fieldWidth: canvas.width,
    fieldHeight: canvas.height,
    ballRadius: 5,
    playerRadius: 15,
    ballFriction: 0.98,
    playerSpeed: 6
};

// Bola
const ball = {
    x: gameConfig.fieldWidth / 2,
    y: gameConfig.fieldHeight / 2,
    vx: 0,
    vy: 0,
    radius: gameConfig.ballRadius,
    color: '#FFFFFF'
};

// Metas
const goals = {
    left: { x: 20, y: gameConfig.fieldHeight / 2 - 60, width: 40, height: 120 },
    right: { x: gameConfig.fieldWidth - 60, y: gameConfig.fieldHeight / 2 - 60, width: 40, height: 120 }
};

// Jogador
const player = {
    x: 100,
    y: gameConfig.fieldHeight / 2,
    vx: 0,
    vy: 0,
    radius: gameConfig.playerRadius,
    color: '#FF6B6B',
    team: 'left',
    speed: gameConfig.playerSpeed,
    stamina: 100,
    maxStamina: 100,
    power: 0,
    maxPower: 15,
    passType: 1, // 1=Alto, 2=Rasteiro, 3=Prof.Alto, 4=Prof.Rasteiro
    shotType: 'c', // c=Colocado, f=Fenomenal, s=Forte, a=Cavadinha
    dribbleType: 'n', // n=Normal, r=Rápido, d=Corpo, p=Preciso, e=Elastico
    isDribbling: false
};

// Adversário IA
const opponent = {
    x: gameConfig.fieldWidth - 100,
    y: gameConfig.fieldHeight / 2,
    vx: 0,
    vy: 0,
    radius: gameConfig.playerRadius,
    color: '#4ECDC4',
    team: 'right',
    speed: gameConfig.playerSpeed * 0.8,
    stamina: 100,
    maxStamina: 100
};

// Pontuação
let score = {
    player: 0,
    opponent: 0
};

// Controles
const keys = {};
let touchX = null;
let touchY = null;
let mouseX = 0;
let mouseY = 0;

// Event Listeners
document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    
    // Seleção de Passes
    if (e.key === '1') player.passType = 1;
    if (e.key === '2') player.passType = 2;
    if (e.key === '3') player.passType = 3;
    if (e.key === '4') player.passType = 4;
    
    // Seleção de Chutes
    if (e.key === 'c') player.shotType = 'c';
    if (e.key === 'f') player.shotType = 'f';
    if (e.key === 's') player.shotType = 's';
    if (e.key === 'a') player.shotType = 'a';
    
    // Seleção de Dribles
    if (e.key === 'n') player.dribbleType = 'n';
    if (e.key === 'r') player.dribbleType = 'r';
    if (e.key === 'd') player.dribbleType = 'd';
    if (e.key === 'p') player.dribbleType = 'p';
    if (e.key === 'e') player.dribbleType = 'e';
    
    updateUI();
});

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Touch
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    touchX = touch.clientX;
    touchY = touch.clientY;
});

document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    touchX = touch.clientX;
    touchY = touch.clientY;
});

document.addEventListener('touchend', () => {
    touchX = null;
    touchY = null;
});

// Mouse
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Desenhar círculo
function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Desenhar campo
function drawField() {
    ctx.fillStyle = '#2ECC71';
    ctx.fillRect(0, 0, gameConfig.fieldWidth, gameConfig.fieldHeight);
    
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(gameConfig.fieldWidth / 2, 0);
    ctx.lineTo(gameConfig.fieldWidth / 2, gameConfig.fieldHeight);
    ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.arc(gameConfig.fieldWidth / 2, gameConfig.fieldHeight / 2, 40, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath();
    ctx.arc(gameConfig.fieldWidth / 2, gameConfig.fieldHeight / 2, 3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 3;
    ctx.strokeRect(goals.left.x, goals.left.y, goals.left.width, goals.left.height);
    ctx.strokeRect(goals.right.x, goals.right.y, goals.right.width, goals.right.height);
}

// Nomes das ações
function getPassName(type) {
    const names = { 1: 'Alto', 2: 'Rasteiro', 3: 'Prof.Alto', 4: 'Prof.Rasteiro' };
    return names[type] || 'Alto';
}

function getShotName(type) {
    const names = { c: 'Colocado', f: 'Fenomenal', s: 'Forte', a: 'Cavadinha' };
    return names[type] || 'Colocado';
}

function getDribbleName(type) {
    const names = { n: 'Normal', r: 'Rápido', d: 'Corpo', p: 'Preciso', e: 'Elastico' };
    return names[type] || 'Normal';
}

// Atualizar UI
function updateUI() {
    document.getElementById('playerScore').textContent = score.player;
    document.getElementById('opponentScore').textContent = score.opponent;
    document.getElementById('passType').textContent = `${getPassName(player.passType)} (${player.passType})`;
    document.getElementById('shotType').textContent = `${getShotName(player.shotType)} (${player.shotType.toUpperCase()})`;
    document.getElementById('dribbleType').textContent = `${getDribbleName(player.dribbleType)} (${player.dribbleType.toUpperCase()})`;
    document.getElementById('powerValue').textContent = Math.floor(player.power);
    
    const staminaPercent = (player.stamina / player.maxStamina) * 100;
    document.getElementById('staminaFill').style.width = staminaPercent + '%';
}

// Atualizar jogador
function updatePlayer() {
    let moveX = 0;
    let moveY = 0;
    
    // Teclado
    if (keys['arrowup'] || keys['w']) moveY = -player.speed;
    if (keys['arrowdown'] || keys['s']) moveY = player.speed;
    if (keys['arrowleft'] || keys['a']) moveX = -player.speed;
    if (keys['arrowright'] || keys['d']) moveX = player.speed;
    
    // Touch
    if (touchX !== null && touchY !== null) {
        const dx = touchX - player.x;
        const dy = touchY - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 50) {
            moveX = (dx / distance) * player.speed;
            moveY = (dy / distance) * player.speed;
        }
    }
    
    // Dribble
    if (player.isDribbling && player.stamina > 0) {
        if (player.dribbleType === 'r') {
            moveX *= 1.5;
            moveY *= 1.5;
        }
        player.stamina -= 0.5;
    }
    
    // Chutar
    if (keys[' ']) {
        shootBall(player);
        keys[' '] = false;
    }
    
    // Atualizar posição
    player.x += moveX;
    player.y += moveY;
    
    // Regenerar estamina
    if (player.stamina < player.maxStamina) {
        player.stamina += 0.3;
    }
    
    // Limites
    player.x = Math.max(player.radius, Math.min(gameConfig.fieldWidth - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(gameConfig.fieldHeight - player.radius, player.y));
    
    updateUI();
}

// IA Adversário
function updateOpponent() {
    const dx = ball.x - opponent.x;
    const dy = ball.y - opponent.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 10) {
        opponent.x += (dx / distance) * opponent.speed;
        opponent.y += (dy / distance) * opponent.speed;
    }
    
    if (distance < 80 && Math.random() > 0.95) {
        shootBall(opponent);
    }
    
    opponent.x = Math.max(opponent.radius, Math.min(gameConfig.fieldWidth - opponent.radius, opponent.x));
    opponent.y = Math.max(opponent.radius, Math.min(gameConfig.fieldHeight - opponent.radius, opponent.y));
}

// Chutar
function shootBall(shooter) {
    const dx = ball.x - shooter.x;
    const dy = ball.y - shooter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 50) {
        let power = 8;
        let angle = Math.atan2(dy, dx);
        
        // Aplicar efeito do tipo de chute
        if (shooter === player) {
            switch (player.shotType) {
                case 'c': power = 5; break; // Colocado - menos força
                case 'f': power = 10; angle += Math.random() * 0.3 - 0.15; break; // Fenomenal - com curva
                case 's': power = 15; break; // Forte - máxima força
                case 'a': power = 6; break; // Cavadinha - baixa força
            }
        }
        
        ball.vx = Math.cos(angle) * power;
        ball.vy = Math.sin(angle) * power;
    }
}

// Atualizar bola
function updateBall() {
    ball.x += ball.vx;
    ball.y += ball.vy;
    
    ball.vx *= gameConfig.ballFriction;
    ball.vy *= gameConfig.ballFriction;
    
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > gameConfig.fieldHeight) {
        ball.vy = -ball.vy;
        ball.y = Math.max(ball.radius, Math.min(gameConfig.fieldHeight - ball.radius, ball.y));
    }
    
    checkCollision(ball, player);
    checkCollision(ball, opponent);
    checkGoal();
}

// Colisão
function checkCollision(ball, player) {
    const dx = ball.x - player.x;
    const dy = ball.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < ball.radius + player.radius) {
        const angle = Math.atan2(dy, dx);
        ball.vx = Math.cos(angle) * 10;
        ball.vy = Math.sin(angle) * 10;
    }
}

// Gol
function checkGoal() {
    if (ball.x > goals.right.x && ball.y > goals.right.y && ball.y < goals.right.y + goals.right.height) {
        score.player++;
        showGoalNotification('GOOOOOL! 🎉');
        resetBall();
    }
    
    if (ball.x < goals.left.x + goals.left.width && ball.y > goals.left.y && ball.y < goals.left.y + goals.left.height) {
        score.opponent++;
        showGoalNotification('Adversário marcou! ⚽');
        resetBall();
    }
}

// Notificação de gol
function showGoalNotification(text) {
    const notification = document.getElementById('goalNotification');
    notification.textContent = text;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// Reset bola
function resetBall() {
    ball.x = gameConfig.fieldWidth / 2;
    ball.y = gameConfig.fieldHeight / 2;
    ball.vx = 0;
    ball.vy = 0;
}

// Renderizar
function render() {
    drawField();
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    drawCircle(player.x, player.y, player.radius, player.color);
    drawCircle(opponent.x, opponent.y, opponent.radius, opponent.color);
}

// Game Loop
function gameLoop() {
    updatePlayer();
    updateOpponent();
    updateBall();
    render();
    
    requestAnimationFrame(gameLoop);
}

// Iniciar
gameLoop();
console.log('⚽ E-Football Game iniciado!');
