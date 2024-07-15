document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  registerForm.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    console.log(formData.get("name"));
    console.log(formData.get("email"));
    console.log(formData.get("password"));
    fetch("http://localhost/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });
});
