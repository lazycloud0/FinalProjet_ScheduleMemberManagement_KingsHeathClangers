"use client"
import React, { useState} from 'react';
import styles from './header.module.css'
import Link from 'next/link';

export default function Header() {

const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
       <nav className={styles.navbar} >
        <a href="#" className={styles.navbranding}>Logo</a>

        <ul className={`${styles.navmenu} ${isMenuOpen ? styles.active : ''}`}>
          <li className={styles.navitem}>
            <a href="#" className={styles.navlink}>Shop</a>
          </li>
          <li className={styles.navitem}>
            <a href="#" className={styles.navlink}>About</a>
          </li>
          <li className={styles.navitem}>
            <a href="#" className={styles.navlink}>Work</a>
          </li>
          <li className={styles.navitem}>
            <a href="#" className={styles.navlink}>Contact</a>
          </li>
          <li className={styles.navitem}>
            <a href="#" className={styles.navlink}>Socials</a>
          </li>
          <li className={styles.navitem}>
            <a href="#" className={styles.navlink}>Cart</a>
          </li>
        </ul>
        <div className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
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

