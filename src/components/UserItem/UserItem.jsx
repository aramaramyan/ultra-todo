import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { number, string } from "prop-types";
import { handleModal, setCurrentUser } from "../../store/appSlice";
import "./UserItem.scss";

export default function UserItem({ id, fullName, completed, toDoesLength }) {
  const [currentUser] = useSelector((state) => state.app.currentUser);
  const [completionRate, setCompletionRate] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setCompletionRate(Math.floor((completed / toDoesLength) * 100));
  }, [toDoesLength]);

  function handleClick() {
    dispatch(handleModal(true));
    dispatch(setCurrentUser(id));
  }

  return (
    <div
      className={`user-item ${currentUser?.id === id ? 'current-user' : ''}`}
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      tabIndex={0}
    >
      <p className="user-item__title title">{fullName}</p>
      <p className="user-item__rate title">{completionRate}</p>
    </div>
  );
}

UserItem.defaultProps = {
  id: "",
  fullName: "",
  completed: 0,
  toDoesLength: 0
};

UserItem.propTypes = {
  id: string,
  fullName: string,
  completed: number,
  toDoesLength: number
};