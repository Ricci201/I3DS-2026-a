import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";
import Rodape from "./components/Rodape/Rodape";

const App = () => {
  const [movies, SetMovies] = useState([]);

  //Utilizando uma CHAVE de API do arquivo .env
  const apiKey = import.meta.env.VITE_OMB_API_KEY;
  const apiUrl = `https://omdbapi.com/?apikey=${apikey}`;

  //Criando a conexão com a API e trazendo informações
  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json;

    //ALimentando a variavel movies
    SetMovies(dat.Search);
  };

  useEffect(() => {
    searchMovies
  })

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

      <Rodape link={"https://github.com/Ricci201"}>Lucas Ricci</Rodape>
    </div>
  );
};

export default App;
