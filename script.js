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

// Получаем элементы
const quoteText = document.getElementById("quote");
const button = document.getElementById("btn");

// Переменная для хранения предыдущей цитаты
let lastIndex = -1;

// Функция генерации цитаты без повторения
function generateQuote() {
  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === lastIndex);

  lastIndex = randomIndex;
  quoteText.textContent = quotes[randomIndex];
}

// Обработчик кнопки
button.addEventListener("click", generateQuote);
