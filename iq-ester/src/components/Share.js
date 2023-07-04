import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const SaveUserInfo = () => {
  const [username, setUsername] = useState('');
  const [iq, setIQ] = useState('');

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
        apiKey: "AIzaSyDb5U8TWTsK1Ha5bafSuZiCxv_j2sNrqKY",
        authDomain: "iq-tester-bbw.firebaseapp.com",
        projectId: "iq-tester-bbw",
        storageBucket: "iq-tester-bbw.appspot.com",
        messagingSenderId: "1019768050414",
        appId: "1:1019768050414:web:eb35fd538035b6362719ff"
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

  return (
    <div>
      <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
      <input type="number" placeholder="IQ" value={iq} onChange={handleIQChange} />
      <button onClick={handleSaveUserInfo}>Save User Info</button>
    </div>
  );
};

export default SaveUserInfo;
