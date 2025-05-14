const cards = [
  { name: "Zugspitze", value: 2962, img: "Zugspitze.jpeg" },
  { name: "Schneefernerkopf", value: 2875, img: "Schneefernerkopf_1.jpg" },
  { name: "Watzmann", value: 2713, img: "Watzmann.jpg" },
  { name: "Hochkalter", value: 2607, img: "Hochkalter.jpg" },
  { name: "Großglockner", value: 3798, img: "Grossglockner.jpg" }
];

let currentIndex = 0;
let nextIndex = 1;
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;

const scoreEl = document.getElementById("score");
const highscoreEl = document.getElementById("highscore");
const messageEl = document.getElementById("message");

highscoreEl.textContent = highscore;

function updateCards() {
  const firstCard = cards[currentIndex];
  const secondCard = cards[nextIndex];

  const card1 = document.getElementById("card1");
  const card2 = document.getElementById("card2");

  card1.querySelector("img").src = firstCard.img;
  card1.querySelector(".label").textContent = `${firstCard.name}: ${firstCard.value}m`;

  card2.querySelector("img").src = secondCard.img;
  card2.querySelector(".label").textContent = `${secondCard.name}: ?`;
}

function checkAnswer(isHigher) {
  const current = cards[currentIndex];
  const next = cards[nextIndex];

  const correct = isHigher ? next.value > current.value : next.value < current.value;

  if (correct) {
    score++;
    scoreEl.textContent = score;
    messageEl.textContent = "Richtig!";
    messageEl.style.color = "#98f8c9";

    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
      localStorage.setItem("highscore", highscore);
    }

    currentIndex = nextIndex;
    nextIndex = (nextIndex + 1) % cards.length;
    updateCards();
  } else {
    messageEl.textContent = `Falsch! ${next.name} ist ${next.value}m hoch.`;
    messageEl.style.color = "#ff6b6b";
    score = 0;
    scoreEl.textContent = score;
    currentIndex = 0;
    nextIndex = 1;
    updateCards();
  }
}

document.getElementById("higher").addEventListener("click", () => {
  checkAnswer(true);
});

document.getElementById("lower").addEventListener("click", () => {
  checkAnswer(false);
});

updateCards();
