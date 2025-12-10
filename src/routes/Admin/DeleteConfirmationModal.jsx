import './DeleteConfirmationModal.scss';

const DeleteConfirmationModal = ({ count, onConfirm, onCancel }) => {
  return (
    <div className="delete-confirm-modal" onClick={onCancel}>
      <div className="delete-confirm-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="delete-confirm-modal__header">
          <h2>Confirm Deletion</h2>
        </div>

        <div className="delete-confirm-modal__body">
          <p>
            Are you sure you want to delete {count} {count === 1 ? 'record' : 'records'}?
          </p>
          <p className="delete-confirm-modal__warning">
            This action cannot be undone.
          </p>
        </div>

        <div className="delete-confirm-modal__footer">
          <button 
            className="delete-confirm-modal__button delete-confirm-modal__button--cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className="delete-confirm-modal__button delete-confirm-modal__button--confirm"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

