// LOADING SCREEN
const pageLoader = document.getElementById('page-loader');
if (pageLoader) {
  const finishLoading = () => {
    window.setTimeout(() => {
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');
    }, 650);
  };

  if (document.readyState === 'complete') {
    finishLoading();
  } else {
    window.addEventListener('load', finishLoading, { once: true });
  }
}


// INTERACTIVE 3D HERO TEXT
const heroTitle = document.getElementById('hero-title');
const heroTitleWrap = document.getElementById('hero-h1-wrap');
let textPointer = { x: 0, y: 0 };
let textTarget = { x: 0, y: 0 };
let textScrollDepth = 0;

if (heroTitle && heroTitleWrap) {
  const rawText = heroTitle.dataset.text || heroTitle.textContent;
  heroTitle.setAttribute('aria-label', rawText);
  heroTitle.innerHTML = rawText.split('').map((char, index) => {
    if (char === ' ') return '<span class="text-3d-char text-3d-space" aria-hidden="true">&nbsp;</span>';
    return `<span class="text-3d-char" aria-hidden="true" style="--i:${index}">${char}</span>`;
  }).join('');

  function setTextTarget(clientX, clientY) {
    const rect = heroTitleWrap.getBoundingClientRect();
    textTarget.x = ((clientX - rect.left) / rect.width - 0.5) * 2;
    textTarget.y = ((clientY - rect.top) / rect.height - 0.5) * 2;
  }

  window.addEventListener('mousemove', (event) => setTextTarget(event.clientX, event.clientY));
  
}

function updateHeroText3D() {
  if (!heroTitle || !heroTitleWrap) return;

  const heroRect = document.getElementById('hero').getBoundingClientRect();
  const scrollProgress = Math.max(0, Math.min(1, -heroRect.top / window.innerHeight));
  textScrollDepth = scrollProgress * 24;
  textPointer.x += (textTarget.x - textPointer.x) * 0.06;
  textPointer.y += (textTarget.y - textPointer.y) * 0.06;

  const rotateX = (-textPointer.y * 5.5) - (scrollProgress * 2.5);
  const rotateY = textPointer.x * 8;
  heroTitle.style.setProperty('--rotate-x', `${rotateX.toFixed(2)}deg`);
  heroTitle.style.setProperty('--rotate-y', `${rotateY.toFixed(2)}deg`);
  heroTitle.style.setProperty('--depth', `${textScrollDepth.toFixed(2)}px`);
  heroTitle.style.setProperty('--sheen-x', `${(50 + textPointer.x * 24).toFixed(2)}%`);

  heroTitle.querySelectorAll('.text-3d-char').forEach((char, index) => {
    const wave = Math.sin(index * 0.62 + scrollProgress * 3.5 + textPointer.x * 1.2);
    char.style.setProperty('--char-depth', (wave * 5 + Math.abs(textPointer.x) * 4).toFixed(2));
    char.style.setProperty('--char-lift', (Math.cos(index * 0.54 + scrollProgress * 3) * -2 * scrollProgress).toFixed(2));
    char.style.setProperty('--char-tilt', (textPointer.x * 3 + wave * 1.5).toFixed(2));
  });

  requestAnimationFrame(updateHeroText3D);
}
if (window.innerWidth > 700) {
  updateHeroText3D();
}
// MARQUEE
const gifs1 = [
  'hero-space-voyage-preview-eECLH3Yc','hero-codenest-preview-Cgppc2qV','hero-vex-ventures-preview-BczMFIiw',
  'hero-stellar-ai-v2-preview-DjvxjG3C','hero-asme-preview-B_nGDnTP','hero-transform-data-preview-Cx5OU29N',
  'hero-vitara-preview-Cjz2QYyU','hero-terra-preview-BFjrCr7T','hero-skyelite-preview-DHaZIgUv',
  'hero-aethera-preview-DknSlcTa','hero-designpro-preview-D8c5_een'
];
const gifs2 = [
  'hero-stellar-ai-preview-D3HL6bw1','hero-xportfolio-preview-D4A8maiC','hero-orbit-web3-preview-BXt4OttD',
  'hero-nexora-preview-cx5HmUgo','hero-evr-ventures-preview-DZxeVFEX','hero-planet-orbit-preview-DWAP8Z1P',
  'hero-new-era-preview-CocuDUm9','hero-wealth-preview-B70idl_u','hero-luminex-preview-CxOP7ce6',
  'hero-celestia-preview-0yO3jXO8'
];
function buildRow(el, names) {
const tripled =
  window.innerWidth < 700
    ? [...names, ...names]
    : [...names, ...names, ...names];
  tripled.forEach(n => {
    const d = document.createElement('div');
    d.className = 'marquee-tile';
    const img = document.createElement('img');
    img.src = `https://motionsites.ai/assets/${n}.gif`;
    img.loading = 'lazy';
    img.alt = n;
    d.appendChild(img);
    el.appendChild(d);
  });
}
buildRow(document.getElementById('row1'), gifs1);
buildRow(document.getElementById('row2'), gifs2);

