import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { object, string } from "prop-types";
import useFirestore from "../../services/useFirestore";
import { handleModalLoading, handleStatusLocal, deleteToDoLocal, updateToDoLocal } from "../../store/appSlice";
import autoGrow from "../../helpers/autoGrow";
import watchIcon from "../../icons/watch.svg";
import checkIcon from "../../icons/check.svg";
import closeIcon from "../../icons/close.svg";
import editIcon from "../../icons/pencil.svg";
import saveIcon from "../../icons/save.svg";
import "./ToDoItem.scss";

export default function ToDoItem({ userID, todo }) {
  const { title, endDate } = todo;
  const [textareaState, setTextareaState] = useState(title);
  const [isReadonly, setIsReadonly] = useState(true);
  const textAreaRef = useRef(null);
  const { handleStatus, deleteToDo, updateToDo } = useFirestore();
  const dispatch = useDispatch();

  useEffect(() => {
    textAreaRef.current.rows = Math.trunc(textAreaRef.current.scrollHeight / 21);
  }, []);

  function handleReadonly() {
    setIsReadonly((prev) => !prev);
  }

  function editTodo() {
    if (!todo.endDate) {
      handleReadonly();
      textAreaRef.current.focus();
    }
  }

  function handleTextarea(evt) {
    setTextareaState(evt.target.value);
    autoGrow(evt, "30px");
  }

  function saveTodo() {
    handleReadonly();
    dispatch(handleModalLoading(true));

    updateToDo(userID, todo, textareaState).then(() => {
      const payload = {
        userID,
        todoID: todo.id,
        title: textareaState
      };

      dispatch(updateToDoLocal(payload));
      dispatch(handleModalLoading(false));
    });
  }

  function markAsDone() {
    const timeNow = Date.now();
    dispatch(handleModalLoading(true));
    handleStatus(userID, todo, timeNow).then(() => {
      const payload = {
        userID,
        todoID: todo.id,
        endDate: timeNow
      };

      dispatch(handleStatusLocal(payload));
      dispatch(handleModalLoading(false));
    });
  }

  function delToDo() {
    dispatch(handleModalLoading(true));
    deleteToDo(userID, todo.id, endDate).then(() => {
      const payload = {
        userID,
        todoID: todo.id,
        endDate
      };

      dispatch(deleteToDoLocal(payload));
      dispatch(handleModalLoading(false));
    });
  }

  return (
    <div className="todo">
      <div className="todo__content">
        <div className={endDate ? "todo__status completed" : "todo__status"}>
          {endDate ?
            <img src={checkIcon} alt="Check Icon" />
            : <img src={watchIcon} alt="Watch Icon" />
          }
          <p className="todo__status_title">{endDate ? "Completed" : "Pending"}</p>
        </div>
        <textarea
          ref={textAreaRef}
          rows={1}
          className="title"
          value={textareaState}
          readOnly={isReadonly}
          onChange={handleTextarea}
        />
      </div>
      <button
        className={`todo__button title ${endDate ? "disabled" : ""}`}
        onClick={markAsDone}
        disabled={!!endDate}
      >
        <p className="todo__button_title">Mark as done</p>
      </button>
      <div className="todo__actions show-actions">
        {isReadonly ? (
          <div className={`todo__actions_edit ${endDate ? "disabled" : ""}`} onClick={editTodo}>
            <img src={editIcon} alt="Edit Icon" />
          </div>
        ) : (
          <div className="todo__actions_save" onClick={saveTodo} onSubmit={saveTodo}>
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