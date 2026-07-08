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
const aboutText = `I am a builder at heart who loves turning ambitious ideas into impactful digital products. My work spans AI/ML, Data Science, Data Analytics, and Full-Stack Development, where I combine data-driven thinking with engineering expertise to create intelligent, scalable, and user-centric solutions.

Whether it's training machine learning models, designing data-driven systems, or building end-to-end applications, I enjoy solving challenging problems and transforming complexity into simplicity. I am driven by curiosity, continuous learning, and the belief that technology should create tangible value for people and businesses.

My mission is to build innovative products that not only leverage cutting-edge technology but also deliver exceptional user experiences and meaningful real-world impact.`;

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
stack.style.setProperty('--project-count', projects.length);

const projectPin = document.createElement('div');
projectPin.className = 'proj-pin';
stack.appendChild(projectPin);

projects.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'proj-card';
  card.id = `pc${i}`;
  card.style.setProperty('--stack-index', i);
  card.style.zIndex = i + 1;

  card.innerHTML = `
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

     

     <div class="proj-body">

    <div class="proj-left">

    <p class="proj-card-desc">
        ${p.desc}
    </p>

    <div class="proj-features">

        <div class="feature-title">
            Key Features
        </div>

        ${p.features.map(feature => `
            <div class="feature-item">
                ✓ ${feature}
            </div>
        `).join('')}

    </div>

    <div class="proj-tech-row">

        ${p.tech.map(tech => `
            <span class="proj-tech">
                ${tech}
            </span>
        `).join('')}

    </div>

</div>

    <div class="proj-right">

        <div class="project-terminal">

            <div class="terminal-header">

                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>

                <span class="terminal-title">
                    ${p.name}
                </span>

            </div>

            <pre class="terminal-output"></pre>

        </div>

    </div>

</div>
  `;

  projectPin.appendChild(card);

  typeTerminal(
    card.querySelector(".terminal-output"),
    p.terminal
);
});

async function typeTerminal(el, lines){

    while(true){

        el.textContent="";

        for(const line of lines){

            for(const ch of line){

                el.textContent+=ch;

                await new Promise(r=>setTimeout(r,25));

            }

            el.textContent += "\n";

el.scrollTop = el.scrollHeight;

            await new Promise(r=>setTimeout(r,180));

        }

        await new Promise(r=>setTimeout(r,1800));

    }

}

function updateProjectScales() {
  const cards = document.querySelectorAll('.proj-card');
  if (!stack || !cards.length) return;

  const rect = stack.getBoundingClientRect();
  const pin = stack.querySelector('.proj-pin');
  const isBefore = rect.top > 0;
  const isAfter = rect.bottom <= window.innerHeight;
  const maxProgress = Math.max(0, cards.length - 1);
  const progress = Math.max(
    0,
    Math.min(maxProgress, -rect.top / window.innerHeight)
  );

  pin.classList.toggle('is-fixed', !isBefore && !isAfter);
  pin.classList.toggle('is-bottom', isAfter);

  cards.forEach((card, index) => {
    const distance = index - progress;
    const translateY = distance > 0 ? distance * window.innerHeight : 0;
    const isStacked = progress >= index;
    const isActive = Math.round(progress) === index;

    card.classList.toggle('is-stacked', isStacked);
    card.classList.toggle('is-active', isActive);
    card.style.transform = `translateY(${translateY}px)`;
    card.style.zIndex = index + 1;
  });
}

function animateProjectStack() {
  updateProjectScales();
  requestAnimationFrame(animateProjectStack);
}
animateProjectStack();

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
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      if (e.target.classList.contains('skill-group')) {
        e.target.classList.add('skill-revealed');
      }
      obs.unobserve(e.target);
    }
  });
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
    if (r.top < window.innerHeight) {
      el.classList.add('visible');
      if (el.classList.contains('skill-group')) {
        el.classList.add('skill-revealed');
      }
    }
  });
}, 100);

if(window.innerWidth < 700){

  const mobileProjects = [
    {
      title:'EventSphere',
      image:'assets/eventsphere-1.png'
    },
    {
      title:'EV Dynamic Pricing',
      image:'assets/ev-dynamic-pricing.png'
    },
    {
      title:'House Price Prediction',
      image:'assets/house-price-prediction.png'
    },
    {
      title:'RoboDog Quadruped Robot',
      image:'assets/robodog-quadruped-robot.png'
    }
  ];

  const mobileImg =
    document.getElementById('mobileProjectImage');

  const mobileTitle =
    document.getElementById('mobileProjectTitle');

  let current = 0;

  setInterval(() => {

    current =
      (current + 1) % mobileProjects.length;

    mobileImg.style.opacity = 0;

    setTimeout(() => {

      mobileImg.src =
        mobileProjects[current].image;

      mobileTitle.textContent =
        mobileProjects[current].title;

      mobileImg.style.opacity = 1;

    },300);

  },3000);

}

/* =========================
   Mobile Navbar Hide
========================= */

if (window.innerWidth <= 768) {

    const nav = document.getElementById("nav");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 20) {

            nav.classList.add("nav-hidden");

        } else {

            nav.classList.remove("nav-hidden");

        }

    });

}