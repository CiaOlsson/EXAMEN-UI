//import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import {
  buttonStyle,
  textFieldStyle,
  pageContainerSecondary,
} from "../styles/styles";
import api from "../api/axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

// nice to have: senare kanske jag ville fixa så man får ett mail?

interface SignupFormInput {
  username: string;
  useremail: string;
  password: string;
  confirmPassword: string;
}

const navigate = useNavigate();

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormInput>();

  const onSubmit = async (data: SignupFormInput) => {
    try {
      const { confirmPassword, ...payload } = data;
      const response = await api.post("/signup", payload);
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={pageContainerSecondary}>
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
            {...register("useremail", {
              required: "E-post krävs",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Ogiltig e-postadress",
              },
            })}
            error={!!errors.useremail}
            helperText={errors.useremail?.message}
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
        <Typography variant="body2" mt={2}>
          <Link to="/login">Logga in här</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
