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
        default:
            return state;
    }
}

// Functional component for the contact form.
export default function ContactForm() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { fullName, postcode, address, city, phoneNumber, email, errorMessage } = state;

    // Event handler for input changes to update the corresponding field in the state.
    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch({ type: 'UPDATE_FIELD', field: name, value });

        // Validation to check if a field is left empty and set an error immediately.
        if (value === '') {
            dispatch({ type: 'SET_ERROR', message: `Please fill the ${name} field.` });
        }
    };

    // Event handler for form submission.
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the default form submission behavior.
        dispatch({ type: 'FORM_SUBMITTING' });

        // Check if any field is empty and set an error message if needed.
        if (!fullName || !postcode || !address || !city || !phoneNumber || !email) {
            dispatch({ type: 'SET_ERROR', message: 'Please fill all fields' });
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
                    />
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
            {errorMessage && <p>{errorMessage}</p>}
            <button type="submit">Request Design Consultation</button>
        </form>
    );
}



