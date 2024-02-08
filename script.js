/** @format */
'use strict';

const newBtn = document.querySelector('.new-game');
const rollBtn = document.querySelector('.roll');
const holdBtn = document.querySelector('.hold');
const diceImg = document.querySelector('.dice');

const playerOne = document.querySelector('.p-0');
const playerTwo = document.querySelector('.p-1');

const playersScore1 = document.querySelector('.score-0');
const playersScore2 = document.querySelector('.score-1');

const currentOne = document.querySelector('#current-0');
const currentTwo = document.querySelector('#current-1');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  playersScore1.textContent = 0;
  playersScore2.textContent = 0;
  currentOne.textContent = 0;
  currentTwo.textContent = 0;

  diceImg.classList.add('hidden');
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
  playerOne.classList.add('active');
  playerTwo.classList.remove('active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOne.classList.toggle('active');
  playerTwo.classList.toggle('active');
};
rollBtn.addEventListener('click', function () {
  if (playing) {
    const dice = Math.round(Math.random() * 6 + 1);
    diceImg.classList.remove('hidden');
    diceImg.src = `images/dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 30) {
      playing = false;
      diceImg.classList.add('hidden')
      document.querySelector(`.p-${activePlayer}`).classList.add('player-win');
      document.querySelector(`.p-${activePlayer}`).classList.remove('active');
    } else {
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', init);
