import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Blog.css";
import { Url } from "../config/constants";

const Blog: FC = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { url } = useParams();
  const fetchBlogContent = async () => {
    const res = await axios.get(`${Url}/${url}`);
    console.log(res.data);
    setTitle(res.data.title);
    const text = res.data.text.toString();
    setText(text);
  };
  useEffect(() => {
    if (!title || !text) {
      fetchBlogContent();
    }
  }, [text, title]);
  return (
    <div className="singleBlog">
      <div className="singleBlogWrapper">
        <div className="singleBlogImg"></div>
        <div className="singleBlogContent">
          <h1 className="singleBlogTitle">{title}</h1>
          <p className="singleBlogText">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
