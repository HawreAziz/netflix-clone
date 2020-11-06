import React, { useState, useEffect } from "react";
import tmdb from "../tmdb_api/tmdbApi";
import requests from "../requests";
import "./BannerStyle.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  const truncate = (description, max_len = 150) => {
    return description?.length > max_len
      ? `${description.substr(0, max_len - 1)}...`
      : description;
  };

  useEffect(() => {
    const fetchData = async () => {
      const request = await tmdb.get(requests.fetchNetflixOriginals);
      const { results } = request.data;
      setMovie(results[Math.floor(Math.random() * results.length - 1)]);
      return request;
    };
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Paly</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview)}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
