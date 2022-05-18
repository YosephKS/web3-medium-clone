import { FC } from "react";
import { Button } from "web3uikit";
import "./home.css";
const Home: FC = () => {
  return (
    <div className="home">
      <div className="homeContent">
        <div className="title">Stay Curious</div>
        <div className="text">
          Discover stories, thinking, and expertise from writers on any topic.
        </div>
        <div>
          <Button text="Start Reading" onClick={() => console.log("clicked")} />
        </div>
      </div>
    </div>
  );
};

export default Home;
