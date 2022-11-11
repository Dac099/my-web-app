export async function getUserById(id){
  try {
    const res = await fetch(`${url}/users/${id}`);
    const data = res.json();

  } catch (error) {
    console.log(error);
  }
}

export async function getAllTasks(userId){
  try {
    const res = await fetch(`${url}/todos/?user=${userId}`);
    const data = await res.json();
  } catch (error) {
    console.log(error);
  }
}