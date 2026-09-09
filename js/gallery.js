/* ============================================================
   GALLERY PAGE — lightbox behaviour
   Works alongside the site's existing main.js (nav/scroll).
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const overlay   = document.getElementById('lightboxOverlay');
  const content   = document.getElementById('lightboxContent');
  const closeBtn  = document.getElementById('lightboxClose');
  const items     = document.querySelectorAll('.gallery-item');

  if (!overlay || !content) return;

  function openLightbox(src, alt) {
    content.innerHTML = `<img src="${src}" alt="${alt || ''}" class="lightbox-img" />`;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-item-img');
      if (img) openLightbox(img.getAttribute('src'), img.getAttribute('alt'));
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeLightbox();
  });
});