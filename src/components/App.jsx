import { Component } from 'react';
import { getPhotos } from 'utils/API';
import { Wrapper } from './App.styled';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './Loader/Loader';
import React, { Component } from 'react';

export class App extends Component {
  state = {
    items: [],
    query: '',
    page: 1,
    loader: false,
    url: '',
    total: 0,
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getItems();
    }
  }
  handleSubmit = query => {
    if (query === this.state.query) return;
    this.setState({
      query,
      page: 1,
      items: [],
    });
  };

  getItems = async () => {
    try {
      this.loader();
      const { query, page } = this.state;

      const { hits, total } = await getPhotos(query, page);

      this.setState(({ items }) => ({
        items: [...items, ...hits],
        total,
      }));
      if (total === 0) {
        this.notify(query);
      }
    } catch (error) {
      this.errorInfo(error.message);
    } finally {
      this.setState({ loader: false }, () => {
        if (this.state.page > 1) {
          this.scroll();
        }
      });
    }
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  loader = () => {
    this.setState(({ loader }) => ({
      loader: !loader,
    }));
  };

  closeModal = () => {
    this.setState(({ url, tags }) => ({
      url: '',
      tags: '',
    }));
  };

  clickImage = (url, tags) => {
    this.setState({ url, tags });
  };

  notify = message => {
    toast.warning(`Oops, "${message}" pictures were not found.`);
  };

  errorInfo = message => {
    toast.error(`Oops, something went wrong: ${message}`);
  };

  scroll = () => {
    window.scrollBy({
      top: 260 * 2,
      behavior: 'smooth',
    });
  };

  render() {
    const { items, loader, url, page, total, tags } = this.state;
    const showLoadMore = page < Math.ceil(total / 12);

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>

        <ImageGallery items={items} onClick={this.clickImage}></ImageGallery>

        {loader && <Loader></Loader>}

        {showLoadMore && <Button onClick={this.loadMore}></Button>}

        {url.length > 0 && (
          <Modal tags={tags} url={url} onClose={this.closeModal}></Modal>
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
}
