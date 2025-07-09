import { useState } from "react";
import suggestionService from "../services/suggestionService";
import { useSuggestions } from "../contexts/SuggestionsContext";

export const useSuggestionActions = () => {
  const { suggestions, setSuggestions } = useSuggestions();
  const [filter, setFilter] = useState<"Pending" | "Accepted">("Pending");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleAccept = async (id: string) => {
    try {
      await suggestionService.acceptSuggestion(id);
      setSuggestions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "Accepted" } : s))
      );
    } catch (err) {
      console.error("Failed to accept suggestion:", err);
    }
  };

  const handleDeclineConfirmed = async () => {
    if (!selectedId) return;

    try {
      await suggestionService.declineSuggestion(selectedId);
      setSuggestions((prev) => prev.filter((s) => s.id !== selectedId));
    } catch (err) {
      console.error("Failed to decline suggestion:", err);
    } finally {
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

  const openDeclineConfirm = (id: string) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const filteredSuggestions = suggestions.filter((s) => s.status === filter);

  return {
    filter,
    setFilter,
    filteredSuggestions,
    confirmOpen,
    setConfirmOpen,
    handleAccept,
    handleDeclineConfirmed,
    openDeclineConfirm,
  };
};
