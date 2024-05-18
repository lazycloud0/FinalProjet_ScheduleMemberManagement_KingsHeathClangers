"use client";
import React, { useEffect, useState } from "react";
import styles from "./bookingform.module.css";
import { supabase } from "../../utils/supabase";


export default function BookingForm() {
    const [message, setMessage] = useState("");
    const [dbData, setDbData] = useState({ field1: '', field2: '', field3: '', field4: '' });
  
     // Fetch data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/your-endpoint'); // Replace with your actual API endpoint
        const data = await response.json();
        setDbData(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on component mount

  function handleInputChanges(e) {
    const { name, value } = e.target;
    // ... rest of your code ...
  }

  return (
    <>
      <div className={styles.container}>
        <form
          className={styles.contactForm}
        >
          <h3 className={styles.subtitle}>Book your place</h3>
          <div>{dbData.field1}</div>
      <div>{dbData.field2}</div>
      <div>{dbData.field3}</div>
      <div>{dbData.field4}</div>
      <input type="text" onChange={handleInputChanges} />
          <button
            className={styles.requestButton}
            type="submit"
          >
            BOOK
          </button>
        </form>
      </div>
    </>
  );
}
