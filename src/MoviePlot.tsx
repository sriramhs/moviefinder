import { Box, Skeleton, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
}

const MoviePlot: React.FC = () => {
  const { moviePlot } = useParams<{ moviePlot: string }>();

  const [details, setDetails] = useState<Movie>();
  const [loading, setLoading] = useState(true);
  const searchDetails = async () => {
    axios
      .get(`http://www.omdbapi.com?apikey=b6003d8a&t=${moviePlot}&plot=short`)
      .then((res) => {
        const data = res.data;
        setDetails(data);
        setLoading(false);
      });
  };
  useEffect(() => {
    searchDetails();
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "#1f2123",
        color: "#f8dcb7",
        fontFamily: "var(--font-raleway)",
        boxShadow: 24,
        p: 4,
      }}
    >
      {loading ? (
        <Skeleton
          variant="rectangular"
          width={350}
          height={200}
          animation="wave"
          sx={{ backgroundColor: "#303538" }}
        />
      ) : (
        <div>
          {" "}
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            data-testid="title"
          >
            {details?.Title}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Year: {details?.Year}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Rating: {details?.imdbRating}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 1 }}>
            Plot: {details?.Plot}
          </Typography>
          <Typography sx={{ mt: 1 }}>Type: {details?.Type}</Typography>
        </div>
      )}
    </Box>
  );
};

export default MoviePlot;
