import { useState } from "react";
import { useDispatch } from "react-redux";
import useFirestore from "../../services/useFirestore";
import { addUserLocal, handleLoading } from "../../store/appSlice";
import getID from "../../helpers/getID";
import checkIcon from "../../icons/check.svg";
import plusIcon from "../../icons/plus.svg";
import "./AddUser.scss";

export default function AddUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("");
  const [placeHolder, setPlaceHolder] = useState("Add new user");
  const { addUser } = useFirestore();
  const dispatch = useDispatch();

  function handleInput(evt) {
    setState(evt.target.value);
  }

  function handleOpen() {
    setIsOpen((prev) => !prev);
  }

  function submitUser() {
    if (state.trim()) {
      setState("");
      setPlaceHolder("Add new user");
      const userID = getID();
      dispatch(handleLoading(true));

      addUser(userID, state).then(() => {
        const user = {
          id: userID,
          fullName: state,
          toDoesArr: [],
          completed: 0
        };

        dispatch(addUserLocal(user));
        dispatch(handleLoading(false));
      });
      handleOpen();
    } else {
      setPlaceHolder("Please fill the input");
    }
  }

  return (
    <div className="add-user">
      <div className="add-user__input">
        <div className="input">
          <input
            className={isOpen ? "input__field input-open title" : "input__field"}
            type="text"
            value={state}
            placeholder={placeHolder}
            onChange={handleInput}
          />
          {isOpen ? (
            <div className="input__button add-user__input_button" onClick={submitUser}>
              <img src={checkIcon} alt="Check Icon" />
            </div>
          ) : (
            <div className="input__button add-user__input_button" onClick={handleOpen}>
              <img src={plusIcon} alt="Plus Icon" />
            </div>
          )}
          <p className="title">Add new user</p>
        </div>
      </div>
    </div>
  );
}
