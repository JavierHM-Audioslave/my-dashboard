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
              /*     <div key={detailedPokemon.sprites.front_default}>
                <Image
                  src={detailedPokemon.sprites.front_default}
                  alt="Pokemon image"
                  width={110}
                  height={110}
                />
              </div> */
              //   <span key={detailedPokemon.sprites.front_default}>Asd</span>
              <PokemonCard
                key={pokemon.sprites.front_default}
                pokemon={pokemon}
              />
            );
        })}
    </div>
  );
};
