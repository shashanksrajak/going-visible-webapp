"use client";

import React from "react";
import { Box, Typography, Grid, Card, Stack, CardContent } from "@mui/material";
import {
  AutoGraphOutlined,
  WorkspacePremiumOutlined,
  EmojiEventsOutlined,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";

// Helper function to determine if a badge is earned
const isBadgeEarned = (badgeCount) => badgeCount > 0;

const BadgeCard = ({
  badgeName,
  badgeCount,
  icon,
  earnedMessage,
  notEarnedMessage,
}) => (
  <Card
    sx={{
      backgroundColor: isBadgeEarned(badgeCount)
        ? green[100]
        : "rgba(200, 200, 200, 0.2)",
      border: isBadgeEarned(badgeCount)
        ? `2px solid ${green[600]}`
        : "2px solid gray",
      height: "100%",
    }}
  >
    <CardContent>
      <Stack alignItems={"center"} justifyContent={"center"}>
        {React.cloneElement(icon, {
          sx: {
            fontSize: 60,
            color: isBadgeEarned(badgeCount) ? green[700] : "gray",
          },
        })}
        <Stack textAlign={"center"} mt={2}>
          <Typography
            variant="h6"
            fontWeight={isBadgeEarned(badgeCount) ? "bold" : "normal"}
          >
            {badgeName} {badgeCount > 1 && `(${badgeCount})`}
          </Typography>
          <Typography
            variant="caption"
            color={isBadgeEarned(badgeCount) ? "textPrimary" : "textSecondary"}
          >
            {isBadgeEarned(badgeCount) ? earnedMessage : notEarnedMessage}
          </Typography>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

export default function Rewards({ badges }) {
  return (
    <Box mt={4}>
      <Typography variant="h5">Badges</Typography>
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <BadgeCard
              badgeName="First Feelings"
              badgeCount={badges.firstMoodLogBadge}
              icon={<WorkspacePremiumOutlined />}
              earnedMessage="Congratulations on earning the 'First Feelings' badge! You've successfully logged your mood for the first time."
              notEarnedMessage="You're just a step away from earning your 'First Feelings' badge! Log your mood for the first time to unlock this milestone and start your journey towards better emotional awareness."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <BadgeCard
              badgeName="Streak Master"
              badgeCount={badges.weeklyStreakBadge}
              icon={<AutoGraphOutlined />}
              earnedMessage="Awesome job! You've achieved the 'Streak Master' badge for maintaining a daily mood log streak."
              notEarnedMessage="Aim for consistency to earn the 'Streak Master' badge! Log your mood every day for a full week to achieve this streak and demonstrate your dedication to tracking your emotions."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <BadgeCard
              badgeName="Positivity Pro"
              badgeCount={badges.positiveDayBadge}
              icon={<EmojiEventsOutlined />}
              earnedMessage="You're on the path to becoming a 'Positivity Pro'! Keep up the great work and continue to log your positive mood."
              notEarnedMessage="You're on the path to becoming a 'Positivity Pro'! Maintain a positive mood throughout the day and log it to earn this badge. Your positive energy can inspire others!"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
