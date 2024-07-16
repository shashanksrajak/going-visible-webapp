import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import React from "react";

export default function MemberCard({ name, email }) {
  return (
    <Card>
      <CardContent>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box>
            <Typography fontWeight={"bold"}>{name}</Typography>
            <Typography>{email}</Typography>
          </Box>

          <Box>
            {/* <IconButton aria-label="edit" color="secondary">
              <Edit />
            </IconButton> */}
            <IconButton aria-label="delete" color="secondary">
              <Delete />
            </IconButton>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
