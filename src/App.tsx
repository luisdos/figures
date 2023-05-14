import FigureList from "./components/FigureList";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1 className="banner">Administrador de figuras</h1>
      <FigureList />
    </div>
  );
}