import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
  const logOut = async () => {
  };

  return (
    <>
      <div className="siderContent">
        <div className="logo">Medium</div>

        <div className="menu">
          <Link to="/" className="link">
            <div className="menuItems">
              <HomeIcon />
            </div>
          </Link>

          <Link to="/myBlogs" className="link">
            <div className="menuItems">
              <BookIcon />
            </div>
          </Link>

          <Link to="/newStory" className="link">
            <div className="menuItems">
              <RateReviewIcon />
            </div>
          </Link>
        </div>
        <div className="logout" onClick={logOut}>
          logout
        </div>
      </div>
    </>
  );
};

export default Sidebar;
