import { imagesH } from "../../src/app/carouselimages/carouselH.js";
import { altTextsH } from "../../src/app/carouselimages/carouselH.js";
import styles from "./carouselH.module.css";
import { useState } from "react";
import RightArrow from "../logos/rightArrow.jsx";
import LeftArrow from "../logos/leftArrow.jsx";

export default function CarouselHorizontal() {
  const [index, setIndex] = useState(0);

  function handleClick1() {
    if (index === 0) {
      setIndex(imagesH.length - 1);
    } else {
      setIndex(index - 1);
    }
  }
  function handleClick2() {
    if (index === imagesH.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }
  let images = imagesH[index];
  let altText = altTextsH[index];

  return (
    <div className={styles.slide_direction}>
      <img src={images} alt={altText} className={styles.images} />
      <div className={styles.arrowContainer}>
        <LeftArrow onClick={handleClick1} className={styles.leftButton} />
        <RightArrow onClick={handleClick2} className={styles.rightButton} />
      </div>
    </div>
  );
}
