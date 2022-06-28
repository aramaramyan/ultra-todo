import { useState } from "react";
import { connect } from "react-redux";
import { string, object, func } from "prop-types";
import { saveTodoThunk, handleStatusThunk, deleteTodoThunk } from "../../store/appSlice";
import ToDoItem from "./ToDoItem";
import autoGrow from "../../helpers/autoGrow";

function ToDoItemContainer(props) {
  const {
    userID,
    todo,
    saveThunk,
    changeStatusThunk,
    deleteThunk
  } = props;

  const { title, startDate, endDate } = todo;
  const [textareaState, setTextareaState] = useState(title);
  const [isReadonly, setIsReadonly] = useState(true);
  const currentDate = Date.now();

  function handleReadonly() {
    setIsReadonly((prev) => !prev);
  }

  function editTodo(textareaRef) {
    if (!todo.endDate) {
      handleReadonly();
      textareaRef.current.focus();
    }
  }

  function handleTextarea(evt) {
    setTextareaState(evt.target.value);
    autoGrow(evt, "30px");
  }

  function saveTodo() {
    const updatedTodo = {
      userID,
      todo,
      title: textareaState
    };

    saveThunk(updatedTodo);
  }

  function handleStatus() {
    const timeNow = Date.now();
    const payload = {
      userID,
      todo,
      endDate: timeNow,
    };

    changeStatusThunk(payload);
  }

  function deleteTodo() {
    const payload = {
      userID,
      todoID: todo.id,
      endDate
    };

    deleteThunk(payload);
  }

  return <ToDoItem
    startDate={startDate}
    endDate={endDate}
    textareaState={textareaState}
    isReadonly={isReadonly}
    currentDate={currentDate}
    editTodo={editTodo}
    handleTextarea={handleTextarea}
    saveTodo={saveTodo}
    handleStatus={handleStatus}
    deleteTodo={deleteTodo}
  />;
}

function mapDispatchToProps(dispatch) {
  return {
    saveThunk: (updatedTodo) => {
      dispatch(saveTodoThunk(updatedTodo));
    },
    changeStatusThunk: (payload) => {
      dispatch(handleStatusThunk(payload));
    },
    deleteThunk: (payload) => {
      dispatch(deleteTodoThunk(payload));
    }
  };
}

export default connect(null, mapDispatchToProps)(ToDoItemContainer);

ToDoItemContainer.defaultProps = {
  userID: "",
  todo: {},
  saveThunk: () => {},
  changeStatusThunk: () => {},
  deleteThunk: () => {},
};

ToDoItemContainer.propTypes = {
  userID: string,
  todo: object,
  saveThunk: func,
  changeStatusThunk: func,
  deleteThunk: func,
};