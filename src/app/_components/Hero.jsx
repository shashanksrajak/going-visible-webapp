"use client";

import * as React from "react";
import Link from "next/link";

import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { East } from "@mui/icons-material";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { login } from "@/lib/server-actions/user-auth";

export default function Hero() {
  const signInHandler = async () => {
    const credentials = await signInWithGoogle();
    const token = await credentials.user?.getIdToken();
    await login(token);
  };
  return (
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
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
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
            {/* Being Visible&nbsp; */}
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
                Being Visible.
              </Typography>
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", width: { sm: "100%", md: "100%" } }}
          >
            Effortless Digital Menus for Every Food Business. From Food Carts to
            Cloud Kitchens, We’ve Got You Covered.
          </Typography>
          {/* <Stack
            direction={"column"}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          ></Stack> */}

          {/* <Typography
            textAlign={"center"}
            variant="h6"
            sx={{ alignSelf: "center", width: { sm: "100%", md: "100%" } }}
            mt={4}
          >
            Digitize your menu with ease and enhance your customer experience.
          </Typography> */}
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
          {/* <Typography
            variant="caption"
            textAlign="center"
            sx={{ opacity: 0.8 }}
          >
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography> */}
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
  );
}
