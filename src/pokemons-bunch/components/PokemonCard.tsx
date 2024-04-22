import Link from "next/link";
import { ReactNode } from "react";
import { DetailedPokemon } from "../interfaces/detailed-pokemon";
import Image from "next/image";
import { IoHeartOutline } from "react-icons/io5";

interface Props {
  pokemon: DetailedPokemon;
}

export const PokemonCard = ({ pokemon }: Props): ReactNode => {
  const { id, name, sprites } = pokemon;
  return (
    <div className="mx-auto right-0 mt-2 w-60">
      <div className="bg-white rounded overflow-hidden shadow-lg">
        <div className="text-center p-6 bg-gray-800 border-b">
          <Image
            key={id}
            src={sprites.front_default}
            alt="Pokemon image"
            width={100}
            height={100}
            className="mx-auto"
          />
          <p className="capitalize pt-2 text-lg font-semibold text-gray-50">
            {name}
          </p>
          <p className="text-sm text-gray-100">John@Doe.com</p>
          <div className="mt-5">
            <Link
              href={`/dashboard/pokemon/${id}`}
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
            >
              Más información
            </Link>
          </div>
        </div>
        <div className="border-b">
          <Link
            href="/dashboard/main"
            className="flex flex-col items-center py-2 hover:bg-gray-100"
          >
            <div className="flex text-sm font-medium text-gray-800 leading-none">
              <IoHeartOutline className="mr-1 text-red-600 " />
              <span>No es favorito</span>
            </div>
            <div className="text-xs text-gray-500">View your campaigns</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
