import { Box, IconButton } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { sidebarStyle } from "../styles/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle"; 
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface SidebarProps {
  selectedDate: Dayjs;
  onDateChange: (date: Dayjs) => void;
  onToggleViewClick: () => void;
  isSearchView: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedDate,
  onDateChange,
  onToggleViewClick,
  isSearchView,
}) => {
  return (
    <Box sx={sidebarStyle}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          disableFuture
          value={selectedDate}
          onChange={(date) => {
            if (date) {
              onDateChange(date);
            }
          }}
        />
      </LocalizationProvider>
      <Box sx={{ position: "absolute", bottom: 16, right: 16 }}>
        <IconButton
          color="primary"
          onClick={onToggleViewClick}
          sx={{ margin: 2, fontSize: 54 }}
        >
          {isSearchView ? (
            <ArrowBackIcon fontSize="inherit" />
          ) : (
            <AddCircleIcon fontSize="inherit" />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Sidebar;
