import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Write from "./pages/Write";
import NewStory from "./pages/NewStory";
import MyBlogs from "./pages/MyBlogs";
import Blog from "./components/Blog";
import Sidebar from "./components/Sidebart";
import HomeAuth from "./pages/HomeAuth";
import Rightbar from "./components/Rightbar";
import "./App.css";

const App: FC = () => {
  return (
    <>
      <div className="App">
        <div className="sideBar">
          <Sidebar />
        </div>
        <div className="mainWindow">
          <Routes>
            <Route path="/" element={<HomeAuth />} />
            <Route path="/write" element={<Write />} />
            <Route path="/newStory" element={<NewStory />} />
            <Route path="/myBlogs" element={<MyBlogs />} />
            <Route path="/blog/:url" element={<Blog />} />
          </Routes>
        </div>
        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </>
  );
};

export default App;
