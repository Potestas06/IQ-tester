import React, { useState, useEffect, useRef } from "react";

const CatGPTChatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const messagesContainerRef = useRef(null);

  const startChat = async () => {
    try {
      // Send initial system message to the CatGPT API
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are Rolplaying as a psychiatrist called JOE and your mission is to find the approximately IQ of the user it does not have to be accurate in any kind. Don't ask more than 10 questions and don't ask more than 1 question at a time after the user answered the 10 Questions you have to give him his approximately IQ.",
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

  useEffect(() => {
    startChat();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  };

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
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="container" style={{ paddingBottom: "80px" }}>
      <div
        className="messages-container"
        ref={messagesContainerRef}
        style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
      >
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`py-2 ${
              chat.isUser ? "text-right text-primary" : "text-left text-success"
            }`}
          >
            <p>{chat.message}</p>
          </div>
        ))}
      </div>
      <div className="fixed-bottom d-flex align-items-center">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          onKeyPress={handleKeyPress}
          className="form-control mr-2"
          style={{ marginRight: "10px" }}
        />
        <button
          onClick={handleSendMessage}
          className="btn btn-primary"
          style={{ marginRight: "10px" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CatGPTChatbot;
