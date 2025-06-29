import { render, screen, fireEvent } from "@testing-library/react";
import CharacterCard from "@/components/CharacterCard";
import { Character } from "@/types";

const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [],
};

describe("CharacterCard", () => {
  it("renders character info correctly", () => {
    render(
      <CharacterCard
        character={mockCharacter}
        selected={false}
        onSelect={() => {}}
      />
    );

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Alive")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByAltText("Rick Sanchez")).toBeInTheDocument();
  });

  it("applies selected styles when selected", () => {
    const { container } = render(
      <CharacterCard
        character={mockCharacter}
        selected={true}
        onSelect={() => {}}
      />
    );

    expect(container.firstChild).toHaveClass("bg-red-400");
  });

  it("calls onSelect when clicked", () => {
    const handleSelect = jest.fn();

    render(
      <CharacterCard
        character={mockCharacter}
        selected={false}
        onSelect={handleSelect}
      />
    );

    fireEvent.click(screen.getByText("Rick Sanchez"));
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});
