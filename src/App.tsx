import { useEffect, useState } from 'react';
import { LevelSelector } from './components/LevelSelector';
import { WordList } from './components/WordList';
import { SearchBar } from './components/SearchBar';
import { WordDetail } from './components/WordDetail';
import type { AIResponse } from './types/AIResponse';
import { fetchAIDefinition, fetchWordsByLevel } from './services/apiService';
import type { Word } from './types/Word';

function App() {
  const [selectedLevel, setSelectedLevel] = useState<string>('A1');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [aiDetails, setAiDetails] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    
    setWords([]); 
    setSelectedWord(null); 
    
    async function fetchWordsForLevel() {
      try {
        const levelId = (() => {
          switch (selectedLevel) {
            case 'A1': return 1;
            case 'A2': return 2;
            case 'B1': return 3;
            case 'B2': return 4;
            case 'C1': return 5;
            case 'C2': return 6;
            default: return 0;
          }
        })();
        const data: Word[] = await fetchWordsByLevel(levelId);
        
        setWords(data); 
      } catch (error) {
        console.error("Kelimeler alınamadı", error);
      }
    }

    fetchWordsForLevel();

  }, [selectedLevel]);

  const handleWordSelect = async (word: string) => {
    setSelectedWord(word);
    setIsLoading(true);
    setAiDetails(null); 
    
    const response = await fetchAIDefinition(word);
    
    setAiDetails(response);
    setIsLoading(false);
  };

  const handleBackToHome = () => {
    setSelectedWord(null);
    setAiDetails(null);
    setSearchTerm('');
  };

  const handleSearchSubmit = (searchWord: string) => {
    const formattedWord = searchWord.charAt(0).toUpperCase() + searchWord.slice(1).toLowerCase();
    handleWordSelect(formattedWord);
  };

  const handleRegenerateExample = async () => {
    if (!aiDetails || !aiDetails.corrected_word) return;
    
    setIsLoading(true);
    
    try {
      const newExampleData = await fetchAIDefinition(aiDetails.corrected_word);
      setAiDetails(newExampleData);
    } catch (error) {
      console.error('Örnek yenileme hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white p-4 md:p-12 transition-all duration-500">
      
      {!selectedWord ? (
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold text-white shadow-lg mb-4">
            VocabAI
          </h1>
          <p className="text-xl text-purple-200 mb-10">
            Yapay zeka ile kelime öğrenmenin en hızlı yolu.
          </p>

          <SearchBar 
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            onSearchSubmit={handleSearchSubmit} 
          />
          
          <LevelSelector
            levels={['A1', 'A2', 'B1', 'B2', 'C1', 'C2']}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
          />
          
          <WordList
            words={words}
            onWordSelect={handleWordSelect}
          />
        </div>

      ) : (
        <div className="max-w-6xl mx-auto animate-fade-in">
          <button onClick={handleBackToHome} className="mb-8 bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition">
            &larr; Geri Dön
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl">
              <h2 className="text-6xl md:text-7xl font-bold break-all">
                {selectedWord}
              </h2>
            </div>
            
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl">
              <WordDetail 
                details={aiDetails} 
                isLoading={isLoading} 
                onRegenerateExample={handleRegenerateExample}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;