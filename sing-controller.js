const formUp = document.getElementById('signup');
const formIn = document.getElementById('signin');
const signin_btn = document.getElementById('signin_btn');
const signup_btn = document.getElementById('signup_btn');
const logged_btn = document.getElementById('logged')
const signin_option = document.getElementById('sing-in--option');

const url = 'https://jsonplaceholder.typicode.com/users/';

window.onload = () => {
  formIn.style.display = 'none';
}

logged_btn.addEventListener('click', () => {
  document.title = 'Sign In';
  formUp.style.display = 'none';
  formIn.style.display = 'block';
  signin_option.style.display = 'none';
})

signup_btn.addEventListener('click', async () => {
  try {
    // Create user and redirect to app.html
    const formData = new FormData(formUp);
    const user_data = formToObject(formData);
    console.log(user_data);
    
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(user_data)
    });

    const data = await res.json();

    console.log(data);

  } catch (error) {
    console.log(error);
  }
});

signin_btn.addEventListener('click', () => {
  //Verify if the user exists
  //If rexists redirect to app.html
  //otherwise move to create an account
})

// Function to create an object by a Form
function formToObject(form){
  const object_data = {};

  form.forEach((value, key) => {
    object_data[key] = value;
  })

  return object_data;
}