import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material'
import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const SalesLineChart = ({ data }) => {
    return (
        <Card sx={{ flex:1 }}>
            <CardHeader
                title="Sales by Month" />
            <Divider sx={{ borderColor: "grey.400", borderBottomWidth: 1 }} />
            <CardContent sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ width: "100%", height: 350 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="sales"
                                stroke="#1976d2"
                                strokeWidth={3}
                                dot={{ r: 5 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    )
}

export default SalesLineChart