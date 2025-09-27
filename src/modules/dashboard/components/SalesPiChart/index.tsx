// components/SalesPiChart.jsx
import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {  Box, Card, CardHeader, Divider, CardContent } from "@mui/material";

// Colors for each category
const COLORS = ["#1976d2", "#9c27b0", "#ff9800", "#4caf50", "#e91e63", "#00bcd4"];

const SalesPiChart = ({ data }) => {
    return (
        <Card sx={{ flex: 1}}>
            <CardHeader title="Sales by Category" />
            <Divider sx={{ borderColor: "grey.400", borderBottomWidth: 1 }} />
            <CardContent sx={{ p: 2 }}>
                <Box sx={{ width: "100%", height: 350 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                innerRadius={60}
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
            </CardContent>
        </Card>
    );
};

export default SalesPiChart;