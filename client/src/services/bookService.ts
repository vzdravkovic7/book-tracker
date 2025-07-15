import axios from "./api";
import type { Book, BookDetailsDTO } from "../types";
import type { PaginatedResponse } from "../types/book";

interface BookQueryParams {
  searchTerm?: string;
  review?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  genre?: string;
  author?: string;
  status?: string;
  rating?: number | string;
  dateAddedFrom?: string;
  dateAddedTo?: string;
  dateCompletedFrom?: string;
  dateCompletedTo?: string;
  page?: number;
  pageSize?: number;
}

const getBooks = async (params: BookQueryParams) => {
  const cleanedParams = cleanParams(params);
  const response = await axios.get<PaginatedResponse<Book>>("/Books", { params: cleanedParams });
  return response.data;
};

function cleanParams(params: Record<string, any>) {
  return Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== undefined && v !== ""));
}

const getGenres = async () => {
  const response = await axios.get<string[]>("/Books/genres");
  return response.data;
};

const getAuthors = async () => {
  const response = await axios.get<string[]>("/Books/authors");
  return response.data;
};

const getAllForUser = async (): Promise<BookDetailsDTO[]> => {
  const res = await axios.get("/Books/all");
  return res.data;
};

const getById = async (id: string): Promise<BookDetailsDTO> => {
  const res = await axios.get(`/Books/${id}`);
  return res.data;
};

const create = async (formData: FormData): Promise<Book> => {
  const res = await axios.post("/Books", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

const update = async (id: string, formData: FormData): Promise<Book> => {
  const res = await axios.put(`/Books/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

const remove = async (id: string): Promise<void> => {
  await axios.delete(`/Books/${id}`);
};

const toggleFavorite = async (id: string, isFavourite: boolean): Promise<void> => {
  await axios.put(`/Books/${id}/favorite?isFavourite=${isFavourite}`);
};

const getFavourites = async (): Promise<Book[]> => {
  const res = await axios.get("/Books/favourites");
  return res.data;
};

export default {
  getBooks,
  getGenres,
  getAuthors,
  getAllForUser,
  getById,
  create,
  update,
  remove,
  toggleFavorite,
  getFavourites,
};
