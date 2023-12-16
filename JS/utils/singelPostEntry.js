function seePostButtonClick(event) {
  const postId = event.target.dataset.postId;
  window.location.href = `../comments/comments.html?postId=${postId}`;
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('spesificPost')) {
    seePostButtonClick(event);
  }
});



