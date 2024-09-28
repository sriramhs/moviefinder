// App.tsx
import React, { useState } from "react";
import { Typography, Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";


const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const searchMovies = async () => {
    axios
      .get(`${API_URL}&s=${searchTerm}`)
      .then((res) => {
        const data = res.data;
        console.log(data, "first");

        {
          if (data.Response == "True")
            navigate(`/search/${searchTerm}`, { state: { props: data } });
          else {
            setError("No movies Found");
          }
        }
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };

  return (
    <div className="app">
      <h1 data-testid="heading">MovieApp</h1>
      <div className="search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchMovies();
          }}
          data-testid="form"
        >
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies"
            data-testid="input"
          />
          <IconButton type="submit" disabled={!searchTerm} data-testid="search">
            <SearchIcon sx={{ color: "#ed8e40f6", fontSize: 40 }} />
          </IconButton>
        </form>
      </div>

      {error && (
        <Alert severity="error" sx={{ backgroundColor: "#212426" }}>
          <Typography
            variant="body1"
            fontWeight="bold"
            fontSize="1.2rem"
            color="error"
            data-testid="error"
          >
            {error}
          </Typography>
        </Alert>
      )}
    </div>
  );
};

export default App;
