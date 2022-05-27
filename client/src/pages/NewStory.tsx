import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useNotification } from "web3uikit";
import "./NewStory.css";

import {
  useMoralisFile,
  useMoralis,
  useWeb3ExecuteFunction,
} from "react-moralis";
const NewStory: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { saveFile } = useMoralisFile();
  const { Moralis, isInitialized, isAuthenticated, account, authenticate } =
    useMoralis();
  const dispatch = useNotification();
  const contractProcessor = useWeb3ExecuteFunction();

  const handleSuccess = () => {
    dispatch({
      type: "success",
      message: `Nice! You just mint a Nft!!`,
      title: "Miniting Succesful",
      position: "topL",
    });
  };
  const handleError = (msg: string) => {
    dispatch({
      type: "error",
      message: `${msg}`,
      title: "Upload Failed",
      position: "topL",
    });
  };
  const uploadNftMetada = async (url: string) => {
    const metadataNft = {
      image:
        "https://ipfs.moralis.io:2053/ipfs/QmWEsG4ayh75BMk2H1CowAdALPjsi3fD7CSZ6qxNM1yNnz/image/moralis.png",
      description: title,
      externalUrl: url,
    };
    const resultNft = await saveFile(
      "metadata.json",
      { base64: btoa(JSON.stringify(metadataNft)) },
      {
        type: "base64",
        saveIPFS: true,
      }
    );
    return resultNft;
  };

  const mint = async (account: string, uri: string) => {
    setLoading(false);
    let options = {
      contractAddress: "0x19089c2F05AE286F21467d131e0679902eeffC13",
      functionName: "safeMint",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "string",
              name: "uri",
              type: "string",
            },
          ],
          name: "safeMint",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      params: {
        to: account,
        uri: uri,
      },
      msgValue: Moralis.Units.ETH(1),
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        handleSuccess();
        setText("");
        setTitle("");
      },
      onError: (error) => {
        // @ts-ignore
        handleError(error.message);
      },
    });
  };

  //upload blog content and nft metadata to ipfs and mint
  const uploadFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAuthenticated) {
      Moralis.authenticate();
    }
    // @ts-ignore
    const textArray = text.split();
    const metadata = {
      title,
      text: textArray,
    };
    try {
      setLoading(true);
      const result = await saveFile(
        "myblog.json",
        { base64: btoa(JSON.stringify(metadata)) },
        {
          type: "base64",
          saveIPFS: true,
        }
      );
      try {
        // @ts-ignore
        const resultNft = await uploadNftMetada(result.ipfs());
        // @ts-ignore
        await mint(account, resultNft.ipfs());
        setLoading(false);
        //setVisible(true);
      } catch (error) {
        setLoading(false);
        // @ts-ignore
        handleError(error.message);
      }
    } catch (error) {
      setLoading(false);
      // @ts-ignore
      handleError(error.message);
    }
  };

  return (
    <>
      {loading ? (
        <Loading open={loading} />
      ) : (
        <div>
          <form onSubmit={uploadFile} className="writeForm">
            <div className="writeFormGroup">
              <label htmlFor="fileInput">
                <i className="writeIcon fas fa-plus"></i>
              </label>
              <input id="fileInput" type="file" style={{ display: "none" }} />
              <input
                className="writeInput"
                placeholder="Title"
                type="text"
                autoFocus={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="writeFormGroup">
              <textarea
                className="writeInput writeText"
                placeholder="Tell your story..."
                autoFocus={true}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button className="writeSubmit" type="submit">
              Publish
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default NewStory;
