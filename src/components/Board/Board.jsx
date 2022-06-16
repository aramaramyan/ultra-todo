import "./Board.scss";

// const users = [
//   { id: 1, fullName: "Peter Bishop", rate: 7 },
//   { id: 2, fullName: "Olivia Dunham", rate: 62 },
//   { id: 3, fullName: "Walter Bishop", rate: 14 },
//   { id: 4, fullName: "William Bell", rate: 21 },
//   { id: 5, fullName: "David Robert Jones", rate: 27 },
//   { id: 6, fullName: "Phillip Broyles", rate: 100 },
//   { id: 7, fullName: "Nina Sharp", rate: 94 },
//   { id: 8, fullName: "Charley Franklin", rate: 35 },
//   { id: 9, fullName: "Astrid Farnsworth", rate: 27 },
// ];

export default function Board() {
  return (
    <div className="board">
      <div className="board__body">
        <div className="board__header">
          <div className="board__title title">
            <p className="board__title_name">Name</p>
            <p className="board__title_rate">Completion rate(%)</p>
          </div>
        </div>
        <div className="board__list" />
      </div>
    </div>
  );
}