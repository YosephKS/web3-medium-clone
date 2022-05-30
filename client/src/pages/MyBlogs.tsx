import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import axios from "axios";
import { Button } from "web3uikit";
import BlogCard from "../components/BlogCard";
import "./MyBlogs.css";
import console from "console";
interface MetaData {
  owner: string;
  image: string;
  externalUrl: string;
  description: string;
}
const MyBlogs: FC = () => {
  const [blogs, setBlogs] = useState<MetaData[]>();
  const [blogsContent, setBlogsContent] = useState<object[]>();
  const navigate = useNavigate();
  console.log(blogsContent);
  const { isInitialized, isAuthenticated, account } = useMoralis();
  // fetch from cloud function;
  const { fetch } = useMoralisCloudFunction(
    "getMetaData",
    { owner: account },
    {
      autoFetch: false,
    }
  );

  const clickHandler = () => {
    navigate("/newStory");
  };

  const fextchBlogsContent = async () => {
    let contentBlog: object[] = [];
    if (blogs) {
      blogs.map(async (blog) => {
        if (blog) {
          // @ts-ignore
          const { externalUrl, owner, image } = blog;
          const res = await axios.get(externalUrl);
          const text: string = res.data.text.toString();
          const title: string = res.data.title;
          contentBlog.push({ title, text, owner, externalUrl, image });
        }
      });
    }
    setBlogsContent(contentBlog);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const cloudCall = async () => {
        const data = await fetch();
        console.log(data);
        // @ts-ignore
        setBlogs(data);
      };
      cloudCall();
    }
  }, [fetch, isAuthenticated]);

  useEffect(() => {
    if (blogs && blogs.length > 0 && !blogsContent) {
      fextchBlogsContent();
    }
  }, [blogs, blogsContent]);

  return (
    <>
      <div>
        {blogsContent && blogsContent?.length > 0 ? (
          blogsContent?.map((blog, i) => {
            // @ts-ignore
            const { title, text, owner, externalUrl, image } = blog;
            return (
              <BlogCard
                key={i}
                title={title}
                text={text}
                ownerOf={owner}
                externalUrl={externalUrl}
                image={image}
              />
            );
          })
        ) : (
          <div
            style={{
              fontSize: "30px",
              width: "100%",
              marginLeft: "40%",
            }}
          >
            <p>No Blog Yet</p>
            <Button text="Create one" onClick={clickHandler} />
          </div>
        )}
      </div>
    </>
  );
};

export default MyBlogs;
