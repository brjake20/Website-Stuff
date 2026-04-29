/* ════════════════════════════════════════════════════════════════
   booking.js — Booking page games grid
   ════════════════════════════════════════════════════════════════
   GOOGLE SHEETS INTEGRATION
   ──────────────────────────────────────────────────────────────
   The games list can be powered by a Google Sheet so the owner
   can update games without touching the code.

   How to enable:
     1. Create a Google Sheet with these column headers in row 1:
          A: Name | B: Desc | C: Cat | D: Players |
          E: Difficulty | F: Badge | G: BadgeLabel | H: Image
     2. File → Share → Publish to web → choose Sheet1, format CSV.
     3. Copy the published .csv URL and paste it into SHEET_CSV_URL
        below.
     4. Add/edit/delete rows in the sheet — the site will pick up
        changes on next page load.

   COLUMN GUIDE
   ──────────────────────────────────────────────────────────────
     Name         Game title              e.g. "Dragon's Lair VR"
     Desc         Short description shown in the modal
     Cat          action | horror | adventure | multiplayer | escape
     Players      Player range            e.g. "1–4" or "2–6"
     Difficulty   1–5 (number only)
     Badge        hot | new | best | family | pick   (or blank)
     BadgeLabel   Text shown on the card  e.g. "🔥 Popular"
     Image        Image URL — see below   (optional)

   IMAGE COLUMN
   ──────────────────────────────────────────────────────────────
   The Image column accepts EITHER:
     • A Google Drive share link (recommended for the owner):
       https://drive.google.com/file/d/FILE_ID/view?usp=sharing
       The image must be in a folder shared as "Anyone with the
       link → Viewer" so the website can load it.
     • A direct image URL (https://example.com/image.jpg)

   Header column names are case-insensitive — "Name", "name",
   and "NAME" all work the same.

   If SHEET_CSV_URL is blank or fails to load, the FALLBACK list
   below is used.
   ════════════════════════════════════════════════════════════════ */

// ──── Paste your published Google Sheet CSV URL here ────
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRbMHdbnqjHKfakK1JovRq5vTPeNhXGcJt68zVVNymLKs_DcDtRLTQJVIST-Jumf4wBIYDdB--SUrk7/pub?gid=0&single=true&output=csv';
// Example: 'https://docs.google.com/spreadsheets/d/e/2PACX-xxxxx/pub?gid=0&single=true&output=csv'


