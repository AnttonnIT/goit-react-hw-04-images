import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32705196-edcafbc81cd9914a7a863be11';

export const getPhotos = async (q, page) => {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        per_page: 12,
        image_type: 'photo',
        orientation: 'horizontal',
        q,
        page,
      },
    });

    return data;
  } catch (error) {
    console.error(error.message);
  }
};
