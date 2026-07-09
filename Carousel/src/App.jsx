import React, { useEffect, useState } from "react";
import Carousel from "./components/Carousel";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const fetchImages = async (imglimit) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=${imglimit}`,
      );
      const data = await response.json();
      // console.log(data);
      setImages(data);
    } catch (error) {
      console.error("Error fetching Images", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(8);
  }, []);
  return (
    <div className="carousel-container">
      <Carousel
        images={images}
        isloading={loading}
        imageLimit={8}
        // customPrevButton={}
        // customNextButton={}
        // imgPerSlide={}
      />
    </div>
  );
};

export default App;
