import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

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
  const { account } = useMoralis();

  const fetchNFTs = async () => {
    // get polygon NFTs for address
    const options = {
      chain: "mumbai",
    };
    // @ts-ignore
    const polygonNFTs = await Web3Api.account.getNFTs(options);
    console.log("polygonNft", polygonNFTs);

    const metadata = polygonNFTs.result;
    setMetadata(metadata);
  };
  useEffect(() => {
    if (!account) {
      navigate("/creator");
    } else {
      fetchNFTs();
    }
  }, [account]);
  return (
    <>
      {metadata &&
        metadata.map((data, i) => {
          // @ts-ignore
          const { description, image, externalUrl } = JSON.parse(data.metadata);
          // make the deatilpage daynamic param and then get the content from ipfs.
          return (
            <Card sx={{ maxWidth: 345 }} onClick={() => console.log("clicked")}>
              <CardHeader title={description} subheader="May 14, 2022" />
              <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Paella dish"
              />
            </Card>
          );
        })}
    </>
  );
};

export default MyBlogs;
