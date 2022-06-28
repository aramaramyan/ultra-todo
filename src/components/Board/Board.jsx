import { array, bool } from "prop-types";
import AddUserContainer from "../AddUser/AddUserContainer";
import ModalContainer from "../Modal/ModalContainer";
import UserItemContainer from "../UserItem/UserItemContainer";
import Loader from "../Loader/Loader";
import banIcon from "../../icons/ban.svg";
import "./Board.scss";

export default function Board({ users, isModalOpen, isBoardLoading }) {
  return (
    <div className="board">
      <div className={isModalOpen ? "board__body modal-open" : "board__body"}>
        <div className="board__header">
          <div className="board__title title">
            <p className="board__title_name">Name</p>
            <p className="board__title_rate">Completion rate(%)</p>
          </div>
        </div>
        <div className="board__list">
          {isBoardLoading ? <Loader /> : (
            users.length ? users.map(({ id, fullName, completed, toDoesArr }, i) => (
              <UserItemContainer
                key={id}
                id={id}
                fullName={fullName}
                completed={completed}
                toDoesLength={toDoesArr.length}
              />
            )) : (
              <div className="no-users">
                <img src={banIcon} alt="Ban Icon" />
                <p className="no-users__title title">There are no users</p>
              </div>
            )
          )}
        </div>
        <AddUserContainer />
      </div>
      {isModalOpen && <ModalContainer />}
    </div>
  );
}

Board.defaultProps = {
  users: [],
  isModalOpen: false,
  isBoardLoading: false,
};

Board.propTypes = {
  users: array,
  isModalOpen: bool,
  isBoardLoading: bool,
};