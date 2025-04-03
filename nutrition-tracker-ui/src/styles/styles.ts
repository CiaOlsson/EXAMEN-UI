import { SxProps, Theme } from "@mui/material";
import backgroundImage from "../assets/AdobeStock_175063550_Preview.jpeg"

// Grundläggande styling för alla knappar i projektet
export const buttonStyle: SxProps<Theme> = {
  borderRadius: 8,
  padding: "10px 16px",
  fontSize: "16px",
  textTransform: "none"
};

// Grundläggande styling för alla TextFields i projektet
export const textFieldStyle: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
  },
};

// Container-styling för sidor
export const pageContainer: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundImage: `url(${backgroundImage})`, // Använd bilden som bakgrund
  backgroundSize: "cover", // Gör så att bilden täcker hela bakgrunden
  backgroundPosition: "center", // Centrera bilden
  backgroundRepeat: "no-repeat", // Förhindra upprepning av bilden
};