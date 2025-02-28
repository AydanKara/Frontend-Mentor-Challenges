document.addEventListener("DOMContentLoaded", () => {
  const timeFrameButtons = document.querySelectorAll(".tabs-list-item");
  const timeCards = document.querySelectorAll(".card:not(.card-profile)");

  // Fetch data
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      updateUI(data, "weekly"); // Default view: Weekly

      // Add click event to each tab
      timeFrameButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Remove "active" class from all and add to the clicked one
          timeFrameButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");

          // Update UI with new timeframe
          updateUI(data, button.dataset.id);
        });
      });
    })
    .catch((error) => console.error("Error loading JSON file", error));

  function updateUI(data, timeframe) {
    timeCards.forEach((card) => {
      const title = card.querySelector(".timeframes-title").textContent;
      const timeframeData = data.find((item) => item.title === title)
        .timeframes[timeframe];

      card.querySelector(
        ".timeframes-info h3"
      ).textContent = `${timeframeData.current}hrs`;
      card.querySelector(
        ".timeframes-previous p:nth-child(3)"
      ).textContent = `${timeframeData.previous}hrs`;

      // Adjust previous timeframe label
      const previousLabel = card.querySelector(
        ".timeframes-previous p:first-child"
      );
      previousLabel.textContent =
        timeframe === "daily"
          ? "Yesterday"
          : timeframe === "weekly"
          ? "Last Week"
          : "Last Month";
    });
  }
});
