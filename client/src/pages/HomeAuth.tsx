import { FC } from "react";
import "./HomeAuth.css";
import BlogCard from "../components/BlogCard";
const HomeAuth: FC = () => {
  return (
    <div className="homeAuth_container">
      <div className="homeAuth_header">recommended</div>
      <div className="homeAuth_blogs">
        <BlogCard />
      </div>
    </div>
  );
};

export default HomeAuth;
