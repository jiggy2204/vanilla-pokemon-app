const getPokemonList = fetch(
  `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150`
)
  .then((res) => res.json())
  .then((data) => {
    var currPokemon = document.getElementById("pokemonInput");
    currPokemon.addEventListener("change", (e) => {
      let pokeValue = e.target.value;
      getPokemonDescription(pokeValue);
      getCard();
    });

    data.results.forEach((item) => {
      dropListItems(item);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const getPokemonDescription = (name) =>
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
    .then((res) => res.json())
    .then((data) => {
      let description = data.flavor_text_entries[0].flavor_text.replace(
        /[\n\f]/g,
        " "
      );
      let pEl = document.getElementById("pokemon-description");
      let imgEl = document.getElementById("pokemon-sprite");
      pEl.innerHTML = "";
      pEl.append(description);
      imgEl.setAttribute("src", getPokemonSpriteUrl(data.id));
    })
    .catch((err) => {
      console.log(err);
    });

function getPokemonSpriteUrl(num) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`;
}

//creating the dropdown items
function dropListItems(item) {
  let select = document.getElementById("pokemonInput");
  let option = document.createElement("option");
  option.value = item.name;
  option.text = item.name;
  return select.add(option);
}

//hide card until a pokemon is selected
function getCard() {
  let selection = document.getElementById("pokemonInput");
  let option = selection.value.toString();
  let card = document.getElementById("pokemon-card");

  console.log(option);

  if (option != "default") {
    card.classList.add("active");
  } else {
    card.classList.remove("active");
  }
}
