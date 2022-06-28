import { number, string, object, func } from "prop-types";
import "./UserItem.scss";

export default function UserItem(props) {
  const {
    id,
    fullName,
    currentUser,
    completionRate,
    handleClick
  } = props;

  return (
    <div
      className={`user-item ${currentUser?.id === id ? 'current-user' : ''}`}
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      tabIndex={0}
    >
      <p className="user-item__title title">{fullName}</p>
      <p className="user-item__rate title">{completionRate || 0}</p>
    </div>
  );
}

UserItem.defaultProps = {
  id: "",
  fullName: "",
  currentUser: {},
  completionRate: 0,
  handleClick: () => {}
};

UserItem.propTypes = {
  id: string,
  fullName: string,
  currentUser: object,
  completionRate: number,
  handleClick: func
};