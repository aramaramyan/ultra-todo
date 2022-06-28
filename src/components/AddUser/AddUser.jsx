import { useRef } from "react";
import { string, func, bool } from "prop-types";
import getID from "../../helpers/getID";
import checkIcon from "../../icons/check.svg";
import plusIcon from "../../icons/plus.svg";
import "./AddUser.scss";

export default function AddUser(props) {
  const {
    addUser,
    handleInput,
    toggleField,
    addUserInput,
    handlePlaceholder,
    addUserPlaceHolder,
    isAddUserFieldOpen
  } = props;

  const inputRef = useRef(null);

  function onInputChange(evt) {
    handleInput(evt.target.value, isAddUserFieldOpen);
  }

  function handleOpen() {
    toggleField(true);
    inputRef.current.focus();
  }

  function submitUser(evt) {
    evt.preventDefault();

    if (addUserInput.trim()) {
      const userID = getID();
      const payload = {
        userID,
        fullName: addUserInput
      };

      addUser(payload);
    } else {
      handlePlaceholder("Please fill the input");
    }
  }

  return (
    <div className="add-user">
      <div className="add-user__input">
        <div className="input">
          <form className={isAddUserFieldOpen ? "input__field input-open title" : "input__field"} onSubmit={submitUser}>
            <input
              ref={inputRef}
              className={isAddUserFieldOpen ? "input__field input-open title" : "input__field"}
              type="text"
              value={addUserInput}
              placeholder={addUserPlaceHolder}
              onChange={onInputChange}
            />
            {isAddUserFieldOpen ? (
              <div className="input__button add-user__input_button" onClick={submitUser}>
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
  addUserPlaceHolder: "",
  isAddUserFieldOpen: false,
  handleInput: () => {},
  toggleField: () => {},
  addUser: () => {},
  handlePlaceholder: () => {}
};

AddUser.propTypes = {
  addUserInput: string,
  addUserPlaceHolder: string,
  isAddUserFieldOpen: bool,
  handleInput: func,
  toggleField: func,
  addUser: func,
  handlePlaceholder: func
};
