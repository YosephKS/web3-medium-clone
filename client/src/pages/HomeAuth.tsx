import { FC, useState, useEffect } from "react";
import "./HomeAuth.css";
import BlogCard from "../components/BlogCard";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import axios from "axios";
import console from "console";

interface MetaData {
  owner: string;
  image: string;
  externalUrl: string;
  description: string;
}

const HomeAuth: FC = () => {
  const [blogsContent, setBlogsContent] = useState<object[]>();
  const [blogs, setBlogs] = useState<MetaData[]>();

  const { isInitialized, isAuthenticated } = useMoralis();
  // fetch from cloud function;
  const { fetch } = useMoralisCloudFunction("getMetaData", {
    autoFetch: false,
  });
  const cloudCall = async () => {
    const data = await fetch();
    console.log("data from cloud", data);
    // @ts-ignore
    setBlogs(data);
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
    if (isAuthenticated && isInitialized && !blogs) {
      cloudCall();
    }
  }, [isAuthenticated, isInitialized, fetch]);

  useEffect(() => {
    if (blogs && !blogsContent) {
      fextchBlogsContent();
    }
  }, [blogs, blogsContent]);

  return (
    <div className="homeAuth_container">
      <div className="homeAuth_header">recommended</div>
      <div className="homeAuth_blogs">
        {blogsContent &&
          blogsContent.map((blog, i) => {
            // @ts-ignore
            const { title, text, owner, externalUrl, image } = blog;
            console.log(blog);
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
          })}
      </div>
    </div>
  );
};

export default HomeAuth;
