import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, useLocation } from "react-router-dom";
import MovieDetailsPage from "../MovieDetailsPage";
import axios from "axios";
import responseTrue from "../api_response/responseTrue.json";
import responseFalse from "../api_response/responseFalse.json";
import axErrData from "../api_response/axiosError.json";
import mockLocData from "../api_response/mockLocation.json";
const mockLoc = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => mockLoc(),
}));

jest.mock("axios");

let mockedAxios = axios as jest.Mocked<typeof axios>;

const mockLocation = mockLocData;

describe("MovieDetailsPage Component", () => {
  test("iesponse true", async () => {
    mockLoc.mockReturnValue(mockLocation);
    mockedAxios.get.mockResolvedValue(responseTrue);
    render(
      <BrowserRouter>
        <MovieDetailsPage />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText("2"));
  });

  test("response false", async () => {
    mockLoc.mockReturnValue(mockLocation);
    mockedAxios.get.mockResolvedValue(responseFalse);
    render(
      <BrowserRouter>
        <MovieDetailsPage />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText("2"));
  });

  test("axios err", async () => {
    mockLoc.mockReturnValue(mockLocation);
    mockedAxios.get.mockRejectedValue(axErrData);
    render(
      <BrowserRouter>
        <MovieDetailsPage />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText("2"));
  });
});
