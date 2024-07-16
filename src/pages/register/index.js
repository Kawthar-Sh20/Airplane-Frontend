document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  registerForm.addEventListener("click", (e) => {
    console.log("Register page");
    // e.preventDefault();
    // const formData = new FormData(registerForm);
    // console.log(formData);
    // fetch("http://localhost/api/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: formData.get("email"),
    //     password: formData.get("password"),
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  });
});
