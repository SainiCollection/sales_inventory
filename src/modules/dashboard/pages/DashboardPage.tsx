import React from 'react';
import {  Card, CardContent, Box, CardHeader, Divider } from '@mui/material';
import StatCard from '../components/StatCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Example Icon
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningIcon from '@mui/icons-material/Warning';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturned';
import { StatMetric } from '../../../types/global';
import { categoryData, salesChartData } from '../mockdata';
import SalesLineChart from '../components/SalesLineChart';
import SalesPiChart from '../components/SalesPiChart';

const dashboardStats: StatMetric[] = [
  {
    title: "Total Revenue",
    value: "₹9,87,600",
    change: "12.5%",
    changeDescription: "From Last Quarter",
    icon: <AttachMoneyIcon />,
    iconBgColor: "#e8f5e9", // Light Green
    changeType: "increase",
  },
  {
    title: "Units in Stock",
    value: "25,480",
    change: "1.5%",
    changeDescription: "Last 30 Days",
    icon: <InventoryIcon />,
    iconBgColor: "#e3f2fd", // Light Blue
    changeType: "increase",
  },
  {
    title: "Low Stock Items",
    value: "35",
    change: "10",
    changeDescription: "Requires Reorder",
    icon: <WarningIcon />,
    iconBgColor: "#fff3e0", // Light Orange
    changeType: "decrease", // Fewer low stock items is a positive trend
  },
  {
    title: "Avg Order Value",
    value: "₹155.75",
    change: "3.2%",
    changeDescription: "Than Previous Month",
    icon: <ShoppingCartIcon />,
    iconBgColor: "#f3e5f5", // Light Purple
    changeType: "increase",
  },
  {
    title: "Returns Processed",
    value: "18",
    change: "15%",
    changeDescription: "Compared to Q2",
    icon: <AssignmentReturnIcon />,
    iconBgColor: "#fbebeb", // Very Light Red
    changeType: "decrease", // Fewer returns is a positive trend
  },
];
const DashboardPage = () => {


  return (
    <Box sx={{ width: "100%", p: 2, gap: 2, display:"flex", flexDirection:"column" }}>
      <Box>
        <Card sx={{ maxWidth: "100%" }}>
          <CardHeader
            title="Overview" />
            <Divider sx={{ borderColor: "grey.400", borderBottomWidth: 1 }} />
          <CardContent sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
            {dashboardStats.map((stat, idx) => (
              <StatCard
                key={idx}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeDescription={stat.changeDescription}
                icon={stat.icon}
                iconBgColor={stat.iconBgColor}
                changeType={stat.changeType}
              />
            ))}

          </CardContent>
        </Card>
      </Box>
      <Box sx={{display:"flex", width:"100%", gap:2, justifyContent:"space-between"}}>
        <SalesLineChart data={salesChartData} />
        <SalesPiChart data={categoryData} />
      </Box>
    </Box>
  );
};

export default DashboardPage;
