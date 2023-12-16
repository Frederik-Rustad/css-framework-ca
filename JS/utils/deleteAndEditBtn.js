 function deleteAndEditBtn() {
  const userId = localStorage.getItem("userId");
  const postDivs = document.querySelectorAll('.post');

  postDivs.forEach((postDiv) => {
    const authorName = postDiv.querySelector('.userName').textContent.trim();

    const deleteBtn = postDiv.querySelector(`.delete-post-btn.${authorName}`);
    const editButton = postDiv.querySelector(`.editPostBtn.${authorName}`);

    editButton.addEventListener('click', () => {
      const postId = editButton.dataset.postId;
      window.location.href = `../edit/index.html?postId=${postId}`;
    });

    if (userId === authorName) {
      deleteBtn.classList.remove('d-none');
      editButton.classList.remove('d-none');
    }

    deleteBtn.addEventListener('click', async () => {
      const postId = deleteBtn.dataset.postId;
      const deletePostUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}`;
      const deletePostResponse = await fetch(deletePostUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const deletePostData = await deletePostResponse.json();
      alert('Post deleted');
      window.location.reload();
    });
  });
};

export { deleteAndEditBtn };