function checkAndDisplayLogout() {
  const isLoggedIn = localStorage.getItem('accessToken');
  const logoutElements = document.querySelectorAll('.logout');

  if (isLoggedIn) {
    logoutElements.forEach(element => {
      element.classList.remove('d-none');
      element.addEventListener('click', () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');

        window.location.href = '../index.html';
      });
    });
  }
}

export { checkAndDisplayLogout };