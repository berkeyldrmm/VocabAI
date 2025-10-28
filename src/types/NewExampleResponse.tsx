import type { AIResponse } from "./AIResponse";

export type NewExampleResponse = Pick<AIResponse, 'exampleSentence' | 'exampleExplanation'>;