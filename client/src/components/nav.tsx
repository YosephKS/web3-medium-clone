import { FC } from "react";
import "./nav.css";
import logo from "../images/medium.png";
import Svg from "./svg";
import { ConnectButton } from "web3uikit";
const Nav: FC = () => {
  return (
    <div>
      <div className="topBanner">
        <div>
          <img className="logo" src={logo} alt="logo"></img>
        </div>
        <div className="tabs">
          <div>Write</div>
          <div>Membership</div>
          <div>Our Story</div>
        </div>
        <div className="lrContainers">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Nav;
