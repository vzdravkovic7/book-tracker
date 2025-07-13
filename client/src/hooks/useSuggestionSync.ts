import { useEffect } from "react";
import { connectSuggestionSocket } from "../services/suggestionSocket";
import suggestionService from "../services/suggestionService";
import { useSuggestions } from "../contexts/SuggestionsContext";
import type { Suggestion } from "../types/suggestion";

export const useSuggestionSync = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const { setSuggestions, addSuggestion } = useSuggestions();

  useEffect(() => {
    if (!token || !email) return;

    const sync = async () => {
      try {
        const data = await suggestionService.getAllSuggestions();
        setSuggestions(data);

        await connectSuggestionSocket(email, (s: Suggestion) => {
          console.log("🔄 Synced suggestion via WS:", s);
          addSuggestion(s);
        });
      } catch (err) {
        console.error("Failed to sync suggestions after refresh:", err);
      }
    };

    sync();
  }, [token, email]);
};
