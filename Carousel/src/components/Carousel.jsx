import React, { useEffect, useRef, useState } from "react";

const Carousel = ({
  images = [],
  isloading = false,
  imageLimit = images.length,
  customPrevButton,
  customNextButton,
  imgPerSlide = 5,
}) => {
  const imgRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  //   console.log(currentIndex);

  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(0);
    }
  }, [images]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageLimit - imgPerSlide : prevIndex - 1,
    );
  };
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= imageLimit - imgPerSlide ? 0 : prevIndex + 1,
    );
  };
  //   console.log(imgRef?.current?.offsetWidth); //Getting the image width before loading we may get undefined so we need to set the width after the image is loaded
  return isloading ? (
    <div>Loading...</div>
  ) : (
    <div className="carousel" style={{ width: imgPerSlide * imgWidth }}>
      <div
        className="image-container"
        style={{ transform: `translateX(-${currentIndex * imgWidth}px)` }}
      >
        {images
          .slice(0, imageLimit > images.length ? images.length : imageLimit)
          .map((image, index) => (
            <img
              onLoad={() => {
                setImgWidth(imgRef?.current?.offsetWidth);
                console.log(imgRef?.current?.offsetWidth);
              }}
              ref={imgRef}
              key={image.id}
              src={`https://picsum.photos/300/300?random=${image.id}`}
              alt={image.title}
              className="image"
            />
          ))}
      </div>
      {customPrevButton instanceof Function ? (
        customPrevButton(goToPrev)
      ) : (
        <button className="btn prev" onClick={goToPrev}>
          Prev
        </button>
      )}

      {customNextButton instanceof Function ? (
        customNextButton(goToNext)
      ) : (
        <button className="btn next" onClick={goToNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default Carousel;

//Blanks slides are appearning to remove that we have to replace check how far the index have to go. That will be determined by imageLimit-imgPerSlide
