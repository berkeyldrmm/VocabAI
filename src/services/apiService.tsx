import type { AIResponse } from "../types/AIResponse";
import type { Word } from "../types/Word";

export async function fetchAIDefinition(word: string): Promise<AIResponse> {
  const request = { Word: word, Language: "turkish" };

  try {
    const res = await fetch("https://localhost:7267/getaidefinition", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request)
  });
  const data: AIResponse = await res.json();

  return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchWordsByLevel(levelId: number): Promise<Word[]> {
  try {
    const res = await fetch(`https://localhost:7267/getwordsbylevel/${levelId}`);
    const data: Word[] = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}