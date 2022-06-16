import watchIcon from "../../icons/watch.svg";
import "./ToDoItem.scss";

const todoTitle = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.";

  export default function ToDoItem() {
  return (
    <div className="todo">
      <div className="todo__content">
        <div className="todo__status">
          <img src={watchIcon} alt="Watch Icon" />
          <p className="todo__status_title title">Pending</p>
        </div>
        <p className="title">{todoTitle}</p>
      </div>
      <div className="todo__button">
        <p className="todo__button_title title">Mark as done</p>
      </div>
    </div>
  );
}