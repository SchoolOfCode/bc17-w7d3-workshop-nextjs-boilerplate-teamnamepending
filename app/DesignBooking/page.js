import React from "react";
import styles from "./Booking.module.css";
import ContactForm from "@/src/components/ContactForm/Contact"; 


export default function Booking() { 
    return (
        <>
            <h1 className={styles.booking}>Design Booking</h1>
            <ContactForm/>
        </>
    );
}