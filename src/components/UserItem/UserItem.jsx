import { string, number, bool, func } from "prop-types";
import "./UserItem.scss";

export default function UserItem({ fullName, rate, isBlue, openModal }) {
  return (
    <div
      className={isBlue ? "user-item alice-blue" : "user-item"}
      onClick={openModal}
      onKeyPress={openModal}
      role="button"
      tabIndex={0}
    >
      <p className="user-item__title title">{ fullName}</p>
      <p className="user-item__rate title">{rate}</p>
    </div>
  );
}

UserItem.defaultProps = {
  fullName: '',
  rate: 0,
  isBlue: false,
  openModal: () => {}
};

UserItem.propTypes = {
  fullName: string,
  rate: number,
  isBlue: bool,
  openModal: func
};