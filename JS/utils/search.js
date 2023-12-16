import { fetcher } from "../fetcher.js";
import { displayPosts } from "./displayPosts.js";

async function handleSearch() {
  const searchInput = document.querySelector('#search-input');
  const inputValue = searchInput.value.trim().toLowerCase();

  if (inputValue !== '') {
    const apiUrl = `https://api.noroff.dev/api/v1/social/posts?_tag=${inputValue}&_active=true&_author=true&_comments=true&_reactions=true`;

    try {
      const searchTag = await fetcher(apiUrl, { method: 'GET' }, true);

      if (Array.isArray(searchTag) && Array.isArray(searchTag.data) && searchTag.data.length > 0) {

      } else {
         displayPosts(searchTag);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  } else {
    window.location.reload();
  }
}

const searchBtn = document.querySelector('#search-button');
const searchInput = document.querySelector('#search-input');

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

export { handleSearch };