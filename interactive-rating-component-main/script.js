document.addEventListener("DOMContentLoaded", () => {
  const ratingState = document.getElementById("rating-state");
  const thankYouState = document.getElementById("thank-you-state");
  const submitButton = document.getElementById("submit-btn");
  const ratingValueSpan = document.getElementById("rating-value");

  submitButton.addEventListener("click", () => {
    const selectedRating = document.querySelector(
      'input[name="rating"]:checked'
    );
    if (!selectedRating) {
      alert("Please select a rating before submitting.");
      return;
    }

    // Update the thank-you state with the selected rating
    ratingValueSpan.textContent = selectedRating.value;

    // Hide the rating state and show the thank-you state
    ratingState.hidden = true;
    thankYouState.hidden = false;
  });
});
