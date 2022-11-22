// Create user
export async function createUser(url, formData){
  try {
    const post = await fetch(url, {
      method: 'POST',
      body: formData
    });

    const result = await post.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// Delete user
export async function deleteUser(url, id){
  try {
    
    const res = await fetch(`${url}/${id}`, {
      method: 'DELETE'
    })

    const data = await res.json();

    console.log(data);

  } catch (error) {
    console.log(error);
  }
}

// Update user
export async function updateUser(url, id, formData){
  try {

    const res = await fetch(`${url}/${id}`, {
      method: 'PUT',
      body: formData
    });

    const data = await res.json();

    console.log(data);

  } catch (error) {
    console.log(error);
  }
}

// Get user
export async function getUser(url, id){
  try {
    
    const res = await fetch(`${url}/${id}`);
    
    const data = await res.json();

    console.log(data);

  } catch (error) {
    console.log(error);
  }
}