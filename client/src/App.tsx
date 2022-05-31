import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useMoralis } from "react-moralis";
import Home from "./pages/home";
import Write from "./pages/Write";
import NewStory from "./pages/NewStory";
import MyBlogs from "./pages/MyBlogs";
import Blog from "./components/Blog";
import Nav from "./components/Nav";
import HomeAuth from "./pages/HomeAuth";
import "./App.css";
import Layout from "./Layout/Layout";

const App: FC = () => {
  const { isInitialized, isAuthenticated, isWeb3Enabled, enableWeb3 } =
    useMoralis();

  useEffect(() => {
    if (isInitialized && isAuthenticated && !isWeb3Enabled) {
      enableWeb3();
    }
  }, [isInitialized, isAuthenticated, isWeb3Enabled, enableWeb3]);
  return (
    <>
      {isAuthenticated ? (
        <div>
          <Layout>
            <Routes>
              <Route path="/" element={<HomeAuth />} />
              <Route path="/write" element={<Write />} />
              <Route path="/newStory" element={<NewStory />} />
              <Route path="/myBlogs" element={<MyBlogs />} />
              <Route path="/blog/:url" element={<Blog />} />
            </Routes>
          </Layout>
        </div>
      ) : (
        <div>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
