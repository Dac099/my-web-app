//Elements for card profile
const user_name = document.querySelector('.user-name');
const alias = document.getElementById('profile_username');
const user_email = document.getElementById('proflie_email');
const user_phone = document.getElementById('profile_phone');
const user_website = document.getElementById('profile_website');
const user_id = document.getElementById('profile_id');
const last_comments = document.querySelector('.my-last-comments');
const comments_url = 'https://jsonplaceholder.typicode.com/posts';

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
  const postId = await getLastUserPost(comments_url, id);
}