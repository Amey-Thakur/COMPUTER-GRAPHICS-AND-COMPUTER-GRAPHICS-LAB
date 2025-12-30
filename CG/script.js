/**
 * ================================================================
 *   Computer Graphics (CG) Lab - Interactive Logic
 * ================================================================
 *   Author: Amey Thakur
 *   GitHub: https://github.com/Amey-Thakur
 *   Course: Computer Graphics (CG) Lab
 *   Roll No: 50
 *   Batch: B3
 *   Date: January 17, 2020
 *   Repository: https://github.com/Amey-Thakur/COMPUTER-GRAPHICS-AND-COMPUTER-GRAPHICS-LAB
 *   License: CC BY 4.0
 * ================================================================
 */

// =========================================
//   CONSOLE EASTER EGG 🥚
// =========================================
console.log(
    "%c🎨 CG Lab Portfolio",
    "font-size: 28px; font-weight: bold; color: #8b5cf6; text-shadow: 2px 2px 0 #0f172a;"
);
console.log(
    "%c👋 Hey developer! Ready to rasterize?",
    "font-size: 14px; color: #64748b;"
);
console.log(
    "%c🔗 https://github.com/Amey-Thakur/COMPUTER-GRAPHICS-AND-COMPUTER-GRAPHICS-LAB",
    "font-size: 12px; color: #2563eb;"
);
console.log(
    "%c⚠️ This portfolio is protected. Please respect the author's work!",
    "font-size: 12px; color: #f59e0b; font-weight: bold;"
);

// Interactive Geomtric Canvas Visualizer Logic
// ================================================================

// Sound Effect Logic
function playCelebrateSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const audioCtx = new AudioContext();

        function playNote(freq, start, duration) {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.1, start);
            gain.gain.exponentialRampToValueAtTime(0.01, start + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(start);
            osc.stop(start + duration);
        }

        playNote(523.25, audioCtx.currentTime, 0.2); // C5
        playNote(783.99, audioCtx.currentTime + 0.1, 0.4); // G5
    } catch (e) { console.error('Audio failed', e); }
}

// Tab Switching Logic
function switchTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-pane').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.algo-tab').forEach(el => el.classList.remove('active'));

    // Show selected
    document.getElementById(`tab-${tabId}`).style.display = 'block';
    document.querySelector(`.algo-tab[data-tab="${tabId}"]`).classList.add('active');

    // Trigger resize logic if needed
    if (tabId === 'raster') initRasterCanvas();
    if (tabId === 'orbital') initOrbitalCanvas();
}

// 1. Rasterizer (Bresenham's Line)
let rasterCtx, rasterCanvas;
let currentCanvasWidth = 850;
let currentCanvasHeight = 300;

function initRasterCanvas() {
    rasterCanvas = document.getElementById('rasterCanvas');
    const container = document.getElementById('raster-canvas-container');
    if (!rasterCanvas || !container) return;

    const rect = container.getBoundingClientRect();
    const newWidth = rect.width ? rect.width : 850;

    rasterCanvas.width = newWidth;
    rasterCanvas.height = Math.min(300, newWidth * 0.6);
    rasterCtx = rasterCanvas.getContext('2d');
}

// Bresenham's Line Algorithm Implementation for Canvas
function drawBresenhamLine(x0, y0, x1, y1, color = '#8b5cf6') {
    if (!rasterCtx) return;

    // For visualization, we will just use native lineTo for smoothness, 
    // but we can simulate pixel plotting if desired. 
    // For portfolio aesthetics, smooth is better.

    rasterCtx.beginPath();
    rasterCtx.moveTo(x0, y0);
    rasterCtx.lineTo(x1, y1);
    rasterCtx.strokeStyle = color;
    rasterCtx.lineWidth = 2;
    rasterCtx.stroke();

    // Draw Endpoints
    rasterCtx.fillStyle = '#fff';
    rasterCtx.beginPath();
    rasterCtx.arc(x0, y0, 3, 0, Math.PI * 2);
    rasterCtx.arc(x1, y1, 3, 0, Math.PI * 2);
    rasterCtx.fill();
}

