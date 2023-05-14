import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FigureList from "./FigureList";

describe("FigureList", () => {
  it("renders without errors", () => {
    const { getByTestId } = render(<FigureList />);
    expect(getByTestId("add-first")).toBeInTheDocument();
  });

  it("opens the add figure modal when clicking on the 'add first' button", () => {
    render(<FigureList />);
    fireEvent.click(screen.getByTestId("add-first"));
    expect(screen.getByText("Agregar Figura")).toBeInTheDocument();
  });

  it("adds a figure to the beginning of the list when selecting 'add first' in the modal", () => {
    render(<FigureList />);
    fireEvent.click(screen.getByTestId("add-first"));
    fireEvent.click(screen.getByTestId("toggle-square"));
    fireEvent.click(screen.getByTestId("btn-add-modal"));
    expect(screen.getAllByTestId("figure-element0")[0]).toBeInTheDocument();
  });

  it("adds a figure to the end of the list when selecting 'add last' in the modal", () => {
    render(<FigureList />);
    fireEvent.click(screen.getByTestId("add-first"));
    fireEvent.click(screen.getByTestId("toggle-square"));
    fireEvent.click(screen.getByTestId("btn-add-modal"));
    expect(screen.getAllByTestId("figure-element0")[0]).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("add-last"));
    fireEvent.click(screen.getByTestId("toggle-circle"));
    fireEvent.click(screen.getByTestId("btn-add-modal"));
    expect(screen.getAllByTestId("figure-element1")[0]).toBeInTheDocument();
  });

  it("removes a figure from the list when clicking on the 'remove' button", () => {
    render(<FigureList />);
    fireEvent.click(screen.getByTestId("add-first"));
    fireEvent.click(screen.getByTestId("toggle-triangle"));
    fireEvent.click(screen.getByTestId("btn-add-modal"));
    const figureElement = screen.getAllByTestId("figure-element2")[0];
    fireEvent.mouseOver(figureElement);
    fireEvent.click(screen.getByTitle("Eliminar figura"));
    expect(screen.getAllByTestId("figure-element2")[0]).toBeInTheDocument();
  });
});