// ──── Fallback game data (used when no sheet is connected) ────
const FALLBACK_GAMES = [
  { name: "Dragon's Lair VR",  desc: 'Face the ancient beast in its volcanic home. Navigate through scorching caverns, dodge fire breath, and confront the dragon in an epic finale.', cat: 'adventure',   players: '1–4', diff: 3, badge: 'best',   badgeLabel: '⭐ Best Seller',          img: '' },
  { name: "Raven's Curse",     desc: 'Break the dark spell before midnight strikes. Solve cryptic puzzles, brew potions, and unravel sinister surprises.',                            cat: 'escape',      players: '2–6', diff: 4, badge: 'best',   badgeLabel: '⭐ Best Seller',          img: '' },
  { name: 'Zombie Outbreak',   desc: 'Survive the horde. Every bullet counts. Board up windows, scavenge ammo, and make it through the night.',                                       cat: 'horror',      players: '1–4', diff: 3, badge: 'hot',    badgeLabel: '🔥 Popular',              img: '' },
  { name: 'Cyber Arena',       desc: 'Fast-paced PvP in a neon-drenched future. Hack, slash, and blast your way through cyberpunk battle arenas.',                                    cat: 'action',      players: '2–8', diff: 2, badge: 'hot',    badgeLabel: '🔥 Popular',              img: '' },
  { name: 'Lost in Avalon',    desc: 'Solve ancient Arthurian mysteries in a mist-covered realm. Puzzles and lore await around every corner.',                                        cat: 'adventure',   players: '1–4', diff: 2, badge: 'family', badgeLabel: '👨‍👩‍👧 Family Friendly',       img: '' },
  { name: 'The Haunting',      desc: 'A psychological horror escape room. Every shadow hides a secret. Not for the faint of heart.',                                                  cat: 'horror',      players: '2–6', diff: 5, badge: 'pick',   badgeLabel: '🏆 Staff Pick',           img: '' },
  { name: 'Space Siege',       desc: 'Defend your space station from wave after wave of alien invasion.',                                                                              cat: 'action',      players: '1–4', diff: 3, badge: 'new',    badgeLabel: '✦ New',                   img: '' },
  { name: 'Dungeon Crawler',   desc: 'Classic RPG dungeon delving in full VR immersion. Loot, fight, level up, repeat.',                                                              cat: 'adventure',   players: '1–4', diff: 2, badge: 'family', badgeLabel: '👨‍👩‍👧 Family Friendly',       img: '' },
  { name: 'Ghost Protocol',    desc: 'Infiltrate a haunted government facility. Stealth, puzzles, and paranormal encounters.',                                                        cat: 'horror',      players: '2–4', diff: 4, badge: '',       badgeLabel: '',                        img: '' },
  { name: 'Battle Royale VR',  desc: 'Last team standing wins the arena. Intense multiplayer combat with shrinking zones.',                                                           cat: 'multiplayer', players: '4–6', diff: 3, badge: 'hot',    badgeLabel: '🔥 Popular',              img: '' },
  { name: 'Temple of Storms',  desc: 'Navigate ancient traps, solve elemental puzzles, and escape before the temple floods.',                                                         cat: 'escape',      players: '2–6', diff: 3, badge: '',       badgeLabel: '',                        img: '' },
  { name: 'Neon Blade',        desc: 'Slice through waves of enemies in a cyberpunk dojo. Rhythm meets combat.',                                                                       cat: 'action',      players: '1–2', diff: 2, badge: 'pick',   badgeLabel: '🏆 Staff Pick',           img: '' },
  { name: 'Frozen Kingdom',    desc: 'Unthaw a cursed realm before dawn. Ice puzzles, frozen enemies, and a ticking clock.',                                                          cat: 'escape',      players: '2–5', diff: 4, badge: 'new',    badgeLabel: '✦ New',                   img: '' },
  { name: 'Deep Abyss',        desc: "Horror survival beneath the ocean floor. Darkness, pressure, and things that shouldn't exist.",                                                 cat: 'horror',      players: '1–4', diff: 5, badge: '',       badgeLabel: '',                        img: '' },
  { name: 'Sky Pirates',       desc: 'Airship battles across the clouds. Man the cannons, steer through storms.',                                                                     cat: 'action',      players: '2–6', diff: 2, badge: 'family', badgeLabel: '👨‍👩‍👧 Family Friendly',       img: '' },
  { name: 'Cursed Carnival',   desc: "Escape the nightmare funhouse at midnight. Twisted games and a ringmaster who won't let you leave.",                                            cat: 'horror',      players: '2–6', diff: 4, badge: '',       badgeLabel: '',                        img: '' },
  { name: 'Gladiator Arena',   desc: 'Crowd-cheered combat in ancient Rome. Fight your way to glory.',                                                                                cat: 'multiplayer', players: '2–6', diff: 3, badge: '',       badgeLabel: '',                        img: '' },
  { name: 'Elven Forest',      desc: 'A peaceful puzzle adventure through enchanted woods. Beautiful and surprisingly deep.',                                                         cat: 'adventure',   players: '1–4', diff: 1, badge: 'family', badgeLabel: '👨‍👩‍👧 Family Friendly',       img: '' },
  { name: 'Quantum Escape',    desc: 'Physics-based puzzles across dimensions. Bend gravity, manipulate time.',                                                                       cat: 'escape',      players: '2–4', diff: 5, badge: 'new',    badgeLabel: '✦ New',                   img: '' },
  { name: 'Dino Rampage',      desc: 'Survive a park overrun by dinosaurs. Run, hide, and fight to the extraction point.',                                                            cat: 'action',      players: '1–4', diff: 3, badge: 'family', badgeLabel: '👨‍👩‍👧 Family Friendly',       img: '' },
  { name: 'Raven Tower',       desc: 'Ascend the infinite tower, floor by floor. Each level is a new challenge.',                                                                     cat: 'adventure',   players: '1–2', diff: 3, badge: '',       badgeLabel: '',                        img: '' },
  { name: 'Shadow Realm',      desc: 'A stealth mission through a haunted manor. Stay silent, stay hidden, stay alive.',                                                              cat: 'horror',      players: '1–4', diff: 4, badge: '',       badgeLabel: '',                        img: '' },
  { name: 'Titan Clash',       desc: 'Giant robot battles in city-scale arenas. Pilot your mech, crush the opposition.',                                                              cat: 'multiplayer', players: '2–6', diff: 2, badge: 'hot',    badgeLabel: '🔥 Popular',              img: '' },
  { name: 'Arctic Station',    desc: 'Survive an abandoned research station at -40°. Something went wrong here.',                                                                     cat: 'horror',      players: '2–4', diff: 4, badge: '',       badgeLabel: '',                        img: '' },
  { name: 'Kingdom Rush VR',   desc: 'Tower defense meets first-person fantasy.',                                                                                                      cat: 'action',      players: '1–4', diff: 2, badge: '',       badgeLabel: '',                        img: '' },
  { name: "The Oracle's Vault",desc: 'Decode ancient prophecies to unlock the final chamber. The hardest escape.',                                                                    cat: 'escape',      players: '2–6', diff: 5, badge: 'new',    badgeLabel: '✦ New',                   img: '' },
  { name: 'Star Blazers',      desc: 'Dogfight across nebulae and asteroid fields. Space combat at its finest.',                                                                      cat: 'action',      players: '1–4', diff: 3, badge: '',       badgeLabel: '',                        img: '' },
  { name: "Witch's Cauldron",  desc: 'Brew potions and cast spells to break a centuries-old curse.',                                                                                  cat: 'escape',      players: '2–4', diff: 3, badge: '',       badgeLabel: '',                        img: '' },
  { name: 'Dragon Riders',     desc: 'Mount and fly your own dragon across magical realms. Soar, battle, explore.',                                                                   cat: 'adventure',   players: '1–4', diff: 1, badge: 'hot',    badgeLabel: '🔥 Popular',              img: '' },
  { name: 'The Last Bastion',  desc: 'Defend the final fortress against the undead horde. Survive the night.',                                                                        cat: 'multiplayer', players: '4–6', diff: 4, badge: '',       badgeLabel: '',                        img: '' },
];


