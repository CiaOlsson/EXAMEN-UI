import { useState } from "react";
import { Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview";
import { pageContainer } from "../styles/styles";
import Search from "../components/Search";
import AddIntake from "../components/AddIntake";
import { FoodVm } from "../models/FoodVm";

const Dashboard = () => {
  type ViewState =
    | { view: "overview" }
    | { view: "search" }
    | { view: "addIntake"; food: FoodVm };

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [activeView, setActiveView] = useState<ViewState>( {view: "overview"});

  return (
    <Box sx={pageContainer}>
      <Sidebar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onToggleViewClick={() => setActiveView((prev) => {
          if(prev.view === "overview") return {view: "search"};
          if(prev.view === "search") return {view: "overview"};
          return prev;
        })}
        isSearchView={activeView.view === "search"}
      />
      {activeView.view === "overview" && (
        <Overview selectedDate={selectedDate} />
      )}

      {activeView.view === "search" && (
        <Search
          onFoodSelect={(food) => setActiveView({ view: "addIntake", food })}
        />
      )}
      {activeView.view === "addIntake" && (
        <AddIntake
          food={activeView.food}
          selectedDate={selectedDate}
          onSubmit={() => setActiveView({ view: "overview" })}
          onCancel={() => setActiveView({ view: "search"})}
        />
      )}
    </Box>
  );
};

export default Dashboard;
