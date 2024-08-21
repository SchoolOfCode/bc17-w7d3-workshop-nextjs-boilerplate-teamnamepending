'use client';
import React, { useReducer, useEffect } from 'react';
import styles from './Header.module.css';

const initialState = {
  isMenuOpen: false,
  isSticky: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case 'TOGGLE_STICKY':
      return { ...state, isSticky: action.payload };
    default:
      return state;
  }
}

const Header = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isMenuOpen, isSticky } = state;

  const toggleMenu = () => {
    dispatch({ type: 'TOGGLE_MENU' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100; // Adjust the scroll threshold as needed
      if (!isTop && !isSticky) {
        dispatch({ type: 'TOGGLE_STICKY', payload: true });
      } else if (isTop && isSticky) {
        dispatch({ type: 'TOGGLE_STICKY', payload: false });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSticky]);

  return (
    <header className={`${styles.headerContainer} ${isSticky ? styles.sticky : ''}`}>
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
