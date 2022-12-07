import * as Media from './albums.controller.js';
const albums_url = 'https://jsonplaceholder.typicode.com/albums';
const photos_url = 'https://jsonplaceholder.typicode.com/photos';

const container = document.getElementById('albums-container');
const input_album_title = document.getElementById('album-title');
const album_title_btn = document.getElementById('album-btn');

//example of listeners for editing album title
input_album_title.addEventListener('pointerleave', () => {
  console.log(input_album_title.value);
});

function createAlbumCard(album){
  const album_card = document.createElement('article');
  album_card.dataset.id = album.id;
  album_card.classList.add('album-card');

  const album_title = document.createElement('input');
  album_title.value = album.title;
  album_title.placeholder = 'Task title';
  album_title.classList.add('album-card--title');

  const album_preview = document.createElement('div');
  album_preview.classList.add('album-preview');
  photosAlbumPreview(album_preview, album.id);

  album_card.append(album_title);
  album_card.append(album_preview);

  albumCardListeners({title: album_title, preview: album_preview}, album.id);

  return album_card;
}

function albumCardListeners(album_card, albumId){
  const {title,preview} = album_card;
  let titleBefore = '';

  title.addEventListener('pointerenter', () => {
    titleBefore = title.value;
  });
  
  title.addEventListener('pointerleave', async () => {
    //Just update title value in server if there is change
    if(titleBefore != title.value){
      const album_updated = await Media.updateAlbum(albums_url, albumId, {
        title : title.value,
        userId : localStorage.getItem('id')
      });
    }
  });

  preview.addEventListener('click', async () => {
    //todo: Show a sidebar with all the photos in it
    const photos = await Media.getPhotosByAlbum(photos_url, albumId);
    console.log(photos);
  });
}

async function photosAlbumPreview(preview_section, albumId){
  try { 
    const data = await Media.getPhotosByAlbum(photos_url, albumId);
    
    //Create preview with just 5 photos
    for(let i = 0; i <= 5; i++){
      const img = document.createElement('img');

      //Changing a value of the url to get images with widsth=50px
      const url = data[i].thumbnailUrl.split('/');
      url[3] = '50';
      url.join('/');

      img.src = url.join('/');
      preview_section.append(img);
    }

  } catch (error) {
    console.log(error);
  }
}

async function appendAlbums(){
  try {
    const data = await Media.getAlbumsByUser(albums_url, localStorage.getItem('id'));
    data.forEach(album => {
      const album_element = createAlbumCard(album);
      container.append(album_element);
    });
  } catch (error) {
    console.log(error);
  }
}

//todo: Create a new albul with the album_title_btn

window.onload = () => {
  appendAlbums();
}