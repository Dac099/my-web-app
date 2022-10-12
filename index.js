const img = document.getElementById('imgContainer');
const reloadBtn = document.getElementById('reload');
const title = document.getElementById('title');

function buildURL(){
  const baseURL = 'https://rickandmortyapi.com/api';
  return `${baseURL}/location/${Math.round(Math.random() * (1 + 126) + 1)}`;
}

function getCharacters(array){
  const jsonCharacter = array.map(character => {
    getCharacterImg(character);
  });

  return jsonCharacter;
}

async function getCharacterImg(character){
  try {
    const res = await fetch(character);
    const data = await res.json();

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  } 
}

async function getLocation(url){
  try {
    const response = await fetch(url);
    const data = await response.json();
    const characters = data.residents;
    const dimension = data.dimension;

    title.innerText = dimension;
    const residents = getCharacters(characters);

    console.log(residents);
  } catch (error) {
    console.log(error);
    alert('An error ocurred, sorry');
  }
}


reloadBtn.addEventListener('click', () => {
  let url = buildURL();
  getLocation(url);
})