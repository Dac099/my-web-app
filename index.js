const img = document.getElementById('imgContainer');
const reloadBtn = document.getElementById('reload');

async function getImage(url){
  try {
    const random =  Math.round(Math.random() * (0 + 20) + 0);
    const response = await fetch(url);
    const data = await response.json();
    const srcImage = data.results[random].image;
  
    img.src = srcImage;
  } catch (error) {
    console.log(error);
    alert('An error ocurred, sorry');
  }
}

getImage(`https://rickandmortyapi.com/api/character?page=${Math.round(Math.random() * (1 + 42) + 1)}`);

reloadBtn.addEventListener('click', () => {
  let url = `https://rickandmortyapi.com/api/character?page=${Math.round(Math.random() * (1 + 42) + 1)}`;
  getImage(url);
})