import { getMoodLogsForDay } from "@/lib/server-actions/mood-logs";
import {
  Card,
  Stack,
  Typography,
  CardContent,
  Box,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MoodDatePicker from "./DatePicker";
import dayjs from "dayjs";
import { format } from "date-fns";
import { green, red, yellow } from "@mui/material/colors";

export default function MoodLogs({ userId }) {
  const [loading, setLoading] = useState(true);
  const [moods, setMoods] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Initialize with today's date

  const getMoods = async (date) => {
    const moodsList = await getMoodLogsForDay(userId, date.toDate());
    setMoods(moodsList);
    setLoading(false);
  };

  useEffect(() => {
    getMoods(selectedDate);
  }, [selectedDate]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }} my={5}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <>
      <Stack mb={4} justifyContent={"center"} direction={"row"}>
        <MoodDatePicker
          selectedDate={selectedDate}
          onDateChange={(date) => {
            setSelectedDate(date);
          }}
        />
      </Stack>

      <Stack spacing={2}>
        {moods.length > 0 ? (
          moods.map((mood, index) => (
            <Card
              key={index}
              sx={{
                backgroundColor:
                  mood.mood_sentiment === "POSITIVE"
                    ? green[50]
                    : mood.mood_sentiment === "NEGATIVE"
                    ? red[50]
                    : yellow[50],
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h5" component="div">
                    {mood.mood_sentiment}
                  </Typography>

                  <Box>
                    <Typography variant="subtitle2">Mood</Typography>

                    {/* Show Mood Text or Image */}

                    {mood.mood && (
                      <Typography variant="body2">{mood.mood}</Typography>
                    )}

                    {mood.image && (
                      <img src={mood.image} alt="mood-image" height={150} />
                    )}
                  </Box>

                  <Box>
                    <Typography variant="subtitle2">Suggestion</Typography>

                    <Typography variant="body2" gutterBottom>
                      {mood.suggestion}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Timestamp: {format(mood.timestamp, "PPpp")}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No mood logs for today.</Typography>
        )}
      </Stack>
    </>
  );
}
