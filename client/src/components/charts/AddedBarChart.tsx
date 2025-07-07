import React, { useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { BookDetailsDTO } from "../../types";
import { captureChartImage } from "../../utils/chartImage";
import ChartCard from "../shared/ChartCard";

const AddedBarChart: React.FC<{ books: BookDetailsDTO[] }> = ({ books }) => {
  const chartOnlyRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    await captureChartImage(
      chartOnlyRef.current,
      "books-added-chart",
      "Books Added Per Month",
      true
    );
  };

  const handleCopy = async () => {
    await captureChartImage(
      chartOnlyRef.current,
      "books-added-chart",
      "Books Added Per Month",
      false
    );
  };

  const monthlyData = books
    .filter((b) => b.dateAdded)
    .reduce((acc, book) => {
      const date = new Date(book.dateAdded!);
      const key = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const chartData = Object.entries(monthlyData)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month));

  return (
    <ChartCard
      title="Books Added Monthly"
      onCopy={handleCopy}
      onDownload={handleDownload}
    >
      <div ref={chartOnlyRef} id="books-added-chart" className="p-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#10b981" name="Books Added" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default AddedBarChart;
