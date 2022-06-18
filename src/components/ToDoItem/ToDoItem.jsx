import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { object, string } from "prop-types";
import useFirestore from "../../services/useFirestore";
import { handleModalLoading, handleStatusLocal, deleteToDoLocal } from "../../store/appSlice";
import watchIcon from "../../icons/watch.svg";
import checkIcon from "../../icons/check.svg";
import closeIcon from "../../icons/close.svg";
import editIcon from "../../icons/pencil.svg";
import saveIcon from "../../icons/save.svg";
import "./ToDoItem.scss";

export default function ToDoItem({ userID, todo }) {
  const { title, isDone } = todo;
  const [textAreaState, setTextAreaState] = useState(title);
  const [isReadonly, setIsReadonly] = useState(true);
  const textAreaRef = useRef(null);
  const { handleStatus, deleteToDo } = useFirestore();
  const dispatch = useDispatch();

  function handleReadonly() {
    setIsReadonly((prev) => !prev);
  }

  function handleTextArea(evt) {
    setTextAreaState(evt.target.value);
  }

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

  function delToDo() {
    dispatch(handleModalLoading(true));
    deleteToDo(userID, todo.id).then(() => {
      dispatch(deleteToDoLocal(todo.id));
      dispatch(handleModalLoading(false));
    });
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
        <textarea
          ref={textAreaRef}
          className="title"
          value={textAreaState}
          rows={1}
          readOnly={isReadonly}
          onChange={handleTextArea}
        />
      </div>
      <button
        className={`todo__button title ${isDone ? "disabled" : ""}`}
        onClick={changeStatus}
        disabled={!!isDone}
      >
        <p className="todo__button_title">Mark as done</p>
      </button>
      <div className="todo__actions show-actions">
        {isReadonly ? (
          <div className="todo__actions_edit">
            <img src={editIcon} alt="Edit Icon" />
          </div>
        ) : (
          <div className="todo__actions_save">
            <img src={saveIcon} alt="Save Icon" />
          </div>
        )}
        <div className="todo__actions_delete" onClick={delToDo}>
          <img src={closeIcon} alt="Close Icon" />
        </div>
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