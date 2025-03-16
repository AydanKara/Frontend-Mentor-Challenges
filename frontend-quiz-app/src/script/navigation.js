// This module handles keyboard navigation across different pages

// Initialize keyboard navigation by adding a global keydown listener
export function initKeyboardNavigation() {
  document.addEventListener("keydown", handleKeyboardNavigation);
}

// Main keyboard handler that delegates based on current page
function handleKeyboardNavigation(event) {
  const path = window.location.pathname;
  if (path.includes("index.html") || path.endsWith("/")) {
    handleStartMenuKeyboardNavigation(event);
  } else if (path.includes("quiz.html")) {
    handleQuizKeyboardNavigation(event);
  } else if (path.includes("completed.html")) {
    handleCompletedKeyboardNavigation(event);
  }
  // Always allow dark mode toggling
  handleDarkModeKeyboardNavigation(event);
}

// Keyboard navigation for the Start Menu page (subject selection)
function handleStartMenuKeyboardNavigation(event) {
  const quizButtons = document.querySelectorAll(".quiz-option");
  let active = document.querySelector(".quiz-option.active");

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    if (!active) {
      quizButtons[0].classList.add("active");
      quizButtons[0].focus();
    } else {
      let next = active.nextElementSibling;
      if (next && next.classList.contains("quiz-option")) {
        active.classList.remove("active");
        next.classList.add("active");
        next.focus();
      }
    }
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    if (!active) {
      quizButtons[quizButtons.length - 1].classList.add("active");
      quizButtons[quizButtons.length - 1].focus();
    } else {
      let prev = active.previousElementSibling;
      if (prev && prev.classList.contains("quiz-option")) {
        active.classList.remove("active");
        prev.classList.add("active");
        prev.focus();
      }
    }
  }

  // Trigger selection with Enter or Space
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (active) {
      active.click();
    }
  }
}

// Keyboard navigation for the Quiz page (answer selection & submit)
function handleQuizKeyboardNavigation(event) {
  const answerOptions = document.querySelectorAll(".answer-option");
  const submitButton = document.querySelector("#submit");
  let selected = document.querySelector(".answer-option.selected");

  if (!answerOptions.length) return;

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

  // Trigger answer submission with Enter or Space
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (selected) {
      // Here, you might want to either trigger answer selection or directly submit the answer.
      // For our case, we'll simulate clicking the submit button.
      submitButton.click();
    }
  }
}

// Keyboard navigation for the Completed page (Play Again button)
function handleCompletedKeyboardNavigation(event) {
  const playAgainButton = document.querySelector(".quiz-retry");
  // Ensure the button is focused to receive the event
  if (document.activeElement !== playAgainButton) {
    playAgainButton.focus();
  }
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    playAgainButton.click();
  }
}

// Allow toggling dark mode with D (for dark) and L (for light)
function handleDarkModeKeyboardNavigation(event) {
  const themeSwitch = document.getElementById("themeSwitch");
  if (event.key === "d" || event.key === "D") {
    event.preventDefault();
    if (!document.body.classList.contains("dark-mode")) {
      themeSwitch.click();
    }
  }
  if (event.key === "l" || event.key === "L") {
    event.preventDefault();
    if (document.body.classList.contains("dark-mode")) {
      themeSwitch.click();
    }
  }
}
