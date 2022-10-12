const container = document.getElementById('imgContainer');
const reloadBtn = document.getElementById('reload');
const title = document.getElementById('title');

function buildURL(){
  const baseURL = 'https://rickandmortyapi.com/api';
  return `${baseURL}/location/${Math.round(Math.random() * (1 + 126) + 1)}`;
}

async function getLocation(url){
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.log(error);
    alert('An error ocurred, sorry');
  }
}

async function createContent(data){
  title.innerText = data.dimension;

  if(data.residents.length > 0){
    const images = [];

    data.residents.forEach(resident => {
      createCard();
    });

    return images;

  }else{
    container.innerHTML = `
      <h3>No existen personajes para esta Dimensión</h3>
    `;
  }
}

async function createCard(url){
  const response = await fetch(url);
  const data = await response.json();
  const srcImg = data.image;

  return srcImg;
}


reloadBtn.addEventListener('click', async () => {
  let url = buildURL();
  const data = await getLocation(url);
})