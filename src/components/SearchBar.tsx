interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  return (
    <div className="search-bar w-full max-w-lg my-8">
      <input
        type="text"
        placeholder="Seçili seviyede kelime ara..."
        className="
          w-full p-4 rounded-lg 
          bg-white/20 backdrop-blur-sm 
          text-white text-lg placeholder:text-purple-200 
          focus:outline-none focus:ring-2 focus:ring-white/50 
          transition duration-200
        "
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}