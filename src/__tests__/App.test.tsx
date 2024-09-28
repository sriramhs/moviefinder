import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userEvent from "@testing-library/user-event";

const mockNav = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNav,
}));

jest.mock("axios");

let mockedAxios = axios as jest.Mocked<typeof axios>;

describe("page : app testing", () => {
  test("it renders everything", () => {
    render(<App />);
    expect(screen.getByText("MovieApp")).toBeInTheDocument;
  });

  test("it navs on right input", async () => {
    mockedAxios.get.mockResolvedValue({
      data: { movie: "movies", Response: "True" },
    });
    render(<App />);

    fireEvent.change(screen.getByTestId("input"), {
      target: { value: "iron man" },
    });
    fireEvent.click(screen.getByTestId("search"));
    fireEvent.submit(screen.getByTestId("form"));

    await waitFor(() => {
      expect(mockNav).toHaveBeenCalled();
    });
  });

  test("it  doesnt navs on right input", async () => {
    mockedAxios.get.mockResolvedValue({
      data: { movie: "movies", Response: "False" },
    });
    render(<App />);

    fireEvent.change(screen.getByTestId("input"), {
      target: { value: "iron man" },
    });
    fireEvent.click(screen.getByTestId("search"));
    fireEvent.submit(screen.getByTestId("form"));

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument;
    });
  });

  test("it shows error on wrong input", () => {
    mockedAxios.get.mockRejectedValue({ error: "error" });
    render(<App />);

    fireEvent.change(screen.getByTestId("input"), {
      target: { value: "iron man" },
    });
    fireEvent.click(screen.getByTestId("search"));
  });
});
