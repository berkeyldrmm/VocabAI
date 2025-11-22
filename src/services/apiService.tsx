import type { AIResponse } from "../types/AIResponse";

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

// export async function fetchNewExample(word: string): Promise<NewExampleResponse> {
//   await new Promise(resolve => setTimeout(resolve, 1000));

//   return {
//     exampleSentence: `"${word}" kelimesi için yeni cümle`,
//     exampleExplanation: `"${word}" kelimesi için yeni cümle açıklaması`
//   };
// }