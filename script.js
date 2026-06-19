// ===========================
// FLOATING PETALS / HEARTS
// ===========================
const floaterEmojis = ['🌸','💗','✨','🌷','💕'];
const floaterContainer = document.getElementById('floaters');

function spawnFloater(){
  const el = document.createElement('span');
  el.className = 'floater-item';
  el.textContent = floaterEmojis[Math.floor(Math.random() * floaterEmojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  const duration = 8 + Math.random() * 10;
  el.style.animationDuration = duration + 's';
  el.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
  floaterContainer.appendChild(el);
  setTimeout(() => el.remove(), duration * 1000);
}

for(let i = 0; i < 8; i++){
  setTimeout(() => spawnFloater(), i * 900);
}
setInterval(spawnFloater, 1400);

// ===========================
// CURSOR SPARKLE TRAIL
// ===========================
const sparkleLayer = document.getElementById('sparkleLayer');
let lastSparkle = 0;

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if(now - lastSparkle < 60) return;
  lastSparkle = now;

  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = e.clientX + 'px';
  sparkle.style.top = e.clientY + 'px';
  sparkleLayer.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
});

// ===========================
// SCROLL REVEAL
// ===========================
const revealEls = document.querySelectorAll('.reveal-on-scroll');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ===========================
// QUOTE CAROUSEL
// ===========================
const track = document.getElementById('quoteTrack');
const cards = document.querySelectorAll('.quote-card');
const dotsContainer = document.getElementById('dots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const totalCards = cards.length;

// build dots
for(let i = 0; i < totalCards; i++){
  const dot = document.createElement('span');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll('.dot');

function updateCarousel(){
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
}

function goToSlide(i){
  currentIndex = i;
  updateCarousel();
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalCards) % totalCards;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalCards;
  updateCarousel();
});

// autoplay
let autoplay = setInterval(() => {
  currentIndex = (currentIndex + 1) % totalCards;
  updateCarousel();
}, 5000);

// pause autoplay on interaction
[prevBtn, nextBtn, ...dots].forEach(el => {
  el.addEventListener('click', () => {
    clearInterval(autoplay);
    autoplay = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalCards;
      updateCarousel();
    }, 5000);
  });
});

// ===========================
// NAVBAR SHADOW ON SCROLL
// ===========================
const nav = document.querySelector('.custom-nav');
window.addEventListener('scroll', () => {
  if(window.scrollY > 40){
    nav.style.boxShadow = '0 6px 30px rgba(214,51,108,0.15)';
  } else {
    nav.style.boxShadow = '0 4px 30px rgba(214,51,108,0.08)';
  }
});