// ──── Module state ────
const PER_PAGE = 12;
let games  = FALLBACK_GAMES;
let page   = 1;
let filter = 'all';


/* ─── Convert a Google Drive share link into a direct image URL ───
   Drive share links look like:
     https://drive.google.com/file/d/FILE_ID/view?usp=sharing
     https://drive.google.com/open?id=FILE_ID
   These can't be used directly as <img src> — they're page URLs.
   The /thumbnail endpoint serves the actual image bytes, so we
   rewrite Drive links to that.

   Non-Drive URLs (Imgur, direct .jpg/.png links, etc.) pass
   through unchanged.
*/
function resolveImageUrl(url) {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed.includes('drive.google.com')) return trimmed;

  // Try to pull the file ID out of either share-link format
  const match =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  if (!match) return trimmed; // unknown Drive format — leave it alone
  return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
}


/* ─── CSV parser — handles commas inside quoted fields ─── */
function parseCSV(csv) {
  const lines = csv.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];

  // Lowercase + strip non-letters from headers so "Name", "name",
  // "NAME", and "First Name" all normalize predictably.
  const headers = lines[0]
    .split(',')
    .map(h => h.trim().toLowerCase().replace(/[^a-z]/g, ''));

  return lines.slice(1).map(line => {
    const vals = [];
    let cur = '';
    let inQuotes = false;

    for (const ch of line) {
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        vals.push(cur.trim());
        cur = '';
      } else {
        cur += ch;
      }
    }
    vals.push(cur.trim());

    const raw = {};
    headers.forEach((h, i) => { raw[h] = vals[i] || ''; });

    // Map sheet column names → internal property names.
    // Sheet uses friendlier names like "Difficulty" and "Image",
    // but the rest of the code uses "diff" and "img".
    return {
      name:       raw.name       || '',
      desc:       raw.desc       || raw.description || '',
      cat:        raw.cat        || raw.category    || '',
      players:    raw.players    || '',
      diff:       parseInt(raw.difficulty || raw.diff) || 2,
      badge:      raw.badge      || '',
      badgeLabel: raw.badgelabel || '',
      img:        resolveImageUrl(raw.image || raw.img),
    };
  }).filter(g => g.name);
}


/* ─── Fetch games from Google Sheets if a URL is configured ─── */
async function loadFromSheet() {
  if (!SHEET_CSV_URL) return;
  const grid = document.getElementById('gamesGrid');

  try {
    grid.innerHTML = '<div class="games-loading">Loading games...</div>';
    const res = await fetch(SHEET_CSV_URL);
    if (!res.ok) throw new Error('Fetch failed');
    const parsed = parseCSV(await res.text());
    if (parsed.length > 0) {
      games = parsed;
      page = 1;
      renderGames();
    }
  } catch (err) {
    console.warn('Google Sheet load failed, using fallback data:', err);
    renderGames();
  }
}


