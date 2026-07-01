/* =========================================================
   RHITAMBHAR CHOUDHURY — Page-specific JS
   ========================================================= */

/* === CERTIFICATE VIEWER === */
function openCertViewer(src, title) {
  const modal = document.getElementById('cert-modal');
  if (!modal) return;
  document.getElementById('cert-frame').src = src;
  document.getElementById('cert-modal-title').textContent = title;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCertViewer() {
  const modal = document.getElementById('cert-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.getElementById('cert-frame').src = '';
  document.body.style.overflow = '';
}

/* Close on backdrop click */
document.addEventListener('click', e => {
  if (e.target.id === 'cert-modal') closeCertViewer();
});

/* Close on Escape key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCertViewer();
});

/* === FILTER SYSTEM (for projects/certificates) === */
function initFilters() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('[data-category]');
  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      items.forEach(item => {
        const cats = item.dataset.category.split(' ');
        const show = filter === 'all' || cats.includes(filter);
        item.style.display = show ? '' : 'none';
        if (show) {
          item.style.animation = 'fadeInUp 0.3s ease forwards';
        }
      });
    });
  });
}

/* === COPY TO CLIPBOARD === */
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'copied!';
    btn.style.color = 'var(--accent)';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.color = '';
    }, 2000);
  });
}

/* === TIMELINE ANIMATION === */
function initTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  if (items.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(item => observer.observe(item));
}

/* === CLOCK IN NAV (optional) === */
function startClock() {
  const el = document.getElementById('nav-clock');
  if (!el) return;
  const update = () => {
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };
  update();
  setInterval(update, 60000);
}

document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initTimeline();
  startClock();
});
