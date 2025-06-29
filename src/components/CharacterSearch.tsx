interface Props {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  placeholder?: string;
}

export default function CharacterSearch({
  searchTerm,
  onSearchTermChange,
  placeholder = "Search characters...",
}: Props) {
  return (
    <input
      type="text"
      className="max-w-[97%] p-2 rounded mb-2 text-sm bg-gray-800 text-white"
      value={searchTerm}
      placeholder={placeholder}
      onChange={(e) => onSearchTermChange(e.target.value)}
    />
  );
}
