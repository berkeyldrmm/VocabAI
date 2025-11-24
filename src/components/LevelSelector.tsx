interface LevelSelectorProps {
  levels: string[];
  selectedLevel: string;
  onSelectLevel: (level: string) => void;
}

export function LevelSelector({ levels, selectedLevel, onSelectLevel }: LevelSelectorProps) {
  return (
    <div className="level-selector mb-10">
      <div className="flex flex-wrap justify-center gap-3">
        {levels.map(level => (
          <button
            key={level}
            className={`
              py-2 px-6 rounded-full font-bold text-lg transition-all duration-200
              ${selectedLevel === level 
                ? 'bg-white text-purple-700 ring-2 ring-purple-200 shadow-lg' 
                : 'bg-white/20 hover:bg-white/30 text-white'
              }
            `}
            onClick={() => {onSelectLevel(level)}}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}