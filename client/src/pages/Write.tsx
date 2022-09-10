import { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./Write.css";
const Write: FC = () => {
  const navigate = useNavigate();

  const handleNoAccount = () => {
    // dispatch({
    //   type: "error",
    //   message: `You need to connect your wallet to create a story`,
    //   title: "Not Connected",
    //   position: "topL",
    // });
  };
  const clickHandler = () => {
  };
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
          {/* <Button text="Start Writing" onClick={clickHandler} /> */}
        </div>
      </div>
    </div>
  );
};

export default Write;
