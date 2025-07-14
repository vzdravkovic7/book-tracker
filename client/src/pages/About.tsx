import React from "react";
import { useNavigate } from "react-router-dom";
import BookIconWatermark from "../components/about/BookIconWatermark";
import IntroSection from "../components/about/IntroSection";
import SuggestionStatus from "../components/about/SuggestionStatus";
import WhoIsItFor from "../components/about/WhoIsItFor";
import Testimonials from "../components/about/Testimonials";
import WhyBookTracker from "../components/about/WhyBookTracker";
import { useAnonymousSuggestionRedirect } from "../hooks/useAnonymousSuggestionRedirect";

const About: React.FC = () => {
  const { isHandlingInvite, message, loading } =
    useAnonymousSuggestionRedirect();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-backgroundLight dark:bg-background text-textDark dark:text-textLight transition-colors duration-300 px-4 py-12 flex flex-col items-center">
      <BookIconWatermark />
      {!isHandlingInvite ? (
        <div className="flex flex-col items-center w-full max-w-6xl space-y-20 animate-fade-in">
          <IntroSection onStart={() => navigate("/register")} />
          <WhyBookTracker />
          <WhoIsItFor />
          <Testimonials />
        </div>
      ) : (
        <div className="animate-fade-in">
          <SuggestionStatus loading={loading} message={message} />
        </div>
      )}
    </div>
  );
};

export default About;
