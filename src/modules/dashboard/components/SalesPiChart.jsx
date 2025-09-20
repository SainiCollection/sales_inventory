// components/SalesPieChart.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography, Box } from "@mui/material";

// Colors for each category
const COLORS = ["#1976d2", "#9c27b0", "#ff9800", "#4caf50", "#e91e63", "#00bcd4"];

const SalesPieChart = ({ data }) => {
  return (
    <Paper sx={{ p: 2, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Sales by Category
      </Typography>
      <Box sx={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60} // ✅ makes it a donut chart
              paddingAngle={3}
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default SalesPieChart;
