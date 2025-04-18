import React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { buttonStyle, textFieldStyle, pageContainer } from "../styles/styles";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Box sx={pageContainer}>
      <Paper
        elevation={5}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: 350,
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" mb={2}>
          Logga in
        </Typography>
        <form>
          <TextField
            fullWidth
            label="Användarnamn"
            variant="outlined"
            margin="normal"
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            label="Lösenord"
            type="password"
            variant="outlined"
            margin="normal"
            sx={textFieldStyle}
          />
          <Button fullWidth variant="contained" sx={buttonStyle}>
            Logga in
          </Button>
        </form>
        <Typography variant="body2" mt={2}>
          <Link to="/register">Registrera dig här</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
