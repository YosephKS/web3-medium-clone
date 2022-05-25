import { FC } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { useMoralis } from "react-moralis";

const pages = ["Home", "Write", "Memeber", "AboutUs"];

const Nav: FC = () => {
  const { authenticate, isAuthenticated } = useMoralis();
  const navigate = useNavigate();
  const clickHandler = (page: string) => {
    if (page === "Home") {
      navigate("/");
    } else if (page === "Write") {
      navigate("/write");
    }
  };
  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" }).catch(
        function (error) {}
      );
    }
  };
  return (
    <AppBar position="sticky" sx={{ background: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Medium
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Medium
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", fontFamily: "monospace" },
            }}
          >
            {pages.map((page, index) => (
              <Button
                key={index}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
                onClick={() => clickHandler(page)}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button onClick={login}>Connect Wallet</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
