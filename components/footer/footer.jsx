"use client";
import React, { useState } from "react";
import styles from "./footer.module.css";
import Link from "next/link";
import FacebookLogo from "../logos/facebookLogo.jsx";
import InstagramLogo from "../logos/instagramLogo.jsx";
import YoutubeLogo from "../logos/youtubeLogo.jsx";

export default function Footer() {
  return (
    <div className={styles.footerMenu}>
      <div className={styles.container}>
        <div className={styles.footerIcons}>
          <FacebookLogo className={styles.socialIcon} />
          <YoutubeLogo className={styles.socialIconY} />
          <InstagramLogo className={styles.socialIcon} />
        </div>
        <div className={styles.copyright}>
          <h4>Kings Heath Clangers Community Basketball Club</h4>
          <h6>Copyright &copy; 2024 Kings Heath Clangers</h6>
        </div>
        <div className={styles.legalStuff}>
          <h6>Legal Stuff</h6>

          <h6>Privacy Policy</h6>

          <h6>SiteMap</h6>

          <h6>Contact</h6>
        </div>
      </div>
    </div>
  );
}
