import { fetcher } from '../fetcher.js';

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

const editPostForm = document.querySelector('#EditPostForm');
const title = document.querySelector('#EditPostTitle');
const body = document.querySelector('#EditPostText');
const tags = document.querySelector('#EditPostTags');
const media = document.querySelector('#EditPostImage');

async function fetchPostDetails(postId) {
    const apiUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}`;
    const postDetails = await fetcher(apiUrl, { method: 'GET' }, true);
  
    title.value = postDetails.title;
    body.value = postDetails.body;
    tags.value = postDetails.tags.join(' '); 
    media.value = postDetails.media;
}

fetchPostDetails(postId);
async function handleAddPost(){
  const post = {
    title: title.value,
    body: body.value,
    tags: tags.value.split(' '),
    media: media.value,
  }
  const response = await fetcher(
    `https://api.noroff.dev/api/v1/social/posts/${postId}`,
    {
    method: 'PUT',
    body: JSON.stringify(post),
  }, true
  );
}

editPostForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  await handleAddPost();
  window.location.href = '../feed/index.html'; 
});
