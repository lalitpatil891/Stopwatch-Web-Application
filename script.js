let startTime;
let updatedTime;
let difference;
let timerId;
let isRunning = false;
let laps = [];
let lapCount = 0;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.querySelector('.display');
const lapsContainer = document.querySelector('.laps');

function startStop() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        timerId = setInterval(updateDisplay, 1000 / 60);
        startStopBtn.textContent = 'Stop';
        isRunning = true;
    } else {
        clearInterval(timerId);
        difference = new Date().getTime() - startTime;
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerId);
    startTime = null;
    difference = 0;
    isRunning = false;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    laps = [];
    lapCount = 0;
    lapsContainer.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = difference;
        laps.push(lapTime);
        lapCount++;
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.textContent = `Lap ${lapCount}: ${formatTime(lapTime)}`;
        lapsContainer.appendChild(lapElement);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = ('0' + date.getUTCMinutes()).slice(-2);
    const seconds = ('0' + date.getUTCSeconds()).slice(-2);
    const milliseconds = ('0' + Math.floor(date.getUTCMilliseconds() / 10)).slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
