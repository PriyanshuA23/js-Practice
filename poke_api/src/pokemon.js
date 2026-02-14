const ESC = "\x1b";
const ST = "\x1b\\";

const fetchPokemon = async (reqPokemon) => {
  const pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${reqPokemon}`,
  );
  return pokemon.json();
};

const convertBytesToBase64 = (rawBytes) => {
  const chars = [];
  rawBytes.forEach((element) => {
    chars.push(String.fromCharCode(element));
  });
  return btoa(chars.join(""));
};

const extractImgBytes = async (pokemonData) => {
  const url = pokemonData.sprites.other.home.front_default;
  const imgArray = await fetch(url);
  return imgArray.arrayBuffer();
};

const displayPokemon = async (pokemonData, base64) => {
  const encoder = new TextEncoder();
  const seq = `${ESC}_Gf=100,a=T;${base64}${ST}`;
  await Deno.stdout.write(encoder.encode(seq));
  console.log("\nName: ", pokemonData.name);
};

const pokemon = async () => {
  try {
    const reqPokemon = prompt("Enter the name or the Id of the pokemon");
    const pokemonData = await fetchPokemon(reqPokemon);
    const rawBytes = await extractImgBytes(pokemonData);
    const bytes = new Uint8Array(rawBytes);
    const base64 = convertBytesToBase64(bytes);
    displayPokemon(pokemonData, base64);
  } catch {
    console.log("Invalid Name or Id");
  }
};

await pokemon();
