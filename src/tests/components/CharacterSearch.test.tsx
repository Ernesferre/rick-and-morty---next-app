import { render, screen, fireEvent } from '@testing-library/react';
import CharacterSearch from '@/components/CharacterSearch';

describe('CharacterSearch', () => {
  it('renders the input with default placeholder', () => {
    render(
      <CharacterSearch
        searchTerm=""
        onSearchTermChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText(/search characters/i);
    expect(input).toBeInTheDocument();
  });

  it('renders the input with custom placeholder', () => {
    render(
      <CharacterSearch
        searchTerm=""
        onSearchTermChange={() => {}}
        placeholder="Buscar personajes..."
      />
    );

    const input = screen.getByPlaceholderText(/buscar personajes/i);
    expect(input).toBeInTheDocument();
  });

  it('calls onSearchTermChange when typing', () => {
    const handleChange = jest.fn();
    render(
      <CharacterSearch
        searchTerm=""
        onSearchTermChange={handleChange}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Rick' } });

    expect(handleChange).toHaveBeenCalledWith('Rick');
  });
});
