import { useEffect, useRef, useState } from "react";
import { Character, Episode } from "@/types";
import {
  fetchCharacters,
  fetchEpisodesByUrls,
  searchCharactersByName,
} from "@/services/api";
import toast from "react-hot-toast";

export function useCharacterComparison(initialCharacters: Character[]) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selected, setSelected] = useState<{
    left: Character | null;
    right: Character | null;
  }>({
    left: null,
    right: null,
  });
  const [search, setSearch] = useState({ left: "", right: "" });
  const [episodes, setEpisodes] = useState<{
    shared: Episode[];
    onlyLeft: Episode[];
    onlyRight: Episode[];
  }>({ shared: [], onlyLeft: [], onlyRight: [] });

  const hasInteracted = useRef(false);

  const [filteredCharacters, setFilteredCharacters] = useState<{
    left: Character[];
    right: Character[];
  }>({
    left: initialCharacters,
    right: initialCharacters,
  });

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const [leftSearch, rightSearch] = await Promise.all([
          search.left ? searchCharactersByName(search.left) : characters,
          search.right ? searchCharactersByName(search.right) : characters,
        ]);

        setFilteredCharacters({
          left: leftSearch,
          right: rightSearch,
        });
      } catch (error) {
        console.error("Error searching characters", error);
        toast.error("Character not found");
        setFilteredCharacters({
          left: [],
          right: [],
        });
      }
    };

    fetchSearchResults();
  }, [characters, search.left, search.right]);

  const handleSelect = (side: "left" | "right", char: Character) => {
    const opposite = side === "left" ? "right" : "left";
    if (selected[opposite]?.id === char.id) {
      toast.error("You can't select the same character twice.");
      return;
    }

    setSelected((prev) => ({
      ...prev,
      [side]: prev[side]?.id === char.id ? null : char,
    }));
  };

  const handleScrollEnd = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setPage((p) => p + 1);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    fetchCharacters(page).then((newChars) => {
      setCharacters((prev) => [...prev, ...newChars]);
      setIsLoadingMore(false);
    });
  }, [page]);

  useEffect(() => {
    if (!hasInteracted.current && (selected.left || selected.right)) {
      hasInteracted.current = true;
    }

    if (hasInteracted.current && (!selected.left || !selected.right)) {
      const missing = !selected.left ? "Character 1" : "Character 2";
      toast(`Please select ${missing} to compare episodes.`);
    }
  }, [selected.left, selected.right]);

  useEffect(() => {
    const updateEpisodes = async () => {
      const left = selected.left;
      const right = selected.right;
      if (!left || !right) return;

      const sharedUrls = left.episode.filter((url) =>
        right.episode.includes(url)
      );

      try {
        const [sharedData, all1Data, all2Data] = await Promise.all([
          fetchEpisodesByUrls(sharedUrls),
          fetchEpisodesByUrls(left.episode),
          fetchEpisodesByUrls(right.episode),
        ]);

        setEpisodes({
          shared: Array.isArray(sharedData) ? sharedData : [sharedData],
          onlyLeft: Array.isArray(all1Data) ? all1Data : [all1Data],
          onlyRight: Array.isArray(all2Data) ? all2Data : [all2Data],
        });
      } catch (e) {
        console.error("Failed to fetch episode data", e);
      }
    };

    updateEpisodes();
  }, [selected.left, selected.right]);

  return {
    characters,
    selected,
    search,
    episodes,
    filteredCharacters,
    setSearch,
    handleSelect,
    handleScrollEnd,
  };
}
