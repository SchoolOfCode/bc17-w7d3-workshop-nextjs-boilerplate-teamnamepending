'use client';

import React, { useReducer, useEffect } from 'react';
import HeroDescription from "../HeroDescription/HeroDescription";
import HeroImage from "../HeroImage/HeroImage";
import styles from "./HeroSection.module.css";

// Initial state for the reducer
const initialState = {
  selectedCountry: null,
  review: null,
};

// Reducer function to handle state changes
function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_COUNTRY':
      return { ...state, selectedCountry: action.payload, review: null };
    case 'SET_REVIEW':
      return { ...state, review: action.payload };
    case 'RESET_REVIEW':
      return { ...state, review: null };
    default:
      return state;
  }
}

export default function HeroSection() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { selectedCountry, review } = state;

  // Function to handle country button click
  const handleCountryClick = (country) => {
    dispatch({ type: 'SELECT_COUNTRY', payload: country });
  };

  // useEffect to fetch review data when selectedCountry changes
  useEffect(() => {
    if (selectedCountry) {
      // Fetch data from the API based on the selected country
      fetch(`https://seal-app-336e8.ondigitalocean.app/reviews?country=${selectedCountry}`)
        .then((response) => response.json())
        .then((data) => dispatch({ type: 'SET_REVIEW', payload: data }))
        .catch((error) => console.error('Error fetching review:', error));
    } else {
      dispatch({ type: 'RESET_REVIEW' });
    }
  }, [selectedCountry]);

  return (
    <section className={styles.heroSection}>
      <HeroImage />

      <HeroDescription />

      <div className={styles.reviewsContainer}>
        <h2>Customer Reviews</h2>
        
        <div className={styles.countryButtons}>
          {['England', 'Scotland', 'Wales'].map((country) => (
            <button
              key={country}
              className={`${styles.countryButton} ${selectedCountry === country ? styles.selectedCountry : ''}`}
              onClick={() => handleCountryClick(country)}
            >
              {country}
            </button>
          ))}
        </div>

        <div className={styles.reviewDisplay}>
          {review ? (
            <div className={styles.reviewContent}>
              <p><strong>Review:</strong> {review.text}</p>
              <p><strong>Author:</strong> {review.author}</p>
              <p><strong>Location:</strong> {review.location}</p>
              <p><strong>Business Name:</strong> {review.businessName}</p>
            </div>
          ) : (
            <p>Select a country to see a review.</p>
          )}
        </div>
      </div>
    </section>
  );
}



