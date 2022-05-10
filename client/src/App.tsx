import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Article from "./pages/article";

const App: FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="article/:articleId" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
