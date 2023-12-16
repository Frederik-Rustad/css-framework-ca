/**
 * Displays the user ID in a specified DOM element.
 * If the user ID is not available in local storage, it shows a default message.
 *
 * @function displayUsernames
 * @returns {void}
 */
export function displayUsernames() {
  const userId = localStorage.getItem('userId');
  const userNameDiv = document.querySelector('.user-name');
  if (userId) {
      userNameDiv.innerHTML = `<a class="fw-semibold" href="../profile/index.html">${userId}</a>`;
  } else {
      userNameDiv.innerHTML = `<a href="../index.html" class="text-decoration-none"><p class="text-white">User not logged in</p></a>` ;
  }
}