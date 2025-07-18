export type BookStatus = "Reading" | "Completed" | "Wishlist";

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: BookStatus;
  rating?: number;
  review?: string;
  dateCompleted?: string;
  coverImageUrl?: string;
}

export interface BookDetailsDTO {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: BookStatus;
  rating?: number;
  review?: string;
  dateAdded: string;
  dateCompleted?: string;
  isFavourite: boolean;
  coverImageUrl?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}