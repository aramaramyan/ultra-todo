import useWindowSize from "./hooks/useWindowSize";
import BoardContainer from "./components/Board/BoardContainer";
import Info from "./components/Info/Info";
import './App.scss';

export default function App() {
  const [windowWidth] = useWindowSize();

  return (
    <div className="App">
      {windowWidth > 1200 ? <BoardContainer /> : <Info />}
    </div>
  );
}