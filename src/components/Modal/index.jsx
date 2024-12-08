import { modalStyles } from './styles';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.container}>
        <button style={modalStyles.closeButton} onClick={onClose}>
          ✖
        </button>
        <div style={modalStyles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
