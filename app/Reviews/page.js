'use client';
import { useState } from 'react';
import styles from './Reviews.module.css';

export default function Reviews() {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');

    const handleClick = () => {
        console.log('Button clicked');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Submit a Review</h1>
            <form className={styles.form}>
                <div>
                    <label htmlFor="name" className={styles.label}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div>
                    <label htmlFor="review" className={styles.label}>Review:</label>
                    <textarea
                        id="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className={styles.textarea}
                    ></textarea>
                </div>
                <button 
                    type="button" 
                    className={styles.submitButton} 
                    onClick={handleClick}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}