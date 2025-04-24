import React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { buttonStyle, textFieldStyle, pageContainer } from "../styles/styles";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useForm } from "react-hook-form";

interface LoginFormInput {
  useremail: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const onSubmit = async (data: LoginFormInput) => {
    try {
      const response = await api.post("/login", data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="E-post"
            {...register("useremail", {
              required: "E-post krävs",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Ogiltig e-postadress",
              },
            })}
            error={!!errors.useremail}
            helperText={errors.useremail?.message}
            margin="normal"
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            label="Lösenord"
            type="password"
            {...register("password", {
              required: "Lösenord krävs",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
            sx={textFieldStyle}
          />
          <Button fullWidth type="submit" variant="contained" sx={buttonStyle}>
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
