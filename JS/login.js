import { fetcher } from './fetcher.js';
import { addToLocalStorage, getFromLocalStorage } from './utils/localstorageUtils.js';

const API_BASE_URL = 'https://api.noroff.dev';
const LOGIN_API_URL = `${API_BASE_URL}/api/v1/social/auth/login`;

//endpoints:
//Register: /api/v1/social/auth/register
//Login: /api/v1/social/auth/login
//Get All Posts: /api/v1/social/posts

const form = document.querySelector('#login-form');
const userEmail = document.querySelector('#loginEmail');
const userPassword = document.querySelector('#loginPassword');
/**
 * Logs in a user by sending a POST request to the login API endpoint.
 *
 * @async
 * @function loginUser
 * @param {Object} user - The user object: login details.
 * @param {string} user.emailValue - User's Email.
 * @param {string} user.passwordValue - The password.
 * @returns {Promise<void>}
 */
async function loginUser(user) {
const postBody = JSON.stringify(user);
const userLoginData = await fetcher(LOGIN_API_URL, {
  method: 'POST',
  body: postBody,
   headers: {
    'Content-Type': 'application/json',
  },
}, false, );
const token = userLoginData.accessToken;
addToLocalStorage('accessToken', token);

window.location.href = '../feed/index.html';

const userId = userLoginData.name;
addToLocalStorage('userId', userId);
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
const userloginDetails = {
   email: userEmail.value,
   password: userPassword.value,
};
  await loginUser(userloginDetails);
});