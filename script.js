const owlImages = [
    'STK-20260128-WA0010.webp',
    'STK-20260128-WA0017.webp',
    'STK-20260128-WA0018.webp',
    'STK-20260131-WA0001.webp',
    'STK-20260204-WA0007.webp',
    'STK-20260204-WA0010 - Copy.webp',
    'STK-20260204-WA0012 - Copy.webp',
    'STK-20260204-WA0013.webp',
    'STK-20260204-WA0027.webp',
    'STK-20260204-WA0028.webp',
    'STK-20260204-WA0029 - Copy.webp',
    'STK-20260209-WA0001 - Copy.webp',
    'STK-20260210-WA0012.webp',
    'STK-20260211-WA0029.webp',
    'STK-20260211-WA0030 - Copy.webp',
    'STK-20260211-WA0031.webp',
    'STK-20260211-WA0033.webp',
    'STK-20260211-WA0034 - Copy.webp',
    'STK-20260211-WA0035.webp',
    'STK-20260211-WA0036 - Copy.webp',
    'STK-20260212-WA0002.webp',
    'STK-20260212-WA0007.webp'
];

const funnyMessages = [
    "ನಾನು ಸದಾ ನಿನ್ನನ್ನೇ ಪ್ರೀತಿಸುವ ಗೂಬೆ!",
    "ನೀವು ನಿಜಕ್ಕೂ ಅದ್ಭುತ! ನನ್ನ ವ್ಯಾಲೆಂಟೈನ್ ಆಗುತ್ತೀಯಾ?",
    "ಪ್ರೀತಿಯೇ ಜೀವನದ ಗೂಬೆ!",
    "ಗೂಬೆಗಳ ಆಲಿಂಗನ ನಿನಗಾಗಿ!",
    "ನೀವು ಎಷ್ಟು ಮುದ್ದಾಗಿದ್ದೀರಿ!",
    "ನನ್ನ ಪ್ರೀತಿಯ ಗೂಬೆ ನೀನು!",
    "ನಗು ನಗುತ ಇರು ನನ್ನ ಗೂಬೆಯೇ!",
    "ಗೂಬೆ ಹೂಟ್ ಹೂಟ್ ಅಂದರೂ, ಅದು ಪ್ರೀತಿಯೇ!"
];

const animationContainer = document.getElementById('animation-container');
const trailContainer = document.getElementById('trail-container');
const hugBtn = document.getElementById('hug-btn');
const hugCountSpan = document.getElementById('hug-count');
const funnyMessageP = document.getElementById('funny-message');
const heroOwl = document.getElementById('hero-owl');

let hugCount = 0;

// Cursor Trial Logic
let lastTrailTime = 0;
window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime > 50) {
        createTrailParticle(e.clientX, e.clientY);
        lastTrailTime = now;
    }
});

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'trail-particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    // Random size and color
    const size = Math.random() * 8 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    const colors = ['#ff0055', '#00d4ff', '#9d00ff', '#ffffff'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.boxShadow = `0 0 10px ${particle.style.background}`;

    // Random velocity
    const dx = (Math.random() - 0.5) * 50;
    const dy = (Math.random() - 0.5) * 50;
    particle.style.setProperty('--dx', dx);
    particle.style.setProperty('--dy', dy);

    trailContainer.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
}

// Function to spawn flying owls
function spawnOwl() {
    const owl = document.createElement('img');
    const randomImage = owlImages[Math.floor(Math.random() * owlImages.length)];
    owl.src = `images/${randomImage}`;
    owl.className = 'flying-owl';

    const isLeftToRight = Math.random() > 0.5;
    const startX = isLeftToRight ? -100 : window.innerWidth + 100;
    const endX = isLeftToRight ? window.innerWidth + 100 : -100;
    const startY = Math.random() * (window.innerHeight - 200) + 100;

    owl.style.left = `${startX}px`;
    owl.style.top = `${startY}px`;

    animationContainer.appendChild(owl);

    const duration = 6000 + Math.random() * 8000;
    const controlY = startY + (Math.random() - 0.5) * 400;

    const animation = owl.animate([
        { left: `${startX}px`, top: `${startY}px`, transform: `rotate(${isLeftToRight ? 20 : -20}deg)` },
        { left: `${(startX + endX) / 2}px`, top: `${controlY}px`, transform: 'rotate(0deg)' },
        { left: `${endX}px`, top: `${startY}px`, transform: `rotate(${isLeftToRight ? -20 : 20}deg)` }
    ], {
        duration: duration,
        easing: 'ease-in-out'
    });

    animation.onfinish = () => owl.remove();

    owl.onclick = () => {
        createHearts(owl.offsetLeft + 40, owl.offsetTop + 40);
        owl.style.transform = 'scale(1.5)';
        owl.style.opacity = '0';
        setTimeout(() => owl.remove(), 300);
    };
}

// Function to spawn hearts
function createHearts(x, y) {
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.style.position = 'absolute';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.fontSize = `${Math.random() * 20 + 20}px`;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.innerHTML = ['❤️', '💖', '🦉', '✨'][Math.floor(Math.random() * 4)];

        const dx = (Math.random() - 0.5) * 300;
        const dy = (Math.random() - 0.5) * 300 - 100;

        document.body.appendChild(heart);

        heart.animate([
            { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) scale(2) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
        }).onfinish = () => heart.remove();
    }
}

// Haptic Feedback Helper
function triggerHaptic() {
    if (navigator.vibrate) {
        navigator.vibrate(15); // Light vibration
    }
}

