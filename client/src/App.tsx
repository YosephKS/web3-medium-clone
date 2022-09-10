import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Write from "./pages/Write";
import NewStory from "./pages/NewStory";
import MyBlogs from "./pages/MyBlogs";
import Blog from "./components/Blog";
import HomeAuth from "./pages/HomeAuth";
import { ConnectButton } from '@rainbow-me/rainbowkit'
import "./App.css";

const App: FC = () => {
  return (
    <>
      <div className="App">
        <ConnectButton />
        <div className="mainWindow">
          <Routes>
            <Route path="/" element={<HomeAuth />} />
            <Route path="/write" element={<Write />} />
            <Route path="/newStory" element={<NewStory />} />
            <Route path="/myBlogs" element={<MyBlogs />} />
            <Route path="/blog/:url" element={<Blog />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
