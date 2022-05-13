//Game variables
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  chancesLeft = 3;

console.log(winningNum)  

//Grab elements from the DOM
const gameInput = document.getElementById("guess-input");
const gameSubmit = document.getElementById("submit-btn");
const errorMsg = document.querySelector(".error-msg");
const loading = document.querySelector(".loading-gif");
const game = document.querySelector(".game-wrapper");

//Play again event handler
game.addEventListener('mousedown', function(e){

    // console.log(e.target)
    if (e.target.value === "Play Again") {
      window.location.reload();
    }

})

//Submit Event handler
gameSubmit.addEventListener("click", function () {
  const guess = parseInt(gameInput.value);
  loading.style.display = "block";
  errorMsg.style.display = 'none'

  setTimeout(checkLogic, 2000);

  function checkLogic() {
    loading.style.display = 'none';

    if (isNaN(guess) || guess < min || guess > max) {
      displayMessage(`Please enter a number between ${min} and ${max}`, "red");
    } else {
      //Winning case, Game Over
      if (guess === winningNum) {
        console.log(`${guess} is correct, you won!`);
        displayMessage(`${guess} is correct. You won!`, "green");
        gameInput.disabled = true;
        gameSubmit.value ='Play Again';
      }
      //Losing case, Game over
      else {
        chancesLeft -= 1;
        //   console.log(chancesLeft);
        if (chancesLeft === 0) {
          gameInput.disabled = true;
          gameSubmit.textContent = "Play Again";
          displayMessage(`${guess} is not correct.You Lost`);
          gameInput.disabled = true;
          gameSubmit.textContent = "Play Again";
        } else {
          gameInput.value = "";
          displayMessage(
            `${guess} is not correct. You have ${chancesLeft} chances left`,
            "red"
          );
          console.log(
            `${guess} is not correct. You have ${chancesLeft} chances left`
          );
        }
      }
    }
    //Check for valid input
  }
});

function displayMessage(msg, color) {
  errorMsg.style.display = "block";
  errorMsg.textContent = msg;
  errorMsg.style.color = color;
  gameInput.style.borderColor = color;
}

// Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
