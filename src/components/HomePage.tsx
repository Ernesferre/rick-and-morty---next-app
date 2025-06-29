"use client";

import CharacterList from "@/components/CharacterList";
import EpisodeSection from "@/components/EpisodeSection";
import CharacterSearch from "@/components/CharacterSearch";
import { useCharacterComparison } from "@/hooks/useCharacterComparison";
import { Character } from "@/types";

export default function HomePage({
  initialCharacters,
}: {
  initialCharacters: Character[];
}) {
  const {
    selected,
    search,
    filteredCharacters,
    episodes,
    setSearch,
    handleSelect,
    handleScrollEnd,
  } = useCharacterComparison(initialCharacters);

  return (
    <main className="min-h-screen p-6 flex flex-col gap-4 bg-gray-800">
      <h1 className="text-2xl font-bold text-center text-yellow-200 ">
        Rick & Morty
      </h1>
      <h2 className="text-xl font-semibold text-center text-red-400 -mt-2 mb-2">
        Episode Comparator
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(["left", "right"] as const).map((side) => (
          <div
            key={side}
            className="bg-yellow-200 rounded-lg shadow p-4 h-[400px] flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-2 text-center">
              Character {side === "left" ? "1" : "2"}
            </h2>
            <CharacterSearch
              searchTerm={search[side]}
              onSearchTermChange={(term) =>
                setSearch((prev) => ({ ...prev, [side]: term }))
              }
              placeholder={`Search Character ${side === "left" ? 1 : 2}...`}
            />
            <div className="overflow-y-auto flex-1 pr-1">
              <CharacterList
                characters={filteredCharacters[side]}
                selectedId={selected[side]?.id ?? null}
                onSelect={(char) => handleSelect(side, char)}
                onScrollEnd={handleScrollEnd}
                context={side}
              />
            </div>
          </div>
        ))}
      </div>

      {selected.left && selected.right ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: `${selected.left.name} - Only Episodes`,
              episodes: episodes.onlyLeft,
              character: selected.left,
            },
            {
              title: `${selected.left.name} & ${selected.right.name} - Shared Episodes`,
              episodes: episodes.shared,
            },
            {
              title: `${selected.right.name} - Only Episodes`,
              episodes: episodes.onlyRight,
              character: selected.right,
            },
          ].map(({ title, episodes, character }) => (
            <div
              key={title}
              className="bg-yellow-200 rounded-lg shadow p-4 h-[250px] overflow-y-auto"
            >
              <EpisodeSection
                title={title}
                episodes={episodes}
                character={character}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-yellow-200 rounded-lg shadow p-6 text-center text-gray-700 h-[250px] flex items-center justify-center">
          <p className="text-3xl">
            Please select two characters to see and compare the episodes they
            share
          </p>
        </div>
      )}
    </main>
  );
}
