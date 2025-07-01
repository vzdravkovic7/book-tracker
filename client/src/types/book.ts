export type BookStatus = 'Reading' | 'Completed' | 'Wishlist';

export interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  rating?: number;
  review?: string;
}
