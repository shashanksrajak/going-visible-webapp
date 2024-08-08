import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { getMoodLogsForMonth } from "@/lib/server-actions/mood-logs";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  Box,
  CircularProgress,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { red, green, yellow } from "@mui/material/colors";
import { Print } from "@mui/icons-material";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

export default function MoodVisuals({ userId }) {
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState({});
  const [doughnutData, setDoughnutData] = useState({});

  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  const getMonthlyData = async (month) => {
    setLoading(true);
    const moodLogs = await getMoodLogsForMonth(userId, month);

    console.log(moodLogs);

    // Generate all dates for the month
    const startOfMonth = dayjs(month).startOf("month");
    const endOfMonth = dayjs(month).endOf("month");
    const daysInMonth = endOfMonth.date();

    const labels = Array.from({ length: daysInMonth }, (_, i) =>
      startOfMonth.add(i, "day").format("D")
    );

    // Initialize data structure for mood counts
    const data = {
      POSITIVE: Array(daysInMonth).fill(0),
      NEGATIVE: Array(daysInMonth).fill(0),
      NEUTRAL: Array(daysInMonth).fill(0),
    };

    // Initialize data for the doughnut chart
    const totalData = {
      POSITIVE: 0,
      NEGATIVE: 0,
      NEUTRAL: 0,
    };

    // Fill the data array with mood counts
    moodLogs.forEach((log) => {
      const date = dayjs(log.timestamp).date();

      const index = labels.indexOf(String(date));
      if (index !== -1) {
        data[log.mood_sentiment][index] += 1;
        totalData[log.mood_sentiment] += 1;
      }
    });

    setMonthlyData({
      labels,
      datasets: Object.keys(data).map((mood) => ({
        label: mood,
        data: data[mood],
        backgroundColor:
          mood === "POSITIVE"
            ? green[100]
            : mood === "NEGATIVE"
            ? red[100]
            : yellow[100],
        borderColor:
          mood === "POSITIVE"
            ? green[300]
            : mood === "NEGATIVE"
            ? red[300]
            : yellow[300],
        borderWidth: 1,
      })),
    });

    setDoughnutData({
      labels: ["Positive", "Negative", "Neutral"],
      datasets: [
        {
          data: [totalData.POSITIVE, totalData.NEGATIVE, totalData.NEUTRAL],
          backgroundColor: [green[100], red[100], yellow[100]],
          borderColor: [green[300], red[300], yellow[300]],
          borderWidth: 1,
        },
      ],
    });
    setLoading(false);
  };

  useEffect(() => {
    if (selectedMonth) {
      getMonthlyData(selectedMonth);
    }
  }, [selectedMonth]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }} my={5}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <div>
      <Stack mb={4} justifyContent={"center"} direction={"row"}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year", "month"]}
            label="Select Month"
            value={selectedMonth}
            onChange={(date) => setSelectedMonth(date)}
            renderInput={(params) => <TextField {...params} />}
            maxDate={dayjs()}
          />
        </LocalizationProvider>
      </Stack>

      <Typography textAlign={"center"} mb={2} variant="h5">
        Mood Logs for {selectedMonth.format("MMMM YYYY")}
      </Typography>

      <Typography textAlign={"center"} mb={2} variant="h6">
        Daily Analysis
      </Typography>
      <Bar
        data={monthlyData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        }}
      />

      <Typography textAlign={"center"} mb={2} variant="h6" mt={5}>
        Overall Analysis
      </Typography>
      <Doughnut
        height={200}
        width={200}
        data={doughnutData}
        options={{
          responsive: true,
          aspectRatio: 1.4,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const label = tooltipItem.label || "";
                  const value = tooltipItem.raw || 0;
                  return `${label}: ${value}`;
                },
              },
            },
          },
        }}
      />

      <Box textAlign={"center"} mt={5}>
        <Button
          endIcon={<Print />}
          onClick={() => {
            window.print();
          }}
        >
          Print Report
        </Button>
      </Box>
    </div>
  );
}
