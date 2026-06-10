// Configuração do Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configurações do Jogo
const gameConfig = {
    width: canvas.width,
    height: canvas.height,
    fps: 60
};

// Objeto do Jogador
const player = {
    x: gameConfig.width / 2,
    y: gameConfig.height / 2,
    width: 40,
    height: 40,
    speed: 5,
    color: '#00FF00'
};

// Controles
const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Função para desenhar o jogador
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Borda do jogador
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
}

// Função para atualizar posição do jogador
function updatePlayer() {
    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
        player.y = Math.max(0, player.y - player.speed);
    }
    if (keys['ArrowDown'] || keys['s'] || keys['S']) {
        player.y = Math.min(gameConfig.height - player.height, player.y + player.speed);
    }
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        player.x = Math.max(0, player.x - player.speed);
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        player.x = Math.min(gameConfig.width - player.width, player.x + player.speed);
    }
}

// Função para limpar o canvas
function clearCanvas() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, gameConfig.width, gameConfig.height);
}

// Função principal do game loop
function gameLoop() {
    clearCanvas();
    updatePlayer();
    drawPlayer();
    
    requestAnimationFrame(gameLoop);
}

// Inicia o jogo
gameLoop();

console.log('🎮 Jogo iniciado! Use as setas ou WASD para se mover.');
