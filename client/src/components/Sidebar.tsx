import { FC } from "react";
import {
  Drawer,
  ListItem,
  List,
  ListItemIcon,
  Typography,
  AppBar,
  Box,
  Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "web3uikit";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiDrawer: {
      variants: [
        {
          // @ts-ignore
          props: { anchor: "right" },
          style: {
            width: "100px",
          },
        },
      ],
    },
  },
});
const Sidebar: FC = () => {
  const navigate = useNavigate();

  const itemsList = [
    {
      text: "Home",
      icon: <HomeIcon />,
      onClick: () => navigate("/"),
    },
    {
      text: "Blogs",
      icon: <BookIcon />,
      onClick: () => navigate("/myBlogs"),
    },
    {
      text: "Write",
      icon: <RateReviewIcon />,
      onClick: () => navigate("/newStory"),
    },
  ];
  return (
    <>
      <AppBar
        position="sticky"
        sx={{ background: "white", display: { xs: "flex", md: "none" } }}
      >
        <Toolbar>
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
              textDecoration: "none",
            }}
          >
            Medium
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <ConnectButton />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Medium
        </Typography>

        <List sx={{ marginTop: "250px" }}>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem
                button
                key={index}
                onClick={onClick}
                sx={{
                  marginLeft: "20px",
                  marginRight: "auto",
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <ThemeProvider theme={theme}>
        <Drawer
          variant="permanent"
          anchor="right"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <Typography
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              width: "300px",
              marginLeft: "50px",
              marginTop: "70px",
            }}
          >
            *What we are reading Today
          </Typography>
        </Drawer>
      </ThemeProvider>
    </>
  );
};

export default Sidebar;
