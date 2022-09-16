import { FC, useState, FormEvent, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Button from "@mui/material/Button";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi';
import NFTABI from "../contracts/NFT.sol/NFT.json";
import "./NewStory.css";

const NewStory: FC = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [cid, setCid] = useState<string>("");
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    addressOrName: '0x3007f9e235363eEa58F0ed684a261AAC8523A420',
    contractInterface: NFTABI?.abi,
    functionName: 'safeMint',
    args: [address, `ipfs://${cid}/metadata.json`],
    overrides: {
      value: ethers.utils.parseEther('0.01'),
    },
  });
  const {
    isLoading: isContractWriteLoading,
    write
  } = useContractWrite({
    ...config,
    onSuccess: () => {
      setLoading(false);
      navigate("/");
    }
  });

  //upload blog content and nft metadata to ipfs and mint
  const uploadFile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND}/uploadWeb3Storage`, {
        blog
      });
      setCid(data?.cid);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cid !== "" && write) {
      console.log(cid);
      write?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid, write]);

  return (
    <>
      {loading && (
        <Loading open={loading || isContractWriteLoading} />
      )}
      <div>
        <form onSubmit={uploadFile} className="writeForm">
          <div className="writeFormGroup">
            <input
              className="writeInput"
              placeholder="Title"
              type="text"
              autoFocus={true}
              value={blog?.name}
              disabled={loading || isContractWriteLoading}
              onChange={(e) => setBlog({ ...blog, name: e.target.value })}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="Tell your story..."
              autoFocus={true}
              rows={5}
              value={blog?.description}
              onChange={(e) => setBlog({ ...blog, description: e.target.value })}
              disabled={loading || isContractWriteLoading}
              style={{ marginTop: "1rem" }}
            />
          </div>
          <Button color="secondary" variant="contained" type="submit">
            Publish
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewStory;
