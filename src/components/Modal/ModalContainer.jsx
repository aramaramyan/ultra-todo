import { connect } from "react-redux";
import { number, array, bool, func } from "prop-types";
import Modal from "./Modal";
import { handleModal, removeCurrentUser, deleteUserThunk } from "../../store/appSlice";

function ModalContainer(props) {
  const {
    users,
    currentUserIndex,
    isModalLoading,
    closeModal,
    delUserThunk
  } = props;

  const currentUser = users[currentUserIndex];

  function deleteUser() {
    deleteUserThunk(currentUser.id);
  }

  return <Modal
    currentUser={currentUser}
    isModalLoading={isModalLoading}
    closeModal={closeModal}
    deleteUser={deleteUser}
  />;
}

function mapStateToProps(state) {
  return {
    users: state.app.users,
    currentUserIndex: state.app.currentUser,
    isModalLoading: state.app.isModalLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeModal: () => {
      dispatch(handleModal(false));
      dispatch(removeCurrentUser());
    },
    delUserThunk: (userID) => {
      dispatch(deleteUserThunk(userID));
    }
  };
}

export default connect()(ModalContainer);

ModalContainer.defaultProps = {
  users: [],
  currentUserIndex: 0,
  isModalLoading: false,
  closeModal: () => {},
  delUserThunk: () => {}
};

ModalContainer.propTypes = {
  users: array,
  currentUserIndex: number,
  isModalLoading: bool,
  closeModal: func,
  delUserThunk: func
};