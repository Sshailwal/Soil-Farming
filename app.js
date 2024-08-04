import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzIsnZDnZHrUUalnAfb8ZkPjOuEGopYmg",
    authDomain: "soil-farming-2da10.firebaseapp.com",
    projectId: "soil-farming-2da10",
    storageBucket: "soil-farming-2da10.appspot.com",
    messagingSenderId: "630308752976",
    appId: "1:630308752976:web:16789b4911cbde685dcb55",
    measurementId: "G-GHPLCSGPZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set session persistence
setPersistence(auth, browserSessionPersistence)
    .then(() => {
        // Handle login form submission
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log('User:', user);
                    document.getElementById('login').style.display = 'none';
                    document.getElementById('main-content').style.display = 'block';
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    window.alert(`Error: ${errorMessage}`);
                });
        });

        // Handle signup form submission
        const signupForm = document.getElementById('signup-form');
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log('User:', user);
                    document.getElementById('signup').style.display = 'none';
                    document.getElementById('main-content').style.display = 'block';
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    window.alert(`Error: ${errorMessage}`);
                });
        });

        // Toggle between login and signup forms
        const showSignupLink = document.getElementById('show-signup');
        const showLoginLink = document.getElementById('show-login');

        showSignupLink.addEventListener('click', function(event) {
            event.preventDefault();
            document.getElementById('login').style.display = 'none';
            document.getElementById('signup').style.display = 'flex';
        });

        showLoginLink.addEventListener('click', function(event) {
            event.preventDefault();
            document.getElementById('signup').style.display = 'none';
            document.getElementById('login').style.display = 'flex';
        });

        // Handle dropdown menu toggle
        document.addEventListener('DOMContentLoaded', (event) => {
            const dropdownButton = document.querySelector('.dropbtn');
            const dropdownContent = document.getElementById('soil_content');

            // Toggle the dropdown menu when the button is clicked
            dropdownButton.addEventListener('click', (event) => {
                event.stopPropagation();
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            });

            // Close the dropdown if the user clicks outside of it
            window.addEventListener('click', (event) => {
                if (!event.target.matches('.dropbtn')) {
                    if (dropdownContent.style.display === 'block') {
                        dropdownContent.style.display = 'none';
                    }
                }
            });
        });
    })
    .catch((error) => {
        console.error("Error setting persistence:", error);
    });
