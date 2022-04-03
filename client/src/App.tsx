import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Article from "./pages/article";

const App: FC = () => {
  return (
    <div>
      <p>AppBar</p>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="article/:articleId" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
