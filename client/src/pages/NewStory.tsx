import { FC, useState, FormEvent } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Button from "@mui/material/Button";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import "./NewStory.css";

const NewStory: FC = () => {
  const [blog, setBlog] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState<boolean>(false);

  //upload blog content and nft metadata to ipfs and mint
  const uploadFile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8000/uploadWeb3Storage", {
        blog
      });
      console.log(data?.cid);
    } catch (error) {
      setLoading(false);
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
              <ControlPointIcon />
              <input id="fileInput" type="file" style={{ display: "none" }} />
              <input
                className="writeInput"
                placeholder="Title"
                type="text"
                autoFocus={true}
                value={blog?.name}
                style={{ marginLeft: "1rem" }}
                onChange={(e) => setBlog({ ...blog, name: e.target.value })}
              />
            </div>
            <div className="writeFormGroup">
              <textarea
                className="writeInput writeText"
                placeholder="Tell your story..."
                autoFocus={true}
                value={blog?.description}
                onChange={(e) => setBlog({ ...blog, description: e.target.value })}
                style={{ marginTop: "1rem" }}
              />
            </div>
            <Button color="secondary" variant="contained" type="submit">
              Publish
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default NewStory;
