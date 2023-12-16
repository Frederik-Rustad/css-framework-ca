import { fetcher } from './fetcher.js';
const API_BASE_URL = 'https://api.noroff.dev';
// Endpoints:
// Register: /api/v1/social/auth/register
// Login: /api/v1/social/auth/login
// Get All Posts: /api/v1/social/posts

const form = document.querySelector('#registerForm');

const userName = document.querySelector('#form-name');
const userEmail = document.querySelector('#form-email');
const userPassword = document.querySelector('#form-password');
/**
 * Registers a new user by sending a POST request to the authentication API endpoint.
 *
 * @async
 * @function registerUser
 * @param {Object} user - The user object containing registration details.
 * @param {string} user.nameValue - The username.
 * @param {string} user.emailValue - Email address of the user must be an @noroff.no or @stud.noroff.no
 * @param {string} user.passwordValue - The password.
 * @returns {Promise<void>}
 */
async function registerUser(user) {
  const postBody = JSON.stringify(user);

  try {
    const myData = await fetcher(`${API_BASE_URL}/api/v1/social/auth/register`, {
      method: 'POST',
      body: postBody,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (myData.status === 'success') {
     
      alert('User registered');
      
      window.location.href = '../index.html';
    } else {
      
      if (myData.statusCode === 400) {       
        const errorMessages = myData.errors.map(err => err.message).join('\n');
        alert(`Registration failed: ${errorMessages}`);
      } else {
        alert('User registered');
      
        window.location.href = '../index.html';
      }
    }
  } catch (error) {

    alert(`Registration failed: ${error.message}`);
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userRegistrationDetails = {
    name: userName.value,
    email: userEmail.value,
    password: userPassword.value,
  };
  registerUser(userRegistrationDetails);
});
