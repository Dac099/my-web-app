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
    const sidebar = createSidebar(photos, albumId);

    const exist_sidebar = document.querySelector('.sidebar-photos');
    if(exist_sidebar){
      exist_sidebar.remove();
    }
    
    console.log(sidebar);
    container.append(sidebar);
  });
}

function createSidebar(photos, albumId){
  const sidebar = document.createElement('aside');
  sidebar.classList.add('sidebar-photos');
  sidebar.dataset.albumid = albumId;

  photos.forEach(photo => {
    const card_photo =  document.createElement('article');
    const card_title = document.createElement('p');
    card_title.innerHTML = photo.title;
    const photo_element = document.createElement('img');
    photo_element.classList.add('sidebar-photo');
    const url = photo.url.split('/');
    url[3] = '200';
    photo_element.src = url.join('/');
    

    card_photo.append(card_title);
    card_photo.append(photo_element);
    sidebar.append(card_photo);
  });

  return sidebar;
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