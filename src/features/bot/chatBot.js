const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-btn");
const chatContainer = document.getElementById("chat-container");
let inputContent = "";
let canChat = false;
let secretKey;

// Fetch configuration using Axios
axios
  .get("../../../config.json")
  .then((response) => {
    secretKey = response.data.API_KEY;
  })
  .catch((error) => console.error("Error loading config:", error));

chatInput.addEventListener("change", (e) => {
  inputContent = e.target.value;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

sendButton.addEventListener("click", sendMessage);

// Fetch city information and get recommendation from the AI
const fetchCityAndRecommend = async (bookingId) => {
  try {
    const cityResponse = await axios.get(
      `http://localhost/api/openai?id_flight_booking=${bookingId}`
    );
    const cityData = cityResponse.data;

    if (cityData.city) {
      const cityName = cityData.city.name;

      // Send recommendation request to OpenAI
      const openAiResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `The user booked a flight to ${cityName}. Provide a detailed travel plan for their trip for 1 week .`,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${secretKey}`,
          },
        }
      );

      const recommendation = openAiResponse.data.choices[0].message.content;

      chatContainer.innerHTML += `<div>
        <h4> Assistant: </h4>
        <p> ${recommendation} </p>
      </div>`;

      // Enable chat after the recommendation
      canChat = true;
    } else {
      console.error("City not found for the given booking ID.");
    }
  } catch (error) {
    console.error("Error during API request:", error);
  }
};

// Example booking ID, replace with actual booking ID from your application
const bookingId = 1;
fetchCityAndRecommend(bookingId);

async function sendMessage() {
  if (!canChat) {
    chatContainer.innerHTML += `<div>
      <h4> Error: </h4>
      <p> Please wait for the recommendation before chatting with the AI. </p>
    </div>`;
    return;
  }

  inputContent = chatInput.value;
  if (inputContent.trim() === "") return;

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

  // Clear the input field after sending the message
  chatInput.value = "";
  inputContent = "";

  try {
    const openAiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [...chat],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    const assistantMessage = openAiResponse.data.choices[0].message.content;

    chatContainer.innerHTML += `<div>
      <h4> Assistant: </h4>
      <p> ${assistantMessage} </p>
    </div>`;

    chat.push({
      role: "assistant",
      content: assistantMessage,
    });

    localStorage.setItem("chat", JSON.stringify(chat));
  } catch (error) {
    console.error("Error during API request:", error);
  }
}

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
