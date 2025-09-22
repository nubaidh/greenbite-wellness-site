// DOM Elements
const breathingText = document.getElementById("breathingText");
const startBtn = document.getElementById("startSession");
const pauseBtn = document.getElementById("pauseSession");
const timeRemaining = document.getElementById("timeRemaining");
const sessionInput = document.getElementById("sessionTime");
const progressCircle = document.getElementById("progressCircle");

const soundButtons = document.querySelectorAll(".sound-btn");
let currentSound = null;

// LocalStorage Elements
const completedSessions = document.getElementById("completedSessions");
const sessionList = document.getElementById("sessionList");

// Timer Variables
let timer = null;
let remainingSeconds = 0;
let inhale = true;
let circlePulseInterval = null;

// Circle Properties
const circumference = 2 * Math.PI * 80; // 2πr
progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;

// --- Breathing + Timer Combined ---
function startBreathingAnimation() {
  circlePulseInterval = setInterval(() => {
    inhale = !inhale;
    breathingText.textContent = inhale ? "Inhale" : "Exhale";
    const scale = inhale ? 1.2 : 1;
    progressCircle.style.transform = `scale(${scale})`;
  }, 4000);
}

function stopBreathingAnimation() {
  clearInterval(circlePulseInterval);
  progressCircle.style.transform = "scale(1)";
  breathingText.textContent = "Press Start";
}

// --- Timer Functions ---
function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2,'0');
  const s = String(sec % 60).padStart(2,'0');
  return `${m}:${s}`;
}

function updateCircleProgress() {
  const progress = ((sessionInput.value*60 - remainingSeconds)/(sessionInput.value*60)) * circumference;
  progressCircle.style.strokeDashoffset = circumference - progress;
}

function startSession() {
  remainingSeconds = sessionInput.value * 60;
  timeRemaining.textContent = formatTime(remainingSeconds);
  startBtn.disabled = true;
  pauseBtn.disabled = false;

  startBreathingAnimation();

  timer = setInterval(() => {
    remainingSeconds--;
    timeRemaining.textContent = formatTime(remainingSeconds);
    updateCircleProgress();

    if (remainingSeconds <= 0) {
      clearInterval(timer);
      timer = null;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      timeRemaining.textContent = "00:00";
      stopBreathingAnimation();
      alert("Session complete!");
      saveSession();
      progressCircle.style.strokeDashoffset = circumference;
    }
  }, 1000);
}

function pauseSessionFunc() {
  if (timer) {
    clearInterval(timer);
    clearInterval(circlePulseInterval);
    timer = null;
    circlePulseInterval = null;
    pauseBtn.textContent = "Resume";
  } else {
    startBreathingAnimation();
    pauseBtn.textContent = "Pause";
    timer = setInterval(() => {
      remainingSeconds--;
      timeRemaining.textContent = formatTime(remainingSeconds);
      updateCircleProgress();

      if (remainingSeconds <= 0) {
        clearInterval(timer);
        timer = null;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        timeRemaining.textContent = "00:00";
        stopBreathingAnimation();
        alert("Session complete!");
        saveSession();
        progressCircle.style.strokeDashoffset = circumference;
      }
    }, 1000);
  }
}

function loadSessions() {
  const sessions = JSON.parse(localStorage.getItem("mindfulnessSessions")) || [];
  completedSessions.textContent = sessions.length;
  sessionList.innerHTML = "";
  sessions.forEach((s,i) => {
    const li = document.createElement("li");
    li.textContent = `Session ${i+1} - ${s} minutes`;
    sessionList.appendChild(li);
  });
}

function saveSession() {
  const sessions = JSON.parse(localStorage.getItem("mindfulnessSessions")) || [];
  sessions.push(sessionInput.value);
  localStorage.setItem("mindfulnessSessions", JSON.stringify(sessions));
  loadSessions();
}

startBtn.addEventListener("click", startSession);
pauseBtn.addEventListener("click", pauseSessionFunc);

loadSessions();