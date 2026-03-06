import { useEffect, useState } from "react";
import "./App.css";

import logo from "./assets/ssflix.png";
import lupa from "./assets/search.svg";

import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";
import MovieDescription from "./components/MovieDescription/MovieDescription";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [translatedMovies, setTranslatedMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("pt");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loadingTranslate, setLoadingTranslate] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const [placeholderText, setPlaceholderText] = useState("Search for movies");
  const [emptyText, setEmptyText] = useState("Movie not found");

  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  const languages = [
    {
      id: "pt",
      name: "Português",
      flag: "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg",
    },
    {
      id: "en",
      name: "English",
      flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
    },
    {
      id: "es",
      name: "Español",
      flag: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",
    },
    {
      id: "fr",
      name: "Français",
      flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
    },
    {
      id: "de",
      name: "Deutsch",
      flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
    },
    {
      id: "ja",
      name: "日本語",
      flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg",
    },
    {
      id: "zh-CN",
      name: "中文",
      flag: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
    },
  ];

  const translateText = async (text, tl) => {
    if (!text || tl === "en") return text;

    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;

      const res = await fetch(url);
      const data = await res.json();

      return data[0].map((item) => item[0]).join("");
    } catch {
      return text;
    }
  };

  const translateInterface = async (lang) => {
    const [p, e] = await Promise.all([
      translateText("Search for movies", lang),
      translateText("Movie not found", lang),
    ]);

    setPlaceholderText(p);
    setEmptyText(e);
  };

  const translateMovies = async (moviesList, lang) => {
    const translated = await Promise.all(
      moviesList.map(async (movie) => {
        const title = await translateText(movie.Title, lang);

        return {
          ...movie,
          Title: title,
        };
      }),
    );

    setTranslatedMovies(translated);
  };

  const searchMovies = async (title) => {
    if (!title) return;

    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
      translateMovies(data.Search, language);
    } else {
      setMovies([]);
      setTranslatedMovies([]);
    }
  };

  useEffect(() => {
    searchMovies("Spider Man");
  }, []);

  useEffect(() => {
    translateInterface(language);

    if (movies.length > 0) {
      translateMovies(movies, language);
    }
  }, [language]);

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
          placeholder={placeholderText}
        />

        <img onClick={() => searchMovies(search)} src={lupa} alt="Pesquisar" />
      </div>

      {translatedMovies?.length > 0 ? (
        <div className="container">
          {translatedMovies.map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => setSelectedMovie(movie.imdbID)}
              className="card-wrapper"
            >
              <MovieCard {...movie} />
            </div>
          ))}
        </div>
      ) : (
        <h2 className="empty">{emptyText}</h2>
      )}

      {selectedMovie && (
        <MovieDescription
          movieID={selectedMovie}
          apiUrl={apiUrl}
          language={language}
          click={() => setSelectedMovie(null)}
        />
      )}

      <Rodape link={"https://github.com/Ricci201"}>Lucas Ricci</Rodape>
    </div>
  );
};

export default App;
