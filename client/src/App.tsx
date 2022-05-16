import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Article from "./pages/article";
import Write from "./pages/Write";
import NewStory from "./pages/NewStory";
import MyBlogs from "./pages/MyBlogs";

const App: FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="article/:articleId" element={<Article />} />
          <Route path="/creator" element={<Write />} />
          <Route path="/newStory" element={<NewStory />} />
          <Route path="/myBlogs" element={<MyBlogs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
