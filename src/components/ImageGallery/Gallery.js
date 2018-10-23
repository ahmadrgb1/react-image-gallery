import React from "react";
import ReactPaginate from "react-paginate";
import imageUrls from "../../data/index";
import ImageViewModal from "./ImageViewModal";
import plusIcon from "../../images/plus.png";
import "./Gallery.scss";

const PAGE_SIZE = 5;

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: imageUrls.slice(0, PAGE_SIZE),
      offset: 0,
      pageCount: imageUrls.length / PAGE_SIZE,
      selectedImage: null
    };
  }

  handleImageClick = selectedImage => {
    this.setState({ selectedImage });
  };

  renderImage(imageUrl) {
    return (
      <img
        key={imageUrl.id}
        src={imageUrl.url}
        className="gallery__image"
        alt="thumbnail"
        onClick={() => this.handleImageClick(imageUrl)}
      />
    );
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * PAGE_SIZE);
    this.setState({
      offset: offset,
      data: imageUrls.slice(offset, offset + PAGE_SIZE)
    });
  };

  closeModal = () => {
    this.setState({
      selectedImage: null
    });
  };

  handleAddImage = () => {
    imageUrls.push({
      id: imageUrls.length,
      url: "/fl1.jpg"
    });
    localStorage.setItem("imageUrls", JSON.stringify(imageUrls));
    const { offset } = this.state;
    this.setState({
      data: imageUrls.slice(offset, offset + PAGE_SIZE),
      pageCount: imageUrls.length / PAGE_SIZE
    });
  };

  handleDeleteImage = () => {
    imageUrls.splice(
      imageUrls.findIndex(item => item.id == this.state.selectedImage.id),
      1
    );
    localStorage.setItem("imageUrls", JSON.stringify(imageUrls));
    this.setState({
      selectedImage: null,
      data: [],
      offset: 0,
      pageCount: imageUrls.length / PAGE_SIZE
    });

    setTimeout(() => {
      this.setState({ data: imageUrls.slice(0, PAGE_SIZE) });
    }, 100);
  };

  render() {
    const { data, pageCount, selectedImage } = this.state;
    return (
      <div className="gallery">
        <div className="text-align-right">
          <button className="gallery__add-btn" onClick={this.handleAddImage}>
            <img src={plusIcon} alt="" />
          </button>
        </div>

        {data.map(imageUrl => this.renderImage(imageUrl))}

        <ImageViewModal
          selectedImage={selectedImage}
          closeModal={this.closeModal}
          handleDeleteImage={this.handleDeleteImage}
        />

        <div className="text-align-center">
          {data.length && (
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={<a href="">...</a>}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Gallery;
