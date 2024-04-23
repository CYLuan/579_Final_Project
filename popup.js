// timer
let isRunning = false;
let timerId = null;
let timeRemaining = 25 * 60; // 25 minutes
let pomodoroCount = 0;
// sound
let isMuted = false; // Correctly initialize isMuted in the global scope

const quotes = [
    "Don`t stop when you`re tired. Stop when you`re done.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Do something today that your future self will thank you for.",
    "Little things make big days.",
    "It`s going to be hard, but hard does not mean impossible.",
    "Don`t wait for opportunity. Create it."
];

// Timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(() => {
            timeRemaining--;
            updateTimerDisplay();
            if (timeRemaining <= 0) {
                clearInterval(timerId);
                pomodoroCount++;
                if (pomodoroCount % 4 === 0) {
                    timeRemaining = 15 * 60; // Long break after 4 Pomodoros
                } else {
                    timeRemaining = 5 * 60; // Short break
                }
                startTimer(); // Automatically start next session
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerId);
    timeRemaining = 25 * 60; // Reset to default 25 minutes
    updateTimerDisplay();
    isRunning = false;
    pomodoroCount = 0;
}

document.getElementById('durationSelector').addEventListener('change', function() {
    const newDuration = parseInt(this.value);
    if (newDuration > 0) {
        timeRemaining = newDuration * 60; // Convert minutes to seconds
        localStorage.setItem('pomodoroDuration', newDuration); // Save the duration to local storage
        updateTimerDisplay(); // Update the display immediately
    }
});

function updateTimerDisplay() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isRunning = false;
    const savedDuration = parseInt(localStorage.getItem('pomodoroDuration')) || 25; // Default to 25 minutes
    timeRemaining = savedDuration * 60;
    updateTimerDisplay();
}

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);

// Sound
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
    const icon = this.querySelector('i'); // Access the icon inside the button
    if (!isMuted) {
        player.pause();
        icon.className = 'fas fa-volume-mute'; 
        this.title = "Unmute"; 
        isMuted = true;
    } else {
        player.play();
        icon.className = 'fas fa-volume-up'; 
        this.title = "Mute"; 
        isMuted = false;
    }
});


// Quotes
function displayQuote() {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quote').textContent = quotes[quoteIndex];
}

function pad(value) {
    return value.toString().padStart(2, '0');
}


// Theme selector
document.getElementById('themeSelector').addEventListener('change', function() {
    const theme = this.value;
    applyTheme(theme);
});


function applyTheme(theme) {
    const body = document.body;
    // Remove all theme classes first to ensure only one is applied
    body.classList.remove('default-theme', 'library-theme', 'cafe-theme');
    // Add the selected theme class to the body
    switch (theme) {
        case 'library':
            body.classList.add('library-theme');
            break;
        case 'cafe':
            body.classList.add('cafe-theme');
            break;
        default:
            body.classList.add('default-theme');
            break;
    }
}


// Remember user preferences
// remember the selected theme
document.getElementById('themeSelector').addEventListener('change', function() {
    const selectedTheme = this.value;
    localStorage.setItem('selectedTheme', selectedTheme); // Save to local storage
    applyTheme(selectedTheme);
});

function applyTheme(theme) {
    document.body.className = ''; // Clear previous class
    document.body.classList.add(theme + '-theme'); // Apply new class
    // Additional theme application logic here...
}

// remember the selected sound
document.getElementById('soundSelector').addEventListener('change', function() {
    const selectedSound = this.value;
    localStorage.setItem('selectedSound', selectedSound); // Save to local storage
    playSound(selectedSound);
});

function playSound(sound) {
    const player = document.getElementById('audioPlayer');
    player.src = `sounds/${sound}.mp3`;
    player.play();
}

 
// reload the window
window.onload = function() {
    updateTimerDisplay();
    displayQuote();
    document.getElementById('audioPlayer').volume = 0.5; // Set a default volume
    // Initialize with the default theme
    applyTheme('default');
    // Reload user preferences
    const savedSound = localStorage.getItem('selectedSound');
    if (savedSound) {
        document.getElementById('soundSelector').value = savedSound;
        playSound(savedSound);
    }
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
    const savedDuration = parseInt(localStorage.getItem('pomodoroDuration')) || 25;
    document.getElementById('durationSelector').value = savedDuration; // Set the dropdown to the saved selection
    timeRemaining = savedDuration * 60; // Update time remaining based on saved duration
    updateTimerDisplay();
};





