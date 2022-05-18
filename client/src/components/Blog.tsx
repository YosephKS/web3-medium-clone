import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import axios from "axios";
import { NFT } from "web3uikit";
import { useNavigate } from "react-router-dom";
import "./Blog.css";
import { Url } from "../config/constants";

const Blog: FC = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { url } = useParams();
  const navigate = useNavigate();
  const { isInitialized, isAuthenticated } = useMoralis();
  const fetchBlogContent = async () => {
    const res = await axios.get(`${Url}/${url}`);
    console.log(res.data);
    setTitle(res.data.title);
    const text = res.data.text.toString();
    setText(text);
  };
  useEffect(() => {
    if (!isInitialized || !isAuthenticated) {
      navigate("/");
    } else {
      fetchBlogContent();
    }
  }, [isAuthenticated, isInitialized, navigate]);
  return (
    <div className="singleBlog">
      <div className="singleBlogWrapper">
        <div className="singleBlogImg"></div>
        <div className="singleBlogContent">
          <h1 className="singleBlogTitle">{title}</h1>
          <p className="singleBlogText">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
