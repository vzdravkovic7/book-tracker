import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import suggestionService from "../services/suggestionService";

export function useAnonymousSuggestionRedirect() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHandlingInvite, setIsHandlingInvite] = useState(false);
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    const suggestionId = searchParams.get("suggestionId");
    if (suggestionId && !hasRun.current) {
      hasRun.current = true;
      setIsHandlingInvite(true);
      setLoading(true);
      suggestionService
        .acceptAnonymousSuggestion(suggestionId)
        .then(() => {
          setMessage(
            "✅ Success! Your account has been created and the suggestion was accepted. Redirecting to login..."
          );
          setTimeout(() => navigate("/login"), 3500);
        })
        .catch((err) => {
          console.error(err);
          setMessage("⚠️ This invitation is invalid, expired, or already used.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchParams, navigate]);

  return { isHandlingInvite, message, loading };
}
