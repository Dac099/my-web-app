const container = document.getElementById('imgContainer');
const reloadBtn = document.getElementById('reload');
const place = document.getElementById('name');
const dimension = document.getElementById('dimension');

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
  place.innerHTML = `<span id="p1">Lugar:</span> ${data.name}`;
  dimension.innerHTML = `<span id="p2">Dimension:</span> ${data.dimension}`;

  if(data.residents.length > 0){

    data.residents.forEach(resident => {
      createCard(resident);
    });

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

  const img = document.createElement('img');
  img.src = srcImg;

  container.append(img);
  return srcImg;
}


reloadBtn.addEventListener('click', async () => {
  container.innerHTML = '';
  let url = buildURL();
  const data = await getLocation(url);
  createContent(data);
})