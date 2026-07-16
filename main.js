// =============================================
// MORI CONTRACTING INC. — MAIN JS
// =============================================

// --- Sticky Nav ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// --- Mobile Menu ---
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// --- Multi-select Service Checkboxes ---
document.querySelectorAll('.checkbox-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('checked');
    const cb = item.querySelector('input[type="checkbox"]');
    cb.checked = item.classList.contains('checked');
    document.getElementById('service-error').classList.remove('visible');
  });
});

// --- Scroll Reveal ---
const revealEls = document.querySelectorAll(
  '#about .about-grid, #services .service-card, #gallery .gallery-item, .quote-wrapper, .section-eyebrow, .section-title, .section-sub'
);
revealEls.forEach(el => el.classList.add('reveal'));
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// --- Quote Form Submit ---
const form = document.getElementById('quote-form');
const successMsg = document.getElementById('form-success');
const serviceError = document.getElementById('service-error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const checked = form.querySelectorAll('.checkbox-item.checked');
  if (checked.length === 0) {
    serviceError.classList.add('visible');
    serviceError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const action = form.getAttribute('action');

  if (action.includes('YOUR_FORM_ID')) {
    successMsg.style.display = 'block';
    successMsg.textContent = '✅ Form works! Connect Formspree (see README) to receive emails.';
    form.reset();
    form.querySelectorAll('.checkbox-item').forEach(i => i.classList.remove('checked'));
    return;
  }

  const data = new FormData(form);
  try {
    const res = await fetch(action, {
      method: 'POST', body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      successMsg.style.display = 'block';
      successMsg.textContent = "✅ Thanks! We'll get back to you within 24 hours.";
      form.reset();
      form.querySelectorAll('.checkbox-item').forEach(i => i.classList.remove('checked'));
      form.querySelectorAll('input, select, textarea, button').forEach(el => el.disabled = true);
    } else {
      throw new Error();
    }
  } catch {
    alert('Something went wrong. Please call us directly!');
  }
});

// --- Smooth scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
