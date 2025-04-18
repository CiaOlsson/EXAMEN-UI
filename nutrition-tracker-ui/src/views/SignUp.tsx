import React, {useState} from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { buttonStyle, textFieldStyle, pageContainer } from "../styles/styles";
import api from "../api/axios";

interface SignUpFormState  {
    username: string;
    email: string;
    password: string;
  }

const SignUp = () => {
      const [formData, setFormData] = useState<SignUpFormState>({
        username: "",
        email: "",
        password: ""
      })

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}))
      }

      const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        console.log(formData)
        e.preventDefault();
        try {
          const response = await api.post("/signup", formData)
          console.log(response);
        }
        catch (error){
          console.error(error);
        }
      }
      
  return (
    <Box sx={pageContainer}>
      <Paper
        elevation={5}
        sx={{ padding: 4, borderRadius: 3, width: 350, textAlign: "center", backgroundColor: "white" }}
      >
        <Typography variant="h5" mb={2}>
          Registrera dig
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth name="username" label="Användarnamn" variant="outlined" margin="normal" sx={textFieldStyle} onChange={handleChange}/>
          <TextField fullWidth name="email" label="E-post" variant="outlined" margin="normal" sx={textFieldStyle} onChange={handleChange}/>
          <TextField fullWidth name="password" label="Lösenord" type="password" variant="outlined" margin="normal" sx={textFieldStyle} onChange={handleChange}/>
          <TextField fullWidth name="confirmPassword" label="Bekräfta lösenord" type="password" variant="outlined" margin="normal" sx={textFieldStyle} onChange={handleChange}/>
          <Button fullWidth type="submit" variant="contained" sx={buttonStyle}>
            Registrera
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUp;
