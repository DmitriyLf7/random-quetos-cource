const quotes = [
  "Believe you can and you're halfway there.",
  "Success is not final, failure is not fatal.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Dream big and dare to fail.",
  "Hard work beats talent when talent doesn’t work hard.",
  "Stay hungry. Stay foolish.",
  "Your time is limited, so don’t waste it living someone else’s life.",
];

const quoteText = document.getElementById("quote");
const button = document.getElementById("btn");
const soundBtn = document.getElementById("soundBtn");
const favoriteIcon = document.getElementById("favoriteIcon");
const favoritesList = document.getElementById("favoritesList");

let voiceEnabled = true;
let lastIndex = -1;
let currentQuote = "";
let favorites = [];

// Озвучка
function speakText(text) {
  if (!voiceEnabled) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}

// Генерация цитаты
function generateQuote() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === lastIndex);

  lastIndex = randomIndex;
  currentQuote = quotes[randomIndex];

  quoteText.classList.add("fade");

  setTimeout(() => {
    quoteText.textContent = currentQuote;
    quoteText.classList.remove("fade");
    speakText(currentQuote);

    // Проверяем: в избранном ли цитата
    updateStarState();
  }, 400);
}

// Обновление состояния звезды
function updateStarState() {
  if (favorites.includes(currentQuote)) {
    favoriteIcon.classList.add("active");
    favoriteIcon.textContent = "★";
  } else {
    favoriteIcon.classList.remove("active");
    favoriteIcon.textContent = "☆";
  }
}

// Клик по звезде в основном контейнере
favoriteIcon.addEventListener("click", () => {
  if (!currentQuote) return;

  if (favorites.includes(currentQuote)) {
    favorites = favorites.filter((q) => q !== currentQuote);
  } else {
    favorites.push(currentQuote);
  }

  renderFavorites();
  updateStarState();
});

// Отрисовка избранного списка
function renderFavorites() {
  favoritesList.innerHTML = "";

  favorites.forEach((quote) => {
    const li = document.createElement("li");
    li.className = "favorite-item";

    const text = document.createElement("span");
    text.className = "favorite-text";
    text.textContent = quote;

    const removeIcon = document.createElement("span");
    removeIcon.className = "remove-icon";
    removeIcon.textContent = "✖";

    // Удаление из избранного
    removeIcon.addEventListener("click", () => {
      favorites = favorites.filter((q) => q !== quote);
      renderFavorites();

      // если удалили текущую цитату — обновляем звезду
      if (quote === currentQuote) {
        updateStarState();
      }
    });

    li.appendChild(text);
    li.appendChild(removeIcon);
    favoritesList.appendChild(li);
  });
}

// Переключатель озвучки
soundBtn.addEventListener("click", () => {
  voiceEnabled = !voiceEnabled;
  if (!voiceEnabled) window.speechSynthesis.cancel();
  soundBtn.textContent = voiceEnabled ? "🔊 Voice ON" : "🔇 Voice OFF";
});

button.addEventListener("click", generateQuote);
