import React from "react";
import AboutPage from "/components/aboutpage/aboutpage.jsx";
import styles from "./about.module.css";
//random
export default function About() {
  return (
    <div className={styles.aboutPageContainer}>
      <AboutPage />
    </div>
  );
}
