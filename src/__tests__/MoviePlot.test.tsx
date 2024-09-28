import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import MoviePlot from "../MoviePlot";
import { MemoryRouter, Route } from "react-router-dom";
import axios from "axios";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";

jest.mock("axios");

let mockedAxios = axios as jest.Mocked<typeof axios>;

describe("it renders everything", () => {
  test("renders everything", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        Title: "movie",
        Year: "2000",
        imdbID: "8",
        Type: "string",
        Poster: "string",
        Plot: "string",
        imdbRating: "string",
      },
    });
    render(<MoviePlot />);
    await waitFor(() => {
      expect(screen.getByTestId("title")).toBeInTheDocument;
    });
  });
});
