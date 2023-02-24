import { useState, useEffect } from 'react';
import { getPhotos } from 'utils/API';
import { Wrapper } from './App.styled';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './Loader/Loader';

export function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');
  const [total, setTotal] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }

    const getItems = async () => {
      try {
        setLoader(true);

        const { hits, total } = await getPhotos(query, page);

        setItems(items => [...items, ...hits]);
        setTotal(total);

        if (total === 0) {
          notify(query);
        }
      } catch (error) {
        errorInfo(error.message);
      } finally {
        setLoader(false);
        if (page > 1) {
          scroll();
        }
      }
    };

    getItems();
  }, [query, page]);

  const handleSubmit = formQuery => {
    if (formQuery === query) return;

    setQuery(formQuery);

    setPage(1);
    setItems([]);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  const closeModal = () => {
    setUrl('');
    setTags('');
  };

  const clickImage = (url, tags) => {
    setUrl(url);
    setTags(tags);
  };

  const notify = message => {
    toast.warning(`Oops, "${message}" pictures were not found.`);
  };

  const errorInfo = message => {
    toast.error(`Oops, something went wrong: ${message}`);
  };

  const scroll = () => {
    window.scrollBy({
      top: 260 * 2,
      behavior: 'smooth',
    });
  };

  const showLoadMore = page < Math.ceil(total / 12);
  return (
    <Wrapper>
      <Searchbar onSubmit={handleSubmit}></Searchbar>

      <ImageGallery items={items} onClick={clickImage}></ImageGallery>

      {loader && <Loader></Loader>}

      {showLoadMore && <Button onClick={loadMore}></Button>}

      {url.length > 0 && (
        <Modal tags={tags} url={url} onClose={closeModal}></Modal>
      )}

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Wrapper>
  );
}
