import { useRef } from "react";
import { Character } from "../types";
import CharacterCard from "./CharacterCard";

interface Props {
  characters: Character[];
  selectedId: number | null;
  onSelect: (character: Character) => void;
  onScrollEnd?: () => void;
  context: string;
}

export default function CharacterList({
  characters,
  selectedId,
  onSelect,
  onScrollEnd,
  context,
}: Props) {
  const listRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el || !onScrollEnd) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      onScrollEnd();
    }
  };

  return (
    <div
      ref={listRef}
      className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto h-full pr-1"
      onScroll={handleScroll}
    >
      {characters.map((char) => (
        <CharacterCard
          key={`${context}-${char.id}`}
          character={char}
          selected={selectedId === char.id}
          onSelect={() => onSelect(char)}
        />
      ))}
    </div>
  );
}
