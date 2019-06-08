let activePlayer;
let dice;
let score;
let totalScore;
let winScore;
function init() {
  activePlayer = 0;
  score = 0;
  totalScore = [0, 0];
  document.querySelectorAll(".score").forEach(e => {
    e.textContent = 0;
  });
  document.querySelectorAll(".current").forEach(e => {
    e.textContent = 0;
  });
  document.querySelector(".audio").src = "";
}
init();
window.addEventListener("keypress", e => {
  if (e.key === "^") {
    const worning = document.createElement("p");
    worning.textContent = "cheat code activated";
    worning.classList.add("worning");
    document.querySelector("body").appendChild(worning);
    setTimeout(() => {
      worning.remove();
    }, 2000);

    totalScore[activePlayer] += 10;
  }
});
///// listening for new game click ebent ///////////
document.querySelector(".new-game").addEventListener("click", init);

///////// listening for dice roll event //////////
document.querySelector(".roll-dice").addEventListener("click", rollDice);
document.querySelector(".img").addEventListener("click", rollDice);

///// listening for hold event ////////////
document.querySelector(".hold-dice").addEventListener("click", () => {
  document.querySelector(".audio").src = "switch-player.m4a";
  score = diceValue;
  totalScore[activePlayer] += score;
  document.querySelector(".score-" + activePlayer).textContent =
    totalScore[activePlayer];
  console.log(score);
  document.querySelectorAll(".current").forEach(e => {
    e.textContent = 0;
  });
  const input = document.querySelector("input").value;
  if (input) {
    winScore = input;
  } else {
    winScore = 10;
  }
  if (totalScore[activePlayer] >= winScore) {
    document.querySelector(".score-" + activePlayer).textContent = `WINNER`;
    document.querySelector(".audio").src = "winner.m4a";
  } else {
    changePlayer();
  }
});

function changePlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  document.querySelector(".player1").classList.toggle("active");
  document.querySelector(".player2").classList.toggle("active");
}
function rollDice() {
  diceValue = Math.floor(Math.random() * 6) + 1;
  document.querySelector(".audio").src = "dice-roll.m4a";

  const diceImg = document.querySelector(".img");
  setTimeout(() => {
    diceImg.src = "dice-" + diceValue + ".png";
  }, 600);
  diceImg.classList.add("roll");
  setTimeout(() => {
    diceImg.classList.remove("roll");
  }, 800);

  if (diceValue !== 1) {
    setTimeout(() => {
      document.querySelector(
        ".current-" + activePlayer
      ).textContent = diceValue;
    }, 700);
    console.log(diceValue);
  } else {
    setTimeout(() => {
      document.querySelector(".audio").src = "dice-sorry.m4a";
      const worning = document.createElement("p");
      worning.textContent = "You just rolled a 1";
      worning.classList.add("worning");
      document.querySelector("body").appendChild(worning);
      setTimeout(() => {
        worning.remove();
      }, 2000);
      document.querySelector(".current-" + activePlayer).textContent = 0;
      changePlayer();
    }, 1000);
  }
}
