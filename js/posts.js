import * as Post from './posts.controller.js';

const posts_url = 'https://jsonplaceholder.typicode.com/posts';
const comments_url = 'https://jsonplaceholder.typicode.com/comments';
const container = document.getElementById('posts-container');

window.onload = () => {
  addPostsCards();
}

async function addPostsCards(){
  const user_id = localStorage.getItem('id');
  const posts = await Post.getPosts(`${posts_url}/?userId=${user_id}`);

  createCards(posts);
}

function createCards(posts){
  posts.forEach(async (post) => {
    const post_card = document.createElement('article');
    const post_data = document.createElement('section');
    const post_comments = document.createElement('section');
    post_comments.classList.add('post-comments');
    post_comments.classList.add('scroll');

    post_card.classList.add('post-card')

    post_data.innerHTML = `
      <h3 class="post-title"> <img src="../media/user.png" class="user-img"></img> ${post.title}</h3>
      <p class="post-body">${post.body}</p>
    `;

    const comments = await Post.getCommentPost(`${comments_url}/?postId=${post.id}`);
    addCardComments(comments, post_comments);

    post_card.append(post_data);
    post_card.append(post_comments);
    container.append(post_card);
  });
}

function addCardComments(comments, container){
  comments.forEach(comment => {
    const comment_card = document.createElement('article');
    comment_card.classList.add('post-comment');
    comment_card.innerHTML = `
      <p class="comment-email"><img src="../media/user.png" class="user-img user-comment">${comment.email}</p>
      <p class="comment-name">${comment.name}</p>
      <p class="comment-body">${comment.body}</p>
    `;

    container.append(comment_card);
  });

}