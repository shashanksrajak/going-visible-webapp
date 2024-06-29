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
            // display: "flex",
            // flexDirection: "column",
            // alignItems: "center",
            // bgcolor: "red",
            pt: { xs: 4, sm: 5 },
            pb: { xs: 5, sm: 10 },
          }}
          maxWidth="sm"
        >
          {children}
        </Container>
      </Box>
    </>
  );
}
