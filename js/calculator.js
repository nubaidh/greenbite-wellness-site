const form = document.getElementById("calculatorForm");
const resultsDiv = document.getElementById("results");
const bmrResult = document.getElementById("bmrResult");
const tdeeResult = document.getElementById("tdeeResult");
const carbsResult = document.getElementById("carbsResult");
const proteinResult = document.getElementById("proteinResult");
const fatResult = document.getElementById("fatResult");

const carbsBar = document.getElementById("carbsBar");
const proteinBar = document.getElementById("proteinBar");
const fatBar = document.getElementById("fatBar");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const height = parseInt(document.getElementById("height").value);
  const weight = parseInt(document.getElementById("weight").value);
  const activity = parseFloat(document.getElementById("activity").value);

  // calculation
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // tdee Calculation
  const tdee = bmr * activity;

  // macronutrients
  const carbs = Math.round((tdee * 0.5) / 4);
  const protein = Math.round((tdee * 0.2) / 4);
  const fat = Math.round((tdee * 0.3) / 9);

  bmrResult.textContent = Math.round(bmr);
  tdeeResult.textContent = Math.round(tdee);
  carbsResult.textContent = carbs;
  proteinResult.textContent = protein;
  fatResult.textContent = fat;

  resultsDiv.style.display = "block";

  const maxCarbs = Math.round((tdee * 0.5) / 4);
  const maxProtein = Math.round((tdee * 0.2) / 4);
  const maxFat = Math.round((tdee * 0.3) / 9);

  carbsBar.style.width = (carbs / maxCarbs * 100) + "%";
  proteinBar.style.width = (protein / maxProtein * 100) + "%";
  fatBar.style.width = (fat / maxFat * 100) + "%";
});