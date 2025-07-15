import axios from "./api";
import type { SuggestionDTO, SuggestionCreateDTO } from "../types/suggestion";

const getAllSuggestions = async (): Promise<SuggestionDTO[]> => {
  const res = await axios.get("/Suggestions");
  return res.data;
};

const suggestBook = async (data: SuggestionCreateDTO): Promise<SuggestionDTO> => {
  const res = await axios.post("/Suggestions", data);
  return res.data;
};

const acceptSuggestion = async (id: string): Promise<void> => {
  await axios.put(`/Suggestions/${id}/accept`);
};

const declineSuggestion = async (id: string): Promise<void> => {
  await axios.delete(`/Suggestions/${id}/decline`);
};

const acceptAnonymousSuggestion = async (id: string): Promise<void> => {
  await axios.post(`/Suggestions/${id}/accept-anonymous`);
};

export default {
  getAllSuggestions,
  suggestBook,
  acceptSuggestion,
  declineSuggestion,
  acceptAnonymousSuggestion,
};
