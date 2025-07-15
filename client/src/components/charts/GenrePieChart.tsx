import React, { useRef } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import type { BookDetailsDTO } from "../../types";
import { captureChartImage } from "../../utils/chartImage";
import ChartCard from "../shared/ChartCard";
import ResponsiveLegend from "../shared/ResponsiveLegend";

const COLORS = [
  "#7fc97f",
  "#beaed4",
  "#fdc086",
  "#ffff99",
  "#386cb0",
  "#f0027f",
];

const GenrePieChart: React.FC<{ books: BookDetailsDTO[] }> = ({ books }) => {
  const chartOnlyRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    await captureChartImage(
      chartOnlyRef.current,
      "genre-chart",
      "Check out my Book Genres!",
      true
    );
  };

  const handleCopy = async () => {
    await captureChartImage(
      chartOnlyRef.current,
      "genre-chart",
      "Check out my Book Genres!",
      false
    );
  };

  const genreData = Object.entries(
    books.reduce((acc, book) => {
      const genre = book.genre || "Unknown";
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <ChartCard
      title="Books by Genre"
      onCopy={handleCopy}
      onDownload={handleDownload}
    >
      <div ref={chartOnlyRef} id="genre-chart" className="p-2 relative">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={genreData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {genreData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveLegend
          items={genreData.map((item, index) => ({
            name: item.name,
            color: COLORS[index % COLORS.length],
          }))}
        />
      </div>
    </ChartCard>
  );
};

export default GenrePieChart;
