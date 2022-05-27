import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import axios from "axios";
import { Button } from "web3uikit";
import BlogCard from "../components/BlogCard";
import "./MyBlogs.css";

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

const MyBlogs: FC = () => {
  const [blogs, setBlogs] = useState<(object | undefined)[] | undefined>();
  const [blogsContent, setBlogsContent] = useState<object[]>();
  const navigate = useNavigate();
  const Web3Api = useMoralisWeb3Api();
  const { isInitialized, isAuthenticated, account } = useMoralis();

  const clickHandler = () => {
    navigate("/newStory");
  };

  // fetching fro web3api
  const fetchNFTs = async () => {
    const options = {
      chain: "mumbai",
      address: account,
      token_address: "0x19089c2F05AE286F21467d131e0679902eeffC13",
    };
    // @ts-ignore
    const polygonNFTs = await Web3Api.account.getNFTsForContract(options);
    const tokenUri = polygonNFTs?.result?.map((data: Metadata) => {
      const { metadata, owner_of } = data;

      if (metadata) {
        const metadataObj = JSON.parse(metadata);
        const { externalUrl } = metadataObj;
        return { externalUrl, owner_of };
      } else {
        return undefined;
      }
    });
    setBlogs(tokenUri);
  };

  const fextchBlogsContent = async () => {
    const limit10 = blogs?.slice(0, 5);
    let contentBlog: object[] = [];
    if (limit10) {
      limit10.map(async (blog) => {
        if (blog) {
          // @ts-ignore
          const { externalUrl, owner_of } = blog;
          const res = await axios.get(externalUrl);
          const text: string = res.data.text.toString();
          const title: string = res.data.title;
          contentBlog.push({ title, text, owner_of, externalUrl });
        }
      });
    }
    setBlogsContent(contentBlog);
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      fetchNFTs();
    } else {
      navigate("/");
    }
  }, [isAuthenticated, isInitialized, navigate, account]);

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
