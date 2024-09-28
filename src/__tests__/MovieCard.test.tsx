import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieCard from "../MovieCard";
import { useNavigate } from "react-router-dom";

const mockNav = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNav,
}));

const mockMovie = {
  Title: "Sample Movie",
  Year: "2022",
  imdbID: "tt123456",
  Type: "Movie",
  Poster: "http://example.com/sample.jpg",
  Plot: "This is a sample movie plot.",
};

const mockMovie2 = {
  Title: "Sample Movie",
  Year: "2022",
  imdbID: "tt123456",
  Type: "Movie",
  Poster: "N/A",
  Plot: "This is a sample movie plot.",
};

describe("MovieCard Component", () => {
  test("it renders movie details correctly", () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText("Sample Movie")).toBeInTheDocument;
    expect(screen.getByText("2022")).toBeInTheDocument;
    expect(screen.getByText("Movie")).toBeInTheDocument;
  });

  test("it renders movie details correctly without poster", () => {
    render(<MovieCard movie={mockMovie2} />);

    expect(screen.getByText("Sample Movie")).toBeInTheDocument;
    expect(screen.getByText("2022")).toBeInTheDocument;
    expect(screen.getByText("Movie")).toBeInTheDocument;
  });

  test("it navigates to movie plot on 'Show Details' button click", () => {
    render(<MovieCard movie={mockMovie} />);

    fireEvent.click(screen.getByText("Show Details"));

    expect(mockNav).toHaveBeenCalled();
  });
});
