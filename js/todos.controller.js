// Create task
export async function createTask(url, task){
  try {
    
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(task)
    });

    const post = await res.json();

    return post;

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
export async function upateTask(url, id, new_data){
  try {
    
    const res = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(new_data)
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

// Get all task
export async function getAllTasks(url, userId){
  try {
    
    const res = await fetch(`${url}/?userId=${userId}`);
    const data = await res.json();

    return data;

  } catch (error) {
    console.log(error);
  }
}