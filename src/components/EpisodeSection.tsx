import { Character, Episode } from "@/types";
import Image from "next/image";

interface Props {
  title: string;
  episodes: Episode[] | undefined;
  character?: Character;
}

export default function EpisodeSection({ title, episodes, character }: Props) {
  const validEpisodes = Array.isArray(episodes)
    ? episodes.filter((ep) => ep && ep.name)
    : [];

  return (
    <div>
      <h3 className="text-lg text-yellow-200 font-bold sticky top-0 z-10 py-2 px-4 bg-gray-800 w-full rounded-md">
        <div className="flex items-center gap-2">
          {character && (
            <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={character.image}
                alt={character.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 48px, (min-width: 768px) 40px"
              />
            </div>
          )}
          <span>
            {title}{" "}
            <span className="text-yellow-200 text-sm">
              ({validEpisodes.length})
            </span>
          </span>
        </div>
      </h3>

      {validEpisodes.length === 0 ? (
        <p className="text-sm text-gray-400 italic text-center mt-2">
          No episodes in common
        </p>
      ) : (
        <ul className="text-sm space-y-1 mt-2 ml-2">
          {validEpisodes.map((ep, index) => (
            <li key={ep.id ?? `${ep.name}-${index}`}>
              <strong>{ep.name}</strong> – <em>{ep.air_date}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
