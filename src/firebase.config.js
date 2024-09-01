
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCXQHZsAduEdZOSQMIk4pOyBwmS4XmCpEA",
    authDomain: "unimart-university-marketplace.firebaseapp.com",
    projectId: "unimart-university-marketplace",
    storageBucket: "unimart-university-marketplace.appspot.com",
    messagingSenderId: "779869104748",
    appId: "1:779869104748:web:1e4fdbf260ef3f0aca4649",
    measurementId: "G-P2CR6QJLPY"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);