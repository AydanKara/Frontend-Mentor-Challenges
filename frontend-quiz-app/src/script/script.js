/* 
* This file is the first variant of the javascript file for the quiz app.
* It contains the main logic for the quiz app, including loading quiz data,
 * handling quiz selection, question display, and user interaction.
 * It also includes the logic for the completed page and dark mode toggle.
 * The code is not modularized and contains a mix of UI and logic.
 * The code is not organized into functions or modules, making it difficult to read and maintain.
 * The code is not reusable and does not follow best practices for separation of concerns.
 * The code is not structured for scalability and may be difficult to extend or modify in the future.
*/

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
      handleQuizSelection(button);
    });
  });
}

function handleQuizSelection(button) {
  const selectedSubject = button.dataset.subject;
  localStorage.setItem("selectedQuiz", selectedSubject);
  window.location.href = "quiz.html";
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
  const progressBar = document.querySelector("#progress-bar");
  const questionData = currentQuiz.questions[currentQuestionIndex];
  document.querySelector("#question-number").textContent =
    currentQuestionIndex + 1;
  document.querySelector("#question-text").textContent = questionData.question;
  progressBar.max = currentQuiz.questions.length;
  progressBar.value = currentQuestionIndex + 1;

  const answerButtons = document.querySelectorAll(".answer-option");
  answerButtons.forEach((button, index) => {
    // Clear previous event listeners
    const newButton = button.cloneNode(true);
    button.replaceWith(newButton);
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
  const selectedOption = event.target.closest(".answer-option");
  if (!selectedOption) return;
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
  submitButton.textContent = "Next Question";
  setTimeout(nextQuestion, 1000);
}
const submitButton = document.querySelector("#submit");
if (submitButton) {
  submitButton.addEventListener("click", submitAnswer);
} else {
  console.warn("Submit button not found on this page.");
}

/* Move to Next Question */
function nextQuestion() {
  submitButton.textContent = "Submit Answer";
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
    localStorage.removeItem("finalScore");
    localStorage.removeItem("selectedQuiz");
    window.location.href = "index.html";
  });
} else {
  console.warn("Button not found on this page.");
}

/* Implement Dark Mode Toggle */
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
    sunIcon.src = "./assets/images/icon-sun-light.svg";
    moonIcon.src = "./assets/images/icon-moon-light.svg";
  } else {
    sunIcon.src = "./assets/images/icon-sun-dark.svg";
    moonIcon.src = "./assets/images/icon-moon-dark.svg";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
});

// Keyboard navigation
document.addEventListener("keydown", handleKeyboardNavigation);

function handleKeyboardNavigation(event) {
  if (window.location.pathname.includes("index.html")) {
    handleStartMenuKeyboardNavigation(event);
  } else if (window.location.pathname.includes("quiz.html")) {
    handleQuizKeyboardNavigation(event);
  } else if (window.location.pathname.includes("completed.html")) {
    handleCompletedKeyboardNavigation(event);
  }

  function handleStartMenuKeyboardNavigation(event) {
    const quizButtons = document.querySelectorAll(".quiz-option");
    let active = document.querySelector(".quiz-option.active");
    // Move selection with Arrow Keys
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      if (!active) {
        quizButtons[0].classList.add("active");
      } else {
        let next = active.nextElementSibling;
        if (next && next.classList.contains("quiz-option")) {
          active.classList.remove("active");
          next.classList.add("active");
        }
      }
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!active) {
        quizButtons[quizButtons.length - 1].classList.add("active");
      } else {
        let prev = active.previousElementSibling;
        if (prev && prev.classList.contains("quiz-option")) {
          active.classList.remove("active");
          prev.classList.add("active");
        }
      }
    }

    // Select Subject with Enter or Space
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (active) {
        handleQuizSelection(active);
      }
    }
  }

  function handleQuizKeyboardNavigation(event) {
    const answerOptions = document.querySelectorAll(".answer-option");
    const submitButton = document.querySelector("#submit");
    let selected = document.querySelector(".answer-option.selected");

    // Move selection with Arrow Keys
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      if (!selected) {
        answerOptions[0].classList.add("selected");
      } else {
        let next = selected.nextElementSibling;
        if (next && next.classList.contains("answer-option")) {
          selected.classList.remove("selected");
          next.classList.add("selected");
        }
      }
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!selected) {
        answerOptions[answerOptions.length - 1].classList.add("selected");
      } else {
        let prev = selected.previousElementSibling;
        if (prev && prev.classList.contains("answer-option")) {
          selected.classList.remove("selected");
          prev.classList.add("selected");
        }
      }
    }

    // Select Answer with Enter or Space
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (selected) {
        submitAnswer();
      } else if (!selected || submitButton) {
        submitButton.click();
      }
    }
  }

  function handleCompletedKeyboardNavigation(event) {
    const playAgainButton = document.querySelector(".quiz-retry");
    let active = document.querySelector(".quiz-retry.active");

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      if (!active) {
        playAgainButton.classList.add("active");
      } else {
        playAgainButton.classList.remove("active");
      }
    }

    // Select Play Again Button with Enter or Space
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (active) {
        localStorage.removeItem("finalScore");
        localStorage.removeItem("selectedQuiz");
        window.location.href = "index.html";
      }
    }
  }

  function handleDarkModeKeyboardNavigation(event) {
    if (event.key === "d" || event.key === "D") {
      event.preventDefault();
      if (body.classList.contains("dark-mode")) {
        return;
      } else {
        themeSwitch.click();
      }
    }
    if (event.key === "l" || event.key === "L") {
      event.preventDefault();
      if (body.classList.contains("dark-mode")) {
        themeSwitch.click();
      } else {
        return;
      }
    }
  }

  handleDarkModeKeyboardNavigation(event);
}
