document.addEventListener("DOMContentLoaded", function () {
  const elements = {
    bill: document.getElementById("bill"),
    tipButtons: document.querySelectorAll(".tip"),
    customTip: document.getElementById("custom-tip"),
    people: document.getElementById("people"),
    tipAmount: document.getElementById("tip-amount"),
    totalAmount: document.getElementById("total-amount"),
    reset: document.getElementById("reset"),
    errorText: document.getElementById("error-message"),
  };

  let tipPercentage = 0;

  // ✅ Helper function: Enable or disable reset button
  function updateResetButtonState() {
    elements.reset.disabled =
      !elements.bill.value.trim() ||
      elements.bill.value <= 0 ||
      !elements.people.value.trim() ||
      elements.people.value <= 0;
  }

  // ✅ Helper function: Validate people input
  function validatePeopleInput() {
    const isInvalid = elements.people.value <= 0;
    elements.people.classList.toggle("input-error", isInvalid);
    elements.errorText.classList.toggle("show-error", isInvalid);
    updateResetButtonState();
    return !isInvalid;
  }

  // ✅ Pure function: Calculate tip per person
  function calculateTip(bill, people, tipPercent) {
    if (people === 0) return { tipAmount: 0, totalAmount: 0 };
    const tipAmount = (bill * tipPercent) / 100 / people;
    const totalAmount = bill / people + tipAmount;
    return { tipAmount, totalAmount };
  }

  // ✅ Function to update UI with new values
  function updateUI() {
    if (!validatePeopleInput()) return; // Stop calculation if input is invalid
    const bill = parseFloat(elements.bill.value) || 0;
    const people = parseInt(elements.people.value) || 1;

    const { tipAmount, totalAmount } = calculateTip(
      bill,
      people,
      tipPercentage
    );

    elements.tipAmount.textContent = `$${tipAmount.toFixed(2)}`;
    elements.totalAmount.textContent = `$${totalAmount.toFixed(2)}`;
  }

  // ✅ Function to handle tip selection
  function handleTipSelection(event) {
    elements.tipButtons.forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");
    tipPercentage = parseFloat(event.target.getAttribute("data-value"));
    elements.customTip.value = "";
    updateUI();
  }

  // ✅ Function to handle custom tip input
  function handleCustomTipInput() {
    elements.tipButtons.forEach((btn) => btn.classList.remove("active"));
    tipPercentage = parseFloat(elements.customTip.value) || 0;
    updateUI();
  }

  // ✅ Function to reset values
  function resetValues() {
    elements.bill.value = "";
    elements.people.value = "1";
    elements.customTip.value = "";
    elements.tipButtons.forEach((btn) => btn.classList.remove("active"));
    tipPercentage = 0;
    updateUI();
  }

  // ✅ Event Listeners
  elements.tipButtons.forEach((button) =>
    button.addEventListener("click", handleTipSelection)
  );
  elements.customTip.addEventListener("input", handleCustomTipInput);
  elements.bill.addEventListener("input", updateUI);
  elements.people.addEventListener("input", updateUI);
  elements.reset.addEventListener("click", resetValues);

  updateResetButtonState(); // Initial check on page load
});
