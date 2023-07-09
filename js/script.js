const listLetters = document.querySelector(".guessed-letters");
// Selects the unordered list where player’s guessed letters appear.

const  buttonGuess = document.querySelector(".guess");
// Selects the Guess! Button.

const letterSpace = document.querySelector(".letter");
// Text input where player will guess a letter.

const wordInProgress= document.querySelector(".word-in-progress");
// Paragraph where the remaining guesses will display.

const remainingLetter = document.querySelector(".remaining"); 
// The paragraph where remaining guesses will display.

const remainingGuessesSpan= document.querySelector(".remaining span"); 
// The span inside the paragraph where remaining guesses will display.

const guessedMessage= document.querySelector(".message");
//Empty paragraph where messages appear  when player guessed a  letter.

const playAgain =document.querySelector(".play-again");
// The hidden button that will appear prompting player to play again.

const word = "magnolia";

//Display bullets as symbol placeholders for the player's input letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

buttonGuess.addEventListener("click", function(e){
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});