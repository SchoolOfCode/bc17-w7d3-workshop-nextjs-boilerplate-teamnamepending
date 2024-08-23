'use client';
import { useState } from 'react';
import styles from './Reviews.module.css';

export default function Reviews() {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [location, setLocation] = useState(''); // State for the location

    const handleClick = async () => {
        const reviewData = {
            name,
            review,
            location
        };

        try {
            // Replace 'YOUR_PANTRY_URL' with your actual Pantry URL
            const response = await fetch('https://getpantry.cloud/apiv1/pantry/9d4ff7f6-b7ae-4e28-a5b3-43432865d5fb/basket/newBasket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            if (response.ok) {
                console.log('Review submitted successfully!');
                // Clear form fields after submission
                setName('');
                setReview('');
                setLocation('');
            } else {
                console.error('Failed to submit review');
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                <div>
                    <label htmlFor="location" className={styles.label}>Location:</label>
                    <select
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={styles.select}
                    >
                        <option value="">Select Location</option>
                        <option value="England">England</option>
                        <option value="Scotland">Scotland</option>
                        <option value="Wales">Wales</option>
                    </select>
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
