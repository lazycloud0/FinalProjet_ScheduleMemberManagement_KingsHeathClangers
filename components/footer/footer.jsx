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
        <h2>Kings Heath Clangers Community Basketball Club</h2>
        <h5>
          Copyright &copy; 2024 Kings Heath Clangers Community Basketball Club
        </h5>
      </div>
      <div className={styles.legalStuff}>
        <div>Legal Stuff</div>
        
        <div>Privacy Policy</div>
       
        <div>SiteMap</div>
      
        <div>Contact</div>
      </div>
      </div>
    </div>
  );
}
