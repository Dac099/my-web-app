
const users_url = 'https://jsonplaceholder.typicode.com/users';
const signup_btn = document.getElementById('signup');
const users_list = document.getElementById('users');
const userSelected = document.getElementById('input-users');
import {getUsers, getUser} from './users.controller.js';

window.onload = async () => {
  try {
    localStorage.clear();

    const data = await getUsers(users_url);
    
    data.forEach(user => {
      const option = document.createElement('option'); 
      option.value = user.username;
      users_list.append(option);
    });

  } catch (error) {
    alert(error);
  }
}

signup_btn.addEventListener('click', async () => {
  try {
    const user = await getUser(users_url, userSelected.value);
    saveUser(user[0]);
    window.location.href = './html/app.html';
  } catch (error) {
    console.log(error);
  }
});

function saveUser(user){
  for(const [key, value] of Object.entries(user)){
    if(typeof value === 'object'){
      saveUser(value);
    }else{
      localStorage.setItem(key, value);
    }
  }
}