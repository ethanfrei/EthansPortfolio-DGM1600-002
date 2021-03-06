import { removeChildren } from "../utils/index.js";

const pokeCache = {}


function getAPIData(url) {
  if (url in pokeCache) {
    return Promise.resolve(pokeCache[url])
  }
  try {
    return fetch(url).then(async (data) => {
      const json = await data.json ()
      pokeCache[url] = json
      return json
    });
    
  } catch (error) {
    console.error(error);
  }
}
//above I added a cache so the browser will remember which pokemon have been loaded so the pokemon will load quicker

function loadPokemon(offset = 0, limit = 25, filterType) {
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then(async (data) => {
    console.log(data);
    for (const pokemon of data.results) {
       getAPIData(pokemon.url).then((pokeData) => {
        if(filterType ===  undefined) {
          populatePokeCard(pokeData)
        }
        else {
          pokeData.types.forEach((pokeType) => {
            if(pokeType.type.name == filterType){
              populatePokeCard(pokeData)
              
            }
            
          })
          
        }
        
      });
    }
  });
}

//I updated the loadPokemon function from await so they load even quicker. I also added else to filter out pokeTypes filtered with the buttons


  
  const form = document.getElementById('searchBar')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = form.querySelector('#searchInput')
    const pokeSearch = new RegExp(input.value.toLowerCase())

    getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=-1`).then(data => {
      const matches = data.results.filter(pokemon => pokeSearch.test(pokemon.name))
      removeChildren(pokeGrid)
      matches.forEach(match => {
        getAPIData(match.url).then(populatePokeCard)
      })
      
    })
  })

//I used a Regular Expression which holds a pattern to test the strings that are input to the searchbar.



getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=-1`).then()

loadPokemon(0, 99)

const pokeGrid = document.querySelector(".pokeGrid");


const fireButton = document.querySelector('.Fire')
fireButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  loadPokemon(1, 100, "fire")
  

})


const waterButton = document.querySelector('.Water')
waterButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  loadPokemon(1, 100, "water")
})

const grassButton = document.querySelector('.Grass')
grassButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  loadPokemon(1, 100, "grass")

})
const normalButton = document.querySelector('.Normal')
normalButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  loadPokemon(1, 100, "normal")

})
const electricButton = document.querySelector('.Electric')
electricButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  loadPokemon(1, 100, "electric")

})
const bugButton = document.querySelector('.Bug')
bugButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  loadPokemon(1, 100, "bug")

})

const psychicButton = document.querySelector('.Psychic')
psychicButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  loadPokemon(1, 100, "psychic")
  
})
const flyingButton = document.querySelector('.Flying')
flyingButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  loadPokemon(1, 100, "flying")
  
})

const poisonButton = document.querySelector('.Poison')
poisonButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  loadPokemon(1, 100, "poison")
  
})



 const loadButton = document.querySelector(".loadPokemon");
 loadButton.addEventListener("click", () => {
   removeChildren(pokeGrid);
   loadPokemon(1, 100);
 });

 

const moreButton = document.querySelector(".morePokemon");
moreButton.addEventListener("click", () => {
  let limit = prompt("How many more Pokemon should I load?");
  let offset = prompt("At which Pokemon ID should I start loading?");
  loadPokemon(offset, limit);
});

const newButton = document.querySelector(".newPokemon");
newButton.addEventListener("click", () => {
  let pokeName = prompt("Name your Pokemon!");
  let pokeHeight = prompt("Pokemon height:");
  let pokeWeight = prompt("Pokemon weight:");
  let pokeAbilities = prompt(
    "Pokemon Abilities (please use a comma separated list):"
  );
  let pokeTypes = prompt("What are your Pokemon's types? (up to two types separated by a space)")
  let newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    getAbilitiesArray(pokeAbilities),
    getTypesArray(pokeTypes)
  );

  populatePokeCard(newPokemon);
});

function getAbilitiesArray(commaString) {
  let tempArray = commaString.split(",");
  return tempArray.map((abliityName) => {
    return {
      ability: {
        name: abliityName,
      },
    };
  });
}

function getTypesArray(spacedString) {
  let tempArray = spacedString.split(' ')
  return tempArray.map((typeName) => {
    return {
      type: {
        name: typeName
      }
    }
  })
}

class Pokemon {
  constructor(name, height, weight, abilities, types ) {
    (this.id = 100),
      (this.name = name),
      (this.height = height),
      (this.weight = weight);
    this.abilities = abilities;
    this.types = types
  }
}

function populatePokeCard(singlePokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  );

  const front = populateCardFront(singlePokemon);
  const back = populateCardBack(singlePokemon);

  pokeCard.appendChild(front);
  pokeCard.appendChild(back);
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure")
  pokeFront.className = 'cardFace front'

  const pokeImg = document.createElement("img")
  if (pokemon.id === 100 || pokemon.id === 10085) {
    pokeImg.src = '../images/pokeball.png'
  } 
  else {
    
  pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
}
 
  const pokeCaption = document.createElement("figcaption")

  pokeCaption.textContent = pokemon.name
  pokeFront.appendChild(pokeImg)
  pokeFront.appendChild(pokeCaption)

  typesBackground(pokemon, pokeFront)
  return pokeFront
}

function typesBackground(pokemon, card) {
  let pokeType1 = pokemon.types[0].type.name;
  let pokeType2 = pokemon.types[1]?.type.name;
  console.log(pokeType1, pokeType2)
  if(!pokeType2) {
    card.style.setProperty('background' , getPokeTypeColor(pokeType1))
  } else {
    card.style.setProperty(
      "background",
      `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(pokeType2)})`,
    );
  }
  
}

function getPokeTypeColor(pokeType) {
  let color;
  switch (pokeType) {
    case "grass":
      color = "#a2d4a7";
      break;

    case "fire":
      color = "#f4ac90";
      break;

    case "water":
      color = "#acbdb8";
      break;

    case "bug":
      color = "#c6e4cd";
      break;

    case "normal":
      color = "#caa779";
      break;

    case "flying":
      color = "#d0eae0";
      break;

    case "poison":
      color = "#a99eb4";
      break;

    case "electric":
      color = "#fbf4a4";
      break;

      case "psychic":
      color = "#cbb6d8";
      break;

    default:
      color = "#f5f2d0";
  }
  return color
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";
  const label = document.createElement("h4");
  label.textContent = "Abilities:";
  pokeBack.appendChild(label);
  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    let listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);
  });
  
  
const typesList = document.createElement('h4')
pokemon.types.forEach((pokeType) => {
  let typesItem = document.createElement('li')
  typesItem.textContent = pokeType.type.name
  typesList.appendChild(typesItem)
})
  pokeBack.appendChild(abilityList);
  pokeBack.appendChild(typesList);

  if(pokemon.stats) {
  const pokeHP = document.createElement('h4')
  pokeHP.textContent = `HP: ${pokemon.stats[0].base_stat}`
  pokeBack.appendChild(pokeHP);
  }
  const pokeHeight = document.createElement('h5')
  pokeHeight.textContent = `Height: ${pokemon.height}`

  const pokeWeight = document.createElement('h5')
  pokeWeight.textContent = `Weight: ${pokemon.weight}`
  
  
  
  pokeBack.appendChild(pokeWeight);
  pokeBack.appendChild(pokeHeight);
  return pokeBack
}