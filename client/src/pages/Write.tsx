import { FC, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import "./Write.css";
import { Button, useNotification } from "web3uikit";
const Write: FC = () => {
  const { isInitialized, isAuthenticated, account } = useMoralis();
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
  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      navigate("/newStory");
    }
  }, [isAuthenticated, isInitialized, navigate]);
  return (
    <div className="write">
      <div className="writeContent">
        <div className="writeTitle">
          Publish, grow, and earn, all in one place
        </div>
        <div className="text">
          <p>
            If you have a story to tell, knowledge to share, or a perspective to
            offer — welcome home. Sign up for free so your writing can thrive in
            a network supported by millions of readers — not ads..
          </p>
        </div>
        <div className="writeButton">
          <Button text="Start Writing" onClick={clickHandler} />
        </div>
      </div>
    </div>
  );
};

export default Write;
