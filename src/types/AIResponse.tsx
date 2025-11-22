export interface AIResponse {
  corrected_word: string;
  word_level: string;
  definition: string;
  example: string;
  explanation: string;
  isCorrected: boolean;
}