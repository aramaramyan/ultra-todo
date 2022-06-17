import { string, bool } from "prop-types";
import watchIcon from "../../icons/watch.svg";
import checkIcon from "../../icons/check.svg";
import "./ToDoItem.scss";

export default function ToDoItem({ title, isDone }) {
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
      <div className="todo__button">
        <p className="todo__button_title">Mark as done</p>
      </div>
    </div>
  );
}

ToDoItem.defaultProps = {
  title: "",
  isDone: false,
};

ToDoItem.propTypes = {
  title: string,
  isDone: bool,
};