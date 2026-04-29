/* ════════════════════════════════════════════════════════════════
   RAVEN & DRAGON — Shared Site Behavior
   ════════════════════════════════════════════════════════════════
   Loaded on every page. Responsibilities:
     1. Inject the same nav + footer everywhere (single source of
        truth — edit links here, not in each HTML file).
     2. Custom cursor follow.
     3. Solid-nav-on-scroll toggle.
     4. Hamburger / mobile menu open/close.
     5. Scroll-reveal animations for elements with `.reveal`.

   To set the active nav link on a page, add this to the HTML
   *before* loading shared.js:
       <script>window.PAGE = 'home';</script>   // or 'about', 'booking', 'groups', 'faq'
   ════════════════════════════════════════════════════════════════ */


/* ─── Site-wide config (edit nav links / contact info here only) ─── */
const SITE = {
  phone:    '(714) 414-7233',
  phoneRaw: '+17144147233',
  email:    'ravenanddragonllc@gmail.com',
  address:  '518 E Route 66, Williams, AZ 86046',
  mapsUrl:  'https://maps.google.com/?q=518+E+Route+66+Williams+AZ+86046',
  socials: {
    instagram: 'https://www.instagram.com/ravenanddragonvr/',
    facebook:  'http://facebook.com/profile.php?id=61564699002867',
    tiktok:    'https://www.tiktok.com/@kaitlanddavis940?lang=en',
  },
  navLinks: [
    { id: 'home',    label: 'Home',    href: 'index.html'   },
    { id: 'about',   label: 'About',   href: 'about.html'   },
    { id: 'booking', label: 'Booking', href: 'booking.html' },
    { id: 'groups',  label: 'Groups',  href: 'groups.html'  },
    { id: 'faq',     label: 'FAQ',     href: 'faq.html'     },
  ],
};


/* ─── Inject the nav + mobile menu into every page ─── */
function renderNav() {
  const active = window.PAGE || '';
  const linksHTML = SITE.navLinks
    .map(l => `<li><a href="${l.href}"${l.id === active ? ' class="active"' : ''}>${l.label}</a></li>`)
    .join('');

  const mobLinksHTML = SITE.navLinks
    .map(l => `<a href="${l.href}"${l.id === active ? ' class="active"' : ''}>${l.label}</a>`)
    .join('');

  const navHTML = `
    <div id="cur"></div>
    <div id="curR"></div>
    <nav id="nav">
      <a href="index.html" class="nav-mark">R</a>
      <ul class="nav-links">${linksHTML}</ul>
      <a href="booking.html" class="nav-pill">Book Now ↗</a>
      <button class="burger" id="burger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="mob-menu" id="mobMenu">
      ${mobLinksHTML}
      <a href="booking.html" class="mob-cta">Book Now ↗</a>
      <div class="mob-menu-foot">
        <span>Route 66 · Williams, AZ</span>
        <a href="tel:${SITE.phoneRaw}">${SITE.phone}</a>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
}


/* ─── Inject the footer into every page ─── */
function renderFooter() {
  const navItems = SITE.navLinks
    .map(l => `<li><a href="${l.href}">${l.label}</a></li>`)
    .join('');

  const footerHTML = `
    <footer>
      <div class="footer-main">
        <div class="footer-brand">
          <a href="index.html" class="footer-brand-name">Raven &amp; Dragon</a>
          <p>Free-roam VR arena and immersive escape rooms on Route 66 in Williams, Arizona.</p>
        </div>
        <div class="footer-logo-wrap">
          <img src="logo.png" alt="Raven &amp; Dragon" class="footer-logo">
        </div>
        <div class="footer-nav">
          <div class="fcol">
            <h4>Navigate</h4>
            <ul>${navItems}</ul>
          </div>
          <div class="fcol">
            <h4>Get in Touch</h4>
            <ul>
              <li><a href="${SITE.mapsUrl}" target="_blank" rel="noopener">${SITE.address}</a></li>
              <li><a href="tel:${SITE.phoneRaw}">${SITE.phone}</a></li>
              <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
              <li><a href="${SITE.socials.instagram}" target="_blank" rel="noopener">Instagram</a></li>
              <li><a href="${SITE.socials.facebook}"  target="_blank" rel="noopener">Facebook</a></li>
              <li><a href="${SITE.socials.tiktok}"    target="_blank" rel="noopener">TikTok</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bot">
        <p>&copy; 2025 Raven &amp; Dragon VR Arena &middot; &#127894; Military &amp; first responder discounts</p>
        <p>Forged on Route 66</p>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('beforeend', footerHTML);
}


/* ─── Custom cursor (only mounts on devices that hover) ─── */
function initCursor() {
  const cur  = document.getElementById('cur');
  const curR = document.getElementById('curR');
  if (!cur || !curR) return;

  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
    setTimeout(() => {
      curR.style.left = e.clientX + 'px';
      curR.style.top  = e.clientY + 'px';
    }, 90);
  });
}


/* ─── Nav becomes opaque after scrolling past 60px ─── */
function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('solid', window.scrollY > 60);
  });
}


/* ─── Hamburger / mobile menu open + close ─── */
function initMobileMenu() {
  const burger  = document.getElementById('burger');
  const mobMenu = document.getElementById('mobMenu');
  if (!burger || !mobMenu) return;

  const close = () => {
    burger.classList.remove('open');
    mobMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobMenu.classList.toggle('open');
    document.body.style.overflow = mobMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Tapping any link inside the mobile menu should close it
  mobMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}


/* ─── Scroll-reveal: fade elements in when they enter view ─── */
function initReveal() {
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: .12 });

  document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

  // Story sections need a higher threshold so they only animate
  // once they're more visibly on screen.
  const story = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: .2 });

  document.querySelectorAll('.story-ui').forEach(el => story.observe(el));
}


/* ─── Boot up once the DOM is ready ─── */
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  initCursor();
  initNavScroll();
  initMobileMenu();
  initReveal();
});
