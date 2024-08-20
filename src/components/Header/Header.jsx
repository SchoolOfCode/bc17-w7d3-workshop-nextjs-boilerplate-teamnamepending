"use client";
import styles from './Header.module.css';
import React, { useState } from 'react';

const Header = () => {
  // State to manage the visibility of the full-page menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>🔥 Fireplace Palace</h1>
        <span className={styles.menuIcon} onClick={toggleMenu}>
          &#9776;
        </span>
      </div>
      {isMenuOpen && (
        <div className={styles.fullPageMenu}>
          <span className={styles.closeIcon} onClick={toggleMenu}>
            &#10005;
          </span>-
          <nav className={styles.nav}>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <a href="/" className={styles.menuLink}>Home</a>
              </li>
              <li className={styles.menuItem}>
                <a href="/founder" className={styles.menuLink}>Founders</a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
