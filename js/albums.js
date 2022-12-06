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

  const album_title = document.createElement('p');
  album_title.innerText = album.title;
  album_title.classList.add('album-card--title');

  const album_preview = document.createElement('div');
  album_preview.classList.add('album-preview');
}