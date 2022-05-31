import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Avatar } from "@mui/material";
import logo from "../images/Moralis.png";

import "./BlogCard.css";
interface ChildProps {
  text: string;
  title: string;
  ownerOf: string;
  externalUrl: string;
  image: string;
}
const BlogCard: FC<ChildProps> = ({
  text,
  title,
  ownerOf,
  externalUrl,
  image,
}) => {
  const length = 200;
  const trimmedString = text.length > 100 ? text.substring(0, length) : text;
  const account = `${ownerOf.slice(0, 4)}...${ownerOf.slice(38)}`;
  const navigate = useNavigate();
  const clickHandler = () => {
    const lastSegment = externalUrl.split("/").pop();
    navigate(`/blog/${lastSegment}`);
  };
  return (
    <div className="blog" onClick={clickHandler}>
      <div className="blog_leftSide">
        <div className="blogger">
          <Avatar sx={{ width: 22, height: 22, paddingRight: 1 }} src={logo} />
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ fontSize: 15 }}
          >
            {account}
            <span className="blogger_date" style={{ padding: 10 }}>
              March 21
            </span>
          </Typography>
        </div>
        <div className="blog_title">
          <Typography
            component="div"
            variant="h5"
            sx={{ fontWeight: "bloder", paddingBottom: 1, paddingTop: 2 }}
          >
            {title}
          </Typography>
        </div>
        <div className="blog_content">
          <Typography variant="body1" color="text.secondary" component="div">
            {trimmedString}...
          </Typography>
        </div>
        <div className="blog_footer">
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
            sx={{ paddingBottom: 3, paddingTop: 3 }}
          >
            3min read
            <span className="blogger_date" style={{ padding: 10 }}>
              Selected for you
            </span>
          </Typography>
        </div>
      </div>
      <div className="blog_rightSide">
        <div>
          <img className="blog_image" src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
