// Spiderweb-inspired dynamic background
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.getElementById('dynamic-bg').innerHTML = '';
document.getElementById('dynamic-bg').appendChild(canvas);
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Spiderweb network parameters
const NODES = 50;
const MAX_DIST = 140;
const nodes = [];
for (let i = 0; i < NODES; i++) {
    nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
    });
}

// --- INTERACTIVE SPIDERWEB ---
let mouse = { x: null, y: null };
canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});
canvas.addEventListener('mouseleave', function() {
    mouse.x = null;
    mouse.y = null;
});

function isNearMouse(node, radius = 60) {
    if (mouse.x === null || mouse.y === null) return false;
    const dx = node.x - mouse.x;
    const dy = node.y - mouse.y;
    return dx * dx + dy * dy < radius * radius;
}

function drawSpiderWeb() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw lines between close nodes, but break lines if mouse is near
    for (let i = 0; i < NODES; i++) {
        for (let j = i + 1; j < NODES; j++) {
            // If mouse is near either node, break the line
            if (isNearMouse(nodes[i]) || isNearMouse(nodes[j])) continue;
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MAX_DIST) {
                ctx.save();
                ctx.strokeStyle = `rgba(200, 220, 255, ${1 - dist / MAX_DIST})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
                ctx.restore();
            }
        }
    }
    // Draw nodes
    for (let node of nodes) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, 2 * Math.PI);
        ctx.fillStyle = '#b3e0ff';
        ctx.shadowColor = '#7ed6ff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
    }
    // Draw line from mouse to nearest node (optional effect)
    if (mouse.x !== null && mouse.y !== null) {
        let minDist = Infinity, nearest = null;
        for (let node of nodes) {
            const dx = node.x - mouse.x;
            const dy = node.y - mouse.y;
            const dist = dx * dx + dy * dy;
            if (dist < minDist) {
                minDist = dist;
                nearest = node;
            }
        }
        if (nearest && Math.sqrt(minDist) < MAX_DIST) {
            ctx.save();
            ctx.strokeStyle = 'rgba(255, 150, 100, 0.6)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(nearest.x, nearest.y);
            ctx.stroke();
            ctx.restore();
        }
    }
    // Move nodes
    for (let node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        // Bounce from edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
    }
    requestAnimationFrame(drawSpiderWeb);
}
drawSpiderWeb();

// --- THEME TOGGLE ---
function setTheme(dark) {
    if (dark) {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-toggle-icon').className = 'bi bi-sun';
    } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('theme-toggle-icon').className = 'bi bi-moon';
    }
}

// Initial theme from localStorage or system preference
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme === 'dark' || (savedTheme === null && prefersDark));

document.getElementById('theme-toggle').addEventListener('click', function() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('theme-toggle-icon').className = isDark ? 'bi bi-sun' : 'bi bi-moon';
});

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hash && document.querySelector(this.hash)) {
            e.preventDefault();
            document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
        }
    });
});
