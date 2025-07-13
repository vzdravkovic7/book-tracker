import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import suggestionService from "../services/suggestionService";

const About: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Checking invitation...");
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const suggestionId = searchParams.get("suggestionId");
    if (suggestionId) {
      suggestionService
        .acceptAnonymousSuggestion(suggestionId)
        .then(() => {
          setMessage(
            "Success! Your account has been created and the suggestion was accepted. Redirecting to login..."
          );
          setTimeout(() => navigate("/login"), 3500);
        })
        .catch((err) => {
          console.error(err);
          setMessage("This invitation is invalid, expired, or already used.");
        });
    } else {
      setMessage(
        "Welcome to Book Tracker! Start your own book collection today."
      );
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Book Tracker</h1>
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default About;
