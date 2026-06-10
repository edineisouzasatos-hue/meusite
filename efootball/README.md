# ⚽ E-Football Game - Mobile Edition

Um jogo de futebol completo em tempo real com sistema avançado de **passes**, **chutes** e **dribles**!

## 🎮 Funcionalidades Principais

### ⚽ Sistema de Passes
- **Passe Alto** - Trajetória alta, velocidade média
- **Passe Rasteiro** - Trajetória baixa, velocidade média
- **Passe Profissional Alto** - Longo alcance, trajetória alta
- **Passe Profissional Rasteiro** - Longo alcance, trajetória baixa

### 🎯 Sistema de Chutes
- **Chute Colocado** - Precisão máxima, poder baixo
- **Chute Fenomenal** - Efeito e curva, poder médio
- **Chute Forte** - Poder máximo, menos preciso
- **Cavadinha** - Trajetória muito alta, delicado

### 🔄 Sistema de Dribles
- **Dribble Normal** - Rodinha básica
- **Dribble Rápido** - Acelera, consome estamina
- **Dribble com Corpo** - Engana o adversário
- **Dribble Preciso** - Passa através do adversário
- **Elastico** - Chuteira, efeito especial

## 🎮 Controles

### Desktop (Teclado)
| Ação | Tecla |
|------|-------|
| Mover para cima | ↑ ou W |
| Mover para baixo | ↓ ou S |
| Mover para esquerda | ← ou A |
| Mover para direita | → ou D |
| Executar ação | ESPAÇO |

### Selecionar Tipo
| Tipo | Teclas |
|------|--------|
| **Passes** | 1, 2, 3, 4 |
| **Chutes** | C, F, S, A |
| **Dribles** | N, R, D, P, E |

### Mobile (Touch)
- **Toque e arraste** - Mover personagem
- **Botões na tela** - Controlar movimento
- **Botão AÇÃO** - Executar passe/chute/dribble

## 📊 Mecânicas

### Sistema de Stamina
- Cada jogador tem estamina máxima (100%)
- **Dribles rápidos** consomem estamina rapidamente
- Estamina regenera quando você não está se movendo

### Colisões Realistas
- Bola colide com jogadores
- Bola colide com as paredes (goleiras)
- Física realista com fricção

### IA Inteligente
- Adversário segue a bola
- Chuta quando está perto
- Comportamento dinâmico

## 🏆 Sistema de Pontuação

- **Gol do Jogador** - Bola entra na goleira direita
- **Gol do Adversário** - Bola entra na goleira esquerda
- Placar em tempo real na tela

## 📁 Estrutura do Projeto

```
efootball/
├── index.html      # Estrutura HTML
├── style.css       # Design responsivo
├── script.js       # Lógica completa do jogo
└── README.md       # Este arquivo
```

## 🚀 Como Jogar

1. **Abra `index.html` no navegador**
2. **Use as setas ou WASD para mover**
3. **Selecione o tipo de passe/chute/dribble**
4. **Pressione ESPAÇO para executar**
5. **Marque gols contra a IA!**

## 💻 Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo com Flexbox
- **Canvas API** - Renderização 2D
- **JavaScript Vanilla** - Lógica pura

## 🎨 Características Visuais

✅ Campo de futebol com linhas e círculo do meio  
✅ Goleiras destacadas  
✅ Jogadores coloridos (vermelho vs ciano)  
✅ Bola branca realista  
✅ Placar em tempo real  
✅ Indicador de estamina  
✅ Notificações de gol animadas  
✅ HUD com informações de controle  

## 📱 Responsivo

- Desktop (1920x1080+)
- Tablet (768px+)
- Mobile (320px+)

Funciona perfeitamente em qualquer resolução!

## 🔧 Configuração Técnica

### Game Loop
- 60 FPS (requestAnimationFrame)
- Update + Render a cada frame

### Colisões
- Detecção circular (bola vs jogadores)
- Detecção retangular (bola vs goleiras)

### Física
- Velocidade e aceleração realistas
- Fricção da bola (0.98)
- Limite de velocidade

## 🎯 Próximas Melhorias

- [ ] Power meter visual avançado
- [ ] Diferentes níveis de dificuldade
- [ ] Modo multiplayer local
- [ ] Efeitos sonoros
- [ ] Replay de gols
- [ ] Estatísticas do jogo
- [ ] Skins de personagens

## 🐛 Troubleshooting

**O jogo não abre?**
- Verifique se está abrindo o arquivo `index.html` diretamente no navegador

**Controles não funcionam?**
- Clique no canvas do jogo primeiro
- Certifique-se de que o navegador não está bloqueando eventos

**Performance baixa?**
- Tente em outro navegador (Chrome é recomendado)
- Feche outras abas

## 📝 Licença

MIT - Livre para usar e modificar

---

**⚽ Desenvolvido com ❤️ | Versão 1.0 - Sistema Completo**

**Aproveite o jogo! Bom jogo! 🎮✨**
