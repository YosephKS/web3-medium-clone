import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/home";
import Write from "./pages/Write";
import Read from "./pages/Read";
import NewStory from "./pages/NewStory";
import MyBlogs from "./pages/MyBlogs";
import Blog from "./components/Blog";
// import NavBar from "./components/NavBar";
import Nav from "./components/Nav";

const App: FC = () => {
  return (
    <div>
      {/* <NavBar /> */}
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
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
