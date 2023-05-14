import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Figure } from '../types/Figures';
import AddFigure from './AddFigure';

describe('AddFigure component', () => {
  it('renders the component', () => {
    const handleClose = jest.fn();
    const handleSubmitValue = jest.fn();
    const { getByText, getByTestId } = render(
      <AddFigure
        show={true}
        handleClose={handleClose}
        handleSubmitValue={handleSubmitValue}
      />
    );

    expect(getByText('Agregar Figura')).toBeInTheDocument();
    expect(getByTestId('toggle-group')).toBeInTheDocument();
    expect(getByText('Agregar')).toBeInTheDocument();
    expect(getByText('Cancelar')).toBeInTheDocument();
  });

  it('calls handleClose when clicking on Cancelar button', () => {
    const handleClose = jest.fn();
    const handleSubmitValue = jest.fn();
    const { getByText } = render(
      <AddFigure
        show={true}
        handleClose={handleClose}
        handleSubmitValue={handleSubmitValue}
      />
    );

    const cancelButton = getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls handleSubmitValue with the square value when clicking on Agregar button', () => {
    const handleClose = jest.fn();
    const handleSubmitValue = jest.fn();
    const { getByText, getByTestId } = render(
      <AddFigure
        show={true}
        handleClose={handleClose}
        handleSubmitValue={handleSubmitValue}
      />
    );

    const addButton = getByText('Agregar');
    const squareToggleButton = getByTestId('toggle-square');
    fireEvent.click(squareToggleButton);
    fireEvent.click(addButton);

    expect(handleSubmitValue).toHaveBeenCalledTimes(1);
    expect(handleSubmitValue).toHaveBeenCalledWith(Figure.Square);
  });

  it('calls handleSubmitValue with the circle value when clicking on Agregar button', () => {
    const handleClose = jest.fn();
    const handleSubmitValue = jest.fn();
    const { getByText, getByTestId } = render(
      <AddFigure
        show={true}
        handleClose={handleClose}
        handleSubmitValue={handleSubmitValue}
      />
    );

    const addButton = getByText('Agregar');
    const squareToggleButton = getByTestId('toggle-circle');
    fireEvent.click(squareToggleButton);
    fireEvent.click(addButton);

    expect(handleSubmitValue).toHaveBeenCalledTimes(1);
    expect(handleSubmitValue).toHaveBeenCalledWith(Figure.Circle);
  });

  it('calls handleSubmitValue with the triangle value when clicking on Agregar button', () => {
    const handleClose = jest.fn();
    const handleSubmitValue = jest.fn();
    const { getByText, getByTestId } = render(
      <AddFigure
        show={true}
        handleClose={handleClose}
        handleSubmitValue={handleSubmitValue}
      />
    );

    const addButton = getByText('Agregar');
    const squareToggleButton = getByTestId('toggle-triangle');
    fireEvent.click(squareToggleButton);
    fireEvent.click(addButton);

    expect(handleSubmitValue).toHaveBeenCalledTimes(1);
    expect(handleSubmitValue).toHaveBeenCalledWith(Figure.Triangle);
  });

  it('shows an error message if no figure is selected when clicking on Agregar button', () => {
    const handleClose = jest.fn();
    const handleSubmitValue = jest.fn();
    const { getByText } = render(
      <AddFigure
        show={true}
        handleClose={handleClose}
        handleSubmitValue={handleSubmitValue}
      />
    );

    const addButton = getByText('Agregar');
    fireEvent.click(addButton);

    expect(getByText('Por favor, seleccione una figura.')).toBeInTheDocument();
  });
});
