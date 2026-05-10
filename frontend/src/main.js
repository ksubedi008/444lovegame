import { HeartScene } from './components/HeartScene.js';
import api from './api/client.js';

let heartScene;

function initApp() {
    const app = document.getElementById('app');
    
    // Setup Canvas Container
    const canvasContainer = document.createElement('div');
    canvasContainer.id = 'canvas-container';
    app.appendChild(canvasContainer);
    
    // Initialize Three.js Scene
    heartScene = new HeartScene(canvasContainer);
    
    // Add audio element
    const audio = document.createElement('audio');
    audio.id = 'bgm';
    audio.loop = true;
    audio.src = '/bgm.mp3'; // Playing the background music
    app.appendChild(audio);

    // Initial UI State (Home + Entry Button)
    renderHomeUI();
}

function renderHomeUI() {
    clearUI();
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.background = 'transparent';
    overlay.style.backdropFilter = 'none';
    
    function createFloatingText(textContent, startX, startY, velX, velY) {
        const hoverText = document.createElement('h1');
        hoverText.innerText = textContent;
        hoverText.style.position = 'absolute';
        hoverText.style.fontSize = 'clamp(2rem, 8vw, 4rem)'; // Responsive font size
        hoverText.style.color = '#ffffff';
        hoverText.style.textShadow = '0 0 15px #ff0000, 0 0 30px #ff0000';
        hoverText.style.pointerEvents = 'none';
        hoverText.style.textAlign = 'center';
        hoverText.style.fontFamily = "'Caveat', cursive";
        hoverText.style.zIndex = '5';
        
        overlay.appendChild(hoverText);
        
        let posX = startX;
        let posY = startY;

        function animateText() {
            if (!hoverText.isConnected) return;
            
            posX += velX;
            posY += velY;
            
            const rect = hoverText.getBoundingClientRect();
            const w = rect.width || 400;
            const h = rect.height || 100;
            
            if (posX <= 0 || posX + w >= window.innerWidth) {
                velX *= -1;
                posX = Math.max(0, Math.min(posX, window.innerWidth - w));
            }
            if (posY <= 0 || posY + h >= window.innerHeight) {
                velY *= -1;
                posY = Math.max(0, Math.min(posY, window.innerHeight - h));
            }
            
            hoverText.style.left = posX + 'px';
            hoverText.style.top = posY + 'px';
            
            requestAnimationFrame(animateText);
        }
        
        requestAnimationFrame(animateText);
    }

    const startX1 = Math.max(10, window.innerWidth / 2 - 200);
    const startX2 = Math.max(10, window.innerWidth / 3);
    
    // Slowed down the speed slightly to look better on phones too
    createFloatingText("Happy birthday Gudiyaaa", startX1, window.innerHeight / 3, 1.5, 1.5);
    createFloatingText("I love you the mosssttt", startX2, window.innerHeight / 1.5, -1.5, 1.5);
    
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.innerText = 'Enter if you dare...';
    btn.onclick = () => {
        btn.style.display = 'none';
        playIntro();
    };
    
    overlay.appendChild(btn);
    document.getElementById('app').appendChild(overlay);
}

function playIntro() {
    clearUI();
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    const text = document.createElement('h1');
    text.innerText = "Happy birthday gudiyaaa, I love you the mostttt.";
    text.style.opacity = '0';
    text.style.transition = 'opacity 2s ease';
    
    overlay.appendChild(text);
    document.getElementById('app').appendChild(overlay);
    
    setTimeout(() => { text.style.opacity = '1'; }, 100);
    
    setTimeout(() => {
        text.style.opacity = '0';
        setTimeout(renderLogin, 2000);
    }, 4000);
}

