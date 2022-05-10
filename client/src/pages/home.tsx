import { FC } from "react";
import { ConnectButton, Icon, Button, useNotification } from "web3uikit";
import "./home.css";
import Nav from "../components/nav";
const Home: FC = () => {
  return (
    <>
      <div className="container2" style={{ backgroundColor: "black" }}>
        <div className="containerGradinet"></div>
      </div>
      <div className="container" style={{ backgroundColor: "yellow" }}>
        <div className="containerGradinet"></div>
      </div>
      <Nav />
      <div className="homeContent">
        <div className="title">Stay Curious</div>
        <div className="text">
          Discover stories, thinking, and expertise from writers on any topic.
        </div>
        <Button text="Start Reading" onClick={() => console.log("clicked")} />
      </div>
    </>
  );
};

export default Home;
