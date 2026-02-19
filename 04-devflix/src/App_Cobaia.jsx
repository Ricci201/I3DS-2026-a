import { useState } from "react";
import "./App.css";
import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";
import Rodape from "./components/Rodape/Rodape";

const App = () => {
  const [filmes] = useState([
    {
      id: 1,
      titulo: "Série JavaScript",
      sinopse: "Aprenda JavaScript do zero",
      genero: "Educação",
      duracao: 120,
      imagem: "",
    },
    {
      id: 2,
      titulo: "React Avançado",
      sinopse: "Domine React em produção",
      genero: "Educação",
      duracao: 180,
      imagem: "",
    },
    {
      id: 3,
      titulo: "Web Design Moderno",
      sinopse: "Crie interfaces incríveis",
      genero: "Design",
      duracao: 90,
      imagem: "",
    },
  ]);

  return (
    <div id="App">
      <img
        id="Logo"
        src={logo}
        alt="Logotipo do serviço de streaming Devflix, com letras vermelhas e fundo preto, promovendo conteúdo de séries, filmes e entretenimento online."
      />

      <div className="search">
        <input type="text" placeholder="Pesquisa por filmes e séries..." />
        <img role="button" src={lupa} alt="Botão de ação para pesquisa!" />
      </div>

      <>
        {filmes.map((filmes, index) => (
          <div key={index}>
            <h2>{filmes.titulo}</h2>
            <h3>{filmes.duracao}</h3>
            <h4>{filmes.sinopse}</h4>
            <br />
            <br />
          </div>
        ))}
      </>

      <Rodape link={"https://github.com/Ricci201"}>Lucas Ricci</Rodape>
    </div>
  );
};

export default App;
