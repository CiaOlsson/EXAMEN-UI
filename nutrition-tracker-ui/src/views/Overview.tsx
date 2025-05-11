import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Alert,
} from "@mui/material";
import { pageContainer, progressBarStyle } from "../styles/styles";
import Sidebar from "../components/Sidebar";
import dayjs, { Dayjs } from "dayjs";
import api from "../api/axios";

type IntakeVm = {
  name: string;
  energy_kcal: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  fiber: number;
  sugarsTotal: number;
  salt: number;
  vitamin_A: number;
  vitamin_B6: number;
  vitamin_B12: number;
  vitamin_C: number;
  vitamin_D: number;
  vitamin_E: number;
  vitamin_K: number;
};

const Overview = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [todayMeals, setTodayMeals] = useState<IntakeVm[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const formattedDate = selectedDate.format("YYYY-MM-DD");
        const response = await api.get(`/api/overview?date=${formattedDate}`);
        setTodayMeals(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load meals");
      }
    };

    fetchMeals();
  }, [selectedDate]);

  // detta om jag vill ha felmeddelande någon stans
  // {
  //   error && (
  //     <Typography variant="body2" color="error" sx={{ mb: 2 }}>
  //       {error}
  //     </Typography>
  //   );
  // }

  const formatNumber = (value: number | null | undefined, decimals = 2) =>
    value != null ? value.toFixed(decimals) : "-";

  return (
    <Box sx={pageContainer}>
      <Sidebar selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            ml: "0px",
            padding: 6,
            width: "100%",
            maxWidth: 1200,
            height: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Today's Intake
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {[
              {
                label: "Calories",
                value: 100,
                goal: 200,  //lägg till logik här istället för denna mock data. 
              },
              {
                label: "Protein",
                value: 100,
                goal: 200,
              },
              {
                label: "Carbs",
                value: 100,
                goal: 200,
              },
              { label: "Fat", value: 100, goal: 200 },
            ].map((nutrient) => (
              <Box
                key={nutrient.label}
                sx={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Typography variant="h6">
                  {nutrient.label}: {nutrient.value}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(nutrient.value / nutrient.goal) * 100}
                  sx={progressBarStyle}
                />
                <Typography variant="body2" color="textSecondary">
                  Planned: {nutrient.goal}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            Today's Added Meals
          </Typography>
          <TableContainer>
            <Table aria-label="nutrients table">
              <TableHead>
                <TableRow>
                  <TableCell>Nutrient</TableCell>
                  <TableCell align="right">Energy</TableCell>
                  <TableCell align="right">Protein</TableCell>
                  <TableCell align="right">Fat</TableCell>
                  <TableCell align="right">Carbohydrates</TableCell>
                  <TableCell align="right">Fiber</TableCell>
                  <TableCell align="right">SugarsTotal</TableCell>
                  <TableCell align="right">Salt</TableCell>
                  <TableCell align="right">A</TableCell>
                  <TableCell align="right">B6</TableCell>
                  <TableCell align="right">B12</TableCell>
                  <TableCell align="right">C</TableCell>
                  <TableCell align="right">D</TableCell>
                  <TableCell align="right">E</TableCell>
                  <TableCell align="right">K</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>Total</strong> {/*Här vill jag eventuellt ha totalen för varje näringsvärde.*/}
                  </TableCell>
                </TableRow>
                {todayMeals.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="right">{formatNumber(item.energy_kcal)}</TableCell>
                    <TableCell align="right">{formatNumber(item.protein)}</TableCell>
                    <TableCell align="right">{formatNumber(item.fat)}</TableCell>
                    <TableCell align="right">{formatNumber(item.carbohydrates)}</TableCell>
                    <TableCell align="right">{formatNumber(item.fiber)}</TableCell>
                    <TableCell align="right">{formatNumber(item.sugarsTotal)}</TableCell>
                    <TableCell align="right">{formatNumber(item.salt)}</TableCell>
                    <TableCell align="right">{formatNumber(item.vitamin_A)}</TableCell>
                    <TableCell align="right">{formatNumber(item.vitamin_B6)}</TableCell>
                    <TableCell align="right">{formatNumber(item.vitamin_B12)}</TableCell>
                    <TableCell align="right">{formatNumber(item.vitamin_C)}</TableCell>
                    <TableCell align="right">{formatNumber(item.vitamin_D)}</TableCell>
                    <TableCell align="right">{formatNumber(item.vitamin_E)}</TableCell>
                    <TableCell align="right">{formatNumber(item.vitamin_K)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default Overview;
