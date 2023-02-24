import PropTypes from 'prop-types';
import { StyledListItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ data, onClick }) => {
  return (
    <>
      {data.map(item => {
        const { id, webformatURL, tags, largeImageURL } = item;

        return (
          <StyledListItem className="gallery-item" key={id}>
            <img
              src={webformatURL}
              alt={tags}
              onClick={() => {
                onClick(largeImageURL, tags);
              }}
            />
          </StyledListItem>
        );
      })}
    </>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
