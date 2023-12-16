import { logginChecker } from "./utils/loggin-Checker.js";
import { displayPosts } from "./utils/displayPosts.js";
import { fetcher } from "./fetcher.js";
import { displayUsernames } from "./utils/displayUsername.js";
import { checkAndDisplayLogout } from "./logout.js";

checkAndDisplayLogout();
displayUsernames();

/**
 * Main function that checks if a user is logged in and displays either the feed or login page accordingly.
 *
 * @async
 * @function main
 * @returns {Promise<void>}
 */
async function main() {
  const isLoggedIn = logginChecker();

  if (isLoggedIn) {
    const includeAuthor = true;
    const includeComment = true;
    const includeReaction = true;
    const apiUrl = `https://api.noroff.dev/api/v1/social/posts?_author=${includeAuthor}&_comment=${includeComment}&_reaction=${includeReaction}`;
    const posts = await fetcher(apiUrl, {method: 'GET'}, true);
    displayPosts(posts);
    } else {
    displayLoginPage();
  }
}

main();