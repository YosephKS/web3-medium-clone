import { FC, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import Card from "react-bootstrap/Card";
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
    const options = {
      chain: "mumbai",
      address: account,
      token_address: "0x19089c2F05AE286F21467d131e0679902eeffC13",
    };
    // @ts-ignore
    const polygonNFTs = await Web3Api.account.getNFTsForContract(options);
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
                <Link
                  to={`/blog/${lastSegment}/${tokenId}`}
                  key={i}
                  style={{ textDecoration: "none" }}
                >
                  <Card style={{ width: "18rem", margin: "30px" }}>
                    <Card.Img
                      variant="top"
                      src={metadataObj && metadataObj.image}
                    />
                    <Card.Body>
                      <Card.Title>
                        {metadataObj && metadataObj.description}
                      </Card.Title>
                    </Card.Body>
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
