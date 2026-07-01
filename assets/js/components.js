/* =========================================================
   RHITAMBHAR CHOUDHURY — Shared Components Loader
   Injects navbar and dock into every page dynamically
   ========================================================= */

const PAGES = [
  { id: 'home',         href: 'index.html',        label: 'home',    icon: '⌂' },
  { id: 'about',        href: 'about.html',         label: 'about',   icon: '◉' },
  { id: 'electronics',  href: 'electronics.html',   label: 'hw',      icon: '⚡' },
  { id: 'design',       href: 'design.html',        label: 'design',  icon: '◈' },
  { id: 'certificates', href: 'certificates.html',  label: 'certs',   icon: '✦' },
  { id: 'publications', href: 'publications.html',  label: 'papers',  icon: '⊞' },
];

const SOCIALS = [
  { href: 'https://github.com/YOUR_USERNAME',    label: 'git',  icon: '⌥' },
  { href: 'https://linkedin.com/in/YOUR_HANDLE', label: 'in',   icon: '◫' },
  { href: 'mailto:your@email.com',               label: 'mail', icon: '✉' },
];

/* Detect which page is active based on current filename */
function getActivePage() {
  const path = window.location.pathname;
  const file = path.split('/').pop() || 'index.html';
  const found = PAGES.find(p => p.href === file || (file === '' && p.id === 'home'));
  return found ? found.id : 'home';
}

/* Build and inject the navbar */
function injectNavbar() {
  const active = getActivePage();
  const activeLabel = PAGES.find(p => p.id === active)?.label || 'home';

  const navLinksHTML = PAGES.map(p => `
    <li>
      <a href="${p.href}" class="${p.id === active ? 'active' : ''}">
        ${p.label}
      </a>
    </li>
  `).join('');

  const html = `
    <div class="nav-left">
      <span class="nav-logo">rhitambhar@portfolio</span>
      <span class="nav-prompt">:~/${activeLabel}$</span>
    </div>
    <ul class="nav-links">
      ${navLinksHTML}
    </ul>
    <div class="nav-status">
      <span class="status-dot"></span>
      <span>online</span>
    </div>
  `;

  let navbar = document.getElementById('navbar');
  if (!navbar) {
    navbar = document.createElement('nav');
    navbar.id = 'navbar';
    document.body.prepend(navbar);
  }
  navbar.innerHTML = html;
}

/* Build and inject the dock */
function injectDock() {
  const active = getActivePage();

  const pageItemsHTML = PAGES.map(p => `
    <a href="${p.href}" class="dock-item ${p.id === active ? 'active' : ''}" title="${p.label}">
      <span class="dock-icon">${p.icon}</span>
      <span class="dock-label">${p.label}</span>
    </a>
  `).join('');

  const socialItemsHTML = SOCIALS.map(s => `
    <a href="${s.href}" class="dock-item" title="${s.label}" target="${s.href.startsWith('http') ? '_blank' : '_self'}">
      <span class="dock-icon">${s.icon}</span>
      <span class="dock-label">${s.label}</span>
    </a>
  `).join('');

  const html = `
    ${pageItemsHTML}
    <div class="dock-separator"></div>
    ${socialItemsHTML}
  `;

  let dock = document.getElementById('dock');
  if (!dock) {
    dock = document.createElement('div');
    dock.id = 'dock';
    document.body.appendChild(dock);
  }
  dock.innerHTML = html;
}

/* Animate elements into view on scroll */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

/* Typewriter effect for elements with data-typewrite */
function initTypewriter() {
  document.querySelectorAll('[data-typewrite]').forEach(el => {
    const text = el.dataset.typewrite;
    const speed = parseInt(el.dataset.speed || '50');
    el.textContent = '';
    let i = 0;
    const cursor = document.createElement('span');
    cursor.style.cssText = 'display:inline-block;width:2px;height:1em;background:var(--accent);margin-left:2px;vertical-align:middle;animation:blink 1s step-end infinite;';
    el.appendChild(cursor);

    const type = () => {
      if (i < text.length) {
        cursor.insertAdjacentText('beforebegin', text[i]);
        i++;
        setTimeout(type, speed);
      }
    };
    setTimeout(type, 300);
  });
}

/* Active nav link highlight on scroll (single-page sections) */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  if (sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* Boot everything when DOM is ready */
document.addEventListener('DOMContentLoaded', () => {
  injectNavbar();
  injectDock();
  initScrollReveal();
  initTypewriter();
  initScrollSpy();
});
