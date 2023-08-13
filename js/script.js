const guessedLettersElement = document.querySelector(".guessed-letters");
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
const guessedLetters = [];

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
    //Empty the text of the message element.
    guessedMessage.innerText = "";
    //Grab what was entered in the input.
    const guess = letterSpace.value;
    //Validate to make sure it is a single letter.
    const goodGuess = validateLetter(guess);
    
    if (goodGuess) {
        // Word guess game begins with a letter.  
        makeGuess(guess);
    }
    
    letterSpace.value = "";
});

//Created and named a function that accepts input value as a parameter.
//This function validates the player's input.
const validateLetter = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    //Conditional block checking if input is empty.
    if (input.length === 0) {
        guessedMessage.innerText = "Empty space. Guess a letter!";
    //Checking if player entered more than one letter. 
    } else if (input.length > 1) {
        guessedMessage.innerText = "Only enter one letter.";
    //Check in entered character does not match the regular expression.
    } else if (!input.match(acceptedLetter)) {
        guessedMessage.innerText = "Enter a letter from A to Z";
    //If all other conditions are not met the input is a letter.    
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if(guessedLetters.includes(guess)) {
        guessedMessage.innerText = "Already guessed that letter. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    //Clears list first.
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li =document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
       if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
       } else {
        revealWord.push("●");
       }
}
wordInProgress.innerText = revealWord.join("");
checkIfWin();
};

const checkIfWin = function () {
    if (word.toUpperCase()===wordInProgress.innerText) {
        MessageChannel.classList.add("win");
        MessageChannel.innerHTML = `<p class="highlight"> You guess the correct word! Congrats!</p>`;
    }
};