import { FC } from "react";
import { useParams } from "react-router-dom";

const Article: FC = () => {
  const { articleId } = useParams();
  return <h1>Article {articleId}</h1>;
};

export default Article;
