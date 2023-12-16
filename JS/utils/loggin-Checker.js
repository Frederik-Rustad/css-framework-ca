/**
 * Checks if user is logged in based on the presence of a token in local storage
 * @returns {boolean} true if user is logged in, false if not
 *@example
*  const isLoggedIn = logginChecker();
 */
function logginChecker() {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return true;
  }
  return false;
}

export { logginChecker };