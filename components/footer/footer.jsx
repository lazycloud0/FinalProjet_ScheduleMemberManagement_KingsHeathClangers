"use client";
import React, { useState } from "react";
import styles from "./footer.module.css";

import FacebookLogo2 from "../logos/facebookLogo2.jsx";
import InstagramLogo2 from "../logos/instagramLogo2.jsx";
import YoutubeLogo2 from "../logos/youtubeLogo2.jsx";

export default function Footer() {
  return (
    <div className={styles.footerMenu}>
      <div className={styles.container}>
        <div className={styles.footerIcons}>
          <a
            href="https://www.facebook.com/profile.php?id=61558708410607"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logos}
          >
            <FacebookLogo2 className={styles.socialIconY} />
          </a>
          <a
            href="https://www.youtube.com/@khclangers"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logos}
          >
            <YoutubeLogo2 className={styles.socialIconY} />
          </a>
          <a
            href="https://www.instagram.com/khclangers/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logos}
          >
            <InstagramLogo2 className={styles.socialIconY} />
          </a>
        </div>
        {/* <div className={styles.legalStuff}>
          <h6>Legal Stuff</h6>

          <h6>Privacy Policy</h6>

          <h6>SiteMap</h6>

          <h6>Contact</h6>
        </div> */}
        <div className={styles.copyright}>
          <h6> &copy; 2024 Kings Heath Clangers</h6>
        </div>
      </div>
    </div>
  );
}









