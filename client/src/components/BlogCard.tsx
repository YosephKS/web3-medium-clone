import { FC } from "react";
import { useNavigate } from "react-router-dom";

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
  const length = 100;
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
          <span className="blogger_name">{account}</span>
          <span className="blogger_date">Mar 21</span>
        </div>
        <div className="blog_title">
          <h3>{title}</h3>
        </div>
        <div className="blog_content">
          <p>{trimmedString}</p>
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
