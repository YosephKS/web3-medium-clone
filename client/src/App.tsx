import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useMoralis } from "react-moralis";
import Home from "./pages/home";
import Write from "./pages/Write";
import Read from "./pages/Read";
import NewStory from "./pages/NewStory";
import MyBlogs from "./pages/MyBlogs";
import Blog from "./components/Blog";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import HomeAuth from "./pages/HomeAuth";
//import "/App.css";

const App: FC = () => {
  const { isAuthenticated } = useMoralis();
  useEffect(() => {}, [isAuthenticated]);
  return (
    <div style={{ display: isAuthenticated ? "flex" : "block" }}>
      <div>{isAuthenticated ? <Sidebar /> : <Nav />}</div>
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomeAuth /> : <Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/read" element={<Read />} />
        <Route path="/newStory" element={<NewStory />} />
        <Route path="/myBlogs" element={<MyBlogs />} />
        <Route path="/blog/:url" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
