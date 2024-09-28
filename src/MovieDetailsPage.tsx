import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Alert, Pagination, Skeleton, Typography } from "@mui/material";
import axios from "axios";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot: string;
}

interface MovieDetailsPageProps {
  props: Movie[];
}
const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const MovieDetailsPage: React.FC = () => {
  const location = useLocation();
  console.log(location);
  const [movies, setMovies] = useState<Movie[]>(location.state?.props?.Search);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(parseInt(location.state.props.totalResults) / 10)
  );
  const { moviename } = useParams<{ moviename: string }>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    searchMovies();
  }, [currentPage]);

  const searchMovies = async () => {
    setLoading(true);

    axios
      .get(`${API_URL}&s=${moviename}&page=${currentPage}`)
      .then((res) => {
        console.log(res, "axios return");
        const data = res.data;
        if (data.Response == "True") {
          setMovies(data.Search);
          setLoading(false);
        } else {
          setMovies([]);
          setTotalPages(0);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    console.log("njdksng", page);
  };

  return (
    <div>
      {" "}
      {loading ? (
        <div className="container">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={310}
              height={460}
              animation="wave"
              sx={{
                backgroundColor: "#303538",
                borderRadius: "12px",
                marginBottom: "10px",
                margin: "1.5rem",
              }}
            />
          ))}
        </div>
      ) : (
        <div className="container" data-testid="cards">
          {movies?.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
      {totalPages > 0 && (
        <div className="pagination">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
