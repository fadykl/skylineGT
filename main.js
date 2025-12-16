
// Premium Home LB — Main JavaScript (Furniture Edition)

// ------------------------------
// QUIZ: Find Your Perfect Piece
// ------------------------------
const quizData = [
  {
    question: "Where will you use this piece?",
    options: ["🏠 Indoor living space", "🌤️ Outdoor terrace or garden", "🍷 Entertainment / bar area"]
  },
  {
    question: "What’s the main purpose?",
    options: ["🛋️ Relax / Lounge", "🍸 Bar / Serving Area", "🌿 Decorative / Accent", "🍽️ Dining / Gathering"]
  },
  {
    question: "Which style fits your space?",
    options: ["✨ Rustic & Natural", "🖤 Modern & Elegant", "☀️ Outdoor Chic", "🍷 Barrel Heritage Theme"]
  },
  {
    question: "What matters most?",
    options: ["💎 Aesthetic design", "🪵 Function + Storage", "🌿 Natural wood look", "🌞 Outdoor durability"]
  }
];

// Products (update images/links/prices as needed)
const PRODUCTS = {
  "barrel_bar_cabinet": {
    name: "Barrel Bar Cabinet",
    description: "Authentic barrel bar cabinet with storage and glass rack.",
    price: "",
    image: "resources/Barrel Bar Cabinet.png",
    link: "products.html"
  },
  "indoor_setup": {
    name: "Indoor barrel + chair setup",
    description: "Cozy indoor set with barrel table and matching chair.",
    price: "",
    image: "resources/Indoor barrel + chair setup.png",
    link: "products.html"
  },
  "barrel_cabinet": {
    name: "Barrel cabinet",
    description: "Multi-shelf barrel cabinet for bottles and decor.",
    price: "",
    image: "resources/Barrel storage.png",
    link: "products.html"
  },
  "pool_bed_round_sofa": {
    name: "Pool bed round sofa",
    description: "Round outdoor lounge sofa — perfect for poolside.",
    price: "",
    image: "resources/Pool bed round sofa.png",
    link: "products.html"
  },
  "outdoor_tables": {
    name: "Outdoor barrel tables",
    description: "Durable outdoor tables with barrel bases.",
    price: "",
    image: "resources/Outdoorbar tables.png",
    link: "products.html"
  },
  "half_barrel_corks": {
    name: "Half-barrel table with corks",
    description: "Statement accent table filled with corks.",
    price: "",
    image: "resources/Half-barrel table with corks.png",
    link: "products.html"
  },
  "barrel_planter": {
    name: "Barrel planter",
    description: "Rustic planter from a reclaimed barrel.",
    price: "",
    image: "resources/Barrel planter.png",
    link: "products.html"
  },
  "wooden_planter": {
    name: "Wooden planter",
    description: "Handmade wooden planter with insert.",
    price: "",
    image: "resources/Wooden planter.png",
    link: "products.html"
  },
  "barrel_leather_chair": {
    name: "Barrel leather chair",
    description: "Elegant leather seating crafted from an oak barrel.",
    price: "",
    image: "resources/Barrel leather chair.png",
    link: "products.html"
  }
};

let currentQuestion = 0;
let quizAnswers = [];

function startQuiz() {
  currentQuestion = 0;
  quizAnswers = [];
  showQuestion();
}

// expose to global for inline/on-demand usage
window.startQuiz = startQuiz;
// also back-compat name
window.PremiumHomeStartQuiz = startQuiz;


function showQuestion() {
  const quizContainer = document.getElementById('quiz-container');
  if (!quizContainer) return;

  const question = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  quizContainer.innerHTML = `
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div class="mb-6">
        <div class="bg-gray-200 rounded-full h-2 mb-4">
          <div class="bg-amber-700 h-2 rounded-full transition-all duration-500" style="width:${progress}%"></div>
        </div>
        <p class="text-sm text-gray-600">Question ${currentQuestion + 1} of ${quizData.length}</p>
      </div>
      <h3 class="text-2xl font-bold text-neutral-800 mb-6">${question.question}</h3>
      <div class="space-y-3">
        ${question.options.map((option, index) => `
          <button onclick="selectAnswer(${index})"
            class="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-amber-700 hover:bg-amber-50 transition-all duration-300">
            ${option}
          </button>`).join('')}
      </div>
    </div>`;
}

