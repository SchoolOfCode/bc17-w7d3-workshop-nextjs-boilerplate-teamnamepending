import React from "react";
import styles from "./FounderPage.module.css";

export default function FounderPage() {
  return (
    <div className={styles.container}>
      <h1>Meet the Founders</h1>
      <p className={styles.introText}>
        At Fireplace Palace, we are proud to introduce the visionaries who brought our company to life. Get to know our founders and learn how their passion and expertise have shaped our journey.
      </p>

      <div className={styles.founderSection}>
        <img
          src="/images/founder-mike-and-mandy.png"
          alt="Founders Mike and Mandy"
          className={styles.founderImage}
        />
        <div className={styles.founderInfo}>
          <h2 className={styles.founderName}>Mike Johnson & Mandy Smith</h2>
          <p className={styles.founderBio}>
            Mike and Mandy founded Fireplace Palace with a shared passion for creating cozy and stylish living spaces. Mike, with over 20 years of experience in the home heating industry, focuses on innovative designs and practical solutions. Mandy, with her background in interior design, brings warmth and elegance to every project. Together, they are committed to transforming houses into welcoming homes.
          </p>
        </div>
      </div>
    </div>
  );
}

















        
         
            
