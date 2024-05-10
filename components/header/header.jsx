//The header component contains the navigation bar for the website

"use client";
import React, { useState } from "react";
import styles from "./header.module.css";
import Smalllogo from "../logos/smallLogo.jsx";
import Link from "next/link";

//tThe header component
export default function Header() {
  //State to manage the menu open and close
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    //The ul contains the navigation links and the hamburger icon
    //the navmenu uses state to determine if it should be active(in view) or not
    //The hamburger icon uses the onClick event listener and state to determine if it should look like a burger or a cross
    //When the hamburger icon is clicked, the state is toggled to show or hide the navigation links
    <header className={`${styles.container} ${styles.header}`}>
      <nav className={styles.navbar}>
        <Smalllogo className={styles.navbranding} />

        <ul className={`${styles.navmenu} ${isMenuOpen ? styles.active : ""}`}>
          <li className={styles.navitem}>
            <a href="#" className={`${styles.navlink}`}>
              Home
            </a>
          </li>
          <li className={styles.navitem}>
            <a href="#" className={`${styles.navlink}`}>
              {"What's On"}
            </a>
          </li>
          <li className={styles.navitem}>
            <a href="#" className={`${styles.navlink}`}>
              About
            </a>
          </li>
          <li className={styles.navitem}>
            <a href="#" className={`${styles.navlink}`}>
              Contact
            </a>
          </li>
        </ul>
        <div
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </nav>
    </header>
  );
}
