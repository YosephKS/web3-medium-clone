import { FC } from "react";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { ConnectButton } from "web3uikit";
import "./Topbar.css";
const Topbar: FC = () => {
  const { account } = useMoralis();
  return (
    <div className="top">
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {account && (
            <Link to="/myblogs">
              <li className="topListItem">MYBLOGS</li>
            </Link>
          )}
        </ul>
        <div>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
