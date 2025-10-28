import type { AIResponse } from "../types/AIResponse";
import type { NewExampleResponse } from "../types/NewExampleResponse";

export async function fetchAIDefinition(word: string): Promise<AIResponse> {
  //API isteği yapılacak
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    word: word,
    definition: `"${word}" kelimesi için tanım.`,
    exampleSentence: `${word} kelimesi için cümle.`,
    exampleExplanation: `${word} kelimesi için cümle açıklaması`
  };
}

export async function fetchNewExample(word: string): Promise<NewExampleResponse> {
  //API isteği yapılacak
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    exampleSentence: `"${word}" kelimesi için yeni cümle`,
    exampleExplanation: `"${word}" kelimesi için yeni cümle açıklaması`
  };
}