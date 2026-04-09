// Paste your Grok API key here
const API_KEY = "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";

async function sendMessage() {

  // Step 1: Get what the user typed
  const input = document.getElementById("userInput");
  const userText = input.value.trim();

  // Stop if input is empty
  if (userText === "") return;

  // Step 2: Show the user's message in the chat
  showMessage("user", userText);
  input.value = "";

  // Step 3: Show a "Thinking..." message while waiting
  showMessage("bot", "Thinking...");

  // Step 4: Send the message to Grok API
  const response = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + API_KEY
    },
    body: JSON.stringify({
      model: "grok-3-mini",
      messages: [
        { role: "system", content: "You are a helpful study assistant for a university student. Keep answers short and simple." },
        { role: "user", content: userText }
      ]
    })
  });

  // Step 5: Read the response
  const data = await response.json();
  const botReply = data.choices[0].message.content;

  // Step 6: Remove "Thinking..." and show the real answer
  removeLastMessage();
  showMessage("bot", botReply);
}

// Function to add a message bubble to the chat
function showMessage(role, text) {
  const chatBox = document.getElementById("chatBox");

  const div = document.createElement("div");
  div.classList.add("message", role);
  div.innerText = text;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight; // scroll to bottom
}

// Function to remove the last message (the "Thinking..." bubble)
function removeLastMessage() {
  const chatBox = document.getElementById("chatBox");
  chatBox.removeChild(chatBox.lastChild);
}

// Send message when user presses Enter key
document.getElementById("userInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
