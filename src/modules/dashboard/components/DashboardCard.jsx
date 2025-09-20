import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

const DashboardCard = ({ title, metric, icon, color }) => {
  return (
    <Card
      sx={{
        minWidth: 250,
        height: 120,
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        background: `linear-gradient(135deg, ${color} 0%, #474a4eff 100%)`,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        p: 2,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        },
      }}
    >
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, width: '100%' }}>
        <Stack direction="row" spacing={3} alignItems="center">
          {React.cloneElement(icon, { sx: { fontSize: "4vw" } })}
          <Box flexGrow={1}>
            <Typography variant="body2" sx={{ opacity: 1, mb: 0.5, fontSize:"1vw", fontWeight:"bold" }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bolder' }}>
              {metric}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;