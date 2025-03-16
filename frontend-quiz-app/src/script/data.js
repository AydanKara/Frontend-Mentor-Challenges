// This module is responsible for loading quiz data from data.json
export async function loadQuizData() {
    try {
      const response = await fetch("../data/data.json");
      const data = await response.json();
      return data.quizzes;
    } catch (error) {
      console.error("Error loading quiz data:", error);
      return null;
    }
  }
