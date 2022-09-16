import { FC, useState, useEffect, SyntheticEvent, useCallback } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { useAccount } from 'wagmi'

const HomeAuth: FC = () => {
  const [blogs, setBlogs] = useState<(object | undefined)[] | undefined>();
  const { address, isConnected } = useAccount();
  const [tabValue, setTabValue] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);


  const fetchAllNftsByUser = useCallback(async () => {
    setIsFetching(true);
    const res = await axios.get(`${process.env.REACT_APP_BACKEND}/getAllBlogsByUserAddress`, {
      params: {
        address,
      }
    });
    setBlogs(res?.data);
    setIsFetching(false);
  }, [address]);

  const fetchAllNfts = useCallback(async () => {
    setIsFetching(true);
    const res = await axios.get(`${process.env.REACT_APP_BACKEND}/getAllBlogs`);
    setBlogs(res?.data);
    setIsFetching(false);
  }, []);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    switch (tabValue) {
      case 0:
        fetchAllNfts();
        break;
      case 1:
      default:
        fetchAllNftsByUser();
        break;
    }
  }, [fetchAllNfts, fetchAllNftsByUser, tabValue]);

  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Tabs value={tabValue} onChange={handleChange} textColor="secondary">
            <Tab label="Explore" />
            {isConnected && <Tab label="Your Blogs" />}
          </Tabs>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Grid container direction="column" sx={{ m: 2 }}>
            {isFetching ? (
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                pt={25}
                direction="column"
                spacing={2}
              >
                <Grid item>
                  <CircularProgress color="secondary" />
                </Grid>
                <Grid item>
                  <Typography>
                    Loading Blogs...
                  </Typography>
                </Grid>
              </Grid>
            ) : (blogs &&
              blogs.map((blog, i) => {
                // @ts-ignore
                const { tokenAddress, tokenId } = blog ?? {};
                // @ts-ignore
                const { description, name } = blog?.metadata ?? {};
                return (
                  <BlogCard
                    key={name}
                    index={i}
                    title={name}
                    text={description}
                    tokenAddress={tokenAddress}
                    tokenId={tokenId}
                  />
                );
              }))}
          </Grid>
        </Grid>
      </Grid>

    </>
  );
};

export default HomeAuth;
