"use client";
import styles from './Header.module.css';
import React, { useReducer } from 'react';

// Initial state for the reducer
const initialState = {
  isMenuOpen: false,
};

// Reducer function to handle state changes
function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return { ...state, isMenuOpen: !state.isMenuOpen };
    default:
      return state;
  }
}

const Header = () => {
  // Use the useReducer hook instead of useState
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure state to get isMenuOpen
  const { isMenuOpen } = state;

  // Function to toggle the menu
  const toggleMenu = () => {
    dispatch({ type: 'TOGGLE_MENU' });
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
          </span>
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

