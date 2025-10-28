import type { AIResponse } from '../types/AIResponse';
import { LoadingSpinner } from './LoadingSpinner';

interface WordDetailProps {
  details: AIResponse | null;
  isLoading: boolean;
  onRegenerateExample: () => void;
  isRegenerating: boolean;
}

export function WordDetail({ details, isLoading, onRegenerateExample, isRegenerating }: WordDetailProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
        <span className="ml-4 text-lg text-purple-200">Yapay Zeka düşünüyor... 🧠</span>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex justify-center items-center h-full min-h-[200px]">
        <p className="text-xl text-purple-200">Detaylar yüklenemedi.</p>
      </div>
    );
  }

  return (
    <div className="word-detail flex flex-col gap-6">
      <h2 className="text-4xl font-bold text-white opacity-60">
        {details.word}
      </h2>
      
      <section>
        <h3 className="text-2xl font-semibold border-b border-white/30 pb-2 mb-3">
          Tanım (TR)
        </h3>
        <p className="text-lg leading-relaxed text-white/90">{details.definition}</p>
      </section>
      
      <section>
        <h3 className="text-2xl font-semibold border-b border-white/30 pb-2 mb-3">
          Örnek Cümle
        </h3>
        <p className="text-lg italic bg-black/20 p-4 rounded-lg border-l-4 border-purple-300 text-white/90">
          "{details.exampleSentence}"
        </p>
      </section>
      
      <section>
        <h3 className="text-2xl font-semibold border-b border-white/30 pb-2 mb-3">
          Örnekteki Yeri
        </h3>
        <p className="text-lg leading-relaxed text-white/90">{details.exampleExplanation}</p>

        <div className="mt-6 flex justify-end"> 
          <button
            onClick={onRegenerateExample}
            disabled={isLoading || isRegenerating} 
            className="
              inline-flex items-center justify-center 
              bg-white/20 hover:bg-white/30 text-white 
              font-semibold py-2 px-5 rounded-lg transition
              disabled:opacity-60 disabled:cursor-wait
            "
          >
            {isRegenerating ? (
              <>
                <LoadingSpinner />
                Yenileniyor...
              </>
            ) : (
              "Farklı Bir Örnek Ver"
            )}
          </button>
        </div>
      </section>
    </div>
  );
}