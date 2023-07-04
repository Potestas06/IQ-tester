import React from "react";
import "./App.css";

import CatGPTChatbot from "./components/Chat";

const App = () => {
  return (
    <div className="Container">
      <h1>Chat with CatGPT</h1>
      <CatGPTChatbot />
    </div>
  );
};

export default App;
