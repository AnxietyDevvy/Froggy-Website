const petButton = document.getElementById('petButton');
const feedButton = document.getElementById('feedButton');
const factButton = document.getElementById('factButton');
const modeToggle = document.getElementById('modeToggle');
const statusBox = document.getElementById('statusBox');
const petCountEl = document.getElementById('petCount');
const feedCountEl = document.getElementById('feedCount');
const selectedFrogLabel = document.getElementById('selectedFrog');
const frogButtons = document.querySelectorAll('.frog-friend');
const frog = document.getElementById('frog');
const frogCard = document.getElementById('frogCard');
const factList = document.getElementById('factList');
const mushrooms = document.querySelectorAll('.mushroom');

let petCount = 0;
let feedCount = 0;
let currentFrog = 'Poppy';
let isNightMode = false;

const facts = [
  'Frogs can breathe through their skin when they are underwater.',
  'Some frogs can jump over 20 times their own body length.',
  'Mushrooms are not plants—they are fungi with their own cozy kingdom.',
  'A frog’s tongue can catch a bug in less than 0.1 seconds.',
  'Many frogs love the shade of lily pads and sleepy pond nights.'
];

const sounds = {
  pet: 'https://actions.google.com/sounds/v1/animals/frog_giggle.ogg',
  feed: 'https://actions.google.com/sounds/v1/animals/frog_snort.ogg',
  click: 'https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg'
};

function playSound(type) {
  const audio = new Audio(sounds[type]);
  audio.volume = 0.45;
  audio.play().catch(() => {});
}

function updateStats() {
  petCountEl.textContent = petCount;
  feedCountEl.textContent = feedCount;
}

function animateFrog(action) {
  frog.classList.add('frog-action');
  if (action === 'pet') {
    frog.style.transform = 'translateY(-8px)';
  } else if (action === 'feed') {
    frog.style.transform = 'translateX(6px)';
  }
  setTimeout(() => {
    frog.classList.remove('frog-action');
    frog.style.transform = '';
  }, 260);
}

function updateFrogAppearance(name) {
  frogCard.className = 'frog-card ' + name.toLowerCase();
  selectedFrogLabel.textContent = name;
}

function showStatus(message) {
  statusBox.textContent = message;
}

petButton.addEventListener('click', () => {
  petCount += 1;
  updateStats();
  animateFrog('pet');
  playSound('pet');
  showStatus(`${currentFrog} loves your gentle pet! 🐸`);
});

feedButton.addEventListener('click', () => {
  feedCount += 1;
  updateStats();
  animateFrog('feed');
  playSound('feed');
  showStatus(`${currentFrog} happily munches a bug and gives a happy ribbit.`);
});

factButton.addEventListener('click', () => {
  const fact = facts[Math.floor(Math.random() * facts.length)];
  showStatus(`${currentFrog} shares: ${fact}`);
  const newFactItem = document.createElement('li');
  newFactItem.textContent = `${currentFrog} says: ${fact}`;
  factList.prepend(newFactItem);
  if (factList.children.length > 6) {
    factList.removeChild(factList.lastChild);
  }
  playSound('click');
});

mushrooms.forEach((mushroom) => {
  mushroom.addEventListener('click', () => {
    const name = mushroom.dataset.mushroom;
    showStatus(`You tapped ${name}. It whispers, "The pond glows brightest when everyone feels cozy."`);
    playSound('click');
  });
});

frogButtons.forEach((button) => {
  button.addEventListener('click', () => {
    frogButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    currentFrog = button.dataset.frog;
    updateFrogAppearance(currentFrog);
    showStatus(`${currentFrog} is excited to spend time with you!`);
    playSound('click');
  });
});

modeToggle.addEventListener('click', () => {
  isNightMode = !isNightMode;
  document.documentElement.classList.toggle('night-mode', isNightMode);
  modeToggle.textContent = isNightMode ? 'Day mode' : 'Night mode';
  showStatus(isNightMode ? 'The pond softens into cozy moonlight.' : 'Sunshine returns to the pond.');
  playSound('click');
});

updateFrogAppearance(currentFrog);
updateStats();
