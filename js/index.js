//Elements for card profile
const user_name = document.querySelector('.user-name');
const alias = document.getElementById('profile_username');
const user_email = document.getElementById('proflie_email');
const user_phone = document.getElementById('profile_phone');
const user_website = document.getElementById('profile_website');
const user_id = document.getElementById('profile_id');
const last_comments = document.querySelector('.comments');
const get_out = document.getElementById('get-out');

const posts_url = 'https://jsonplaceholder.typicode.com/posts';
const comments_url = 'https://jsonplaceholder.typicode.com/comments';

function buildUser(iterable){
  const object_data = {};

  for (const [key, value] of Object.entries(iterable)){
    object_data[key] = value;
  }

  return object_data;
}

async function getLastUserPost(url, userId){
  try {
    const data = await fetch(`${url}/?userId=${userId}`);
    const res = await data.json();

    const LAST_POST_POSITION = res.length - 1;
    return res[LAST_POST_POSITION].id;
  } catch (error) {
    console.log(error);
  }
}

async function getCommentsByPostId(url, postId){
  try {
    const res = await fetch(`${url}/?postId=${postId}`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

function printComments(comments){
  comments.forEach(comment => {
    last_comments.append(createCommentCard(comment));
  });
}

function createCommentCard(comment){
  const article = document.createElement('article');
  article.classList.add('comment-card');

  article.innerHTML = `
    <p>${comment.email}</p>
    <p>${comment.body}</p>
    <p data-status="false" class="like-comment">&#10084;</p>
  `;

  article.addEventListener('click', (e) =>{
    if(e.target.dataset.status){
      e.target.dataset.status = (e.target.dataset.status === 'false') ? 'true' : 'false';
    }
  });

  return article;
}

get_out.addEventListener('click', () => {
  window.location.replace('../html/index.html');
  localStorage.clear();
});

window.onload = async() => {
  // Buil an object from the localstorage data
  const user_data = buildUser(localStorage);
  const {name, username, email, phone, website, id} = user_data;

  // Print data in the card elements
  user_name.innerHTML = name;
  alias.innerHTML = username;
  user_email.innerHTML = email;
  user_phone.innerHTML = phone;
  user_website.innerHTML = website;
  user_id.innerHTML = id;

  //Get the last post of the user
  const postId = await getLastUserPost(posts_url, id);

  //Get all the comments width the postId
  const last_comments = await getCommentsByPostId(comments_url, postId);

  printComments(last_comments);

}