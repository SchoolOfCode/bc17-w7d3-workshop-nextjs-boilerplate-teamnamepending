'use client';
import React, { useReducer } from 'react';
import styles from '@/src/components/ContactForm/Contact.module.css';

const initialState = {
    fullName: '',
    postcode: '',
    address: '',
    city: '',
    phoneNumber: '',
    email: '',
    errorMessage: '',
};

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_ERROR':
            return { ...state, errorMessage: action.message };
        case 'CLEAR_ERROR':
            return { ...state, errorMessage: '' };
        default:
            return state;
    }
}

export default function ContactForm() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { fullName, postcode, address, city, phoneNumber, email, errorMessage } = state;

    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch({ type: 'UPDATE_FIELD', field: name, value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!fullName || !postcode || !address || !city || !phoneNumber || !email) {
            dispatch({ type: 'SET_ERROR', message: 'Please fill all fields' });
            return;
        }
        dispatch({ type: 'CLEAR_ERROR' });
        console.log("Form submitted with values:", fullName, postcode, address, city, phoneNumber, email);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.contactForm}>
            <fieldset>
                <legend>Personal Information:</legend>
                <label>
                    Fullname
                    <input type="text" name="fullName" onChange={handleChange} value={fullName} />
                </label>
                <label>
                    Postcode
                    <input type="text" name="postcode" onChange={handleChange} value={postcode} />
                </label>
                <label>
                    House/Flat Number and Street Name
                    <input type="text" name="address" onChange={handleChange} value={address} />
                </label>
                <label>
                    City
                    <input type="text" name="city" onChange={handleChange} value={city} />
                </label>
            </fieldset>
            <fieldset>
                <legend>Contact Information:</legend>
                <label>
                    Phone number
                    <input type="text" name="phoneNumber" onChange={handleChange} value={phoneNumber} />
                </label>
                <label>
                    Email address
                    <input type="text" name="email" onChange={handleChange} value={email} />
                </label>
            </fieldset>
            {errorMessage && <p>{errorMessage}</p>}
            <button type="submit">Submit</button>
        </form>
    );
}
