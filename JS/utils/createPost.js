import { fetcher } from '../fetcher.js';

const addPostForm = document.querySelector('#postForm');
const title = document.querySelector('#postTitle');
const body = document.querySelector('#postText');
const tags = document.querySelector('#postTags');
const media = document.querySelector('#postImage');

/**
 * Handles the process of adding a new post by sending a POST request to the API.
 * 
 * @async
 * @function handleAddPost
 * @returns {Promise<void>}
 */
async function handleAddPost(){
  /**
   * The post object containing information about the new post.
   * @type {Object}
   * @property {string} title - The title of the post.
   * @property {string} body - The body/content of the post.
   * @property {string[]} tags - An array of tags associated with the post.
   * @property {string} media - The media URL (if any) associated with the post.
   */
  const post = {
    title: title.value,
    body: body.value,
    tags: tags.value.split(' '),
    media: media.value,
  }  
   await fetcher(
    'https://api.noroff.dev/api/v1/social/posts',
    {
    method: 'POST',
    body: JSON.stringify(post),
  }, true
  );
}

addPostForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  await handleAddPost();
  window.location.reload(); 
});