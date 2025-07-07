import React, { useRef } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { BookDetailsDTO } from "../../types";
import { captureChartImage } from "../../utils/chartImage";
import ChartCard from "../shared/ChartCard";
import ResponsiveLegend from "../shared/ResponsiveLegend";

const COLORS = ["#82ca9d", "#8884d8", "#ffc658", "#ff7f50"];

const StatusPieChart: React.FC<{ books: BookDetailsDTO[] }> = ({ books }) => {
  const chartOnlyRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    await captureChartImage(
      chartOnlyRef.current,
      "status-chart",
      "Here's how I'm progressing with my books!",
      true
    );
  };

  const handleCopy = async () => {
    await captureChartImage(
      chartOnlyRef.current,
      "status-chart",
      "Here's how I'm progressing with my books!",
      false
    );
  };

  const statusData = Object.entries(
    books.reduce((acc, book) => {
      const status = book.status || "Unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <ChartCard
      title="Books by Status"
      onCopy={handleCopy}
      onDownload={handleDownload}
    >
      <div ref={chartOnlyRef} id="status-chart" className="p-2 relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {statusData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveLegend
          items={statusData.map((item, index) => ({
            name: item.name,
            color: COLORS[index % COLORS.length],
          }))}
        />
      </div>
    </ChartCard>
  );
};

export default StatusPieChart;
