import { fetcher } from '../fetcher.js';

const urlParams = new URLSearchParams(window.location.search);
const commentIdAPI = urlParams.get('postId');

async function makeCommentPostRequest(commentId, commentData) {
  const url = `https://api.noroff.dev/api/v1/social/posts/${commentId}/comment`;

  const options = {
    method: 'POST',
    body: JSON.stringify(commentData),
  };

  try {
    const response = await fetcher(url, options, true);
  } catch (error) {
    console.error('Error making comment post request:', error);
  }
}

export { makeCommentPostRequest };