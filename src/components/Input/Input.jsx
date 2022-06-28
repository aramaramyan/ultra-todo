import { useRef } from "react";
import { string, bool, func } from "prop-types";
import plusIcon from "../../icons/plus.svg";
import checkIcon from "../../icons/check.svg";
import "./Input.scss";

export default function Input(props) {
  const {
    todoInput,
    todoPlaceholder,
    isAddTodoFieldOpen,
    handleInput,
    toggleInputField,
    changePlaceholder,
    addTodo
  } = props;

  const inputRef = useRef(null);

  function onInputChange(evt) {
    if (isAddTodoFieldOpen) {
      handleInput(evt.target.value);
    }
  }

  function openInputField() {
    toggleInputField(true);
    inputRef.current.focus();
  }

  function submitToDo(evt) {
    evt.preventDefault();
    if (todoInput.trim()) {
      addTodo();
    } else {
      changePlaceholder("Please fill the input");
    }
  }

  return (
    <div className="input">
      <form onSubmit={submitToDo}>
        <input
          ref={inputRef}
          className={isAddTodoFieldOpen ? "input__field input-open title" : "input__field"}
          type="text"
          value={todoInput}
          placeholder={todoPlaceholder}
          onChange={onInputChange}
        />
        {isAddTodoFieldOpen ? (
          <div className="input__button" onClick={submitToDo}>
            <img src={checkIcon} alt="Check Icon" />
          </div>
        ) : (
          <div className="input__button" onClick={openInputField}>
            <img src={plusIcon} alt="Plus Icon" />
          </div>
        )}
      </form>
    </div>
  );
}

Input.defaultProps = {
  todoInput: "",
  todoPlaceholder: "",
  isAddTodoFieldOpen: false,
  handleInput: () => {},
  toggleInputField: () => {},
  changePlaceholder: () => {},
  addTodo: () => {}
};

Input.propTypes = {
  todoInput: string,
  todoPlaceholder: string,
  isAddTodoFieldOpen: bool,
  handleInput: func,
  toggleInputField: func,
  changePlaceholder: func,
  addTodo: func
};