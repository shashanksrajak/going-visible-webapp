import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { grey } from "@mui/material/colors";

const logoStyle = {
  width: "140px",
  height: "auto",
};

function Copyright() {
  return (
    <Box textAlign={"center"} my={4} borderTop={1} borderColor={grey[300]}>
      <Typography variant="body2" color="text.secondary" mt={1}>
        {"Copyright © "}
        <Link href="https://pakwanify.com/">going visible&nbsp;</Link>
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}

export default function Footer() {
  return (
    <>
      <Container
        id="footer"
        sx={{
          pt: { xs: 4, sm: 12 },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 2, sm: 2 },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          color="text.primary"
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          Contact Us
        </Typography>

        <Box textAlign={"center"} color={"text.secondary"}>
          <Typography>
            We’re here to assist you with any questions or support needs.
          </Typography>
          <Typography>Write us at:</Typography>
          <Typography>shashanksrajak@gmail.com</Typography>
        </Box>
        <Divider />
      </Container>
      <Copyright />
    </>
  );
}
