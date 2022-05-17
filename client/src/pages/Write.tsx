import { FC } from "react";
import { useMoralis } from "react-moralis";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/medium.png";
import "./Write.css";
import { ConnectButton, Button, useNotification } from "web3uikit";
const Write: FC = () => {
  const { account } = useMoralis();
  const dispatch = useNotification();
  const navigate = useNavigate();

  const handleNoAccount = () => {
    dispatch({
      type: "error",
      message: `You need to connect your wallet to create a story`,
      title: "Not Connected",
      position: "topL",
    });
  };
  const clickHandler = () => {
    if (account) {
      navigate("/newStory");
    } else {
      handleNoAccount();
    }
  };
  return (
    <>
      <div className="containerCreator" style={{ backgroundColor: "#FF4C4C" }}>
        <div className="containerGradinet"></div>
      </div>
      <div className="writeContent">
        <div className="title">Publish, grow, and earn, all in one place</div>
        <div className="text">
          If you have a story to tell, knowledge to share, or a perspective to
          offer — welcome home. Sign up for free so your writing can thrive in a
          network supported by millions of readers — not ads..
        </div>
        <Button text="Start Writing" onClick={clickHandler} />
      </div>
    </>
  );
};

export default Write;
