import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./styles/theme";
import Login from "./views/Login";
import Register from "./views/Register";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
