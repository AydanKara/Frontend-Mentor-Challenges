document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");

  document.querySelectorAll(".radio-option input").forEach((radio) => {
    radio.addEventListener("change", function () {
      updateActiveRadio(this);
    });
  });

  function updateActiveRadio(selectedRadio) {
    document.querySelectorAll(".radio-option").forEach((label) => {
      label.classList.remove("active");
    });
    selectedRadio.closest(".radio-option").classList.add("active");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const validations = {
      "first-name": validateRequired,
      "last-name": validateRequired,
      email: validateEmail,
      "query-type": validateQueryType,
      message: validateRequired,
      consent: validateConsent,
    };

    let isValid = true;

    Object.keys(validations).forEach((field) => {
      const fieldIsValid = validations[field](field);
      if (!fieldIsValid) isValid = false;
    });

    if (isValid) {
      handleFormSuccess();
    }
  });

  function validateRequired(id) {
    const field = document.getElementById(id);
    if (!field.value.trim()) {
      field.classList.add("invalid");
      showError(id, "This field is required");
      return false;
    }
    field.classList.remove("invalid");
    return true;
  }

  function validateEmail(id) {
    const field = document.getElementById(id);

    const email = document.getElementById(id);
    if (!email.value.trim()) {
      field.classList.add("invalid");
      showError(id, "This field is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      field.classList.add("invalid");
      showError(id, "Please enter a valid email address");
      return false;
    }
    field.classList.remove("invalid");
    return true;
  }

  function validateQueryType() {
    if (!document.querySelector("input[name='query-type']:checked")) {
      showError("query-type", "Please select a query type");
      return false;
    }
    return true;
  }

  function validateConsent(id) {
    if (!document.getElementById(id).checked) {
      showError(id, "To submit this form, please consent to being contacted");
      return false;
    }
    return true;
  }

  function showError(id, message) {
    const errorElement = document.getElementById(id + "-error");
    if (errorElement) {
      errorElement.style.display = "block";
      errorElement.textContent = message;
    }
  }

  function clearErrors() {
    document.querySelectorAll(".error-msg").forEach((msg) => {
      msg.style.display = "none";
      msg.textContent = "";
    });
  }

  function handleFormSuccess() {
    form.reset();
    document.querySelectorAll(".radio-option").forEach((label) => {
      label.classList.remove("active");
    });

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });

    successMessage.style.display = "block";
    setTimeout(() => (successMessage.style.display = "none"), 5000);
  }
});
