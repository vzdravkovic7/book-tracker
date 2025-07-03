import axios from "./api";
import type { Book, BookDetailsDTO } from "../types";

const getAll = async (): Promise<Book[]> => {
  const res = await axios.get("/books");
  return res.data;
};

const getById = async (id: string): Promise<BookDetailsDTO> => {
  const res = await axios.get(`/books/${id}`);
  return res.data;
};

const create = async (formData: FormData): Promise<Book> => {
  const res = await axios.post("/books", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

const update = async (id: string, formData: FormData): Promise<Book> => {
  const res = await axios.put(`/books/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

const remove = async (id: string): Promise<void> => {
  await axios.delete(`/books/${id}`);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
