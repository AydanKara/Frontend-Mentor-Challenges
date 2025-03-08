// Select elements
const passwordField = document.getElementById("password");
const copyMsg = document.querySelector(".copy-msg");
const copyBtn = document.getElementById("copy-btn");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const checkboxes = document.querySelectorAll(".options input[type='checkbox']");
const strengthMeters = document.querySelectorAll("#strength-meter");
const strengthState = document.getElementById("strength-state");
const generateBtn = document.getElementById("generate-btn");

// Character sets
const charSets = new Map([
  ["uppercase", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
  ["lowercase", "abcdefghijklmnopqrstuvwxyz"],
  ["numbers", "0123456789"],
  ["symbols", "!@#$%^&*()_+[]{}|;:,.<>?"],
]);

// Strength levels using Map
const strengthLevels = new Map([
  [1, { text: "TOO WEAK!", color: "var(--weak-red)" }],
  [2, { text: "WEAK", color: "var(--weak-orange)" }],
  [3, { text: "MEDIUM", color: "var(--medium-yellow)" }],
  [4, { text: "STRONG", color: "var(--primary-green)" }],
]);

// Function: Generate a secure password
function generatePassword(length, options) {
  let characters = "";
  options.forEach((enabled, key) => {
    if (enabled) characters += charSets.get(key);
  });

  if (!characters) return "";

  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);

  return Array.from(array, (num) => characters[num % characters.length]).join(
    ""
  );
}

// Function: Get password strength based on length
const getStrength = (length) =>
  length > 12 ? 4 : length > 8 ? 3 : length > 6 ? 2 : 1;

// Function: Update strength meter UI
function updateStrength(length) {
  const strength = getStrength(length);
  const { text, color } = strengthLevels.get(strength);

  strengthState.textContent = text;
  strengthMeters.forEach((meter, index) => {
    meter.style.background = index < strength ? color : "transparent";
    meter.style.borderColor = index < strength ? color : "var(--text-color)";
  });
}

// Function: Update slider background dynamically
function updateSliderBackground() {
  const percentage =
    ((lengthSlider.value - lengthSlider.min) /
      (lengthSlider.max - lengthSlider.min)) *
    100;
  lengthSlider.style.background = `linear-gradient(to right, var(--primary-green) ${percentage}%, var(--bg-body) ${percentage}%)`;
}

// Function: Handle all UI updates
function updateUI() {
  lengthValue.textContent = lengthSlider.value;
  updateStrength(lengthSlider.value);
  updateSliderBackground();
}

// Event Listener for Generate Button
generateBtn.addEventListener("click", () => {
  const options = new Map();
  copyMsg.style.visibility = "hidden"
  checkboxes.forEach((checkbox) => options.set(checkbox.id, checkbox.checked));

  passwordField.value = generatePassword(lengthSlider.value, options);
  updateStrength(lengthSlider.value);
});

// Event Listener for Copy Button
copyBtn.addEventListener("click", async () => {
  if (passwordField.value) {
    await navigator.clipboard.writeText(passwordField.value);
    copyMsg.style.visibility = "visible"
  }
});

// Event Listeners for Inputs
lengthSlider.addEventListener("input", updateUI);
checkboxes.forEach((checkbox) => checkbox.addEventListener("change", updateUI));

// Initial UI setup
updateUI();
