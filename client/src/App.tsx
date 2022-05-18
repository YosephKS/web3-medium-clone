import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/home";
import Write from "./pages/Write";
import NewStory from "./pages/NewStory";
import MyBlogs from "./pages/MyBlogs";
import Blog from "./components/Blog";
import NavBar from "./components/NavBar";

const App: FC = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/newStory" element={<NewStory />} />
        <Route path="/myBlogs" element={<MyBlogs />} />
        <Route path="/blog/:url/:tokenId" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
