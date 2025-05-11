import { Box } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from 'dayjs';
import { sidebarStyle } from "../styles/styles"; 

interface SidebarProps {
  selectedDate: Dayjs;
  onDateChange: (date: Dayjs ) => void;
}


const Sidebar: React.FC<SidebarProps> = ({ selectedDate, onDateChange }) => {
  return (
    <Box sx={sidebarStyle} >
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
    </Box>
  );
};

export default Sidebar;
