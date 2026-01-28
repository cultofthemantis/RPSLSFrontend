const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const lizardBtn = document.getElementById("lizardBtn");
const spockBtn = document.getElementById("spockBtn");
const easyBtn = document.getElementById("easy-btn");
const medBtn = document.getElementById("med-btn");
const hardBtn = document.getElementById("hard-btn");
const pvpBtn = document.getElementById("pvp-btn");
const cpuMoveEl = document.getElementById("cpu-move");
const resultEl = document.getElementById("result");
const cpuScore = document.getElementById("cpuScore");
const userScore = document.getElementById("userScore");

let cpuCounter = 0;
let userCounter = 0;
let winLimit = 2;
let gameOver = false;
let isPvp = false;
let currentPlayer = 1;
let player1Move = null;

async function playGame(move) {
    playAgainBtn.disabled = true;
  let easy = true;
  if (gameOver) {
    return;
  }

  if (isPvp === true) {
    PVP(move);
    return;
  }

  const response = await fetch(
    `https://rpsfullstack-egf3dpapfqena4f7.westus3-01.azurewebsites.net/api/RpsLS/CPU?userMove=${move}`,
  );
  const result = await response.text();
  console.log(response);
  resultEl.textContent = result;
  updateScore(result);
}

async function PVP(move) {
  if (currentPlayer === 1) {
    player1Move = move;
    currentPlayer = 2;
    resultEl.textContent = "Player 2: choose your move";
    return;
  }

  const response = await fetch(`https://rpsfullstack-egf3dpapfqena4f7.westus3-01.azurewebsites.net/api/RpsLS/pvp?player1Move=${player1Move}&player2Move=${move}`,);
  const result = await response.text();

  resultEl.textContent = result;

  updateScore(result);
  checkWinCondition();

  currentPlayer = 1;
  player1Move = "";
}

rockBtn.addEventListener("click", () => playGame("rock"));
paperBtn.addEventListener("click", () => playGame("paper"));
scissorsBtn.addEventListener("click", () => playGame("scissors"));
lizardBtn.addEventListener("click", () => playGame("lizard"));
spockBtn.addEventListener("click", () => playGame("spock"));

function checkWinCondition() {
  if ((easy = true)) {
    winLimit = 2;
    if (cpuCounter == winLimit) {
      resultEl.textContent = "CPU Victory";
    }

    if (userCounter == winLimit) {
      resultEl.textContent = "You Win!";
    }
  }
  if ((medium = true)) {
    winLimit = 3;

    if (cpuCounter == winLimit) {
      resultEl.textContent = "CPU Victory";
    }

    if (userCounter == winLimit) {
      resultEl.textContent = "You Win!";
    }
  }

  if ((hard = true)) {
    winLimit = 4;

    if (cpuCounter == winLimit) {
      resultEl.textContent = "CPU Victory";
    }

    if (userCounter == winLimit) {
      resultEl.textContent = "You Win!";
    }
  }
}

function resetGame() {
  userCounter = 0;
  cpuCounter = 0;
  resultEl.textContent = `First to ${winLimit} wins`;
  playAgainBtn.disabled = true;
}

easyBtn.addEventListener("click", () => {
  let easy = true;
  winLimit = 2;
  resetGame();
});

medBtn.addEventListener("click", () => {
  let medium = true;
  winLimit = 3;
  resetGame();
});

hardBtn.addEventListener("click", () => {
  let hard = true;
  winLimit = 4;
  resetGame();
});

pvpBtn.addEventListener("click", function () {
  resetGame();

  if (isPvp === false) {
    isPvp = true;
    currentPlayer = 1;
    player1Move = null;
    resultEl.textContent = "Player 1: Choose your move";
  } else {
    isPvp = false;
    resultEl.textContent = "CPU Mode";
  }
});

function updateScore(result) {
  if (result.includes("Player 1") || result.includes("You Win!")) {
    userCounter++;
  }

  if (result.includes("Player 2") || result.includes("CPU Wins.")) {
    cpuCounter++;
  }

  userScore.textContent = userCounter;
  cpuScore.textContent = cpuCounter;

  checkWinner();
}

function checkWinner() {
  if (userCounter === winLimit) {
    resultEl.textContent = "You Win the Match!";
    endGame();
  }

  if (cpuCounter === winLimit) {
    resultEl.textContent = "CPU Wins the Match!";
    endGame();
  }
}

const playAgainBtn = document.getElementById("play-again-btn");
function endGame() {
  gameOver = true;
  playAgainBtn.disabled = false;
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;
  lizardBtn.disabled = true;
  spockBtn.disabled = true;
  easyBtn.disabled = true;
  medBtn.disabled = true;
  hardBtn.disabled = true;
  pvpBtn.disabled = true;
}
playAgainBtn.addEventListener("click", function () {
  resetGame();
  cpuCounter = 0;
  userCounter = 0;
  gameOver = false;
  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorsBtn.disabled = false;
  lizardBtn.disabled = false;
  spockBtn.disabled = false;
    easyBtn.disabled = false;
  medBtn.disabled = false;
  hardBtn.disabled = false;
  pvpBtn.disabled = false;
});
