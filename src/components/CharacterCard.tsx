import { Character } from "@/types";
import Image from "next/image";

interface CharacterCardProps {
  character: Character;
  selected: boolean;
  onSelect: () => void;
}

export default function CharacterCard({
  character,
  selected,
  onSelect,
}: CharacterCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`
    flex flex-col md:flex-row items-center gap-4 
    cursor-pointer border-0 rounded-2xl p-2 
    transition-all duration-300 ease-in-out transform
    ${
      selected
        ? "bg-red-400 scale-[1.02] shadow-lg text-black"
        : "bg-gray-800 text-white hover:scale-[1.03] hover:shadow-md"
    }
    h-auto md:h-24
    w-full max-w-xs
  `}
    >
      <div
        className="
          relative 
          w-12 h-12 
          md:w-15 md:h-15 
          rounded-full 
          overflow-hidden 
          flex-shrink-0 
          mt-2 mb-2 md:mt-0 md:mb-0
        "
      >
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 48px, (min-width: 768px) 40px"
        />
      </div>

      <div className="flex flex-col justify-center text-center md:text-left items-center md:items-start w-full">
        <h3 className="font-semibold text-base break-words leading-tight text-center md:text-left">
          {character.name}
        </h3>

        <p
          className={`text-sm ${
            selected ? "text-black" : "text-gray-300"
          } w-full text-center md:text-left`}
        >
          <span className="inline-flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                character.status === "Alive"
                  ? "bg-green-400"
                  : character.status === "Dead"
                  ? "bg-red-600"
                  : "bg-gray-500"
              }`}
            />
            <span>{character.status}</span>
          </span>
          <br />
          <span
            className={`text-xs ${
              selected ? "text-black/70" : "text-gray-400"
            }`}
          >
            {character.species}
          </span>
        </p>
      </div>
    </div>
  );
}
