import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  IconButton,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { makeStyles } from "@mui/styles";
import logo from "../images/Moralis.png";
import console from "console";

const useStyles = makeStyles({
  drawer: {
    width: "190px",
  },
  list: {
    marginTop: "200px",
  },
  logo: {
    marginTop: "20px",
    marginLeft: "5px",
  },
});
const icons = [
  {
    icon: <HomeOutlinedIcon />,
    navigate: "/",
  },
  {
    icon: <NotificationsOutlinedIcon />,
    navigate: "/",
  },
  {
    icon: <BookmarksOutlinedIcon />,
    navigate: "/",
  },
  {
    icon: <LibraryBooksOutlinedIcon />,
    navigate: "/myBlogs",
  },
];

const Leftbar: FC = () => {
  const classes = useStyles();
  const { logout } = useMoralis();
  const navigate = useNavigate();

  const logOut = async () => {
    await logout();
    navigate("/");
  };
  return (
    <Drawer
      variant="permanent"
      sx={{ display: { xs: "none", sm: "block" } }}
      className={classes.drawer}
    >
      <div className={classes.logo}>
        <img src={logo} alt="logo" height="50px" />
      </div>
      <List className={classes.list}>
        {icons.map((icon, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: "center",
                px: 2.5,
              }}
              onClick={() => navigate(icon.navigate)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: "auto",
                  justifyContent: "center",
                }}
              >
                {icon.icon}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <IconButton
          sx={{
            minHeight: 50,
            justifyContent: "center",
            px: 2.5,
          }}
          onClick={() => {
            navigate("/newStory");
          }}
        >
          <SaveAsOutlinedIcon />
        </IconButton>
      </List>
      <div style={{ marginTop: 130, cursor: "pointer" }} onClick={logOut}>
        Log out
      </div>
    </Drawer>
  );
};

export default Leftbar;
