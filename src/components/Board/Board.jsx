import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import UserItem from "../UserItem/UserItem";
import useFirestore from "../../services/useFirestore";
import { setUsers } from "../../store/appSlice";
import "./Board.scss";

export default function Board() {
  const users = useSelector((state) => state.app.users);
  const isModalOpen = useSelector((state) => state.app.isModalOpen);
  const { getUsers } = useFirestore();
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers().then((res) => {
      const localUsers = res.map((item) => {
        const { toDoes, ...user } = item;
        const todos = Object.keys(toDoes).map((key) => {
          return ({ ...toDoes[key], id: key });
        });
        return ({ ...user, todos });
      });

      dispatch(setUsers(localUsers));
    });
  }, []);

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
          {users.map(({ id, fullName }, i) => (
            <UserItem
              key={id}
              fullName={fullName}
              isBlue={i % 2 !== 0}
            />
          ))}
        </div>
      </div>
      {isModalOpen && <Modal />}
    </div>
  );
}