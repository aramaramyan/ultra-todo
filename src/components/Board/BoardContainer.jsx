import { useEffect } from "react";
import { connect } from "react-redux";
import { array, bool, func } from "prop-types";
import { getUsersThunk } from "../../store/appSlice";
import Board from "./Board";

function BoardContainer({ users, isModalOpen, isBoardLoading, getUsers }) {
  useEffect(() => {
    getUsers();
  }, []);

  return <Board
    users={users}
    isModalOpen={isModalOpen}
    isBoardLoading={isBoardLoading}
  />;
}

function mapStateToProps(state) {
  return {
    users: state.app.users,
    isModalOpen: state.app.isModalOpen,
    isBoardLoading: state.isBoardLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => {
      dispatch(getUsersThunk());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);

BoardContainer.defaultProps = {
  users: [],
  isModalOpen: false,
  isBoardLoading: false,
  getUsers: () => {},
};

BoardContainer.propTypes = {
  users: array,
  isModalOpen: bool,
  isBoardLoading: bool,
  getUsers: func,
};