import { ReactNode } from "react";

const getPokemons = async (limit = 20, offset = 0): Promise<void> => {
  try {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const dataToJson = await data.json();
    return Promise.resolve(dataToJson);
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
