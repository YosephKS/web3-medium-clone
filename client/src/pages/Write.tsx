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
    </>
  );
};

export default Write;
