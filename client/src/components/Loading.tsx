import { Backdrop, CircularProgress } from "@mui/material";
import { FC } from "react";

interface ChildProps {
  open: boolean;
}
const Loading: FC<ChildProps> = ({ open }) => {
  return (
    <div className="loading_spinner">
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loading;
