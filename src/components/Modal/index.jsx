import { useState } from 'react';
import { modalStyles } from './styles';

const Modal = ({ isOpen, onClose, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  if (!isOpen) return null;

  const getCloseButtonStyle = () => {
    if (isActive) return { ...modalStyles.closeButton, ...modalStyles.closeButtonActive };
    if (isHovered) return { ...modalStyles.closeButton, ...modalStyles.closeButtonHover };
    return modalStyles.closeButton;
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.container}>
        <button
          style={getCloseButtonStyle()}
          onClick={onClose}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
        >
          ✖
        </button>
        <div style={modalStyles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