// Hug button click handler
hugBtn.addEventListener('click', () => {
    triggerHaptic();

    // Remove hint if present
    const hint = document.querySelector('.click-hint');
    if (hint) hint.remove();

    hugCount++;
    hugCountSpan.textContent = hugCount;

    // Change message and hero owl
    const randomMsg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    funnyMessageP.textContent = randomMsg;

    const randomImg = owlImages[Math.floor(Math.random() * owlImages.length)];
    heroOwl.src = `images/${randomImg}`;

    // Explode hearts from button
    const rect = hugBtn.getBoundingClientRect();
    createHearts(rect.left + rect.width / 2, rect.top);
});

// Orientation change logic for responsiveness
window.addEventListener('resize', () => {
    // Optional: Adjust particle counts or animations based on screen size dynamically
});

const funnyDialogues = [
    "ಏನ್ ಸಮಾಚಾರ ಗೂಬೆ? 🦉",
    "ಊಟ ಆಯ್ತಾ? 🍛",
    "ಗೂಬೆ ತರ ಇರಬೇಡ! 😂",
    "ಮೇಡಂ, ನೀವು ತುಂಬಾ ಕ್ಯೂಟ್! ✨",
    "ಗೂಬೆ ಮರಿ, ಚಂದ ಇದ್ದೀಯಾ! 🦉",
    "ಯಾವ ಲೋಕದ ಅಪ್ಸರೆ ನೀವು? 👼",
    "ನಿಮ್ಮ ನಗು ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ! 😊",
    "ಕಿನ್ನರಿ ಮೇಡಂ ಬಂದರು! 🧚‍♀️",
    "ಗೂಬೆ, ನಿನ್ನ ಕಣ್ಣುಗಳು ಅದ್ಭುತ! ✨",
    "ಎಲ್ಲಿಗೆ ಹೋಗ್ತಾ ಇದೀಯಾ? 🏃‍♂️",
    "ಯಾರಪ್ಪ ಇದು ಇಷ್ಟು ಚಂದ ಇರೋದು? 😎",
    "ಪ್ರೀತಿ ಪ್ರೇಮ ಎಲ್ಲಾ ಪುಸ್ತಕದ ಬದನೆಕಾಯಿ! 🍆",
    "ಸೂಪರ್ ಅಲ್ವಾ? ✨",
    "ಗೊತ್ತು ಬಿಡಪ್ಪಾ! 😎",
    "ಸೈಕೋ ಗೂಬೆ! 🤯",
    "ಜಾಸ್ತಿ ಆಯ್ತು ನೋಡು! 🛑"
];

function spawnDialogue() {
    const dialogue = document.createElement('div');
    dialogue.className = 'floating-dialogue';
    dialogue.textContent = funnyDialogues[Math.floor(Math.random() * funnyDialogues.length)];

    // Random position
    const startX = Math.random() * (window.innerWidth - 200);
    const startY = window.innerHeight + 50;

    dialogue.style.left = `${startX}px`;
    dialogue.style.top = `${startY}px`;

    document.body.appendChild(dialogue);

    const duration = 8000 + Math.random() * 4000;
    const endY = -100;
    const driftX = (Math.random() - 0.5) * 200;

    dialogue.animate([
        { top: `${startY}px`, left: `${startX}px`, opacity: 0, transform: 'scale(0.5)' },
        { top: `${startY - 100}px`, opacity: 1, transform: 'scale(1.1)', offset: 0.1 },
        { top: `${startY - 200}px`, opacity: 1, transform: 'scale(1)', offset: 0.8 },
        { top: `${endY}px`, left: `${startX + driftX}px`, opacity: 0, transform: 'scale(0.8)' }
    ], {
        duration: duration,
        easing: 'ease-out'
    }).onfinish = () => dialogue.remove();
}

// Periodically spawn owls and dialogues
setInterval(spawnOwl, 2500);
setInterval(spawnDialogue, 4000);
for (let i = 0; i < 4; i++) setTimeout(spawnOwl, i * 1000);
setTimeout(spawnDialogue, 1000);

// Login Logic
const loginContainer = document.getElementById('login-screen');
const mainContent = document.getElementById('main-content');
const passwordInput = document.getElementById('password-input');
const loginButton = document.getElementById('login-btn');
const errorMsg = document.getElementById('error-msg');

function checkLogin() {
    const password = passwordInput.value.toLowerCase().trim();
    if (password === 'meow') {
        loginContainer.style.opacity = '0';
        setTimeout(() => {
            loginContainer.style.display = 'none';
            mainContent.style.display = 'block';
            mainContent.animate([
                { opacity: 0, transform: 'scale(0.9, 0.9)' },
                { opacity: 1, transform: 'scale(1, 1)' }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                fill: 'forwards'
            });
            triggerHaptic();
        }, 500);
    } else {
        errorMsg.textContent = 'ತಪ್ಪು! ಪಾಸ್‌ವರ್ಡ್ "meow" ಆಗಿರಬೇಕು! 😾';
        passwordInput.style.borderColor = '#ff0055';
        triggerHaptic();
        loginContainer.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
        ], { duration: 300 });
    }
}

if (loginButton) {
    loginButton.addEventListener('click', checkLogin);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkLogin();
    });

    // Auto-login on typing "meow"
    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value.toLowerCase().trim();
        if (val === 'meow') {
            checkLogin();
        }
        // Hint animation or glow based on correct letters (optional cool touch)
        if ('meow'.startsWith(val)) {
            passwordInput.style.borderColor = '#00d4ff';
            passwordInput.style.boxShadow = '0 0 15px #00d4ff55';
        } else {
            passwordInput.style.borderColor = 'rgba(255,255,255,0.2)';
            passwordInput.style.boxShadow = 'none';
        }
    });
}


