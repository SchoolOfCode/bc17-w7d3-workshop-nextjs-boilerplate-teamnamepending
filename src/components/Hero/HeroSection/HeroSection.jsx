'use client';

import React, { useReducer, useEffect } from 'react';
import HeroDescription from "../HeroDescription/HeroDescription";
import HeroImage from "../HeroImage/HeroImage";
import styles from "./HeroSection.module.css";

// Base URL for Pantry API
const PANTRY_BASE_URL = 'https://getpantry.cloud/apiv1/pantry/9d4ff7f6-b7ae-4e28-a5b3-43432865d5fb/basket/';

// Initial state for the reducer
const initialState = {
  selectedCountry: null,
  review: null,
  loading: false,
  error: null,
};

// Reducer function to handle state changes
function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_COUNTRY':
      return { ...state, selectedCountry: action.payload, review: null, loading: true, error: null };
    case 'SET_REVIEW':
      return { ...state, review: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'RESET_REVIEW':
      return { ...state, review: null, loading: false, error: null };
    default:
      return state;
  }
}

export default function HeroSection() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { selectedCountry, review, loading, error } = state;

  // Function to handle country button click
  const handleCountryClick = (country) => {
    dispatch({ type: 'SELECT_COUNTRY', payload: country });
  };

  // useEffect to fetch review data when selectedCountry changes
  useEffect(() => {
    if (selectedCountry) {
      console.log(`Fetching review for: ${selectedCountry}`); // Debugging message

      // Construct the dynamic URL based on the selected country
      const basketName = `${selectedCountry}Basket`; // e.g., "EnglandBasket"
      const fetchUrl = `${PANTRY_BASE_URL}${basketName}`;

      // Fetch data from Pantry based on the selected country
      fetch(fetchUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch reviews from Pantry`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched data from Pantry:", data); // Debugging message
          // Assuming data is a JSON object with review details
          if (data && data.reviews && data.reviews.length > 0) {
            dispatch({ type: 'SET_REVIEW', payload: data.reviews[0] }); // Set the first review for simplicity
          } else {
            dispatch({ type: 'SET_ERROR', payload: `No reviews available for ${selectedCountry}.` });
          }
        })
        .catch((error) => {
          console.error('Error fetching review from Pantry:', error);
          dispatch({ type: 'SET_ERROR', payload: error.message });
        });
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
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {review ? (
            <div className={styles.reviewContent}>
              <p><strong>Review:</strong> {review.review}</p>
              <p><strong>Author:</strong> {review.name}</p>
              <p><strong>Location:</strong> {review.location}</p>
            </div>
          ) : !loading && !error && (
            <p>Select a country to see a review.</p>
          )}
        </div>
      </div>
    </section>
  );
}
