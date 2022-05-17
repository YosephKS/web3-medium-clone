import { FC, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { NFT } from "web3uikit";
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
  console.log("account in myblogs", account);
  useEffect(() => {
    if (!account) {
      navigate("/");
    } else {
      fetchNFTs();
    }
  }, [account]);
  return (
    <div className="blogsNFT">
      {metadata &&
        metadata.map((data, i) => {
          // @ts-ignore
          const { description, externalUrl } = JSON.parse(data.metadata);
          const lastSegment = externalUrl.split("/").pop();
          const tokenId = data.token_id;
          return (
            <Link to={`/blog/${lastSegment}/${tokenId}`} key={i}>
              <NFT
                address="0x19089c2F05AE286F21467d131e0679902eeffC13"
                chain="mumbai"
                fetchMetadata
                tokenId={data.token_id}
                name={description}
              />
            </Link>
          );
        })}
    </div>
  );
};

export default MyBlogs;
