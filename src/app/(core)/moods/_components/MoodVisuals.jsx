import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { getMoodLogsForMonth } from "@/lib/server-actions/mood-logs";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function MoodVisuals({ userId }) {
  const [monthlyData, setMonthlyData] = useState({});

  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  const getMonthlyData = async (month) => {
    const moodLogs = await getMoodLogsForMonth(userId, month);

    console.log("moodlogs", moodLogs);

    // Process moodLogs to prepare data for the chart
    const labels = [];
    const data = {};

    moodLogs.forEach((log) => {
      //   const date = dayjs(log.timestamp.toDate()).format("DD/MM/YYYY");
      const date = log.timestamp;
      if (!labels.includes(date)) {
        labels.push(date);
        for (const mood of ["POSITIVE", "NEGATIVE", "NEUTRAL"]) {
          data[mood] = data[mood] || Array(labels.length).fill(0);
        }
      }
      const index = labels.indexOf(date);
      data[log.mood_sentiment][index] += 1;
    });

    console.log("labels", labels);
    console.log("data", data);

    setMonthlyData({
      labels,
      datasets: Object.keys(data).map((mood) => ({
        label: mood,
        data: data[mood],
        backgroundColor:
          mood === "POSITIVE"
            ? "rgba(75, 192, 192, 0.2)"
            : mood === "NEGATIVE"
            ? "rgba(255, 99, 132, 0.2)"
            : "rgba(255, 206, 86, 0.2)",
        borderColor:
          mood === "POSITIVE"
            ? "rgba(75, 192, 192, 1)"
            : mood === "NEGATIVE"
            ? "rgba(255, 99, 132, 1)"
            : "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      })),
    });
  };

  useEffect(() => {
    if (selectedMonth) {
      getMonthlyData(selectedMonth);
    }
  }, [selectedMonth]);

  return (
    <div>
      <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year", "month"]}
            label="Select Month"
            value={selectedMonth}
            onChange={(date) => setSelectedMonth(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </>

      <h2>Mood Logs for {selectedMonth.format("MMMM YYYY")}</h2>
      {/* <Bar
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
      /> */}
    </div>
  );
}