async function renderRandomLines(playEffects = true) {
    if (!rasterCanvas) initRasterCanvas();
    const w = rasterCanvas.width;
    const h = rasterCanvas.height;
    const ctx = rasterCtx;
    const status = document.getElementById('raster-status');
    const btn = document.querySelector('button[onclick="renderRandomLines()"]');

    if (btn) {
        btn.innerHTML = '<i class="fas fa-cog fa-spin me-2"></i>Generating...';
        btn.disabled = true;
    }

    ctx.clearRect(0, 0, w, h);
    status.innerHTML = "Rasterizing vectors...";

    const colors = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#10b981', '#f59e0b'];

    for (let i = 0; i < 15; i++) {
        const x0 = Math.random() * w;
        const y0 = Math.random() * h;
        const x1 = Math.random() * w;
        const y1 = Math.random() * h;
        const color = colors[Math.floor(Math.random() * colors.length)];

        drawBresenhamLine(x0, y0, x1, y1, color);
        await new Promise(r => setTimeout(r, 100)); // Animation delay
    }

    status.innerHTML = "Rasterization Complete. 15 Vectors Rendered.";
    if (playEffects) {
        playCelebrateSound();

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.6 },
                colors: ['#8b5cf6', '#ffffff']
            });
        }
    }

    if (btn) {
        btn.innerHTML = '<i class="fas fa-random me-2"></i>Generate Lines';
        btn.disabled = false;
    }
}


// 2. Orbital (Midpoint Circle/Ellipse)
let orbitalCtx, orbitalCanvas;

function initOrbitalCanvas() {
    orbitalCanvas = document.getElementById('orbitalCanvas');
    const container = document.getElementById('orbital-container');
    if (!orbitalCanvas || !container) return;

    const rect = container.getBoundingClientRect();
    const newWidth = rect.width ? rect.width : 850;

    orbitalCanvas.width = newWidth;
    orbitalCanvas.height = Math.min(300, newWidth * 0.6);
    orbitalCtx = orbitalCanvas.getContext('2d');
}

function drawCircle(x, y, r, color) {
    orbitalCtx.beginPath();
    orbitalCtx.arc(x, y, r, 0, 2 * Math.PI);
    orbitalCtx.strokeStyle = color;
    orbitalCtx.lineWidth = 2;
    orbitalCtx.stroke();
}

function drawEllipse(x, y, rx, ry, rotation, color) {
    orbitalCtx.beginPath();
    orbitalCtx.ellipse(x, y, rx, ry, rotation, 0, 2 * Math.PI);
    orbitalCtx.strokeStyle = color;
    orbitalCtx.lineWidth = 2;
    orbitalCtx.stroke();
}

async function renderOrbital() {
    if (!orbitalCanvas) initOrbitalCanvas();
    const w = orbitalCanvas.width;
    const h = orbitalCanvas.height;
    const ctx = orbitalCtx;
    const status = document.getElementById('orbital-status');
    const btn = document.querySelector('button[onclick="renderOrbital()"]');

    if (btn) {
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin me-2"></i>Rendering...';
        btn.disabled = true;
    }

    ctx.clearRect(0, 0, w, h);
    status.innerHTML = "Calculating Decision Parameters...";

    const colors = ['#8b5cf6', '#ec4899', '#3b82f6'];

    // Draw Concentric Circles/Ellipses
    const centerX = w / 2;
    const centerY = h / 2;

    for (let i = 1; i <= 6; i++) {
        const type = Math.random() > 0.5 ? 'circle' : 'ellipse';
        const color = colors[i % colors.length];

        if (type === 'circle') {
            drawCircle(centerX, centerY, i * 20, color);
        } else {
            drawEllipse(centerX, centerY, i * 25, i * 15, i * 0.2, color);
        }

        await new Promise(r => setTimeout(r, 200));
    }

    // Draw some random ones around
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        drawCircle(x, y, Math.random() * 30 + 10, '#ffffff');
        await new Promise(r => setTimeout(r, 100));
    }

    status.innerHTML = "Orbital Shapes Rendered.";
    playCelebrateSound();

    if (btn) {
        btn.innerHTML = '<i class="fas fa-infinity me-2"></i>Render Shapes';
        btn.disabled = false;
    }
}


