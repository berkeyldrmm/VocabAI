interface WordListProps {
  words: string[];
  onWordSelect: (word: string) => void;
}

export function WordList({ words, onWordSelect }: WordListProps) {
  return (
    <div className="word-list w-full"> 
      <ul className="flex flex-wrap justify-center gap-4">
        {words.length > 0 ? (
          words.map(word => (
            <li 
              key={word} 
              className={`
                p-4 rounded-lg cursor-pointer transition-all duration-200
                bg-white/10 hover:bg-white/20 hover:shadow-xl hover:scale-105
                text-lg font-medium
              `}
              onClick={() => onWordSelect(word)}
            >
              {word}
            </li>
          ))
        ) : (
          <li className="p-4 text-purple-200 italic">Bu seviye için kelime bulunamadı.</li>
        )}
      </ul>
    </div>
  );
}