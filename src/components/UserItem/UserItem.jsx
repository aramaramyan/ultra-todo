import { string, bool } from "prop-types";
import { useDispatch } from "react-redux";
import { handleModal, setCurrentUser } from "../../store/appSlice";
import "./UserItem.scss";

export default function UserItem({ id, fullName, isBlue }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(handleModal(true));
    dispatch(setCurrentUser(id));
  }

  return (
    <div
      className={isBlue ? "user-item alice-blue" : "user-item"}
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
  isBlue: false,
};

UserItem.propTypes = {
  id: string,
  fullName: string,
  isBlue: bool,
};