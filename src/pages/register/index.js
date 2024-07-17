document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const phoneInput = document.getElementById("phone_number");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const phoneError = document.getElementById("phone-error");

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
      nameError.style.display = "none";
      emailError.style.display = "none";
      passwordError.style.display = "none";
      phoneError.style.display = "none";

      const name = sanitizeInput(nameInput.value);
      const email = sanitizeInput(emailInput.value);
      const password = passwordInput.value;
      const phoneNumber = sanitizeInput(phoneInput.value);

      let isValid = true;

      if (name.length < 2) {
        nameError.textContent = "Name must be at least 2 characters long";
        nameError.style.display = "block";
        isValid = false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = "Please enter a valid email address";
        emailError.style.display = "block";
        isValid = false;
      }

      if (password.length < 8) {
        passwordError.textContent =
          "Password must be at least 8 characters long";
        passwordError.style.display = "block";
        isValid = false;
      }

      if (!/^\d{10}$/.test(phoneNumber)) {
        phoneError.textContent = "Please enter a valid 10-digit phone number";
        phoneError.style.display = "block";
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      console.log(name);
      console.log(email);
      console.log(password);
      console.log(phoneNumber);

      fetch("http://localhost/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone_number: phoneNumber,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.token) {
            localStorage.setItem("jwtToken", data.token);

            window.location.href = "/src/pages/user-portal/index.html";
          } else {
            throw new Error("No token received");
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          showMessage("Registration failed. Please try again.", "error");
        });
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      showMessage("An unexpected error occurred. Please try again.", "error");
    }
  });
});

function sanitizeInput(input) {
  return input.replace(/(<([^>]+)>)/gi, "").trim();
}

function showMessage(message, type) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.style.padding = "10px";
  messageElement.style.marginTop = "10px";
  messageElement.style.borderRadius = "5px";
  messageElement.style.textAlign = "center";

  if (type === "success") {
    messageElement.style.backgroundColor = "#d4edda";
    messageElement.style.color = "#155724";
  } else {
    messageElement.style.backgroundColor = "#f8d7da";
    messageElement.style.color = "#721c24";
  }

  const formContainer = document.querySelector(".form-container");
  formContainer.appendChild(messageElement);

  setTimeout(() => {
    formContainer.removeChild(messageElement);
  }, 5000);
}