const marqueeSection = document.getElementById('marquee');
let marqueeOffset = 0;

// ABOUT TEXT REVEAL
const aboutText =
"I am a builder at heart who enjoys transforming ideas into real-world solutions through AI/ML, Data Science, Data Analytics, and Full-Stack Development. I am passionate about developing intelligent systems, creating scalable applications, and extracting insights from data to solve meaningful problems. Driven by curiosity and a problem-solving mindset, I enjoy taking on complex challenges, thinking critically, and continuously learning new technologies. My goal is to create impactful products that combine innovation, technology, and exceptional user experiences.";

const aboutEl = document.getElementById('about-text');
aboutEl.innerHTML = '';

aboutText.split(' ').forEach(word => {
  const span = document.createElement('span');
  span.className = 'about-word';
  span.textContent = word + ' ';
  aboutEl.appendChild(span);
});

function revealAbout() {
  const rect = aboutEl.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const progress = Math.max(
    0,
    Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.8))
  );

  const words = aboutEl.querySelectorAll('.about-word');
  const visibleWords = Math.floor(progress * words.length);

  words.forEach((word, index) => {
    if (index <= visibleWords) {
      word.classList.add('visible');
    } else {
      word.classList.remove('visible');
    }
  });
}

// EXPERIENCE LIST
const el2 = document.getElementById('exp-list');
expData.forEach((e,i) => {
  const d = document.createElement('div');
  d.className = 'exp-item';
  d.style.transitionDelay = `${i * 0.1}s`;
  d.innerHTML = `<div class="exp-num">${e.num}</div><div class="exp-right"><div class="exp-name">${e.name}</div><div class="exp-role">${e.role}</div><div class="exp-period">${e.period}</div></div>`;
  el2.appendChild(d);
});
el2.classList.add('exp-track');
document.getElementById('experience').style.height = ((expData.length + 1) * 100) + 'vh';


