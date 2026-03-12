import { Route, Routes } from "react-router";
import "./App.css";

import Sobre from "./pages/Sobre";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        {/* Identifica todas as rotas do sistema */}
        <Route path="/" element={<Home />} />
        {/* Uma rota do sistema */}
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </>
  );
}

export default App;
