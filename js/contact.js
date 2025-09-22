const contactForm = document.getElementById("contactForm");
const confirmation = document.getElementById("confirmation");

// Load from localStorage
function loadFeedback() {
  const feedbacks = JSON.parse(localStorage.getItem("greenBiteFeedback")) || [];
  return feedbacks;
}

// Save to localStorage
function saveFeedback(name, email, message) {
  const feedbacks = loadFeedback();
  feedbacks.push({ name, email, message, date: new Date().toLocaleString() });
  localStorage.setItem("greenBiteFeedback", JSON.stringify(feedbacks));
}

contactForm.addEventListener("submit", function(e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("Please enter a valid email address.");
    return;
  }

  saveFeedback(name, email, message);

  confirmation.textContent = "Thank you! Your message has been submitted.";
  contactForm.reset();

  setTimeout(() => { confirmation.textContent = ""; }, 5000);
});

const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach(q => {
  q.addEventListener("click", () => {
    const answer = q.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});