import { useRef } from "react";
import { string, func, bool } from "prop-types";
import checkIcon from "../../icons/check.svg";
import plusIcon from "../../icons/plus.svg";
import "./AddUser.scss";

export default function AddUser(props) {
  const {
    addUserInput,
    isAddUserFieldOpen,
    handleInput,
    addUserPlaceHolder,
    // handlePlaceholder,
    toggleField
  } = props;

  const inputRef = useRef(null);

  function onInputChange(evt) {
    handleInput(evt.target.value, isAddUserFieldOpen);
  }

  function handleOpen() {
    toggleField(true);
    inputRef.current.focus();
  }

  // function submitUser(evt) {
  //   evt.preventDefault();
  //   if (state.trim()) {
  //     setState("");
  //     setPlaceHolder("Add new user");
  //     const userID = getID();
  //     dispatch(handleBoardLoading(true));
  //
  //     addUser(userID, state).then(() => {
  //       const user = {
  //         id: userID,
  //         fullName: state,
  //         toDoesArr: [],
  //         completed: 0
  //       };
  //
  //       dispatch(addUserLocal(user));
  //       dispatch(handleBoardLoading(false));
  //     });
  //     handleOpen();
  //   } else {
  //     setPlaceHolder("Please fill the input");
  //   }
  // }

  return (
    <div className="add-user">
      <div className="add-user__input">
        <div className="input">
          <form className={isAddUserFieldOpen ? "input__field input-open title" : "input__field"}>
            <input
              ref={inputRef}
              className={isAddUserFieldOpen ? "input__field input-open title" : "input__field"}
              type="text"
              value={addUserInput}
              placeholder={addUserPlaceHolder}
              onChange={onInputChange}
            />
            {isAddUserFieldOpen ? (
              // onClick={submitUser}
              <div className="input__button add-user__input_button">
                <img src={checkIcon} alt="Check Icon" />
              </div>
            ) : (
              <div className="input__button add-user__input_button" onClick={handleOpen}>
                <img src={plusIcon} alt="Plus Icon" />
              </div>
            )}
            <p className="title">Add new user</p>
          </form>
        </div>
      </div>
    </div>
  );
}

AddUser.defaultProps = {
  addUserInput: "",
  isAddUserFieldOpen: false,
  addUserPlaceHolder: "",
  handleInput: () => {},
  toggleField: () => {},
};

AddUser.propTypes = {
  addUserInput: string,
  isAddUserFieldOpen: bool,
  addUserPlaceHolder: string,
  handleInput: func,
  toggleField: func
};
