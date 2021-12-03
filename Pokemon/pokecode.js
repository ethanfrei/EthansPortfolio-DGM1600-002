import { removeChildren } from "../utils/index.js";

function getAPIData(url) {
  try {
    return fetch(url).then((data) => data.json());
  } catch (error) {
    console.error(error);
  }
}

function loadPokemon(offset = 0, limit = 25) {
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then(async (data) => {
    console.log(data);
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCard(pokeData)
      );
    }
  });
}

const pokeGrid = document.querySelector(".pokeGrid");
const loadButton = document.querySelector(".loadPokemon");

loadButton.addEventListener("click", () => {
  removeChildren(pokeGrid);
  loadPokemon(100, 5);
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
  let newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    getAbilitiesArray(pokeAbilities)
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

class Pokemon {
  constructor(name, height, weight, abilities) {
    (this.id = 100),
      (this.name = name),
      (this.height = height),
      (this.weight = weight);
    this.abilities = abilities;
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
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";

  const pokeImg = document.createElement("img");
  pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const pokeCaption = document.createElement("figcaption");
  pokeCaption.textContent = pokemon.name;
  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCaption);

  //typesBackground(pokemon, pokeFront);
  return pokeFront;
}

function typesBackground(pokemon, card) {
  let pokeType1 = pokemon.types[0].type.name;
  let pokeType2 = pokemon.types[1]?.type.name;
  console.log(pokeType1, pokeType2)
  card.style.setProperty(
    "background",
    `linear-gradient(${getPokeTypeColor(pokeType1)}, #ffffff 
    })`,
  );
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

  pokeBack.appendChild(abilityList);
  return pokeBack;
}
