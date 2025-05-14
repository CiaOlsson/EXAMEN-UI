import api from "../api/axios";
import { Box, TextField, Typography, Paper, Button } from "@mui/material";
import { dashboardPaperStyle } from "../styles/styles";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { FoodVm } from "../models/FoodVm";

interface AddIntakeProps {
  food: FoodVm;
  selectedDate: Dayjs;
  onSubmit: () => void;
  onCancel: () => void;
}

const AddIntake = ({ food, selectedDate, onSubmit, onCancel }: AddIntakeProps) => {
  const [amount, setAmount] = useState<number>(100);
console.log(food)
  const handleSubmit = async () => {
    try {
      await api.post("/api/overview", {
        foodId: food.foodId,
        foodAmount: amount,
        dateOfIntake: selectedDate.format("YYYY-MM-DD"),
      });
      onSubmit();
    } catch (err) {
      console.error("Fel vid intagsregistrering", err);
    }
  };

  return (
    <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <Paper sx={dashboardPaperStyle}>
        <Typography variant="h6" gutterBottom>
          {food.name}
        </Typography>
        <TextField
          fullWidth
          label="Mängd (gram)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Lägg till intag
        </Button>
        <Button variant="outlined" onClick={onCancel} sx={{ml: 2}}>
          Avbryt
        </Button>
      </Paper>
    </Box>
  );
};

export default AddIntake;
