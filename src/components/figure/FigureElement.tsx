import { useState } from "react";
import { Figure } from "../../types/Figures";
import { Trash3 } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import "./figure.css";

const FigureElement: React.FC<{
  figure: Figure;
  isModalShowing: boolean;
  handleRemove?: () => void;
}> = ({ figure, isModalShowing, handleRemove }) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);

  /**
   * Function to set the variable setShow to true. 
   * This is only called when the user moves the mouse over the figure container.
   */
  const mouseEnter = () => {
    setShowDelete(true);
  };

  /**
   * Function to set the variable setShow to false. 
   * This is only called when the user moves the mouse outside the figure container.
   */
  const mouseLeave = () => {
    setShowDelete(false);
  };
  return (
    <div
      style={{ position: "relative" }}
      {...(!isModalShowing && { onMouseOver: mouseEnter })}
      {...(!isModalShowing && { onMouseLeave: mouseLeave })}
    >
      <div
        data-testid={"figure-element" + figure}
        className={
          figure === Figure.Square
            ? "square"
            : figure === Figure.Circle
            ? "circle"
            : figure === Figure.Triangle
            ? "triangle"
            : ""
        }
      >
      </div>
      {showDelete && (
        <span className="delete">
          <Button
            variant="danger"
            size="sm"
            onClick={handleRemove}
            title="Eliminar figura"
          >
            <Trash3 />
          </Button>
        </span>
      )}
    </div>
  );
};

export default FigureElement;
