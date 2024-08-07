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
                  // color: (theme) =>
                  //   theme.palette.mode === "light"
                  //     ? "primary.main"
                  //     : "primary.light",
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
                  // color: (theme) =>
                  //   theme.palette.mode === "light"
                  //     ? "primary.main"
                  //     : "primary.light",
                }}
                color={"primary"}
              >
                to Truly{" "}
                <Typography
                  component="span"
                  variant="inherit"
                  sx={{
                    fontSize: "inherit",
                    // color: (theme) =>
                    //   theme.palette.mode === "light"
                    //     ? "primary.main"
                    //     : "primary.light",
                  }}
                  color={"secondary"}
                >
                  going visible.
                </Typography>
              </Typography>
            </Typography>
            <Typography
              textAlign="center"
              color="text.secondary"
              sx={{ alignSelf: "center", width: { sm: "100%", md: "100%" } }}
              variant="h6"
            >
              Transforming emotional well-being with cutting-edge AI technology.
              Our platform harnesses the power of Gemini AI to provide
              personalized insights and support.
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
            id="image"
            sx={(theme) => ({
              mt: { xs: 8, sm: 10 },
              alignSelf: "center",
              height: { xs: 200, sm: 700 },
              width: "100%",
              backgroundImage:
                theme.palette.mode === "light"
                  ? 'url("/static/images/home/hero-light.png")'
                  : 'url("/static/images/home/hero-dark.png")',
              backgroundSize: "cover",
              borderRadius: "10px",
              outline: "1px solid",
              outlineColor:
                theme.palette.mode === "light"
                  ? alpha("#BFCCD9", 0.5)
                  : alpha("#9CCCFC", 0.1),
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                  : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
            })}
          />
        </Container>
      </Box>
    </>
  );
}
