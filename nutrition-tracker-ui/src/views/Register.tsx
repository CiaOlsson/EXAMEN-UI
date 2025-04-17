import React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { buttonStyle, textFieldStyle, pageContainer } from "../styles/styles";

const Register = () => {
  return (
    <Box sx={pageContainer}>
      <Paper
        elevation={5}
        sx={{ padding: 4, borderRadius: 3, width: 350, textAlign: "center", backgroundColor: "white" }}
      >
        <Typography variant="h5" mb={2}>
          Registrera dig
        </Typography>
        <form>
          <TextField fullWidth label="Användarnamn" variant="outlined" margin="normal" sx={textFieldStyle} />
          <TextField fullWidth label="E-post" variant="outlined" margin="normal" sx={textFieldStyle} />
          <TextField fullWidth label="Lösenord" type="password" variant="outlined" margin="normal" sx={textFieldStyle} />
          <TextField fullWidth label="Bekräfta lösenord" type="password" variant="outlined" margin="normal" sx={textFieldStyle} />
          <Button fullWidth variant="contained" sx={buttonStyle}>
            Registrera
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
