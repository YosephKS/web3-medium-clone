import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "web3uikit";
import "./home.css";

const Home: FC = () => {
  // const navigate = useNavigate();
  const clickHandler = () => {};
  return (
    <div className="home">
      <div className="homeContent">
        <div className="title">Stay Curious</div>
        <div className="text">
          Discover stories, thinking, and expertise from writers on any topic.
        </div>
        <div>
          <Button text="Start Reading" onClick={clickHandler} />
        </div>
      </div>
    </div>
  );
};

export default Home;
