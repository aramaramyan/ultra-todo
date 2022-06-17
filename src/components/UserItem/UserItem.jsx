import { string, bool } from "prop-types";
import { useDispatch } from "react-redux";
import { handleModal } from "../../store/appSlice";
import "./UserItem.scss";

export default function UserItem({ fullName, isBlue }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(handleModal(true));
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
  fullName: '',
  isBlue: false,
};

UserItem.propTypes = {
  fullName: string,
  isBlue: bool,
};