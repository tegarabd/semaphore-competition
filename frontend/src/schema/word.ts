export type Word = {
  id: string;
  word: string;
  language: string;
  created: Date;
  updated: Date;
};

export type WordCount = {
  id: number;
  language: string;
  totalWords: number;
};

export type Language = "id" | "en";
