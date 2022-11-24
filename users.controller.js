// Update user
export async function updateUser(url, id, user_data){
  try {

    const res = await fetch(`${url}${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(user_data)
    });

    const data = await res.json();

    return data;

  } catch (error) {
    console.log(error);
  }
}

// Get user
export async function getUser(url, username){
  try {
    
    const res = await fetch(`${url}/?username=${username}`);
    
    const data = await res.json();

    return data;

  } catch (error) {
    console.log(error);
  }
}

// Get Users
export async function getUsers(url){
  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}