import { string } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { handleModal, setCurrentUser } from "../../store/appSlice";
import "./UserItem.scss";

export default function UserItem({ id, fullName }) {
  const [currentUser] = useSelector((state) => state.app.currentUser) ?? [];
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(handleModal(true));
    dispatch(setCurrentUser(id));
  }

  return (
    <div
      className={`user-item ${currentUser?.id === id ? 'current-user' : ''}`}
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      tabIndex={0}
    >
      <p className="user-item__title title">{fullName}</p>
      <p className="user-item__rate title">0</p>
    </div>
  );
}

UserItem.defaultProps = {
  id: "",
  fullName: "",
};

UserItem.propTypes = {
  id: string,
  fullName: string,
};