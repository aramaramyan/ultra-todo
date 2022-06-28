import { useEffect, useRef } from "react";
import { string, bool, number, func } from "prop-types";
import msToTime from "../../helpers/msToTime";
import getTaskDuration from "../../helpers/getTaskDuration";
import watchIcon from "../../icons/watch.svg";
import checkIcon from "../../icons/check.svg";
import closeIcon from "../../icons/close.svg";
import editIcon from "../../icons/pencil.svg";
import saveIcon from "../../icons/save.svg";
import "./ToDoItem.scss";

export default function ToDoItem(props) {
  const {
    startDate,
    endDate,
    textareaState,
    isReadonly,
    currentDate,
    editTodo,
    handleTextarea,
    saveTodo,
    handleStatus,
    deleteTodo
  } = props;

  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.rows = Math.trunc(textAreaRef.current.scrollHeight / 21);
  }, []);

  function onEdit() {
    editTodo(textAreaRef);
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
        onClick={handleStatus}
        disabled={!!endDate}
      >
        <p className="todo__button_title" style={{ fontSize: `${endDate ? "14px" : "18px"}` }}>
          {endDate ? `Duration: ${getTaskDuration(startDate, endDate)}` : "Mark as done"}
        </p>
      </button>
      <div className="todo__header show-header">
        <div className="todo__header_date">
            <p className="title" style={{ color: `${endDate ? "#03BC90" : "#FC9700"}` }}>
              {endDate ? (
                `completed ${msToTime(currentDate - endDate)} ago`
            ) : (
              `created ${msToTime(currentDate - startDate)} ago`
            )}
            </p>
        </div>
        {isReadonly ? (
          <div className={`todo__header_edit ${endDate ? "disabled" : ""}`} onClick={onEdit}>
            <img src={editIcon} alt="Edit Icon" />
          </div>
        ) : (
          <div className="todo__header_save" onClick={saveTodo}>
            <img src={saveIcon} alt="Save Icon" />
          </div>
        )}
        <div className="todo__header_delete" onClick={deleteTodo}>
          <img src={closeIcon} alt="Close Icon" />
        </div>
      </div>
    </div>
  );
}

ToDoItem.defaultProps = {
  startDate: 0,
  endDate: 0,
  textareaState: "",
  isReadonly: false,
  currentDate: 0,
  editTodo: () => {},
  handleTextarea: () => {},
  saveTodo: () => {},
  handleStatus: () => {},
  deleteTodo: () => {},
};

ToDoItem.propTypes = {
  startDate: number,
  endDate: number,
  textareaState: string,
  isReadonly: bool,
  currentDate: number,
  editTodo: func,
  handleTextarea: func,
  saveTodo: func,
  handleStatus: func,
  deleteTodo: func,
};