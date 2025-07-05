import { useState, useEffect } from "react";
import bookService from "../services/bookService";
import type { Book } from "../types";

export interface BookFilters {
  searchTerm: string;
  review: string;
  sortBy: string;
  sortDirection: "asc" | "desc";
  genre: string;
  author: string;
  status: string;
  rating: number | "";
  dateAddedFrom: string;
  dateAddedTo: string;
  dateCompletedFrom: string;
  dateCompletedTo: string;
}

export const useBookSearch = (pageSize = 6) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [filters, setFilters] = useState<BookFilters>({
    searchTerm: "",
    review: "",
    sortBy: "title",
    sortDirection: "asc",
    genre: "",
    author: "",
    status: "",
    rating: "",
    dateAddedFrom: "",
    dateAddedTo: "",
    dateCompletedFrom: "",
    dateCompletedTo: "",
  });

  const updateFilter = (key: keyof BookFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      review: "",
      sortBy: "title",
      sortDirection: "asc",
      genre: "",
      author: "",
      status: "",
      rating: "",
      dateAddedFrom: "",
      dateAddedTo: "",
      dateCompletedFrom: "",
      dateCompletedTo: "",
    });
    setPage(1);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await bookService.getBooks({
          ...filters,
          page,
          pageSize,
        });
        setBooks(result.items);
        setTotalPages(result.totalPages);
      } catch (err) {
        console.error("Error fetching books", err);
      }
    };

    fetchBooks();
  }, [filters, page, pageSize]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [fetchedGenres, fetchedAuthors] = await Promise.all([
          bookService.getGenres(),
          bookService.getAuthors(),
        ]);
        setGenres(fetchedGenres);
        setAuthors(fetchedAuthors);
      } catch (err) {
        console.error("Error fetching genres or authors", err);
      }
    };

    fetchMetadata();
  }, []);

  return {
    books,
    filters,
    updateFilter,
    resetFilters,
    page,
    setPage,
    totalPages,
    genres,
    authors,
  };
};
