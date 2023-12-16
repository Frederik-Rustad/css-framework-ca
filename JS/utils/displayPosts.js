import { generatePostHTML } from './generatePostHTML.js';
import {deleteAndEditBtn} from './deleteAndEditBtn.js';
import { handleSearch } from './search.js';

let posts = [];

function displayPosts(initialPosts) {
  const postDisplayContainer = document.getElementById("post-display");
  if (!postDisplayContainer) {
    alert("Post display container not found.");
    return;
  }

  let posts = initialPosts.slice(0, 50);
  let displayedPosts = [...initialPosts.slice(0, 50)];
  const allPosts = initialPosts;

    function updatePostsHTML() {
    const postsHTML = displayedPosts.map(post => generatePostHTML(post)).join('');
    postDisplayContainer.innerHTML = postsHTML;
  }

  updatePostsHTML();

  document.getElementById("newest").addEventListener("click", () => {
    displayedPosts = [...allPosts].sort((a, b) => new Date(b.created) - new Date(a.created)).slice(0, 50);
    updatePostsHTML();
    deleteAndEditBtn();
  });

  document.getElementById("oldest").addEventListener("click", () => {
    displayedPosts = [...allPosts].sort((a, b) => new Date(a.created) - new Date(b.created)).slice(0, 50);
    updatePostsHTML();
    deleteAndEditBtn();
  });

  if (posts.length > 50) {
    const loadMoreButton = document.createElement('button');
    loadMoreButton.innerText = 'Load more posts';
    loadMoreButton.classList.add('btn', 'btn-light', 'bg-dark', 'btn-lg', 'mb-3');
    loadMoreButton.addEventListener('click', () => {
      const remainingPosts = allPosts.slice(displayedPosts.length, displayedPosts.length + 50);
      displayedPosts = [...displayedPosts, ...remainingPosts];
      updatePostsHTML();
      if (displayedPosts.length >= allPosts.length) {
        loadMoreButton.remove();
      }
    });
    postDisplayContainer.appendChild(loadMoreButton);
  }
 
 deleteAndEditBtn();

}

export { displayPosts, posts };