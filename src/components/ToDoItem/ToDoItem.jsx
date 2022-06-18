import { useDispatch, useSelector } from "react-redux";
import { object, string } from "prop-types";
import useFirestore from "../../services/useFirestore";
import { handleModalLoading, handleStatusLocal } from "../../store/appSlice";
import watchIcon from "../../icons/watch.svg";
import checkIcon from "../../icons/check.svg";
import closeIcon from "../../icons/close.svg";
import "./ToDoItem.scss";

export default function ToDoItem({ userID, todo }) {
  const { title, isDone } = todo;
  const { handleStatus } = useFirestore();
  const dispatch = useDispatch();

  function changeStatus() {
    if (isDone) {
      dispatch(handleModalLoading(true));
      handleStatus(userID, todo, false, -1).then(() => {
        const payload = {
          id: todo.id,
          status: false,
          number: -1
        };

        dispatch(handleModalLoading(false));
        dispatch(handleStatusLocal(payload));
      });
    } else {
      dispatch(handleModalLoading(true));
      handleStatus(userID, todo, true, 1).then(() => {
        const payload = {
          id: todo.id,
          status: true,
          number: 1
        };

        dispatch(handleModalLoading(false));
        dispatch(handleStatusLocal(payload));
      });
    }
  }

  return (
    <div className="todo">
      <div className="todo__content">
        <div className={isDone ? "todo__status completed" : "todo__status"}>
          {isDone ?
            <img src={checkIcon} alt="Check Icon" />
            : <img src={watchIcon} alt="Watch Icon" />
          }
          <p className="todo__status_title">{isDone ? "Completed" : "Pending"}</p>
        </div>
        <p className="title">{title}</p>
      </div>
      <button
        className={`todo__button title ${isDone ? "disabled" : ""}`}
        onClick={changeStatus}
        disabled={!!isDone}
      >
        <p className="todo__button_title">Mark as done</p>
      </button>
      <div className="todo__delete show-delete">
        <img src={closeIcon} alt="Close Icon" />
      </div>
    </div>
  );
}

ToDoItem.defaultProps = {
  userID: "",
  todo: {}
};

ToDoItem.propTypes = {
  userID: string,
  todo: object
};