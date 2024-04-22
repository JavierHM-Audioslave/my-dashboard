import { DetailedPokemon } from "@/interfaces/pokemons/detailed-pokemon";
import { PokemonResponse } from "@/interfaces/pokemons/pokemon-response";
import { PokemonsResponse } from "@/interfaces/pokemons/pokemons-response";
import { SimplePokemon } from "@/interfaces/pokemons/simple-pokemon";
import Image from "next/image";
import { ReactNode } from "react";

// This function gets a bundle of pokemons as many as indicated in limit variable. Then, the data is casted to JSON and an array of SimplePokemon promises is returned.
const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  try {
    const data: Response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const dataToJson: PokemonsResponse = await data.json();
    const pokemons: SimplePokemon[] = dataToJson.results.map((pokemon) => ({
      id: pokemon.url.split("/").at(-2) || "",
      name: pokemon.name,
      url: new URL(pokemon.url),
    }));
    return pokemons;
  } catch (error) {
    console.error(error);
    throw new Error("Error al conectar a la API.");
  }
};

//This function call getPokemons function, parses the data into JSON and creates a promise of DetailedPokemon array. Then, the function returns only the elements (which are Promise) whose status is fulfilled.
const getDetailedPokemon = async (): Promise<DetailedPokemon[]> => {
  const pokemons: SimplePokemon[] = await getPokemons(200);
  const detailedPokemonsPromise: Promise<DetailedPokemon>[] = pokemons.map(
    async (pokemon: SimplePokemon) => {
      try {
        const data: Response = await fetch(pokemon.url);
        const dataToJson: PokemonResponse = await data.json();
        const tempDetailedPokemon: DetailedPokemon = {
          sprites: dataToJson.sprites,
        };
        return tempDetailedPokemon;
      } catch (error) {
        console.error(error);
        throw new Error(
          "No fue posible obtener detalles de los pokemones a través de la API"
        );
      }
    }
  );

  const detailedPokemons: PromiseSettledResult<DetailedPokemon>[] =
    await Promise.allSettled(detailedPokemonsPromise);
  const actualDetailedPokemons: DetailedPokemon[] = detailedPokemons.map(
    (detailedPokemon) => {
      if (detailedPokemon.status === "fulfilled") return detailedPokemon.value;
    }
  ) as DetailedPokemon[];
  return actualDetailedPokemons;
};

export default async function PokemonsPage(): Promise<ReactNode> {
  try {
    const detailedPokemons = await getDetailedPokemon();
    return (
      <div className="flex flex-row flex-wrap justify-center items-center px-40">
        {detailedPokemons &&
          detailedPokemons.map((detailedPokemon) => {
            if (detailedPokemon?.sprites)
              return (
                <div key={detailedPokemon.sprites.front_default}>
                  <Image
                    src={detailedPokemon.sprites.front_default}
                    alt="Pokemon image"
                    width={110}
                    height={110}
                  />
                </div>
              );
          })}
      </div>
    );
  } catch (err) {
    if (err instanceof Error) {
      return <div>{err.message}</div>;
    }
    return "Error";
  }
}
