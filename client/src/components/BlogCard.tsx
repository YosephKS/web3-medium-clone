import { FC } from "react";
import "./BlogCard.css";
const BlogCard: FC = () => {
  return (
    <div className="blog">
      <div className="blog_leftSide">
        <div className="blogger">
          <img className="blogger_photo" src="" alt="" />
          <span className="blogger_name">Nicky</span>
          <span className="blogger_date">Mar 21</span>
        </div>
        <div className="blog_title">
          <h3>Will LUNA Price Recover Again?</h3>
        </div>
        <div className="blog_content">
          <p>
            In the past couple of days, the crypto space witnessed a nightmare
            of a token being in the top 10
          </p>
        </div>
      </div>
      <div className="blog_rightSide">
        <img
          className="blog_image"
          src="https://ipfs.moralis.io:2053/ipfs/QmWEsG4ayh75BMk2H1CowAdALPjsi3fD7CSZ6qxNM1yNnz/image/moralis.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default BlogCard;
