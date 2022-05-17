import { FC, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Write from "./pages/Write";
import NewStory from "./pages/NewStory";
import MyBlogs from "./pages/MyBlogs";
import Blog from "./components/Blog";
import Topbar from "./components/Topbar";

const App: FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/newStory" element={<NewStory />} />
          <Route path="/myBlogs" element={<MyBlogs />} />
          <Route path="/blog/:url/:tokenId" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