function updateExperienceScroll() {
  const section = document.getElementById('experience');
  const items = document.querySelectorAll('.exp-item');
  if (!section || !items.length) return;

  const rect = section.getBoundingClientRect();
  const scrollable = Math.max(1, rect.height - window.innerHeight);
  const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
  const intro = 0.16;
  const itemProgress = Math.max(0, (progress - intro) / (1 - intro));
  const activeIndex = Math.min(items.length - 1, Math.floor(itemProgress * items.length));

  section.style.setProperty('--exp-progress', progress.toFixed(4));
  section.style.setProperty('--exp-active', activeIndex);

  items.forEach((item, index) => {
    item.classList.toggle('active', progress >= intro && index === activeIndex);
    item.classList.toggle('past', progress >= intro && index < activeIndex);
  });
}
// PROJECTS
const stack = document.getElementById('proj-stack');
function projectFallbackImage(name, cat, variant = 0) {
  const key = `${name} ${cat}`.toLowerCase();
  const palettes = [
    ['#07171a', '#00a8b6', '#d7e2ea'],
    ['#08111f', '#0054b0', '#d7e2ea'],
    ['#101214', '#7dd3fc', '#ffffff']
  ];
  const [bg, accent, text] = palettes[variant % palettes.length];

  const common = `
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${bg}"/>
        <stop offset="1" stop-color="#050505"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${accent}" stop-opacity=".95"/>
        <stop offset="1" stop-color="${text}" stop-opacity=".28"/>
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <rect width="900" height="560" fill="url(#bg)"/>
    <circle cx="760" cy="92" r="154" fill="${accent}" opacity=".13"/>
    <circle cx="126" cy="484" r="190" fill="${accent}" opacity=".11"/>
    <rect x="48" y="48" width="804" height="464" rx="34" fill="none" stroke="${text}" opacity=".13"/>
  `;

  let art = '';
  if (key.includes('event')) {
    art = `
      <rect x="150" y="122" width="600" height="316" rx="30" fill="#0b1114" stroke="${text}" opacity=".9"/>
      <rect x="150" y="122" width="600" height="78" rx="30" fill="url(#accent)" opacity=".55"/>
      <circle cx="250" cy="282" r="44" fill="${accent}" opacity=".75"/>
      <circle cx="450" cy="282" r="44" fill="${accent}" opacity=".45"/>
      <circle cx="650" cy="282" r="44" fill="${accent}" opacity=".75"/>
      <rect x="220" y="365" width="460" height="22" rx="11" fill="${text}" opacity=".22"/>
    `;
  } else if (key.includes('ev') || key.includes('charging')) {
    art = `
      <path d="M226 336 L278 230 H430 L484 336 Z" fill="#0d151a" stroke="${text}" opacity=".9"/>
      <circle cx="298" cy="352" r="34" fill="${accent}" opacity=".75"/>
      <circle cx="430" cy="352" r="34" fill="${accent}" opacity=".75"/>
      <rect x="568" y="150" width="92" height="250" rx="18" fill="#0d151a" stroke="${text}" opacity=".9"/>
      <path d="M612 210 L582 284 H622 L594 354" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>
      <path d="M660 238 C760 250 730 360 666 354" fill="none" stroke="${accent}" stroke-width="12" opacity=".65"/>
    `;
  } else if (key.includes('house')) {
    art = `
      <path d="M188 318 L450 134 L712 318" fill="none" stroke="${accent}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>
      <rect x="246" y="304" width="408" height="178" rx="20" fill="#0d151a" stroke="${text}" opacity=".9"/>
      <rect x="322" y="354" width="82" height="82" rx="10" fill="${accent}" opacity=".42"/>
      <rect x="496" y="354" width="82" height="128" rx="10" fill="${accent}" opacity=".3"/>
      <path d="M160 470 C300 398 522 538 744 420" fill="none" stroke="${accent}" stroke-width="10" opacity=".45"/>
    `;
  } else if (key.includes('parking')) {
    art = `
      <rect x="155" y="120" width="590" height="340" rx="26" fill="#0d151a" stroke="${text}" opacity=".9"/>
      <text x="246" y="346" fill="${accent}" font-family="Arial, sans-serif" font-size="210" font-weight="900">P</text>
      <path d="M430 156 V424 M568 156 V424" stroke="${text}" stroke-width="8" opacity=".18"/>
      <rect x="515" y="292" width="118" height="56" rx="18" fill="${accent}" opacity=".7"/>
      <circle cx="542" cy="356" r="15" fill="${text}" opacity=".75"/>
      <circle cx="606" cy="356" r="15" fill="${text}" opacity=".75"/>
    `;
  } else if (key.includes('robot') || key.includes('robo')) {
    art = `
      <rect x="310" y="132" width="280" height="160" rx="38" fill="#0d151a" stroke="${text}" opacity=".9"/>
      <circle cx="394" cy="210" r="22" fill="${accent}" filter="url(#glow)"/>
      <circle cx="506" cy="210" r="22" fill="${accent}" filter="url(#glow)"/>
      <path d="M330 306 L256 410 M420 306 L382 430 M480 306 L522 430 M570 306 L650 410" stroke="${accent}" stroke-width="18" stroke-linecap="round"/>
      <circle cx="256" cy="410" r="24" fill="${text}" opacity=".42"/>
      <circle cx="382" cy="430" r="24" fill="${text}" opacity=".42"/>
      <circle cx="522" cy="430" r="24" fill="${text}" opacity=".42"/>
      <circle cx="650" cy="410" r="24" fill="${text}" opacity=".42"/>
    `;
  } else if (key.includes('stream') || key.includes('server')) {
    art = `
      <rect x="170" y="132" width="230" height="296" rx="24" fill="#0d151a" stroke="${text}" opacity=".9"/>
      <rect x="500" y="132" width="230" height="296" rx="24" fill="#0d151a" stroke="${text}" opacity=".9"/>
      <path d="M400 220 C456 188 444 188 500 220 M400 280 C466 240 434 240 500 280 M400 340 C456 372 444 372 500 340" fill="none" stroke="${accent}" stroke-width="12" stroke-linecap="round" opacity=".78"/>
      <polygon points="250,230 250,330 338,280" fill="${accent}" filter="url(#glow)"/>
      <rect x="548" y="200" width="134" height="18" rx="9" fill="${accent}" opacity=".6"/>
      <rect x="548" y="254" width="134" height="18" rx="9" fill="${text}" opacity=".22"/>
      <rect x="548" y="308" width="134" height="18" rx="9" fill="${text}" opacity=".22"/>
    `;
  } else {
    art = `
      <path d="M184 366 C260 188 410 176 470 304 C536 446 668 352 724 196" fill="none" stroke="${accent}" stroke-width="20" stroke-linecap="round" filter="url(#glow)"/>
      <circle cx="184" cy="366" r="28" fill="${text}" opacity=".45"/>
      <circle cx="470" cy="304" r="28" fill="${text}" opacity=".45"/>
      <circle cx="724" cy="196" r="28" fill="${text}" opacity=".45"/>
    `;
  }

  const caption = cat.length > 30 ? cat.slice(0, 27) + '...' : cat;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="560" viewBox="0 0 900 560">
      ${common}
      ${art}
      <text x="64" y="500" fill="${text}" font-family="Arial, sans-serif" font-size="22" font-weight="700" opacity=".78">${caption}</text>
      <rect x="64" y="516" width="160" height="4" rx="2" fill="${accent}" opacity=".9"/>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
function projectImageSrc(project, variant = 0) {
  const name = project.name.toLowerCase();
  if (name.includes('ev dynamic pricing') || name.includes('video streaming')) {
    return projectFallbackImage(project.name, project.cat, variant);
  }
  return project.imgs[variant] || projectFallbackImage(project.name, project.cat, variant);
}
const projectMediaAssets = {
  EventSphere: {
    image: 'assets/eventsphere-1.png',
    video: 'assets/eventsphere-video.mp4',
    alt: 'EventSphere project dashboard'
  },
  'EV Dynamic Pricing': {
    image: 'assets/ev-dynamic-pricing.png',
    video: 'assets/ev-dynamic-pricing.mp4',
    alt: 'EV Dynamic Pricing project dashboard'
  },
  'House Price Prediction': {
    image: 'assets/house-price-prediction.png',
    video: 'assets/house-price-prediction.mp4',
    alt: 'House Price Prediction project dashboard'
  },
  'Dynamic Pricing Parking Lots': {
    image: 'assets/dynamic-pricing-parking-lots.png',
    video: 'assets/dynamic-pricing-parking-lots.mp4',
    alt: 'Dynamic Pricing Parking Lots project dashboard'
  },
  'RoboDog Quadruped Robot': {
    image: 'assets/robodog-quadruped-robot.png',
    video: 'assets/robodog-quadruped-robot.mp4',
    alt: 'RoboDog Quadruped Robot project dashboard'
  },
  'Video Streaming Web Server': {
    image: 'assets/video-streaming-web-server.png',
    video: 'assets/video-streaming-web-server.mp4',
    alt: 'Video Streaming Web Server project dashboard'
  }
};

function hasProjectMedia(p) {
  return Boolean(projectMediaAssets[p.name]);
}

function projectMediaMarkup(p) {
  const media = projectMediaAssets[p.name];

  if (media) {
    return `
      <div class="proj-card-imgs project-real-media">
        <div class="proj-col1 project-single-image">
          <img src="${media.image}" alt="${media.alt}">
        </div>
        <div class="proj-col2 project-video-panel">
          <video class="proj-video" autoplay muted loop playsinline preload="metadata" poster="${media.image}">
            <source src="${media.video}" type="video/mp4">
          </video>
        </div>
      </div>
    `;
  }

  return `
    <div class="proj-card-imgs">
      <div class="proj-col1">
        <img src="${projectImageSrc(p, 0)}" alt="${p.name}" onerror="this.onerror=null;this.src=projectFallbackImage(this.dataset.name,this.dataset.cat,0)" data-name="${p.name}" data-cat="${p.cat}">
        <img src="${projectImageSrc(p, 1)}" alt="${p.name}" onerror="this.onerror=null;this.src=projectFallbackImage(this.dataset.name,this.dataset.cat,1)" data-name="${p.name}" data-cat="${p.cat}">
      </div>
      <div class="proj-col2">
        <img src="${projectImageSrc(p, 2)}" alt="${p.name}" onerror="this.onerror=null;this.src=projectFallbackImage(this.dataset.name,this.dataset.cat,2)" data-name="${p.name}" data-cat="${p.cat}">
      </div>
    </div>
  `;
}
projects.forEach((p, i) => {
  const slot = document.createElement('div');
  slot.className = 'proj-slot';

  slot.innerHTML = `
    <div class="proj-card ${hasProjectMedia(p) ? 'media-project-card' : ''} ${p.name === 'EventSphere' ? 'eventsphere-card' : ''}" id="pc${i}">
      <div class="proj-card-top">
        <div class="proj-card-num">${p.id}</div>
        <div class="proj-card-meta">
          <div class="proj-card-cat">${p.cat}</div>
          <div class="proj-card-name">${p.name}</div>
        </div>
        <div class="proj-btns">
          ${p.live ? `<a href="${p.live}" target="_blank" class="live-btn">Live Project</a>` : ''}
          <a href="${p.repo}" target="_blank" class="live-btn">GitHub</a>
        </div>
      </div>

      <div class="proj-tech-row">
        ${p.tech.map(t => `<span class="proj-tech">${t}</span>`).join('')}
      </div>

      <p class="proj-card-desc">${p.desc}</p>

      ${projectMediaMarkup(p)}
    </div>
  `;

  stack.appendChild(slot);
});

function updateProjectScales() {
  const cards = document.querySelectorAll('.proj-card');
  const viewMiddle = window.innerHeight * 0.52;

  cards.forEach((card, index) => {
    const rect = card.parentElement.getBoundingClientRect();
    const distance = Math.abs((rect.top + rect.height / 2) - viewMiddle) / window.innerHeight;
    const active = distance < 0.62;

    card.style.zIndex = 1;
    card.style.opacity = '1';
    card.style.transform = 'translate3d(0, 0, 0) scale(1)';
    card.classList.toggle('is-stacked', false);
    card.classList.toggle('is-active', active);
  });
}

// PORTRAIT MAGNET (optional element, may not exist)
const portrait = document.getElementById('portrait');
const magnet = document.getElementById('portrait-magnet');
if (portrait && magnet) {
  window.addEventListener('mousemove', e => {
    const r = portrait.getBoundingClientRect();
    const cx = r.left + r.width/2, cy = r.top + r.height/2;
    const dx = e.clientX - cx, dy = e.clientY - cy;
    const dist = Math.sqrt(dx*dx+dy*dy);
    const radius = Math.max(r.width,r.height)/2 + 150;
    if (dist < radius) {
      magnet.style.transition = 'transform 0.3s ease-out';
      magnet.style.transform = `translate(${dx/3}px,${dy/3}px)`;
    } else {
      magnet.style.transition = 'transform 0.6s ease-in-out';
      magnet.style.transform = 'translate(0,0)';
    }
  });
}

// NAV SHOW/HIDE
const nav = document.getElementById('nav');
let lastScroll = 0;

function updateNav() {
  const currentScroll = window.pageYOffset;
  nav.classList.toggle('scrolled', currentScroll > 60);

  if (currentScroll > lastScroll && currentScroll > 100) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScroll = currentScroll;
}




// MARQUEE TRANSFORM
function updateMarquee() {
  const sectionTop = marqueeSection.offsetTop;

  const speed = window.innerWidth < 700 ? 0.12 : 0.3;

  marqueeOffset =
    (window.scrollY - sectionTop + window.innerHeight) * speed;

  document.getElementById('row1').style.transform =
    `translateX(${marqueeOffset - 200}px)`;

  document.getElementById('row2').style.transform =
    `translateX(${-(marqueeOffset - 200)}px)`;
}

// MASTER SCROLL UPDATE
function updateAll() {
  revealAbout();
  updateProjectScales();
  updateMarquee();
  updateNav();
  updateSkillDepth();
  updateExperienceScroll();
}

const sl = document.getElementById('skills-list');

skillsData.forEach((s,i) => {
  const d = document.createElement('div');

  d.className = 'skill-group skill-3d';
  d.style.transitionDelay = `${i * 0.1}s`;

  d.innerHTML = `
    <div class="skill-num">${s.num}</div>

    <div class="skill-right">
      <div class="skill-name">${s.name}</div>

      <div class="skill-tags">
        ${s.tags.map(t =>
          `<span class="skill-tag" style="--chip-z:${14 + (i % 4) * 4}px">${t}</span>`
        ).join('')}
      </div>
    </div>
  `;

  sl.appendChild(d);
});
function updateSkillDepth() {
  document.querySelectorAll('.skill-group').forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const distance = (center - window.innerHeight / 2) / window.innerHeight;
    const lift = Math.max(-1, Math.min(1, distance));
    card.style.setProperty('--rx', `${(-lift * 5).toFixed(2)}deg`);
    card.style.setProperty('--tz', `${(18 - Math.abs(lift) * 42).toFixed(2)}px`);
    card.style.transitionDelay = `${index * 0.06}s`;
  });
}

function setupSkillCards() {
  document.querySelectorAll('.skill-group').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      card.style.setProperty('--ry', ((x - 0.5) * 7).toFixed(2) + 'deg');
      card.style.setProperty('--rx', ((0.5 - y) * 5).toFixed(2) + 'deg');
      card.style.setProperty('--tz', '24px');
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
      card.style.setProperty('--ry', '0deg');
      updateSkillDepth();
    });
  });
}
setupSkillCards();

// FADE-IN OBSERVER
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }});
}, {threshold:0, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.fadein,.fadein-x-neg,.fadein-x-pos,.skill-3d').forEach(el => obs.observe(el));

window.addEventListener(
  'scroll',
  updateAll,
  { passive: true }
);

// INITIAL RUN
updateAll();

setTimeout(() => {
  document.querySelectorAll('.fadein,.fadein-x-neg,.fadein-x-pos,.skill-3d').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) el.classList.add('visible');
  });
}, 100);





