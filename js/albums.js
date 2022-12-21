import * as Media from './albums.controller.js';
const albums_url = 'https://jsonplaceholder.typicode.com/albums';
const photos_url = 'https://jsonplaceholder.typicode.com/photos';

const container = document.getElementById('albums-container');
const input_album_title = document.getElementById('album-title');
const album_title_btn = document.getElementById('album-btn');


function createAlbumCard(album){
  const album_card = document.createElement('article');
  album_card.dataset.id = album.id;
  album_card.classList.add('album-card');

  const album_title = document.createElement('textarea');
  album_title.wrap = 'hard';
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
    const photos = await Media.getPhotosByAlbum(photos_url, albumId);
    const sidebar = openAndFillModal(photos, albumId);
  });
}

function openAndFillModal(photos, albumId){
  const modal = document.getElementById('modal');
  const modal_content = document.getElementById('modal-content');
  const close_btn = document.getElementById('close_btn');
  const body = document.querySelector('body');

  clearContainer(modal_content);

  modal.style.display = 'grid';
  body.style.overflow = 'hidden';

  close_btn.addEventListener('click', () => {
    modal.style.display = 'none'
    body.style.overflow = 'auto';
  });

  window.onclick = (e) => {
    if(e.target === modal){
      modal.style.display = 'none';    
      body.style.overflow = 'auto';
    }
  }

  photos.forEach(photo => {
    const card = document.createElement('article');
    const url = photo.url.split('/');
    url[3] = '300';

    card.innerHTML = `
      <p class="photo-card-title">${photo.title}</p>
      <img src=${url.join('/')} alt="Imagen de un album" class="photo-card-img">
    `;

    modal_content.append(card);
  });

  modal.dataset.id = albumId;
  return modal;
}

function clearContainer(container){
  while(container.firstChild != null){
    container.firstChild.remove();
  }
}

async function photosAlbumPreview(preview_section, albumId){
  try { 
    const data = await Media.getPhotosByAlbum(photos_url, albumId);
    
    if(data.length == 0){
      preview_section.innerHTML = '<p>No photos yet! :c</p>';
      return;
    }

    //Create preview with just 5 photos
    for(let i = 0; i <= 5; i++){
      const img = document.createElement('img');

      //Changing a value of the url to get images with widsth=50px
      const url = data[i].thumbnailUrl.split('/');
      url[3] = '60';
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

async function createNewAlbum(){
  try {
    let control = 0;
    album_title_btn.addEventListener('click', async () => {
      if(input_album_title.value != ''){
        const album = await Media.addNewAlbum(albums_url, {
        userId : localStorage.getItem('id'),
          title: input_album_title.value
        });
  
        const album_card = createAlbumCard(album);
  
        container.append(album_card);
      }else{
        control++;
        if(control > 2){
          alert("Please, write a title!!");
          control = 0;
        }else{        
          alert("What is the album title?")
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

window.onload = () => {
  appendAlbums();
  createNewAlbum();
}