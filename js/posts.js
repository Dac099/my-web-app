import * as Post from './posts.controller.js';

const posts_url = 'https://jsonplaceholder.typicode.com/posts';
const comments_url = 'https://jsonplaceholder.typicode.com/comments';

const container = document.getElementById('posts-container');
const post_title = document.getElementById('post-title');
const post_body = document.getElementById('post-body');
const post_btn = document.getElementById('post-btn');

window.onload = () => {
  addPostsCards();
  createNewPost();

  setTimeout(() => {
    sideTool('Hold a post for delete it!');
  }, 2000);
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
    const delete_btn = document.createElement('img');

    post_data.classList.add('post-data');
    
    delete_btn.src = '../media/delete.png';
    delete_btn.classList.add('delete-btn');
    delete_btn.alt = 'Image of X for delete the post'

    post_comments.classList.add('post-comments');
    post_comments.classList.add('scroll');

    post_card.classList.add('post-card')

    post_data.innerHTML = `
      <h3 class="post-title"> <img src="../media/user.png" class="user-img"></img> ${post.title}</h3>
      <p class="post-body">${post.body}</p>
    `;

    const comments = await Post.getCommentPost(`${comments_url}/?postId=${post.id}`);
    addCardComments(comments, post_comments);

    post_card.append(delete_btn);
    post_card.append(post_data);
    post_card.append(post_comments);

    deleteControl(post_card);

    (posts.length > 1) 
      ? container.append(post_card) 
      : container.prepend(post_card);
  });
}

function deleteControl(card){
  let timer_control;
  const delete_btn = card.querySelector('.delete-btn');
  const main = document.querySelector('main');

  card.addEventListener('mousedown', () => {
    timer_control = setTimeout(() => {
      delete_btn.style.display = 'block';

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          delete_btn.style.display = 'none';
          card.classList.remove('tremble');
        }
      });

      card.classList.add('tremble');
    }, 1200);
  });

  card.addEventListener('mouseup', () => {
    clearTimeout(timer_control);
  });

  card.addEventListener('touchstart', () => {
    timer_control = setTimeout(() => {
      delete_btn.style.display = 'block';

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          delete_btn.style.display = 'none';
          card.classList.remove('tremble');
        }
      });

      card.classList.add('tremble');
    });
  });

  card.addEventListener('touchend', () => {
    clearTimeout(timer_control);
  });
}

function addCardComments(comments, container){
  if(comments.length === 0){
    container.innerHTML = `
      <p>No comments yet</p>
    `;
    return;
  }
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

function createNewPost(){
  post_btn.addEventListener('click', async() => {
    const post_data = {
      body: post_body.value,
      title: post_title.value
    }

    const result = await Post.createPost(
      `${posts_url}/?userId=${localStorage.getItem('id')}`, 
      post_data
    );

    post_body.value = '';
    post_title.value = '';
    createCards([result]);
  });
}

function sideTool(text){
  const tool = document.getElementById('side-tip');
  
  tool.innerHTML = text;
  tool.classList.add('show-up');

  setTimeout(() => {
    tool.classList.remove('show-up');
  }, 7000);
}