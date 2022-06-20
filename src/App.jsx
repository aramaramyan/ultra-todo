import Board from "./components/Board/Board";
import useWindowSize from "./hooks/useWindowSize";
import Info from "./components/Info/Info";
import './App.scss';

export default function App() {
  const [windowWidth] = useWindowSize();

  return (
    <div className="App">
      {windowWidth > 1200 ? <Board /> : <Info />}
    </div>
  );
}