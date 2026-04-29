/* ════════════════════════════════════════════════════════════════
   home.js — Home page Top 5 carousel
   ════════════════════════════════════════════════════════════════
   To change the featured games, edit the TOP_5 array below.
   Each entry needs: name, cat ('arena' or 'escape room'), rank.
   ════════════════════════════════════════════════════════════════ */

const TOP_5 = [
  { name: "Dragon's Lair VR", cat: 'arena',       rank: 1 },
  { name: 'Battle Royale VR', cat: 'arena',       rank: 2 },
  { name: "Raven's Curse",    cat: 'escape room', rank: 3 },
  { name: 'Cyber Arena',      cat: 'arena',       rank: 4 },
  { name: 'The Haunting',     cat: 'escape room', rank: 5 },
];

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('featTrack');
  if (!track) return;

  // Render the cards
  track.innerHTML = TOP_5.map(g => `
    <a href="booking.html" class="feat-card">
      <div class="feat-cover">
        <div class="feat-cover-inner">
          <span class="feat-letter">${g.name[0]}</span>
        </div>
        <span class="feat-rank">#${g.rank}</span>
        <span class="feat-cat">${g.cat}</span>
      </div>
      <div class="feat-info">
        <div class="feat-name">${g.name}</div>
      </div>
    </a>
  `).join('');

  // Wire up the prev / next arrows to scroll one card at a time
  const scrollByCard = direction => {
    const card = track.querySelector('.feat-card');
    if (!card) return;
    const offset = card.offsetWidth + 12; // card width + gap
    track.scrollBy({ left: direction * offset, behavior: 'smooth' });
  };

  document.getElementById('featPrev')?.addEventListener('click', () => scrollByCard(-1));
  document.getElementById('featNext')?.addEventListener('click', () => scrollByCard(1));
});
