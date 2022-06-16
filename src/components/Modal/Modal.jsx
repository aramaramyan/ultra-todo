import PropTypes from "prop-types";
import closeIcon from "../../icons/close.svg";
import "./Modal.scss";

export default function Modal({ closeModal }) {
  return (
    <div className="modal">
      <div className="modal__header">
        <div
          className="modal__close"
          onClick={closeModal}
          onKeyPress={closeModal}
          role="button"
          tabIndex={0}
        >
          <img src={closeIcon} alt="Close Icon" />
        </div>
      </div>
      <p className="modal__title title">To-do list for name</p>
      <div className="modal__list" />
    </div>
  );
}

Modal.propTypes = {
  // eslint-disable-next-line react/require-default-props
  closeModal: PropTypes.func
};