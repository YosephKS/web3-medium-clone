import { FC, Fragment } from "react";
import Drawer from "@mui/material/Drawer";
import { Input } from "web3uikit";
import { makeStyles } from "@mui/styles";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import logo from "../images/Moralis.png";
const useStyles = makeStyles({
  drawer: {
    width: "100px",
  },
  search: {
    marginTop: "40px",
    padding: "20px",
  },
  trends: {
    fontWeight: "bold",
    marginLeft: "50px",
    alignItems: "center",
  },
});

const Rightbar: FC = () => {
  const classes = useStyles();
  const trends = [
    {
      title: "Real Performance Paradox",
      name: "Alex Ivan",
    },
    {
      title: "The Email Scam That Nearly Worked On Me",
      name: "Lulia Abel",
    },
    {
      title: "The forgotten benefits of “low tech” user interfaces",
      name: "Makda Aaron",
    },
  ];
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      open={true}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <div className={classes.search}>
        <Input label="Search" name="Search" prefixIcon="search"></Input>
      </div>

      <div className={classes.trends}>
        What we are reading Today
        <List
          sx={{
            width: "100%",
            maxWidth: 300,
            bgcolor: "background.paper",
          }}
        >
          {trends.map((e, i) => {
            return (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ width: 20, height: 20 }} src={logo} />
                </ListItemAvatar>
                <ListItemText
                  primary={e.name}
                  secondary={
                    <Fragment>
                      {
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{ fontWeight: "bold" }}
                        >
                          {e.title}
                        </Typography>
                      }
                    </Fragment>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </div>
    </Drawer>
  );
};

export default Rightbar;
