import React from 'react';
import './App.css';

import CatGPTChatbot from './components/Chat';
import SaveUserInfo from './components/Share';

const App = () => {
  return (
    <div className="Container">
      <h3 style={{ textAlign: 'right' }}>Share your IQ</h3>
      <SaveUserInfo />
      <h1>Chat with CatGPT</h1>
      <CatGPTChatbot />
    </div>
  );
};

export default App;
