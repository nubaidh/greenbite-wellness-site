// Rotating slogans
const slogans = [
  "Eat Well, Live Well",
  "Healthy Mind, Healthy Body",
  "Fuel Your Life with Good Food",
  "Wellness Starts Here"
];
let sloganIndex = 0;
const heroText = document.getElementById("heroText");
setInterval(() => {
  sloganIndex = (sloganIndex + 1) % slogans.length;
  heroText.textContent = slogans[sloganIndex];
}, 3000);

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});


const newsletterForm = document.getElementById("newsletterForm");
newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  if (email) {
    localStorage.setItem("newsletterEmail", email);
    alert("Thank you for subscribing!");
    newsletterForm.reset();
  }
});

// Daily health tips
const dailyTips = [
  "Drink at least 8 glasses of water a day.",
  "Take a 10-minute walk after lunch to improve digestion.",
  "Include more leafy greens in your diet.",
  "Try to sleep 7-8 hours for better recovery.",
  "Practice mindful breathing for 5 minutes daily.",
  "Limit your screen time before sleep.",
  "Try cooking a new healthy recipe."
];

const tipText = document.getElementById("tipText");

const day = new Date().getDay();
tipText.textContent = dailyTips[day % dailyTips.length];

let tipIndex = (day + 1) % dailyTips.length;

function showTip() {
  tipText.classList.add("fade-out");
  setTimeout(() => {
    tipText.textContent = dailyTips[tipIndex];
    tipText.classList.remove("fade-out");
    tipText.classList.add("fade-in");
    tipIndex = (tipIndex + 1) % dailyTips.length;
  }, 500);
}

// Rotate every 3 seconds
setInterval(showTip, 3000);