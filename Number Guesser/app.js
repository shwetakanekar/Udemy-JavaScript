//Game variables
let min=1,max=10,correctNum=randomNum(min,max),guessesLeft=3;

//UI elements
const game=document.getElementById('game'),
      minNum=document.querySelector('.min-num'),
      maxNum=document.querySelector('.max-num'),
      message=document.querySelector('.message'),
      guessInput=document.getElementById('guess-input'),
      guessBtn=document.getElementById('guess-btn');

minNum.textContent=min;
maxNum.textContent=max;
guessInput.value=undefined;

//play again-reload
game.addEventListener('mouseup', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

//check the guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  if(isNaN(guess) || guess<min || guess>max){
    showMessage(`Enter a number between ${min} and ${max}.`, 'red');
  }
  else if(guess === correctNum){
    gameOver(true, `Your guess is correct. The number is ${guess}.`);
  }
  else{
    guessesLeft--;
    if(guessesLeft===0){
      gameOver(false,`GAME OVER. The correct number was ${correctNum}`);
    }
    else{
      guessInput.value='';
      guessInput.style.borderColor='red';
      showMessage(`Your guess is incorrect. You have ${guessesLeft} more guess left.`,'red');
    }    
  }
});

function randomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function gameOver(won, msg){
  let color;
  color = (won===true ? 'green' : 'red');
  guessInput.disabled = true;
  guessInput.style.borderColor=color;
  showMessage(msg, color);

  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

function showMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}
