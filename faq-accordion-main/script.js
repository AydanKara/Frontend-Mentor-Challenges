document.addEventListener("DOMContentLoaded", () => {
  // Select all accordion buttons
  const accordionButtons = document.querySelectorAll(".accordion-item button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get current expanded state
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      // Toggle the state
      button.setAttribute("aria-expanded", !isExpanded);

      // Get the associated content panel using aria-controls
      const contentPanel = document.getElementById(
        button.getAttribute("aria-controls")
      );

      // Toggle the hidden attribute on the content panel
      if (!isExpanded) {
        contentPanel.classList.add("expanded");
        // Change the icon to a "minus" if section is expanded
        button
          .querySelector("img")
          .setAttribute("src", "./assets/images/icon-minus.svg");
        button.querySelector("img").setAttribute("alt", "Collapse section");
      } else {
        contentPanel.classList.remove("expanded");
        // Change the icon back to a "plus" when collapsed
        button
          .querySelector("img")
          .setAttribute("src", "./assets/images/icon-plus.svg");
        button.querySelector("img").setAttribute("alt", "Expand section");
      }
    });
  });
});
