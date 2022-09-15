import { FC, useState, useEffect, SyntheticEvent, useCallback } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from "@mui/material/Divider";
import { useAccount } from 'wagmi'

const HomeAuth: FC = () => {
  const [blogs, setBlogs] = useState<(object | undefined)[] | undefined>();
  const { address, isConnected } = useAccount();
  const [tabValue, setTabValue] = useState<number>(0);


  const fetchAllNftsByUser = useCallback(async () => {
    const res = await axios.get("http://localhost:8000/getAllBlogsByUserAddress", {
      params: {
        address,
      }
    });
    setBlogs(res?.data);
  }, [address]);

  const fetchAllNfts = useCallback(async () => {
    const res = await axios.get("http://localhost:8000/getAllBlogs");
    setBlogs(res?.data);
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

  // useEffect(() => {
  //   if (blogs && !blogsContent) {
  //     fextchBlogsContent();
  //   }
  // }, [blogs, blogsContent]);

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
            {blogs &&
              blogs.map((blog, i) => {
                // @ts-ignore
                const { tokenAddress, tokenId } = blog ?? {};
                // @ts-ignore
                const { description, name } = blog?.metadata ?? {};
                return (
                  <BlogCard
                    key={name}
                    title={name}
                    text={description}
                    tokenAddress={tokenAddress}
                    tokenId={tokenId}
                  />
                );
              })}
          </Grid>
        </Grid>
      </Grid>

    </>
  );
};

export default HomeAuth;
