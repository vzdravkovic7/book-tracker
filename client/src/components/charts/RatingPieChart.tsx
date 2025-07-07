import React, { useRef } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { BookDetailsDTO } from "../../types";
import { captureChartImage } from "../../utils/chartImage";
import ChartCard from "../shared/ChartCard";
import ResponsiveLegend from "../shared/ResponsiveLegend";

const COLORS = ["#ffcc00", "#ff9900", "#ff6600", "#ff3300", "#cc0000"];

const RatingPieChart: React.FC<{ books: BookDetailsDTO[] }> = ({ books }) => {
  const chartOnlyRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    await captureChartImage(
      chartOnlyRef.current,
      "rating-chart",
      "Books by Rating – How I rated what I’ve read!",
      true
    );
  };

  const handleCopy = async () => {
    await captureChartImage(
      chartOnlyRef.current,
      "rating-chart",
      "Books by Rating – How I rated what I’ve read!",
      false
    );
  };

  const ratingData = Object.entries(
    books.reduce((acc, book) => {
      const rating = book.rating ?? "Unrated";
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {} as Record<string | number, number>)
  ).map(([name, value]) => ({ name: name.toString(), value }));

  return (
    <ChartCard
      title="Books by Rating"
      onCopy={handleCopy}
      onDownload={handleDownload}
    >
      <div ref={chartOnlyRef} id="rating-chart" className="p-2 relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={ratingData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {ratingData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveLegend
          items={ratingData.map((item, index) => ({
            name: item.name,
            color: COLORS[index % COLORS.length],
          }))}
        />
      </div>
    </ChartCard>
  );
};

export default RatingPieChart;
