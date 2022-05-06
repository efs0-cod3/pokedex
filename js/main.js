//Example fetch using pokemonapi.co
const container = document.querySelector('.container')
const titl = document.querySelector('.ttl')
const sort = document.querySelector('.surprise')
let cards;
let suggestion;


document.querySelector('.search').addEventListener('click', () => {
  const poke1 = document.querySelector('#poke1').value
  const url = 'https://pokeapi.co/api/v2/pokemon/' + poke1
  getFetch(url)
})
document.querySelector('#poke1').addEventListener('keypress', (e) => {
  const poke1 = document.querySelector('#poke1').value
  const url = 'https://pokeapi.co/api/v2/pokemon/' + poke1
  if (e.code === 'Enter') {
    e.preventDefault()
    getFetch(url)
  }
})


// surprise
sort.addEventListener('click', () => {
  encounterGif()
setTimeout(()=>{
  let random = Math.floor(Math.random() * 905)
  console.log(random);
  const url = 'https://pokeapi.co/api/v2/pokemon/' + random
  getFetch(url)
  
},2800)
})

// Normal 
function getFetch(address) {
  fetch(address)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.types)
      titl.innerHTML = `${data.name}`
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}/`)
        .then(res => res.json()) // parse response as JSON
        .then(species => {
          // console.log(species)
          if (!data.types[1]) {
            cards = `
          <div id="here" class="card">
          <div class="card__header">
            <img class="c-img" src="${data.sprites.front_default}" alt="card__image" class="card__image" width="600">
          </div>
          <div class="card__body">
            <span class="tag tag-${data.types[0].type.name}">${data.types[0].type.name}</span>
            <h4>${data.name}</h4>
            <p>${species.flavor_text_entries[2].flavor_text}</p>
          </div>
          </div>
          `
          } else {
            cards = `
          <div id="here" class="card">
          <div class="card__header">
            <img class="c-img" src="${data.sprites.front_default}" alt="card__image" class="card__image" width="600">
          </div>
          <div class="card__body">
            <span class="tag tag-${data.types[0].type.name}">${data.types[0].type.name}</span>
            <span class="tag tag-${data.types[1].type.name}">${data.types[1].type.name}</span>
            <h4>${data.name}</h4>
            <p>${species.flavor_text_entries[2].flavor_text}</p>
          </div>
          </div>
          `
          }
          container.innerHTML = cards
        })
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}



function encounterGif(){
 let encounter = `<video autoplay="true" src="../img/pokeaudio.mp4" alt="card__image" class="card__image" width="600">`
  container.innerHTML = encounter
}