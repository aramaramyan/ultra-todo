import "./Board.scss";
import { useState } from "react";
import Modal from "../Modal/Modal";
import UserItem from "../UserItem/UserItem";

const users = [
  { id: 1, fullName: "Peter Bishop", rate: 7 },
  { id: 2, fullName: "Olivia Dunham", rate: 62 },
  { id: 3, fullName: "Walter Bishop", rate: 14 },
  { id: 4, fullName: "William Bell", rate: 21 },
  { id: 5, fullName: "David Robert Jones", rate: 27 },
  { id: 6, fullName: "Phillip Broyles", rate: 100 },
  { id: 7, fullName: "Nina Sharp", rate: 94 },
  { id: 8, fullName: "Charley Franklin", rate: 35 },
  { id: 9, fullName: "Astrid Farnsworth", rate: 27 },
];

export default function Board() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="board">
      <div className={isModalOpen ? "board__body modal-open" : "board__body"}>
        <div className="board__header">
          <div className="board__title title">
            <p className="board__title_name">Name</p>
            <p className="board__title_rate">Completion rate(%)</p>
          </div>
        </div>
        <div className="board__list">
          {users.map(({ id, fullName, rate }, i) => <UserItem
            key={id}
            fullName={fullName}
            rate={rate}
            isBlue={i % 2}
            /* eslint-disable-next-line react/jsx-no-bind */
            openModal={openModal}
          />)}
        </div>
      </div>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
}