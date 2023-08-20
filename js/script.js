const guessedLettersElement = document.querySelector(".guessed-letters");
// Selects the unordered list where player’s guessed letters appear.

const  guessLetterButton = document.querySelector(".guess");
// Selects the Guess! Button.

const letterInput = document.querySelector(".letter");
// Text input where player will guess a letter.

const wordInProgress= document.querySelector(".word-in-progress");
// Paragraph where the remaining guesses will display.

const remainingGuessesElement = document.querySelector(".remaining"); 
// The paragraph where remaining guesses will display.

const remainingGuessesSpan= document.querySelector(".remaining span"); 
// The span inside the paragraph where remaining guesses will display.

const message= document.querySelector(".message");
//Empty paragraph where messages appear  when player guessed a  letter.

const playAgainButton =document.querySelector(".play-again");
// The hidden button that will appear prompting player to play again.

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

// Fire off the game
getWord();

//Display bullets as symbol placeholders for the player's input letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
    //    console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

guessLetterButton.addEventListener("click", function(e){
    e.preventDefault();
    //Empty the text of the message element.
    message.innerText = "";
    //Grab what was entered in the input.
    const guess = letterInput.value;
    //Validate to make sure it is a single letter.
    const goodGuess = validateInput(guess);
    
    if (goodGuess) {
        // Word guess game begins if a letter is entered correctly.  
        makeGuess(guess);
    }
    
    letterInput.value = "";
});

//Created and named a function that accepts input value as a parameter.
//This function validates the player's input.
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    //Conditional block checking if input is empty.
    if (input.length === 0) {
        message.innerText = "Empty space. Guess a letter!";
    //Checking if player entered more than one letter. 
    } else if (input.length > 1) {
        message.innerText = "Only enter one letter.";
    //Check in entered character does not match the regular expression.
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Enter a letter from A to Z";
    //If all other conditions are not met the input is a letter.    
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if(guessedLetters.includes(guess)) {
        message.innerText = "Already guessed that letter. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateGuessesRemaining(guess);
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

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        // Wrong guess, lose a chance
        message.innerText = `Sorry, no ${guess}. Try again.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! There is a letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `GAME OVER. The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};


const checkIfWin = function () {
    if (word.toUpperCase()===wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight"> Congratulations! Guessed the correct word! </p>`;
    }
};