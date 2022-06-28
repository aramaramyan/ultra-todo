import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { number, string, func, array } from "prop-types";
import UserItem from "./UserItem";
import { handleModal, setCurrentUser } from "../../store/appSlice";

function UserItemContainer(props) {
  const {
    id,
    fullName,
    completed,
    toDoesLength,
    currentUserIndex,
    users,
    openUserModal
  } = props;

  const currentUser = users[currentUserIndex];
  const [completionRate, setCompletionRate] = useState(0);

  useEffect(() => {
    setCompletionRate(Math.floor((completed / toDoesLength) * 100));
  }, [completed, toDoesLength]);

  function handleClick() {
    openUserModal(id);
  }

  return <UserItem
    id={id}
    fullName={fullName}
    currentUser={currentUser}
    completionRate={completionRate}
    handleClick={handleClick}
  />;
}

function mapStateToProps(state) {
  return {
    users: state.app.users,
    currentUserIndex: state.app.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openUserModal: (id) => {
      dispatch(handleModal(true));
      dispatch(setCurrentUser(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItemContainer);

UserItemContainer.defaultProps = {
  id: "",
  fullName: "",
  completed: 0,
  toDoesLength: 0,
  currentUserIndex: 0,
  users: [],
  openUserModal: () => {}
};

UserItemContainer.propTypes = {
  id: string,
  fullName: string,
  completed: number,
  toDoesLength: number,
  currentUserIndex: number,
  users: array,
  openUserModal: func
};