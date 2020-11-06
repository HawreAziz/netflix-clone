import React, { useState, useEffect } from "react";
import tmdb from "../tmdb_api/tmdbApi";
import "./RowStyle.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseURL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerURL, setTrailerURL] = useState("");
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const request = await tmdb.get(fetchURL);
      setMovies(request.data.results);
    };
    fetchData();
  }, [fetchURL]);

  const handleTrailer = (movie) => {
    if (trailerURL) {
      setTrailerURL("");
    }
    movieTrailer(movie?.title || "")
      .then((url) => {
        console.log(url);
        const trailerURL = new URLSearchParams(new URL(url).search);
        setTrailerURL(trailerURL.get("v"));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="row">
      <h3>{title}</h3>
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => handleTrailer(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${baseURL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerURL && <Youtube videoId={trailerURL} opts={opts} />}
    </div>
  );
}

export default Row;
