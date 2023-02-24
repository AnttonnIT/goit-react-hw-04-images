import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledList } from './ImageGallery.styled';
import { useEffect } from 'react';

export const ImageGallery = ({ items, onClick }) => {
  useEffect(() => {
    if (items.length > 12) {
      scroll();
    }
  }, [items]);

  const scroll = () => {
    window.scrollBy({
      top: 260 * 2,
      behavior: 'smooth',
    });
  };
  return (
    <StyledList className="gallery">
      {items.length > 0 && (
        <ImageGalleryItem data={items} onClick={onClick}></ImageGalleryItem>
      )}
    </StyledList>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
