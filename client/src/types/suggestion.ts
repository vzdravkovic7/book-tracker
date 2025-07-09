export type SuggestionStatus = "Pending" | "Accepted";

export interface Suggestion {
  id: string;
  bookTitle: string;
  author: string;
  genre: string;
  coverImageUrl?: string;
  fromUserEmail: string;
  toUserEmail: string;
  status: SuggestionStatus;
  createdAt: string;
}

export interface SuggestionDTO {
  id: string;
  bookTitle: string;
  author: string;
  genre: string;
  coverImageUrl?: string;
  fromUserEmail: string;
  status: SuggestionStatus;
  createdAt: string;
}

export interface SuggestionCreateDTO {
  bookId: string;
  toUserEmail: string;
}
