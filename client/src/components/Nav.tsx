import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { ConnectButton } from "web3uikit";

const pages = ["Home", "Blogs", "Write"];

const Nav: FC = () => {
  const { isAuthenticated } = useMoralis();
  const navigate = useNavigate();
  const clickHandler = (page: string) => {
    if (page === "Home") {
      navigate("/");
    } else if (page === "Blogs") {
      navigate("/read");
    } else if (page === "Write") {
      navigate("/write");
    } else if (page === "myBlogs") {
      navigate("/myBlogs");
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
            {isAuthenticated ? (
              <Button
                key="MyBlogs"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
                onClick={() => clickHandler("myBlogs")}
              >
                MyBlogs
              </Button>
            ) : null}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <ConnectButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
