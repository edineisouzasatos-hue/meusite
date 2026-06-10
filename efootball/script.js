// E-Football Game - Lógica Principal
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Redimensionar canvas para o tamanho da tela
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Configurações do Jogo
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

// Metas/Goleiras
const goals = {
    left: { x: 20, y: gameConfig.fieldHeight / 2 - 60, width: 40, height: 120 },
    right: { x: gameConfig.fieldWidth - 60, y: gameConfig.fieldHeight / 2 - 60, width: 40, height: 120 }
};

// Jogador (Humano)
const player = {
    x: 100,
    y: gameConfig.fieldHeight / 2,
    vx: 0,
    vy: 0,
    radius: gameConfig.playerRadius,
    color: '#FF6B6B',
    team: 'left',
    speed: gameConfig.playerSpeed,
    power: 0,
    maxPower: 15
};

// IA do Adversário
const opponent = {
    x: gameConfig.fieldWidth - 100,
    y: gameConfig.fieldHeight / 2,
    vx: 0,
    vy: 0,
    radius: gameConfig.playerRadius,
    color: '#4ECDC4',
    team: 'right',
    speed: gameConfig.playerSpeed * 0.8,
    targetX: gameConfig.fieldWidth / 2,
    targetY: gameConfig.fieldHeight / 2
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

// Event Listeners
document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Touch controls para mobile
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
    // Fundo verde
    ctx.fillStyle = '#2ECC71';
    ctx.fillRect(0, 0, gameConfig.fieldWidth, gameConfig.fieldHeight);
    
    // Linha do meio
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(gameConfig.fieldWidth / 2, 0);
    ctx.lineTo(gameConfig.fieldWidth / 2, gameConfig.fieldHeight);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Circulo do meio
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.arc(gameConfig.fieldWidth / 2, gameConfig.fieldHeight / 2, 40, 0, Math.PI * 2);
    ctx.stroke();
    
    // Ponto do meio
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath();
    ctx.arc(gameConfig.fieldWidth / 2, gameConfig.fieldHeight / 2, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Goleiras
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 3;
    ctx.strokeRect(goals.left.x, goals.left.y, goals.left.width, goals.left.height);
    ctx.strokeRect(goals.right.x, goals.right.y, goals.right.width, goals.right.height);
}

// Desenhar HUD
function drawHUD() {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    // Placar
    ctx.fillText(`${score.player} X ${score.opponent}`, gameConfig.fieldWidth / 2, 40);
    
    // Instruções
    ctx.font = '14px Arial';
    ctx.fillText('Setas/WASD: Mover | Espaço: Chutar | Touch: Mover', gameConfig.fieldWidth / 2, gameConfig.fieldHeight - 20);
}

// Atualizar posição do jogador
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
    
    // Chutar com espaço
    if (keys[' ']) {
        shootBall(player);
        keys[' '] = false;
    }
    
    // Atualizar posição
    player.x += moveX;
    player.y += moveY;
    
    // Limites do campo
    player.x = Math.max(player.radius, Math.min(gameConfig.fieldWidth - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(gameConfig.fieldHeight - player.radius, player.y));
}

// IA do Adversário
function updateOpponent() {
    // IA segue a bola
    const dx = ball.x - opponent.x;
    const dy = ball.y - opponent.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 10) {
        opponent.x += (dx / distance) * opponent.speed;
        opponent.y += (dy / distance) * opponent.speed;
    }
    
    // Chutar se perto da bola
    if (distance < 80 && Math.random() > 0.95) {
        shootBall(opponent);
    }
    
    // Limites
    opponent.x = Math.max(opponent.radius, Math.min(gameConfig.fieldWidth - opponent.radius, opponent.x));
    opponent.y = Math.max(opponent.radius, Math.min(gameConfig.fieldHeight - opponent.radius, opponent.y));
}

// Chutar bola
function shootBall(player) {
    const dx = ball.x - player.x;
    const dy = ball.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 50) {
        const power = player === player ? 12 : 8;
        ball.vx = (dx / distance) * power;
        ball.vy = (dy / distance) * power;
    }
}

// Atualizar bola
function updateBall() {
    // Aplicar velocidade
    ball.x += ball.vx;
    ball.y += ball.vy;
    
    // Fricção
    ball.vx *= gameConfig.ballFriction;
    ball.vy *= gameConfig.ballFriction;
    
    // Colisão com paredes
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > gameConfig.fieldHeight) {
        ball.vy = -ball.vy;
        ball.y = Math.max(ball.radius, Math.min(gameConfig.fieldHeight - ball.radius, ball.y));
    }
    
    // Colisão com jogadores
    checkCollision(ball, player);
    checkCollision(ball, opponent);
    
    // Gol!
    checkGoal();
}

// Verificar colisão
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

// Verificar gol
function checkGoal() {
    // Gol do jogador (lado direito)
    if (ball.x > goals.right.x && 
        ball.y > goals.right.y && 
        ball.y < goals.right.y + goals.right.height) {
        score.player++;
        resetBall();
    }
    
    // Gol do adversário (lado esquerdo)
    if (ball.x < goals.left.x + goals.left.width && 
        ball.y > goals.left.y && 
        ball.y < goals.left.y + goals.left.height) {
        score.opponent++;
        resetBall();
    }
}

// Resetar bola
function resetBall() {
    ball.x = gameConfig.fieldWidth / 2;
    ball.y = gameConfig.fieldHeight / 2;
    ball.vx = 0;
    ball.vy = 0;
}

// Renderizar tudo
function render() {
    drawField();
    
    // Desenhar bola
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    
    // Desenhar jogadores
    drawCircle(player.x, player.y, player.radius, player.color);
    drawCircle(opponent.x, opponent.y, opponent.radius, opponent.color);
    
    // HUD
    drawHUD();
}

// Game Loop
function gameLoop() {
    updatePlayer();
    updateOpponent();
    updateBall();
    render();
    
    requestAnimationFrame(gameLoop);
}

// Iniciar jogo
gameLoop();
console.log('⚽ E-Football Game iniciado!');
