import { FC, useState, useEffect } from "react";
import "./HomeAuth.css";
import BlogCard from "../components/BlogCard";
import axios from "axios";
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

const HomeAuth: FC = () => {
  const [blogs, setBlogs] = useState<(object | undefined)[] | undefined>();
  const [blogsContent, setBlogsContent] = useState<object[]>();
  //fetching from web3Api
  const fetchAllNfts = async () => {
    const options = {
      chain: "mumbai",
      address: "0x19089c2F05AE286F21467d131e0679902eeffC13",
    };
    // @ts-ignore
    const polygonNFTs = await Web3Api.token.getNFTOwners(options);
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
    if (!blogs) {
      fetchAllNfts();
    }
  }, [blogs]);

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
      </div>
    </div>
  );
};

export default HomeAuth;
