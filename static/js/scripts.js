// Smooth scroll for navigation
const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hash) {
            e.preventDefault();
            document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
        }
    });
});
// Dark/Light mode toggle
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;
modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    modeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});
// Persist theme
window.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        modeToggle.textContent = '☀️';
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        modeToggle.textContent = '🌙';
    }
});
