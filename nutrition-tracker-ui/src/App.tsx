import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./styles/theme";
import Login from "./views/Login";
import Signup from "./views/SignUp";
import Overview from "./views/Overview";
import ProtectedRoute from "./components/ProtectedRoute"


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/overview"
            element={
              <ProtectedRoute>
                <Overview />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
