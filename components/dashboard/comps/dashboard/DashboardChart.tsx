import React, { useRef, useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const DashboardChart = ({ chartData }: any) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={parseChartData(chartData)}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} MB`}
        />
        <Bar dataKey="total" fill={"#00ecfc"} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;

function parseChartData(data: any) {
  if (!data) return;
  const entries = Object.entries(data);

  const chartData = entries.map(([key, value]) => {
    const date = key.split(" ")[0]; // Split by space and take the first part (date)
    return {
      name: date, // Use the date part as the name
      total: value,
    };
  });

  return chartData;
}
