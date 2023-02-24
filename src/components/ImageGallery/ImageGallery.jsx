import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledList } from './ImageGallery.styled';

export const ImageGallery = ({ items, onClick }) => {
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
