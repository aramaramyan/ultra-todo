import { useState } from "react";
import plusIcon from "../../icons/plus.svg";
import checkIcon from "../../icons/check.svg";
import "./Input.scss";

export default function Input() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("");
  const [placeHolder, setPlaceHolder] = useState("New to-do description");

  function handleInput(evt) {
    setState(evt.target.value);
  }

  function handleOpen() {
    setIsOpen(!isOpen);
  }

  function submitToDo() {
    if (state.trim()) {
      setState("");
      setPlaceHolder("New to-do description");
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