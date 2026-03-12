import { Route, Routes } from "react-router";
import "./App.css";

import Sobre from "./pages/Sobre";
import Home from "./pages/Home";
import Contato from "./pages/Contato";
import NaoEncontrado from "./pages/NaoEncontrado";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="app-layout">
      <Header />
      <main className="page-content">
        <Routes>
          {/* Identifica todas as rotas do sistema */}
          <Route path="/" element={<Home />} />
          {/* Uma rota do sistema */}
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/nao-encontrado" element={<NaoEncontrado />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
      </main>
      <Footer link={} />
    </div>
  );
}

export default App;
