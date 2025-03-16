// This module handles all UI updates for the quiz app.

export function renderQuizHeader(quiz) {
  const quizTitleElement = document.querySelector("#quiz-title");
  quizTitleElement.innerHTML = `
      <img class="img-${quiz.title.toLowerCase()}" src=".${quiz.icon}" alt="${
    quiz.title
  } icon"/>
      ${quiz.title}
    `;
}

export function renderQuestion(question, questionIndex, totalQuestions) {
  // Update question number and text
  document.querySelector("#question-number").textContent = questionIndex + 1;
  document.querySelector("#question-text").textContent = question.question;

  // Update progress bar
  const progressBar = document.querySelector("#progress-bar");
  progressBar.max = totalQuestions;
  progressBar.value = questionIndex + 1;
}

export function renderAnswerOptions(question) {
  const answerButtons = document.querySelectorAll(".answer-option");
  answerButtons.forEach((button, index) => {
    // Remove previous event listeners by cloning (ensuring no duplicate events)
    const newButton = button.cloneNode(true);
    button.replaceWith(newButton);
    button = document.querySelectorAll(".answer-option")[index];

    // Create elements for the answer option
    const strongTag = document.createElement("strong");
    strongTag.textContent = String.fromCharCode(65 + index); // A, B, C, D

    const textNode = document.createTextNode(" " + question.options[index]);

    const imgTag = document.createElement("img");
    imgTag.id = "answer-icon";
    imgTag.src = "../assets/images/icon-incorrect.svg";
    imgTag.alt = "Answer Icon";

    // Clear button content and append new elements
    button.textContent = "";
    button.appendChild(strongTag);
    button.appendChild(textNode);
    button.appendChild(imgTag);

    // Set the answer as a data attribute
    button.dataset.answer = question.options[index];

    // Reset classes
    button.classList.remove("correct", "incorrect", "selected");
  });
}

export function selectAnswer(event) {
  const selectedOption = event.target.closest(".answer-option");
  if (!selectedOption) return;
  document
    .querySelectorAll(".answer-option")
    .forEach((btn) => btn.classList.remove("selected"));
  selectedOption.classList.add("selected");
}

export function showAnswerValidationMessage(visible = true) {
  const validationEl = document.querySelector("#answer-validation");
  validationEl.style.visibility = visible ? "visible" : "hidden";
}

export function updateSubmitButtonText(text) {
  const submitButton = document.querySelector("#submit");
  if (submitButton) {
    submitButton.textContent = text;
  }
}

export function updateFinalScore(finalScore) {
  const scoreElement = document.querySelector(".quiz-score");
  if (scoreElement) {
    scoreElement.textContent = finalScore;
  }
}
