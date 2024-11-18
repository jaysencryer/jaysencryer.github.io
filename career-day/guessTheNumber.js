var wonGame = false;
var numberToGuess = Math.ceil(Math.random()*100);
console.log(numberToGuess);

function checkGuess(guess) {
    if (guess < numberToGuess) {
        alert("too low!");
        return;
    }

    if (guess > numberToGuess) {
        alert("too high!");
        return;
    }

    alert(`You guessed it - the number is ${numberToGuess}`);
}

function processGuess(event) {
    // console.log(event.target);
    // console.table(event);
    
    
    // JavaScript
    const input = document.getElementById("guess");
    const inputValue = input.value;
    console.log(input.value);
    checkGuess(input.value);
    input.value=0;
    event.preventDefault();
}