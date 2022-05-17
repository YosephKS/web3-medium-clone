import { FC, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { NFT } from "web3uikit";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
  const [metadata, setMetadata] = useState<Metadata[] | undefined>();
  const navigate = useNavigate();
  const Web3Api = useMoralisWeb3Api();
  // const { account } = useMoralis();
  const { isInitialized, isAuthenticated, account } = useMoralis();

  const fetchNFTs = async () => {
    // get polygon NFTs for address
    const options = {
      chain: "mumbai",
      address: account,
    };
    // @ts-ignore
    const polygonNFTs = await Web3Api.account.getNFTs(options);
    console.log("polygonNft", polygonNFTs);

    const metadata = polygonNFTs.result;
    setMetadata(metadata);
  };
  console.log("account in myblogs", account);
  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      if (!metadata) {
        fetchNFTs();
      }
    } else {
      navigate("/");
    }
  }, [isAuthenticated, isInitialized, metadata, navigate]);
  console.log(metadata?.length);
  return (
    <>
      <div className="blogsNFT">
        {metadata?.length !== 0
          ? metadata?.map((data, i) => {
              // @ts-ignore
              const metadataObj = JSON.parse(data.metadata);
              const lastSegment =
                metadataObj && metadataObj.externalUrl.split("/").pop();
              const tokenId = data.token_id;
              return (
                <Link to={`/blog/${lastSegment}/${tokenId}`} key={i}>
                  <Card
                    sx={{ width: 300, height: 250 }}
                    style={{ margin: "10px" }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={metadataObj && metadataObj.image}
                      alt="blog nft"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {metadataObj && metadataObj.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          : "No Blog Yet"}
      </div>
    </>
  );
};

export default MyBlogs;
