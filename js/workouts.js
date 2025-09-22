const workouts = [
  { name: "Push-ups", bodyPart: "arms", equipment: "none", duration: 30 },
  { name: "Tricep Dips", bodyPart: "arms", equipment: "none", duration: 30 },
  { name: "Bicep Curls", bodyPart: "arms", equipment: "dumbbells", duration: 30 },
  { name: "Shoulder Press", bodyPart: "arms", equipment: "dumbbells", duration: 35 },
  { name: "Squats", bodyPart: "legs", equipment: "none", duration: 40 },
  { name: "Lunges", bodyPart: "legs", equipment: "none", duration: 40 },
  { name: "Glute Bridges", bodyPart: "legs", equipment: "none", duration: 35 },
  { name: "Dumbbell Deadlift", bodyPart: "legs", equipment: "dumbbells", duration: 45 },
  { name: "Plank", bodyPart: "core", equipment: "none", duration: 60 },
  { name: "Crunches", bodyPart: "core", equipment: "none", duration: 30 },
  { name: "Russian Twists", bodyPart: "core", equipment: "dumbbells", duration: 40 },
  { name: "Leg Raises", bodyPart: "core", equipment: "none", duration: 35 },
  { name: "Burpees", bodyPart: "full-body", equipment: "none", duration: 45 },
  { name: "Mountain Climbers", bodyPart: "full-body", equipment: "none", duration: 40 },
  { name: "Dumbbell Thrusters", bodyPart: "full-body", equipment: "dumbbells", duration: 50 },
  { name: "Kettlebell Swings", bodyPart: "full-body", equipment: "kettlebell", duration: 50 },
  { name: "Chest Press", bodyPart: "chest", equipment: "dumbbells", duration: 35 },
  { name: "Push-ups Wide", bodyPart: "chest", equipment: "none", duration: 35 },
  { name: "Bent-over Rows", bodyPart: "back", equipment: "dumbbells", duration: 35 },
  { name: "Superman", bodyPart: "back", equipment: "none", duration: 30 },
  { name: "Lateral Raises", bodyPart: "shoulders", equipment: "dumbbells", duration: 30 },
  { name: "Front Raises", bodyPart: "shoulders", equipment: "dumbbells", duration: 30 },
  { name: "Jump Rope", bodyPart: "full-body", equipment: "rope", duration: 60 },
  { name: "Treadmill Run", bodyPart: "legs", equipment: "treadmill", duration: 300 },
  { name: "Stationary Bike", bodyPart: "legs", equipment: "bike", duration: 300 }
];

// DOM
const workoutForm = document.getElementById("workoutForm");
const bodyPartSelect = document.getElementById("bodyPart");
const equipmentSelect = document.getElementById("equipment");
const workoutResults = document.getElementById("workoutResults");

let currentTimer = null;
let currentWorkout = null;
let remainingTime = 0;

// Generate Workout
workoutForm.addEventListener("submit", function(e) {
  e.preventDefault();
  workoutResults.innerHTML = "";

  const bodyPart = bodyPartSelect.value;
  const equipment = equipmentSelect.value;

  const filtered = workouts.filter(w => {
    const bodyMatch = bodyPart === "full-body" ? w.bodyPart === "full-body" : w.bodyPart === bodyPart;
    const equipMatch = equipment === "all" || w.equipment === equipment;
    return bodyMatch && equipMatch;
  });

  if (filtered.length === 0) {
    workoutResults.innerHTML = "<p>No workouts found for this selection.</p>";
    return;
  }

  filtered.forEach(w => {
    const safeName = w.name.replace(/\s+/g,'');
    const workoutDiv = document.createElement("div");
    workoutDiv.classList.add("result-card");
    workoutDiv.innerHTML = `
      <h3>${w.name}</h3>
      <p>Duration: <span id="time-${safeName}">${w.duration}</span> sec</p>
      <div class="countdown-bar"><div id="bar-${safeName}" class="fill-bar"></div></div>
      <button id="start-${safeName}">Start</button>
      <button id="pause-${safeName}" disabled>Pause</button>
    `;
    workoutResults.appendChild(workoutDiv);

    const startBtn = document.getElementById(`start-${safeName}`);
    const pauseBtn = document.getElementById(`pause-${safeName}`);
    const timeDisplay = document.getElementById(`time-${safeName}`);
    const bar = document.getElementById(`bar-${safeName}`);

    startBtn.addEventListener("click", () => {
      if (currentTimer) clearInterval(currentTimer);
      if (currentWorkout && currentWorkout !== safeName) {
        resetWorkout(currentWorkout);
      }

      currentWorkout = safeName;
      remainingTime = w.duration;
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      bar.style.width = "0%";

      currentTimer = setInterval(() => updateTimer(w, timeDisplay, bar, startBtn, pauseBtn), 1000);
    });

    pauseBtn.addEventListener("click", () => {
      if (currentTimer) {
        clearInterval(currentTimer);
        currentTimer = null;
        pauseBtn.textContent = "Resume";
      } else {
        pauseBtn.textContent = "Pause";
        currentTimer = setInterval(() => updateTimer(w, timeDisplay, bar, startBtn, pauseBtn), 1000);
      }
    });
  });
});

// Helper functions
function updateTimer(w, timeDisplay, bar, startBtn, pauseBtn) {
  remainingTime--;
  timeDisplay.textContent = remainingTime;
  const progress = ((w.duration - remainingTime) / w.duration) * 100;
  bar.style.width = `${progress}%`;

  if (remainingTime <= 0) {
    clearInterval(currentTimer);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = "Pause";
    alert(`${w.name} complete!`);
  }
}

function resetWorkout(safeName) {
  document.getElementById(`start-${safeName}`).disabled = false;
  document.getElementById(`pause-${safeName}`).disabled = true;
  document.getElementById(`bar-${safeName}`).style.width = "0%";
  const workoutObj = workouts.find(x => x.name.replace(/\s+/g,'')===safeName);
  document.getElementById(`time-${safeName}`).textContent = workoutObj.duration;
}