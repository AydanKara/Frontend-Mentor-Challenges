let quizData = {};
let currentQuiz = {};
let currentQuestionIndex = 0;
let userScore = 0;

// Fetch data from data.json
async function loadQuizData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    quizData = data.quizzes;
  } catch (error) {
    console.error("Error loading quiz data:", error);
  }
}

// Initialize the quiz app
async function init() {
  await loadQuizData();
  setupEventListeners();
}
document.addEventListener("DOMContentLoaded", init);

/* Handle Quiz Selection (Index Page) */
function setupEventListeners() {
  const quizButtons = document.querySelectorAll(".quiz-option");
  quizButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedSubject = button.dataset.subject;
      localStorage.setItem("selectedQuiz", selectedSubject);
      window.location.href = "quiz.html";
    });
  });
}

/* Ensure loadSelectedQuiz() Runs on quiz.html */
document.addEventListener("DOMContentLoaded", async function () {
  if (window.location.pathname.includes("quiz.html")) {
    await loadQuizData(); // Ensure quiz data is loaded before using it
    loadSelectedQuiz();
  }
});

/* Load Selected Quiz in quiz.html */
function loadSelectedQuiz() {
  const selectedQuizTitle = localStorage.getItem("selectedQuiz");
  currentQuiz = quizData.find(
    (quiz) => quiz.title.toLowerCase() === selectedQuizTitle
  );

  if (!currentQuiz) {
    window.location.href = "index.html";
    return;
  }

  document.querySelector("#quiz-title").innerHTML = `
        <img class="img-${currentQuiz.title.toLowerCase()}" src="${
    currentQuiz.icon
  }" alt="${currentQuiz.title} icon"/>
        ${currentQuiz.title}
    `;

  loadQuestion();
}

/* Load a Question */
function loadQuestion() {
  const questionData = currentQuiz.questions[currentQuestionIndex];
  document.querySelector("#question-number").textContent =
    currentQuestionIndex + 1;
  document.querySelector("#question-text").textContent = questionData.question;
  document.querySelector("#progress-bar").max = currentQuiz.questions.length;
  document.querySelector("#progress-bar").value = currentQuestionIndex;

  const answerButtons = document.querySelectorAll(".answer-option");
  answerButtons.forEach((button, index) => {
    if (index === answerButtons.length - 1) return; // Skip the last button

    // Clear previous event listeners
    button.replaceWith(button.cloneNode(true));
    button = document.querySelectorAll(".answer-option")[index];

    // Create a strong element for the letter (A, B, C, D)
    const strongTag = document.createElement("strong");
    strongTag.textContent = String.fromCharCode(65 + index); // A, B, C, D

    // Create a text node for the question option (handles HTML tags as plain text)
    const textNode = document.createTextNode(" " + questionData.options[index]);

    // Create an image element for the answer icon
    const imgTag = document.createElement("img");
    imgTag.id = "answer-icon";
    imgTag.src = "./assets/images/icon-incorrect.svg";
    imgTag.alt = "Answer Icon";

    // Clear button content and append elements safely
    button.textContent = ""; // Clears previous content
    button.appendChild(strongTag);
    button.appendChild(textNode);
    button.appendChild(imgTag);

    // Set the answer as a data attribute
    button.dataset.answer = questionData.options[index];

    // Reset styles
    button.classList.remove("correct", "incorrect", "selected");

    // Add event listener
    button.addEventListener("click", selectAnswer);
  });
}

/* Handle Answer Selection */
function selectAnswer(event) {
  const selectedOption = event.target;
  document
    .querySelectorAll(".answer-option")
    .forEach((btn) => btn.classList.remove("selected"));
  selectedOption.classList.add("selected");
}

/* Submit Answer and Show Feedback */
function submitAnswer() {
  const selectedOption = document.querySelector(".answer-option.selected");

  if (!selectedOption) {
    document.querySelector("#answer-validation").style.visibility = "visible";
    return;
  }

  document.querySelector("#answer-validation").style.visibility = "hidden";
  console.log(selectedOption);
  const correctAnswer = currentQuiz.questions[currentQuestionIndex].answer;
  if (selectedOption.dataset.answer === correctAnswer) {
    selectedOption.classList.add("correct");
    selectedOption.firstChild.classList.add("correct");
    selectedOption.lastChild.src = "./assets/images/icon-correct.svg";
    selectedOption.lastChild.style.visibility = "visible";
    userScore++;
  } else {
    selectedOption.classList.add("incorrect");
    selectedOption.firstChild.classList.add("incorrect");
    selectedOption.lastChild.src = "./assets/images/icon-incorrect.svg";
    selectedOption.lastChild.style.visibility = "visible";
  }

  setTimeout(nextQuestion, 1000);
}
const submitButton = document.querySelector(".submit");
if (submitButton) {
  submitButton.addEventListener("click", submitAnswer);
} else {
  console.warn("Submit button not found on this page.");
}

/* Move to Next Question */
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuiz.questions.length) {
    loadQuestion();
  } else {
    localStorage.setItem("finalScore", userScore);
    window.location.href = "completed.html";
  }
}

/* Show Final Score (Complete Page) */
function showFinalScore() {
  const selectedQuizTitle = localStorage.getItem("selectedQuiz");

  document.querySelectorAll("#quiz-title").forEach((quizTitle) => {
    quizTitle.innerHTML = `
    <img class="img-${selectedQuizTitle.toLowerCase()}" 
    src="./assets/images/icon-${selectedQuizTitle}.svg" 
    alt="${selectedQuizTitle} icon"/>
    ${selectedQuizTitle.toUpperCase()}
    `;
  });

  const finalScore = localStorage.getItem("finalScore");
  if (finalScore) {
    document.querySelector(".quiz-score").textContent = finalScore;
  }
}

document.addEventListener("DOMContentLoaded", showFinalScore);

/* Retry Quiz */
const quizRetry = document.querySelector(".quiz-retry");
if (quizRetry) {
  quizRetry.addEventListener("click", () => {
    window.location.href = "index.html";
  });
} else {
  console.warn("Button not found on this page.");
}

/* Implement Dark Mode Toggle */
const themeSwitch = document.getElementById("themeSwitch");
const body = document.body;

themeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  localStorage.setItem(
    "theme",
    body.classList.contains("dark-mode") ? "dark" : "light"
  );
});

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
  }
});
