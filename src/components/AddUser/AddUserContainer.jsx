import { connect } from "react-redux";
import {
  handleAddUserInput,
  handleAddUserPlaceholder,
  toggleAddUserField
} from "../../store/appSlice";
import AddUser from "./AddUser";

function mapStateToProps(state) {
  return {
    addUserInput: state.app.addUserInput,
    isAddUserFieldOpen: state.app.isAddUserFieldOpen,
    addUserPlaceHolder: state.app.addUserPlaceHolder
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInput: (text, isAddUserFieldOpen) => {
      if (isAddUserFieldOpen) {
        dispatch(handleAddUserInput(text));
      }
    },
    handlePlaceholder: (text) => {
      dispatch(handleAddUserPlaceholder(text));
    },
    toggleField: (mode) => {
      dispatch(toggleAddUserField(mode));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);