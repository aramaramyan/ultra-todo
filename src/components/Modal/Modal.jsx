import { useDispatch, useSelector } from "react-redux";
import { handleModal, removeCurrentUser, deleteUserLocal, handleLoading } from "../../store/appSlice";
import useFirestore from "../../services/useFirestore";
import Input from "../Input/Input";
import ToDoItem from "../ToDoItem/ToDoItem";
import Loader from "../Loader/Loader";
import closeIcon from "../../icons/close.svg";
import deleteUserIcon from "../../icons/delleteUser.svg";
import "./Modal.scss";

export default function Modal() {
  const [currentUser] = useSelector((state) => state.app.currentUser);
  const isLoading = useSelector((state) => state.app.isLoading);
  const { deleteUser } = useFirestore();
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(handleModal(false));
    dispatch(removeCurrentUser());
  }

  function delUser() {
    dispatch(handleLoading(true));
    deleteUser(currentUser.id).then(() => {
      dispatch(deleteUserLocal(currentUser.id));
      dispatch(handleLoading(false));
    });
    closeModal();
  }

  return (
    <div className="modal">
      <div className="modal__header">
        <Input
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
        <div className="modal__current-user_delete" onClick={delUser}>
          <p>Delete User</p>
          <img src={deleteUserIcon} alt="Delete User Icon" />
        </div>
      </div>
      <div className="modal__list">
        {isLoading ? <Loader /> : (
          currentUser.toDoesArr.map((todo) => {
            return (
              <ToDoItem
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