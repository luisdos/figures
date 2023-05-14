import React, { useEffect, useState } from "react";
import { Figure } from "../types/Figures";
import FigureElement from "./figure/FigureElement";
import {
  ToggleButtonGroup,
  ToggleButton,
  Modal,
  Button,
  Alert
} from "react-bootstrap";

const AddFigure: React.FC<{
  show: boolean;
  handleClose: () => void;
  handleSubmitValue: (val: Figure) => void;
}> = ({ show, handleClose, handleSubmitValue }) => {
  const [value, setValue] = useState<Figure>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setValue(undefined);
    setError(false);
  }, [show]);

  const handleChange = (val: Figure) => setValue(val);

  const handleSubmit = (event: React.FormEvent, val: Figure) => {
    if (value === undefined) {
      setError(true);
    } else {
      handleSubmitValue(value);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Agregar Figura</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ margin: "auto" }}>
        <Alert
          show={error}
          variant="danger"
          dismissible
          onClose={() => setError(false)}
        >
          Por favor, seleccione una figura.
        </Alert>
        <ToggleButtonGroup
          data-testid="toggle-group"
          type="radio"
          value={value}
          onChange={handleChange}
          name="options"
        >
          <ToggleButton data-testid="toggle-square" variant="light" id="tbg-square" value={Figure.Square}>
            <FigureElement figure={Figure.Square} isModalShowing={show} />
          </ToggleButton>
          <ToggleButton data-testid="toggle-circle" variant="light" id="tbg-circle" value={Figure.Circle}>
            <FigureElement figure={Figure.Circle} isModalShowing={show} />
          </ToggleButton>
          <ToggleButton
            data-testid="toggle-triangle"
            variant="light"
            id="tbg-triangle"
            value={Figure.Triangle}
          >
            <FigureElement figure={Figure.Triangle} isModalShowing={show} />
          </ToggleButton>
        </ToggleButtonGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} data-testid="btn-cancel-modal">
          Cancelar
        </Button>
        <Button variant="primary" onClick={(e) => handleSubmit(e, value!)} data-testid="btn-add-modal">
          Agregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddFigure;
