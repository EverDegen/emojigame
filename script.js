'use strict';

// object with emojis as key and numbers as values
const emoji = {
  '🤣': -6,
  '😎': 2,
  '👀': 5,
  '🧠': 6,
  '🦚': 1,
  '👾': 8,
  '🦁': 7,
  '🐶': 6,
  '🤡': -3,
  '💛': 1,
  '💣': 0,
  '💗': 1,
  '🍌': 2,
  '🍑': 3,
  '🍒': 4,
  '🎃': -4,
  '🎉': 8,
  '💎': 9,
  '👑': 11,
  '🪁': 7,
};

let row = 4;
let column = 4;
let score = 0;
let chance = 3;
let tileClicked = 0;
let gameOver = false;
let highScore = 0;

//display initial score and chance
document.getElementById('chance').innerText = chance;
document.getElementById('score').innerText = score;

//this function gets random key from the object each time
let randomProperty = function (obj) {
  let keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};

window.onload = function () {
  startGame();
};

function clickTile() {
  if (gameOver || this.classList.contains('tile-clicked')) {
    return;
  }
  this.innerText = randomProperty(emoji);
  const emojiKey = this.innerText;
  const emojiValue = emoji[emojiKey];
  score += emojiValue;
  document.getElementById('score').innerText = score;
  this.classList.add('tile-clicked');
  tileClicked++;

  if (emojiKey == '💛' && chance < 3) {
    chance++;
    document.getElementById('chance').innerText = chance;
  } else if (emojiKey == '💗') {
    chance = 3;
    document.getElementById('chance').innerText = chance;
  }

  if (emojiKey == '💣') {
    chance -= 3;
    document.getElementById('chance').innerText = 0;
    this.style.backgroundColor = 'red';
    document.getElementById('status').innerText = 'Game Over';
    document.getElementById('status').style.color = 'red';
    gameOver = true;
  }
  if (emojiKey == '🤣' || emojiKey == '🤡' || emojiKey == '🎃') {
    chance--;
    document.getElementById('chance').innerText = chance;
    this.style.backgroundColor = 'red';
  }
  if (chance < 1 || score < 1) {
    gameOver = true;
    document.getElementById('status').innerText = 'Game Over';
    document.getElementById('status').style.color = 'red';
  }

  if (tileClicked > 15 && chance > 0) {
    tileClicked = 0;
    document.getElementById('board').innerHTML = '';
    startGame();
  }
}

//populate board
function startGame() {
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < column; c++) {
      let tile = document.createElement('div');
      tile.id = r + '-' + c;
      document.getElementById('board').append(tile);
      tile.addEventListener('click', clickTile);
    }
  }
}

document.getElementById('restart').addEventListener('click', function () {
  if (score > highScore) {
    highScore = score;
  }
  row = 4;
  column = 4;
  score = 0;
  chance = 3;
  tileClicked = 0;
  gameOver = false;
  document.getElementById('board').innerHTML = '';
  document.getElementById('status').innerText = 'Ready';
  document.getElementById('status').style.color = 'green';
  document.getElementById('chance').innerText = chance;
  document.getElementById('score').innerText = score;
  document.getElementById('highscore').innerText = highScore;
  startGame();
});

//info page
document.getElementById('info').addEventListener('click', function () {
  const infoPage = `<p><br /><b>How to play?</b><br /> Well it's pretty much self explainatry but here is a quick info to get started.<br />Every emoji has been assigned some points, so when you click on a emoji the value of that emoji get added to score. (max value = 11, min value = -6). There are some special like 💗 will reset the chance back to 3, 💛 will increase chance by 1, 💣 will reset the chance to 0 and game over.<br /><br /><b>Rules</b><br />1. Score can't be in negative<br />2. Chance can't be zero
  </p>`;
  document.getElementById('board').innerHTML = infoPage;
});