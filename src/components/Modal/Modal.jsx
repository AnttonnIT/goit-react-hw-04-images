import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { StyledOverlay } from './Modal.styled';

export function Modal({ url, tags, onClose }) {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  const handleOverlayClick = ({ currentTarget, target }) => {
    if (currentTarget !== target) {
      return;
    }
    onClose();
  };

  return (
    <StyledOverlay className="overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <img src={url} alt={tags} />
      </div>
    </StyledOverlay>
  );
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
