import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentLanguage = props.language;

  const translateText = async (text, targetLang) => {
    if (!text || text === "N/A" || targetLang === "en") return text;

    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(
        text,
      )}`;

      const response = await fetch(url);
      const data = await response.json();

      return data[0].map((part) => part[0]).join("");
    } catch {
      return text;
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${props.apiUrl}&i=${props.movieID}&plot=full`,
        );

        const data = await response.json();

        const [title, plot, genre, actors, type] = await Promise.all([
          translateText(data.Title, currentLanguage),
          translateText(data.Plot, currentLanguage),
          translateText(data.Genre, currentLanguage),
          translateText(data.Actors, currentLanguage),
          translateText(data.Type, currentLanguage),
        ]);

        setMovieDesc({
          ...data,
          Title: title,
          Plot: plot,
          Genre: genre,
          Actors: actors,
          Type: type,
        });
      } catch (error) {
        console.error("Erro ao buscar filme:", error);
      }

      setLoading(false);
    };

    fetchMovie();
  }, [props.movieID, currentLanguage]);

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.btnClose}
          onClick={props.click}
          aria-label="Fechar"
        >
          ✕
        </button>

        <div className={styles.movieInfo}>
          <img
            src={
              movieDesc?.Poster !== "N/A"
                ? movieDesc?.Poster
                : "https://via.placeholder.com/400"
            }
            alt={movieDesc?.Title}
          />

          <div className={styles.movieContent}>
            <h1>{movieDesc?.Title}</h1>

            <p className={styles.rating}>⭐ {movieDesc?.imdbRating}</p>

            <p className={styles.infoRow}>
              <strong>Genre:</strong> {movieDesc?.Genre}
            </p>

            <p className={styles.infoRow}>
              <strong>Actors:</strong> {movieDesc?.Actors}
            </p>

            <p className={styles.plot}>
              <strong>Plot:</strong> {movieDesc?.Plot}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
