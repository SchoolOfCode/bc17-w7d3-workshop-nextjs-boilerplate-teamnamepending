'use client';

import React, { useReducer } from 'react';
import styles from '@/src/components/ContactForm/Contact.module.css';

// Initial state for the form fields and error message.
const initialState = {
    fullName: '',       
    postcode: '',        
    address: '',         
    city: '',            
    phoneNumber: '',     
    email: '',           
    errorMessage: '',   
    status: 'editing',   
    isPostcodeValid: null, // Track postcode validation status.
};

// Reducer function to handle state changes based on dispatched actions.
function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_FIELD':
            // Updates the specific field in the state and clears the error message for that field.
            return { ...state, [action.field]: action.value, errorMessage: '' };
        case 'SET_ERROR':
            // Sets the error message when validation fails.
            return { ...state, errorMessage: action.message };
        case 'FORM_SUBMITTING':
            return { ...state, status: 'formSubmitting' };
        case 'FORM_SUCCESS':
            return { ...state, status: 'success' };
        case 'POSTCODE_VALIDATION':
            // Updates the validation status for the postcode.
            return { ...state, isPostcodeValid: action.isValid, errorMessage: action.isValid ? '' : 'Invalid postcode' };
        default:
            return state;
    }
}

// Functional component for the contact form.
export default function ContactForm() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { fullName, postcode, address, city, phoneNumber, email, errorMessage, isPostcodeValid } = state;

    // Event handler for input changes to update the corresponding field in the state.
    const handleChange = async (event) => {
        const { name, value } = event.target;
        dispatch({ type: 'UPDATE_FIELD', field: name, value });

        // Validate the postcode if the user is typing in the postcode field.
        if (name === 'postcode' && value.length > 0) {
            try {
                // Call the postcode validation API using fetch.
                const response = await fetch(`https://api.postcodes.io/postcodes/${value}/validate`);
                const data = await response.json();
                const isValid = data.result;

                // Dispatch the result to update the validation status.
                dispatch({ type: 'POSTCODE_VALIDATION', isValid });
            } catch (error) {
                // If there’s an API error, assume the postcode is invalid.
                dispatch({ type: 'POSTCODE_VALIDATION', isValid: false });
            }
        }
    };

    // Event handler for form submission.
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the default form submission behavior.
        dispatch({ type: 'FORM_SUBMITTING' });

        // Check if any field is empty or if the postcode is invalid.
        if (!fullName || !postcode || !address || !city || !phoneNumber || !email || !isPostcodeValid) {
            dispatch({ type: 'SET_ERROR', message: 'Please fill all fields correctly.' });
            return;
        }

        // Simulate form processing delay.
        setTimeout(() => {
            dispatch({ type: 'FORM_SUCCESS' });
            console.log("Form submitted with values:", fullName, postcode, address, city, phoneNumber, email);
        }, 5000);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.contactForm}>
            <fieldset>
                <legend>Personal Information:</legend>
                <label>
                    Fullname
                    <input
                        type="text"
                        name="fullName"
                        onChange={handleChange}
                        value={fullName}
                    />
                </label>
                <label>
                    Postcode
                    <input
                        type="text"
                        name="postcode"
                        onChange={handleChange}
                        value={postcode}
                        className={isPostcodeValid === false ? styles.invalid : ''}
                    />
                 
                    {isPostcodeValid === false && <p className={styles.error}>Invalid postcode. Please enter a valid one.</p>}
                </label>
                <label>
                    House/Flat Number and Street Name
                    <input
                        type="text"
                        name="address"
                        onChange={handleChange}
                        value={address}
                    />
                </label>
                <label>
                    City
                    <input
                        type="text"
                        name="city"
                        onChange={handleChange}
                        value={city}
                    />
                </label>
            </fieldset>
            <fieldset>
                <legend>Contact Information:</legend>
                <label>
                    Phone number
                    <input
                        type="text"
                        name="phoneNumber"
                        onChange={handleChange}
                        value={phoneNumber}
                    />
                </label>
                <label>
                    Email address
                    <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={email}
                    />
                </label>
            </fieldset>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <button type="submit">Request Design Consultation</button>
        </form>
    );
}




