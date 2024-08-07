"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";
import { RadioButtonUnchecked, Verified, Whatshot } from "@mui/icons-material";

const getCurrentWeekDates = () => {
  const currentDate = new Date();
  const firstDayOfWeek = currentDate.getDate() - currentDate.getDay(); // Start from Sunday
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(firstDayOfWeek + i);
    dates.push(date);
  }

  return dates;
};

const formatDate = (date) =>
  date.toLocaleDateString(undefined, { weekday: "short" });

export default function Streaks() {
  const [loading, setLoading] = useState(true);
  const [loggedDays, setLoggedDays] = useState([]);
  const [weeklyStreak, setWeeklyStreak] = useState(0); // Track weekly streaks
  const weekDates = getCurrentWeekDates();

  useEffect(() => {
    const fetchMoodLogs = async () => {
      try {
        const response = await fetch(`/api/moods/weekly-logs`);
        const data = await response.json();

        const logs = data.logs;
        setLoggedDays(logs.map((log) => new Date(log).toLocaleDateString()));
        setWeeklyStreak(data.weeklyStreak || 0); // Fetch the weekly streak count
      } catch (error) {
        console.error("Error fetching mood logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodLogs();
  }, []);

  const currentStreak = weekDates.reduce((streak, date) => {
    const dateStr = date.toLocaleDateString();
    if (loggedDays.includes(dateStr)) {
      return streak + 1;
    }
    return streak;
  }, 0);

  return (
    <Box>
      <Typography variant="h5">Streaks</Typography>

      <Box mt={2}>
        <Card>
          <CardContent>
            <Stack direction={"row"} alignItems={"center"} spacing={4}>
              <Stack direction={"row"} alignItems={"center"}>
                <Whatshot sx={{ fontSize: 60 }} color="secondary" />
                <Stack>
                  {loading ? (
                    <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                  ) : (
                    <Typography variant="h5">{currentStreak}</Typography>
                  )}
                  <Typography fontSize={"md"}>Day Streak</Typography>
                </Stack>
              </Stack>

              <Stack direction={"row"} alignItems={"center"}>
                <Whatshot sx={{ fontSize: 60 }} color="secondary" />
                <Stack>
                  {loading ? (
                    <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                  ) : (
                    <Typography variant="h5">{weeklyStreak}</Typography>
                  )}
                  <Typography fontSize={"md"}>Week Streak</Typography>
                </Stack>
              </Stack>
            </Stack>

            <Stack mt={4} direction={"row"} gap={2}>
              {weekDates.map((date, index) => {
                const dateStr = date.toLocaleDateString();
                const isLogged = loggedDays.includes(dateStr);

                return (
                  <Stack alignItems={"center"} key={index}>
                    {isLogged ? (
                      <Verified color="success" />
                    ) : (
                      <RadioButtonUnchecked />
                    )}
                    <Typography>{formatDate(date)}</Typography>
                  </Stack>
                );
              })}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
