import { FC, useState, useEffect, SyntheticEvent } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from "@mui/material/Divider";
import { useAccount } from 'wagmi'


interface Metadata {
  token_address: string;
  token_id: string;
  contract_type: string;
  owner_of: string;
  block_number: string;
  block_number_minted: string;
  token_uri?: string | undefined;
  metadata?: string | undefined;
  synced_at?: string | undefined;
  amount?: string | undefined;
  name: string;
  symbol: string;
}

const exampleBlogs = [
  {
    title: "Title 1",
    content: "Content 1"
  },
  {
    title: "Title 2",
    content: "Content 2"
  },
  {
    title: "Title 2",
    content: "Content 2"
  },
]

const HomeAuth: FC = () => {
  const [blogs, setBlogs] = useState<(object | undefined)[] | undefined>();
  const { address } = useAccount();
  const [blogsContent, setBlogsContent] = useState<object[]>([
    {
      title: "Test 1",
      text: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
      "owner_of": "0x001"
    },
    {
      title: "Test 2",
      text: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
      "owner_of": "0x002"
    },
    {
      title: "Test 3",
      text: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
      "owner_of": "0x003"
    },
  ]);
  const [tabValue, setTabValue] = useState<number>(0);


  const fetchAllNftsByUser = async () => {
    const res = await axios.get("http://localhost:8000/getAllBlogsByUserAddress", {
      params: {
        address,
      }
    });
    console.log(res);
    // setBlogs(res?.data);
  };

  const fetchAllNfts = async () => {
    const res = await axios.get("http://localhost:8000/getAllBlogs");
    console.log(res);
    // setBlogs(res?.data);
  };

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
  }, [tabValue]);

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
            <Tab label="Your Blogs" />
          </Tabs>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Grid container direction="column" sx={{ m: 2 }}>
            {blogsContent &&
              blogsContent.map((blog, i) => {
                // @ts-ignore
                const { title, text, owner_of, externalUrl } = blog;
                return (
                  <BlogCard
                    key={i}
                    title={title}
                    text={text}
                    ownerOf={owner_of}
                    externalUrl={externalUrl}
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
