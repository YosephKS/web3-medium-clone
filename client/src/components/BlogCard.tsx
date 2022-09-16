import { FC } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useContractRead } from 'wagmi';
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import IconButton from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import NFTABI from "../contracts/NFT.sol/NFT.json";

interface ChildProps {
  index: number;
  text: string;
  title: string;
  tokenAddress: string;
  tokenId: string;
}
const BlogCard: FC<ChildProps> = ({ index, text, title, tokenAddress, tokenId }) => {
  const { data: ownerOf } = useContractRead({
    addressOrName: tokenAddress,
    contractInterface: NFTABI?.abi,
    functionName: "ownerOf",
    args: tokenId
  })

  return (text && title) ? (
    <Fade in={true} unmountOnExit timeout={500 * (index + 1)}>
      <Grid container direction="column">
        <Grid item>
          <Grid container my={2}>
            <Grid
              item
              xs={2}
              style={{
                backgroundImage: "url(https://filecoin.io/uploads/moralis-hackathon.png)",
                height: "10rem",
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat"
              }}
            />
            <Grid item xs={9} pl={2}>
              <Grid container direction="column" alignItems="space-around">
                <Grid item>
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
                <Grid item mt={2}>
                  <Grid container>
                    <Grid item>
                      <Tooltip title="OpenSea">
                        <IconButton
                          onClick={
                            () => window.open(`https://testnets.opensea.io/assets/mumbai/${tokenAddress}/${tokenId}`, "_blank")
                          }
                        >
                          <LaunchIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
      </Grid>
    </Fade>
  ) : (
    <></>
  );
};

export default BlogCard;
