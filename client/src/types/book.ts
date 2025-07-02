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
