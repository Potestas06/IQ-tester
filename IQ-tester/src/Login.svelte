<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import firebase from 'firebase/app';
    import 'firebase/auth';
  
    // Initialize Firebase with your project's configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDb5U8TWTsK1Ha5bafSuZiCxv_j2sNrqKY",
        authDomain: "iq-tester-bbw.firebaseapp.com",
        projectId: "iq-tester-bbw",
        storageBucket: "iq-tester-bbw.appspot.com",
        messagingSenderId: "1019768050414",
        appId: "1:1019768050414:web:eb35fd538035b6362719ff"
    };
    firebase.initializeApp(firebaseConfig);
  
    let email = '';
    let password = '';
  
    function handleLogin() {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          // Login successful, navigate to the home page
          navigate('/');
        })
        .catch((error) => {
          console.error(error);
          // Handle login error here
        });
    }
  
    onMount(() => {
      // Check if the user is already logged in
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is already logged in, navigate to the home page
          navigate('/');
        }
      });
    });
  </script>
  
  <main>
    <h1>Login</h1>
    <form on:submit|preventDefault={handleLogin}>
      <label>
        Email:
        <input type="email" bind:value={email} required />
      </label>
      <label>
        Password:
        <input type="password" bind:value={password} required />
      </label>
      <button type="submit">Login</button>
    </form>
  </main>
  
  <style>
    /* Your custom CSS styles here */
  </style>
  