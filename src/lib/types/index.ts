export type VerseType = "narrative" | "scripture";

export interface Verse {
  type: VerseType;
  text: string;
}

export interface Chapter {
  id: string;
  roman: string;
  title: string;
  verses: Verse[];
}

export interface Book {
  id: "one" | "two";
  number: number;
  title: string;
  subtitle: string;
  chapters: Chapter[];
}
