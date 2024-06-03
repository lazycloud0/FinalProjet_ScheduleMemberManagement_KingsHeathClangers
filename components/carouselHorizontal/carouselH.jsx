"use client";
import imagesH from "../../src/app/carouselimages/carouselH.js";

import styles from "./carouselH.module.css"; // Indicates this script runs on the client side

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CarouselHorizontal = ({ images = [imagesH] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1,
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return <div>No images to display</div>;
  }

  return (
    <div className={styles.carousel}>
      <img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
      />
      <div className="slide_direction">
        <div className="left" onClick={handlePrevious}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 96 960 960"
            width="20"
          >
            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
          </svg>
        </div>
        <div className="right" onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 96 960 960"
            width="20"
          >
            <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
          </svg>
        </div>
      </div>
      <div className="indicator">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CarouselHorizontal;
