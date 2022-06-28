import { object, bool, func } from "prop-types";
import InputContainer from "../Input/InputContainer";
import ToDoItem from "../ToDoItem/ToDoItem";
import Loader from "../Loader/Loader";
import closeIcon from "../../icons/close.svg";
import deleteUserIcon from "../../icons/delleteUser.svg";
import "./Modal.scss";
import ToDoItemContainer from "../ToDoItem/ToDoItemContainer";

export default function Modal(props) {
  const {
    currentUser,
    isModalLoading,
    closeModal,
    deleteUser
  } = props;

  return (
    <div className="modal">
      <div className="modal__header">
        <InputContainer
          userID={currentUser.id}
          allToDoes={currentUser.toDoesArr}
        />
        <div
          className="modal__close"
          onClick={closeModal}
          onKeyPress={closeModal}
          role="button"
          tabIndex={0}
        >
          <img src={closeIcon} alt="Close Icon" />
        </div>
      </div>
      <div className="modal__current-user">
        <p className="modal__current-user_title title">To-do list for {currentUser.fullName}</p>
        <div className="modal__current-user_delete" onClick={deleteUser}>
          <p>Delete User</p>
          <img src={deleteUserIcon} alt="Delete User Icon" />
        </div>
      </div>
      <div className="modal__list">
        {isModalLoading ? <Loader /> : (
          currentUser.toDoesArr.map((todo) => {
            return (
              <ToDoItemContainer
                key={todo.id}
                userID={currentUser.id}
                todo={todo}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

Modal.defaultProps = {
  currentUser: {},
  isModalLoading: false,
  closeModal: () => {},
  deleteUser: () => {}
};

Modal.propTypes = {
  currentUser: object,
  isModalLoading: bool,
  closeModal: func,
  deleteUser: func
};