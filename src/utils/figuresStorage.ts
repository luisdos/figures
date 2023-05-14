import { Figure } from "../types/Figures";

const setFiguresStorage = (figures: Figure[]) => {
    localStorage.setItem('figures', JSON.stringify(figures));
}

const getFiguresStorage = () => {
    const data = localStorage.getItem('figures');
    let figures: Figure[];
    if(data) {
        figures = JSON.parse(data);
        return figures;
    } else {
        return [];
    }
}

export default {setFiguresStorage, getFiguresStorage};