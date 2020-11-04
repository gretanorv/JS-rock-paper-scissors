//buttons
const rulesBtn = document.getElementById("rules");
const closeModalBtn = document.getElementById("close");
const playAgain = document.getElementById("playAgain");
//modal, boards
const modal = document.getElementById("modal");
const board1 = document.getElementById("board1");
const board2 = document.getElementById("board2");
const user = document.getElementById("user");
const house = document.getElementById("house");
//text fields
const text = document.getElementById("finalText");
const score = document.getElementById("score");
//selectors
const possibleChoices = Array.from(document.querySelectorAll(".board__select"));
//object
const data = {
  userChoice: "",
  userScore: 0,
  houseChoice: "",
};
let win;

rulesBtn.addEventListener("click", () => {
  modal.classList.remove("hide");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hide");
});

const handleClick = (el) => {
  data.userChoice = el.id;
  showChoices();
};

playAgain.addEventListener("click", () => {
  data.userChoice = "";
  data.houseChoice = "";
  // location.reload();

  //hide results
  board2.classList.add("hide");

  //remove children
  user.removeChild(user.firstChild);
  house.removeChild(house.firstChild);

  //show main
  board1.classList.remove("hide");
});

const showChoices = () => {
  data.houseChoice = houseChoice(data.userChoice);

  //hide board1
  board1.classList.add("hide");

  //show board2
  board2.classList.remove("hide");

  //show user selection
  let cloneUser = document.getElementById(data.userChoice).cloneNode(true);
  cloneUser.removeAttribute("onclick");
  user.appendChild(cloneUser);

  //show house selection
  let cloneHouse = document.getElementById(data.houseChoice).cloneNode(true);
  cloneHouse.removeAttribute("onclick");
  house.appendChild(cloneHouse);

  //play game
  play(data.userChoice, data.houseChoice);

  if (win) {
    text.innerText = "You win";
    data.userScore++;
    cloneUser.classList.add("pulse");
  } else {
    text.innerText = "You lose";
    cloneHouse.classList.add("pulse");
  }

  score.innerText = data.userScore;
};

const houseChoice = (userChoice) => {
  let randomNum = Math.floor(Math.random() * 3);
  let go = true;
  while (go) {
    randomNum = Math.floor(Math.random() * 3);

    if (possibleChoices[randomNum].id != userChoice) {
      go = false;
    }
  }
  //random num from 0 to 2
  return possibleChoices[randomNum].id;
};

const play = (user, house) => {
  if (
    //user wins
    (user === "scissors" && house === "paper") ||
    (user === "paper" && house === "rock") ||
    (user === "rock" && house === "scissors")
  ) {
    // text.innerText = "You win";
    win = true;
  } else if (
    //house wins
    (house === "scissors" && user === "paper") ||
    (house === "paper" && user === "rock") ||
    (house === "rock" && user === "scissors")
  ) {
    // text.innerText = "You lose";
    win = false;
  }
};
