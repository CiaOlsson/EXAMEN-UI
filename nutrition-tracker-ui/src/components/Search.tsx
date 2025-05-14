import { useState, useEffect } from "react";
import { Box, TextField, Typography, Paper } from "@mui/material";
import api from "../api/axios";
import { useDebounce } from "../hooks/useDebounce";
import { dashboardPaperStyle, textFieldStyle } from "../styles/styles";
import { FoodVm } from "../models/FoodVm";

interface Props {
  onFoodSelect: (food: FoodVm) => void;
}

const Search = ({ onFoodSelect }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<FoodVm[]>([]);
  const debouncedSearchValue = useDebounce(searchValue, 400);

  useEffect(() => {
    if (debouncedSearchValue.length < 2) {
      setResults([]);
      return;
    }

    const getSearchResults = async () => {
      try {
        const response = await api.get(
          `/api/search?query=${encodeURIComponent(debouncedSearchValue)}`
        );
        setResults(response.data);
      } catch (err) {
        console.error("Sökning misslyckades:", err);
      }
    };

    getSearchResults();
  }, [debouncedSearchValue]);

  return (
    <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <Paper sx={dashboardPaperStyle}>
        <TextField
          fullWidth
          label="Sök efter livsmedel"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          sx={textFieldStyle}
        />
        {results.map((food) => (
          <Box
            key={food.foodId}
            onClick={() => onFoodSelect(food)}
            sx={{
              p: 1,
              mb: 1,
              borderRadius: 2,
              border: "1px solid #ccc",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <Typography>{food.name}</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography color="textDisabled">{food.foodGroup}</Typography>
              <Typography color="textDisabled">
                {food.energy_kcal} kcal / 100g
              </Typography>
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default Search;
