/**
 * Generates HTML markup for displaying a post.
 *
 * @function generatePostHTML
 * @param {Object} post - The post object containing information about the post.
 * @param {number} post.id - The unique identifier of the post.
 * @param {string} post.title - The title of the post.
 * @param {string} post.body - The body/content of the post.
 * @param {string} post.media - The media URL associated with the post.
 * @param {Object} post.author - The author information.
 * @param {string} post.author.name - The name of the author.
 * @param {string} post.created - The creation date of the post.
 * @param {Object} post._count - The count object containing reactions and comments count.
 * @param {number} post._count.reactions - The count of reactions for the post.
 * @param {number} post._count.comments - The count of comments for the post.
 * @returns {string} - The HTML markup for the post.
 */
export function generatePostHTML(post) {
  const {
    id,
    title,
    body,
    media,
    author,
    created,
    _count: { reactions: reactionsCount, comments: commentsCount }
  } = post;

  const shortenedCreatedDate = created.slice(0, 10);
  const avatarUrl = (author && author.avatar !== "" && author.avatar) || "../images/profile-pictures/default-profile.jpg";


  const postHTML = `
  <div class="post col-8 bg-primary m-1">
    <h3 class="card-title text-break">${title}</h3>
    <div class="d-flex flex-row align-items-center">
      <img src="${avatarUrl}" class="rounded-circle border border-3 profile-pictures" alt="profile image">
      <p class="userName ms-2 mt-1">
        ${author.name}
      </p>
    </div>
    ${media ? `<img src="${media}" class="post-img card-img-top mt-2 rounded mx-auto d-block" alt="${title}"></img>` : ''}
    <div class="card-body text-break">
      <p class="card-text overflow-hidden post-text">${body}</p>
    </div>
    <button class="btn btn-light bg-dark text-white spesificPost" data-post-id="${id}">See post</button>
    <button class="btn bg-primary text-white float-end delete-post-btn ${author.name} d-none" data-post-id="${id}" title="delete post">🗑</button>
    <button type="button" class="editPostBtn ${author.name} btn btn-light bg-dark text-white float-end d-none" data-post-id="${id}">Edit</button>
    <div class="d-flex flex-column flex-sm-row justify-content-evenly mb-3">
      <div class="p-2">⇧ ${reactionsCount} </div>
      <div class="p-2">🗨 ${commentsCount} </div>
      <div class="p-2">${shortenedCreatedDate}</div>
    </div>
  </div>
`;

  return postHTML;
}