function renderLogin() {
    clearUI();
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    
    const title = document.createElement('h2');
    title.innerText = 'Identify Yourself';
    
    const userIn = document.createElement('input');
    userIn.type = 'text';
    userIn.placeholder = 'Username';
    
    const passContainer = document.createElement('div');
    passContainer.style.display = 'flex';
    passContainer.style.alignItems = 'center';
    passContainer.style.position = 'relative';
    
    const passIn = document.createElement('input');
    passIn.type = 'password';
    passIn.placeholder = 'Password';
    passIn.style.paddingRight = '30px';
    
    const eyeBtn = document.createElement('span');
    eyeBtn.innerHTML = '👁️';
    eyeBtn.style.position = 'absolute';
    eyeBtn.style.right = '5px';
    eyeBtn.style.cursor = 'pointer';
    eyeBtn.style.userSelect = 'none';
    eyeBtn.onclick = () => {
        if (passIn.type === 'password') {
            passIn.type = 'text';
            eyeBtn.innerHTML = '🙈';
        } else {
            passIn.type = 'password';
            eyeBtn.innerHTML = '👁️';
        }
    };
    
    passContainer.appendChild(passIn);
    passContainer.appendChild(eyeBtn);
    
    const errorText = document.createElement('div');
    errorText.className = 'error-text';
    
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.innerText = 'Login';
    
    btn.onclick = async () => {
        try {
            await api.post('/login/', {
                username: userIn.value,
                password: passIn.value
            });
            renderGameUI();
        } catch (err) {
            errorText.innerText = err.response?.data?.error || "You forgot already?";
        }
    };
    
    container.appendChild(title);
    container.appendChild(userIn);
    container.appendChild(passContainer);
    container.appendChild(errorText);
    container.appendChild(btn);
    
    overlay.appendChild(container);
    document.getElementById('app').appendChild(overlay);
}

