let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".newGame");
let winMsg = document.querySelector(".win");

let turnO = true; // playerX, playerO
let count = 0; // For Checking Draw

// All Possible Winning Patterns, If any of these patterns have same value then the current player is the winner
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Set the start from O
const resetGame = () => {
  turnO = true;
  count = 0;        // game starts, so count is 0
  enableBoxes();
  // In Starting the winning message is hiddden
  winMsg.style.visibility = "hidden";
};

// when a event happens on screen it will be captured by the event listener
// and the function inside it will be executed, set the text inside it and disable it so no one can chage it further
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;
    
    // after each step check if it is the winner or not
    let isWinner = checkWinner();

    // Check for a draw only if there is no winner yet
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});


const gameDraw = () => {
  winMsg.innerText = `Game was a Draw.`;
  // Game is Draw if the count is 9 and there is no winner
  winMsg.style.visibility = "visible";
  disableBoxes();
};

// diable all boxes after game is over
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// emable all boxes and clear the text -> to start the game
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  winMsg.innerText = `Congratulations, Winner is ${winner}`;
  winMsg.style.visibility = "visible";
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false; // Return false if no winner is found
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
