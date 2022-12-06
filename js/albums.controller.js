export async function getPhotosByAlbum(url, albumId){
  try { 
    const res = await fetch(`${url}?albumId=${albumId}`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function addNewPhoto(url, data){
  try {
    const post = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updatePhoto(url, photoId, data){
  try {
    const put = await fetch(`${url}/${photoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    })
  } catch (error) {
    console.log(error);
  }
}

export async function getAlbumsByUser(url, userId){
  try {
    const res = await fetch(`${url}?userId=${userId}`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function addNewAlbum(url, data){
  try {
    const post = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    });
    const res = await post.json();

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function updateAlbum(url, albumId, data){
  try {
    const put = await fetch(`${url}/${albumId}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    });
    const res = await put.json();

    return res;
  } catch (error) {
    console.log(error);
  }
}

