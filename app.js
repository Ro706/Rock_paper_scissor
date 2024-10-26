let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const playButton = document.getElementById('play-btn');
const popup = document.getElementById('popup');
const nameInput = document.getElementById('name-input');
const startButton = document.getElementById('start-btn');
const userNamePara = document.querySelector("#user-name");

// Function to generate a random computer choice
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

// Function to handle a draw game
const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

// Function to show the winner of the game
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

// Main game logic to determine the winner
const playGame = (userChoice) => {
  const compChoice = genCompChoice();
  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "scissors" ? true : false;
    } else if (userChoice === "paper") {
      userWin = compChoice === "rock" ? true : false;
    } else {
      userWin = compChoice === "paper" ? true : false;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

// Event listener for the "Play" button to show the popup
playButton.addEventListener("click", () => {
  popup.style.display = "block";
});

// Event listener for the "Start" button to capture the username and start the game
startButton.addEventListener("click", () => {
  const userName = nameInput.value.trim();
  userNamePara.innerText = userName === "" ? "User" : userName;
  popup.style.display = "none";

  // Enable choice buttons for gameplay
  choices.forEach((choice) => {
    choice.style.pointerEvents = "auto";
    choice.addEventListener("click", () => {
      const userChoice = choice.getAttribute("id");
      playGame(userChoice);
    });
  });
});

// Initially disable the choices until game starts
choices.forEach((choice) => {
  choice.style.pointerEvents = "none";
});
