import React from "react";
import './index.css'

const AlbumImages = ({ images }) => {
  return <div className="images-layout">
    {images.map(image =>
      <div key={image.name} className="images-item">
        <img className="images-image" alt={`${'assets-'+ image?.name}`} src={image?.src} />
        <span className="images-text">{image.name}</span>
      </div>)
    }
  </div>
}

export default AlbumImages