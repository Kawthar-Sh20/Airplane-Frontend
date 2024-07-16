const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-btn");
const chatContainer = document.getElementById("chat-container");
let inputContent = "";

chatInput.addEventListener("change", (e) => {
  inputContent = e.target.value;
});

let secretKey;
fetch("../../../config.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((config) => {
    secretKey = config.API_KEY;
    // console.log("Loaded secret key:", secretKey); // Debugging line to ensure key is loaded
  })
  .catch((error) => console.error("Error loading config:", error));

sendButton.addEventListener("click", async () => {
  chatContainer.innerHTML += `<div>
    <h4> user: </h4>
    <p> ${inputContent} </p>
  </div>`;

  let stringifiedChat = localStorage.chat || "[]";

  let chat = JSON.parse(stringifiedChat);

  chat.push({
    role: "user",
    content: inputContent,
  });

  localStorage.setItem("chat", JSON.stringify(chat));

  try {
    // console.log("Using secret key:", secretKey); // Debugging line to ensure key is used
    const { data } = await axios("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`, // Use secretKey instead of API_KEY
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
  } catch (error) {
    console.error("Error during API request:", error);
  }
});

const loadMessages = () => {
  const stringifiedChat = localStorage.chat || "[]";

  const chat = JSON.parse(stringifiedChat);

  chat.forEach((message) => {
    chatContainer.innerHTML += `<div>
    <h4> ${message.role}: </h4>
    <p> ${message.content} </p>
  </div>`;
  });
};

loadMessages();
