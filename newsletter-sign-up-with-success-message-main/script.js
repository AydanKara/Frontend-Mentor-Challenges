const formContainer = document.querySelector(".container");
const successContainer = document.querySelector(".success-container");
const form = document.querySelector("form");
const email = document.getElementById("email");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
  email.classList.add("invalid");
};

const setSuccess = (element, emailValue) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  const confirmationEmail = document.getElementById("confirmation-email");
  const dismissButton = document.getElementById("dismiss-button");

  errorDisplay.innerText = "";
  inputControl.classList.remove("error");
  inputControl.classList.add("success");
  email.classList.remove("invalid");

  confirmationEmail.innerText = emailValue;
  formContainer.style.display = "none";
  successContainer.style.display = "flex";

  dismissButton.addEventListener("click", () => {
    formContainer.style.display = "block";
    successContainer.style.display = "none";
    email.value = "";
  });
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const emailValue = email.value.trim();

  if (emailValue === "") {
    setError(email, "Valid email required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Valid email required");
  } else {
    setSuccess(email, emailValue);
  }
};
