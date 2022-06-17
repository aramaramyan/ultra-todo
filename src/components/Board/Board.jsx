import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import UserItem from "../UserItem/UserItem";
import useFirestore from "../../services/useFirestore";
import { setUsers } from "../../store/appSlice";
import "./Board.scss";
import Loader from "../Loader/Loader";
import AddUser from "../AddUser/AddUser";

export default function Board() {
  const users = useSelector((state) => state.app.users);
  const isModalOpen = useSelector((state) => state.app.isModalOpen);
  const { getUsers } = useFirestore();
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers().then((res) => {
      const localUsers = res.map((item) => {
        const { toDoes, ...user } = item;
        const toDoesArr = Object.keys(toDoes).map((key) => {
          return ({ ...toDoes[key], id: key });
        });
        return ({ ...user, toDoesArr });
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
          {users.length ? users.map(({ id, fullName, completed, toDoesArr }, i) => (
            <UserItem
              key={id}
              id={id}
              fullName={fullName}
              completed={completed}
              toDoesLength={toDoesArr.length}
            />
          )) : <Loader />}
        </div>
        <AddUser />
      </div>
      {isModalOpen && <Modal />}
    </div>
  );
}