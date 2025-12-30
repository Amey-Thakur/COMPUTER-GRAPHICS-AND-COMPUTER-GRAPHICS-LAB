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

// Stack Builder Mini-Game (Enhanced - Phase 1)
(function () {
    const canvas = document.getElementById('stackCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const overlay = document.getElementById('stack-overlay');
    const startBtn = document.getElementById('startStackGame');
    const scoreDisplay = document.getElementById('stack-score');
    const scoreValue = document.getElementById('score-value');
    const soundToggle = document.getElementById('sound-toggle');
    const comboDisplay = document.getElementById('combo-display');
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    const tutorialOverlay = document.getElementById('tutorial-overlay');
    const closeTutorialBtn = document.getElementById('close-tutorial');
    const shareBtn = document.getElementById('share-score-btn');

    // Constants
    const DEVELOPER_SCORE = 58; // Challenge score to beat

    // Game State
    let gameRunning = false;
    let animationId = null;
    let score = 0;
    let streak = 0;
    let stack = [];
    let currentBlock = null;
    let direction = 1;
    let speed = 2;
    let baseSpeed = 2;
    let speedIncrement = 0.12;
    let stars = [];
    let soundEnabled = localStorage.getItem('stackSoundEnabled') !== 'false';
    let difficulty = localStorage.getItem('stackDifficulty') || 'medium';

    // Leaderboard (Top 3)
    let leaderboard = JSON.parse(localStorage.getItem('stackLeaderboard')) || [];
    let highScore = leaderboard[0] || 0;

    const BLOCK_HEIGHT = 20;
    const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#7c3aed', '#6d28d9'];

    // Difficulty Settings
    const DIFFICULTY_SETTINGS = {
        easy: { baseSpeed: 1.5, speedIncrement: 0.08, maxSpeed: 4 },
        medium: { baseSpeed: 2, speedIncrement: 0.12, maxSpeed: 5.5 },
        hard: { baseSpeed: 3, speedIncrement: 0.18, maxSpeed: 7 }
    };

    // Initialize difficulty buttons
    difficultyBtns.forEach(btn => {
        // Clear default active class, set based on saved preference
        btn.classList.remove('active');
        btn.style.outline = 'none';
        if (btn.dataset.difficulty === difficulty) {
            btn.classList.add('active');
            btn.style.outline = '2px solid white';
        }
        btn.addEventListener('click', () => {
            difficultyBtns.forEach(b => {
                b.classList.remove('active');
                b.style.outline = 'none';
            });
            btn.classList.add('active');
            btn.style.outline = '2px solid white';
            difficulty = btn.dataset.difficulty;
            localStorage.setItem('stackDifficulty', difficulty);
        });
    });

    // Sound Toggle
    if (soundToggle) {
        updateSoundIcon();
        soundToggle.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            localStorage.setItem('stackSoundEnabled', soundEnabled);
            updateSoundIcon();
        });
    }

    function updateSoundIcon() {
        if (soundToggle) {
            soundToggle.innerHTML = soundEnabled ?
                '<i class="fas fa-volume-up"></i>' :
                '<i class="fas fa-volume-mute"></i>';
        }
    }

    // Buzz sound for game over
    function playBuzzSound() {
        if (!soundEnabled) return;
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.15);

            gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.2);
        } catch (e) { /* Audio not supported */ }
    }

    // Celebration sound for perfect/combo
    function playCelebrationSound() {
        if (!soundEnabled) return;
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523, audioCtx.currentTime); // C5
            oscillator.frequency.setValueAtTime(659, audioCtx.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(784, audioCtx.currentTime + 0.2); // G5

            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.3);
        } catch (e) { /* Audio not supported */ }
    }

    // Confetti celebration for high score
    function launchConfetti() {
        const confettiColors = ['#8b5cf6', '#a78bfa', '#fbbf24', '#ec4899', '#10b981', '#fff'];
        const confettiCount = 50;
        const wrapper = document.getElementById('stack-game-wrapper');
        if (!wrapper) return;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: ${confettiColors[Math.floor(Math.random() * confettiColors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                pointer-events: none;
                z-index: 100;
            `;
            wrapper.appendChild(confetti);

            // Animate falling
            const duration = Math.random() * 1500 + 1000;
            const xOffset = (Math.random() - 0.5) * 100;
            confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(350px) translateX(${xOffset}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            setTimeout(() => confetti.remove(), duration);
        }
    }

    // Color utility functions for gradients
    function lightenColor(hex, percent) {
        const num = parseInt(hex.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return `rgb(${R},${G},${B})`;
    }

    function darkenColor(hex, percent) {
        const num = parseInt(hex.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, (num >> 16) - amt);
        const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
        const B = Math.max(0, (num & 0x0000FF) - amt);
        return `rgb(${R},${G},${B})`;
    }

    // Phase 2: Sparkle particles on perfect placement
    let particles = [];

    function createSparkles(x, y) {
        const colors = ['#fbbf24', '#fff', '#a78bfa', '#8b5cf6'];
        for (let i = 0; i < 12; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6 - 2,
                size: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1,
                decay: Math.random() * 0.03 + 0.02
            });
        }
    }

    function updateParticles() {
        particles = particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // Gravity
            p.life -= p.decay;
            return p.life > 0;
        });
    }

    function drawParticles() {
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fill();
            ctx.globalAlpha = 1;
        });
    }

    // Phase 2: Screen flash on game over
    let flashAlpha = 0;

    function triggerFlash() {
        flashAlpha = 0.6;
    }

    function drawFlash() {
        if (flashAlpha > 0) {
            ctx.fillStyle = `rgba(239, 68, 68, ${flashAlpha})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            flashAlpha -= 0.05;
        }
    }

    // Phase 2: Floating score popup
    let floatingTexts = [];

    function createFloatingScore(text, x, y, color = '#fbbf24') {
        floatingTexts.push({
            text: text,
            x: x,
            y: y,
            vy: -2,
            life: 1,
            color: color
        });
    }

    function updateFloatingTexts() {
        floatingTexts = floatingTexts.filter(t => {
            t.y += t.vy;
            t.life -= 0.02;
            return t.life > 0;
        });
    }

    function drawFloatingTexts() {
        floatingTexts.forEach(t => {
            ctx.font = 'bold 14px Inter, sans-serif';
            ctx.fillStyle = t.color;
            ctx.globalAlpha = t.life;
            ctx.textAlign = 'center';
            ctx.fillText(t.text, t.x, t.y);
            ctx.globalAlpha = 1;
        });
    }

    // Generate starfield
    function generateStars() {
        stars = [];
        for (let i = 0; i < 40; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.5 + 0.3,
                twinkleSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }

    // Draw CG-themed background
    function drawBackground() {
        // Gradient already set in CSS, draw grid lines
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
        ctx.lineWidth = 1;

        // Vertical grid
        for (let x = 0; x < canvas.width; x += 30) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Horizontal grid
        for (let y = 0; y < canvas.height; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Draw twinkling stars
        stars.forEach(star => {
            star.alpha += star.twinkleSpeed;
            if (star.alpha > 0.8 || star.alpha < 0.2) {
                star.twinkleSpeed = -star.twinkleSpeed;
            }
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
        });
    }

    function initGame() {
        score = 0;
        streak = 0;
        stack = [];
        scoreValue.textContent = '0';
        generateStars();

        // Apply difficulty settings
        const settings = DIFFICULTY_SETTINGS[difficulty];
        baseSpeed = settings.baseSpeed;
        speedIncrement = settings.speedIncrement;
        speed = baseSpeed;

        // Hide combo display
        if (comboDisplay) comboDisplay.style.display = 'none';

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

        // Draw background elements
        drawBackground();

        // Draw shadow preview (where block will land)
        if (currentBlock && stack.length > 0) {
            const lastBlock = stack[stack.length - 1];
            ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.strokeRect(lastBlock.x, lastBlock.y - BLOCK_HEIGHT, lastBlock.width, BLOCK_HEIGHT - 2);
            ctx.setLineDash([]);
        }

        // Draw stacked blocks with gradient and 3D effect
        stack.forEach((block, i) => {
            // Create gradient for 3D effect
            const gradient = ctx.createLinearGradient(block.x, block.y, block.x, block.y + BLOCK_HEIGHT);
            gradient.addColorStop(0, lightenColor(block.color, 20));
            gradient.addColorStop(0.5, block.color);
            gradient.addColorStop(1, darkenColor(block.color, 20));

            // Glow effect for recent blocks
            if (i >= stack.length - 3) {
                ctx.shadowColor = block.color;
                ctx.shadowBlur = 8;
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(block.x, block.y, block.width, BLOCK_HEIGHT - 2);

            // 3D edge highlight
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.fillRect(block.x, block.y, block.width, 2);
            ctx.shadowBlur = 0;
        });

        // Draw current moving block with gradient
        if (currentBlock) {
            const gradient = ctx.createLinearGradient(currentBlock.x, currentBlock.y, currentBlock.x, currentBlock.y + BLOCK_HEIGHT);
            gradient.addColorStop(0, lightenColor(currentBlock.color, 20));
            gradient.addColorStop(0.5, currentBlock.color);
            gradient.addColorStop(1, darkenColor(currentBlock.color, 20));

            ctx.shadowColor = currentBlock.color;
            ctx.shadowBlur = 10;
            ctx.fillStyle = gradient;
            ctx.fillRect(currentBlock.x, currentBlock.y, currentBlock.width, BLOCK_HEIGHT - 2);

            // 3D edge highlight
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.fillRect(currentBlock.x, currentBlock.y, currentBlock.width, 2);
            ctx.shadowBlur = 0;
        }

        // Draw streak indicator
        if (streak > 1) {
            ctx.font = 'bold 12px Inter, sans-serif';
            ctx.fillStyle = '#fbbf24';
            ctx.textAlign = 'center';
            ctx.fillText('🔥 x' + streak, canvas.width / 2, 50);
        }

        // Phase 2: Draw particles and floating texts
        updateParticles();
        drawParticles();
        updateFloatingTexts();
        drawFloatingTexts();
        drawFlash();
    }

    function placeBlock() {
        if (!currentBlock || !gameRunning) return;

        const lastBlock = stack[stack.length - 1];
        const overlap = Math.min(currentBlock.x + currentBlock.width, lastBlock.x + lastBlock.width) -
            Math.max(currentBlock.x, lastBlock.x);

        if (overlap <= 0) {
            gameOver();
            return;
        }

        // Calculate new block dimensions
        const newX = Math.max(currentBlock.x, lastBlock.x);
        const newWidth = overlap;
        const isPerfect = Math.abs(newWidth - lastBlock.width) < 5;

        stack.push({
            x: newX,
            y: currentBlock.y,
            width: newWidth,
            color: currentBlock.color
        });

        score++;

        // Phase 2: Floating score popup
        const bonusPoints = isPerfect ? streak + 1 : 1;
        const popupX = newX + newWidth / 2;
        const popupY = currentBlock.y;
        createFloatingScore(`+${bonusPoints}`, popupX, popupY, isPerfect ? '#fbbf24' : '#a78bfa');

        // Streak logic with combo display
        if (isPerfect) {
            streak++;
            score += streak; // Bonus points for streak
            playCelebrationSound();

            // Phase 2: Sparkle particles on perfect placement
            createSparkles(newX + newWidth / 2, currentBlock.y);

            // Show combo display for 3+ streak
            if (streak >= 3 && comboDisplay) {
                comboDisplay.textContent = `🔥 Perfect x${streak}!`;
                comboDisplay.style.display = 'block';
                comboDisplay.style.animation = 'none';
                comboDisplay.offsetHeight; // Trigger reflow
                comboDisplay.style.animation = 'fadeInOut 1s ease-out';
            }
        } else {
            streak = 0;
            if (comboDisplay) comboDisplay.style.display = 'none';
        }

        scoreValue.textContent = score;
        const settings = DIFFICULTY_SETTINGS[difficulty];
        speed = Math.min(speed + speedIncrement, settings.maxSpeed);

        // Scroll view
        if (stack.length > 12) {
            stack.forEach(block => block.y += BLOCK_HEIGHT);
            stack = stack.filter(block => block.y < canvas.height);
        }

        spawnBlock();
    }

    function gameOver() {
        gameRunning = false;
        cancelAnimationFrame(animationId);

        // Shake animation using JS
        let shakeCount = 0;
        const shakeInterval = setInterval(() => {
            const offset = shakeCount % 2 === 0 ? 8 : -8;
            canvas.style.transform = `translateX(${offset}px)`;
            shakeCount++;
            if (shakeCount >= 8) {
                clearInterval(shakeInterval);
                canvas.style.transform = 'translateX(0)';
            }
        }, 50);

        // Phase 2: Screen flash on game over
        triggerFlash();

        // Buzz sound
        playBuzzSound();

        const isNewHighScore = score > highScore;
        if (isNewHighScore) {
            highScore = score;
            localStorage.setItem('stackGameHighScore', highScore);
        }

        // Draw final frame with background
        draw();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.textAlign = 'center';

        // New High Score celebration
        if (isNewHighScore && score > 1) {
            ctx.font = 'bold 14px Inter, sans-serif';
            ctx.fillStyle = '#fbbf24';
            ctx.fillText('🎉 NEW HIGH SCORE! 🎉', canvas.width / 2, canvas.height / 2 - 50);
            launchConfetti(); // Confetti celebration!
        } else if (score > DEVELOPER_SCORE) {
            // Dev Challenge beat
            ctx.font = 'bold 12px Inter, sans-serif';
            ctx.fillStyle = '#10b981';
            ctx.fillText('🚀 DEV SCORE BEATEN!', canvas.width / 2, canvas.height / 2 - 50);
            launchConfetti();
        }

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 22px Inter, sans-serif';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 15);

        ctx.font = '14px Inter, sans-serif';
        ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 15);

        // Update leaderboard
        updateLeaderboard(score);

        ctx.font = '11px Inter, sans-serif';
        ctx.fillStyle = '#a78bfa';

        // Display top 3 scores
        ctx.fillText('🏆 Top Scores:', canvas.width / 2, canvas.height / 2 + 40);
        ctx.font = '10px Inter, sans-serif';
        leaderboard.slice(0, 3).forEach((s, i) => {
            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉';
            ctx.fillText(`${medal} ${s}`, canvas.width / 2, canvas.height / 2 + 55 + (i * 12));
        });

        ctx.font = '10px Inter, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Tap to play again', canvas.width / 2, canvas.height / 2 + 100);

        overlay.style.display = 'none';

        // Show Share Button
        if (shareBtn) {
            shareBtn.style.display = 'block';
            shareBtn.onclick = (e) => {
                e.stopPropagation(); // Prevent restart
                const text = `I scored ${score} in Stack Builder! Can you beat the Dev Score of ${DEVELOPER_SCORE}? 🚀 Play now at ${window.location.href}`;
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = shareBtn.innerHTML;
                    shareBtn.innerHTML = '<i class="fas fa-check me-1"></i>Copied!';
                    setTimeout(() => shareBtn.innerHTML = originalText, 2000);
                });
            };
        }
    }

    function updateLeaderboard(newScore) {
        if (newScore > 0) {
            leaderboard.push(newScore);
            leaderboard.sort((a, b) => b - a);
            leaderboard = leaderboard.slice(0, 3); // Keep top 3
            localStorage.setItem('stackLeaderboard', JSON.stringify(leaderboard));
            highScore = leaderboard[0];
        }
    }

    function gameLoop() {
        if (!gameRunning) return;
        update();
        draw();
        animationId = requestAnimationFrame(gameLoop);
    }

    function startGame() {
        // Check for tutorial
        const tutorialShown = localStorage.getItem('stackTutorialShown');
        if (!tutorialShown && tutorialOverlay) {
            tutorialOverlay.style.display = 'flex';
            localStorage.setItem('stackTutorialShown', 'true');

            // Should be handled by close button, but safety first
            if (closeTutorialBtn) {
                closeTutorialBtn.onclick = () => {
                    tutorialOverlay.style.display = 'none';
                    actuallyStartGame();
                };
            }
            return;
        }

        actuallyStartGame();
    }

    function actuallyStartGame() {
        overlay.style.display = 'none';
        scoreDisplay.style.display = 'block';
        if (soundToggle) soundToggle.style.display = 'block';
        if (shareBtn) shareBtn.style.display = 'none';
        gameRunning = true;
        initGame();
        gameLoop();
    }

    // Event Listeners
    startBtn.addEventListener('click', startGame);

    // Click and Touch support
    canvas.addEventListener('click', handleTap);
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleTap();
    }, { passive: false });

    function handleTap() {
        if (gameRunning) {
            placeBlock();
        } else if (score > 0) {
            startGame();
        }
    }

    // Draw initial background preview
    generateStars();
    drawBackground();
})();
