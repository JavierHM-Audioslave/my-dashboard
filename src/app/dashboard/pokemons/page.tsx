import { PokemonsResponse } from "@/interfaces/pokemons/pokemons-response";
import { SimplePokemon } from "@/interfaces/pokemons/simple-pokemon";
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
    const pokemons = dataToJson.results.map((pokemon) => ({
      id: pokemon.url.split("/").at(-2) || "",
      name: pokemon.name,
    }));
    return pokemons;
  } catch (error) {
    console.error(error);
    throw new Error("Error al conectar a la API.");
  }
};

export default async function PokemonsPage(): Promise<ReactNode> {
  try {
    const pokemons = await getPokemons(151);
    return <div>{JSON.stringify(pokemons)}</div>;
  } catch (err) {
    if (err instanceof Error) {
      return <div>{err.message}</div>;
    }
    return "Error";
  }
}
