"use client";

import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { login } from "@/lib/server-actions/user-auth";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

const pages = ["Features", "About", "Contact"];

export default function Navbar({ mode, toggleColorMode }) {
  const [signingIn, setSigningIn] = useState(false);

  const signInHandler = async () => {
    setSigningIn(true);
    const credentials = await signInWithGoogle();
    const token = await credentials.user?.getIdToken();
    await login(token);
    setSigningIn(false);
  };
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={signingIn}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              {/* <img
                src={
                  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
                }
                style={logoStyle}
                alt="logo of sitemark"
              /> */}
              <Typography variant="h6" color={"blue"} px={4}>
                being visible
              </Typography>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem
                  onClick={() => scrollToSection("features")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Features
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => scrollToSection("faq")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>

                <Link href={`/about`} style={{ textDecoration: "none" }}>
                  <MenuItem
                    onClick={() => scrollToSection("testimonials")}
                    sx={{ py: "6px", px: "12px" }}
                  >
                    <Typography variant="body2" color="text.primary">
                      About
                    </Typography>
                  </MenuItem>
                </Link>

                <MenuItem
                  onClick={() => scrollToSection("footer")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Contact
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}

              <Button
                color="primary"
                variant="contained"
                // size="small"

                onClick={signInHandler}
              >
                Sign In With Google
              </Button>
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    {/* <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    /> */}
                  </Box>

                  <MenuItem onClick={() => scrollToSection("features")}>
                    Features
                  </MenuItem>

                  <MenuItem onClick={() => scrollToSection("faq")}>
                    FAQ
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("testimonials")}>
                    About
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("footer")}>
                    Contact
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <Link href={`/onboarding`}>
                      <Button
                        color="primary"
                        variant="contained"
                        component="a"
                        sx={{ width: "100%" }}
                      >
                        Create an account
                      </Button>
                    </Link>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};
