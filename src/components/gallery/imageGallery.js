import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { domain, image_url } from '../../api/domain';

const MyImageGallery = ({ data }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setImages(data.map(item => ({
        original: image_url + item?.image,
        thumbnail: image_url + item?.image,
      })));
    }
  }, [data]);

  return (
    <div>
      {images && (
        <ImageGallery
          items={images}
          // showThumbnails={true}
          // showFullscreenButton={false}
          thumbnailPosition="left"
        // showIndex={false}
        // autoPlay={false}
        infinite={true}
        // disableSwipe={true}
        disableThumbnailSwipe={false}
        // disableThumbnailScroll={false}
        // slideOnThumbnailOver={true}
        // stopPropagation={true}
        />
      )}
    </div>
  );
};

export default MyImageGallery;