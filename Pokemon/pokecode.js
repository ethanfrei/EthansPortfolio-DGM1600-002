import { removeChildren } from "../utils/index.js";

function getAPIData(url) {
  try {
    return fetch(url).then((data) => data.json());
  } catch (error) {
    console.error(error);
  }
}

function loadPokemon(offset = 0, limit = 25, filterType) {
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then(async (data) => {
    console.log(data);
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) => {
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

loadPokemon(1, 50)

const pokeGrid = document.querySelector(".pokeGrid");


const fireButton = document.querySelector('.Fire')
fireButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  loadPokemon(1, 50, "fire")
})


const waterButton = document.querySelector('.Water')
waterButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  loadPokemon(1, 50, "water")
})

const grassButton = document.querySelector('.Grass')
grassButton.addEventListener('click', () => {

})
const normalButton = document.querySelector('.Normal')
normalButton.addEventListener('click', () => {

})
const electricButton = document.querySelector('.Electric')
electricButton.addEventListener('click', () => {

})
const bugButton = document.querySelector('.Bug')
bugButton.addEventListener('click', () => {

})

const psychicButton = document.querySelector('.Psychic')
psychicButton.addEventListener('click', () => {
  
})



const loadButton = document.querySelector(".loadPokemon");
loadButton.addEventListener("click", () => {
  removeChildren(pokeGrid);
  loadPokemon(100, 5);
});

// function getTypesList() {
//   var typesList = []
//   for(var i= 0; i < pokemon.length; j++) {
//     for(var j = 0; j < pokemon[i].types.length; j++){
//       var type = pokemon[i].types[j]
//       if(typesList.indexOf(type) === -1) {
//         typesList.push(type)
//       }
//     }
//   }
//   typesList.sort()
//   return typesList
// }
// console.log(getTypesList )



//  function filterPokeType (singlePokemon, pokeFilter) {
//    const filteredArray = singlePokemon.filter(pokemon => pokemon.type === pokeFilter)
//    return filteredArray
//  }
//  console.log(filterPokeType (getTypesArray (), "electric"))



// const allPokemon = []

// const fireButton = document.querySelector('.Fire')
// fireButton.addEventListener('click', () =>{
//   getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0`)
//   .then(async (data) => {
//     for (const pokemon of data.results) {
//       await getAPIData(pokemon.url).then((pokeData) => {
//         const mappedPokemon =  {
// abilities: pokeData.abilities,
// height: pokeData.height,
// id: pokeData.id,
// name: pokeData.name,
// types: pokeData.types,
// weight: pokeData.wdight
//         }
//         allPokemon.push(mappedPokemon)
//       })
//     }
//     console.log(allPokemon)

//   })
// })



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
  constructor(name, height, weight, abilities, types) {
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
  pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

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
      color = "#00ff00";
      break;

    case "fire":
      color = "#ff0000";
      break;

    case "water":
      color = "#0000ff";
      break;

    case "bug":
      color = "#7fff00";
      break;

    case "normal":
      color = "#f5f5dc";
      break;

    case "flying":
      color = "#00ffff";
      break;

    case "poison":
      color = "#c300f";
      break;

    case "electric":
      color = "#c8ff00";
      break;

      case "psychic":
      color = "#333333";
      break;

    default:
      color = "#888888";
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
const typesList = document.createElement('ol')
pokemon.types.forEach((pokeType) => {
  let typesItem = document.createElement('li')
  typesItem.textContent = pokeType.type.name
  typesList.appendChild(typesItem)
})
  pokeBack.appendChild(abilityList);
  pokeBack.appendChild(typesList)
  return pokeBack;
}
