import { renderHook, act, waitFor } from "@testing-library/react";
import { useCharacterComparison } from "@/hooks/useCharacterComparison";
import { Character } from "@/types";

jest.mock("@/services/api", () => ({
  fetchCharacters: jest.fn(() => Promise.resolve([])),
  fetchEpisodesByUrls: jest.fn(() => Promise.resolve([])),
  searchCharactersByName: jest.fn((name) =>
    Promise.resolve([
      {
        id: 99,
        name,
        episode: [],
        image: "",
        status: "Alive",
        species: "Human",
      },
    ])
  ),
}));

describe("useCharacterComparison", () => {
  const mockCharacters: Character[] = [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      image: "rick.png",
      episode: ["url1", "url2"],
    },
    {
      id: 2,
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      image: "morty.png",
      episode: ["url2", "url3"],
    },
  ];

  it("initializes with provided characters", async () => {
    const { result } = renderHook(() => useCharacterComparison(mockCharacters));

    await act(async () => {
      await waitFor(() => {
        expect(result.current.filteredCharacters.left).toEqual(mockCharacters);
        expect(result.current.filteredCharacters.right).toEqual(mockCharacters);
      });
    });
  });

  it("selects a character on the left", () => {
    const { result } = renderHook(() => useCharacterComparison(mockCharacters));
    act(() => {
      result.current.handleSelect("left", mockCharacters[0]);
    });
    expect(result.current.selected.left).toEqual(mockCharacters[0]);
  });

  it("selects a character on the right", () => {
    const { result } = renderHook(() => useCharacterComparison(mockCharacters));
    act(() => {
      result.current.handleSelect("right", mockCharacters[1]);
    });
    expect(result.current.selected.right).toEqual(mockCharacters[1]);
  });
});