function selectAnswer(answerIndex) {
  quizAnswers.push(answerIndex);
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    setTimeout(showQuestion, 220);
  } else {
    showQuizResults();
  }
}

function showQuizResults() {
  const ids = getRecommendations(quizAnswers);
  const quizContainer = document.getElementById('quiz-container');
  const cards = ids.map(id => {
    const p = PRODUCTS[id];
    return `
      <div class="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
        <img src="${p.image}" alt="${p.name}" class="w-full h-48 object-cover rounded-lg mb-4">
        <h4 class="text-xl font-bold text-neutral-800 mb-1">${p.name}</h4>
        <p class="text-gray-600 mb-3">${p.description}</p>
        <div class="flex items-center justify-between">
          <span class="text-amber-700 font-bold">${p.price || ""}</span>
          <a href="${p.link}" class="text-sm bg-amber-700 text-white py-2 px-3 rounded hover:bg-amber-800">View</a>
        </div>
      </div>`;
  }).join('');

  quizContainer.innerHTML = `
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h3 class="text-3xl font-bold text-neutral-800 mb-6 text-center">Your Perfect Matches</h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${cards}
      </div>
      <div class="text-center mt-6">
        <button onclick="startQuiz()" class="bg-amber-700 text-white py-3 px-6 rounded-lg hover:bg-amber-800 transition-colors duration-300">
          Take Quiz Again
        </button>
      </div>
    </div>`;
}

// Answers -> product keys
function getRecommendations(answers) {
  const [place, purpose, style, priority] = answers;

  const byPlace = [
    ["barrel_leather_chair","indoor_setup","barrel_cabinet"],
    ["outdoor_tables","pool_bed_round_sofa","barrel_planter"],
    ["barrel_bar_cabinet","half_barrel_corks","indoor_setup"]
  ][place] || [];

  const byPurpose = [
    ["pool_bed_round_sofa","barrel_leather_chair"],
    ["barrel_bar_cabinet","indoor_setup"],
    ["half_barrel_corks","barrel_planter","wooden_planter"],
    ["outdoor_tables","indoor_setup"]
  ][purpose] || [];

  const byStyle = [
    ["barrel_planter","wooden_planter","barrel_cabinet"],
    ["barrel_leather_chair","pool_bed_round_sofa"],
    ["outdoor_tables","half_barrel_corks"],
    ["barrel_bar_cabinet","indoor_setup"]
  ][style] || [];

  const byPriority = [
    ["barrel_leather_chair","half_barrel_corks"],
    ["barrel_bar_cabinet","barrel_cabinet"],
    ["barrel_planter","wooden_planter"],
    ["outdoor_tables","pool_bed_round_sofa"]
  ][priority] || [];

  const score = {};
  [byPlace, byPurpose, byStyle, byPriority].forEach(list => list.forEach(id => {
    score[id] = (score[id] || 0) + 1;
  }));

  return Object.keys(score).sort((a,b) => score[b]-score[a]).slice(0,3);
}

// ------------------------------
// Animations + Hero Typing
// ------------------------------
function initializeAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate-fade-in'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function initHeroTyping() {
  if (typeof Typed === "undefined") return;
  if (!document.getElementById('hero-text')) return;
  new Typed('#hero-text', {
    strings: ['Skyline General Trading', 'Acoustical ceilings', 'Partitions','Access doors','Decorative cladding'],
    typeSpeed: 50, backSpeed: 28, backDelay: 1800, loop: true
  });
}

// ------------------------------
// Init
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Wire Start button (no inline onclick required)
  const startBtn = document.getElementById('start-quiz-btn');
  if (startBtn) startBtn.addEventListener('click', startQuiz);

  initializeAnimations();
  initHeroTyping();
  if (document.getElementById('quiz-container')) {
      // if there's a start button, wire it; otherwise, auto-start
      const startBtn = document.getElementById('start-quiz-btn');
      if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
      } else {
        startQuiz();
      }
    }
});

// ------------------------------
// Minimal CSS for fade-in
// ------------------------------
const style = document.createElement('style');
style.textContent = `
  .animate-fade-in { animation: fadeIn .8s ease-out forwards; }
  @keyframes fadeIn {
    from { opacity:0; transform: translateY(18px); }
    to { opacity:1; transform: translateY(0); }
  }
  .fade-in { opacity:0; transform: translateY(18px); }
`;
document.head.appendChild(style);
