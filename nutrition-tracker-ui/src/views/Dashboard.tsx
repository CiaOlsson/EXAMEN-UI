import { useState } from "react";
import { Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview" 
import { pageContainer } from "../styles/styles";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [activeView, setActiveView] = useState<"overview" | "search">(
    "overview"
  );

  return (
    <Box sx={pageContainer}>
        <Sidebar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        {activeView === "overview" && (
          <Overview selectedDate={selectedDate} /> 
        )}
        {/* ska lägga till Search , AddIntake */}
    </Box>
  );
};

export default Dashboard;
