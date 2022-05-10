import { FC } from "react";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import logo from "../images/medium.png";
import "./Write.css";
import { ConnectButton, Icon, Button, useNotification } from "web3uikit";
const Write: FC = () => {
  const { Moralis, account } = useMoralis();
  return (
    <>
      <div className="containerCreator" style={{ backgroundColor: "#FF4C4C" }}>
        <div className="containerGradinet"></div>
      </div>
      <div className="containerCreator2" style={{ backgroundColor: "black" }}>
        <div className="containerGradinet"></div>
      </div>
      <div className="creatorNav">
        <div>
          <Link to="/">
            <img className="logo" src={logo} alt="logo"></img>
          </Link>
        </div>
        <div className="creatorSignIn">
          <div>
            <Button onClick={() => console.log("clicked")} text="Sign in" />
          </div>
          <div>
            <ConnectButton />
          </div>
        </div>
      </div>
      <div className="writeContent">
        <div className="title">Publish, grow, and earn, all in one place</div>
        <div className="text">
          If you have a story to tell, knowledge to share, or a perspective to
          offer — welcome home. Sign up for free so your writing can thrive in a
          network supported by millions of readers — not ads..
        </div>
        <Button text="Start Writing" onClick={() => console.log("clicked")} />
      </div>
    </>
  );
};

export default Write;
