import { useCallback } from "react";
import { connect } from "react-redux";
import { array, bool, func, string } from "prop-types";
import {
  addTodoThunk,
  handleTodoInput,
  handleTodoPlaceholder,
  toggleAddTodoField
} from "../../store/appSlice";
import Input from "./Input";
import getUserObjFromArr from "../../helpers/getUserObjFromArr";

function InputContainer(props) {
  const {
    userID,
    allToDoes,
    todoInput,
    todoPlaceholder,
    isAddTodoFieldOpen,
    handleInput,
    toggleInputField,
    changePlaceholder,
    addToDoThunk
  } = props;

  const toDoesObj = useCallback(() => {
    return getUserObjFromArr(allToDoes);
  }, [allToDoes.length]);

  function addTodo() {
    addToDoThunk(userID, todoInput, toDoesObj());
  }

  return <Input
    todoInput={todoInput}
    todoPlaceholder={todoPlaceholder}
    isAddTodoFieldOpen={isAddTodoFieldOpen}
    handleInput={handleInput}
    toggleInputField={toggleInputField}
    changePlaceholder={changePlaceholder}
    addTodo={addTodo}
  />;
}

function mapStateToProps(state) {
  return {
    todoInput: state.app.todoInput,
    todoPlaceholder: state.app.todoPlaceholder,
    isAddTodoFieldOpen: state.app.isAddTodoFieldOpen
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInput: (text) => {
      dispatch(handleTodoInput(text));
    },
    toggleInputField: (val) => {
      dispatch(toggleAddTodoField(val));
    },
    addToDoThunk: (userID, todoInput, toDoesObj) => {
      dispatch(addTodoThunk({ userID, todoInput, toDoesObj }));
    },
    changePlaceholder: (text) => {
      dispatch(handleTodoPlaceholder(text));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InputContainer);

InputContainer.defaultProps = {
  userID: "",
  allToDoes: [],
  todoInput: "",
  todoPlaceholder: "",
  isAddTodoFieldOpen: false,
  handleInput: () => {},
  toggleInputField: () => {},
  changePlaceholder: () => {},
  addToDoThunk: () => {}
};

InputContainer.propTypes = {
  userID: string,
  allToDoes: array,
  todoInput: string,
  todoPlaceholder: string,
  isAddTodoFieldOpen: bool,
  handleInput: func,
  toggleInputField: func,
  changePlaceholder: func,
  addToDoThunk: func
};