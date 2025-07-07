import React, { useRef } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
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

const AuthorPieChart: React.FC<{ books: BookDetailsDTO[] }> = ({ books }) => {
  const chartOnlyRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    await captureChartImage(
      chartOnlyRef.current,
      "author-chart",
      "Check out which authors I read the most!",
      true
    );
  };

  const handleCopy = async () => {
    await captureChartImage(
      chartOnlyRef.current,
      "author-chart",
      "Check out which authors I read the most!",
      false
    );
  };

  const authorData = Object.entries(
    books.reduce((acc, book) => {
      const author = book.author || "Unknown";
      acc[author] = (acc[author] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <ChartCard
      title="Books by Author"
      onCopy={handleCopy}
      onDownload={handleDownload}
    >
      <div ref={chartOnlyRef} id="author-chart" className="p-2 relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={authorData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {authorData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveLegend
          items={authorData.map((item, index) => ({
            name: item.name,
            color: COLORS[index % COLORS.length],
          }))}
        />
      </div>
    </ChartCard>
  );
};

export default AuthorPieChart;
