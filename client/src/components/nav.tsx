import { FC } from "react";
import "./nav.css";
import logo from "../images/medium.png";
import { Link } from "react-router-dom";
import { ConnectButton } from "web3uikit";
const Nav: FC = () => {
  return (
    <div>
      <div className="topBanner">
        <div>
          <img className="logo" src={logo} alt="logo"></img>
        </div>
        <div className="tabs">
          <div>
            <Link to="/creator">Write</Link>
          </div>
          <div>
            <Link to="/membership">Membership</Link>
          </div>
          <div>
            <Link to="/ourStory">Our Story</Link>
          </div>
        </div>
        <div className="lrContainers">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Nav;
