document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    fetch("http://localhost/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });
});
