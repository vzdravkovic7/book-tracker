import axios from "./api";
import type { SuggestionDTO, SuggestionCreateDTO } from "../types/suggestion";

const getAllSuggestions = async (): Promise<SuggestionDTO[]> => {
  const res = await axios.get("/suggestions");
  return res.data;
};

const suggestBook = async (data: SuggestionCreateDTO): Promise<SuggestionDTO> => {
  const res = await axios.post("/suggestions", data);
  return res.data;
};

const acceptSuggestion = async (id: string): Promise<void> => {
  await axios.put(`/suggestions/${id}/accept`);
};

const declineSuggestion = async (id: string): Promise<void> => {
  await axios.delete(`/suggestions/${id}/decline`);
};

export default {
  getAllSuggestions,
  suggestBook,
  acceptSuggestion,
  declineSuggestion,
};
