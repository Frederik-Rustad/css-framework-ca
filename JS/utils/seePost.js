import { fetcher } from '../fetcher.js';
import { logginChecker } from './loggin-Checker.js';
import { displayUsernames } from "./displayUsername.js";
import { checkAndDisplayLogout } from "../logout.js";
import { makeCommentPostRequest } from "./addComment.js";

checkAndDisplayLogout();
displayUsernames();

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

async function getPostById(postId) {
  const apiUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}?_author=true&_comments=true&_reactions=true`;
  const singlePost = await fetcher(apiUrl, { method: 'GET' }, true);
  return singlePost;  
}

async function loadPostDetails() {
  const post = await getPostById(postId);

  const container = document.getElementById('singel-post-display');

  if (!logginChecker()) {
    const loginMessage = document.createElement('div');
    loginMessage.classList.add('col-8', 'bg-primary', 'm-1');
    loginMessage.innerHTML = '<p>Log in to see the post</p>';
    container.appendChild(loginMessage);
    return;
  } 

  const postElement = document.createElement('div');
  postElement.classList.add('col-10', 'bg-primary', 'm-1');

  const postTitle = document.createElement('h3');
  postTitle.classList.add('card-title', 'text-break');
  postTitle.textContent = post.title;
  postElement.appendChild(postTitle);

  const authorContainer = document.createElement('div');
  authorContainer.classList.add('d-flex', 'flex-row', 'align-items-center');

  const authorImage = document.createElement('img');

  if (!post.author.avatar || post.author.avatar.trim() === "") {
    authorImage.src = '../images/profile-pictures/default-profile.jpg';
  } else {
    authorImage.src = post.author.avatar;
  }
  
  authorImage.classList.add('rounded-circle', 'border', 'border-3', 'profile-pictures');
  authorImage.alt = 'profile image';
  authorContainer.appendChild(authorImage);
  

  const authorName = document.createElement('p');
  authorName.classList.add('ms-2', 'mt-1');
  authorName.textContent = post.author.name;
  authorContainer.appendChild(authorName);

  postElement.appendChild(authorContainer);
  
  const postImage = document.createElement('img');
postImage.classList.add('post-img-comment', 'card-img-top', 'mt-2', 'rounded', 'mx-auto', 'd-block', 'text-break');

if (post.media) {
  postImage.src = post.media;
} else {
  postImage.classList.add('d-none');
}
postImage.alt = post.title;
postElement.appendChild(postImage);
 
  const postBody = document.createElement('div');
  postBody.classList.add('card-body', 'text-break');

  const postText = document.createElement('p');
  postText.classList.add('card-text', 'overflow-hidden', 'post-text', 'text-break');
  postText.textContent = post.body;

  postBody.appendChild(postText);
  postElement.appendChild(postBody);

  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('d-flex', 'flex-column', 'flex-sm-row', 'justify-content-evenly', 'mb-3');

  const reactionsDetails = document.createElement('div');
  reactionsDetails.classList.add('p-2');
  reactionsDetails.textContent = `⇧ ${post.reactions.length}`;

  const commentsDetails = document.createElement('div');
  commentsDetails.classList.add('p-2');
  commentsDetails.textContent = `🗨 ${post.comments.length} `;

  const createdDateDetails = document.createElement('div');
  createdDateDetails.classList.add('p-2');
  const shorterDate = post.created.slice(0, 10);
  createdDateDetails.textContent = shorterDate;

  detailsContainer.appendChild(reactionsDetails);
  detailsContainer.appendChild(commentsDetails);
  detailsContainer.appendChild(createdDateDetails);

  postElement.appendChild(detailsContainer);

   container.appendChild(postElement);
    
  const commentFormContainer = document.createElement('div');
  commentFormContainer.id = 'comment-form'; 
  commentFormContainer.classList.add('col-10', 'bg-primary', 'm-1');

  const commentForm = document.createElement('form');

  const commentInput = document.createElement('textarea');
  commentInput.id = 'commentText';
  commentInput.classList.add('bg-primary', 'm-1', 'mt-2', 'form-control', 'mb-2', 'text-white')

  commentForm.appendChild(commentInput);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.classList.add('btn', 'btn-light', 'bg-dark', 'mb-3');
  submitButton.id = 'submitComment';
  submitButton.textContent = 'Comment';
  commentForm.appendChild(submitButton);
  
  commentFormContainer.appendChild(commentForm);
  
  container.appendChild(commentFormContainer);

  const submitComment = document.querySelector('#submitComment');
  const commentText = document.getElementById('commentText');
  
  commentText.addEventListener('input', function() {
    const commentTextValue = this.value;
  });
  
  submitComment.addEventListener('click', async (event) => {
    event.preventDefault();
  
    const commentData = {
      body: commentText.value,
      
    };
  
    await makeCommentPostRequest(postId, commentData);
    window.location.reload();
  });  
  
  // Generate HTML for Comments ----------------------------------

  const commentsContainer = document.createElement('div');
  commentsContainer.classList.add('col-10', 'm-1', 'd-grid', 'gap-3' );

  post.comments.forEach((comment) => {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment', 'mt-1', 'bg-primary', 'p-2');
   
    const authorName = document.createElement('p');
    authorName.textContent = comment.author.name;
    commentDiv.appendChild(authorName);

    const commentBody = document.createElement('p');
    commentBody.textContent = comment.body;
    commentDiv.appendChild(commentBody);

    const createdDate = document.createElement('p');
    const shortenDate = comment.created.slice(0, 10);
    createdDate.textContent = shortenDate;
    commentDiv.appendChild(createdDate);

    commentsContainer.appendChild(commentDiv);
  });
  container.appendChild(commentsContainer);
}
document.addEventListener('DOMContentLoaded', loadPostDetails);