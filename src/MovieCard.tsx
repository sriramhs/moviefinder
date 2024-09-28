import React, { useState } from "react";
import { Button } from "@mui/material";
import MoviePlot from "./MoviePlot";
import { useNavigate } from "react-router-dom";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="movie">
        <div>
          <p>{movie.Year}</p>
        </div>
        <div>
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/400"
            }
            alt={movie.Title}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h3>{movie.Title}</h3>
          <span>{movie.Type}</span>
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/plot/${movie.Title}`);
            }}
            style={{
              background:
                "linear-gradient(90deg, rgb(243, 232, 152) 0%, #ed8e40f6 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "var(--font-raleway)",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            Show Details
          </Button>
          {/* <Button
            variant="contained"
            onClick={() => {
              navigate(`/watch/${movie.imdbID}`);
            }}
            style={{
              background:
                "linear-gradient(90deg, rgb(243, 232, 152) 0%, #ed8e40f6 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "var(--font-raleway)",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            Watch
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
