import React, { useEffect, useState } from "react";
import bookService from "../services/bookService";
import type { BookDetailsDTO } from "../types";

import GenrePieChart from "../components/charts/GenrePieChart";
import StatusPieChart from "../components/charts/StatusPieChart";
import RatingPieChart from "../components/charts/RatingPieChart";
import AuthorPieChart from "../components/charts/AuthorPieChart";
import CompletionBarChart from "../components/charts/CompletionBarChart";
import AddedBarChart from "../components/charts/AddedBarChart";

const Graphs: React.FC = () => {
  const [books, setBooks] = useState<BookDetailsDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await bookService.getAllForUser();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books for graphs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div className="p-4">Loading graphs...</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-background text-textDark dark:text-textLight px-4 py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
          Book Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GenrePieChart books={books} />
          <StatusPieChart books={books} />
          <RatingPieChart books={books} />
          <AuthorPieChart books={books} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CompletionBarChart books={books} />
          <AddedBarChart books={books} />
        </div>
      </div>
    </div>
  );
};

export default Graphs;