// PWA Install Logic
let deferredPrompt;
const pwaInstallBtn = document.getElementById('pwa-install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    pwaInstallBtn.style.display = 'flex';
});

if (pwaInstallBtn) {
    pwaInstallBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                pwaInstallBtn.style.display = 'none';
            }
            deferredPrompt = null;
        }
    });
}

// Share Functionality
const shareBtn = document.getElementById('share-btn');
if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'Computer Graphics Lab Portfolio — Amey Thakur',
            text: 'Computer Graphics Lab Portfolio — Amey Thakur',
            url: window.location.href
        };

        try {
            await navigator.share(shareData);
        } catch (err) {
            // Fallback: Copy to clipboard
            const dummy = document.createElement('input');
            document.body.appendChild(dummy);
            dummy.value = window.location.href;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            alert('Portfolio link copied to clipboard!');
        }
    });
}

/**
 * =========================================
 *   CORE FUNCTIONALITY
 * =========================================
 */

// Theme Toggle Logic
const toggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Back to Top Logic
const backToTopBtn = document.getElementById("btn-back-to-top");
if (backToTopBtn) {
    window.onscroll = function () { scrollFunction(); };
    backToTopBtn.addEventListener("click", () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}

function scrollFunction() {
    if (!backToTopBtn) return;
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
}

// Theme Toggle Logic
if (toggleBtn) {
    const themeIcon = toggleBtn.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) updateIcon(themeIcon, savedTheme);

    toggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        if (themeIcon) updateIcon(themeIcon, newTheme);
    });
}

function updateIcon(icon, theme) {
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Scroll Reveal Logic using Intersection Observer
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));


// Stats Counter Animation
const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };
                updateCounter();
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-container');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Mobile PDF Download Handler
document.addEventListener('DOMContentLoaded', () => {
    const pdfLink = document.getElementById('pdf-resource-link');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (pdfLink && isMobile) {
        pdfLink.removeAttribute('target');
        pdfLink.setAttribute('download', 'CG_Chapter-1.pdf');
    }
});

// Award Badge Interaction (3D Flip)
document.addEventListener('DOMContentLoaded', () => {
    const awardScene = document.querySelector('.award-scene');
    const awardCard = document.querySelector('.award-badge-card');
    const awardMsg = document.getElementById('award-msg');

    const messages = [
        "Rendered with Love ❤️",
        "Pixels Perfected ✨",
        "100% Geometry 📐",
        "High Five! ✋🏻",
        "You're a Star! 🌟",
        "+1 Kudos 🚀",
        "Contribution: Ack ✅",
        "Status: Awesome 🟢"
    ];

    if (awardScene && awardCard && awardMsg) {
        awardScene.addEventListener('click', () => {
            if (!awardCard.classList.contains('flipped')) {
                // Select Random Message
                const randomMsg = messages[Math.floor(Math.random() * messages.length)];
                awardMsg.textContent = randomMsg;

                // Play simplified sound
                playCelebrateSound();

                // Flip
                awardCard.classList.add('flipped');

                // Revert after 3 seconds
                setTimeout(() => {
                    awardCard.classList.remove('flipped');
                }, 3000);
            }
        });
    }
});

// Initialize Default Tab
document.addEventListener('DOMContentLoaded', () => {
    switchTab('raster');
    // Pre-draw something
    setTimeout(() => renderRandomLines(false), 500);
});

