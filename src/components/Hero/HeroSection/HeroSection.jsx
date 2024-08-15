'use client';

import React, { useState, useEffect } from 'react';
import HeroDescription from "../HeroDescription/HeroDescription";
import HeroImage from "../HeroImage/HeroImage";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const [selectedCountry, setSelectedCountry] = useState(null); // State to track the selected country
  const [review, setReview] = useState(null); // State to store fetched review data

  // Function to handle country button click
  const handleCountryClick = (country) => {
    setSelectedCountry(country); // Update selectedCountry state
  };

  // useEffect to fetch review data when selectedCountry changes
  useEffect(() => {
    if (selectedCountry) {
      // Fetch data from the API based on the selected country
      fetch(`https://seal-app-336e8.ondigitalocean.app/reviews?country=${selectedCountry}`)
        .then((response) => response.json()) // Convert response to JSON
        .then((data) => setReview(data)) // Store the review data in state
        .catch((error) => console.error('Error fetching review:', error)); // Handle any errors
    }
  }, [selectedCountry]); // Dependency array includes selectedCountry, so useEffect runs when it changes

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