/* ─── Filter + paginate the visible game list ─── */
function visibleGames() {
  return filter === 'all' ? games : games.filter(g => g.cat === filter);
}


function renderGames() {
  const list  = visibleGames();
  const total = Math.max(1, Math.ceil(list.length / PER_PAGE));
  if (page > total) page = total;

  document.getElementById('pageInfo').textContent = `Page ${page} of ${total}`;

  const slice = list.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  document.getElementById('gamesGrid').innerHTML = slice.map((g, i) => {
    const idx = games.indexOf(g);
    // Fallback gracefully: if the image fails to load, hide it so the
    // letter underneath shows through. This protects against broken
    // Drive links, deleted images, etc.
    const imgTag = g.img
      ? `<img src="${g.img}" alt="${g.name}" onerror="this.style.display='none'">`
      : '';
    const letterClass = g.img
      ? 'gcard-letter gcard-letter--over-img'
      : 'gcard-letter';
    const badgeTag = g.badge
      ? `<span class="gbadge ${g.badge}">${g.badgeLabel || g.badge}</span>`
      : '';

    return `
      <div class="gcard" data-idx="${idx}" style="animation:fadeUp .5s ${i * 0.04}s both">
        <div class="gcard-thumb">
          ${imgTag}
          <div class="${letterClass}">${g.name[0]}</div>
          ${badgeTag}
        </div>
        <div class="gcard-info">
          <div class="gcard-name">${g.name}</div>
          <div class="gcard-meta">
            <span class="gcard-pl">👥 ${g.players}</span>
            <span class="gcard-cat">${g.cat}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}


/* ─── Modal: open with the clicked game's details ─── */
function openModal(game) {
  document.getElementById('gmodalLetter').textContent  = game.name[0];
  document.getElementById('gmodalName').textContent    = game.name;
  document.getElementById('gmodalCat').textContent     = (game.cat || '').toUpperCase();
  document.getElementById('gmodalDesc').textContent    = game.desc;
  document.getElementById('gmodalPlayers').textContent = game.players;
  document.getElementById('gmodalDiff').textContent    = '⭐'.repeat(game.diff);
  document.getElementById('gmodalGenre').textContent   =
    (game.cat || '').charAt(0).toUpperCase() + (game.cat || '').slice(1);

  // Show the game image as the modal cover. If there's no image (or
  // it fails to load), fall back to the stylized letter — same logic
  // as the cards, just for the bigger modal cover.
  const cover  = document.getElementById('gmodalCover');
  const letter = document.getElementById('gmodalLetter');
  const oldImg = cover.querySelector('img');
  if (oldImg) oldImg.remove();

  if (game.img) {
    const img = document.createElement('img');
    img.src    = game.img;
    img.alt    = game.name;
    img.className = 'gmodal-img';
    img.onerror = () => { img.remove(); letter.style.display = ''; };
    // Insert image as the first child so the letter + close button
    // sit on top of it.
    cover.insertBefore(img, cover.firstChild);
    letter.style.display = 'none';
  } else {
    letter.style.display = '';
  }

  document.getElementById('gmodalBg').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('gmodalBg').classList.remove('open');
  document.body.style.overflow = '';
}


/* ─── Wire up all event listeners ─── */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('gamesGrid');
  if (!grid) return;

  // Click a card → open the modal
  grid.addEventListener('click', e => {
    const card = e.target.closest('.gcard');
    if (!card) return;
    const game = games[parseInt(card.dataset.idx)];
    if (game) openModal(game);
  });

  // Modal dismiss controls
  document.getElementById('gmodalClose').addEventListener('click', closeModal);
  document.getElementById('gmodalBg').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Filter pill click → re-render
  document.getElementById('filterBar').addEventListener('click', e => {
    if (!e.target.classList.contains('fpill')) return;
    document.querySelectorAll('.fpill').forEach(b => b.classList.remove('on'));
    e.target.classList.add('on');
    filter = e.target.dataset.f;
    page = 1;
    renderGames();
  });

  // Pagination buttons
  document.getElementById('prevBtn').addEventListener('click', () => {
    if (page > 1) { page--; renderGames(); }
  });
  document.getElementById('nextBtn').addEventListener('click', () => {
    if (page < Math.ceil(visibleGames().length / PER_PAGE)) { page++; renderGames(); }
  });

  // Initial render — show fallback data, then try to overwrite from sheet
  renderGames();
  loadFromSheet();
});
