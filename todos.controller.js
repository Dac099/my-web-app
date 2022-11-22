// Create task
export async function createTask(url, formData){
  try {
    
    const res = await fetch(url, {
      method: 'POST',
      body: formData
    });

    const post = await res.json();

    console.log(post);

  } catch (error) {
    console.log(error);
  }
}

// Delete task
export async function deleteTask(url, id){
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

// Update task
export async function upateTask(url, id){
  try {
    
    const res = await fetch(`${url}/${id}`, {
      method: 'PUT',
      body: formData
    })

    const data = await res.json();

    console.log(data)

  } catch (error) {
    console.log(error);
  }
}

// Get task
export async function getTask(url, id){
  try {
 
    const res = await fetch(`${url}/${id}`);

    const data = await res.json();

    console.log(data);

  } catch (error) {
    console.log(error);
  }
}