import React, { useState, useEffect } from "react";

const CatGPTChatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const startChat = async () => {
      try {
        // Send initial system message to the CatGPT API
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer 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`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "system",
                  content:
                    "You are a psychiatrist called JOE and your mission is to find the IQ of the user it does not have to be accurate in any kind it just has to be a number between 0 and 20. Don't ask more than 10 questions and don't ask more than 1 question at a time after the user anserd the 10 Questions you have to give a Random Number between 50 and 130.",
                },
              ],
            }),
          }
        );

        const data = await response.json();
        console.log(data);
        // Add the initial system response to the chat history
        const systemResponse = data.choices[0].message.content;
        const updatedChatHistory = [
          ...chatHistory,
          { message: systemResponse, isUser: false },
        ];
        setChatHistory(updatedChatHistory);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    startChat();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    // Add user's message to the chat history
    const updatedChatHistory = [
      ...chatHistory,
      { message: userInput, isUser: true },
    ];
    setChatHistory(updatedChatHistory);
    setUserInput("");

    try {
      // Send user's message to the CatGPT API
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: updatedChatHistory.map((chat) => ({
              role: chat.isUser ? "user" : "assistant",
              content: chat.message,
            })),
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      // Add the model's response to the chat history
      const modelResponse = data.choices[0].message.content;
      const updatedChatHistoryWithResponse = [
        ...updatedChatHistory,
        { message: modelResponse, isUser: false },
      ];
      setChatHistory(updatedChatHistoryWithResponse);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="Container">
      <div>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            style={{
              textAlign: chat.isUser ? "right" : "left",
              color: chat.isUser ? "blue" : "green",
              fontWeight: "bold",
              fontSize: "20px",
              padding: "10px",
              margin: "10px",
            }}
          >
            <p>{chat.message}</p>
          </div>
        ))}
      </div>
      <div>
        <input type="text" value={userInput} onChange={handleUserInput} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default CatGPTChatbot;
