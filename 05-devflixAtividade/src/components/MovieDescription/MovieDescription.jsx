import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState(
    props.language || "pt-BR",
  );
  const [isLangOpen, setIsLangOpen] = useState(false);

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
      watch: "Assistir",
      rating: "Avaliação",
      duration: "Duração",
      release: "Lançamento",
      actors: "Elenco",
      genre: "Gênero",
      plot: "Sinopse",
    },
    "en-US": {
      watch: "Watch",
      rating: "Rating",
      duration: "Duration",
      release: "Release",
      actors: "Actors",
      genre: "Genre",
      plot: "Plot",
    },
    "es-ES": {
      watch: "Ver",
      rating: "Calificación",
      duration: "Duración",
      release: "Lanzamiento",
      actors: "Elenco",
      genre: "Género",
      plot: "Sinopsis",
    },
    "fr-FR": {
      watch: "Regarder",
      rating: "Évaluation",
      duration: "Durée",
      release: "Sortie",
      actors: "Acteurs",
      genre: "Genre",
      plot: "Synopsis",
    },
    "de-DE": {
      watch: "Ansehen",
      rating: "Bewertung",
      duration: "Dauer",
      release: "Veröffentlichung",
      actors: "Besetzung",
      genre: "Genre",
      plot: "Handlung",
    },
    "it-IT": {
      watch: "Guarda",
      rating: "Valutazione",
      duration: "Durata",
      release: "Rilascio",
      actors: "Attori",
      genre: "Genere",
      plot: "Sinossi",
    },
    "ja-JP": {
      watch: "見る",
      rating: "評価",
      duration: "時間",
      release: "リリース",
      actors: "キャスト",
      genre: "ジャンル",
      plot: "あらすじ",
    },
    "zh-CN": {
      watch: "观看",
      rating: "评分",
      duration: "时长",
      release: "发行",
      actors: "演员",
      genre: "类型",
      plot: "剧情",
    },
  };

  const translateText = async (text, targetLang, field = "") => {
    if (!text || text === "N/A" || targetLang === "en-US") return text;
    try {
      const tl = targetLang.split("-")[0];
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      const data = await response.json();
      return data[0].map((part) => part[0]).join("");
    } catch {
      return text;
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchAndTranslate = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const response = await fetch(
          `${props.apiUrl}&i=${props.movieID}&plot=full`,
        );
        const data = await response.json();
        if (data.Response === "False") throw new Error(data.Error);

        const [tTitle, tPlot, tGenre, tActors, tType] = await Promise.all([
          translateText(data.Title, currentLanguage, "Title"),
          translateText(data.Plot, currentLanguage, "Plot"),
          translateText(data.Genre, currentLanguage, "Genre"),
          translateText(data.Actors, currentLanguage, "Actors"),
          translateText(data.Type, currentLanguage, "Type"),
        ]);

        if (isMounted) {
          setMovieDesc({
            ...data,
            Title: tTitle,
            Plot: tPlot,
            Genre: tGenre,
            Actors: tActors,
            Type: tType,
          });
        }
      } catch (err) {
        if (isMounted) setErrorMsg("Erro ao carregar filme.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchAndTranslate();
    return () => {
      isMounted = false;
    };
  }, [props.movieID, currentLanguage, props.apiUrl]);

  const currentLangData =
    languages.find((l) => l.id === currentLanguage) || languages[0];
  const labels = i18n[currentLanguage] || i18n["pt-BR"];

  if (loading) {
    return (
      <div className={styles.modalBackdrop}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className={styles.modalBackdrop} onClick={props.click}>
        <div
          className={styles.movieModal}
          style={{ padding: "40px", textAlign: "center" }}
        >
          <p>{errorMsg}</p>
          <button className={styles.btnWatch} onClick={props.click}>
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.movieInfo}>
          <img
            src={
              movieDesc?.Poster !== "N/A"
                ? movieDesc?.Poster
                : "https://via.placeholder.com/400"
            }
            alt=""
          />

          <div className={styles.controlsTop}>
            <div className={styles.langWrapper}>
              <button
                className={styles.langBtn}
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <img src={currentLangData.flag} alt="flag" />
              </button>
              {isLangOpen && (
                <ul className={styles.langDropdown}>
                  {languages.map((lang) => (
                    <li
                      key={lang.id}
                      onClick={() => {
                        setCurrentLanguage(lang.id);
                        setIsLangOpen(false);
                      }}
                    >
                      <img src={lang.flag} alt="" /> {lang.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className={styles.btnClose} onClick={props.click}>
              X
            </button>
          </div>

          <div className={styles.movieType}>
            <div className={styles.typeBadge}>
              <img src="/favicon.png" alt="icon" />
              <span>{movieDesc?.Type}</span>
            </div>
            <h1>{movieDesc?.Title}</h1>
            <a
              href={`https://google.com/search?q=${encodeURIComponent(movieDesc?.Title)}`}
              target="_blank"
              rel="noreferrer"
              className={styles.btnWatch}
            >
              ▶️ {labels.watch}
            </a>
          </div>
        </div>

        <div className={styles.containerMisc}>
          <div className={styles.containerFlex}>
            <p>
              <strong>{labels.rating}:</strong> ⭐ {movieDesc?.imdbRating}
            </p>
            <p>
              <strong>{labels.duration}:</strong> {movieDesc?.Runtime}
            </p>
            <p>
              <strong>{labels.release}:</strong> {movieDesc?.Released}
            </p>
          </div>
          <div className={styles.containerFlex}>
            <p>
              <strong>{labels.actors}:</strong> {movieDesc?.Actors}
            </p>
            <p>
              <strong>{labels.genre}:</strong> {movieDesc?.Genre}
            </p>
          </div>
        </div>
        <div className={styles.desc}>
          <p>
            <strong>{labels.plot}:</strong> {movieDesc?.Plot}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
