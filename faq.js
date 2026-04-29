/* ════════════════════════════════════════════════════════════════
   faq.js — FAQ accordion page
   ════════════════════════════════════════════════════════════════
   To add, remove, or edit a question, just modify the FAQS array.
   The HTML answer field can include <strong>, <a>, or any other
   inline HTML — including the price-table block (.faq-pricing).
   ════════════════════════════════════════════════════════════════ */

const FAQS = [
  {
    q: 'Do I need a reservation?',
    a: 'Reservations aren\'t required but are strongly recommended, especially on weekends. We have limited headsets per session — booking ahead guarantees your spot.',
  },
  {
    q: 'What is the minimum age to play?',
    a: 'All players must be <strong>12 years or older</strong>. Those under 12 will require a legal guardian to sign a waiver. The minimum height is <strong>4 feet</strong>. This experience is best suited for older kids, teens, and adults.',
  },
  {
    q: 'How much does it cost?',
    a: `All pricing is per person. Base pricing is not inclusive of taxes and fees.
        <div class="faq-pricing">
          <h4>Weekdays (Thurs. &amp; Fri.)</h4>
          <div class="faq-price-row"><span>3-Game Pack (~30 min)</span><span>$21.99</span></div>
          <div class="faq-price-row"><span>6-Game Pack (~60 min)</span><span>$39.99</span></div>
          <div class="faq-price-row"><span>VR Escape Room (60 min)</span><span>$39.99</span></div>
        </div>
        <div class="faq-pricing">
          <h4>Weekends (Sat. &amp; Sun.)</h4>
          <div class="faq-price-row"><span>3-Game Pack (~30 min)</span><span>$24.99</span></div>
          <div class="faq-price-row"><span>6-Game Pack (~60 min)</span><span>$44.99</span></div>
          <div class="faq-price-row"><span>VR Escape Room (60 min)</span><span>$44.99</span></div>
        </div>`,
  },
  {
    q: 'Can I wear glasses?',
    a: 'Yes — most frames fit comfortably inside the headset. You may find it more comfortable without them, but both work fine.',
  },
  {
    q: 'What about motion sickness?',
    a: 'Our <strong>free roam technology</strong> drastically reduces motion sickness by letting you physically walk through the virtual world. Since your body and brain are in sync, most people have no issues at all.',
  },
  {
    q: 'How many people can play together?',
    a: 'Each arena supports up to <strong>6 players</strong>. With three arenas, we can host up to 18 adventurers simultaneously. Groups larger than 6 can book two sessions at the same time slot.',
  },
  {
    q: 'Where do I park?',
    a: 'Free street parking is available. Limited side parking.',
  },
  {
    q: 'How early should I arrive?',
    a: 'Plan to arrive at least <strong>15 minutes before</strong> your session for check-in and waivers. Late arrivals may have their session shortened.',
  },
  {
    q: 'What is your refund policy?',
    a: 'No refunds within 24 hours of your session. We\'re happy to reschedule groups under 6 players with advance notice.',
  },
  {
    q: 'What if I arrive late?',
    a: 'If not on time for check-in, you may have to reschedule as to not interfere with other patrons\' time.',
  },
  {
    q: 'What should I wear?',
    a: 'Comfortable clothes and <strong>closed-toe shoes</strong>. No high heels on the arena floor.',
  },
  {
    q: 'Can I bring food and drinks?',
    a: 'Yes! You can bring in drinks, decorations, and food. We have a kitchenette available for your group.',
  },
  {
    q: 'Do you offer military or first responder discounts?',
    a: 'Yes — we proudly offer discounts for <strong>active military, veterans, and first responders</strong>. Just mention it at check-in with valid ID.',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('faqGrid');
  if (!grid) return;

  grid.innerHTML = FAQS.map(f => `
    <div class="faq-item">
      <button class="faq-q">
        ${f.q}
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a">
        <div class="faq-a-inner">${f.a}</div>
      </div>
    </div>
  `).join('');

  // Toggle the clicked item open/closed (event-delegated for efficiency)
  grid.addEventListener('click', e => {
    const q = e.target.closest('.faq-q');
    if (!q) return;
    q.closest('.faq-item').classList.toggle('open');
  });
});
