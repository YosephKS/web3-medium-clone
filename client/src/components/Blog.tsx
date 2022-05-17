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
  const { url, tokenId } = useParams();
  const navigate = useNavigate();
  const { account } = useMoralis();
  const fetchBlogContent = async () => {
    const res = await axios.get(`${Url}/${url}`);
    console.log(res.data);
    setTitle(res.data.title);
    const text = res.data.text.toString();
    setText(text);
  };
  useEffect(() => {
    fetchBlogContent();
    if (!account) {
      navigate("/");
    }
  }, [account]);
  return (
    <div className="singleBlog">
      <div className="singleBlogWrapper">
        <div className="singleBlogImg">
          {/* <NFT
            address="0x19089c2F05AE286F21467d131e0679902eeffC13"
            chain="mumbai"
            fetchMetadata
            // @ts-ignore
            tokenId={tokenId}
            name={title}
          /> */}
        </div>
        <div className="singleBlogContent">
          <h1 className="singleBlogTitle">{title}</h1>
          <p className="singleBlogText">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
