import "./FormSuccessModal.css";

function FormSuccessModal({ message, buttonLabel, onClose }) {
  return (
    <div
      className="form-success-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-success-message"
    >
      <button
        type="button"
        className="form-success-modal__backdrop"
        onClick={onClose}
        aria-label="Close confirmation"
      />
      <div className="form-success-modal__dialog">
        <p id="form-success-message">{message}</p>
        <button type="button" className="btn btn-primary" onClick={onClose}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

export default FormSuccessModal;
