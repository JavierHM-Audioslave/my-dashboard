import { DetailedPokemon } from "../interfaces/detailed-pokemon";
import { PokemonCard } from "./PokemonCard";

interface Props {
  detailedPokemons: DetailedPokemon[];
}

export const PokemonGrid = ({ detailedPokemons }: Props) => {
  return (
    <div className="flex flex-wrap justify-center items-center px-40">
      {detailedPokemons &&
        detailedPokemons.map((pokemon) => {
          if (pokemon?.sprites)
            return (
              <PokemonCard
                key={pokemon.sprites.front_default}
                pokemon={pokemon}
              />
            );
        })}
    </div>
  );
};
