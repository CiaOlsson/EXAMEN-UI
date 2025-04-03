import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6A9C89", // Grön färg för knappar och primära element
      light: "#C1D8C3",// ljusgrön färg 
    },
    secondary: {
      main: "#FFA725" // Orange färg för tertiära element 
    },
    background: {
      default: "#FFF5E4", // Ljusbeige
    },
  },
});

export default theme;
