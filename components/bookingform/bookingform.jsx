"use client";
import React, { useEffect, useState } from "react";
import styles from "./bookingform.module.css";
import { supabase } from "../../utils/supabase";

export default function BookingForm() {
  // Define a state variable `events` and a function `setEvents` to update the state variable.
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [dbData, setDbData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
  });

  // Define a `useEffect` hook that performs a get request from supabase and map the desired data out.
  useEffect(() => {
    const getGame = async () => {
      const { data: games } = await supabase.from("games").select("*");
      const eventData = games.map((game) => ({
        title: game.event_type,
        date: game.date,
      }));
      setEvents(eventData);
    };
    getGame();
  }, []);

  function handleInputChanges(e) {
    const { name, value } = e.target;
    // ... rest of your code ...
  }

  return (
    <>
      <div className={styles.container}>
        <form className={styles.contactForm}>
          <h3 className={styles.subtitle}>Book your place</h3>
          <div>{dbData.field1}</div>
          <div>{dbData.field2}</div>
          <div>{dbData.field3}</div>
          <div>{dbData.field4}</div>
          <input type="text" onChange={handleInputChanges} />
          <button className={styles.requestButton} type="submit">
            BOOK
          </button>
          <button className={styles.cancelButton} type="submit">
            CANCEL
          </button>
        </form>
      </div>
    </>
  );
}
