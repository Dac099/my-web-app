export async function createPost(url, data){
  try {
    const res = await fetch(url, {
      headers : {
        'Content-Type' : 'application/json'
      },

      method: 'POST',

      body : JSON.stringify(data)
    });
    
    const post = await res.json();

    return post;

  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(url, postId){
  try {
    const res = await fetch(`${url}/${postId}`, {
      method: 'DELETE'
    })

    const data = await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getPosts(url){
  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPost(url){
  try {
    const res = await fetch(url);
    const post = await res.json();

    return post;

  } catch (error) {
    console.log(error);
  }
}

export async function getCommentPost(url){
  try {
    const res = await fetch(url);
    const comments = await res.json();

    return comments;

  } catch (error) {
    console.log(error);
  }
}