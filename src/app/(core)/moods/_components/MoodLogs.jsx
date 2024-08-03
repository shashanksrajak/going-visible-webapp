import { getMoodLogsForDay } from "@/lib/server-actions/mood-logs";
import { Card, Stack, Typography, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoodDatePicker from "./DatePicker";
import dayjs from "dayjs";

export default function MoodLogs({ userId }) {
  const [moods, setMoods] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Initialize with today's date

  const getMoods = async (date) => {
    const moodsList = await getMoodLogsForDay(userId, date.toDate());
    setMoods(moodsList);
  };

  useEffect(() => {
    getMoods(selectedDate);
  }, [selectedDate]);

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
            <Card key={index}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {mood.mood_sentiment}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Mood Sentiment
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {mood.suggestion}
                </Typography>

                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Timestamp: {mood.timestamp}
                </Typography>
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
