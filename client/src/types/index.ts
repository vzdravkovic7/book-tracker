export type BookStatus = 'Reading' | 'Completed' | 'Wishlist';

export interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  rating?: number;
  review?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}
