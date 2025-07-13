import React from "react";
import { SuggestionsProvider } from "./contexts/SuggestionsContext";
import InnerApp from "./InnerApp";

const App: React.FC = () => {
  const token = localStorage.getItem("token");

  return (
    <SuggestionsProvider>
      <InnerApp token={token} />
    </SuggestionsProvider>
  );
};

export default App;
