import { DetailedPokemon } from "@/interfaces/pokemons/detailed-pokemon";
import { PokemonResponse } from "@/interfaces/pokemons/pokemon-response";
import { PokemonsResponse } from "@/interfaces/pokemons/pokemons-response";
import { SimplePokemon } from "@/interfaces/pokemons/simple-pokemon";
import Image from "next/image";
import { ReactNode } from "react";

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

const getDetailedPokemon = async (pokemons: SimplePokemon[]) => {
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
  const actualDetailedPokemons = detailedPokemons.map((detailedPokemon) => {
    if (detailedPokemon.status === "fulfilled") return detailedPokemon.value;
  });
  return actualDetailedPokemons;
};

export default async function PokemonsPage(): Promise<ReactNode> {
  try {
    const pokemons = await getPokemons();
    const detailedPokemons = await getDetailedPokemon(pokemons);
    return (
      <div className="flex flex-row justify-center items-center min-h-full">
        {detailedPokemons &&
          detailedPokemons.map((detailedPokemon) => {
            if (detailedPokemon?.sprites)
              return (
                <Image
                  key={detailedPokemon.sprites.front_default}
                  src={detailedPokemon.sprites.front_default}
                  alt="Pokemon image"
                  width={100}
                  height={100}
                />
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
