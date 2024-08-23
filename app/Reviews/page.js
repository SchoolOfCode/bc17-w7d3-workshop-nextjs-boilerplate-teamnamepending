'use client';
import { useState } from 'react';
import styles from './Reviews.module.css';

export default function Reviews() {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [location, setLocation] = useState(''); // State for the location

    const handleClick = async () => {
        if (!location) {
            console.error('Please select a location.');
            return;
        }

        const reviewData = {
            name,
            review,
            location
        };

        // Determine the basket name based on location
        const basketName = `${location}Basket`;

        try {
            // Fetch existing reviews for the selected location
            const fetchResponse = await fetch(`https://getpantry.cloud/apiv1/pantry/9d4ff7f6-b7ae-4e28-a5b3-43432865d5fb/basket/${basketName}`);
            let existingReviews = [];

            if (fetchResponse.ok) {
                const fetchData = await fetchResponse.json();
                existingReviews = fetchData.reviews || []; // Assuming the basket has a "reviews" array
            }

            // Append the new review to the existing reviews
            const updatedReviews = [...existingReviews, reviewData];

            // Update the basket with the new reviews array
            const updateResponse = await fetch(`https://getpantry.cloud/apiv1/pantry/9d4ff7f6-b7ae-4e28-a5b3-43432865d5fb/basket/${basketName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reviews: updatedReviews }),
            });

            if (updateResponse.ok) {
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
