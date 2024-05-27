//The header component contains the navigation bar for the website
"use client";
import React, { useState } from "react";
import styles from "./header.module.css";
import Smalllogo from "../logos/smallLogo.jsx";
import Link from "next/link";

//The header component
export default function Header() {
  //State to manage the menu open and close
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //Function to close menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    //The ul contains the navigation links and the hamburger icon
    //the navmenu uses state to determine if it should be active(in view) or not
    //The hamburger icon uses the onClick event listener and state to determine if it should look like a burger or a cross
    //When the hamburger icon is clicked, the state is toggled to show or hide the navigation links
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Smalllogo className={styles.navbranding} />

        <ul className={`${styles.navmenu} ${isMenuOpen ? styles.active : ""}`}>
          <li className={styles.navitem}>
            <Link
              href="./"
              passHref
              className={`${styles.navlink}`}
              onClick={handleLinkClick}
            >
              Home
            </Link>
          </li>
          <li className={styles.navitem}>
            <Link
              href="/about"
              passHref
              className={styles.navlink}
              onClick={handleLinkClick}
            >
              About
            </Link>
          </li>
          <li className={styles.navitem}>
            <Link
              href="/whatson"
              passHref
              className={styles.navlink}
              onClick={handleLinkClick}
            >
              {"What's On"}
            </Link>
          </li>
          <li className={styles.navitem}>
            <a
              href="https://kingsheathclangers.godaddysites.com/ols/products/clangers-t-shirt"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navlink}
              onClick={handleLinkClick}
            >
              Merch
            </a>
          </li>
          <li className={styles.navitem}>
            <Link
              href="/contact"
              passHref
              className={styles.navlink}
              onClick={handleLinkClick}
            >
              Contact
            </Link>
          </li>
          <li className={styles.navitem}>
            <Link
              href="/login"
              passHref
              className={styles.navlink}
              onClick={handleLinkClick}
            >
              Login
            </Link>
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
