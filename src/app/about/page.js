import React from "react";
import styles from "./about.module.css";
import AboutPage from "/components/aboutpage/aboutpage.jsx";

export default function About() {
  return (
    <div className={styles.aboutPage}>
      <AboutPage />
    </div>
  );
}
