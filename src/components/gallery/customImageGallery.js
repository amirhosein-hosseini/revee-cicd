import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './ImageGallery.module.css';

const CustomImageGallery = ({ data }) => {
  const [images , setImages] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);


  useEffect(() => {
    setImages(data?.map(item => (item?.image)));
  } , [])


  console.log(data)

  const handlePrevious = () => {
    setSelectedIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) => 
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <>
          {images &&
              <div className={styles.galleryContainer}>
                  <div className={styles.thumbnailContainer}>
                      {images?.map((image, index) => (
                          <div
                              key={index}
                              className={`${styles.thumbnail} ${index === selectedIndex ? styles.selected : ''}`}
                              onClick={() => setSelectedIndex(index)}
                          >
                              <img
                                  src={image}
                                  alt={image}
                                  width={50}
                                  height={50}
                                  objectFit="cover"
                              />
                          </div>
                      ))}
                  </div>
                  <div className={styles.mainImageContainer}>
                      <img
                          src={images[selectedIndex]}
                          alt={images[selectedIndex]}
                          layout="responsive"
                          width={800}
                          height={600}
                      />
                      <button className={`${styles.scrollButton} ${styles.prevButton}`} onClick={handlePrevious}>
                          &#8249;
                      </button>
                      <button className={`${styles.scrollButton} ${styles.nextButton}`} onClick={handleNext}>
                          &#8250;
                      </button>
                  </div>
              </div>
          }
    </>
    
  );
};

export default CustomImageGallery;