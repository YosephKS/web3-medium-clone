import { FC } from "react";
import "./NewStory.css";
import logo from "../images/medium.png";
import { ConnectButton } from "web3uikit";
import { Link } from "react-router-dom";
const NewStory: FC = () => {
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
        <form className="writeForm">
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
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="Tell your story..."
              autoFocus={true}
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
