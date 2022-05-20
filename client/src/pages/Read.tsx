import { FC } from "react";
import { useState, useEffect } from "react";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import CardNFT from "../components/Card";

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
interface Attributes {
  blogContent: string;
  blogTitle: string;
  bloggerAcc: string;
  createdAt: object;
  imageipfs: string;
  nftMetadata: string;
  update: object;
}
interface Result {
  className: string;
  id: string;
  attributes: Attributes;
}
const Read: FC = () => {
  // const [metadata, setMetadata] = useState<Metadata[] | undefined>();
  const [blogs, setBlogs] = useState<Result[]>([]);
  const Web3Api = useMoralisWeb3Api();
  const { Moralis } = useMoralis();

  // const fetchAllNfts = async () => {
  //   const options = {
  //     chain: "mumbai",
  //     address: "0x19089c2F05AE286F21467d131e0679902eeffC13",
  //   };
  //   // @ts-ignore
  //   const polygonNFTs = await Web3Api.token.getNFTOwners(options);
  //   console.log("polygonNft", polygonNFTs);
  //   setMetadata(polygonNFTs.result);
  // };

  const fetchAllBlogs = async () => {
    const nftsBlogs = Moralis.Object.extend("Blogs");
    const query = new Moralis.Query(nftsBlogs);
    const result = await query.find();
    console.log(result);
    // @ts-ignore
    setBlogs(result);
  };

  useEffect(() => {
    if (blogs.length === 0) {
      fetchAllBlogs();
    }
  }, [blogs]);

  return (
    <>
      <div className="blogsNFT">
        {blogs.length !== 0
          ? blogs?.map((blog, i) => {
              const lastSegment =
                blog && blog?.attributes.blogContent.split("/").pop();
              return (
                <Link
                  to={`/blog/${lastSegment}`}
                  key={i}
                  style={{ textDecoration: "none" }}
                >
                  <CardNFT
                    image={blog.attributes.imageipfs}
                    description={blog.attributes.blogTitle}
                  />
                </Link>
              );
            })
          : "No Blog Yet"}
      </div>
      {/* <div className="blogsNFT">
        {metadata?.length !== 0
          ? metadata?.map((data, i) => {
              // @ts-ignore
              const metadataObj = JSON.parse(data.metadata);
              const lastSegment =
                metadataObj && metadataObj.externalUrl.split("/").pop();
              const tokenId = data.token_id;
              return (
                <Link
                  to={`/blog/${lastSegment}/${tokenId}`}
                  key={i}
                  style={{ textDecoration: "none" }}
                >
                  <CardNFT
                    image={metadataObj && metadataObj.image}
                    description={metadataObj && metadataObj.description}
                  />
                </Link>
              );
            })
          : "No Blog Yet"}
      </div> */}
    </>
  );
};

export default Read;
