import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const SaveUserInfo = () => {
  const [username, setUsername] = useState('');
  const [iq, setIQ] = useState('');
  const [isDisplayed, setIsDisplayed] = useState(false); // State variable to control display

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleIQChange = (event) => {
    setIQ(event.target.value);
  };

  const handleSaveUserInfo = async () => {
    try {
      // Initialize Firebase
      const firebaseConfig = {
        // Firebase configuration...
      };

      firebase.initializeApp(firebaseConfig);

      // Create a Firestore instance
      const firestore = firebase.firestore();

      // Save user info to Firestore
      await firestore.collection('users').add({
        username,
        iq,
      });

      console.log('User info saved successfully!');
    } catch (error) {
      console.log('Error saving user info:', error);
    }
  };

  const handleButtonClick = () => {
    setIsDisplayed(true); // Set the state variable to true when button is clicked
  };

  if (!isDisplayed) {
    return <button onClick={handleButtonClick}>save IQ</button>;
  }

  return (
    <div>
      <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
      <input type="number" placeholder="IQ" value={iq} onChange={handleIQChange} />
      <button onClick={handleSaveUserInfo}>Save User Info</button>
    </div>
  );
};

export default SaveUserInfo;
