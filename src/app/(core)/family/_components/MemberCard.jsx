"use client";

import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import React, { useState } from "react";
import { deleteFamilyMember } from "@/lib/server-actions/family";

export default function MemberCard({ userId, name, email }) {
  const [deleting, setDeleting] = useState(false);

  const deleteMemberHandler = async () => {
    setDeleting(true);
    await deleteFamilyMember(userId, email);
    setDeleting(false);
  };

  return (
    <Card>
      <CardContent>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box>
            <Typography fontWeight={"bold"}>{name}</Typography>
            <Typography>{email}</Typography>
          </Box>

          <Box>
            {deleting ? (
              <CircularProgress />
            ) : (
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={deleteMemberHandler}
              >
                <Delete />
              </IconButton>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
