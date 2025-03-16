import { loadQuizData } from "./data.js";
import {
  renderQuizHeader,
  renderQuestion,
  renderAnswerOptions,
  selectAnswer,
  updateFinalScore,
} from "./ui.js";
import { initKeyboardNavigation } from "./navigation.js";

/**
 * Entry point for the quiz app.
 * This function determines which page is active and calls the appropriate initialization logic.
 */

let quizData = {};
let currentQuiz = {};
let currentQuestionIndex = 0;
let userScore = 0;

/* Dark Mode Toggle constants */
const themeSwitch = document.getElementById("themeSwitch");
const body = document.body;
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");

themeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  localStorage.setItem(
    "theme",
    body.classList.contains("dark-mode") ? "dark" : "light"
  );

  // Update icons dynamically
  if (body.classList.contains("dark-mode")) {
    sunIcon.src = "../assets/images/icon-sun-light.svg";
    moonIcon.src = "../assets/images/icon-moon-light.svg";
  } else {
    sunIcon.src = "../assets/images/icon-sun-dark.svg";
    moonIcon.src = "../assets/images/icon-moon-dark.svg";
  }
});

async function initApp() {
  // Initialize keyboard navigation for the entire app
  initKeyboardNavigation();

  // Set dark mode at the beginning
  localStorage.setItem("theme", "dark");

  const path = window.location.pathname;

  // Check which page is active and initialize accordingly
  if (path.includes("index.html") || path.endsWith("/")) {
    initStartMenu();
  } else if (path.includes("quiz.html")) {
    await initQuizPage();
  } else if (path.includes("completed.html")) {
    initCompletedPage();
  }

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    sunIcon.src = "../assets/images/icon-sun-light.svg";
    moonIcon.src = "../assets/images/icon-moon-light.svg";
  } else {
    body.classList.remove("dark-mode");
    sunIcon.src = "../assets/images/icon-sun-dark.svg";
    moonIcon.src = "../assets/images/icon-moon-dark.svg";
  }
}

// Start the app once DOM is loaded
document.addEventListener("DOMContentLoaded", initApp);

/* --------------------- Start Menu Initialization --------------------- */
/**
 * Initializes the Start Menu page:
 * - Attaches event listeners to quiz subject buttons.
 */
function initStartMenu() {
  const quizButtons = document.querySelectorAll(".quiz-option");
  quizButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedSubject = button.dataset.subject;
      localStorage.setItem("selectedQuiz", selectedSubject);
      window.location.href = "quiz.html";
    });
    // Optionally, add keyboard event listeners here if needed.
  });
}

/* --------------------- Quiz Page Initialization --------------------- */
/**
 * Initializes the Quiz page:
 * - Loads quiz data,
 * - Finds the selected quiz from localStorage,
 * - Renders the quiz header and first question.
 */
async function initQuizPage() {
  quizData = await loadQuizData();
  const selectedQuizTitle = localStorage.getItem("selectedQuiz");
  currentQuiz = quizData.find(
    (quiz) => quiz.title.toLowerCase() === selectedQuizTitle
  );

  // Redirect back if quiz is not found
  if (!currentQuiz) {
    window.location.href = "index.html";
    return;
  }

  // Render header (quiz title and icon)
  renderQuizHeader(currentQuiz);

  // Render the first question
  loadCurrentQuestion();
}

/**
 * Loads and renders the current question from the quiz state.
 */
function loadCurrentQuestion() {
  const questionData = currentQuiz.questions[currentQuestionIndex];

  // Render the question text and update progress (using UI functions)
  renderQuestion(
    questionData,
    currentQuestionIndex,
    currentQuiz.questions.length
  );

  // Render the answer options for the question
  renderAnswerOptions(questionData);

  // Attach event listeners for answers selection:
  const answerButtons = document.querySelectorAll(".answer-option");
  answerButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      selectAnswer(event);
    });
  });
}

// Attach event listener for submitting the answer
const submitButton = document.getElementById("submit");
if (submitButton) {
  submitButton.addEventListener("click", submitAnswer);
}

function submitAnswer() {
  const selectedOption = document.querySelector(".answer-option.selected");

  if (!selectedOption) {
    document.querySelector("#answer-validation").style.visibility = "visible";
    return;
  }

  document.querySelector("#answer-validation").style.visibility = "hidden";

  const correctAnswer = currentQuiz.questions[currentQuestionIndex].answer;
  if (selectedOption.dataset.answer === correctAnswer) {
    selectedOption.classList.add("correct");
    selectedOption.firstChild.classList.add("correct");
    selectedOption.lastChild.src = "../assets/images/icon-correct.svg";
    selectedOption.lastChild.style.visibility = "visible";
    userScore++;
  } else {
    selectedOption.classList.add("incorrect");
    selectedOption.firstChild.classList.add("incorrect");
    selectedOption.lastChild.src = "../assets/images/icon-incorrect.svg";
    selectedOption.lastChild.style.visibility = "visible";
  }
  submitButton.textContent = "Next Question";
  setTimeout(nextQuestion, 1000);
}

/* Move to Next Question */
function nextQuestion() {
  submitButton.textContent = "Submit Answer";
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuiz.questions.length) {
    loadCurrentQuestion();
  } else {
    localStorage.setItem("finalScore", userScore);
    window.location.href = "completed.html";
  }
}

/* --------------------- Completed Page Initialization --------------------- */
/**
 * Initializes the Completed page:
 * - Shows the quiz title,
 * - Retrieves the final score from localStorage,
 * - Updates the UI with the final score,
 * - Sets up the "Play Again" button.
 */
function initCompletedPage() {
  showQuizTitle();
  const finalScore = localStorage.getItem("finalScore");
  if (finalScore) {
    updateFinalScore(finalScore);
  }

  const retryButton = document.querySelector(".quiz-retry");
  if (retryButton) {
    retryButton.addEventListener("click", () => {
      localStorage.removeItem("finalScore");
      localStorage.removeItem("selectedQuiz");
      window.location.href = "index.html";
    });
  }
}

function showQuizTitle() {
  const selectedQuizTitle = localStorage.getItem("selectedQuiz");

  document.querySelectorAll("#quiz-title").forEach((quizTitle) => {
    quizTitle.innerHTML = `
    <img class="img-${selectedQuizTitle.toLowerCase()}" 
    src="../assets/images/icon-${selectedQuizTitle}.svg" 
    alt="${selectedQuizTitle} icon"/>
    ${selectedQuizTitle.toUpperCase()}
    `;
  });
}
