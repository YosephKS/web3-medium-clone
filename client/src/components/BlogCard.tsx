import { FC } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import "./BlogCard.css";
interface ChildProps {
  text: string;
  title: string;
  ownerOf: string;
  externalUrl: string;
}
const BlogCard: FC<ChildProps> = ({ text, title, ownerOf, externalUrl }) => {
  // const account = `${ownerOf.slice(0, 4)}...${ownerOf.slice(38)}`;

  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Grid container my={2}>
            <Grid
              item
              xs={2}
              style={{
                backgroundImage: "url(https://ipfs.moralis.io:2053/ipfs/QmWEsG4ayh75BMk2H1CowAdALPjsi3fD7CSZ6qxNM1yNnz/image/moralis.png)",
                height: "10rem",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            />
            <Grid item xs={9} pl={2}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h4">
                    <b>{title}</b>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    <i>Owned by {ownerOf}</i>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {text}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
      </Grid>
    </>
  );
};

export default BlogCard;
