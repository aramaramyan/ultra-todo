import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import UserItem from "../UserItem/UserItem";
import useFirestore from "../../services/useFirestore";
import "./Board.scss";

export default function Board() {
  const users = useSelector((state) => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getUsers } = useFirestore();

  useEffect(() => {
    getUsers().then(console.log);
  }, []);

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
            openModal={() => openModal()}
          />)}
        </div>
      </div>
      {isModalOpen && <Modal closeModal={() => closeModal()} />}
    </div>
  );
}