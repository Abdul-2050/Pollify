import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6QbAS32BJ8DS26rlWAKke8Mai63TujNg",
  authDomain: "polify-42ea4.firebaseapp.com",
  projectId: "polify-42ea4",
  storageBucket: "polify-42ea4.appspot.com",
  messagingSenderId: "92933707190",
  appId: "1:92933707190:web:814cbac948fec6f9089d17",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);

// Check if user is logged in on page load
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is logged in, continue with the current page
  } else {
    // User is not logged in, redirect to authentication.html
    window.location.href = "authentication.html";
  }
});
