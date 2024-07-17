document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.querySelector('input[name="email"]');
  const passwordInput = document.querySelector('input[name="password"]');

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      clearErrorMessages();

      const email = sanitizeInput(emailInput.value);
      const password = passwordInput.value;

      if (!validateEmail(email)) {
        showErrorMessage(emailInput, "Please enter a valid email address");
        return;
      }

      if (password.length < 8) {
        showErrorMessage(
          passwordInput,
          "Password must be at least 8 characters long"
        );
        return;
      }

      const response = await fetch("http://localhost/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("jwtToken", data.token);

        const decodedToken = decodeJwtToken(data.token);
        if (decodedToken && decodedToken.role) {
          redirectBasedOnRole(decodedToken.role);
        } else {
          throw new Error("Invalid token structure");
        }
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      showErrorMessage(
        loginForm,
        "Login failed. Please check your credentials and try again."
      );
    }
  });
});

function sanitizeInput(input) {
  return input.trim().replace(/(<([^>]+)>)/gi, "");
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function clearErrorMessages() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((msg) => msg.remove());
}

function showErrorMessage(element, message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.style.color = "red";
  errorDiv.style.fontSize = "0.8em";
  errorDiv.style.marginTop = "5px";
  errorDiv.textContent = message;
  element.parentNode.insertBefore(errorDiv, element.nextSibling);
}

function decodeJwtToken(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
}

function redirectBasedOnRole(role) {
  switch (role.toLowerCase()) {
    case "admin":
      window.location.href = "/src/pages/admin-portal/index.html";
      break;
    case "user":
      window.location.href = "/src/pages/user-portal/index.html";
      break;
    default:
      console.error("Unknown role:", role);
      showErrorMessage(
        document.getElementById("login-form"),
        "Error determining user role. Please contact support."
      );
  }
}
