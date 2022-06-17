import { useDispatch, useSelector } from "react-redux";
import { handleModal, removeCurrentUser } from "../../store/appSlice";
import Input from "../Input/Input";
import ToDoItem from "../ToDoItem/ToDoItem";
import closeIcon from "../../icons/close.svg";
import "./Modal.scss";

export default function Modal() {
  const [currentUser] = useSelector((state) => state.app.currentUser);
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(handleModal(false));
    dispatch(removeCurrentUser());
  }

  return (
    <div className="modal">
      <div className="modal__header">
        <Input />
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
      <p className="modal__title title">To-do list for {currentUser.fullName}</p>
      <div className="modal__list">
        <ToDoItem />
      </div>
    </div>
  );
}