// 3D Tilt Interaction Logic
document.addEventListener('DOMContentLoaded', () => {
    const tiltElements = document.querySelectorAll('.tilt-effect');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', handleTilt);
        el.addEventListener('mouseleave', resetTilt);
    });

    function handleTilt(e) {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXVal = ((y - centerY) / centerY) * 8; // Subtle rotation
        const rotateYVal = ((centerX - x) / centerX) * 8;

        el.style.transform = `perspective(500px) rotateX(${rotateXVal}deg) rotateY(${rotateYVal}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    function resetTilt(e) {
        const el = e.currentTarget;
        el.style.transform = 'perspective(500px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
});

// Stack Builder Mini-Game
(function () {
    const canvas = document.getElementById('stackCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const overlay = document.getElementById('stack-overlay');
    const startBtn = document.getElementById('startStackGame');
    const scoreDisplay = document.getElementById('stack-score');
    const scoreValue = document.getElementById('score-value');

    let gameRunning = false;
    let animationId = null;
    let score = 0;
    let stack = [];
    let currentBlock = null;
    let direction = 1;
    let speed = 2;

    const BLOCK_HEIGHT = 20;
    const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#7c3aed', '#6d28d9'];

    function initGame() {
        score = 0;
        speed = 2;
        stack = [];
        scoreValue.textContent = '0';

        // Base block
        stack.push({
            x: canvas.width / 2 - 60,
            y: canvas.height - BLOCK_HEIGHT,
            width: 120,
            color: COLORS[0]
        });

        spawnBlock();
    }

    function spawnBlock() {
        const lastBlock = stack[stack.length - 1];
        currentBlock = {
            x: 0,
            y: lastBlock.y - BLOCK_HEIGHT,
            width: lastBlock.width,
            color: COLORS[stack.length % COLORS.length]
        };
        direction = 1;
    }

    function update() {
        if (!currentBlock) return;

        currentBlock.x += speed * direction;

        // Bounce off walls
        if (currentBlock.x + currentBlock.width > canvas.width) {
            direction = -1;
        } else if (currentBlock.x < 0) {
            direction = 1;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw stacked blocks
        stack.forEach(block => {
            ctx.fillStyle = block.color;
            ctx.fillRect(block.x, block.y, block.width, BLOCK_HEIGHT - 2);
        });

        // Draw current moving block
        if (currentBlock) {
            ctx.fillStyle = currentBlock.color;
            ctx.fillRect(currentBlock.x, currentBlock.y, currentBlock.width, BLOCK_HEIGHT - 2);
        }
    }

    function placeBlock() {
        if (!currentBlock || !gameRunning) return;

        const lastBlock = stack[stack.length - 1];
        const overlap = Math.min(currentBlock.x + currentBlock.width, lastBlock.x + lastBlock.width) -
            Math.max(currentBlock.x, lastBlock.x);

        if (overlap <= 0) {
            // Game Over
            gameOver();
            return;
        }

        // Calculate new block dimensions
        const newX = Math.max(currentBlock.x, lastBlock.x);
        const newWidth = overlap;

        stack.push({
            x: newX,
            y: currentBlock.y,
            width: newWidth,
            color: currentBlock.color
        });

        score++;
        scoreValue.textContent = score;
        speed = Math.min(speed + 0.15, 6); // Increase difficulty

        // Check if stack is getting too tall (scroll view)
        if (stack.length > 10) {
            stack.forEach(block => block.y += BLOCK_HEIGHT);
            stack = stack.filter(block => block.y < canvas.height);
        }

        spawnBlock();

        // Perfect placement bonus
        if (Math.abs(newWidth - lastBlock.width) < 5) {
            playCelebrateSound();
        }
    }

    function gameOver() {
        gameRunning = false;
        cancelAnimationFrame(animationId);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 15);
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 15);
        ctx.font = '11px Inter, sans-serif';
        ctx.fillStyle = '#a78bfa';
        ctx.fillText('Click to restart', canvas.width / 2, canvas.height / 2 + 40);

        overlay.style.display = 'none';
    }

    function gameLoop() {
        if (!gameRunning) return;
        update();
        draw();
        animationId = requestAnimationFrame(gameLoop);
    }

    function startGame() {
        overlay.style.display = 'none';
        scoreDisplay.style.display = 'block';
        gameRunning = true;
        initGame();
        gameLoop();
    }

    // Event Listeners
    startBtn.addEventListener('click', startGame);

    canvas.addEventListener('click', () => {
        if (gameRunning) {
            placeBlock();
        } else if (score > 0) {
            // Restart after game over
            startGame();
        }
    });
})();
