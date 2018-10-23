import Modal from "react-modal";
import trashIcon from "../../images/trash.png";
import React from "react";

const ImageViewModal = ({selectedImage, closeModal, handleDeleteImage}) => {
  return (
    <Modal
      isOpen={selectedImage ? true : false}
      onRequestClose={closeModal}
      contentLabel="Image View Modal"
    >
      <div className="text-align-right">
        <button onClick={handleDeleteImage}>
          <img src={trashIcon} alt="" />
        </button>
      </div>
      <div className="gallery__img-wrap">
        {selectedImage && (
          <img
            src={selectedImage.url}
            className="gallery__preview-image"
            alt=""
            data-testid="gallery-image-view-modal"
          />
        )}
      </div>
    </Modal>
  );
};

export default ImageViewModal;