function renderGameUI() {
    clearUI();
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.background = 'rgba(5, 1, 10, 0.5)';
    
    const stats = document.createElement('div');
    stats.className = 'stats';
    stats.id = 'game-stats';
    overlay.appendChild(stats);
    
    const title = document.createElement('h2');
    title.innerText = 'Click Timing Game';
    
    const desc = document.createElement('p');
    desc.innerText = 'Catch the heart before it vanishes...';
    desc.style.fontSize = '1.2rem';
    
    const gameArea = document.createElement('div');
    gameArea.className = 'game-area';
    
    const target = document.createElement('div');
    target.className = 'target';
    
    let isPlaying = false;
    let targetTimer;
    
    const startBtn = document.createElement('button');
    startBtn.className = 'btn';
    startBtn.innerText = 'Start Game';
    
    const rewardBtn = document.createElement('button');
    rewardBtn.className = 'btn';
    rewardBtn.innerText = 'View Rewards';
    rewardBtn.onclick = renderRewardsUI;
    
    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn';
    resetBtn.innerText = 'Reset Game';
    resetBtn.style.position = 'absolute';
    resetBtn.style.top = '20px';
    resetBtn.style.left = '20px';
    resetBtn.style.margin = '0';
    resetBtn.style.background = 'rgba(255, 68, 68, 0.2)';
    resetBtn.style.border = '1px solid #ff4444';
    resetBtn.style.color = '#ff4444';
    resetBtn.onclick = async () => {
        if(confirm("Are you sure you want to reset the entire game? This will erase all progress.")) {
            try {
                await api.post('/reset/');
                window.location.reload();
            } catch (e) { console.error(e); }
        }
    };
    
    const homeBtn = document.createElement('button');
    homeBtn.className = 'btn';
    homeBtn.innerText = 'Home';
    homeBtn.style.position = 'absolute';
    homeBtn.style.top = '20px';
    homeBtn.style.right = '20px';
    homeBtn.style.margin = '0';
    homeBtn.style.padding = '8px 16px';
    homeBtn.style.fontSize = '1rem';
    homeBtn.onclick = () => {
        window.location.reload();
    };
    
    startBtn.onclick = () => {
        isPlaying = true;
        startBtn.style.display = 'none';
        gameArea.appendChild(target);
        moveTarget();
    };
    
    function moveTarget() {
        if(!isPlaying) return;
        const maxPos = gameArea.clientWidth - 50; // Target is 50px
        const x = Math.random() * maxPos;
        const y = Math.random() * maxPos;
        target.style.left = x + 'px';
        target.style.top = y + 'px';
        target.style.transform = 'scale(0)';
        
        setTimeout(() => { target.style.transform = 'scale(1)'; }, 50);
        
        targetTimer = setTimeout(() => {
            if(isPlaying) {
                // Missed!
                endGame(false);
            }
        }, 1000); // 1 second to click
    }
    
    target.onmousedown = (e) => {
        e.stopPropagation();
        if(!isPlaying) return;
        clearTimeout(targetTimer);
        
        showBurst(e.clientX, e.clientY);
        
        endGame(true);
    };
    
    function showBurst(x, y) {
        const burst = document.createElement('div');
        burst.innerText = 'I love you!';
        burst.style.position = 'absolute';
        burst.style.left = x + 'px';
        burst.style.top = y + 'px';
        burst.style.color = '#ff0000';
        burst.style.fontSize = '2rem';
        burst.style.fontFamily = "'Caveat', cursive";
        burst.style.textShadow = '0 0 10px #ff0000';
        burst.style.pointerEvents = 'none';
        burst.style.zIndex = '1000';
        burst.style.transform = 'translate(-50%, -50%)';
        burst.style.animation = 'burstAnim 1s ease-out forwards';
        
        document.body.appendChild(burst);
        setTimeout(() => burst.remove(), 1000);
    }
    
    async function endGame(won) {
        if (!won) {
            isPlaying = false;
            target.remove();
            startBtn.style.display = 'block';
            startBtn.innerText = 'Missed... Retry';
        } else {
            // Keep playing automatically!
            moveTarget();
        }
        
        try {
            await api.post('/game/result/', { won });
            updateStats();
        } catch (e) { console.error(e); }
    }
    
    async function updateStats() {
        try {
            const res = await api.get('/progress/');
            stats.innerText = `Wins: ${res.data.game_wins}\nLosses: ${res.data.game_losses}\nHearts Found: ${res.data.hearts_clicked}`;
        } catch(e) {}
    }
    
    updateStats();
    
    overlay.appendChild(title);
    overlay.appendChild(desc);
    const btnGroup = document.createElement('div');
    btnGroup.style.display = 'flex';
    btnGroup.style.gap = '15px';
    btnGroup.style.justifyContent = 'center';
    btnGroup.style.width = '100%';
    
    btnGroup.appendChild(startBtn);
    btnGroup.appendChild(rewardBtn);
    
    overlay.appendChild(gameArea);
    overlay.appendChild(btnGroup);
    overlay.appendChild(resetBtn);
    overlay.appendChild(homeBtn);
    
    document.getElementById('app').appendChild(overlay);
}

function renderRewardsUI() {
    clearUI();
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    const title = document.createElement('h2');
    title.innerText = 'Your Rewards';
    
    const list = document.createElement('div');
    list.style.maxHeight = '50vh';
    list.style.overflowY = 'auto';
    list.style.width = '80%';
    list.style.textAlign = 'center';
    
    const backBtn = document.createElement('button');
    backBtn.className = 'btn';
    backBtn.innerText = 'Back to Game';
    backBtn.onclick = renderGameUI;
    
    overlay.appendChild(title);
    overlay.appendChild(list);
    overlay.appendChild(backBtn);
    document.getElementById('app').appendChild(overlay);
    
    api.get('/rewards/').then(res => {
        if(res.data.length === 0) {
            list.innerText = 'No rewards unlocked yet. Win 25 games to unlock one.';
        } else {
            res.data.forEach(r => {
                const p = document.createElement('p');
                p.innerText = r.content;
                p.style.margin = '20px 0';
                p.style.padding = '10px';
                p.style.border = '1px solid var(--primary-glow)';
                p.style.borderRadius = '10px';
                list.appendChild(p);
            });
        }
    });
}

function clearUI() {
    const app = document.getElementById('app');
    const overlays = app.querySelectorAll('.overlay');
    overlays.forEach(o => o.remove());
}

window.onload = initApp;
