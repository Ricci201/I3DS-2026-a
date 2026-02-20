import { useEffect, useState } from "react";
import "./App.css";

import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";

import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";

const App = () => {
  // useState = é o estado da matéria
  const [movies, setMovies] = useState([]);

  //Utilizando uma CHAVE de API do arquivo .env
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  //Criando a conexão com a API e trazendo informações
  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    //Alimentando a variavel movies
    setMovies(data.Search);
  };

  /* useEffect(() => {
    searchMovies("Spider Man");
  }, []); => Termo de pesquisa */

  return (
    <div id="App">
      <img
        id="Logo"
        src={logo}
        alt="Logotipo do serviço de streaming Devflix, com letras vermelhas e fundo preto, promovendo conteúdo de séries, filmes e entretenimento online."
      />

      <div className="search">
        <input type="text" placeholder="Pesquise por filmes" />
        <img src={lupa} alt="Botão de ação para pesquisa!" />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard key={index} {...movie} />
          ))}
        </div>
      ) : (
        <h2 className="empty">😒 Filme não encontrado 😒</h2>
      )}

      <Rodape link={"https://github.com/Ricci201"}>Lucas Ricci</Rodape>
    </div>
  );
};

export default App;
