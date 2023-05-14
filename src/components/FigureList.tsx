import React, { useEffect, useState } from "react";
import { DoublyLinkedList } from "../types/DoublyLinkedList";
import { Figure } from "../types/Figures";
import { Positions } from "../types/Positions";
import FigureElement from "./figure/FigureElement";
import { Button } from "react-bootstrap";
import "./figureList.css";
import AddFigure from "./AddFigure";
import figuresStorage from "../utils/figuresStorage";

const FigureList: React.FC<{data?: DoublyLinkedList<Figure>}> = () => {
  const [list, setList] = useState<DoublyLinkedList<Figure>>(
    new DoublyLinkedList<Figure>()
  );
  const [arr, setArr] = useState<Figure[]>();
  const [show, setShow] = useState<boolean>(false);
  const [position, setPosition] = useState<string>("");

  /**
   * Effect to initialize the list state with values from localStorage
   */
  useEffect(() => {
    const arrFigures = figuresStorage.getFiguresStorage();
    if(arrFigures && (arrFigures.length > 0)) {
      if(!(arrFigures.length === list.getLength())) {
        list.init(arrFigures);
        setListAndArr(list);
      }
    }
  }, [list]);

  /**
   * Effect to set values of array of figures to localStorage
   */
  useEffect(() => {
    if(arr) figuresStorage.setFiguresStorage(arr)
  }, [list, arr]);

  const setListAndArr = (list: DoublyLinkedList<Figure>) => {
    setList(list);
    setArr(list.toArray());
  }

  const openModal = (position: string) => {
    setPosition(position);
    setShow(true);
  };

  /**
   * Function to add a figure to the list.
   * Checks whether it will be added to the beginning or to the end
   */
  const handleAddNode = (figure: Figure) => {
    if (position === Positions.First) {
      list.addFirst(figure);
    } else if (position === Positions.Last) {
      list.addLast(figure);
    } else {
      return;
    }

    setListAndArr(list);
  };

  const handleRemove = (index: number) => {
    list.remove(index);
    setListAndArr(list);
  };

  return (
    <div className="container">
      <Button
        data-testid="add-first"
        variant="primary"
        onClick={() => openModal(Positions.First)}
        title="Agregar figura al inicio"
      >
        +
      </Button>
      <div className="list">
        <div className="scroll-container">
          {arr?.map((figure, index) => (
            <FigureElement
              key={index}
              figure={figure}
              isModalShowing={show}
              handleRemove={() => handleRemove(index)}
            />
          ))}
        </div>
      </div>
      {list.length > 0 && (
        <Button
          data-testid="add-last"
          variant="primary"
          style={{ marginLeft: "auto" }}
          onClick={() => openModal(Positions.Last)}
          title="Agregar figura al final"
        >
          +
        </Button>
      )}
      <AddFigure
        show={show}
        handleClose={() => setShow(!show)}
        handleSubmitValue={(val) => {
          setShow(false);
          handleAddNode(val);
        }}
      />
    </div>
  );
};

export default FigureList;
