import { FC } from "react";
import { useState, useEffect } from "react";
import { useMoralisWeb3Api } from "react-moralis";
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

const Read: FC = () => {
  const [metadata, setMetadata] = useState<Metadata[] | undefined>();
  const Web3Api = useMoralisWeb3Api();

  //fetching from web3Api
  const fetchAllNfts = async () => {
    const options = {
      chain: "mumbai",
      address: "0x19089c2F05AE286F21467d131e0679902eeffC13",
    };
    // @ts-ignore
    const polygonNFTs = await Web3Api.token.getNFTOwners(options);
    setMetadata(polygonNFTs.result);
  };

  useEffect(() => {
    if (!metadata) {
      fetchAllNfts();
    }
  }, [metadata]);

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
          : "No Blog Yet"}
      </div>
    </>
  );
};

export default Read;
