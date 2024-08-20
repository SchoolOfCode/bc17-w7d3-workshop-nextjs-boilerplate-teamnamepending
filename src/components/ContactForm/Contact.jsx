'use client';
import React from 'react';
import styles from '@/src/components/ContactForm/Contact.module.css'
import { useState } from 'react';

export default function ContactForm() { 
    const [fullName , setFullName ] = useState("")
    function handleFullnameChange(event){
     setFullName(event.target.value)
    }
    const [postcode , setPostcode ] = useState("")
    function handlePostcode(event){
     setPostcode(event.target.value)
    }
    const [address , setAddress ] = useState("")
    function handleAddress(event){
    setAddress(event.target.value)
    }
    const [city , setCity ] = useState("")
    function handleCity(event){
    setCity(event.target.value)
    }
    const [phoneNumber , setPhoneNumber ] = useState("")
    function handlePhoneNumber(event){
    setPhoneNumber(event.target.value)
    }
    const [email , setEmail ] = useState("")
    function handleEmail(event){
    setEmail(event.target.value)
    }

    return(    
        <form className={styles.contactForm}>
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
        </form>
    )}