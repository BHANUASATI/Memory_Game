const symbols = ['💎', '🍎', '🎮', '🌟', '🚗', '🍕', '🏀', '🐱', '💎', '🍎', '🎮', '🌟', '🚗', '🍕', '🏀', '🐱'];
let flippedCards = [];
let matchedCards = 0;
let moves = 0;
let timer = 0;
let timerInterval;

const gameBoard = document.getElementById('gameBoard');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const partyMessage = document.getElementById('party');
const generateButton = document.getElementById('generateButton');
const resetButton = document.getElementById('resetButton');
const flipSound = new Audio('https://www.soundjay.com/button/beep-07.wav');

// Shuffle the symbols array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create and display the cards
function createBoard() {
    shuffle(symbols);
    gameBoard.innerHTML = '';
    symbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
    gameBoard.classList.remove('winning');
}

// Flip the card when clicked
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.symbol;
        flippedCards.push(this);
        flipSound.play();
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check if the two flipped cards match
function checkForMatch() {
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;
    if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
        matchedCards += 2;
        flippedCards = [];
        if (matchedCards === symbols.length) {
            winGame();
        }
    } else {
        setTimeout(() => {
            flippedCards[0].classList.remove('flipped');
            flippedCards[1].classList.remove('flipped');
            flippedCards[0].textContent = '';
            flippedCards[1].textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = `Time: ${timer}s`;
    }, 1000);
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Reset the game
function resetGame() {
    moves = 0;
    matchedCards = 0;
    timer = 0;
    movesDisplay.textContent = `Moves: ${moves}`;
    timerDisplay.textContent = `Time: ${timer}s`;
    partyMessage.style.display = 'none';
    createBoard();
    startTimer();
}

// Handle the win condition
function winGame() {
    stopTimer();
    partyMessage.style.display = 'block';
    gameBoard.classList.add('winning');
}

// Event Listeners
generateButton.addEventListener('click', () => {
    resetGame();
});

resetButton.addEventListener('click', () => {
    resetGame();
});

// Initialize the game
resetGame();
