import { imagesV } from "../../src/app/carouselimages/carouselV.js";
import styles from "./carouselV.module.css";
import { useState } from "react";
import LeftArrow from "../logos/leftArrow.jsx";
import RightArrow from "../logos/rightArrow.jsx";

export default function CarouselVertical() {
  const [index, setIndex] = useState(0);

  function handleClick1() {
    if (index === 0) {
      setIndex(imagesV.length - 1);
    } else {
      setIndex(index - 1);
    }
  }
  function handleClick2() {
    if (index === imagesV.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }
  let images = imagesV[index];

  return (
    <div className={styles.slide_direction}>
      <img src={images} className={styles.images} />
      <div className={styles.arrowContainer}>
        <LeftArrow onClick={handleClick1} className={styles.leftButton} />
        <RightArrow onClick={handleClick2} className={styles.rightButton} />
      </div>
    </div>
  );
}
