import { FC, useState, useEffect } from "react";
import "./NewStory.css";
import logo from "../images/medium.png";
import ModalComp from "../components/modal";
import Loading from "../components/Loading";
import { ConnectButton, useNotification } from "web3uikit";
import { Link, NavLink } from "react-router-dom";
import { useMoralisFile } from "react-moralis";
const NewStory: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [ipfsUrl, setIpfsUrl] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { saveFile } = useMoralisFile();
  const dispatch = useNotification();

  const handleError = (msg: string) => {
    dispatch({
      type: "error",
      message: `${msg}`,
      title: "Upload Failed",
      position: "topL",
    });
  };

  //upload blog content and nft metadata to ipfs
  const uploadFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      const metadataNft = {
        image:
          "https://ipfs.moralis.io:2053/ipfs/QmWEsG4ayh75BMk2H1CowAdALPjsi3fD7CSZ6qxNM1yNnz/image/moralis.png",
        description: title,
        // @ts-ignore
        externalUrl: result.ipfs(),
      };
      try {
        const resultNft = await saveFile(
          "metadata.json",
          { base64: btoa(JSON.stringify(metadataNft)) },
          {
            type: "base64",
            saveIPFS: true,
          }
        );
        // @ts-ignore
        setIpfsUrl(resultNft.ipfs());
        setLoading(false);
        setVisible(true);
      } catch (error) {
        setLoading(false);
        console.log(error);
        // @ts-ignore
        handleError(error.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      // @ts-ignore
      handleError(error.message);
    }
    setText("");
    setTitle("");
  };

  useEffect(() => {}, [ipfsUrl, visible]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
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
          {visible && (
            <ModalComp
              isVisible={visible}
              ipfsUrl={ipfsUrl}
              setVisible={() => {
                console.log("worked");
                setVisible(false);
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default NewStory;
