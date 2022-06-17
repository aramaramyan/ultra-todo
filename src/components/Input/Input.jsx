import { useState } from "react";
import { useDispatch } from "react-redux";
import { string, array } from "prop-types";
import { addToDoLocal } from "../../store/appSlice";
import getID from "../../helpers/getID";
import useFirestore from "../../services/useFirestore";
import plusIcon from "../../icons/plus.svg";
import checkIcon from "../../icons/check.svg";
import "./Input.scss";

export default function Input({ userID, allToDoes }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("");
  const [placeHolder, setPlaceHolder] = useState("New to-do description");
  const dispatch = useDispatch();
  const { addToDo } = useFirestore();

  function handleInput(evt) {
    setState(evt.target.value);
  }

  function handleOpen() {
    setIsOpen((prev) => !prev);
  }

  function submitToDo() {
    if (state.trim()) {
      const todo = {
        id: getID(),
        title: state,
      };

      setState("");
      setPlaceHolder("New to-do description");

      addToDo(userID, todo, allToDoes).then(() => dispatch(addToDoLocal(todo)));
      handleOpen();
    } else {
      setPlaceHolder("Please fill the input");
    }
  }

  return (
    <div className="input">
      <input
        className={isOpen ? "input__field input-open title" : "input__field"}
        type="text"
        value={state}
        placeholder={placeHolder}
        onChange={handleInput}
      />
      {isOpen ? (
        <div className="input__button" onClick={submitToDo}>
          <img src={checkIcon} alt="Check Icon" />
        </div>
      ) : (
        <div className="input__button" onClick={handleOpen}>
          <img src={plusIcon} alt="Plus Icon" />
        </div>
      )}
    </div>
  );
}

Input.defaultProps = {
  userID: "",
  allToDoes: {},
};

Input.propTypes = {
  userID: string,
  allToDoes: array,
};