"use client";

import * as React from "react";
import { useState } from "react";

import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { East } from "@mui/icons-material";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { login } from "@/lib/server-actions/user-auth";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Hero() {
  const [signingIn, setSigningIn] = useState(false);

  const signInHandler = async () => {
    setSigningIn(true);
    const credentials = await signInWithGoogle();
    const token = await credentials.user?.getIdToken();
    await login(token);
    setSigningIn(false);
  };
  return (
    <>
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={signingIn}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
      <Box
        id="hero"
        sx={(theme) => ({
          width: "100%",
          backgroundImage:
            theme.palette.mode === "light"
              ? "linear-gradient(180deg, #CEE5FD, #FFF)"
              : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
        })}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Stack
            spacing={2}
            useFlexGap
            sx={{ width: { xs: "100%", sm: "70%" } }}
          >
            <Typography
              variant="h1"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
              }}
              color={"primary"}
            >
              {/* going visible&nbsp; */}
              Empowering People with
              <Typography
                component="span"
                variant="inherit"
                sx={{
                  fontSize: "inherit",
                  opacity: 0.4,
                }}
                color={"primary"}
              >
                Invisible Illnesses
              </Typography>
              <Typography
                component="span"
                variant="inherit"
                sx={{
                  fontSize: "inherit",
                }}
                color={"primary"}
              >
                to Truly{" "}
                <Typography
                  component="span"
                  variant="inherit"
                  sx={{
                    fontSize: "inherit",
                  }}
                  color={"secondary"}
                >
                  going visible
                </Typography>
              </Typography>
            </Typography>
            <Typography
              textAlign="center"
              color="text.secondary"
              sx={{ alignSelf: "center", width: { sm: "100%", md: "100%" } }}
              variant="h6"
            >
              Enhancing emotional well-being with Gemini AI, which offers
              personalized insights by analyzing mood entries and facial
              expressions.
            </Typography>

            <Box justifyContent={"center"} display={"flex"}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<East />}
                onClick={signInHandler}
              >
                Get Started For Free
              </Button>
            </Box>
          </Stack>

          <Box
            mt={4}
            sx={{ width: { xs: "100%", md: "70%" }, aspectRatio: 16 / 9 }}
          >
            <iframe
              src="https://www.youtube.com/embed/YKXnVvhK1LE?si=MjHBcbzB1s5KSu0x"
              title="YouTube video player"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </Box>
        </Container>
      </Box>
    </>
  );
}
