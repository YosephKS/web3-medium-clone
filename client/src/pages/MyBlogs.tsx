import { FC, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { Button } from "web3uikit";
import CardNFT from "../components/Card";
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
const MyBlogs: FC = () => {
  // const [metadata, setMetadata] = useState<Metadata[] | undefined>();
  const [blogs, setBlogs] = useState<Result[]>([]);
  const navigate = useNavigate();
  const Web3Api = useMoralisWeb3Api();
  // const { account } = useMoralis();
  const { isInitialized, isAuthenticated, account, Moralis } = useMoralis();

  const clickHandler = () => {
    navigate("/newStory");
  };

  // fetching fro web3api
  // const fetchNFTs = async () => {
  //   const options = {
  //     chain: "mumbai",
  //     address: account,
  //     token_address: "0x19089c2F05AE286F21467d131e0679902eeffC13",
  //   };
  //   // @ts-ignore
  //   const polygonNFTs = await Web3Api.account.getNFTsForContract(options);
  //   console.log("polygonNft", polygonNFTs);

  //   const metadata = polygonNFTs.result;
  //   setMetadata(metadata);
  // };

  // fetching from Moralis DB
  const fetchNFTs = async () => {
    const nftsBlogs = Moralis.Object.extend("Blogs");
    const query = new Moralis.Query(nftsBlogs);
    query.equalTo("bloggerAcc", account);
    const result = await query.find();
    console.log(result);
    // @ts-ignore
    setBlogs(result);
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      fetchNFTs();
    } else {
      navigate("/");
    }
  }, [isAuthenticated, isInitialized, navigate, account]);
  return (
    <>
      <div className="blogsNFT">
        {blogs.length !== 0 ? (
          blogs?.map((blog, i) => {
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
      {/* <div className="blogsNFT">
        {metadata?.length !== 0 ? (
          metadata?.map((data, i) => {
            // @ts-ignore
            const metadataObj = JSON.parse(data.metadata);
            const lastSegment =
              metadataObj && metadataObj.externalUrl.split("/").pop();
      
            return (
              <Link
                to={`/blog/${lastSegment}`}
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
      </div> */}
    </>
  );
};

export default MyBlogs;
