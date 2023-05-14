import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FigureElement from "./FigureElement";
import { Figure } from "../../types/Figures";

describe("FigureElement component", () => {
  const figure = Figure.Square;

  it("should render the correct figure", () => {
    render(<FigureElement figure={figure} isModalShowing={false} />);
    const figureElement = screen.getByTestId("figure-element0");
    expect(figureElement).toHaveClass("square");
  });

  it("should render a circle figure", () => {
    render(<FigureElement figure={Figure.Circle} isModalShowing={false} />);
    const figureElement = screen.getByTestId("figure-element1");
    expect(figureElement).toHaveClass("circle");
  });

  it("should render a triangle figure", () => {
    render(<FigureElement figure={Figure.Triangle} isModalShowing={false} />);
    const figureElement = screen.getByTestId("figure-element2");
    expect(figureElement).toHaveClass("triangle");
  });

  it("should show the delete button on mouse over", () => {
    render(<FigureElement figure={figure} isModalShowing={false} />);
    const figureElement = screen.getByTestId("figure-element0");
    fireEvent.mouseOver(figureElement);
    const deleteButton = screen.getByTitle("Eliminar figura");
    expect(deleteButton).toBeVisible();
  });

  it("should hide the delete button on mouse leave", () => {
    render(<FigureElement figure={figure} isModalShowing={false} />);
    const figureElement = screen.getByTestId("figure-element0");
    fireEvent.mouseOver(figureElement);
    fireEvent.mouseLeave(figureElement);
    const deleteButton = screen.queryByTitle("Eliminar figura");
    expect(deleteButton).not.toBeInTheDocument();
  });

  it("should call handleRemove when delete button is clicked", () => {
    const handleRemove = jest.fn();
    render(
      <FigureElement
        figure={figure}
        isModalShowing={false}
        handleRemove={handleRemove}
      />
    );
    const figureElement = screen.getByTestId("figure-element0");
    fireEvent.mouseOver(figureElement);
    const deleteButton = screen.getByTitle("Eliminar figura");
    fireEvent.click(deleteButton);
    expect(handleRemove).toHaveBeenCalled();
  });
});