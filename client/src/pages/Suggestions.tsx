import React from "react";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { useSuggestionActions } from "../hooks/useSuggestionActions";

const Suggestions: React.FC = () => {
  const {
    filter,
    setFilter,
    filteredSuggestions,
    confirmOpen,
    setConfirmOpen,
    handleAccept,
    handleDeclineConfirmed,
    openDeclineConfirm,
  } = useSuggestionActions();

  return (
    <div className="min-h-screen bg-gradient-to-b from-backgroundLight to-background dark:from-background dark:to-backgroundLight px-4 py-10 transition-colors duration-300 text-textDark dark:text-textLight">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 font-heading">
          Your Suggestions
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          {["Pending", "Accepted"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as "Pending" | "Accepted")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 border ${
                filter === tab
                  ? "bg-primary text-white border-primary"
                  : "bg-backgroundLight dark:bg-background border-gray-300 dark:border-gray-700 text-textDark dark:text-textLight"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filteredSuggestions.length === 0 ? (
          <p className="text-center mt-10 text-gray-500 dark:text-gray-400">
            No {filter.toLowerCase()} suggestions found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuggestions.map((s) => (
              <div
                key={s.id}
                className="bg-backgroundLight dark:bg-background border border-gray-300 dark:border-gray-700 p-4 rounded-2xl shadow-lg flex flex-col transition-colors duration-300"
              >
                {s.coverImageUrl && (
                  <img
                    src={`http://localhost:5209${
                      s.coverImageUrl ?? "/Images/books/default.jpg"
                    }`}
                    alt={s.bookTitle}
                    className="w-full h-48 object-cover mb-4 rounded-lg border border-gray-400 shadow"
                  />
                )}
                <h2 className="text-xl font-semibold mb-1">{s.bookTitle}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {s.author} — {s.genre}
                </p>
                <p className="text-sm mb-1">
                  <strong>From:</strong> {s.fromUserEmail}
                </p>
                <p className="text-sm mb-3">
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      s.status === "Pending"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-green-600 dark:text-green-400"
                    }
                  >
                    {s.status}
                  </span>
                </p>

                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    s.bookTitle + " " + s.author
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline mb-4"
                >
                  Search this book
                </a>

                {s.status === "Pending" && (
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => handleAccept(s.id)}
                      className="flex-1 px-3 py-1 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 dark:bg-green-400 dark:hover:bg-green-600 dark:text-gray-900"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => openDeclineConfirm(s.id)}
                      className="flex-1 px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-600 dark:text-gray-900"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeclineConfirmed}
        message="Are you sure you want to decline this suggestion?"
      />
    </div>
  );
};

export default Suggestions;
