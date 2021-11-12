// start function to start game
function start(){
  document.getElementById("game").innerHTML = "<h1>Select Rock, Paper, or Scissors</h1><form><input type='radio' id='rock'><label for='rock'>Rock</label><br><input type='radio' id='paper'><label for='paper'>Paper</label><br><input type='radio' id='scissors'><label for='scissors'>Scissors</label></form><br><button onclick='game()'>Submit</button>"
}

// Displays results when player wins
function pWin(pChoice, compChoice) {
  document.getElementById("game").innerHTML = "<h1>You win!</h1><h4>Player chose " + pChoice +"</h4><h4>Computer chose " + compChoice + "</h4><h2>" + pChoice + " beats " + compChoice + "</h2><button onclick='start()'>Play again?</button><button onclick='endGame()'>End game and view results</button>";
}

// Displays results when player loses
function pLose(pChoice, compChoice) {
  document.getElementById("game").innerHTML = "<h1>You lose!</h1><h4>Player chose " + pChoice +"</h4><h4>Computer chose " + compChoice + "</h4><h2>" + compChoice + " beats " + pChoice + "</h2><button onclick='start()'>Play again?</button><button onclick='endGame()'>End game and view results</button>";
}

/* flashText function to flash "Thank you for playing!" inspired from http://jsfiddle.net/neuroflux/rXVUh/14/ because for some reason
functions I made from scratch never worked */
function flashText(element,color) {
  let colorText = document.getElementById(element).style.color;

  if (colorText === 'white') {
    document.getElementById(element).style.color = color;
  } 
  else if (colorText ==='black') {
    document.getElementById(element).style.color = 'red';
  }
  else if (colorText ==='blue') {
    document.getElementById(element).style.color = 'yellow';
  }
  else if (colorText ==='yellow') {
    document.getElementById(element).style.color = 'green';
  }
  else if (colorText ==='green') {
    document.getElementById(element).style.color = 'purple';
  }
  else if (colorText ==='purple') {
    document.getElementById(element).style.color = 'black';
  }
  else{
    document.getElementById(element).style.color = 'white';
  }
}

// endGame function to thank player and call flashText function
function endGame() {
  let text = document.getElementById("game");
  text.innerHTML = "<h1 id='animate' align='center'>Thank you for playing!</br>\"You're great!\" - Quote from Metal Slug</h1>";
  
  setInterval(function() {
    flashText('animate','blue');
    }, 750 );
}

// game function consisting mainly on if and else if statements
function game() {
  // Variables for choices between rock, paper, or scissors
  let compChoices = Math.floor(Math.random() * 3 + 1);
  let prock = document.getElementById("rock");
  let ppaper = document.getElementById("paper");
  let pscissors = document.getElementById("scissors")
  let compChoice;
  let pChoice;

  // Assigns computer choice to rock, paper, or Scissors
  if(compChoices === 1)
  {
    compChoice = "Rock";
  }
  else if (compChoices === 2)
  {
    compChoice = "Paper";
  }
  else
  {
    compChoice = "Scissors"
  }

  // Assigns player choice to rock, paper, or Scissors
  if (prock.checked == true)
  {
    pChoice = "Rock";
  }
  if (ppaper.checked == true)
  {
    pChoice = "Paper";
  }
  if (pscissors.checked == true)
  {
    pChoice = "Scissors";
  }

  // Checks results of both player and computer choices.
  if (pChoice === compChoice)
  {
    document.getElementById("game").innerHTML = "<h1>It's a Tie!</h1><h4>Player chose " + pChoice +"</h4><h4>Computer chose " + compChoice + "</h4><button onclick='start()'>Play again?</button><button onclick='endGame()'>End game and view results</button>";
  }
  if (pChoice === "Rock" && compChoice === "Scissors")
  {
    pWin(pChoice, compChoice);
  }
  else if (pChoice === "Rock" && compChoice === "Paper")
  {
    pLose(pChoice, compChoice);
  }
  if (pChoice === "Paper" && compChoice === "Rock")
  {
    pWin(pChoice, compChoice);
  }
  else if (pChoice === "Paper" && compChoice === "Scissors")
  {
    pLose(pChoice, compChoice);
  }
  if (pChoice === "Scissors" && compChoice === "Paper")
  {
    pWin(pChoice, compChoice);
  }
  else if (pChoice === "Scissors" && compChoice === "Rock")
  {
    pLose(pChoice, compChoice);
  }
}
