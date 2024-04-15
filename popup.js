let timer = null;
let seconds = 0;
let isPaused = false;
let isMuted = false; // Correctly initialize isMuted in the global scope

const quotes = [
    "Don`t stop when you`re tired. Stop when you`re done.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Do something today that your future self will thank you for.",
    "Little things make big days.",
    "It`s going to be hard, but hard does not mean impossible.",
    "Don`t wait for opportunity. Create it."
];

function startTimer() {
    if (timer === null) {
        timer = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    if (!isPaused) {
        clearInterval(timer);
        timer = null;
        isPaused = true;
    } else {
        startTimer();
        isPaused = false;
    }
}

function restartTimer() {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    document.getElementById('timer').textContent = '00:00:00';
    startTimer(); // Automatically start the timer again or remove this line to not start automatically
}

function updateTimer() {
    seconds++;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - (hours * 3600)) / 60);
    const secs = seconds % 60;
    document.getElementById('timer').textContent = 
        pad(hours) + ':' + pad(minutes) + ':' + pad(secs);
}

document.getElementById('soundSelector').addEventListener('change', function() {
    const sound = this.value;
    const player = document.getElementById('audioPlayer');
    player.src = `sounds/${sound}.mp3`;
    if (!isMuted) {
        player.play();
    }
});

document.getElementById('muteButton').addEventListener('click', function() {
    const player = document.getElementById('audioPlayer');
    if (!isMuted) {
        player.pause();
        this.textContent = "Unmute";
        isMuted = true;
    } else {
        player.play();
        this.textContent = "Mute";
        isMuted = false;
    }
});

function displayQuote() {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quote').textContent = quotes[quoteIndex];
}

function pad(value) {
    return value.toString().padStart(2, '0');
}
window.onload = () => {
    displayQuote();
    document.getElementById('audioPlayer').volume = 0.5; // Set a default volume
};


document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);
document.getElementById('restartButton').addEventListener('click', restartTimer);
window.onload = displayQuote; // Display a random quote when the popup opens
