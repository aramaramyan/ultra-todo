import { useDispatch, useSelector } from "react-redux";
import { object, string } from "prop-types";
import useFirestore from "../../services/useFirestore";
import { handleLoading } from "../../store/appSlice";
import watchIcon from "../../icons/watch.svg";
import checkIcon from "../../icons/check.svg";
import "./ToDoItem.scss";

export default function ToDoItem({ userID, todo }) {
  const { title, isDone } = todo;
  const isLoading = useSelector((state) => state.app.isLoading);
  const { handleStatus } = useFirestore();
  const dispatch = useDispatch();

  function changeStatus() {
    if (isDone) {
      dispatch(handleLoading(true));
      handleStatus(userID, todo, false, -1).then(() => {
        dispatch(handleLoading(false));
      });
    } else {
      dispatch(handleLoading(true));
      handleStatus(userID, todo, true, 1).then(() => {
        dispatch(handleLoading(false));
      });
    }
  }

  return (
    <div className="todo">
      <div className="todo__content">
        <div className={isDone ? "todo__status completed" : "todo__status"}>
          {isDone ?
            <img src={checkIcon} alt="Check Icon" />
            : <img src={watchIcon} alt="Watch Icon" />
          }
          <p className="todo__status_title">{isDone ? "Completed" : "Pending"}</p>
        </div>
        <p className="title">{title}</p>
      </div>
      <div className="todo__button" onClick={changeStatus}>
        <p className="todo__button_title">Mark as done</p>
      </div>
    </div>
  );
}

ToDoItem.defaultProps = {
  userID: "",
  todo: {}
};

ToDoItem.propTypes = {
  userID: string,
  todo: object
};