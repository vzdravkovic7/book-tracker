import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import suggestionService from "../services/suggestionService";
import type { SuggestionDTO } from "../types/suggestion";

interface SuggestionsContextType {
  suggestions: SuggestionDTO[];
  setSuggestions: React.Dispatch<React.SetStateAction<SuggestionDTO[]>>;
  addSuggestion: (s: SuggestionDTO) => void;
  pendingCount: number;
}

const SuggestionsContext = createContext<SuggestionsContextType | undefined>(
  undefined
);

export const SuggestionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [suggestions, setSuggestions] = useState<SuggestionDTO[]>([]);

  const addSuggestion = (newSuggestion: SuggestionDTO) => {
    setSuggestions((prev) => [newSuggestion, ...prev]);
  };

  const pendingCount = useMemo(
    () => suggestions.filter((s) => s.status === "Pending").length,
    [suggestions]
  );

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const data = await suggestionService.getAllSuggestions();
        setSuggestions(data);
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
      }
    };

    const token = localStorage.getItem("token");
    if (token) fetchSuggestions();
  }, []);

  return (
    <SuggestionsContext.Provider
      value={{ suggestions, setSuggestions, addSuggestion, pendingCount }}
    >
      {children}
    </SuggestionsContext.Provider>
  );
};

export const useSuggestions = () => {
  const context = useContext(SuggestionsContext);
  if (!context) {
    throw new Error("useSuggestions must be used within a SuggestionsProvider");
  }
  return context;
};
