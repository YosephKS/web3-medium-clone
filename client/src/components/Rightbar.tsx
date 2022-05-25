import { FC } from "react";
import "./Rightbar.css";
import { Input } from "web3uikit";

const Rightbar: FC = () => {
  const trends = [
    {
      text: "Real Performance Paradox",
    },
    {
      text: "The Email Scam That Nearly Worked On Me",
    },
    {
      text: "The forgotten benefits of “low tech” user interfaces",
    },
    {
      text: "Become a Web3 Developer with just simple JS...",
    },
  ];

  return (
    <>
      <div className="rightbarContent">
        <Input label="Search" name="Search" prefixIcon="search"></Input>

        <div className="trends">
          What we are reading Today
          {trends.map((e) => {
            return (
              <>
                <div className="trend">
                  <div className="trendText">{e.text}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Rightbar;
