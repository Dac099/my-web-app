//Elements for card profile
const user_name = document.querySelector('.user-name');
const alias = document.getElementById('profile_username');
const user_email = document.getElementById('proflie_email');
const user_phone = document.getElementById('profile_phone');
const user_website = document.getElementById('profile_website');
const user_id = document.getElementById('profile_id');


function buildUser(iterable){
  const object_data = {};

  for (const [key, value] of Object.entries(iterable)){
    object_data[key] = value;
  }

  return object_data;
}

// Buil an object from the localstorage data
const user_data = buildUser(localStorage);
const {name, username, email, phone, website, id} = user_data;

user_name.innerHTML = name;
alias.innerHTML = username;
user_email.innerHTML = email;
user_phone.innerHTML = phone;
user_website.innerHTML = website;
user_id.innerHTML = id;


// Print data in the card elements

