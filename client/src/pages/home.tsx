import { FC } from "react";
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
    </>
  );
};

export default Home;
