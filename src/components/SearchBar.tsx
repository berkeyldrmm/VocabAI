interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  onSearchSubmit: (term: string) => void;
}

export function SearchBar({ searchTerm, onSearch, onSearchSubmit }: SearchBarProps) {
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return; 
    
    onSearchSubmit(searchTerm);
  };

  return (
    <form className="search-bar w-full max-w-lg my-8" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Bir kelime yazın"
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
    </form>
  );
}