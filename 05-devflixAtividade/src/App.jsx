import { useEffect, useState } from "react";
import "./App.css";

import logo from "./assets/ssflix.png";
import lupa from "./assets/search.svg";

import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("pt-BR");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loadingTranslate, setLoadingTranslate] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  const languages = [
    {
      id: "pt-BR",
      name: "Português",
      flag: "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg",
    },
    {
      id: "en-US",
      name: "English",
      flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
    },
    {
      id: "es-ES",
      name: "Español",
      flag: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",
    },
    {
      id: "fr-FR",
      name: "Français",
      flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
    },
    {
      id: "de-DE",
      name: "Deutsch",
      flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
    },
    {
      id: "it-IT",
      name: "Italiano",
      flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg",
    },
    {
      id: "ja-JP",
      name: "日本語",
      flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg",
    },
    {
      id: "zh-CN",
      name: "中文",
      flag: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
    },
  ];

  const i18n = {
    "pt-BR": {
      placeholder: "Pesquise por filmes",
      empty: "Filme não encontrado",
      details: {
        year: "Ano",
        genre: "Gênero",
        plot: "Sinopse",
        rating: "Avaliação",
      },
    },
    "en-US": {
      placeholder: "Search for movies",
      empty: "Movie not found",
      details: { year: "Year", genre: "Genre", plot: "Plot", rating: "Rating" },
    },
  };

  const translateText = async (text, targetLang) => {
    if (!text || text === "N/A" || targetLang === "en-US") return text;

    try {
      const langPair = `en|${targetLang.split("-")[0]}`;

      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text,
        )}&langpair=${langPair}`,
      );

      const data = await response.json();
      return data.responseData.translatedText;
    } catch {
      return text;
    }
  };

  const fetchMovieDetails = async (id) => {
    if (!id) return;

    setLoadingTranslate(true);

    try {
      const response = await fetch(`${apiUrl}&i=${id}&plot=full`);
      const movieData = await response.json();

      const [tTitle, tPlot, tGenre] = await Promise.all([
        translateText(movieData.Title, language),
        translateText(movieData.Plot, language),
        translateText(movieData.Genre, language),
      ]);

      setSelectedMovie({
        ...movieData,
        Title: tTitle,
        Plot: tPlot,
        Genre: tGenre,
      });
    } catch (error) {
      console.error("Erro ao buscar filme:", error);
    } finally {
      setLoadingTranslate(false);
    }
  };

  const searchMovies = async (title) => {
    if (!title) return;

    try {
      const response = await fetch(`${apiUrl}&s=${title}`);
      const data = await response.json();

      if (data && data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovies("Spider Man");
  }, []);

  const currentLangData = languages.find((l) => l.id === language);

  return (
    <div id="App">
      <header className="header-controls">
        <img id="Logo" src={logo} alt="SSflix Logo" />

        <div className="custom-select-container">
          <button
            className="lang-select-button"
            onClick={() => setIsLangOpen(!isLangOpen)}
          >
            <img src={currentLangData.flag} alt="flag" className="flag-icon" />
            <span>{currentLangData.name}</span>
            <span className={`arrow ${isLangOpen ? "open" : ""}`}>▼</span>
          </button>

          {isLangOpen && (
            <ul className="lang-dropdown">
              {languages.map((lang) => (
                <li
                  key={lang.id}
                  onClick={() => {
                    setLanguage(lang.id);
                    setIsLangOpen(false);
                  }}
                >
                  <img src={lang.flag} alt={lang.name} className="flag-icon" />
                  {lang.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div className="search">
        <input
          onKeyDown={(e) => e.key === "Enter" && searchMovies(search)}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder={i18n[language]?.placeholder || i18n["en-US"].placeholder}
        />

        <img onClick={() => searchMovies(search)} src={lupa} alt="Pesquisar" />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => fetchMovieDetails(movie.imdbID)}
              className="card-wrapper"
            >
              <MovieCard {...movie} apiUrl={apiUrl} />
            </div>
          ))}
        </div>
      ) : (
        <h2 className="empty">{i18n[language]?.empty}</h2>
      )}

      {loadingTranslate && (
        <div className="loader-overlay">
          <div className="spinner"></div>
          <p>Traduzindo conteúdo...</p>
        </div>
      )}

      <Rodape link={"https://github.com/Ricci201"}>Lucas Ricci</Rodape>
    </div>
  );
};

export default App;
