import React from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import {
  CheckCircle,
  Radio,
  RadioButtonUnchecked,
  Verified,
  Whatshot,
} from "@mui/icons-material";

export default function WeeklyStreak() {
  return (
    <Box>
      <Typography variant="h5">Weekly Streak</Typography>

      <Box mt={2}>
        <Card>
          <CardContent>
            <Stack direction={"row"} alignItems={"center"}>
              <Whatshot sx={{ fontSize: 60 }} color="secondary" />
              <Stack>
                <Typography variant="h5">6</Typography>
                <Typography fontSize={"md"}>Day Streak</Typography>
              </Stack>
            </Stack>
            <Stack mt={4} direction={"row"} gap={2}>
              <Stack alignItems={"center"}>
                <Verified color="success" />
                <Typography>M</Typography>
              </Stack>

              <Stack alignItems={"center"}>
                <RadioButtonUnchecked />
                <Typography>T</Typography>
              </Stack>

              <Stack alignItems={"center"}>
                <RadioButtonUnchecked />
                <Typography>W</Typography>
              </Stack>

              <Stack alignItems={"center"}>
                <RadioButtonUnchecked />
                <Typography>T</Typography>
              </Stack>

              <Stack alignItems={"center"}>
                <RadioButtonUnchecked />
                <Typography>F</Typography>
              </Stack>

              <Stack alignItems={"center"}>
                <RadioButtonUnchecked />
                <Typography>S</Typography>
              </Stack>

              <Stack alignItems={"center"}>
                <RadioButtonUnchecked />
                <Typography>S</Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
