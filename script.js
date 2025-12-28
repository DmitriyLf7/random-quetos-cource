// Массив цитат
const quotes = [
  "Believe you can and you're halfway there.",
  "Success is not final, failure is not fatal.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Dream big and dare to fail.",
  "Hard work beats talent when talent doesn’t work hard.",
  "Stay hungry. Stay foolish.",
  "Your time is limited, so don’t waste it living someone else’s life.",
];

// Элементы
const quoteText = document.getElementById("quote");
const button = document.getElementById("btn");
const soundBtn = document.getElementById("soundBtn");

// Флаг голосовой озвучки
let voiceEnabled = true;

// Чтобы не повторялась та же цитата
let lastIndex = -1;

// 🎤 Озвучивание текста
function speakText(text) {
  if (!voiceEnabled) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
}

// Генерация цитаты
function generateQuote() {
  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === lastIndex);

  lastIndex = randomIndex;

  // Анимация исчезновения
  quoteText.classList.add("fade");

  setTimeout(() => {
    const newQuote = quotes[randomIndex];

    quoteText.textContent = newQuote;
    quoteText.classList.remove("fade");

    // 🎤 Озвучка
    speakText(newQuote);
  }, 400);
}

// Переключатель озвучки
soundBtn.addEventListener("click", () => {
  voiceEnabled = !voiceEnabled;

  if (!voiceEnabled) {
    window.speechSynthesis.cancel();
  }

  soundBtn.textContent = voiceEnabled ? "🔊" : "🔇";
});

// Кнопка генерации
button.addEventListener("click", generateQuote);
