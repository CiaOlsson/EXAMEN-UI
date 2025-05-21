import { SxProps, Theme } from "@mui/material";
import backgroundImage from "../assets/fresh_fruits.jpg"

// Grundläggande styling för alla knappar
export const buttonStyle: SxProps<Theme> = {
  borderRadius: 8,
  padding: "10px 16px",
  fontSize: "16px",
  textTransform: "none"
};

// Grundläggande styling för alla text fält
export const textFieldStyle: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    mb: 2,
    borderRadius: 7,
    pl: 1
  },
};

// Container-styling för sidor
export const pageContainerSecondary: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundImage: `url(${backgroundImage})`, 
  backgroundSize: "cover", 
  backgroundPosition: "center", 
  backgroundRepeat: "no-repeat", 
};

export const dashboardPaperStyle: SxProps<Theme> = {
  ml: "0px",
  padding: 6,
  width: 1300,
  maxWidth: "70vw",
  height: "90vh",
  overflowY: "auto",          
};

// export const pageContainerPrimary: SxProps<Theme> = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   height: "100vh",
//   backgroundImage: `url(${backgroundImage})`, 
//   backgroundSize: "cover", 
//   backgroundPosition: "center", 
//   backgroundRepeat: "no-repeat", 
// };

export const pageContainer = {
  display: "flex",
  alignItems: "center",
  width: "100vw",
  minHeight: "100vh",
  overflow: "auto",
};

export const statCardStyle = { //används inte någonstans just nu
  backgroundColor: "#fff",
  padding: 3,
  borderRadius: 2,
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

//Style för sidebaren. 
export const sidebarStyle = {
  position: "sticky",
  top: 0,
  width: 320,
  height: "100vh",
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "center",
  p: 3,
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
};

//Style för mätarna
export const progressBarStyle = {
  marginTop: 2,
  height: 10,
  borderRadius: 5,
};