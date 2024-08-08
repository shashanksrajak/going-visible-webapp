import React from "react";
import { currentUser } from "@/lib/server-actions/user-auth";
import Header from "./_components/Header";
import { Container, Box } from "@mui/material";

export default async function Layout({ children }) {
  const user = await currentUser();

  return (
    <>
      {user && <Header user={user} />}
      <Box>
        <Container
          sx={{
            pt: { xs: 12, sm: 16 },
            pb: { xs: 12, sm: 16 },
          }}
          maxWidth="md"
        >
          {children}
        </Container>
      </Box>
    </>
  );
}
