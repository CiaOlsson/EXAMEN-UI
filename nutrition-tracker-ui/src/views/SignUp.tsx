//import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { buttonStyle, textFieldStyle, pageContainer } from "../styles/styles";
import api from "../api/axios";
import { useForm } from "react-hook-form";

interface SignUpFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormInput>();

  const onSubmit = async (data: SignUpFormInput) => {
    try {
      const { confirmPassword, ...payload } = data;
      const response = await api.post("/signup", payload);
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
          Registrera dig
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Användarnamn"
            {...register("username", { required: "Användarnamn krävs" })}
            error={!!errors.username}
            helperText={errors.username?.message}
            //variant="outlined"
            margin="normal"
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            label="E-post"
            {...register("email", {
              required: "E-post krävs",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Ogiltig e-postadress",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            //variant="outlined"
            margin="normal"
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            label="Lösenord"
            {...register("password", {
              required: "Lösenord krävs",
              minLength: {
                value: 6,
                message: "Lösenordet måste vara minst 6 tecken",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password"
            //variant="outlined"
            margin="normal"
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            label="Bekräfta lösenord"
            {...register("confirmPassword", {
              required: "lösenord krävs",
              validate: (value) =>
                value === watch("password") || "Lösenorden matchar inte",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            type="password"
            //variant="outlined"
            margin="normal"
            sx={textFieldStyle}
          />
          <Button fullWidth type="submit" variant="contained" sx={buttonStyle}>
            Registrera
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUp;
