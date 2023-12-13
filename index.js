let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let milli=0;
let lapTimes = [];

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 1;
const display =document.getElementById('display');
const startBut =document.getElementById('start-time');
const pauseBut=document.getElementById('pause-time');
const reBut=document.getElementById('reset-time');
const lapList = document.getElementById('lapList');
const lapBut=document.getElementById("lap-time");
function saveData() {
    localStorage.setItem('lapCounter', lapCounter);
    localStorage.setItem('lapList', lapList.innerHTML);
    localStorage.setItem('elapsedTime', elapsedTime);
}
function loadData() {
    lapCounter = parseInt(localStorage.getItem('lapCounter')) || 1;
    lapList.innerHTML = localStorage.getItem('lapList') || '';
    elapsedTime = parseInt(localStorage.getItem('elapsedTime')) || 0;
    timer.textContent = formatTimer(elapsedTime);
}
loadData();
function startStopwatch() {
    if (!isRunning) {
        timer = setInterval(updateTime, 10);
        isRunning = true;
    }
    startBut.disabled=true;
    pauseBut.disabled=false;
    lapBut.disabled=false;
}
function pauseStopwatch() {
    clearInterval(timer);
    isRunning = false;
    startBut.disabled=false;
    pauseBut.disabled=true;
}
function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    milli=0;
    updateDisplay();
    lapTimes = [];
    updateLapList();
    startBut.disabled=false;
    lapBut.disabled=true;
}
function updateTime() {
    milli++;

    if (milli === 100) {
        milli = 0;
        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;

            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    updateDisplay();
}
function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milli)}`;
}
function formatMilliseconds(ms) {
    return ms < 10 ? `0${ms}` : ms < 100 ? `${ms}` : ms;
}
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
function lapTime() {
    const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milli)}`;
    lapTimes.push(lapTime);
    updateLapList();
}
function updateLapList() {
    const lapList = document.getElementById('lapList');
    lapList.innerHTML = "";
    lapTimes.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapList.appendChild(li);
    });
}