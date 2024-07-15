// require("dotenv").config();
// const { getData } = require("../Scripts/api");

document.addEventListener("DOMContentLoaded", () => {
  getData("users");
});

const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-btn");
const chatContainer = document.getElementById("chat-container");
// const api_key = process.env.API_KEY;
let inputContent = "";

chatInput.addEventListener("change", (e) => {
  inputContent = e.target.value;
});

/////
let secretKey;
fetch("config.json")
  .then((response) => response.json())
  .then((config) => {
    secretKey = config.SECRET_KEY;
  })
  .catch((error) => console.error("Error loading config:", error));
////

sendButton.addEventListener("click", async () => {
  chatContainer.innerHTML += `<div>
    <h4> user: </h4>
    <p> ${inputContent} </p>
  </div>`;

  let stringifiedChat = localStorage.chat || "[]"; //=> [{},{}]

  let chat = JSON.parse(stringifiedChat);

  chat.push({
    role: "user",
    content: inputContent,
  });

  localStorage.setItem("chat", JSON.stringify(chat));

  const { data } = await axios("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: api_key,
    },
    data: {
      model: "gpt-3.5-turbo",
      messages: [...chat],
      temperature: 0.7,
    },
  });
  console.log(data);
  chatContainer.innerHTML += `<div>
    <h4> Assistant: </h4>
    <p> ${data.choices[0].message.content} </p>
  </div>`;

  chat.push({
    role: "assistant",
    content: data.choices[0].message.content,
  });

  localStorage.setItem("chat", JSON.stringify(chat));
});

const loadMessages = () => {
  const stringifiedChat = localStorage.chat || "[]"; //=> [{},{}]

  const chat = JSON.parse(stringifiedChat);

  chat.forEach((message) => {
    chatContainer.innerHTML += `<div>
    <h4> ${message.role}: </h4>
    <p> ${message.content} </p>
  </div>`;
  });
};

loadMessages();
