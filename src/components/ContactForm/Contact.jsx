'use client';
import React from 'react';
import styles from '@/src/components/ContactForm/Contact.module.css';
import { useState } from 'react';

export default function ContactForm() { 
    const [fullName , setFullName ] = useState("");
    const [postcode , setPostcode ] = useState("");
    const [address , setAddress ] = useState("");
    const [city , setCity ] = useState("");
    const [phoneNumber , setPhoneNumber ] = useState("");
    const [email , setEmail ] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function handleFullnameChange(event){
        setFullName(event.target.value);
    }

    function handlePostcode(event){
        setPostcode(event.target.value);
    }

    function handleAddress(event){
        setAddress(event.target.value);
    }

    function handleCity(event){
        setCity(event.target.value);
    }

    function handlePhoneNumber(event){
        setPhoneNumber(event.target.value);
    }

    function handleEmail(event){
        setEmail(event.target.value);
    }

    function handleSubmit(event){ 
        event.preventDefault();
        if(!fullName || !postcode || !address || !city || !phoneNumber || !email){
            setErrorMessage("Please fill all fields");
            return;
        }
        setErrorMessage("");
        console.log("Form submitted with values:", fullName, postcode, address, city, phoneNumber, email);
    }  

    return(    
        <form onSubmit={(event)=> handleSubmit(event)} className={styles.contactForm}>
            <fieldset>
                <legend>Personal Information:</legend>
                <label> Fullname <input type="text" onChange={(event)=> handleFullnameChange(event)} value={fullName}/></label>
                <label> Postcode <input type="text" onChange={(event)=> handlePostcode(event)} value={postcode}/></label>
                <label> House/Flat Number and Street Name <input type="text" onChange={(event)=> handleAddress(event)} value={address}/></label>
                <label> City <input type="text" onChange={(event)=> handleCity(event)} value={city}/></label>
            </fieldset>
            <fieldset>
                <legend>Contact Information: </legend>
                <label>Phone number <input type="text" onChange={(event)=> handlePhoneNumber(event)} value={phoneNumber}/> </label>
                <label>Email address<input type="text" onChange={(event)=> handleEmail(event)} value={email}/> </label>
            </fieldset>
            {errorMessage && <p>{errorMessage}</p>}
            <button type="submit">Submit</button>  
        </form>
    )}