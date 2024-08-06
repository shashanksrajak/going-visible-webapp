import { Typography, Button, Box, Stack, Alert } from "@mui/material";
import React from "react";
import MemberCard from "./_components/MemberCard";
import { currentUser } from "@/lib/server-actions/user-auth";
import AddMemberDialog from "./_components/AddMemberDialog";

export default async function FamilyPage() {
  const user = await currentUser();

  return (
    <>
      <Typography variant="h4">Family</Typography>
      <Typography variant="body2">
        Manage your friends and family, who are your supporters in your journey
      </Typography>

      <Box my={2}>
        <AddMemberDialog userId={user.uid} />
      </Box>

      <Alert severity="info">
        You can add upto 5 members. They will receive mood alerts.
      </Alert>

      {/* list of users */}
      <Stack spacing={2} my={4}>
        {user.family?.length > 0 ? (
          <>
            {user.family.map((member) => {
              return (
                <MemberCard
                  key={member.email}
                  name={member.name}
                  email={member.email}
                />
              );
            })}
          </>
        ) : (
          // TODO: add a illustration here
          "Please add a family member to stay connected."
        )}
      </Stack>
    </>
  );
}
