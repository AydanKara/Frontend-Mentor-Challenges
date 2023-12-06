const form = document.getElementById("form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const svgError = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<circle cx="12" cy="12" r="11.5" stroke="#FF6F5B"/>
<rect x="11" y="6" width="2" height="9" rx="1" fill="#FF6F5B"/>
<rect x="11" y="17" width="2" height="2" rx="1" fill="#FF6F5B"/>
</svg>`;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  const errorSvg = inputControl.querySelector(".svg-error");
  errorSvg.innerHTML = svgError;

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  const errorSvg = inputControl.querySelector(".svg-error");
  errorSvg.innerHTML = "";

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();

  if (usernameValue === "") {
    setError(username, "Sorry, invalid format here");
  } else {
    setSuccess(username);
  }

  if (emailValue === "") {
    setError(email, "Sorry, invalid format here");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Sorry, invalid format here");
  } else {
    setSuccess(email);
  }
};
