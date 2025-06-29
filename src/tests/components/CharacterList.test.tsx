import { render, screen, fireEvent } from "@testing-library/react";
import CharacterList from "@/components/CharacterList";
import { Character } from "@/types";

const mockCharacters: Character[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/1"],
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    episode: ["https://rickandmortyapi.com/api/episode/2"],
  },
];

describe("CharacterList", () => {
  it("renders the correct number of CharacterCards", () => {
    render(
      <CharacterList
        characters={mockCharacters}
        selectedId={null}
        onSelect={jest.fn()}
        context="test"
      />
    );

    const cards = screen.getAllByRole("img");
    expect(cards).toHaveLength(mockCharacters.length);
  });

  it("calls onSelect when a character card is clicked", () => {
    const handleSelect = jest.fn();
    render(
      <CharacterList
        characters={mockCharacters}
        selectedId={null}
        onSelect={handleSelect}
        context="test"
      />
    );

    fireEvent.click(screen.getByText("Rick Sanchez"));
    expect(handleSelect).toHaveBeenCalledWith(mockCharacters[0]);
  });

  it("triggers onScrollEnd when scrolling to the bottom", () => {
    const onScrollEnd = jest.fn();
    const { container } = render(
      <CharacterList
        characters={mockCharacters}
        selectedId={null}
        onSelect={jest.fn()}
        onScrollEnd={onScrollEnd}
        context="test"
      />
    );

    const scrollable = container.firstChild as HTMLElement;
    Object.defineProperty(scrollable, "scrollHeight", { value: 1000 });
    Object.defineProperty(scrollable, "clientHeight", { value: 500 });
    scrollable.scrollTop = 501;

    fireEvent.scroll(scrollable);
    expect(onScrollEnd).toHaveBeenCalled();
  });
});