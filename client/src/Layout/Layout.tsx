import { FC } from "react";
import Leftbar from "../components/Leftbar";
import Rightbar from "../components/Rightbar";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  main: {
    display: "flex",
    width: "100%",
    maxWidth: "692px",
    height: "100%",
    alignItems: "center",
    margin: "10px 32px",
  },
});
const Layout: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Leftbar />
      <main className={classes.main}>{children}</main>
      <Rightbar />
    </div>
  );
};

export default Layout;
