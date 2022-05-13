import { FC, useState } from "react";
import "./NewStory.css";
import logo from "../images/medium.png";
import { ConnectButton } from "web3uikit";
import { Link } from "react-router-dom";
import { useMoralisFile } from "react-moralis";
const NewStory: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [ipfsUrl, setIpfsUrl] = useState();
  const { saveFile } = useMoralisFile();

  const uploadFile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-ignore
    const textArray = text.split();
    const metadata = {
      title,
      text: textArray,
    };

    saveFile(
      "myblog.json",
      { base64: btoa(JSON.stringify(metadata)) },
      {
        type: "base64",
        saveIPFS: true,

        onSuccess: (result) => {
          // @ts-ignore
          console.log("ipfs", result.ipfs());
          // @ts-ignore
          setIpfsUrl(result.ipfs());
        },
        onError: (error) => console.log(error),
      }
    );
  };

  return (
    <>
      <div className="writeNav">
        <div>
          <Link to="/">
            <img className="writeLogo" src={logo} alt="logo" />
          </Link>
        </div>
        <div>
          <ConnectButton />
        </div>
      </div>
      <div className="write">
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
    </>
  );
};

export default NewStory;
