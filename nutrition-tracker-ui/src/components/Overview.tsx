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
  LinearProgress
} from "@mui/material";
import { dashboardPaperStyle, progressBarStyle } from "../styles/styles";
import { Dayjs } from "dayjs";
import api from "../api/axios";

interface OverviewProps {
  selectedDate: Dayjs;
}

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

const Overview = ({selectedDate}: OverviewProps) => {
  const [todayMeals, setTodayMeals] = useState<IntakeVm[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const formattedDate = selectedDate.format("YYYY-MM-DD");
        const response = await api.get(`/api/dashboard?date=${formattedDate}`);
        setTodayMeals(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMeals();
  }, [selectedDate]);

  // Vill jag ha felmeddelande någonstans, vill nog lägga felmeddelande i en toast? 


  const formatNumber = (value: number | null | undefined, decimals = 2) =>
    value != null ? value.toFixed(decimals) : "-";

  const totalValues = todayMeals.reduce(
    (acc, item) => {
      acc.energy_kcal += item.energy_kcal ?? 0;
      acc.protein += item.protein ?? 0;
      acc.fat += item.fat ?? 0;
      acc.carbohydrates += item.carbohydrates ?? 0;
      acc.fiber += item.fiber ?? 0;
      acc.sugarsTotal += item.sugarsTotal ?? 0;
      acc.salt += item.salt ?? 0;
      acc.vitamin_A += item.vitamin_A ?? 0;
      acc.vitamin_B6 += item.vitamin_B6 ?? 0;
      acc.vitamin_B12 += item.vitamin_B12 ?? 0;
      acc.vitamin_C += item.vitamin_C ?? 0;
      acc.vitamin_D += item.vitamin_D ?? 0;
      acc.vitamin_E += item.vitamin_E ?? 0;
      acc.vitamin_K += item.vitamin_K ?? 0;
      return acc;
    },
    {
      energy_kcal: 0,
      protein: 0,
      fat: 0,
      carbohydrates: 0,
      fiber: 0,
      sugarsTotal: 0,
      salt: 0,
      vitamin_A: 0,
      vitamin_B6: 0,
      vitamin_B12: 0,
      vitamin_C: 0,
      vitamin_D: 0,
      vitamin_E: 0,
      vitamin_K: 0,
    }
  );
  

  return (
    <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <Paper sx={dashboardPaperStyle}>
        <Typography variant="h5" gutterBottom>
          Dagens näringsintag
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {[
            {
              label: "Energi",
              unit: "Kcal",
              value: totalValues.energy_kcal,
              goal: 2000,
            },
            {
              label: "Protein",
              unit: "g",
              value: totalValues.protein,
              goal: 125,
            },
            {
              label: "Kolhydrater",
              unit: "g",
              value: totalValues.carbohydrates,
              goal: 225,
            },
            { label: "Fett", unit: "g", value: totalValues.fat, goal: 67 },
          ].map((nutrient) => (
            <Box
              key={nutrient.label}
              sx={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <Typography variant="h6">
                {nutrient.label}: {formatNumber(nutrient.value)} {nutrient.unit}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(nutrient.value / nutrient.goal) * 100}
                sx={progressBarStyle}
              />
              <Typography variant="body2" color="textSecondary">
                rekommenderat: {nutrient.goal} {nutrient.unit} / dag
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Dagens måltider
        </Typography>
        <TableContainer>
          <Table aria-label="nutrients table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: 150,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  Nutrient
                </TableCell>
                <TableCell align="right">Energi</TableCell>
                <TableCell align="right">Protein</TableCell>
                <TableCell align="right">Fett</TableCell>
                <TableCell align="right">Kolhydrater</TableCell>
                <TableCell align="right">Fiber</TableCell>
                <TableCell align="right">Socker</TableCell>
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
                  <strong>Total</strong>
                </TableCell>
                <TableCell align="right">
                  {formatNumber(totalValues.energy_kcal)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(totalValues.protein)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(totalValues.fat)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(totalValues.carbohydrates)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(totalValues.fiber)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(totalValues.sugarsTotal)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(totalValues.salt)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(totalValues.vitamin_A)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(totalValues.vitamin_B6)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(totalValues.vitamin_B12)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(totalValues.vitamin_C)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(totalValues.vitamin_D)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(totalValues.vitamin_E)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(totalValues.vitamin_K)}
                </TableCell>
              </TableRow>
              {todayMeals.map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(item.energy_kcal)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(item.protein)}
                  </TableCell>
                  <TableCell align="right">{formatNumber(item.fat)}</TableCell>
                  <TableCell align="right">
                    {formatNumber(item.carbohydrates)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(item.fiber)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(item.sugarsTotal)}
                  </TableCell>
                  <TableCell align="right">{formatNumber(item.salt)}</TableCell>
                  <TableCell align="right">
                    {formatNumber(item.vitamin_A)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(item.vitamin_B6)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(item.vitamin_B12)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(item.vitamin_C)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(item.vitamin_D)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(item.vitamin_E)}
                  </TableCell>
                  <TableCell align="right">
                    {formatNumber(item.vitamin_K)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Overview;
